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

const dnaPath = path.join(__dirname, "../dist/dna.dna.json")

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
  t.deepEqual(multisig, {
    title: "My Multisig",
    description: "This creates a new multisig",
    signatories: [alice.instance("multisig_test").agentAddress],
    required: 1,
    creator: alice.instance("multisig_test").agentAddress
  })
  await s.consistency();

})

orchestrator.registerScenario("Scenario2: Create and fetch Multisig", async (s, t) => {

  const  {alice, bob } = await s.players(
    { alice: conductorConfig, bob: conductorConfig }, 
    true
  );

  const multisig_addr = await createMultisig(alice, "My Multisig", "This creates a new multisig")
  t.ok(multisig_addr);
  await s.consistency();
  
  const multisig_result = await getEntry(alice, multisig_addr.Ok);

  const multisig = JSON.parse(multisig_result.Ok.App[1]);
  t.deepEqual(multisig, {
    title: "My Multisig",
    description: "This creates a new multisig",
    signatories: [alice.instance("multisig_test").agentAddress],
    required: 1,
    creator: alice.instance("multisig_test").agentAddress,
  })
  await s.consistency();

  const fetchedMultisig = await alice.call(
    "multisig_test", 
    "create_multisig", 
    "get",
    { address: multisig_addr.Ok }
  )
  console.log("fetchedMultisig", fetchedMultisig);
  t.deepEqual(multisig, fetchedMultisig.Ok);
  await s.consistency();

})

orchestrator.registerScenario("Scenario3: Create many", async (s, t) => {

  const  {alice, bob } = await s.players(
    { alice: conductorConfig, bob: conductorConfig }, 
    true
  );

  const multisig_addr1 = await createMultisig(alice, "My Multisig1", "This creates a new multisig")
  t.ok(multisig_addr1);
  await s.consistency();

  const multisig_addr2 = await createMultisig(alice, "My Multisig2", "This creates a new multisig")
  t.ok(multisig_addr2);
  await s.consistency();
  

  const myMultisigs = await alice.call(
    "multisig_test", 
    "create_multisig", 
    "get_my_multisigs",
    {}
  )
  t.equal(2, myMultisigs.Ok.length);
  await s.consistency();

})

orchestrator.registerScenario("Scenario4: Create two with the same data", async (s, t) => {

  const  {alice, bob } = await s.players(
    { alice: conductorConfig, bob: conductorConfig }, 
    true
  );

  const multisig_addr1 = await createMultisig(alice, "My Multisig1", "This creates a new multisig")
  t.ok(multisig_addr1);
  await s.consistency();

  const multisig_addr2 = await createMultisig(alice, "My Multisig1", "This creates a new multisig")
  console.log("multisig_addr2", multisig_addr2);
  t.ok(multisig_addr2.Err);
  await s.consistency();
  

  const myMultisigs = await alice.call(
    "multisig_test", 
    "create_multisig", 
    "get_my_multisigs",
    {}
  )
  console.log("fetchedMultisigs", myMultisigs);
  t.equal(1, myMultisigs.Ok.length);
  await s.consistency();

})

orchestrator.run()
