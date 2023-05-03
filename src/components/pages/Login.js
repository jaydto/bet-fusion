import React, {useState, useEffect, useContext, useCallback, useLayoutEffect} from 'react'
import Row from 'react-bootstrap/Row';
import {Formik, Field, Form} from 'formik';
import makeRequest from "../utils/fetch-request";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getFromLocalStorage, setLocalStorage} from '../utils/local-storage';
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import {Link, useNavigate} from "react-router-dom";

import Right from "../right";
import useWindowDimensions from "../header/Dimensions";
import HeaderLogin from "../header/top-login";


const Header = React.lazy(() => import('../header/header'));


const Login = () => {

    const [message, setMessage] = useState(null);
    // const {setUser} = props;

    const navigate = useNavigate();
    const [user, setUser] = useState(getFromLocalStorage("user"));


    const Notify = (message) => {
        let options = {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: 673738 /* this is hack to prevent multiple toasts */
        }
        if (message.status === 200) {
            toast.success(`🚀 ${message.message}`, options);
        } else {
            toast.error(`🦄 ${message.message}`, options);
        }

    };

    const dispatchUser = useCallback(() => {
        if (message !== null) {
            Notify(message);

            if (message.status == 200) {
                setLocalStorage('user', message.user);
                // setUser(message.user);
            }

        }
    }, [message])

    useEffect(() => {
        dispatchUser();
    }, [dispatchUser]);




    const FormTitle = () => {
        return (<div className='col-md-12 primary-bg py-3 text-center w-100 top-login-mobile' style={{margin:'0px'}}>
            <h4 className="inline-block">
                Login
            </h4>
        </div>)
    }



    const LoginInstructions = () => {
        return (<p className={"text-white py-2 px-4 font-input"}>
                Enter your phone number and password below to Login to your existing account.
            </p>

        );
    }

    return (
        <React.Fragment>
            <Header/>
            <div >
                {user?setTimeout(navigate("/"),500):""}
                <div className={"d-flex flex-row justify-content-between"}>
                    <div className="gz home w-100">
                        <div className="homepage d-flex flex-column align-items-center justify-content-center login-page">
                            <FormTitle/>
                            <LoginInstructions/>
                            <HeaderLogin setUser={setUser} login={true}/>

              
                    </div>
                    <div className={"mobile-only mobile-top"}>
                        <Right/>
                    </div>
                    </div>
                </div>
            </div>
        </React.Fragment>)
}
export default Login;
