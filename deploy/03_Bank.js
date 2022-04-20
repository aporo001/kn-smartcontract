const { ethers } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const token = await get("Token");
  // the following will only deploy "GenericMetaTxProcessor" if the contract was never deployed or if the code changed since last deployment
  await deploy("Bank", {
    from: deployer,
    args: [token.address],
    log: true,
  });
};

module.exports.tags = ["Bank"];
module.exports.dependency = ["Token"];
