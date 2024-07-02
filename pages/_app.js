import "../styles/globals.css";

import React from "react";

import { ChatAppProvider } from "../Context/ChatAppContext";
import { NavBar } from "../Components/index";

const App = ({ Component, pageProps }) => {
  return (
    <div>
      <ChatAppProvider>
        <NavBar />
        <Component {...pageProps} />
      </ChatAppProvider>
    </div>
  );
};

export default App;

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }
