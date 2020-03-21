import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import React from 'react';
import ReactDOM from 'react-dom';
import {GET_CREATED_MULTISIG} from './pages/create-multisig';
import {typeDefs} from './resolvers';

import Pages from './pages';
import injectStyles from './styles';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/'
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link,
  typeDefs
});

const data = {
  multisigCreated: null
}

cache.writeData({
    data
});

function RenderPage() {
  const { data } = useQuery(GET_CREATED_MULTISIG);
  return  <Pages created={data.multisigCreated} />  
}

injectStyles();
ReactDOM.render(
    <ApolloProvider client={client}>    
        <RenderPage />
    </ApolloProvider>,   
    document.getElementById('root')
);
