import React from "react";
import "./SearchCategory.css";

import BusinessCatCard from "./components/BusinessCatCard";
import restaurants from "./images/restaurants.png";
import shopping from "./images/shopping.png";
import beauty from "./images/beauty.png";
import nightlife from "./images/nightlife.png";
import activelife from "./images/activelife.png";
import automotive from "./images/automotive.png";
import homeservices from "./images/home.png";
const businesscatcarddata = [
  {
    title: "Restaurants",
    image: restaurants,
  },

  {
    title: "Shopping",
    image: shopping,
  },
  {
    title: "Night Life",
    image: nightlife,
  },
  {
    title: "Active Life",
    image: activelife,
  },
];
const businesscatcarddata2 = [
  {
    title: "Beauty & Spas",
    image: beauty,
  },
  {
    title: "Automotive",
    image: automotive,
  },
  {
    title: "Home Services",
    image: homeservices,
  },
];

export default function SearchCategory() {
  return (
    <div className="search-category-main-container">
      <div className="search-category-heading-text">
        <h2>Browse Businesses by Category</h2>
      </div>
      <div className="search-category-iamge-container">
        {businesscatcarddata.map((b) => (
          <BusinessCatCard title={b.title} image={b.image} />
        ))}
      </div>
      <div className="search-category-iamge-container">
        {businesscatcarddata2.map((b) => (
          <BusinessCatCard title={b.title} image={b.image} />
        ))}
      </div>
    </div>
  );
}
