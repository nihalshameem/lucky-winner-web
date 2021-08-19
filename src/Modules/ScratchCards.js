import React, { useEffect, useState } from "react";
import {
  imageUrl,
  profileApi,
  scatchCardsApi,
  scratchingApi,
} from "../Components/APIConst";
import LoaderMini from "../Components/LoaderMini";
import ScratchCard from "react-scratchcard";
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

const settings = {
  width: 225,
  height: 225,
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgxKSd6gGf2vNgUZiXyTRUhVE8MoYSS7CnSA&usqp=CAU",
  finishPercent: 60,
};

export default function ScratchCards(props) {
  const [loader, setLoader] = useState(true);
  const [scratched, setScratched] = useState([]);
  const [unscratched, setUnscratched] = useState([]);
  const [tabs, setTabs] = useState("1");
  const [openSuccess, closeSuccess] = useSnackbar(success);
  const [openError, closeError] = useSnackbar(error);

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
          openError("Something went wrong!");
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
        openError("Something went wrong!");
        setLoader(false);
      });
  }, [tabs]);
  function tabChange(tab) {
    setLoader(true);
    setTabs(tab);
  }
  function completed(id) {
    setLoader(true);
    scratchingApi(id)
      .then((res) => {
        if (res.data.status === "0") {
          openError(res.data.message);
        } else {
          openSuccess(res.data.message);
        }
        setUnscratched(unscratched.filter((item) => item.id !== id));
        setLoader(false);
      })
      .catch((e) => {
        openError("Something went wrong!");
        setLoader(false);
      });
  }
  return (
    <div className="container" style={{ paddingTop: "100px" }}>
      {loader && <LoaderMini />}
      <div className="tabbable-panel">
        <div className="tabbable-line">
          <ul className="nav nav-tabs ">
            <li className={` ${tabs === "1" ? "active" : ""}`}>
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
            <li className={` ${tabs === "2" ? "active" : ""}`}>
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
          <div className="tab-content">
            <div
              className={`tab-pane ${tabs === "1" ? "active" : ""}`}
              id="tab_default_1"
            >
              <div className="scratch-cards">
                {unscratched &&
                  unscratched.map((item) => (
                    <div style={{ margin: "0 10px" }} key={item.id}>
                      <div
                        className="cash-box"
                        style={{ width: "225px", height: "225px" }}
                      >
                        <ScratchCard
                          {...settings}
                          onComplete={() => {
                            completed(item.id);
                          }}
                        >
                          <h1 className="scratch-amt">₹ {item.amount}</h1>
                        </ScratchCard>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div
              className={`tab-pane ${tabs === "2" ? "active" : ""}`}
              id="tab_default_2"
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
                          <h4>{item.amount}</h4>
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
