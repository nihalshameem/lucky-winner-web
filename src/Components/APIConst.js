import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;
const LOGIN_API = "customer/login";
const REGISTER_API = "customer/register";
const PROFILE_API = "customer/profile/" + localCheck();

function localCheck() {
  const storedData = localStorage.getItem("api_token");
  if (storedData) {
    return storedData;
  }
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
