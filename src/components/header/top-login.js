import React, {useState, useEffect, useContext, useCallback} from 'react'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import {Formik, Field, Form} from 'formik';
import makeRequest from "../utils/fetch-request";
import {Context} from '../../context/store';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fire from "../../assets/img/fire.webp"
import {setLocalStorage} from '../utils/local-storage';
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import {Link} from "react-router-dom";
import {ButtonGroup} from "react-bootstrap";
import LoginModal from "../modals/LoginModal";
import RegisterModal from "../modals/RegisterModal";
import VerifyModal from "../modals/VerifyModal";

export const  Notify = (message) => {
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
        toast(<div className={"d-flex"}>
            <img src={fire} alt="" height="24px"/>
            <span>
                {message.message}
            </span>
        </div>, options);
    }

};

const HeaderLogin = (props) => {
    const gaEventTracker = useAnalyticsEventTracker('Navigation');
    const [isLoading, setIsLoading] = useState(null)
    const [message, setMessage] = useState(null);
    const {setUser,login} = props;

    const initialValues = {
        msisdn: "",
        password: ""
    }



    const dispatchUser = useCallback(() => {
        if (message !== null) {
            Notify(message);

            if (message.status == 200) {
                setLocalStorage('user', message.user);
                setUser(message.user);
            }

        }
    }, [message])

    useEffect(() => {
        dispatchUser();
    }, [dispatchUser]);

    const handleSubmit = values => {
        let endpoint = '/v1/login';
        setIsLoading(true)
        makeRequest({url: endpoint, method: 'POST', data: values}).then(([status, response]) => {

            setIsLoading(false)
            if (status === 200 || status == 201 || status == 204) {
                setMessage(response);
            } else {
                let message = {
                    status: status,
                    message: response?.message || "Error attempting to login"
                };
                Notify(message);
            }
        })
    }


    const validate = values => {

        let errors = {}

        if (!values.msisdn || !values.msisdn.match(/(254|0|)?[71]\d{8}/g)) {
            errors.msisdn = 'Invalid phone number'
        }

        if (!values.password || values.password.length < 4) {
            errors.password = "Invalid password";
        }

        return errors
    }


    const MyLoginForm = (props) => {
        const {isValid, errors, values, submitForm, setFieldValue} = props;

        const onFieldChanged = (ev) => {
            let field = ev.target.name;
            let value = ev.target.value;
            setFieldValue(field, value);
        }
        return (
            <>
                <Form className="ow og i web-element" style={login&&{width:'97vw'}}>
                    <Row className={`${login?"d-flex flex-column":"top-login-desktop-input"}`}>
                        <div className={`${login?"w-100 ": "col-4"}`}>
                            <input type="text"
                                   name="msisdn"
                                   className={`${login?"w-100 input-field button-radius":""}  text-dark deposit-input form-control col input-field-login  ${errors.msisdn && 'text-danger'}`}
                                   // data-action="grow"
                                   placeholder={errors.msisdn || "+254........."}
                                   onChange={ev => onFieldChanged(ev)}
                                   value={values.msisdn}
                            />
                            <br/>
                            <span className={`${login?"sticky-hidden text-warning d-flex justify-content-end font-input my-2":"sticky-hidden"}`}>
                            <label><input type="checkbox" name="remember" value="1"/>Remember me</label>
                        </span>
                        </div>

                        <div className={`${login?"w-100 ": "col-4"}`}>
                            <input type="password"
                                   name="password"
                                   className={`${login?"w-100 input-field button-radius":""} text-dark deposit-input form-control col input-field-login  ${errors.password && 'text-danger'} `}
                                   // data-action="grow"
                                   placeholder={errors.password || "Password"}
                                   onChange={ev => onFieldChanged(ev)}
                                   value={values.password}
                            />
                            <br/>
                            <input type="hidden" name="ref" value="{props.refURL}"/>
                            <Link to={"/reset-password"} title="Reset password"
                               onClick={() => gaEventTracker('Reset Password')}>
                                <span className={`${login?"sticky-hidden text-warning px-2 d-flex justify-content-end":"sticky-hidden"}`}>Forgot Password?</span>
                            </Link>
                        </div>
                        <div className={`${login?"w-100":"col-4 d-flex gap-3 justify-content-end"}`}>
                            <button className={`${login?"w-100 button-radius input-field btn-font": " "} cg ${login?' login-button2 mt-4 ':' login-button '}btn bold`} type="submit">
                                {isLoading ? <span>Logging In ...</span> : <span>LOGIN</span>}
                            </button>
                            <Link className="cg register-button btn btn-warning" to={"/signup"} title="Join now" onClick={() => gaEventTracker('Register')} style={login&&{display:'none'}}>
                                <span className="register-label bold">REGISTER </span>
                            </Link>
                        </div>
                        <Row className={`${login?"d-flex":"d-none"}`} style={{float: "right"}}>
                            <div className="col-12">
                                <Link className={`${login?"d-flex justify-content-center w-100":""}`} to={"/signup"} title="Join now" onClick={() => gaEventTracker('Register')}>
                                    <span className={`${login?"text-warning font-input ":""}register-label`}>{login?"Dont have an account! Register now ": "Register now!"}</span>
                                </Link>
                                <Link className="m-lg-2 badge bg-success d-none" to={"/verify-account"} title="Verify Account"
                                      onClick={() => gaEventTracker('Verify')}>
                                    <span className="register-label">VERIFY ACCOUNT</span>
                                </Link>
                            </div>
                        </Row>
                    </Row>
                </Form>
            </>
        );
    }

    const LoginForm = (props) => {
        return (
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validateOnChange={false}
                validateOnBlur={false}
                validate={validate}
            >{(props) => <MyLoginForm {...props} />}</Formik>
        );
    }

    return (
        <Container className={`${login?"d-flex flex-column mx-2":"top-login-section"}`}>
            <Row className={`${login?"d-none":""}`} style={{float: "right"}}>
                <div className="col-12">
                    {/*<Link className="" to={"/signup"} title="Join now" onClick={() => gaEventTracker('Register')}>*/}
                    {/*    <span className="register-label">Register now!</span>*/}
                    {/*</Link>*/}
                    <Link className="m-lg-2 badge bg-success d-none" to={"/verify-account"} title="Verify Account"
                       onClick={() => gaEventTracker('Verify')}>
                        <span className="register-label">VERIFY ACCOUNT</span>
                    </Link>
                </div>
            </Row>
            <div style={{float: "right"}} className={`${login?' d-flex justify-content-center align-items-center flex-column w-100 container-fluid' :' row '}`}>
                <ToastContainer/>
                <LoginForm/>
            </div>

        </Container>
    )
}
export default React.memo(HeaderLogin);

