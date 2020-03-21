import React from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { LoginForm, Loading } from '../components';
import ApolloClient from 'apollo-client';
import { CreateMultisig, CreateMultisigVariables } from './__generated__/CreateMultisig';

export const CREATE_MULTISIG = gql`
    mutation CreateMultisig($title: String!, $description: String!) {
        createMultisig(title: $title, description: $description) {
            entry
        }
    }
`;

export const GET_CREATED_MULTISIG = gql`
  query GetCreatedMultisig {
    multisigCreated @client {
        entry @client
    } 
  }
`;

 export default function CreateMultisigFunction() {
    const client: ApolloClient<any> = useApolloClient();
    const [createMultisig, { loading, error }] = useMutation<CreateMultisig, CreateMultisigVariables>(
        CREATE_MULTISIG,
        {
            onCompleted({ createMultisig }) {
                console.log(createMultisig)
                client.writeData({ data: { multisigCreated: createMultisig }})
                //localStorage.setItem('token', login as string);
                //client.writeData({ data: { isLoggedIn: true } });
            }
        }
    );
    if (loading) return <Loading />;
    if (error) return <p>An error occurred</p>;
    return <LoginForm createMultisig={createMultisig} />
 }