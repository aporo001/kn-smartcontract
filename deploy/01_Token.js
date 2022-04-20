const { ethers } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  // the following will only deploy "GenericMetaTxProcessor" if the contract was never deployed or if the code changed since last deployment
  await deploy("Token", {
    from: deployer,
    args: [],
    log: true,
  });
};

module.exports.tags = ["Token"];
module.exports.dependency = [];
