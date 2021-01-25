//require only hardhat waffle, because it depends on hardhat-ethers
require("@nomiclabs/hardhat-waffle"); 

const INFURA_PROJECT_ID = "0e859f0c6ec34fa6be979ff829495358";

const ROPSTEN_PRIVATE_KEY = "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

module.exports = {
  solidity: "0.7.3",
  networks: {
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`0x${ROPSTEN_PRIVATE_KEY}`]
    }
  }
};
