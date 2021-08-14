import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;
const image_url = process.env.REACT_APP_IMAGE_URL;
const LOGIN_API = "customer/login";
const REGISTER_API = "customer/register";
const PROFILE_API = "customer/profile/" + localCheck();
const BANNER_API = "banners";
const CASH_CARD_API = "customer/cash-cards/" + localCheck();
const WALLET_API = "customer/wallet/" + localCheck();

function localCheck() {
  const storedData = localStorage.getItem("api_token");
  if (storedData) {
    return storedData;
  }
}

export function imageUrl(value) {
  return image_url + value;
}

export function loginApi(values) {
  return axios.post(url + LOGIN_API, values);
}

export function profileApi(values) {
  return axios.get(url + PROFILE_API, values);
}

export function registerApi(values) {
  return axios.post(url + REGISTER_API, values);
}

export function bannersApi() {
  return axios.get(url + BANNER_API);
}

export function cashCardsApi() {
  return axios.get(url + CASH_CARD_API);
}

export function walletApi() {
  return axios.get(url +  WALLET_API);
}
