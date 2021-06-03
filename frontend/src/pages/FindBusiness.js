import React from "react";
import "./FindBusiness.css";
import phonerepair from "./images/phonerepair.png";
import gym from "./images/gym.png";
import massage from "./images/massage.png";
import movers from "./images/movers.png";
import BusinessCard from "./components/BusinessCard";

const businesscarddata = [
  {
    title: "Phone Repair",
    image: phonerepair,
  },
  {
    title: "Gyms",
    image: gym,
  },
  {
    title: "Massage",
    image: massage,
  },
  {
    title: "Movers",
    image: movers,
  },
];
export default function FindBusiness() {
  return (
    <div className="findbusiness-main-container">
      <div className="findbusiness-heading-text">
        <h2>Find the Best Businesses in Town</h2>
      </div>
      <div className="findbusiness-iamge-container">
        {businesscarddata.map((bu) => (
          <BusinessCard title={bu.title} image={bu.image} />
        ))}
      </div>
    </div>
  );
}
