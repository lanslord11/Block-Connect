import React, { useState, useEffect, useContext } from "react";

// INTERNAL IMPORT
import Style from "../styles/allPosts.module.css";
import { ChatAppContext } from "../Context/ChatAppContext";
import { PostCard } from "../Components/index";
import { all } from "axios";

const allPosts = () => {
  const {
    userLists,
    addFriends,
    allPosts,
    getAllPosts,
    likePost,
    dislikePost,
    account,
    unlikePost,
    transfer,
  } = useContext(ChatAppContext);
  useEffect(() => {
    getAllPosts();
  }, []);
  // let copyallposts = [...allPosts];
  // console.log(allPosts);
  // console.log("reverse", copyallposts.reverse());
  return (
    <div>
      <div className={Style.allPosts}>
        {[...allPosts]
          .reverse()
          .map(
            (post, idx) =>
              post.owner != "0x0000000000000000000000000000000000000000" && (
                <PostCard
                  key={idx}
                  account={account}
                  post={post}
                  idx={idx}
                  likePost={likePost}
                  dislikePost={dislikePost}
                  unlikePost={unlikePost}
                  transfer={transfer}
                />
              )
          )}
      </div>
    </div>
  );
};

export default allPosts;
