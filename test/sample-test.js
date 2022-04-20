const { expect } = require("chai");
const { deployments } = require("hardhat");

const setupTest = deployments.createFixture(async ({ deployments, ethers }) => {
  await deployments.fixture(["Greeter"]); // ensure you start from a fresh deployments
  const greeterContract = await ethers.getContract("Greeter");

  return {
    greeterContract,
  };
});

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const { greeterContract } = await setupTest();

    expect(await greeterContract.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeterContract.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeterContract.greet()).to.equal("Hola, mundo!");
  });
});
