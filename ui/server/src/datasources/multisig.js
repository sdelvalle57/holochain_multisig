require('dotenv').config();
const { RESTDataSource } = require('apollo-datasource-rest');
const {createMultisig, get, getAll} = require('../config');
const {Error} = require('../global-reducers');

class MyAddressAPI extends RESTDataSource {

    constructor({callZome}) {
        super();
        this.callZome = callZome;
    }

    createMultisigReducer(response) {
        if(response.Ok) {
            return {
                entry: response.Ok,
              }
        } else if(response.Err) {
            return Error(response.Err)
        } else return null
    }

    getMultisigReducer(response) {
        if(response.Ok) {
            const {title, description, signatories, required, creator} = response.Ok
            return {
                title,
                description,
                signatories,
                required,
                creator
            }
        } else if(response.Err) {
            return Error(response.Err)
        } else return null
        
    }

    async createMultisig(title, description) {
        const response = await this.callZome(process.env.INSTANCE_NAME, process.env.ZOME_CREATE_MULTISIG, createMultisig)({title, description})
        return this.createMultisigReducer(JSON.parse(response))
    }

    async get(address) {
        const response = await this.callZome(process.env.INSTANCE_NAME, process.env.ZOME_CREATE_MULTISIG, get)({address})
        return this.getMultisigReducer(JSON.parse(response))
    }

    async getAll() {
        let addresses = await this.callZome(process.env.INSTANCE_NAME, process.env.ZOME_CREATE_MULTISIG, getAll)({})
        addresses = JSON.parse(addresses).Ok;
        console.log("addressss" , addresses)
        const multisigs = []
        for(let j = 0; j < addresses.length; j++) {
            const response = await this.get(addresses[j]);
            response.address = addresses[j]
            multisigs.push(response)
        }
        return multisigs
    }

}

module.exports = MyAddressAPI;