require('dotenv').config();
const { RESTDataSource } = require('apollo-datasource-rest');
const {createMultisig, get} = require('../config');

class MyAddressAPI extends RESTDataSource {

    constructor({callZome}) {
        super();
        this.callZome = callZome;
    }

    createMultisigReducer(response) {
        return {
          entry: response.Ok,
        }
    }

    getMultisigReducer(response) {
        const {title, description, owners, required} = response.Ok
        return {
            title,
            description,
            owners,
            required
        }
    }

    async createMultisig(title, description) {
        const response = await this.callZome(process.env.INSTANCE_NAME, process.env.ZOME_CREATE_MULTISIG, createMultisig)({title, description})
        return this.createMultisigReducer(JSON.parse(response))
    }

    async get(address) {
        const response = await this.callZome(process.env.INSTANCE_NAME, process.env.ZOME_CREATE_MULTISIG, get)({address})
        return this.getMultisigReducer(JSON.parse(response))
    }


}

module.exports = MyAddressAPI;