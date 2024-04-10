require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    zkyoto: {
      url: process.env.ZKYOTO_PROVIDER_URL,
      accounts: [`${process.env.ZKYOTO_PRIVATE_KEY}`],
    },
  },
};
