This repo follows the Apollo tutorial for graphql at https://www.apollographql.com/docs/tutorial/introduction/

Steps:

Installation
1. `cd ui/client` -> `npm i`
2. `cd ui/server` -> `npm i`
3. `cd ui/client` -> `npm run codegen`
4. `nix-shell`-> `cd dna` -> `hc test` or `hc package`


Run the Client
1. `nix-shell` -> `sim2h_server`
2. Open another console on the root project
3. `nix-shell` -> `cd ui/client` -> `npm run demo`
4. Navigate to http://localhost:8080 for Alice and http://localhost:8081 for Bob 

Notes. To Test queries and mutations go to http://localhost:4000 and http://localhost:4001