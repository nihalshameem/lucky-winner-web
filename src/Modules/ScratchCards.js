import React, { useEffect, useState } from "react";
import { imageUrl, profileApi, scatchCardsApi } from "../Components/APIConst";
import LoaderMini from "../Components/LoaderMini";

export default function ScratchCards(props) {
  const [loader, setLoader] = useState(true);
  const [scratched, setScratched] = useState([]);
  const [unscratched, setUnscratched] = useState([]);

  useEffect(() => {
    checkStorage();
  }, []);

  useEffect(() => {
    scatchCardsApi()
      .then((res) => {
        setScratched(res.data.scratched);
        setUnscratched(res.data.unscratched);
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
  return (
    <div className="container">
      {loader && <LoaderMini />}
      <div className="row">
        {scratched &&
          scratched.map((item) => (
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
                  <button className="btn btn-lg btn-primary">Bid</button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
