const { RESTDataSource } = require('apollo-datasource-rest');

class LaunchAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api.spacexdata.com/v2/'
    }

    launchReducer(launch) {
      return {
        id: launch.flight_number || 0,
        cursor: `${launch.launch_date_unix}`,
        site: launch.launch_site && launch.launch_site.site_name,
        mission: {
          name: launch.mission_name,
          missionPatchSmall: launch.links.mission_patch_small,
          missionPatchLarge: launch.links.mission_patch,
        },
        rocket: {
          id: launch.rocket.rocket_id,
          name: launch.rocket.rocket_name,
          type: launch.rocket.rocket_type,
        },
      };
    }










    async getAllLaunches() {
      // First create a response and execute the query
        const response = await this.get('launches');

        /// then take the resonse and put into an array. if it's an array then pass it to the launchReducer function otherwise return an empty array.
        // Condition ? Expression 1 : Expression 2
        // Ture
        // If the condition is True, which is it is an array then it returns Expressions 1 if it's false it returns Expression 2
        return Array.isArray(response) ? response.map(launch => this.launchReducer(launch)) : [];
    }

    // launchId being passed as an object
    async getLaunchById({ launchId }) {
      // What do I need to do to create this function?
      // 1. take the id and query the api and pass in the object with a key of flight_number and value of the object we are passing in.
      const response = await this.get('launches', { flight_number: launchId });

      // pass position 0 of the response into the launch reducer function.
      return this.launchReducer(response[0]);

      // then 
    }



    // next function:
    // getLaunchesByIDs

    getLaunchesByIds({ launchIds }) {
      return Promise.all(
        launchIds.map(launchId => this.getLaunchById({ launchId })),
      );
    }









 



}

module.exports = LaunchAPI;