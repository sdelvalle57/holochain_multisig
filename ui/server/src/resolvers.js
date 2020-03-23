const { ApolloError } = require('apollo-server')

module.exports = {
    Query: {
      myAddress: async (_, __, { dataSources }) => {
        const res = await dataSources.myAddressAPI.getMyAddress()
        return handleResponse(res, "Cannot fetch user Address")
      },
      getMultisig: async (_, {address}, { dataSources }) => {
        const res = await dataSources.multisigAPI.get(address);
        return handleResponse(res, "Cannot fetch Multisig")
      },
      getMyMultisigs: (_, __, { dataSources }) => dataSources.multisigAPI.getAll()
    },
    Mutation: {
        createMultisig: async (_, {title, description}, { dataSources }) => {
          const res = await dataSources.multisigAPI.createMultisig(title, description)
          return handleResponse(res, "Unable to create Multisig")
        }
    },
  };

  const handleResponse = (res, message) => {
    if(res.error) {
      throw new ApolloError(message, "HOLOCHAIN_ERROR", res)
    }
    return res;
  }
