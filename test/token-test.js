const { expect } = require("chai");
const { deployments, ethers } = require("hardhat");

const setupTest = deployments.createFixture(
  async ({ getNamedAccounts, deployments, ethers }) => {
    await deployments.fixture(["Token"]);
    const tokenContract = await ethers.getContract("Token");
    const { deployer, tokenOwner } = await getNamedAccounts();
    const tokenOwnerSigner = await ethers.getSigner(tokenOwner);
    return {
      tokenContract,
      deployer,
      tokenOwnerSigner,
    };
  }
);

describe("Token", function () {
  it("Should return set token admin correctly", async function () {
    const { tokenContract, tokenOwnerSigner } = await setupTest();
    const owner = await tokenContract.owner();

    expect(tokenOwnerSigner.address).to.equal(owner);
  });

  it("Should return balance correctly when admin mint token", async function () {
    const { tokenContract, tokenOwnerSigner } = await setupTest();
    const mintAmount = ethers.utils.parseEther("1000000");
    const tx = await tokenContract
      .connect(tokenOwnerSigner)
      .mint(tokenOwnerSigner.address, mintAmount);
    await tx.wait();

    expect(await tokenContract.balanceOf(tokenOwnerSigner.address)).to.equal(
      mintAmount
    );
  });
});
