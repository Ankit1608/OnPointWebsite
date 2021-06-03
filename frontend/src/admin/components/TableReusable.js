import React, { useState } from "react";
import { FaEye, FaPlus, FaThumbsUp, FaTrashAlt } from "react-icons/fa";
import { CSVLink, CSVDownload } from "react-csv";
import Popup from "./Popup";
import "./TableReusable.css";
import { useMutation } from "@apollo/react-hooks";
import {
  removeContact,
  revokeRefreshToken,
  deletePost,
  verifyPost,
} from "../../graphql/websitegql";

function CtfTablelist({ flag, tablelabels, tablelist, history }) {
  const [rmcont] = useMutation(removeContact);
  const [revuser] = useMutation(revokeRefreshToken);
  const [dpost] = useMutation(deletePost);
  const [vpost] = useMutation(verifyPost);
  const [activepage, setActivePage] = useState(1);
  const [trigger, settrigger] = useState(-1);
  const [deleteuser, setDeleteUser] = useState(null);
  const [token, setToken] = useState(null);
  const [view, setViewUser] = useState(null);
  const [verifypost, setVerifyPost] = useState(null);
  const [deletepost, setDeletePost] = useState(null);
  const handleUserGistDelete = (item) => {
    setDeleteUser(item);
    settrigger(0);
  };
  const handleUserGistView = (item) => {
    setViewUser(item);
    settrigger(1);
  };

  const handletokenversionview = (item) => {
    setToken(item);
    settrigger(2);
  };

  const handleVerifyPost = (item) => {
    setVerifyPost(item);
    settrigger(3);
  };
  const handleDeletePost = (item) => {
    setDeletePost(item);
    settrigger(4);
  };
  const deletecontact = (id) => {
    const res = rmcont({ variables: { id: id } });
    console.log(res);
    if (res) {
      settrigger(-1);
      window.location.reload(false);
    }
  };
  const revoke = (id) => {
    const res = revuser({ variables: { userId: id } });
    console.log(res);
    if (res) {
      settrigger(-1);
      window.location.reload(false);
    }
  };
  const verify = (id) => {
    const res = vpost({ variables: { id: id } });
    console.log(res);
    if (res) {
      settrigger(-1);
      window.location.reload(false);
    }
  };
  const deletep = (id) => {
    const res = dpost({ variables: { id: id } });
    console.log(res);
    if (res) {
      settrigger(-1);
      window.location.reload(false);
    }
  };
  const numberofpages = Math.ceil(tablelist.length / 15);
  return (
    <>
      {flag === "allcontacts" && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "10px 5px ",
            }}
          >
            <CSVLink
              data={tablelist}
              style={{
                color: "white",
                textDecoration: "none",
                backgroundColor: "green",
                height: "30px",
                width: "100px",
                borderRadius: "7px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "sans-serif",
                fontSize: "12px",
              }}
            >
              Download csv
            </CSVLink>
          </div>
          <table
            id="ctftable"
            style={{
              width: "100%",
              color: "#ffffff",
            }}
          >
            <tbody>
              <tr className="table-header">
                {tablelabels.map((label) => (
                  <td>{label}</td>
                ))}
              </tr>
              {tablelist
                .slice((activepage - 1) * 15, activepage * 15)
                .map((item) => {
                  return (
                    <>
                      <tr className="table-data" key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name} </td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td>
                          <div>
                            {" "}
                            {`${item.description.substring(0, 40)}...`}
                          </div>
                        </td>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginRight: "-15px",
                            }}
                          >
                            <div
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                handleUserGistView(item);
                              }}
                            >
                              <FaEye size={15} color="green" />
                            </div>
                            <div
                              style={{ marginLeft: "10px", cursor: "pointer" }}
                              onClick={() => {
                                handleUserGistDelete(item);
                              }}
                            >
                              <FaTrashAlt size={15} color="tomato" />
                            </div>
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "15px 10px 5px 10px",
            }}
          >
            {numberofpages === 1 && (
              <>
                <p className="table-pageactive">1</p>
              </>
            )}
            {numberofpages === 2 && (
              <>
                <p
                  onClick={() => {
                    setActivePage(1);
                  }}
                  className={
                    activepage === 1
                      ? "table-pageactive"
                      : "table-pageunavailable"
                  }
                >
                  1
                </p>
                <p
                  onClick={() => {
                    setActivePage(2);
                  }}
                  className={
                    activepage === 2
                      ? "table-pageactive"
                      : "table-pageunavailable"
                  }
                >
                  2
                </p>
              </>
            )}
            {numberofpages === 3 && (
              <>
                <p
                  onClick={() => {
                    setActivePage(activepage === 1 ? 1 : activepage - 1);
                  }}
                  className={
                    activepage === 1
                      ? "table-pageactive"
                      : "table-pageunavailable"
                  }
                >
                  {activepage === 1 ? 1 : activepage - 1}
                </p>
                <p
                  onClick={() => {
                    setActivePage(activepage === 1 ? 2 : activepage);
                  }}
                  className={
                    activepage === 1
                      ? "table-pageunavailable"
                      : "table-pageactive"
                  }
                >
                  {activepage === 1 ? 2 : activepage}
                </p>
                <p
                  onClick={() => {
                    setActivePage(
                      activepage === 1
                        ? 3
                        : activepage + 1 <= numberofpages
                        ? activepage + 1
                        : 1
                    );
                  }}
                  className="table-pageunavailable"
                >
                  {activepage === 1
                    ? 3
                    : activepage + 1 <= numberofpages
                    ? activepage + 1
                    : 1}
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {flag === "allusers" && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "10px 5px ",
            }}
          >
            <CSVLink
              data={tablelist}
              style={{
                color: "white",
                textDecoration: "none",
                backgroundColor: "green",
                height: "30px",
                width: "100px",
                borderRadius: "7px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "sans-serif",
                fontSize: "12px",
              }}
            >
              Download csv
            </CSVLink>
          </div>
          <table
            id="ctftable"
            style={{
              width: "100%",
              color: "#ffffff",
            }}
          >
            <tbody>
              <tr className="table-header">
                {tablelabels.map((label) => (
                  <td>{label}</td>
                ))}
              </tr>
              {tablelist
                .slice((activepage - 1) * 15, activepage * 15)
                .map((item) => {
                  return (
                    <>
                      <tr className="table-data" key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name} </td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td>{item.tokenVersion}</td>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginRight: "-15px",
                            }}
                          >
                            <div
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                handletokenversionview(item);
                              }}
                            >
                              <FaPlus size={15} color="green" />
                            </div>
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "15px 10px 5px 10px",
            }}
          >
            {numberofpages === 1 && (
              <>
                <p className="table-pageactive">1</p>
              </>
            )}
            {numberofpages === 2 && (
              <>
                <p
                  onClick={() => {
                    setActivePage(1);
                  }}
                  className={
                    activepage === 1
                      ? "table-pageactive"
                      : "table-pageunavailable"
                  }
                >
                  1
                </p>
                <p
                  onClick={() => {
                    setActivePage(2);
                  }}
                  className={
                    activepage === 2
                      ? "table-pageactive"
                      : "table-pageunavailable"
                  }
                >
                  2
                </p>
              </>
            )}
            {numberofpages === 3 && (
              <>
                <p
                  onClick={() => {
                    setActivePage(activepage === 1 ? 1 : activepage - 1);
                  }}
                  className={
                    activepage === 1
                      ? "table-pageactive"
                      : "table-pageunavailable"
                  }
                >
                  {activepage === 1 ? 1 : activepage - 1}
                </p>
                <p
                  onClick={() => {
                    setActivePage(activepage === 1 ? 2 : activepage);
                  }}
                  className={
                    activepage === 1
                      ? "table-pageunavailable"
                      : "table-pageactive"
                  }
                >
                  {activepage === 1 ? 2 : activepage}
                </p>
                <p
                  onClick={() => {
                    setActivePage(
                      activepage === 1
                        ? 3
                        : activepage + 1 <= numberofpages
                        ? activepage + 1
                        : 1
                    );
                  }}
                  className="table-pageunavailable"
                >
                  {activepage === 1
                    ? 3
                    : activepage + 1 <= numberofpages
                    ? activepage + 1
                    : 1}
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {flag === "allfeedbacks" && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "10px 5px ",
            }}
          >
            <CSVLink
              data={tablelist}
              style={{
                color: "white",
                textDecoration: "none",
                backgroundColor: "green",
                height: "30px",
                width: "100px",
                borderRadius: "7px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "sans-serif",
                fontSize: "12px",
              }}
            >
              Download csv
            </CSVLink>
          </div>
          <table
            id="ctftable"
            style={{
              width: "100%",
              color: "#ffffff",
            }}
          >
            <tbody>
              <tr className="table-header">
                {tablelabels.map((label) => (
                  <td>{label}</td>
                ))}
              </tr>
              {tablelist
                .slice((activepage - 1) * 15, activepage * 15)
                .map((item) => {
                  return (
                    <>
                      <tr className="table-data" key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.userid} </td>
                        <td>{item.username}</td>
                        <td>{item.feedback}</td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "15px 10px 5px 10px",
            }}
          >
            {numberofpages === 1 && (
              <>
                <p className="table-pageactive">1</p>
              </>
            )}
            {numberofpages === 2 && (
              <>
                <p
                  onClick={() => {
                    setActivePage(1);
                  }}
                  className={
                    activepage === 1
                      ? "table-pageactive"
                      : "table-pageunavailable"
                  }
                >
                  1
                </p>
                <p
                  onClick={() => {
                    setActivePage(2);
                  }}
                  className={
                    activepage === 2
                      ? "table-pageactive"
                      : "table-pageunavailable"
                  }
                >
                  2
                </p>
              </>
            )}
            {numberofpages === 3 && (
              <>
                <p
                  onClick={() => {
                    setActivePage(activepage === 1 ? 1 : activepage - 1);
                  }}
                  className={
                    activepage === 1
                      ? "table-pageactive"
                      : "table-pageunavailable"
                  }
                >
                  {activepage === 1 ? 1 : activepage - 1}
                </p>
                <p
                  onClick={() => {
                    setActivePage(activepage === 1 ? 2 : activepage);
                  }}
                  className={
                    activepage === 1
                      ? "table-pageunavailable"
                      : "table-pageactive"
                  }
                >
                  {activepage === 1 ? 2 : activepage}
                </p>
                <p
                  onClick={() => {
                    setActivePage(
                      activepage === 1
                        ? 3
                        : activepage + 1 <= numberofpages
                        ? activepage + 1
                        : 1
                    );
                  }}
                  className="table-pageunavailable"
                >
                  {activepage === 1
                    ? 3
                    : activepage + 1 <= numberofpages
                    ? activepage + 1
                    : 1}
                </p>
              </>
            )}
          </div>
        </div>
      )}
      {flag === "allreports" && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "10px 5px ",
            }}
          >
            <CSVLink
              data={tablelist}
              style={{
                color: "white",
                textDecoration: "none",
                backgroundColor: "green",
                height: "30px",
                width: "100px",
                borderRadius: "7px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "sans-serif",
                fontSize: "12px",
              }}
            >
              Download csv
            </CSVLink>
          </div>
          <table
            id="ctftable"
            style={{
              width: "100%",
              color: "#ffffff",
            }}
          >
            <tbody>
              <tr className="table-header">
                {tablelabels.map((label) => (
                  <td>{label}</td>
                ))}
              </tr>
              {tablelist
                .slice((activepage - 1) * 15, activepage * 15)
                .map((item) => {
                  return (
                    <>
                      <tr className="table-data" key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.userid} </td>
                        <td>{item.postid}</td>
                        <td> <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginRight: "-15px",
                            }}
                          >
                            
                            <div
                              style={{ marginLeft: "10px", cursor: "pointer" }}
                              onClick={() => {
                                handleDeletePost(item);
                              }}
                            >
                              <FaTrashAlt size={15} color="tomato" />
                            </div>
                          </div></td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "15px 10px 5px 10px",
            }}
          >
            {numberofpages === 1 && (
              <>
                <p className="table-pageactive">1</p>
              </>
            )}
            {numberofpages === 2 && (
              <>
                <p
                  onClick={() => {
                    setActivePage(1);
                  }}
                  className={
                    activepage === 1
                      ? "table-pageactive"
                      : "table-pageunavailable"
                  }
                >
                  1
                </p>
                <p
                  onClick={() => {
                    setActivePage(2);
                  }}
                  className={
                    activepage === 2
                      ? "table-pageactive"
                      : "table-pageunavailable"
                  }
                >
                  2
                </p>
              </>
            )}
            {numberofpages === 3 && (
              <>
                <p
                  onClick={() => {
                    setActivePage(activepage === 1 ? 1 : activepage - 1);
                  }}
                  className={
                    activepage === 1
                      ? "table-pageactive"
                      : "table-pageunavailable"
                  }
                >
                  {activepage === 1 ? 1 : activepage - 1}
                </p>
                <p
                  onClick={() => {
                    setActivePage(activepage === 1 ? 2 : activepage);
                  }}
                  className={
                    activepage === 1
                      ? "table-pageunavailable"
                      : "table-pageactive"
                  }
                >
                  {activepage === 1 ? 2 : activepage}
                </p>
                <p
                  onClick={() => {
                    setActivePage(
                      activepage === 1
                        ? 3
                        : activepage + 1 <= numberofpages
                        ? activepage + 1
                        : 1
                    );
                  }}
                  className="table-pageunavailable"
                >
                  {activepage === 1
                    ? 3
                    : activepage + 1 <= numberofpages
                    ? activepage + 1
                    : 1}
                </p>
              </>
            )}
          </div>
        </div>
      )}
      {flag === "allposts" && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "10px 5px ",
            }}
          >
            <CSVLink
              data={tablelist}
              style={{
                color: "white",
                textDecoration: "none",
                backgroundColor: "green",
                height: "30px",
                width: "100px",
                borderRadius: "7px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "sans-serif",
                fontSize: "12px",
              }}
            >
              Download csv
            </CSVLink>
          </div>
          <table
            id="ctftable"
            style={{
              width: "100%",
              color: "#ffffff",
            }}
          >
            <tbody>
              <tr className="table-header">
                {tablelabels.map((label) => (
                  <td>{label}</td>
                ))}
              </tr>
              {tablelist
                .slice((activepage - 1) * 15, activepage * 15)
                .map((item) => {
                  return (
                    <>
                      <tr className="table-data" key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.userid} </td>
                        <td>{item.title}</td>
                        <td>{item.category}</td>
                        <td>{item.verified ? "True" : "False"}</td>
                        <td>{item.description}</td>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginRight: "-15px",
                            }}
                          >
                            <div
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                handleVerifyPost(item);
                              }}
                            >
                              <FaThumbsUp size={15} color="green" />
                            </div>
                            <div
                              style={{ marginLeft: "10px", cursor: "pointer" }}
                              onClick={() => {
                                handleDeletePost(item);
                              }}
                            >
                              <FaTrashAlt size={15} color="tomato" />
                            </div>
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "15px 10px 5px 10px",
            }}
          >
            {numberofpages === 1 && (
              <>
                <p className="table-pageactive">1</p>
              </>
            )}
            {numberofpages === 2 && (
              <>
                <p
                  onClick={() => {
                    setActivePage(1);
                  }}
                  className={
                    activepage === 1
                      ? "table-pageactive"
                      : "table-pageunavailable"
                  }
                >
                  1
                </p>
                <p
                  onClick={() => {
                    setActivePage(2);
                  }}
                  className={
                    activepage === 2
                      ? "table-pageactive"
                      : "table-pageunavailable"
                  }
                >
                  2
                </p>
              </>
            )}
            {numberofpages === 3 && (
              <>
                <p
                  onClick={() => {
                    setActivePage(activepage === 1 ? 1 : activepage - 1);
                  }}
                  className={
                    activepage === 1
                      ? "table-pageactive"
                      : "table-pageunavailable"
                  }
                >
                  {activepage === 1 ? 1 : activepage - 1}
                </p>
                <p
                  onClick={() => {
                    setActivePage(activepage === 1 ? 2 : activepage);
                  }}
                  className={
                    activepage === 1
                      ? "table-pageunavailable"
                      : "table-pageactive"
                  }
                >
                  {activepage === 1 ? 2 : activepage}
                </p>
                <p
                  onClick={() => {
                    setActivePage(
                      activepage === 1
                        ? 3
                        : activepage + 1 <= numberofpages
                        ? activepage + 1
                        : 1
                    );
                  }}
                  className="table-pageunavailable"
                >
                  {activepage === 1
                    ? 3
                    : activepage + 1 <= numberofpages
                    ? activepage + 1
                    : 1}
                </p>
              </>
            )}
          </div>
        </div>
      )}
      {trigger === 0 && (
        <Popup trigger={true} setTrigger={settrigger}>
          <h1 className="popup-title">Are You sure you want to delete?</h1>
          <p className="popup-message">{deleteuser.email} </p>
          <p className="popup-message">{deleteuser.description} </p>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={() => {
                deletecontact(deleteuser.id);
              }}
              style={{
                color: "white",
                backgroundColor: "tomato",
                height: "30px",
                width: "70px",
                fontFamily: "sans-serif",
                fontSize: "12px",
                borderWidth: "0px",
                borderRadius: "7px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </Popup>
      )}
      {trigger === 1 && (
        <Popup trigger={true} setTrigger={settrigger}>
          <h1 className="popup-title">{view.email}</h1>
          <p className="popup-message">{view.description} </p>
        </Popup>
      )}

      {trigger === 2 && (
        <Popup trigger={true} setTrigger={settrigger}>
          <h1 className="popup-title">
            Are You sure you want to revoke token version?
          </h1>
          <p className="popup-message">{token.email} </p>
          <p className="popup-message">{token.description} </p>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={() => {
                revoke(token.id);
              }}
              style={{
                color: "white",
                backgroundColor: "tomato",
                height: "30px",
                width: "70px",
                fontFamily: "sans-serif",
                fontSize: "12px",
                borderWidth: "0px",
                borderRadius: "7px",
                cursor: "pointer",
              }}
            >
              Revoke
            </button>
          </div>
        </Popup>
      )}
      {trigger === 3 && (
        <Popup trigger={true} setTrigger={settrigger}>
          <h1 className="popup-title">
            Are You sure you want to verify this post?
          </h1>
          <p className="popup-message">{verifypost.title} </p>
          <p className="popup-message">{verifypost.description} </p>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={() => {
                verify(verifypost.id);
              }}
              style={{
                color: "white",
                backgroundColor: "tomato",
                height: "30px",
                width: "70px",
                fontFamily: "sans-serif",
                fontSize: "12px",
                borderWidth: "0px",
                borderRadius: "7px",
                cursor: "pointer",
              }}
            >
              Verify
            </button>
          </div>
        </Popup>
      )}
      {trigger === 4 && (
        <Popup trigger={true} setTrigger={settrigger}>
          <h1 className="popup-title">
            Are You sure you want to delete this post?
          </h1>
          <p className="popup-message">{deletepost.title} </p>
          <p className="popup-message">{deletepost.description} </p>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={() => {
                deletep(deletepost.id);
              }}
              style={{
                color: "white",
                backgroundColor: "tomato",
                height: "30px",
                width: "70px",
                fontFamily: "sans-serif",
                fontSize: "12px",
                borderWidth: "0px",
                borderRadius: "7px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </Popup>
      )}
    </>
  );
}

export default CtfTablelist;
