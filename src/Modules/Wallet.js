import React, { useEffect, useState } from "react";
import {
  minWithdrawApi,
  profileApi,
  walletApi,
  withdrawReqApi,
} from "../Components/APIConst";
import LoaderMini from "../Components/LoaderMini";
import { useSnackbar } from "react-simple-snackbar";

const success = {
  position: "bottom-left",
  style: {
    backgroundColor: "#007E33",
  },
};
const error = {
  position: "bottom-left",
  style: {
    backgroundColor: "#CC0000",
  },
};

export default function Wallet(props) {
  const [wallet, setWallet] = useState("");
  const [minWithdraw, setMinWithdraw] = useState("");
  const [loader, setLoader] = React.useState(true);
  const [openSuccess, closeSuccess] = useSnackbar(success);
  const [openError, closeError] = useSnackbar(error);

  useEffect(() => {
    checkStorage();
  }, []);
  useEffect(() => {
    walletApi()
      .then((res) => {
        if (res.data.status === "0") {
          openError(res.data.message);
        } else {
          setWallet(res.data.wallet);
        }
        setLoader(false);
      })
      .catch((e) => {
        openError("Something went wrong!");
        setLoader(false);
      });
    setLoader(true);
    minWithdrawApi()
      .then((res) => {
        if (res.data.status === "0") {
          openError(res.data.message);
        } else {
          setMinWithdraw(res.data.min_withdraw);
        }
        setLoader(false);
      })
      .catch((e) => {
        openError("Something went wrong!");
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
          openError("Something went wrong!");
        });
    } else {
      props.history.push("/login");
    }
  }
  function withdrawReq() {
    setLoader(true);
    if (wallet < minWithdraw) {
      setLoader(false);
      return openError(
        "Your Balance is lower than minimum Withdraw Request amount!"
      );
    }
    withdrawReqApi()
      .then((res) => {
        if (res.data.status === "0") {
          openError(res.data.message);
        } else {
          openSuccess(res.data.success);
          window.location.reload();
        }
        setLoader(false);
      })
      .catch((e) => {
        openError("Something went wrong!");
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
