package stateless

import (
	"fmt"
	"net/url"

	abci "github.com/tendermint/tendermint/abci/types"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
)

type OracleClient struct {
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

// get agreed commit
// func (o OracleClient) GetCommit() types.SignedHeader {
// 	d := o.get([]byte("commit"))
// 	h := types.SignedHeader{}
// 	err := binary.Read(bytes.NewBuffer(d), binary.BigEndian, &h)
// 	if err != nil {
// 		panic(err)
// 	}
// 	return h
// }

// get state tree proof
func (o OracleClient) GetProof(path, data string) *abci.ResponseQuery {
	d := o.Get([]byte(fmt.Sprintf("abci_query?path=%s&data=%s", url.PathEscape(path), data)))
	q := abci.ResponseQuery{}
	err := q.Unmarshal(d)
	if err != nil {
		panic(err)
	}
	return &q
}

var OracleS = &OracleServer{}

type OracleServer struct {
	Fun func(key []byte) []byte
}

func (s OracleServer) Get(key []byte) []byte {
	return s.Fun(key)
}
