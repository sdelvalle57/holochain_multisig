const { RESTDataSource } = require('apollo-datasource-rest');

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
        const response = await this.callZome('test-instance', 'create_multisig', 'get_my_address')({})
        return this.myAddressReducer(JSON.parse(response))
    }
}

module.exports = MyAddressAPI;

/*
const { RESTDataSource } = require('apollo-datasource-rest');


class MyAddressAPI extends RESTDataSource {

    constructor() {
        super();
        this.baseURL = 'https://api.spacexdata.com/v2/';
      }

      launchReducer(launch) {
        return {
          id: launch.flight_number || 0,
          site: launch.launch_site && launch.launch_site.site_name,
        
        };
      }

    async getAllLaunches() {
        const response = await this.get('launches');
        return Array.isArray(response)
          ? response.map(launch => this.launchReducer(launch))
          : [];
      }
}

module.exports = MyAddressAPI;
*/