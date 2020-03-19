import React, { Fragment, Component } from 'react';
import { Router } from '@reach/router';
import { makeExecutableSchema } from 'graphql-tools';

// import Launch from './launch';
import Launches from './launches';
// import Cart from './cart';
// import Profile from './profile';

import { ApolloClient, InMemoryCache, NormalizedCacheObject } from 'apollo-boost';
import { SchemaLink } from 'apollo-link-schema';
import { Footer, PageContainer } from '../components';
import { resolvers  } from '../graphql/resolvers';
import { typeDefs } from '../graphql/type_defs';
import { getConnection } from '../connection';
import { LoadEntityDirective } from '../graphql/directive';
import { ApolloProvider } from '@apollo/react-hooks';

interface stateType {
  client: ApolloClient<NormalizedCacheObject> | undefined
}

export default class Pages extends Component {

  state: stateType = {
    client: undefined
  } 

  componentDidMount = async() => {
    const cache = new InMemoryCache();
    const connection = await getConnection();

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
      schemaDirectives: {
        loadEntry: LoadEntityDirective
      }
    });

    const link = new SchemaLink({ schema, context: { callZome: connection } });

    const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
      cache: new InMemoryCache(),
      connectToDevTools: true,
      link
    });
    
    cache.writeData({
      data: {
        hola: "hola",
      },
    });

    this.setState({client})
  }

  render() {
    const {client} = this.state;
    if(!client) return "No Client"
     return (
      <ApolloProvider client={client}>
        <Fragment>
          <PageContainer>
            <Router primary={false} component={Fragment}>
              <Launches path="/" />
              {/* <Launch path="launch/:launchId" />
              <Cart path="cart" />
              <Profile path="profile" /> */}
            </Router>
          </PageContainer>
          <Footer />
        </Fragment>
    </ApolloProvider>
  );
}
 
}
   