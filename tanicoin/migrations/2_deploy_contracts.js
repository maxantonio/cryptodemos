const TaniCoin = artifacts.require("TaniCoin");

module.exports = async function(deployer, network, accounts) {
  // Deploy Tani Coin
  await deployer.deploy(TaniCoin)
  const taniCoin = await TaniCoin.deployed()
};
