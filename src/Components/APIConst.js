import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;
const image_url = process.env.REACT_APP_IMAGE_URL;
const LOGIN_API = "customer/login";
const REGISTER_API = "customer/register";
const PROFILE_API = "customer/profile/" + localCheck();
const BANNER_API = "banners";
const CASH_CARD_API = "customer/cash-cards/" + localCheck();
const WALLET_API = "customer/wallet/" + localCheck();
const PROFILE_UPDATE_API = "customer/profile-update/" + localCheck();
const SCRATCH_CARD_API = "customer/scratch-cards/" + localCheck();
const BID_API = "customer/cash-cards/bid/" + localCheck();
const SCRATCHING_API = "customer/scratched/" + localCheck();
const WITHDRAW_REQ = "customer/withdraw-request/" + localCheck();
const MIN_WITHDRAW = "customer/minimum-withdraw/" + localCheck();
const CHANGE_PASSWORD_API = "customer/change-password/" + localCheck();
const CATEGORIES = "customer/categories/" + localCheck();
const SINGLE_CATEGORY = "customer/cash-card/category/";
const WINNER_API = "winners";
const PAYMENT_KEY = "payment-key";

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
  return axios.get(url + WALLET_API);
}

export function profileUpdateApi(values) {
  return axios.post(url + PROFILE_UPDATE_API, values);
}

export function scatchCardsApi() {
  return axios.get(url + SCRATCH_CARD_API);
}

export function winnersApi() {
  return axios.get(url + WINNER_API);
}

export function bidApi(id, status) {
  return axios.post(url + BID_API, {
    cash_card_id: id,
    payment_status: status,
  });
}

export function scratchingApi(id) {
  return axios.post(url + SCRATCHING_API, {
    card_id: id,
  });
}

export function withdrawReqApi() {
  return axios.post(url + WITHDRAW_REQ);
}

export function minWithdrawApi() {
  return axios.get(url + MIN_WITHDRAW);
}

export function changePassApi(values) {
  return axios.post(url + CHANGE_PASSWORD_API, values);
}

export function categoriesApi() {
  return axios.get(url + CATEGORIES);
}

export function singleCategoryApi(id) {
  return axios.get(url + SINGLE_CATEGORY + id);
}

export function paymentKeyApi(id) {
  return axios.get(url + PAYMENT_KEY);
}
