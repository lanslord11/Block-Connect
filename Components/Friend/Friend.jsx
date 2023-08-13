import React, { useState, useContext } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Friend.module.css";
import images from "../../assets";
import Card from "./Card/Card";
import Chat from "./Chat/Chat";

import { ChatAppContext } from "../../Context/ChatAppContext";

const Friend = () => {
  // const array=[1,2,3,4,5,6];
  const {
    sendMessage,
    account,
    friendLists,
    readMessage,
    userName,
    loading,
    currentUserName,
    currentUserAddress,
    readUser,
    friendMsg,
  } = useContext(ChatAppContext);
  // console.log(friendLists);
  return (
    <div className={Style.Friend}>
      <div className={Style.Friend_box}>
        <div className={Style.Friend_box_left}>
          {friendLists.map((el, i) => {
            console.log(el);

            return (
              <Card
                key={i + 1}
                el={el}
                i={i}
                readMessage={readMessage}
                readUser={readUser}
              />
            );
          })}
        </div>
        <div className={Style.Friend_box_right}>
          <Chat
            functionName={sendMessage}
            readUser={readUser}
            readMessage={readMessage}
            friendMsg={friendMsg}
            account={account}
            userName={userName}
            loading={loading}
            currentUserAddress={currentUserAddress}
            currentUserName={currentUserName}
          />
        </div>
      </div>
    </div>
  );
};

export default Friend;
