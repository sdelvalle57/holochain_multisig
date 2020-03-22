import gql from 'graphql-tag';

export const CREATE_MULTISIG = gql`
    mutation CreateMultisig($title: String!, $description: String!) {
        createMultisig(title: $title, description: $description) {
            entry
        }
    }
`;