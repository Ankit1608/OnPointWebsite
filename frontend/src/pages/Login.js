import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useMutation, useQuery } from "@apollo/react-hooks";

import "./Login.css";
import AcademyNavbar from "./components/Navbar";
import Smallfooter from "./components/Smallfooter";
import { setAccessToken } from "../accessToke";
import { login, me } from "../graphql/websitegql";
import cover from "./images/cover2.png";
export default function Login({ history }) {
  const [userlogin] = useMutation(login);
  const { data: userid, error: userid_error } = useQuery(me);

  useEffect(() => {
    if (userid) {
      history.replace("/admindashboard");
    }
  }, [userid, userid_error]);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      try {
        const res = await userlogin({
          variables: {
            email: values.email,
            password: values.password,
          },
        });

        if (res) {
          setAccessToken(res.data.login.accessToken);
          history.replace("/admindashboard");
        }
      } catch (err) {
        alert("bad credentials");
      }
    },
  });

  return (
    <>
      {userid_error && (
        <>
          <AcademyNavbar />
          <div className="contact-section" id="contact">
            <div className="login-container-1">
              <div className="login-content-wrapper">
                <form onSubmit={formik.handleSubmit}>
                  <div className="login-email-wrapper">
                    <div className="login-label-container">Email</div>{" "}
                    <input
                      id="abcdefg"
                      type="email"
                      name="email"
                      required
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                  </div>
                  <div className="login-password-wrapper">
                    <div className="login-label-container">Password</div>
                    <input
                      id="abcdefg"
                      type="password"
                      name="password"
                      required
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                  </div>
                  <div>
                    <input
                      type="submit"
                      name="Login"
                      value="Login"
                      id="loginbutton"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              height: "50px",
              opacity: 0.8,
            }}
          >
            <img style={{ width: "100%", marginBottom: "-30px" }} src={cover} />
          </div>
          <Smallfooter />
        </>
      )}
    </>
  );
}
