import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';

import Pages from './pages';
import injectStyles from './styles';

injectStyles();
ReactDOM.render(
  <Pages />,
  document.getElementById('root'),
);
