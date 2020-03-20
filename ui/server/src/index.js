const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const MyAddressAPI = require('./datasources/my_address');
const { connect } = require('@holochain/hc-web-client');
const resolvers = require('./resolvers');


(async () => {

    const HOST_URL = 'ws://localhost:8888';
    const { callZome } = await connect({ url: HOST_URL });
    const connection = (instance, zome, fnName) => async params => {
        const result = await callZome(instance, zome, fnName)(params);
        return result;
    };
    // const response = await connection('test-instance', 'create_multisig', 'get_my_address')({})
    // console.log('my address' ,response)


    const server = new ApolloServer({ 
        typeDefs,
        resolvers,
        dataSources: () => ({
            myAddressAPI: new MyAddressAPI({callZome: connection})
        })
    });
    
    server.listen().then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
      });
})().catch(e => console.log(e))
