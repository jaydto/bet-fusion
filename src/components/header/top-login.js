import React, {useState, useEffect,  useCallback} from 'react'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import {Formik, Form} from 'formik';
import makeRequest from "../utils/fetch-request";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fire from "../../assets/img/fire.webp"
import {setLocalStorage} from '../utils/local-storage';
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import {Link} from "react-router-dom";
import {Switch} from "@material-ui/core";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
            <img src={fire} alt="" style={{height:"20px", width:'26px'}} />
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
                setLocalStorage('user', message.user, 2629800000);
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
        const { errors, values, setFieldValue} = props;
        const [showPassword, setShowPassword] = useState(false);

        const onFieldChanged = (ev) => {
            let field = ev.target.name;
            let value = ev.target.value;
            setFieldValue(field, value);
        }
        const label = { inputProps: { 'aria-label': 'remember me',
                'value':'Remember me'} };

        const toggleShowPassword = () => {
            setShowPassword(!showPassword);
        };

        return (
            <>
                <Form className={`ow right i web-element top-login-paddings   width-centric-page top-login-background-img`}>
                    <Row className={`d-flex flex-column`} >
                        <div className={`w-100 `}>
                            <input type="text"
                                   name="msisdn"
                                   className={`w-100 input-field button-radius text-light deposit-input form-control col input-field-login  ${errors.msisdn && 'text-danger'}`}
                                   placeholder={ "+254987654389"}
                                   onChange={ev => onFieldChanged(ev)}
                                   value={values.msisdn}
                            />
                            {errors.msisdn && <div className='text-danger'> {errors.msisdn} </div>}
                            <br/>
                            <span className={`sticky-hidden text-warning d-flex justify-content-end font-input my-2`}>
                            <div className={`text-warning`}>
                                <Switch id={"remember-me"} {...label} className="odds-change-box" name={"accept_all_odds_change"}  defaultChecked color="primary" /> Remember Me
                            </div>
                        </span>
                        </div>

                        <div className={`w-100 `}>
                            <div className="input-group input-color-icon w-100" style={{ display: 'flex' }}>
                                <input type={showPassword ? 'text' : 'password'}
                                       name="password"
                                       className={`w-75 input-field button-radius text-light deposit-input form-control col input-field-login  ${errors.password && 'text-danger'} `}
                                    // data-action="grow"
                                       autoComplete={'on'}
                                       placeholder={ "Password"}
                                       onChange={ev => onFieldChanged(ev)}
                                       value={values.password}
                                />
                                <div className=" col-2 input-group-append">
                                    <div className="input-group-text  border-0 input-color-icon">
                                        <button
                                            style={{  height: 'parent'}}
                                            type="button"
                                            className="btn btn-link text-decoration-none input-color-icon"
                                            onClick={toggleShowPassword}
                                        >
                                            {showPassword ? (
                                                <FontAwesomeIcon icon={faEyeSlash} style={{ color: 'var(--light)', fontSize: '20px' }} />
                                            ) : (
                                                <FontAwesomeIcon icon={faEye} style={{ color: 'var(--light)', fontSize: '20px' }} />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {errors.password && <div className='text-danger'> {errors.password} </div>}
                            <br/>
                            <input type="hidden" name="ref" value="{props.refURL}"/>
                            <Link to={"/reset-password"} title="Reset password"
                                  onClick={() => gaEventTracker('Reset Password')}>
                                <span className={`sticky-hidden text-warning px-2 d-flex justify-content-end"`}>Forgot Password?</span>
                            </Link>
                        </div>

                        <div className={`w-100`}>
                            <button className={`w-100 button-radius input-field btn-font cg  login-button2 mt-4 btn bold`} type="submit">
                                {isLoading ? <span>Logging In ...</span> : <span>LOGIN</span>}
                            </button>
                            <Link className="cg register-button btn btn-warning" to={"/signup"} title="Join now" onClick={() => gaEventTracker('Register')} style={login&&{display:'none'}}>
                                <span className="register-label bold">REGISTER </span>
                            </Link>
                        </div>
                        <Row className={`${login?"d-flex":"d-none"}`} style={{float: "right"}}>
                            <div className="col-12">
                                <Link className={`${login?"d-flex justify-content-center w-100":""}`} to={"/signup"} title="Join now" onClick={() => gaEventTracker('Register')}>
                                    <span className={`text-warning font-input } register-label my-3`}>Dont have an account! Register now </span>
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
        <Container className={`d-flex flex-column mx-2`}>
            <div className={`d-none`} style={{float: "right"}}>
                <div className="col-12">
                    <Link className="m-lg-2 badge bg-success d-none" to={"/verify-account"} title="Verify Account"
                       onClick={() => gaEventTracker('Verify')}>
                        <span className="register-label">VERIFY ACCOUNT</span>
                    </Link>
                </div>
            </div>
            <div style={{float: "right"}} className={` d-flex justify-content-center align-items-center flex-column w-100 container-fluid`}>
                <ToastContainer/>
                <LoginForm/>
            </div>

        </Container>
    )
}
export default React.memo(HeaderLogin);

