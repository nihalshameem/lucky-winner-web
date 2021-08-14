import React, { useEffect, useState } from "react";
import { cashCardsApi, imageUrl } from "../Components/APIConst";
import Banners from "../Components/Banners";

export default function Home() {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    cashCardsApi()
      .then((res) => {
        setCards(res.data.cash_cards);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, []);
  return (
    <div>
      <Banners />
      <div className="container">
        <div className="row">
          {cards.map((item) => (
            <div
              className="col-xs-12 col-sm-12 col-md-6 col-lg-4"
              key={item.id}
            >
              <div className="cash-box">
                <div className='img'>
                  <img
                    src={imageUrl(item.image)}
                    className="img-responsive"
                    alt={item.name}
                  />
                </div>
                <div>
                  <p>{item.amount}</p>
                  <button className='btn btn-lg btn-primary'>Bid</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
