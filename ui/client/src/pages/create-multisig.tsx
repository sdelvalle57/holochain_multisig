import React from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import { navigate } from "@reach/router"

import { CreateMultisig, CreateMultisigVariables } from '../__generated__/CreateMultisig';


import { CreateMultisigForm } from '../components';
import {CREATE_MULTISIG} from '../mutations';


 export default function CreateMultisigFunction() {
    const client: ApolloClient<any> = useApolloClient();
    const [createMultisig, { loading, error }] = useMutation<CreateMultisig, CreateMultisigVariables>(
        CREATE_MULTISIG,
        {
            onCompleted({ createMultisig }) {
                console.log(createMultisig)
                client.writeData({ data: { multisigCreated: createMultisig }})
                navigate(`/created/${createMultisig.entry}`)
            }
        }
    );
    return <CreateMultisigForm loading={loading} error={error} createMultisig={createMultisig} />
 }

 