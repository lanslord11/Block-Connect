import { ethers } from "ethers";
import Web3Modal from "web3modal";

import {  ChatAppABI } from "../Context/constants";

export const CheckIfWalletConnected = async () => {
  try {
    if (!window.ethereum) return console.log("Install MetaMask");
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

const networkParams = {
  chainId: '0x13882', // 0x13882 is the hexadecimal equivalent of 80002
  chainName: 'POLYGON AMOY TESTNET',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
  rpcUrls: ['https://rpc-amoy.polygon.technology/'],
  blockExplorerUrls: ['https://www.oklink.com/amoy'],
};

async function addNetworkAndSwitch(networkParams) {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed!");
    }

    console.log("Attempting to add network with params:", networkParams);

    // Request to add the custom network to MetaMask
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [networkParams],
    });

    console.log("Network added successfully, attempting to switch...");

    // Switch to the newly added network
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: networkParams.chainId }],
    });

    console.log("Switched to new network successfully");
  } catch (error) {
    console.error('Error adding or switching network:', error);
    if (error.code === 4001) {
      console.log("User rejected the request");
    }
  }
}

// Example network parameters (adjust these for your specific network)


export const connectWallet = async () => {
  try {
    if (!window.ethereum) return console.log("Install MetaMask");
    await addNetworkAndSwitch(networkParams);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, ChatAppABI, signerOrProvider);

export const connectingWithContract = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, ChatAppABI, signer);
    return contract;
  } catch (error) {
    console.log("error connecting with the smart contract");
    console.log(error);
  }
};

export const convertTime = (time) => {
  const newTime = new Date(time.toNumber());
  const realTime =
    newTime.getHours() +
    ":" +
    newTime.getMinutes() +
    ":" +
    newTime.getSeconds() +
    " Date:" +
    newTime.getDate() +
    "/" +
    (newTime.getMonth() + 1) +
    "/" +
    newTime.getFullYear();
  return realTime;
};
