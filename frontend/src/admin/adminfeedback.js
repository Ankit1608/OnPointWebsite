import React, { useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TableReusable from "./components/TableReusable";
import { findallfeedbacks, me } from "../graphql/websitegql";
function AdminFeedback({ history }) {
  const [dashboardfeedback, { data }] = useLazyQuery(findallfeedbacks, {
    fetchPolicy: "network-only",
  });
  const { data: userid, error: userid_error } = useQuery(me);
  const tablelabels = ["ID", "UserID", "User Name", "Feedback"];
  useEffect(() => {
    if (userid) {
      dashboardfeedback();
    }
    if (userid_error) {
      history.push("/");
    }
  }, [userid, userid_error]);

  return (
    <>
      {userid && (
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ width: "100%" }}>
            <Header history={history} />
            <div style={{ minHeight: "100vh", backgroundColor: "#ebedef" }}>
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "#fff",
                }}
              >
                {data && console.log(data.findallfeedbacks)}
                {data && (
                  <TableReusable
                    flag="allfeedbacks"
                    tablelabels={tablelabels}
                    tablelist={data.findallfeedbacks}
                  ></TableReusable>
                )}
              </div>
            </div>
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}

export default AdminFeedback;
