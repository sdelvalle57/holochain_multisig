const path = require('path')

const { 
  Orchestrator, 
  Config, 
  combine, 
  singleConductor, 
  localOnly, 
  tapeExecutor 
} = require('@holochain/tryorama')

process.on('unhandledRejection', error => {
  console.error('got unhandledRejection:', error);
});

const dnaPath = path.join(__dirname, "../dist/multisig.dna.json")

const orchestrator = new Orchestrator({
  middleware: combine(
    tapeExecutor(require('tape')),
    localOnly,
  ),
})

const dna = Config.dna(dnaPath, 'multisig_test')
const conductorConfig = Config.gen(
  { multisig_test: dna },
  {
    network: {
      type: "sim2h",
      sim2h_url: "ws://localhost:9000"
    },
    logger: Config.logger({type: "error"}),
  },
  );

/**********Functions */

const createMultisig = async (user, title, description) => {
  const multisig_addr = await user.call(
    "multisig_test", 
    "create_multisig", 
    "create_multisig", 
    {
      title, 
      description
    }
  )
  return multisig_addr;
}

const getEntry = async (user, address) => {
  const entryResult = await user.call(
    "multisig_test", 
    "create_multisig", 
    "get_entry",
    { address }
  )
  return entryResult;
}

orchestrator.registerScenario("Scenario1: Create Multisig", async (s, t) => {

  const  {alice, bob } = await s.players(
    { alice: conductorConfig, bob: conductorConfig }, 
    true
  );

  const multisig_addr = await createMultisig(alice, "My Multisig", "This creates a new multisig")
  t.ok(multisig_addr);
  await s.consistency();
  
  const multisig_result = await getEntry(alice, multisig_addr.Ok);

  const multisig = JSON.parse(multisig_result.Ok.App[1]);
  console.log("multisig_create", multisig);
  t.deepEqual(multisig, {
    title: "My Multisig",
    description: "This creates a new multisig",
    owners: [alice.instance("multisig_test").agentAddress],
    required: 1
  })
  await s.consistency();

})

orchestrator.run()
