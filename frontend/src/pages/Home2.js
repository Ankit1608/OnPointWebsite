import React, { Component } from "react";
import chef from "./images/seller.png";
import plate from "./images/customer.png";
import Card from "./components/Card";
import Backg1 from "./images/leftrect.png";
import Backg2 from "./images/rightrect.png";
import "./Home2.css";
import Delivery from "./images/Delivery.png";

function Home2() {
  return (
    <>
      <div className="home2-section">
        <Card
          image={plate}
          title={"What we need"}
          label1={"We miss ghar ka khana"}
          label2={"Need some healthy food"}
          label3={"Don't have time to cook"}
          label4={"Pocket friendly bhi chahiye"}
          flag={true}
        />

        <Card
          image={chef}
          title={"What we need"}
          label1={"Want to earn some extra money"}
          label2={"Have always loved cooking"}
          label3={"To show what a happy meal is"}
          label4={"Want our food to get recognized "}
        />
      </div>
      <div className="home2-delivery-container">
        <div
          className="home2-delivery-image"
          style={{ backgroundImage: `url(${Delivery})` }}
        />
      </div>
    </>
  );
}

export default Home2;
