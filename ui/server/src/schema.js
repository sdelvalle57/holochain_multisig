const { gql } = require('apollo-server');

const typeDefs = gql`
    
    type Query {
        myAddress: MyAddress,
        getMultisig(address: String!): Multisig
        getMyMultisigs: [Multisig]!
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
        signatories: [String!]!,
        required: Int!,
        creator: String!,
        address: String
    }
`;


module.exports = typeDefs;