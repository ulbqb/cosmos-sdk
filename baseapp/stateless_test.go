package baseapp

import (
	"bytes"
	"encoding/binary"
	"fmt"
	"net/url"
	"os"
	"testing"

	"github.com/cosmos/cosmos-sdk/stateless"
	"github.com/cosmos/cosmos-sdk/store/rootmulti"
	sdk "github.com/cosmos/cosmos-sdk/types"
	abci "github.com/tendermint/tendermint/abci/types"
	"github.com/tendermint/tendermint/proto/tendermint/crypto"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
	dbm "github.com/tendermint/tm-db"
)

type TestBlock struct {
}

func NewTestApp() *BaseApp {
	routerOpt := func(bapp *BaseApp) {
		bapp.Router().AddRoute(sdk.NewRoute(routeMsgKeyValue, func(ctx sdk.Context, msg sdk.Msg) (*sdk.Result, error) {
			kv := msg.(*msgKeyValue)
			bapp.cms.GetKVStore(capKey2).Set(kv.Key, kv.Value)
			return &sdk.Result{}, nil
		}))
	}
	app := newBaseApp("testapp", routerOpt)

	app.MountStores(capKey1, capKey2)
	app.SetParamStore(&paramStore{db: dbm.NewMemDB()})

	routerOpts := make(map[string]func(*BaseApp))
	routerOpts[capKey2.Name()] = routerOpt
	app.routerOpts = routerOpts

	// stores are mounted
	err := app.LoadLatestVersion()
	if err != nil {
		panic(err)
	}
	return app
}

func SetupAppFromBlock(app *BaseApp, block *tmproto.Block, oracle *stateless.OracleClient) (*BaseApp, error) {
	options := make([]func(*BaseApp), 0)
	if app.routerOpts != nil {
		for _, routerOpt := range app.routerOpts {
			options = append(options, routerOpt)
		}
	}
	cms := app.cms.(*rootmulti.Store)
	storeKeys := cms.GetStoreKeys()

	// This initial height is used in `BeginBlock` in `validateHeight`)
	options = append(options, SetInitialHeight(block.Header.Height))

	appName := app.Name() + "FromBlock"
	newApp := NewBaseApp(appName, app.logger, dbm.NewMemDB(), app.txDecoder, options...)

	newApp.msgServiceRouter = app.msgServiceRouter
	newApp.beginBlocker = app.beginBlocker
	newApp.endBlocker = app.endBlocker

	// stores are mounted
	newApp.MountStores(storeKeys...)

	// set oracle to IAVL Store
	cmsStore := newApp.cms.(*rootmulti.Store)
	// cmsStore.SetAppHash(commit.AppHash)
	cmsStore.SetupStoresParams(oracle)

	err := newApp.LoadLatestVersion()
	if err != nil {
		panic(err)
	}

	return newApp, err
}

func ExecuteStateless() []byte {
	// initialize oracle
	oracle := stateless.NewOracleClient()

	// initialize app
	app := NewTestApp()
	app.InitChain(abci.RequestInitChain{})

	// get input data from oracle
	block := oracle.GetBlock()
	fmt.Printf("proof %v\n", len(oracle.GetProof("key2/key", "1430").ProofOps.Ops))

	// Setup from oracle
	// TODO: check to use pure NewTestApp()
	app, _ = SetupAppFromBlock(app, block, oracle)

	// initialize chain
	app.InitChain(abci.RequestInitChain{})

	// begin block
	app.BeginBlock(abci.RequestBeginBlock{
		Header: tmproto.Header{Height: block.Header.Height},
	})

	// deliver txs
	for _, tx := range block.Data.Txs {
		app.DeliverTx(abci.RequestDeliverTx{
			Tx: tx,
		})
	}

	// end block
	app.EndBlock(abci.RequestEndBlock{
		Height: block.Header.Height,
	})

	// commit
	resp := app.Commit()

	// output
	return resp.Data
}

func TestExecuteStateless(t *testing.T) {
	app := NewTestApp()
	app.InitChain(abci.RequestInitChain{})
	challengeHeihgt := int64(5)
	var challengeBlock = tmproto.Block{}
	var agreedApphash = []byte{}
	var challengeApphash = []byte{}
	for i := range make([]int, challengeHeihgt) {
		challengeBlock = executeBlockWithArbitraryTxs(t, app, 5, int64(i)+1)
		res := app.Commit()
		challengeApphash = res.GetData()
		if int64(i) == challengeHeihgt-1 {
			agreedApphash = res.GetData()
		}
	}

	res := app.Query(abci.RequestQuery{
		Data:   []byte("getstorehash"),
		Path:   "store/key2/key",
		Height: 4,
		Prove:  true,
	})
	fmt.Println(res.Value)
	fmt.Println(len(res.ProofOps.Ops))

	stateless.OracleS.Fun = func(key []byte) []byte {
		u, err := url.Parse(string(key))
		if err != nil {
			panic(err)
		}
		switch u.Path {
		case "commit":
			signedHeader := tmproto.SignedHeader{
				Header: &tmproto.Header{
					AppHash: agreedApphash,
				},
			}
			sh, err := signedHeader.Marshal()
			if err != nil {
				panic(err)
			}
			return sh
		case "block":
			b, err := challengeBlock.Marshal()
			if err != nil {
				panic(err)
			}
			return b
		case "store":
			m, err := url.ParseQuery(u.RawQuery)
			if err != nil {
				panic(err)
			}

			res := app.Query(abci.RequestQuery{
				Data:   []byte(m["data"][0]),
				Path:   "store/" + m["path"][0],
				Height: challengeHeihgt - 1,
				Prove:  true,
			})

			ops := make([]*crypto.ProofOp, len(res.ProofOps.Ops))
			for _, op := range res.ProofOps.Ops {
				ops = append(ops, &op)
			}
			eops, err := convertToExistenceProofs(ops)
			if err != nil {
				panic(err)
			}

			buf := &bytes.Buffer{}
			err = binary.Write(buf, binary.BigEndian, eops)
			if err != nil {
				panic(err)
			}
			return buf.Bytes()
		}
		return nil
	}

	fmt.Printf("agreed app hash: %v\n", agreedApphash)
	fmt.Printf("challenge app hash: %v\n", challengeApphash)

	fmt.Fprint(os.Stdout, ExecuteStateless())
}
