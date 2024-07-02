import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import {
  CheckIfWalletConnected,
  connectWallet,
  connectingWithContract,
} from "../Utils/apiFeature";

export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({ children }) => {
  const title = "Hey welcome to blockchain Chat App";

  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [friendLists, setFriendLists] = useState([]);
  const [friendMsg, setFriendMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [error, setError] = useState("");
  const [allPosts, setAllPosts] = useState([]);

  //CHAT USER DATA

  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("");

  const router = useRouter();

  const fetchData = async () => {
    try {
      //GET CONTRACT
      const contract = await connectingWithContract();
      //GET ACCOUNT
      const connectAccount = await connectWallet();
      setAccount(connectAccount);
      //GET USER NAME
      const userName = await contract.getUsername(connectAccount);
      setUserName(userName);
      //GET FRIEND LIST
      const friendLists = await contract.getMyFriendList();
      setFriendLists(friendLists);
      //GET FRIEND MSGget all app user list
      const userList = await contract.getAllAppUsers();
      setUserLists(userList);
    } catch (error) {
      // setError("Please Install and Connect Your Wallet");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //READ MESSAGE
  const readMessage = async (friendAddress) => {
    try {
      const contract = await connectingWithContract();
      const read = await contract.readMessage(friendAddress);
      setFriendMsg(read);
    } catch (error) {
      console.log(error, "currently you have no message");
    }
  };

  const createAccount = async ({ name, accountAddress }) => {
    try {
      // if (name || accountAddress)
      //   return setError("Name and accountAddress, cannot be empty");
      const contract = await connectingWithContract();
      const getCreatedUser = await contract.createAccount(name);
      setLoading(true);
      await getCreatedUser.wait();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  //ADD YOUR FRIENDS
  const addFriends = async ({ name, accountAddress }) => {
    try {
      // if (name || accountAddress)
      //   return setError("Please provide name and accountaddress");
      const contract = await connectingWithContract();
      const addMyFriend = await contract.addFriend(accountAddress, name);
      setLoading(true);
      await addMyFriend.wait();
      setLoading(false);
      router.push("/");
      window.location.reload();
    } catch (error) {
      console.log(
        error,
        "something went wrong while adding friends, try again"
      );
    }
  };

  //SEND MESSAGE
  const sendMessage = async ({ msg, address }) => {
    try {
      // if (msg || address) return setError("please type your message");
      const contract = await connectingWithContract();
      const addMessage = await contract.sendMessage(address, msg);
      setLoading(true);
      await addMessage.wait();
      setLoading(false);
      window.location.reload("/");
    } catch (error) {
      console.log(error);
    }
  };

  //READ INFO
  const readUser = async (userAddress) => {
    const contract = await connectingWithContract();
    const userName = await contract.getUsername(userAddress);
    setCurrentUserAddress(userAddress);
    setCurrentUserName(userName);
  };

  //CREATE POST
  const createPost = async (cid, caption) => {
    try {
      // if (msg || address) return setError("please type your message");
      const contract = await connectingWithContract();
      const addMessage = await contract.createPost(cid, caption);
      setLoading(true);
      await addMessage.wait();
      setLoading(false);
      window.location.reload("/allPosts");
    } catch (error) {
      console.log(error);
    }
  };

  //ALL POSTS
  const getAllPosts = async () => {
    try {
      const contract = await connectingWithContract();
      const posts = await contract.getAllPosts();
      setAllPosts(posts);
      console.log(posts);
    } catch (error) {
      console.log(error);
    }
  };

  //LIKE POST
  const likePost = async (postId) => {
    try {
      const contract = await connectingWithContract();
      const like = await contract.likePost(postId);
      await like.wait();
      window.location.reload("/allPosts");
    } catch (error) {
      console.log(error);
    }
  };

  //DISLIKE POST
  const dislikePost = async (postId) => {
    try {
      const contract = await connectingWithContract();
      const dislike = await contract.dislikePost(postId);
      await dislike.wait();
      window.location.reload("/allPosts");
    } catch (error) {
      console.log(error);
    }
  };

  //UNLIKE POST
  const unlikePost = async (postId) => {
    try {
      const contract = await connectingWithContract();
      const unLike = await contract.unlikePost(postId);
      await unLike.wait();
      window.location.reload("/allPosts");
    } catch (error) {
      console.log(error);
    }
  };

  //MAKE PAYMENT TO ACCOUNT
  const transfer = async (amount, address) => {
    try {
      await window.ethereum.enable();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const recipientAddress = address;
      const amountToSend = ethers.utils.parseEther(amount); // Sending 0.1 ETH
      console.log(recipientAddress, amountToSend);
      const transaction = {
        to: recipientAddress,
        value: amountToSend.toHexString(),
      };

      await provider.send("eth_sendTransaction", [transaction]);
      console.log("Transaction initiated");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ChatAppContext.Provider
      value={{
        transfer,
        unlikePost,
        readMessage,
        createAccount,
        addFriends,
        sendMessage,
        readUser,
        connectWallet,
        CheckIfWalletConnected,
        createPost,
        getAllPosts,
        account,
        userName,
        friendLists,
        friendMsg,
        loading,
        userLists,
        error,
        currentUserName,
        currentUserAddress,
        allPosts,
        likePost,
        dislikePost,
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
};
