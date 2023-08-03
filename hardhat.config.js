require("@nomicfoundation/hardhat-toolbox");
const dotenv = require("dotenv");
dotenv.config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    linea: {
      url: `https://linea-goerli.infura.io/v3/${process.env.INFURA_KEY}`,
      chainId: 59140,
      accounts: [process.env.PRIVATE_KEY]
    },
    sepolia: {
      url: "https://endpoints.omniatech.io/v1/eth/sepolia/public",
      chainId: 11155111,
      accounts: [process.env.PRIVATE_KEY],
    },
    ethereum: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
};
