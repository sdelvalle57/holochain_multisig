import { SchemaDirectiveVisitor } from 'graphql-tools';

import { INSTANCE_NAME, ZOME_NAME } from '../config';
import { parseEntry } from '../utils';
import { GraphQLField } from 'graphql';

export class LoadEntityDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    let defaultResolver = field.resolve;

    field.resolve = async (parent, args, context, info) => {
      let entityId;

      if (defaultResolver) {
        entityId = await defaultResolver(parent, args, context, info);
      } else if (args.courseId) {
        entityId = args.courseId;
      } else {
        entityId = parent[field.name];
      }

      if (!entityId) return null;

      if (typeof entityId === 'string')
        return this.loadEntry(entityId, context.callZome);
      else return entityId.map((id: String) => this.loadEntry(id, context.callZome));
    };
  }

  async loadEntry(entityId: any, callZome: any) {

    const entryResult = await callZome(
      INSTANCE_NAME,
      ZOME_NAME,
      'get_entry'
    )({
      address: entityId
    });

    const entry = parseEntry(entryResult);

    return { id: entityId, ...entry };
  }
}
