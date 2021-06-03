import React from "react";
import "./BusinessCard.css";
export default function BusinessCard({ image, title }) {
  return (
    <div className="businesscard-container">
      <div>
        <div className="businesscard-image-wrapper">
          <img
            alt="business card image"
            src={image}
            className="businesscard-image"
          />
        </div>
        <div className="businesscard-title-wrapper">
          <h5>{title}</h5>
        </div>
      </div>
    </div>
  );
}
