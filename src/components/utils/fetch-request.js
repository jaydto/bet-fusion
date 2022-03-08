const BASE_URL = 'https://api.betnare.com';

const makeRequest = async ({ url, method, data = null}) => {
    let headers = {
       "content-type": "application/json",
       "accept": "*/*"
    };

    const token = localStorage.getItem("auth_token");

    if(token){
        headers = { ...headers, ...{Authorization : "Bearer " + token}}
    }
    try {
          let request = {
            method: method,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: headers,
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
          }
          if(data) {
              request['body'] = JSON.stringify(data)
          }
          url = BASE_URL + url;

          console.log("making req", url,  request);
          const response = await fetch(url, request);
          let result = await response.json();
          let status = response?.status;
          return [status, result];
    } catch(err){
        let status = err.response?.status,
            result = err.response?.data;
        return [status, result]
    }
};

export default makeRequest;

