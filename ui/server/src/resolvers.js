module.exports = {
    Query: {
      myAddress: (_, __, { dataSources }) => dataSources.myAddressAPI.getMyAddress(),
      
    }
  };