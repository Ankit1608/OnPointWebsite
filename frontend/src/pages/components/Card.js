import React from "react";
import "./Card.css";
import {
  FaClock,
  FaHeart,
  FaHome,
  FaMagic,
  FaMoneyBillAlt,
  FaNetworkWired,
  FaUtensils,
  FaWallet,
} from "react-icons/fa";

import MediaQuery from "react-responsive";
function Card({
  image,
  background,
  title,
  label1,
  label2,
  label3,
  label4,
  flag = false,
}) {
  return (
    <div
      className="card-container"
      style={{ marginRight: flag ? "50px" : "0px" }}
    >
      <MediaQuery minDeviceWidth={701}>
        <div className="card-image-container">
          <img src={image} className="card-image" />
          {flag && <div className="card-image-label">Customers</div>}
          {!flag && <div className="card-image-label">Business</div>}
        </div>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={700}>
        {" "}
        <div className="card-image-container2">
          <img src={image} className="card-image" />
          {flag && <div className="card-image-label">Customers</div>}
          {!flag && <div className="card-image-label">Business</div>}
        </div>
      </MediaQuery>
      <div className="card-text-main-container">
        <div className="card-title-text" style={{ marginBottom: "15px" }}>
          {title} ?
        </div>

        <div className="card-list-content">
          <div className="card-list">
            <div className="card-list-wrapper">
              {flag && <FaHome size={16} />}
              {!flag && <FaMoneyBillAlt size={16} />}
            </div>
            <div className="card-list-label">{label1}</div>
          </div>
          <div className="card-list">
            <div className="card-list-wrapper">
              {flag && <FaHeart size={16} />}
              {!flag && <FaUtensils size={16} />}
            </div>
            <div className="card-list-label">{label2}</div>
          </div>
          <div className="card-list">
            <div className="card-list-wrapper">
              {flag && <FaClock size={16} />}
              {!flag && <FaMagic size={15} />}
            </div>
            <div className="card-list-label">{label3}</div>
          </div>
          <div className="card-list">
            <div className="card-list-wrapper">
              {flag && <FaWallet size={16} />}
              {!flag && <FaNetworkWired size={16} />}
            </div>
            <div className="card-list-label">{label4}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
