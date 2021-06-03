import React from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from "react-pro-sidebar";
import {
  FaTv,
  FaHeart,
  FaBook,
  FaRoute,
  FaRegPaperPlane,
  FaUser,
  FaNetworkWired,
  FaStop,
  FaNewspaper,
} from "react-icons/fa";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import logo from "../../pages/images/whiteonpointlogo.png";
import "./Sidebar.css";
function Sidebar() {
  return (
    <div className="sidebar">
      <ProSidebar collapsed={false} width="20vw">
        <SidebarHeader>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              style={{
                height: 30,
                opacity: 0.6,
                marginBottom: 10,
                marginTop: 5,
              }}
              src={logo}
            />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="circle" popperArrow={true}>
            <MenuItem icon={<FaTv />}>
              {" "}
              <Link to="/admindashboard" />
              Dashboard
            </MenuItem>
          
            <MenuItem icon={<FaNetworkWired />}>
              {" "}
              <Link to="/admincontact" />
              Contact
            </MenuItem>
            <MenuItem icon={<FaUser />}>
              {" "}
              <Link to="/adminusers" />
              User
            </MenuItem>
            <MenuItem icon={<FaBook />}>
              {" "}
              <Link to="/adminposts" />
              Posts
            </MenuItem>
            <MenuItem icon={<FaStop />}>
              {" "}
              <Link to="/adminreport" />
              Report
            </MenuItem>
            <MenuItem icon={<FaNewspaper />}>
              {" "}
              <Link to="/adminfeedback" />
              Feedback
            </MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <h5 style={{ display: "flex", justifyContent: "center" }}>
            On Point
          </h5>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
}

export default Sidebar;
