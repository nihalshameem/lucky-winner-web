import React, { useEffect, useState } from "react";
import { imageUrl, profileApi, winnersApi } from "../Components/APIConst";
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

export default function Winners(props) {
  const [winners, setWinners] = useState([]);
  const [loader, setLoader] = React.useState(true);
  const [openError, closeError] = useSnackbar(error);

  useEffect(() => {
    checkStorage();
  }, []);
  useEffect(() => {
    winnersApi()
      .then((res) => {
        setWinners(res.data.winners);
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
  function makeBid(id) {
    setLoader(true);
    profileApi()
      .then((res) => {
        if (res.data.user.account_no === null) {
          props.history.push("/profile");
        }
      })
      .catch((e) => {
        openError("Something went wrong!");
      })
      .finally(() => {
        setLoader(false);
      });
  }
  return (
    <div>
      {loader && <LoaderMini />}
      <div className="container">
        <h3 className="text-center" style={{ paddingTop: "100px" }}>
          WINNERS
        </h3>
        <div className="row P-4">
          {winners.length === 0 && (
            <div className="col-lg-12">
              <p className="text-center">No One Won Today!</p>
            </div>
          )}
          {winners &&
            winners.map((item) => (
              <div
                className="col-xs-12 col-sm-12 col-md-6 col-lg-4"
                key={item.id}
              >
                <div className="cash-box">
                  <div className="img">
                    <img
                      src={imageUrl(item.image)}
                      className="img-responsive"
                      alt={item.name}
                    />
                  </div>
                  <div>
                    <p>{item.amount}</p>
                    <button
                      className="btn btn-lg btn-primary"
                      onClick={() => {
                        makeBid(item.id);
                      }}
                    >
                      Bid
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
