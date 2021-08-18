import React, { useEffect, useState } from "react";
import {
  minWithdrawApi,
  profileApi,
  walletApi,
  withdrawReqApi,
} from "../Components/APIConst";
import LoaderMini from "../Components/LoaderMini";

export default function Wallet(props) {
  const [wallet, setWallet] = useState("");
  const [minWithdraw, setMinWithdraw] = useState("");
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
    setLoader(true);
    minWithdrawApi()
      .then((res) => {
        if (res.data.status === "0") {
          alert(res.data.message);
        } else {
          setMinWithdraw(res.data.min_withdraw);
        }
        setLoader(false);
      })
      .catch((e) => {
        console.log(e);
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
    setLoader(true);
    if (wallet < minWithdraw) {
      setLoader(false);
      return alert(
        "Your Balance is lower than minimum Withdraw Request amount!"
      );
    }
    withdrawReqApi()
      .then((res) => {
        if (res.data.status === "0") {
          alert(res.data.message);
        } else {
          alert(res.data.success);
          window.location.reload();
        }
        setLoader(false);
      })
      .catch((e) => {
        console.log(e.response);
        setLoader(false);
      });
  }
  return (
    <div>
      {loader && <LoaderMini />}
      <div className="container" style={{ paddingTop: "100px" }}>
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <h3>Your Wallet has </h3>
            <h4 className="font-weight-bold">{wallet}</h4>
            <p className="text-danger bg-light fst-italic">
              Minimum Widraw Amount: ₹ {minWithdraw}
            </p>
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
