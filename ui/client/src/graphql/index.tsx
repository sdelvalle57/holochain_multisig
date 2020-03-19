import { makeExecutableSchema } from 'graphql-tools';
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from 'apollo-boost';
import { SchemaLink } from 'apollo-link-schema';

import { resolvers } from './resolvers';
import { typeDefs } from './type_defs';
import { LoadEntityDirective } from './directive';
import { getConnection } from '../connection';

let client: ApolloClient<NormalizedCacheObject> | undefined = undefined;

export async function getClient() {
  if (client) return client;

  const connection = await getConnection();

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives: {
      loadEntry: LoadEntityDirective
    }
  });

  const link = new SchemaLink({ schema, context: { callZome: connection } });

  client = new ApolloClient({
    cache: new InMemoryCache(),
    connectToDevTools: true,
    link
  });
  return client;
}
