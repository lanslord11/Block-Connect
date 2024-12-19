require("@nomicfoundation/hardhat-toolbox");



module.exports = {
  solidity: "0.8.17",
  paths: {
    sources: "./contracts", // Path to your contracts
    tests: "./test", // Path to your tests
    cache: "./cache", // Path to the cache
    artifacts: "./artifacts" // Path to the artifacts
  },
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
