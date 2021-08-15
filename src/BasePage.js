import React, { useEffect } from "react";
import { withRouter, useLocation } from "react-router-dom";
import { Route } from "react-router";
import { profileApi } from "./Components/APIConst";
import Home from "./Modules/Home";
import Profile from "./Modules/Profile";
import SideBar from "./Components/SideBar";
import Login from "./Auth/Login";
import Register from "./Auth/Register";

const BasePage = (props) => {
  const location = useLocation();
  const [navbar, setNavbar] = React.useState(true);
  const [isLogged, setIsLogged] = React.useState(false);
  useEffect(() => {
    checkStorage();
    if (
      location.pathname.match("login") ||
      location.pathname.match("register")
    ) {
      setNavbar(false);
    } else {
      setNavbar(true);
    }
  }, [location.pathname, isLogged]);
  function checkStorage() {
    const storedData = localStorage.getItem("api_token");
    if (storedData) {
      profileApi()
        .then((res) => {
          if (res.data.status === "0") {
            setIsLogged(false);
          } else {
            setIsLogged(true);
          }
        })
        .catch((e) => {
          console.log(e.response.data);
        });
    }
  }
  return (
    <main>
      {(navbar || isLogged) && <SideBar />}
      {isLogged && (
        <>
          <Route exact path="/" component={Home} />
          <Route path="/profile" component={Profile} />
        </>
      )}
      {!isLogged && (
        <>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </>
      )}
    </main>
  );
};

export default withRouter(BasePage);
