import React, { useEffect, useState } from "react";
import { imageUrl, profileApi, winnersApi } from "../Components/APIConst";
import LoaderMini from "../Components/LoaderMini";

export default function Winners(props) {
  const [winners, setWinners] = useState([]);
  const [loader, setLoader] = React.useState(true);

  useEffect(() => {
    checkStorage();
  }, []);
  useEffect(() => {
    winnersApi()
      .then((res) => {
        setWinners(res.data.cash_cards);
      })
      .catch((e) => {
        console.log(e.response);
      });
    setLoader(false);
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
  function makeBid(id) {
    setLoader(true);
    profileApi()
      .then((res) => {
        if (res.data.user.account_no === null) {
          props.history.push("/profile");
        }
      })
      .catch((e) => {
        console.log(e.response);
      });
    setLoader(false);
  }
  return (
    <div>
      {loader && <LoaderMini />}
      <div className="container">
        <div className="row" style={{ paddingTop: "50px" }}>
          {!winners && (
            <div className="col-lg-12">
              <h3 className="text-center">No One Won Yet!</h3>
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
