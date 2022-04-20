module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  // the following will only deploy "GenericMetaTxProcessor" if the contract was never deployed or if the code changed since last deployment
  await deploy("Greeter", {
    from: deployer,
    args: ["Hello, world!"],
    log: true,
  });
};

module.exports.tags = ["Greeter"];
module.exports.dependency = [];
