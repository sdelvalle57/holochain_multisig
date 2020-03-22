module.exports = {
    Query: {
      myAddress: (_, __, { dataSources }) => dataSources.myAddressAPI.getMyAddress(),
      getMultisig: (_, {address}, { dataSources }) => dataSources.multisigAPI.get(address)
    },
    Mutation: {
        createMultisig: async (_, {title, description}, { dataSources }) => {
          const res = await dataSources.multisigAPI.createMultisig(title, description)
          if (res) return res;
        }
    },
  };

  /*

      createMultisig: (_, __, { dataSources }) => dataSources.multisigAPI.createMultisig()
*/