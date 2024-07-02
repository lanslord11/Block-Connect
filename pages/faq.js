import React from "react";
import Image from "next/image";
import Style from "../styles/faq.module.css";
import Link from "next/link";

// // import { button, h1, img } from "@mui/material";
// import InstagramIcon from '@mui/icons-material/Instagram';
// import GitHubIcon from '@mui/icons-material/GitHub';
const Faq = () => {
  return (
    <div className="aboutSection">
      {/* <div></div> */}
      {/* <div className="aboutSectionGradient"></div> */}
      <div className="aboutSectionContainer">
        {/* <h1 component="h1">About Us</h1> */}

        <div>
          <div>
            <img
              style={{
                width: "10vmax",
                height: "10vmax",
                margin: "2vmax 0",
                borderRadius: "50%",
              }}
              src="https://media.licdn.com/dms/image/D5603AQFUuxQ5vWvAnQ/profile-displayphoto-shrink_400_400/0/1719315778983?e=1725494400&v=beta&t=Fy2QBv1Ci3MpA7_uQ2PX7I38JKAToT6fk19sLLe_ydw"
              alt="Founder"
            />
            <h1>Piyush Yadav</h1>
            <div className={Style.padding}>
              <div>
                <Link href="https://github.com/lanslord11" className={Style.pointer}>
                <Image
                  src="/github.png"
                  alt="Description of the image"
                  width={40}
                  height={40}
                />
                </Link>
                
              </div>
              <div>
              <Link href="https://www.linkedin.com/in/piyush-yadav-078338204/" className={Style.pointer}>
                <Image
                  src="/linkedin.png"
                  alt="Description of the image"
                  width={40}
                  height={40}
                />
                </Link>
              </div>
              <div>
              <Link href="https://www.instagram.com/piyushyadav4493" className={Style.pointer}>
                <Image
                  src="/instagram.png"
                  alt="Description of the image"
                  width={40}
                  height={40}
                />
                </Link>
              </div>
              <div>
              <Link href="mailto:piyushyadav11102002@gmial.com" className={Style.pointer}>
                <Image
                  src="/gmail.png"
                  alt="Description of the image"
                  width={40}
                  height={40}
                />
                </Link>
              </div>
            </div>
            <span>
              {/* This is a sample wesbite made by @piyushyadav11102002@gmail. Only
              with the purpose to learn MERN Stack. */}
            </span>
          </div>
          <div className="aboutSectionContainer2">
            {/* <h1 component="h2">Visit at</h1> */}
          <p>
          This is an exciting project where I implemented a social media application for programmers based on blockchain technology, hence the name "BlockKonnect." Users can chat, make friends, post memes, like or dislike content, and even promote posts by donating cryptocurrency. The platform combines the community aspects of social media with the innovative features of blockchain, creating a unique space for programmers to connect and interact.
          </p>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
