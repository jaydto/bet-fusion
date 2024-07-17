import axios from "axios";
import {
  getFromLocalStorage,
  removeItem,
  setLocalStorage,
} from "./local-storage";
import { notification } from "antd";

const ENC_KEY = '2bdVweTeI42s5mkLdYHyklTMxQS5gLA7MDS6FA9cs1uobDXeruACDic0YSU3si04JGZe4Y';
// export const BASE_URL = 'http://localhost:5000';
  // export const BASE_URL = 'https://testapi.CrashKali.co.ke';
// export const BASE_URL = 'https://51.83.99.148:5000';
// export const BASE_URL = 'http://staging.crashkali.com';
export const BASE_URL = 'https://api.crashkali.com';
// export const BASE_URL = 'https://api.betnare.com';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "*/*",
  },
});

const navigate = async () => {
  await removeItem("user"); 
};

// Function to set the flag indicating user update
const setSkipUserUpdateFlag = () => {
  localStorage.setItem("skipUserUpdate", "true");
};

// Function to check if user update should be skipped
const shouldSkipUserUpdate = () => {
  return localStorage.getItem("skipUserUpdate") === "true";
};

instance.interceptors.response.use(
  (response) => {
    const status = response?.data.status;
    if (status === 401) {
      setSkipUserUpdateFlag();
      // Redirect to the login page if not already on it
      if (window.location.pathname !== "/login") {
        // Clear user data from local storage
        navigate().then(() => {
          notification.error({
            message: "Session expired",
            description: "Please login again",
          });
           // Delay the redirection to the logout page (e.g., 3 seconds)
           setTimeout(() => {
            window.location.href = "/redirect";
          }, 3000);
        });
      }
    }
    return response;
  },
  async (error) => {
    const status = error.response?.status;
    // console.log("response_data", status);

    if (status === 401) {
      // Clear user data from local storage
      // Redirect to the login page if not already on it
      if (window.location.pathname !== "/login") {
        // Clear user data from local storage
        navigate().then(() => {
          window.location.href = "/login";
        });
      }
    }

    return Promise.reject(error);
  }
);

const makeRequest = async ({ url, method, data = null, use_jwt = false }) => {
  let user = getFromLocalStorage("user") ?? null;

  let headers = {};

  if (use_jwt) {
    const sign = require("jwt-encode");
    const payload = {
      ...data,
      iat: Math.floor(Date.now() / 1000) + 1 * 60,
    };

    const jwt = sign(payload, ENC_KEY);
    url = url;
    const data_value = {
      token: jwt,
    };
    data = data_value;
  } else {
    headers = { "content-type": "application/json" };
  }

  const token = user?.token;

  headers = {
    ...headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    referrerPolicy: "no-referrer",
    redirect: "follow",
    mode: "cors",
    cache: "no-cache",
    // Add more custom headers as needed for cache, redirect, etc.
  };

  try {
    const response = await instance({
      method: method,
      url: url,
      data: data,
      headers: headers,
    });

    let result = response.data;
    let status = response.status;
    return [status, result];
  } catch (err) {
    let status = err.response?.status;
    let result = err.response?.data;
    return [status, result];
  } finally {
    if (!shouldSkipUserUpdate()) {
      setLocalStorage("user", user);
    } else {
      // Clear the skipUserUpdate flag for the next request
      removeItem("skipUserUpdate");
    }
  }
};

export default makeRequest;