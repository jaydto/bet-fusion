import { useContext, useState, useEffect} from 'react';
import axios from 'axios';
import { Context }  from '../context/store';

axios.defaults.baseURL = 'https://betnare.com';

const useAxios = () => {
    const [response, setResponse] = useState(null);
    const [state, dispatch] = useContext(Context);

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
            const res = await axios({method:method, url:url, data:data, headers:headers});
            setResponse({'data':res.data.data, 'status':res.status, 'errors':null});
            let status = res?.status,
                result = res?.data,
                errors = false;
            return {status, result};
        } catch(err){
            setResponse({'errors':err.response?.data, 'status':err.response?.status, 'data':null});
            let status = err.response?.status,
                result = err.response?.data,
                meta = null,
                errors = true;
            return {status, result}
        }
    };

    return { response, makeRequest };
};

export default useAxios;
