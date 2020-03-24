
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import React from 'react';
import ReactDOM from 'react-dom';
import {GET_CREATED_MULTISIG} from './queries';
import {typeDefs} from './resolvers';

import Pages from './pages';
import injectStyles from './styles';


const cache = new InMemoryCache();
const SERVER_PORT = process.env.REACT_APP_SERVER_PORT ? process.env.REACT_APP_SERVER_PORT : 4000;
console.log(SERVER_PORT, process.env.REACT_APP_SERVER_PORT, process.env.PORT)
const link = new HttpLink({
  uri: `http://localhost:${SERVER_PORT}/`
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
  console.log(data)
  return  <Pages />  
}

injectStyles();
ReactDOM.render(
    <ApolloProvider client={client}>    
        <RenderPage />
    </ApolloProvider>,   
    document.getElementById('root')
);
