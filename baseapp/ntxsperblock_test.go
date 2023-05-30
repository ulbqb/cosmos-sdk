package baseapp

import (
	"fmt"
	"math/rand"
	"testing"

	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	abci "github.com/tendermint/tendermint/abci/types"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
)

func executeTxs(app *BaseApp, numTransactions int, blockHeight int64, r *rand.Rand) {
	codec := codec.NewLegacyAmino()
	registerTestCodec(codec)
	randSource += 1
	keyCounter := 10000 + numTransactions*(int(blockHeight)-1)
	app.BeginBlock(abci.RequestBeginBlock{Header: tmproto.Header{Height: blockHeight}})
	for txNum := 0; txNum < numTransactions; txNum++ {
		tx := txTest{Msgs: []sdk.Msg{}}
		for msgNum := 0; msgNum < 1; msgNum++ {
			key := []byte(fmt.Sprintf("%v", keyCounter))
			value := make([]byte, 10000)
			r.Read(value)
			tx.Msgs = append(tx.Msgs, msgKeyValue{Key: key, Value: value})
			keyCounter++
		}
		txBytes, _ := codec.Marshal(tx)
		app.DeliverTx(abci.RequestDeliverTx{Tx: txBytes})
	}
	app.EndBlock(abci.RequestEndBlock{Height: blockHeight})
}

func BenchmarkNumTxsPerBlock(b *testing.B) {
	tc := []int{1, 2, 4, 5, 10, 20, 40, 50, 100, 200, 500, 1000}
	txnum := 1000
	for _, n := range tc {
		b.Run(fmt.Sprintf("%d txs per block", n), func(b *testing.B) {
			b.ResetTimer()
			app := NewTestApp()
			app.InitChain(abci.RequestInitChain{})
			r := rand.New(rand.NewSource(randSource))
			for i := range make([]int, txnum/n) {
				executeTxs(app, n, int64(i)+1, r)
				app.Commit()
			}
		})
	}
}