// const HeaderLogin=()=>{
//     const gaEventTracker = useAnalyticsEventTracker('Navigation');
//     const [showLoadingModal, setShowLoadingModal] = useState(false);
//     const [showRegisterModal, setShowRegisterModal] = useState(false);
//     const [showVerifyModal, setShowVerifyModal] = useState(false);
//     const [state,dispatch]=useContext(Context)
//     const LoginCheck = (userAction) => {
//        if(userAction=='Login'){
//            state?.user !== null ? window.location.href = "/" : setShowLoadingModal(true);
//        }else if(userAction=='Register'){
//            state?.user !== null ? window.location.href = "/" :  setShowRegisterModal(true);
//        }else{
//            state?.user !== null ? window.location.href = "/" : setShowVerifyModal(true);
//        }
//
//     };
//     return (
//         <>
//         {showLoadingModal && (<LoginModal setShowLoadingModal={setShowLoadingModal} visible={showLoadingModal}/>)}
//             {showLoadingModal && (<RegisterModal setShowRegisterModal={setShowRegisterModal} visible={showRegisterModal}/>)}
//             {showLoadingModal && (<VerifyModal setShowVerifyModal={setShowVerifyModal} visible={showVerifyModal}/>)}
//         <div className={"d-flex justify-content-end"}>
//             <div className="col pad-2 mt-3 mobile-profile1 justify-content-end">
//             <div className="">
//                 <Link className="cg  login-color login-size btn bg-success text-light" to={'#'} title="Verify Account"
//                       onClick={() => {
//                           gaEventTracker('Verify');LoginCheck('Verify')
//                       }}>
//                     <span className="register-label text-light">Verify</span>
//                 </Link>
//             </div>
//             <div className="">
//                 <Link className="cg  login-color login-size btn bg-warning text-light" to={"#"} title="Join now" onClick={() => {
//                     gaEventTracker('Register');LoginCheck('Register')
//                 }}>
//                     <span className="text-light ">Register</span>
//                 </Link>
//             </div>
//
//             <Link to={"#"} className="cg  login-color login-size btn text-light" type="submit" style={{background:'rgb(82, 121, 148)'}} onClick={()=>{LoginCheck('Login')}}>
//                 <span>Login</span>
//             </Link>
//
//         </div>
//         </div>
// </>
//     )
// }
// export default React.memo(HeaderLogin);