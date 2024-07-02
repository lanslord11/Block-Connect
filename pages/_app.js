import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import "../styles/globals.css";
import React from "react";

import { ChatAppProvider } from "../Context/ChatAppContext";
import { NavBar } from "../Components/index";

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const [pageKey, setPageKey] = useState(0);

  useEffect(() => {
    const handleRouteChange = () => {
      setPageKey(prevKey => prevKey + 1);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return (
    <ChatAppProvider>
      <div>
        <NavBar />
        <div key={pageKey} className="page-content">
          <Component {...pageProps} />
        </div>
      </div>
    </ChatAppProvider>
  );
};

export default App;