require('dotenv').config();
const { RESTDataSource } = require('apollo-datasource-rest');
const {getMyAddress} = require('../config');

class MyAddressAPI extends RESTDataSource {

    constructor({callZome}) {
        super();
        this.callZome = callZome;
    }

    myAddressReducer(myAddress) {
        return {
          myAddress: myAddress.Ok,
        }
    }

    async getMyAddress() {
        const response = await this.callZome(process.env.INSTANCE_NAME, process.env.ZOME_CREATE_MULTISIG, getMyAddress)({})
        return this.myAddressReducer(JSON.parse(response))
    }
}

module.exports = MyAddressAPI;