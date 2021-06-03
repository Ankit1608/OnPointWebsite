import React, { useEffect, useState } from "react";
import { setAccessToken } from "./accessToke";
import Routes from "./pages/Routes";
import { ParallaxProvider } from "react-scroll-parallax";

function App() {
  const [loading, setloading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:5000/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async (x) => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setloading(false);
      console.log(accessToken);
    });
  });
  return (
    <ParallaxProvider>
      {loading && <div>loading...</div>}
      {!loading && <Routes />}
    </ParallaxProvider>
  );
}

export default App;
