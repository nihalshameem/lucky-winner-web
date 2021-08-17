import React, { useEffect, useState } from "react";
import {
  bidApi,
  cashCardsApi,
  profileApi,
  walletApi,
} from "../Components/APIConst";
import LoaderMini from "../Components/LoaderMini";

export default function Wallet(props) {
  const [wallet, setWallet] = useState("");
  const [loader, setLoader] = React.useState(true);

  useEffect(() => {
    checkStorage();
  }, []);
  useEffect(() => {
    walletApi()
      .then((res) => {
        if (res.data.status === "0") {
          alert(res.data.message);
        } else {
          setWallet(res.data.wallet);
        }
        setLoader(false);
      })
      .catch((e) => {
        console.log(e.response);
        setLoader(false);
      });
  }, []);

  function checkStorage() {
    const storedData = localStorage.getItem("api_token");
    if (storedData) {
      profileApi()
        .then((res) => {
          if (res.data.status === "0") {
            props.history.push("/login");
          }
        })
        .catch((e) => {
          console.log(e.response.data);
        });
    } else {
      props.history.push("/login");
    }
  }
  function withdrawReq() {
    alert(1);
    setLoader(true)
  }
  return (
    <div>
      {loader && <LoaderMini />}
      <div className="container" style={{ paddingTop: "100px" }}>
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <h3>Your Wallet has </h3>
            <h4 className="font-weight-bold">{wallet}</h4>
            <button
              className="btn btn-lg btn-primary mt-5"
              onClick={withdrawReq}
              disabled={loader}
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
