import React, {useState, useEffect, useContext, useCallback} from 'react'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import {Formik, Field, Form} from 'formik';
import makeRequest from "../../utils/fetch-request";
import {Context} from '../../../context/store';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {setLocalStorage} from '../../utils/local-storage';
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";
import BetnareLogo from "../../../assets/img/logo.png"
import {useNavigate} from "react-router-dom";


const Login = () => {
    const gaEventTracker = useAnalyticsEventTracker('Navigation');
    const [isLoading, setIsLoading] = useState(null)
    const [message, setMessage] = useState(null);
    // const {setUser} = props;
    const navigate=useNavigate();

    const initialValues = {
        msisdn: "",
        password: ""
    }

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

    const handleSubmit = values => {
        let endpoint = '/v1/login';
        setIsLoading(true)
        makeRequest({url: endpoint, method: 'POST', data: values}).then(([status, response]) => {

            setIsLoading(false)
            if (status === 200 || status == 201 || status == 204) {
                setMessage(response);
                navigate("/")

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
    const FormTitle = () => {
        return (
            <div className='col-md-12 primary-bg p-4 text-center'>
                <h4 className="inline-block">
                    Login
                </h4>
            </div>
        )
    }

    const MyLoginForm = (props) => {
        const {isValid, errors, values, submitForm, setFieldValue} = props;

        const onFieldChanged = (ev) => {
            let field = ev.target.name;
            let value = ev.target.value;
            setFieldValue(field, value);
        }
        return (
            <div className={"d-flex w-100 justify-content-center"}>
                <Form className="form-group row d-flex justify-content-center w-100">

                        <div className="col-md-12">
                            <input type="text"
                                   name="msisdn"
                                   className={`text-dark button-radius form-control input-field font-input ${errors.msisdn && 'text-danger'}`}
                                   data-action="grow"
                                   placeholder={errors.msisdn?errors.msisdn: "Enter phone number"}
                                   onChange={ev => onFieldChanged(ev)}
                                   value={values.msisdn}
                            />
                            <br/>
                            <span className="sticky-hidden text-warning d-flex justify-content-end font-input">
                            <label><input type="checkbox" name="remember" value="1"/>Remember me</label>
                        </span>
                        </div>
                    <div className={"form-group  d-flex justify-content-center my-4 font-input"}>
                        <div className="col-md-12 w-100">
                            <input type="password"
                                   name="password"
                                   className={`text-dark form-control input-field w-100 button-radius mb-3 ${errors.password && 'text-danger'} `}
                                   data-action="grow"
                                   placeholder={errors.password?errors.password: "Enter password"}
                                   onChange={ev => onFieldChanged(ev)}
                                   value={values.password}
                            />
                            <br/>

                            <input type="hidden" name="ref" value="{props.refURL}"/>
                            <a href="/reset-password" title="Reset password"
                               onClick={() => gaEventTracker('Reset Password')} >
                                <span className="sticky-hidden text-warning px-2 d-flex justify-content-end">Forgot Password?</span>
                            </a>
                        </div>
                    </div>
                    <div className="form-group  d-flex justify-content-left mb-4">
                        <div className="col-md-12 w-100">
                            <button className="cg login-button btn w-100 button-radius input-field btn-font" type="submit">
                                {isLoading ? <span>Logging In ...</span> : <span>Login</span>}
                            </button>
                        </div>
                    </div>

                </Form>
            </div>
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
    const LoginInstructions=()=>{
        return(
            <p className={"text-white py-2 px-4 font-input"}>
                Enter your phone number and password below to Login to your existing account.
            </p>

        );
    }

    return (
        <Container className="d-flex login-mobile">
            <Row className="w-100 mt-5" style={{float: "right"}}>
                <div className={"d-flex justify-content-center"}>
                    <img src={BetnareLogo} alt={"logo"} className={" w-50 "}/>
                </div>
                <FormTitle/>
                <LoginInstructions/>

            </Row>
            <Row className={"w-100"} style={{float: "right"}}>
                <ToastContainer/>
                <LoginForm/>
                <div className="col-12">
                    <a className="d-flex justify-content-center w-100" href="/signup" title="Join now" onClick={() => gaEventTracker('Register')}>
                        <span className="register-label text-warning font-input ">Don't have an account! Register now!</span>
                    </a>
                    <a className="m-lg-2 badge bg-success d-none" href="/verify-account" title="Verify Account"
                       onClick={() => gaEventTracker('Verify')}>
                        <span className="register-label">Verify Account</span>
                    </a>
                </div>
            </Row>
        </Container>
    )
}
export default React.memo(Login);
