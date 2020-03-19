import { INSTANCE_NAME, ZOME_NAME } from '../config';
import { parseResponse } from '../utils';

export const resolvers = {
  Query: {
    
    async myAddress(_: any, __: any, { callZome }: {callZome: any}) {
      const result = await callZome(
        INSTANCE_NAME,
        ZOME_NAME,
        'get_my_address'
      )({});

      return parseResponse(result);
    }
  },
 
};
