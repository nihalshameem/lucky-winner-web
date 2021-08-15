import React, { useEffect, useState } from "react";
import { cashCardsApi, imageUrl, profileApi } from "../Components/APIConst";
import Banners from "../Components/Banners";
import LoaderMini from "../Components/LoaderMini";

export default function Home() {
  const [cards, setCards] = useState([]);
  const [loader, setLoader] = React.useState(true);
  useEffect(() => {
    cashCardsApi()
      .then((res) => {
        setCards(res.data.cash_cards);
      })
      .catch((e) => {
        console.log(e.response);
      });
    setLoader(false);
  }, []);
  function makeBid(id) {
    setLoader(true);
    profileApi()
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
    setLoader(false);
  }
  return (
    <div>
      {loader && <LoaderMini />}
      <Banners />
      <div className="container">
        <div className="row">
          {cards && cards.map((item) => (
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
