import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./Home";
import Home2 from "./Home2";
import Home3 from "./Home3";
import FooterSigdi from "./FooterSigdi";
import Nonce from "./nonce";
import Loading from "./images/Hourglass.gif";
import FindBusiness from "./FindBusiness";
import SearchCategory from "./SearchCategory";

function MainLanding() {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
    }, 5000);
  }, []);
  return (
    <>
      {!animating && (
        <>
          <Navbar />
          <Home />
          <SearchCategory />
          <Home2 />
          <FindBusiness />
          <Home3 />
          <FooterSigdi />
          <Nonce />
        </>
      )}
      {animating && (
        <div
          style={{
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <img src={Loading} style={{ height: "45px", width: "40px" }} />
        </div>
      )}
    </>
  );
}

export default MainLanding;
