require('dotenv').config();
const { RESTDataSource } = require('apollo-datasource-rest');
const {getMyAddress} = require('../config');
const {Error} = require('../global-reducers');

class MyAddressAPI extends RESTDataSource {

    constructor({callZome}) {
        super();
        this.callZome = callZome;
    }

    myAddressReducer(myAddress) {
        if(myAddress.Ok) {
            return {  myAddress: myAddress.Ok }
        } else if(myAddress.Err) {
            return Error(response.Err)
        }
    }

    async getMyAddress() {
        const response = await this.callZome(process.env.INSTANCE_NAME, process.env.ZOME_CREATE_MULTISIG, getMyAddress)({})
        return this.myAddressReducer(JSON.parse(response))
    }
}

module.exports = MyAddressAPI;