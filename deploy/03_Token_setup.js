const { ethers } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { execute, read } = deployments;
  const { deployer, tokenOwner } = await getNamedAccounts();
  const currentOwner = await read("Token", "owner");
  if (tokenOwner.toLowerCase() !== currentOwner.toLowerCase()) {
    await execute(
      "Token",
      {
        from: deployer,
        log: true,
      },
      "transferOwnership",
      tokenOwner
    );
  }
};

module.exports.tags = ["Token"];
module.exports.runAtTheEnd = true;
