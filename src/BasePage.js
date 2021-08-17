import React, { useEffect } from "react";
import { useLocation, withRouter } from "react-router-dom";
import { Route } from "react-router";
import Home from "./Modules/Home";
import Profile from "./Modules/Profile";
import SideBar from "./Components/SideBar";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import ScratchCards from "./Modules/ScratchCards";
import Winners from "./Modules/Winners";
import Wallet from "./Modules/Wallet";

const BasePage = (props) => {
  const location = useLocation();
  const [navbar, setNavbar] = React.useState(true);

  useEffect(() => {
    if (
      location.pathname.match("login") ||
      location.pathname.match("register")
    ) {
      setNavbar(false);
    } else {
      setNavbar(true);
    }
  }, [location.pathname]);
  return (
    <main>
      {navbar && <SideBar />}
      <Route exact path="/" component={Home} />
      <Route path="/profile" component={Profile} />
      <Route path="/scratch-cards" component={ScratchCards} />
      <Route path="/wallet" component={Wallet} />
      <Route path="/winners" component={Winners} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </main>
  );
};

export default withRouter(BasePage);
