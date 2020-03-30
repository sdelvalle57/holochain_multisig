This repo follows the Apollo tutorial for graphql at https://www.apollographql.com/docs/tutorial/introduction/

Steps:

Installation
1. `cd ui/client` -> `npm i`
2. `cd ui/server` -> `npm i`
3. create `.env` file in both client and server
4. Set `ENGINE_API_KEY` in the `.env` files, https://engine.apollographql.com/, follow step 4 of the tutorial: https://www.apollographql.com/docs/tutorial/production/
5. Set service name in `apollo.config.js` :
    
    In the client folder:

            module.exports = {
                client: {
                    name: 'Holochain Multisig [web]',
                    service: 'the name of your service set in step 4',
                },
            };
    
    In the server folder:

            module.exports = {
                service: {
                    name: 'the name of your service set in set in step 4'
                }
            } 


6. `cd ui/client` -> `npm run codegen`
7. `nix-shell`-> `cd dna` -> `hc test` or `hc package`


Run the Client
1. `nix-shell` -> `sim2h_server`
2. Open another terminal on the root project, will run 2 agents(alice -> 8888, bob -> 8889)
3. `nix-shell` -> `cd ui/client` -> `npm run start:holochain`
4. Open another terminal on the root project, will run two apollo server instances (alice->4000, bob->4001)
5. `cd ui/client` -> `npm run start:apollo-server`
6. Build typescript objects, Open another terminal on the root project
7. `cd ui/client` -> `npm run codegen`
7. Press any key when its done
8. Run two UIs for each agent
9. `cd ui/client` -> `npm run start:ui`
10. Navigate to http://localhost:8080 for Alice and http://localhost:8081 for Bob

Notes. To Test queries and mutations go to http://localhost:4000 for Alice and http://localhost:4001 for Bob