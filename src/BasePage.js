import React, { useEffect } from "react";
import { withRouter, useLocation } from "react-router-dom";
import { Route } from "react-router";
import { profileApi } from "./Components/APIConst";
import Home from "./Modules/Home";
import Profile from "./Modules/Profile";
import SideBar from "./Components/SideBar";

const BasePage = (props) => {
  const location = useLocation();
  useEffect(() => {
    checkStorage();
  }, [location.pathname]);
  function checkStorage() {
    const storedData = localStorage.getItem("api_token");
    if (!storedData) {
      profileApi()
        .then((res) => {
          if (res.data.status === "0") {
            props.history.push("/login");
          }
        })
        .catch((e) => {
          console.log(e.response.data);
        });
    }
  }
  return (
    <main>
      <SideBar />
      <Route exact path="/" component={Home} />
      <Route path="/profile" component={Profile} />
    </main>
  );
};

export default withRouter(BasePage);
