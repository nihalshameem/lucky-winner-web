import React, { useEffect, useState } from "react";
import { imageUrl, profileApi, scatchCardsApi } from "../Components/APIConst";
import LoaderMini from "../Components/LoaderMini";

export default function ScratchCards(props) {
  const [loader, setLoader] = useState(true);
  const [scratched, setScratched] = useState([]);
  const [unscratched, setUnscratched] = useState([]);
  const [tabs, setTabs] = useState("1");

  useEffect(() => {
    checkStorage();
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

  useEffect(() => {
    scatchCardsApi()
      .then((res) => {
        setScratched(res.data.scratched);
        setUnscratched(res.data.unscratched);
        setLoader(false);
      })
      .catch((e) => {
        console.log(e.response);
        setLoader(false);
      });
  }, []);
  function tabChange(tab) {
    setTabs(tab);
  }
  return (
    <div className="container" style={{ paddingTop: "100px" }}>
      {loader && <LoaderMini />}
      <div class="tabbable-panel">
        <div class="tabbable-line">
          <ul class="nav nav-tabs ">
            <li class={` ${tabs === "1" ? "active" : ""}`}>
              <a
                href="#tab_default_1"
                data-toggle="tab"
                onClick={() => {
                  tabChange("1");
                }}
              >
                Unscratched
              </a>
            </li>
            <li class={` ${tabs === "2" ? "active" : ""}`}>
              <a
                href="#tab_default_2"
                data-toggle="tab"
                onClick={() => {
                  tabChange("2");
                }}
              >
                Scratched
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <div
              class={`tab-pane ${tabs === "1" ? "active" : ""}`}
              id="tab_default_1"
            >
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
                          <button className="btn btn-lg btn-primary">
                            Bid
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div
              class={`tab-pane ${tabs === "2" ? "active" : ""}`}
              id="tab_default_2"
            >
              <div className="row">
                {unscratched &&
                  unscratched.map((item) => (
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
                          <button className="btn btn-lg btn-primary">
                            Bid
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
