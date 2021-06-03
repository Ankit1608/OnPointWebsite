import React from "react";
import "./BusinessCatCard.css";
export default function BusinessCatCard({ image, title }) {
  return (
    <div className="business-cat-card-container">
      <div>
        <div className="business-cat-card-image-wrapper">
          <img
            alt="business card image"
            src={image}
            className="business-cat-card-image"
          />
        </div>
        <div className="business-cat-card-title-wrapper">
          <h5>{title}</h5>
        </div>
      </div>
    </div>
  );
}
