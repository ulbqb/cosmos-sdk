package stateless

import (
	"fmt"
	"net/url"

	ics23 "github.com/confio/ics23/go"
	"github.com/cosmos/cosmos-sdk/store/types"
	iavltree "github.com/cosmos/iavl"
	abci "github.com/tendermint/tendermint/abci/types"
	"github.com/tendermint/tendermint/proto/tendermint/crypto"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
)

type OracleClient struct {
	iavltree.OracleClient
}

func NewOracleClient() *OracleClient {
	return &OracleClient{}
}

func (OracleClient) Get(key []byte) []byte {
	return OracleS.Get(key)
}

// get challenging block
func (o OracleClient) GetBlock() *tmproto.Block {
	d := o.Get([]byte("block"))
	b := tmproto.Block{}
	err := b.Unmarshal(d)
	if err != nil {
		panic(err)
	}
	return &b
}

// get state tree proof
func (o OracleClient) Query(path, data string) *abci.ResponseQuery {
	d := o.Get([]byte(fmt.Sprintf("abci_query?path=%s&data=%s", url.PathEscape(path), data)))
	q := abci.ResponseQuery{}
	err := q.Unmarshal(d)
	if err != nil {
		panic(err)
	}
	return &q
}

func (o OracleClient) GetProof(path, data string) []*ics23.CommitmentProof {
	q := o.Query("store/"+path, data)
	ops := make([]*crypto.ProofOp, len(q.ProofOps.Ops))
	for i := range q.ProofOps.Ops {
		op := q.ProofOps.Ops[i]
		ops[i] = &op
	}

	cops, err := convertToCommitmentProofs(ops)
	if err != nil {
		panic(err)
	}
	return cops
}

var OracleS = &OracleServer{}

type OracleServer struct {
	Fun func(key []byte) []byte
}

func (s OracleServer) Get(key []byte) []byte {
	return s.Fun(key)
}

func convertToCommitmentProofs(ops []*crypto.ProofOp) ([]*ics23.CommitmentProof, error) {
	cps := make([]*ics23.CommitmentProof, 0)
	for _, op := range ops {
		op, err := types.CommitmentOpDecoder(*op)
		if err != nil {
			return nil, err
		}
		commitmentOp := op.(types.CommitmentOp)
		commitmentProof := commitmentOp.GetProof()
		if err != nil {
			return nil, err
		}
		cps = append(cps, commitmentProof)
	}
	return cps, nil
}
