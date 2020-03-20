const { gql } = require('apollo-server');

const typeDefs = gql`
    
    type Query {
        myAddress: MyAddress,
    }
    type MyAddress {
        myAddress: String
    }
`;



module.exports = typeDefs;