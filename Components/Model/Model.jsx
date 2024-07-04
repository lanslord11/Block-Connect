import React, { useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./Model.module.css";
import images from "../../assets";
import { ChatAppContext } from "../../Context/ChatAppContext";
import { Loader } from "../../Components/index";

const Model = ({
  openBox,
  address,
  title,
  head,
  info,
  smallInfo,
  image,
  functionName,
}) => {
  const [name, setName] = useState("");
  const [accountAddress, setAccountAddress] = useState("");

  const { loading } = useContext(ChatAppContext);
  return (
    <div className={Style.Model}>
      <div className={Style.Model_box}>
        <div className={Style.Model_box_left}>
          <Image src={image} alt="logo" width={700} height={700} />
        </div>
        <div className={Style.Model_box_right}>
          <h1>
            {title}
            <span>{head}</span>
          </h1>
          <p className={Style.warning}>{info}</p>
          <p className={Style.links}>
            <p>Usefull LINKS:</p>
            <div className={Style.linkContainer}>
            <Link  href="https://support.polygon.technology/support/solutions/articles/82000907114-how-to-add-amoy-network-in-your-wallet-">
            • How to connect Polygon amoy to metamask&nbsp;&nbsp;
            </Link>
            <Image
                  src="/linkicon.png"
                  alt="user"
                  width={20}
                  height={20}
                  className={Style.colorChange}
                />
            </div>
            <div >
            <Link href="https://faucet.polygon.technology/">
            • Polygon free Faucet using discord&nbsp;&nbsp;
            </Link>
            <Image
                  src="/linkicon.png"
                  alt="user"
                  width={20}
                  height={20}
                  className={Style.colorChange}

                />
            </div>
            
            
          </p>
          <small>{smallInfo}</small>

          {loading == true ? (
            <Loader />
          ) : (
            <div className={Style.Model_box_right_name}>
              <div className={Style.Model_box_right_name_info}>
                <Image
                  src={images.username}
                  alt="user"
                  width={30}
                  height={30}
                />
                <input
                  type="text"
                  placeholder="your name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={Style.Model_box_right_name_info}>
                <Image src={images.account} alt="user" width={30} height={30} />
                <input
                  type="text"
                  disabled={address ? true : false}
                  placeholder={address || "enter address"}
                  onChange={(e) => setAccountAddress(e.target.value)}
                />
              </div>
              <div className={Style.Model_box_right_name_btn}>
                <button onClick={() => functionName({ name, accountAddress })}>
                  {""}
                  <Image src={images.send} alt="send" width={30} height={30} />
                  {""}
                  Submit
                </button>
                <button onClick={() => openBox(false)}>
                  {""}
                  <Image src={images.close} alt="send" width={30} height={30} />
                  {""}
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Model;
