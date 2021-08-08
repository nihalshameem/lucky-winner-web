import React, { useEffect } from "react";
import { withRouter, useLocation } from "react-router-dom";
import { profileApi } from "./Components/APIConst";

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
  return <div>Home</div>;
};

export default withRouter(BasePage);
