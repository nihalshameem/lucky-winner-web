import React, { useEffect, useState } from "react";
import {
  bidApi,
  cashCardsApi,
  imageUrl,
  profileApi,
} from "../Components/APIConst";
import Banners from "../Components/Banners";
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

export default function Home(props) {
  const [cards, setCards] = useState([]);
  const [loader, setLoader] = React.useState(true);
  const [openSuccess, closeSuccess] = useSnackbar(success);
  const [openError, closeError] = useSnackbar(error);

  useEffect(() => {
    checkStorage();
  }, []);
  useEffect(() => {
    cashCardsApi()
      .then((res) => {
        setCards(res.data.cash_cards);
      })
      .catch((e) => {
        openError("Something went wrong!");
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
        } else {
          bidApi(id, 1).then((res) => {
            if (res.data.status === "0") {
              openError(
                res.data.message ||
                  res.data.cash_card_id ||
                  res.data.payment_status
              );
              setLoader(false);
            } else {
              openSuccess(res.data.success);
              setLoader(false);
            }
          });
        }
      })
      .catch((e) => {
        openError("Something went wrong!");
        setLoader(false);
      });
  }
  return (
    <div>
      {loader && <LoaderMini />}
      <Banners />
      <div className="container">
        <div className="row">
          {cards &&
            cards.map((item) => (
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
