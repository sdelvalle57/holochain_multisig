const { gql } = require('apollo-server');

const typeDefs = gql`
    
    type Query {
        myAddress: MyAddress,
        getMultisig(address: String!): Multisig
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

    type Multisig {
        title: String!,
        description: String!,
        owners: [String!]!,
        required: Int!
    }
`;


module.exports = typeDefs;