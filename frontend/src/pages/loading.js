import React, { useState } from "react";

import Loading from "./images/loading.gif"

const [animating, setAnimating] = useState(true);

function Loading({history}) {
    useEffect(() => {
        setTimeout(() => {
          setAnimating(false);
          history.push("/")
        }, 5000);
      }, []);
  return (
      <>
      {animating &&
    <div style={{height:"100vh", width:"100vw"}}>
        <img src={Loading} style={{height:"100%", width:"100%"}}/>    
    </div>
      }
      </>
  );
}

export default Loading;