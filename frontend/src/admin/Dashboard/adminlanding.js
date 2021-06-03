import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";
import hacker from "../../pages/images/hacker.png";
import Card1 from "./Card1";
import TableReusable from "../components/TableReusable";
import MyChart from "./MyChart";
import { Line } from "react-chartjs-2";
import {
  findallcontacts,
  me,
  findallusers,
  findallposts,
  findallreports,
} from "../../graphql/websitegql";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
    },
    {
      label: "Second dataset",
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: "#742774",
    },
  ],
};

function Dashboard({ history }) {
  const [dashboardcontacts, { data: contact }] = useLazyQuery(findallcontacts, {
    fetchPolicy: "network-only",
  });
  const [dashboardusers, { data: users }] = useLazyQuery(findallusers, {
    fetchPolicy: "network-only",
  });
  const [dashboardposts, { data: posts }] = useLazyQuery(findallposts, {
    fetchPolicy: "network-only",
  });
  const [dashboardreports, { data: report }] = useLazyQuery(findallreports, {
    fetchPolicy: "network-only",
  });
  const { data: userid, error: userid_error } = useQuery(me);
  useEffect(() => {
    if (userid) {
      dashboardcontacts();
      dashboardusers();
      dashboardposts();
      dashboardreports();
    }
    if (userid_error) {
      history.push("/");
    }
  }, [userid, userid_error]);
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ width: "100%" }}>
        <Header />
        <div style={{ minHeight: "100vh", backgroundColor: "#ebedef" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img style={{ height: "150px" }} src={hacker} />
            <div className="dashboard-title">
              <h4 style={{ marginTop: "10px" }}> Hey Wassaappp</h4>
              <h6 style={{ marginTop: "10px", color: "#777" }}>
                Welcome to admin dashboard
              </h6>
            </div>
          </div>
          <div className="dashboard-tile-container">
            {users && (
              <Card1
                Icon="user"
                title="Number of Users"
                Number={users.findallusers.length}
              />
            )}
            {posts && (
              <Card1
                Icon="video"
                title="Number of Posts"
                Number={posts.findallposts.length}
              />
            )}
            {contact && (
              <Card1
                Icon="paths"
                title="Number of Contacts"
                Number={contact.findallcontacts.length}
              />
            )}
            {report && (
              <Card1
                Icon="likes"
                title="Number of Reports"
                Number={report.findallreports.length}
              />
            )}
          </div>
          <div className="dashboard-tile2-container">
            <div className="dashboard-card2-container">
              <h3
                style={{ marginTop: "10px", color: "#777", fontSize: "15px" }}
              >
                Order Traffic
              </h3>
              <div style={{ position: "relative" }}>
                <Line data={data} />
              </div>
            </div>
            <div className="dashboard-card2-container">
              <h3
                style={{ marginTop: "10px", color: "#777", fontSize: "15px" }}
              >
                Stats Reports
              </h3>
              <div className="dashboard-card2-wrapper1">
                <div className="dashboard-card2-tile1">
                  <div>
                    <h3>Users</h3>
                    {users && <p>{users.findallusers.length}</p>}
                  </div>
                </div>
                <div className="dashboard-card2-tile2">
                  <div>
                    <h3>Posts</h3>
                    {posts && <p>{posts.findallposts.length}</p>}
                  </div>
                </div>
              </div>
              <div className="dashboard-card2-wrapper1">
                <div className="dashboard-card2-tile3">
                  <div>
                    <h3>Subscribers</h3>
                    {users && <p>{users.findallusers.length}</p>}
                  </div>
                </div>
                <div className="dashboard-card2-tile4">
                  <div>
                    <h3>Contact</h3>
                    {contact && <p>{contact.findallcontacts.length}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
