Steps:

Run the Server
1. run `nix-shell`
2. run `sim2h_server`
3. `cd dna/` run `hc run --agent-name alice --networked sim2h`
4. from the root folder, `cd ui/server` then run `npm i && npm start`
Notes. To Test queries and mutations go to http://localhost:4000

Run the Client
1. `cd ui/client` run `npm i`
2. run `npm start`
3. Navigate to http://localhost:3000