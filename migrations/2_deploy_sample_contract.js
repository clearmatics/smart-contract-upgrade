const { scripts, ConfigVariablesInitializer } = require("zos");
const { add, push, create } = scripts;

async function deploy(options, tokenOwner) {
  //Register Contract in the zos project
  add({
    contractsData: [{ name: "SampleContract", alias: "SampleContract" }]
  });

  //push it to the network
  await push(options);

  //create an upgradable instance of it (proxy) and initialize the logic
  await create(
    Object.assign(
      {
        contractAlias: "SampleContract",
        methodName: "initialize",
        methodArgs: [10]
      },
      options
    )
  );
}

module.exports = (deployer, networkName, accounts) => {
  deployer.then(async () => {
    const {
      network,
      txParams
    } = await ConfigVariablesInitializer.initNetworkConfiguration({
      network: networkName,
      from: accounts[1]
    });
    await deploy({ network, txParams }, accounts[2]);
  });
};
