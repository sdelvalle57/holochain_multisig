const { gql } = require('apollo-server');

const typeDefs = gql`
    
    type Query {
        myAddress: MyAddress,
    }

    type Mutation {
        createMultisig(title: String!, description: String!): CreateMultisigResponse!
    }

    type MyAddress {
        myAddress: String
    }

    type CreateMultisigResponse {
        entry: String
    }
`;



module.exports = typeDefs;