This repo follows the Apollo tutorial for graphql at https://www.apollographql.com/docs/tutorial/introduction/

Steps:

Installation
1. `cd ui/client` -> `npm i`
2. `cd ui/server` -> `npm i`
3. Set `ENGINE_API_KEY` in the `.env` file, https://engine.apollographql.com/, follow step 4 of the tutorial: https://www.apollographql.com/docs/tutorial/production/
4. Set service name in `apollo.config.js` :
    
    In the client folder:

            module.exports = {
                client: {
                    name: 'Holochain Multisig [web]',
                    service: 'the name of your service set in step 3',
                },
            };
    
    In the server folder:

            module.exports = {
                service: {
                    name: 'the name of your service set in set in step 3'
                }
            } 


5. `cd ui/client` -> `npm run codegen`
6. `nix-shell`-> `cd dna` -> `hc test` or `hc package`


Run the Client
1. `nix-shell` -> `sim2h_server`
2. Open another console on the root project
3. `nix-shell` -> `cd ui/client` -> `npm run demo`
4. Navigate to http://localhost:8080 for Alice and http://localhost:8081 for Bob 

Notes. To Test queries and mutations go to http://localhost:4000 for Alice and http://localhost:4001 for Bob