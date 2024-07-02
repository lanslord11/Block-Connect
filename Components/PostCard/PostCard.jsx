import React, { useState, useEffect } from "react";
import { convertTime } from "../../Utils/apiFeature";
import images from "../../assets/index";
import Image from "next/image";
import { ethers } from "ethers";

//INTERNAL IMPORT
import Style from "./PostCard.module.css";
// const { likePost } = useContext(ChatAppContext);

const PostCard = ({
  unlikePost,
  post,
  idx,
  likePost,
  dislikePost,
  account,
  transfer,
}) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [amount, setAmount] = useState(0);
  // console.log(post);
  // console.log(account);
  // console.log(post.likes);
  // console.log(account);
  // console.log(post.pid.toNumber());
  useEffect(() => {
    for (let i = 0; i < post.likes.length; i++) {
      if (post.likes[i].toLowerCase() == account) {
        setLiked(true);
        break;
      }
    }

    if (post.dislikes.includes(account)) {
      disliked(true);
    } else {
      setDisliked(false);
    }
  }, [post]);

  const onClickHandler = async () => {
    // transfer(amount, post.owner);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    let number = parseInt(amount);
    number = number * 1000000000000000000;
    let hexStr = number.toString(16);
    hexStr = "0x" + hexStr;
    // console.log(hexStr);
    // let amountstr = "0x" + amount.toString(16);
    // console.log(amountstr);
    window.ethereum
      .request({
        method: "eth_sendTransaction",
        // The following sends an EIP-1559 transaction. Legacy transactions are also supported.
        params: [
          {
            from: accounts[0], // The user's active address.
            to: post.owner, // Required except during contract publications.
            value: hexStr, // Only required to send ether to the recipient from the initiating external account.
            //   gasLimit: '0x5028', // Customizable by the user during MetaMask confirmation.
            //   maxPriorityFeePerGas: '0x3b9aca00', // Customizable by the user during MetaMask confirmation.
            //   maxFeePerGas: '0x2540be400', // Customizable by the user during MetaMask confirmation.
          },
        ],
      })
      .then((txHash) => console.log(txHash))
      .catch((error) => console.error(error));
  };

  return (
    <div className={Style.PostCard_box}>
      <div className={Style.Post_likes}>
        <button
          onClick={() => {
            likePost(post.pid.toNumber());
          }}
          // className={liked ? Style.liked : ""}
        >
          <Image src={images.upArrow} alt="logo" width={20} height={20} />
        </button>
        {parseInt(post.likes.length - post.dislikes.length)}
        <button
          onClick={() => {
            dislikePost(post.pid.toNumber());
          }}
        >
          <Image
            src={images.upArrow}
            className={Style.rotate180}
            alt="logo"
            width={20}
            height={20}
          />
        </button>
      </div>
      <div className={Style.PostCard_main}>
        <div className={Style.PostCard_header}>
          {/* <div>Posted by: {post.owner}</div> */}
          <div>
            <p>Posted by: {post.owner.slice(0, 25)}...</p>
            <p>Posted at: {convertTime(post.timestamp)}</p>
          </div>
          <div>{post.caption}</div>
        </div>
        <div className={Style.PostCard_img}>
          <img src={`https://tomato-electric-impala-477.mypinata.cloud/ipfs/${post.cid}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_GATEWAY_TOKEN}`} alt="" />
        </div>
        <div className={Style.sponserBox}>
          <button className={Style.sponserButton} onClick={onClickHandler}>
            sponser
          </button>
          <input
            className={Style.sponserInput}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="enter amount"
          />
          {/* <div className={Style.ethLogo}>eth</div> */}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
