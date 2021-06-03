import React from "react";
import "./Routes.css";
import ScrolltoTop from "./components/ScrolltoTop";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Contact from "./Contact";
import MainLanding from "./MainLanding";
import Privacy from "./Privacypolicy";
import Terms from "./Terms";
import Faq from "./Faq";
import Login from "./Login";
import AdminLanding from "../admin/Dashboard/adminlanding";
import AdminContact from "../admin/admincontact";
import AdminUsers from "../admin/adminusers";
import AdminPosts from "../admin/adminposts";
import AdminFeedback from "../admin/adminfeedback";
import AdminReport from "../admin/adminreport";
import AdminSettings from "../admin/adminsettings";

function Landing() {
  return (
    <>
      <Router>
        <ScrolltoTop />
        <Switch>
          <Route path="/" exact component={MainLanding} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/privacypolicy" exact component={Privacy} />
          <Route path="/termsandcondition" exact component={Terms} />
          <Route path="/faq" exact component={Faq} />
          <Route path="/bleeblue" exact component={Login} />
          <Route path="/admindashboard" exact component={AdminLanding} />
          <Route path="/admincontact" exact component={AdminContact} />
          <Route path="/adminusers" exact component={AdminUsers} />
          <Route path="/adminposts" exact component={AdminPosts} />
          <Route path="/adminfeedback" exact component={AdminFeedback} />
          <Route path="/adminreport" exact component={AdminReport} />
          <Route path="/adminsettings" exact component={AdminSettings} />
        </Switch>
      </Router>
    </>
  );
}

export default Landing;
