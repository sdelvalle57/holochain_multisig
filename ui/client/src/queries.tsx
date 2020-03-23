import gql from 'graphql-tag';

export const GET_MY_ADDRESS = gql`
    query MyAddress {
        myAddress {
            myAddress
        }
    }
`;

export const GET_MULTISIG = gql`
    query Multisig($address: String!) {
        getMultisig(address: $address) {
            title,
            description,
            signatories,
            required,
            creator
        }
    }
`

export const GET_ALL_MULTISIGS = gql`
    query Multisigs {
        getMyMultisigs {
            title,
            description,
            signatories,
            required,
            creator,
            address
        }
    }
`

//TODO: example for local data, should be removed
export const GET_CREATED_MULTISIG = gql`
    query GetCreatedMultisig {
        multisigCreated @client {
            entry @client
        } 
    }
`;