import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import "./Dropdown.css";
import { Link } from "react-router-dom";
import { FaUser, FaCog, FaBackward } from "react-icons/fa";
import { logout } from "../../graphql/websitegql";

const MenuItems = [
  {
    id: "admin-profile",
    title: "Profile",
    path: "/admindashboard",
    cName: "dropdown-link",
  },

  {
    id: "admin-settings",
    title: "Settings",
    path: "/adminsettings",
    cName: "dropdown-link",
  },
  {
    id: "admin-logout",
    title: "Logout",
    path: "/",
    cName: "dropdown-link",
  },
];

function Dropdown({ history }) {
  const [click, setClick] = useState(false);
  const [userlogout] = useMutation(logout);
  const handleClick = () => setClick(!click);

  const logoutuser = (id) => {
    if (id === "admin-logout") {
      try {
        const res = userlogout();
        if (res) {
          console.log("sheesh");
          history.replace("/");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? "dropdown-menu clicked" : "dropdown-menu"}
      >
        {MenuItems.map((item, index) => {
          return (
            <Link to={item.path} style={{ textDecoration: "none" }}>
              <li key={index} className="admin-list-li-container">
                {item.id === "admin-profile" && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "8px",
                      }}
                    >
                      <FaUser size={12} color="#000" />
                    </div>
                    <p className="dropdown-li-items">{item.title}</p>
                  </>
                )}
                {item.id === "admin-settings" && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "8px",
                      }}
                    >
                      <FaCog size={12} color="#000" />
                    </div>
                    <p className="dropdown-li-items">{item.title}</p>
                  </>
                )}
                {item.id === "admin-logout" && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "8px",
                      }}
                    >
                      <FaBackward size={12} color="#000" />
                    </div>

                    <div
                      onClick={() => {
                        logoutuser(item.id);
                      }}
                    >
                      <p className="dropdown-li-items">{item.title}</p>
                    </div>
                  </>
                )}
              </li>
            </Link>
          );
        })}
      </ul>
    </>
  );
}

export default Dropdown;
