require('dotenv').config();
const { RESTDataSource } = require('apollo-datasource-rest');
const {createMultisig} = require('../config');

class MyAddressAPI extends RESTDataSource {

    constructor({callZome}) {
        super();
        this.callZome = callZome;
    }

    multisigReducer(response) {
        return {
          entry: response.Ok,
        }
    }

    async createMultisig(title, description) {
        const response = await this.callZome(process.env.INSTANCE_NAME, process.env.ZOME_CREATE_MULTISIG, createMultisig)({title, description})
        return this.multisigReducer(JSON.parse(response))
    }
}

module.exports = MyAddressAPI;