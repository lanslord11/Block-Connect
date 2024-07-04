import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Image from "next/image";

// INTERNAL IMPORT
import Style from "../styles/createPost.module.css";
import { ChatAppContext } from "../Context/ChatAppContext";
import images from "../assets";
import {  toast } from 'react-toastify';

const allPosts = () => {
  const { userLists, addFriends, createPost } = useContext(ChatAppContext);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [fileName, setFileName] = useState("No image selected");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();

        formData.append("file", file);

        toast("Uploading Image to Pinata...");

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
            pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("lksdfl");
        const cid = resFile.data.IpfsHash;
        // const signer = contract.connect(provider.getSigner());
        // contract.add(account, ImgHash);
        toast("Successfully Image Uploaded to Pinata");
        toast("Creating Post...")
        await createPost(cid, caption);
        toast("Post Created Successfully");
        // console.log(ImgHash);
        setFileName("No Image Selected");
        setFile(null);
      } catch (e) {
        console.log(e);
        toast("Unable to create post");
      }
    }
  };
  const retrieveFile = (e) => {
    const data = e.target.files[0];
    console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
  };
  return (
    <div>
      <div className={Style.createPost_info}>
        <h1>Create Post</h1>
      </div>
      <div className={Style.createPost}>
        <div className="top">
          <form onSubmit={handleSubmit} className="form">
            <div>
              <Image
                src={images.caption}
                alt="caption"
                className="icon"
                width={20}
                height={20}
              />
              <input
                type="text-area"
                value={caption}
                placeholder="Enter Caption"
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
            <div>
              <input
                //   disabled={!account}
                type="file"
                id="file-upload"
                name="data"
                onChange={retrieveFile}
              />
            </div>

            {/* <span className="textArea">Image:{fileName}</span> */}
            <button type="submit" className="upload" disabled={!file}>
              <Image
                src={images.send}
                alt="caption"
                className="icon"
                width={20}
                height={20}
              />
              Create Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default allPosts;
