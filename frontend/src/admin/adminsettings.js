import React, { useEffect, useState } from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/react-hooks";
import { useFormik } from "formik";
import Popup from "./components/Popup";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TableReusable from "./components/TableReusable";
import { changePassword, me } from "../graphql/websitegql";
function AdminSettings({ history }) {
  const { data: userid, error: userid_error } = useQuery(me);
  const [changepass] = useMutation(changePassword);
  const [trig, settrig] = useState(-1);
  const [curruser, setCurrUser] = useState("");
  useEffect(() => {
    if (userid) {
      setCurrUser(userid);
    }
    if (userid_error) {
      history.push("/");
    }
  }, [userid, userid_error]);
  const formik = useFormik({
    initialValues: {
      adminoldpassword: "",
      adminnewpassword: "",
      oldpassword: "",
    },

    onSubmit: async (values) => {
      console.log(values.adminoldpassword);
      console.log(values.adminnewpassword);
      try{
      const res = changepass({
        variables: {
          userId: curruser.me,
          password: values.adminoldpassword,
          newpassword: values.adminnewpassword,
        },
      });
      console.log(res);
      settrig(1);
      }catch(e){
        alert("Something went wrong please try again");
      }    
    },
  });
  return (
    <>
      {userid && (
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ width: "100%" }}>
            <Header history={history} />
            <div
              style={{
                minHeight: "100vh",
                backgroundColor: "#ebedef",
                display: "flex",
                justifyContent: "center",
                paddingTop: 100,
              }}
            >
              <div
                className="login-container-1"
                style={{ backgroundColor: "#323d6d" }}
              >
                <div className="login-content-wrapper">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="login-password-wrapper">
                      <div
                        className="login-label-container"
                        style={{ color: "#fff" }}
                      >
                        Old Password
                      </div>
                      <input
                        id="abcdefg"
                        name="adminoldpassword"
                        required
                        onChange={formik.handleChange}
                        value={formik.values.adminoldpassword}
                      />
                    </div>

                    <div className="login-password-wrapper">
                      <div
                        className="login-label-container"
                        style={{ color: "#fff" }}
                      >
                        New Password
                      </div>
                      <input
                        id="abcdefg"
                        name="adminnewpassword"
                        required
                        onChange={formik.handleChange}
                        value={formik.values.adminnewpassword}
                      />
                    </div>
                    <input
                      type="submit"
                      name="Submit"
                      value="Submit"
                      id="loginbutton"
                    />
                  </form>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      )}
      {trig === 1 && (
        <Popup trigger={true} setTrigger={settrig}>
          <h1 className="popup-title">Success</h1>
          <p className="popup-message">Password Successfully Changed </p>
        </Popup>
      )}
    </>
  );
}

export default AdminSettings;
