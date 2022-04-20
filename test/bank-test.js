const { expect } = require("chai");
const { deployments, ethers } = require("hardhat");

const mintedToken = ethers.utils.parseEther("1000");

const setupTest = deployments.createFixture(
  async ({ getNamedAccounts, deployments, ethers }) => {
    await deployments.fixture(["Bank", "Token"]);
    const tokenContract = await ethers.getContract("Token");
    const bankContract = await ethers.getContract("Bank");
    const { deployer, tokenOwner } = await getNamedAccounts();
    const tokenOwnerSigner = await ethers.getSigner(tokenOwner);

    const tx = await tokenContract
      .connect(tokenOwnerSigner)
      .mint(tokenOwnerSigner.address, mintedToken);

    await tx.wait();

    return {
      tokenContract,
      bankContract,
      deployer,
      tokenOwnerSigner,
    };
  }
);

describe("Bank", function () {
  it("Should return account balance correctly when deposit", async function () {
    const { tokenContract, bankContract, tokenOwnerSigner } = await setupTest();

    let tx = await tokenContract
      .connect(tokenOwnerSigner)
      .approve(bankContract.address, ethers.constants.MaxUint256);
    await tx.wait();

    tx = await bankContract.connect(tokenOwnerSigner).deposit(mintedToken);
    await tx.wait();

    expect(
      await bankContract.accountBalance(tokenOwnerSigner.address)
    ).to.equal(mintedToken);

    expect(await tokenContract.balanceOf(tokenOwnerSigner.address)).to.equal(
      "0"
    );
  });

  it("Should return account balance correctly when deposit and withdrawal", async function () {
    const { tokenContract, bankContract, tokenOwnerSigner } = await setupTest();

    let tx = await tokenContract
      .connect(tokenOwnerSigner)
      .approve(bankContract.address, ethers.constants.MaxUint256);
    await tx.wait();

    tx = await bankContract.connect(tokenOwnerSigner).deposit(mintedToken);
    await tx.wait();

    expect(
      await bankContract.accountBalance(tokenOwnerSigner.address)
    ).to.equal(mintedToken);

    const withdrawalAmount = ethers.utils.parseEther("999");
    tx = await bankContract
      .connect(tokenOwnerSigner)
      .withdrawal(withdrawalAmount);
    await tx.wait();

    expect(
      await bankContract.accountBalance(tokenOwnerSigner.address)
    ).to.equal(mintedToken.sub(withdrawalAmount));

    expect(await tokenContract.balanceOf(tokenOwnerSigner.address)).to.equal(
      withdrawalAmount
    );
  });
});
