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

func (o OracleClient) GetProof(path, data string) []*ics23.ExistenceProof {
	q := o.Query("store/"+path, data)
	ops := make([]*crypto.ProofOp, len(q.ProofOps.Ops))
	for i := range q.ProofOps.Ops {
		op := q.ProofOps.Ops[i]
		ops[i] = &op
	}

	eops, err := convertToExistenceProofs(ops)
	if err != nil {
		panic(err)
	}
	return eops
}

var OracleS = &OracleServer{}

type OracleServer struct {
	Fun func(key []byte) []byte
}

func (s OracleServer) Get(key []byte) []byte {
	return s.Fun(key)
}

func convertToExistenceProofs(proofs []*crypto.ProofOp) ([]*ics23.ExistenceProof, error) {
	existenceProofs := make([]*ics23.ExistenceProof, 0)
	for _, proof := range proofs {
		_, existenceProof, err := getExistenceProof(*proof)
		if err != nil {
			return nil, err
		}
		existenceProofs = append(existenceProofs, existenceProof)
	}
	return existenceProofs, nil
}

func getExistenceProof(proofOp crypto.ProofOp) (types.CommitmentOp, *ics23.ExistenceProof, error) {
	op, err := types.CommitmentOpDecoder(proofOp)
	if err != nil {
		return types.CommitmentOp{}, nil, err
	}
	commitmentOp := op.(types.CommitmentOp)
	commitmentProof := commitmentOp.GetProof()
	return commitmentOp, commitmentProof.GetExist(), nil
}
