import React, { useEffect, useState } from "react";
import {
  bidApi,
  cashCardsApi,
  categoriesApi,
  imageUrl,
  paymentKeyApi,
  profileApi,
  singleCategoryApi,
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
  const [profile, setProfile] = useState([]);
  const [categories, setCategories] = useState([]);
  const [key, setKey] = useState('');
  const [selectedCat, setSelectedCat] = useState(0);
  const [loader, setLoader] = React.useState(true);
  const [openSuccess, closeSuccess] = useSnackbar(success);
  const [openError, closeError] = useSnackbar(error);

  useEffect(() => {
    paymentKeyApi().then((res)=>{
      setKey(res.data.winners)
    }).catch((e)=>{
      openError('Something Wrong!')
    })
    checkStorage();
  }, []);
  useEffect(() => {
    setLoader(true);
    if (selectedCat === 0) {
      cashCardsApi()
        .then((res) => {
          setCards(res.data.cash_cards);
        })
        .catch((e) => {
          openError("Something went wrong!");
          console.log(e.response);
        })
        .finally(() => {
          setLoader(false);
        });
    } else {
      singleCategoryApi(selectedCat)
        .then((res) => {
          setCards(res.data.cash_cards);
        })
        .catch((e) => {
          console.log(e.response);
          openError("Category not found!");
        })
        .finally(() => {
          setLoader(false);
        });
    }
  }, [selectedCat]);

  function checkStorage() {
    const storedData = localStorage.getItem("api_token");
    if (storedData) {
      profileApi()
        .then((res) => {
          if (res.data.status === "0") {
            props.history.push("/login");
          } else {
            setProfile(res.data.user);
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

  // Razor pay module start
  const openPayModal = (item) => {
    const options = {
      key: key,
      amount: item.amount * 100, //  = INR 1
      name: "Lucky Winners",
      description: "Card Bidding",
      handler: function (response) {
        makeBid(item.id);
      },
      prefill: {
        name: profile.name,
        contact: profile.phone,
        email: profile.email,
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    categoriesApi()
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((e) => {
        openError("Categories not loaded!");
      });
  }, []);
  // Razor pay module end

  return (
    <div>
      {loader && <LoaderMini />}
      <Banners />
      <div className="categories">
        <div
          className={`single-category ${selectedCat === 0 ? "active" : ""}`}
          onClick={() => {
            setSelectedCat(0);
          }}
        >
          <div>
            <p>ALL</p>
          </div>
          <p>All</p>
        </div>
        {categories &&
          categories.map((item) => (
            <div
              className={`single-category ${
                selectedCat === item.id ? "active" : ""
              }`}
              onClick={() => {
                setSelectedCat(item.id);
              }}
              key={item.id}
            >
              <img src={imageUrl(item.image)} alt={"_image" + item.id} />
              <p>{item.name}</p>
            </div>
          ))}
      </div>
      <div className="container">
        <div className="row">
          {cards.length === 0 && (
            <div className="col-lg-12">
              <p className="text-center">No cards found!</p>
            </div>
          )}
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
                        openPayModal(item);
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
