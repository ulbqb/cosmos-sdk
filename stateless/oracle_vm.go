//go:build mips
// +build mips

package stateless

type OracleClient struct {
}

func NewOracleClient() *OracleClient {
	return &OracleClient{}
}

func (OracleClient) get(key []byte) []byte {
	return oracleServer.Get(key)
}

func (c OracleClient) GetBlock() types.Block {
	d := c.get([]byte("block"))
	b := types.Block{}
	err := binary.Read(bytes.NewBuffer(d), binary.BigEndian, &b)
	if err != nil {
		panic(err)
	}
	return b
}

func (c OracleClient) GetValue(path, data string) abci.ResponseQuery {
	d := c.get([]byte(fmt.Sprintf("abci_query?path=%s&data=%s", url.PathEscape(path), data)))
	q := abci.ResponseQuery{}
	err := binary.Read(bytes.NewBuffer(d), binary.BigEndian, &q)
	if err != nil {
		panic(err)
	}
	return q
}

var oracleServer = &OracleServer{}

type OracleServer struct {
	Fun func(key []byte) []byte
}

func (s OracleServer) SetFunc(fun func(key []byte) []byte) {}

func (s OracleServer) Get(key []byte) []byte {
	return s.Fun(key)
}
