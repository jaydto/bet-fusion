// api.js
import axios from "axios";
import { getFromLocalStorage, setLocalStorage } from "./local-storage";

const ENC_KEY = '2bdVweTeI42s5mkLdYHyklTMxQS5gLA7MDS6FA9cs1uobDXeruACDic0YSU3si04JGZe4Y';
// export const BASE_URL = 'http://localhost:5000';
// export const BASE_URL = 'https://api.betnare.com';
export const BASE_URL = 'https://testapi.betnare.co.ke';

const makeRequest = async ({ url, method, data = null, use_jwt = false }) => {
    url = BASE_URL + url;
    let headers = {
        "accept": "*/*"
    };

    let user = getFromLocalStorage('user');

    const updateUserSession = () => {
        if (user) {
            setLocalStorage('user', user);
        }
    };

    let jwt = null;

    if (use_jwt) {
        const sign = require('jwt-encode');
        const payload = {
            ...data,
            iat: Math.floor(Date.now() / 1000) + (1 * 60)
        };

        jwt = sign(payload, ENC_KEY);

        url += (url.match(/\?/g) ? '&' : '?') + 'token=' + jwt;
        data = null;
    } else {
        headers = { ...headers, ...{"content-type": "application/json"} };
    }

    const token = user?.token;

    if (token) {
        headers = { ...headers, ...{ Authorization: "Bearer " + token } };
    }

    // Add additional properties to headers
    headers = {
        ...headers,
        referrerPolicy: "no-referrer", // Set referrerPolicy
        redirect: 'follow',
        mode: 'cors',
        cache: 'no-cache',
        // Add more custom headers as needed for cache, redirect, etc.
    };

    try {
        const response = await axios({
            method: method,
            url: url,
            data: data,
            headers: headers,
        });

        let result = response.data;
        let status = response?.status;
        return [status, result];
    } catch (err) {
        let status = err.response?.status;
        let result = err.response?.data;
        return [status, result];
    } finally {
        updateUserSession(user);
    }
};

export default makeRequest;
