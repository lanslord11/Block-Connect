require("@nomicfoundation/hardhat-toolbox");



module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    // amoy: {
    //   url: process.env.NEXT_PUBLIC_POLYGON_MUMBAI_RPC,
    //   accounts: [`0x${process.env.NEXT_PUBLIC_PRIVATE_KEY}`],
    //   loggingEnabled: true
    // }

  },
};
