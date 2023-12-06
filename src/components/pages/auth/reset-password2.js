import React, {useContext, useState} from 'react'
import {Col, Row} from "antd";
import authImg from '../../../assets/img/Logo.webp'
import {Link, useNavigate} from "react-router-dom";
import only18 from '../../../assets/img/auth/18only.png'
import backgroundURL from '../../../assets/img/auth/img-17.webp'

import {LazyLoadImage} from "react-lazy-load-image-component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import makeRequest from "../../utils/fetch-request";
import {Form, Formik} from "formik";
import {StoreContext } from "../../../context/store"

const backgroundStyle = {
    backgroundImage: `url(${backgroundURL})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
}


const ResetPassword2 = React.memo(
    props => {

   const { state } = useContext(StoreContext);
    const expand = "md"

    const FormTitle = () => {
        return (
            <div className='col-md-12 col-md-12  pt-4 text-center text-light py-3 text-center w-100 top-login-mobile' style={{margin:'0px' }}>
                <h4 className="inline-block">
                    RECOVER YOUR ACCOUNT
                </h4>
            </div>
        )
    }

    const Alert = (props) => {
        let c = state?.resetSuccess ? 'success' : 'danger';
        return (<div role="alert" className={`fade alert alert-${c} show`}>{state?.resetMessage}</div>);

    };


    return (
        <div style={{height:'100vh', background:'#16202C'}}>
            <Row justify="center" className="align-items-stretch h-100">

                <Col xs={0} sm={0} md={0} lg={8}>
                    <div className="d-flex flex-column justify-content-between h-100 px-4" style={backgroundStyle}>
                        <div className="text-right">
                        </div>
                        <Row justify="center">
                            <Col xs={0} sm={0} md={0} lg={20}>
                                <Link to={'/'}>
                                    <LazyLoadImage className="img-fluid mb-5" src={authImg} alt=""/>
                                </Link>

                                <h1 className="text-white text-center" style={{fontSize:"30px"}}>Welcome to betNare</h1>

                            </Col>
                        </Row>
                        <div className="d-flex justify-content-end pb-4">
                            <div className={'d-flex justify-content-center align-items-center'}>
                                <div className="text-white mx-2 bold d-flex justify-content-center align-items-center"><LazyLoadImage src={only18} alt={'18 only'} style={{width:'30px', background:'aliceblue', borderRadius:'16px'}}/></div>
                                <span className="mx-2 text-white"> | </span>
                                <a className="text-white" href="/terms-and-conditions">Terms & Conditions</a>
                                <span className="mx-2 text-white"> | </span>
                                <a className="text-white" href="/privacy-policy" >Privacy & Policy</a>
                            </div>
                        </div>
                    </div>
                </Col>
                <div className={'col-lg-8 col-sm-12 top-login-background-img-bg-down top-login-background-img-bg-page'} >

                    <div className="w-100 d-flex flex-column justify-content-center h-100 top-login-background-img-bg-page">
                        <div className={`width-page-centric reset-pass ${state?.otpSent&&'pass-reset-page'}`}>
                            <FormTitle/>

                            <Row justify="center">

                                <div className={'d-flex w-100'}>
                                    {/**/}
                                    <div className={'w-100'}>

                                        <div className={"d-flex flex-row justify-content-between"}>
                                            <div className=" w-100">
                                                <div className="homepage d-flex flex-column align-items-center justify-content-center login-page">

                                                    <div className="col-md-12 mt-2 text-white px-2 w-100">
                                                        {state?.resetMessage && <Alert/>}
                                                        <div className="modal-body pb-0 " data-backdrop="static">
                                                            <OptForm/>
                                                            <PasswordResetForm/>
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <p>Don't have an account yet? <a href="/auth/register-2">Sign Up</a></p> */}
                                    <div className="mt-4">
                                        {/*<LoginForm {...props}/>*/}
                                    </div>
                                </div>
                            </Row>
                        </div>

                    </div>
                </div>
            </Row>
        </div>
    )
})
const MyOtpForm = React.memo(
    (props) => {
    const { state } = useContext(StoreContext);
    const {errors, values, submitForm, setFieldValue} = props;

    const onFieldChanged = (ev) => {
        let field = ev.target.name;
        let value = ev.target.value;
        setFieldValue(field, value);
    }
    return (
        <Form className={`${state?.otpSent ? 'd-none' : ''}`}>
            <div className="pt-0">
                <div className="w-100">

                    <div className="form-group row d-flex justify-content-center mt-3">
                        <div className="col-md-12">
                            <label>Mobile Number</label>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <input
                                        value={values.mobile}
                                        className="text-light deposit-input form-control col-md-12 input-field input-bg-user"
                                        id="mobile"
                                        name="mobile"
                                        type="text"
                                        placeholder='Phone number'
                                        onChange={ev => onFieldChanged(ev)}
                                    />
                                    {errors.mobile && <div className='text-danger'> {errors.mobile} </div>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-group row d-flex justify-content-left mb-4">
                        <div className="col">
                            <button type="submit"
                                    className=' btn btn-lg w-100 button-radius input-field btn-font cg login-button btn button-page reset-text' style={{whiteSpace:'nowrap',fontSize:"12px",marginTop:"20px"}}>
                                Send OTP
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Form>
    );
})

const MyPasswordResetForm = React.memo(
    (props) => {
    const { state } = useContext(StoreContext);
    const {errors, values, submitForm, setFieldValue} = props;
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onFieldChanged = (ev) => {
        let field = ev.target.name;
        let value = ev.target.value;
        setFieldValue(field, value);
    }
    return (
        <Form className={`${state?.otpSent ? 'd-block' : 'd-none'}`}>
            <div className="pt-0">
                <div className="row">
                    <div className="col-md-12">
                        <div className="col-md-12">
                            <div className="form-group row d-flex justify-content-center mt-1">
                                <label className={'text-center'}>Enter OTP</label>
                                <input
                                    value={values.code}
                                    className="text-light deposit-input form-control col-md-12 input-field"
                                    id="otp"
                                    name="code"
                                    type="text"
                                    placeholder='OTP'
                                    onChange={ev => onFieldChanged(ev)}
                                />
                                {errors.code && <div className='text-danger'>
                                    {errors.code}
                                </div>}
                            </div>
                            <hr/>
                            <div>
                                <h2 className={'text-center'}>
                                    Enter New Passwords
                                </h2>
                            </div>
                        </div>
                        <div className="form-group w-100 d-flex justify-content-center mt-5">
                            <div className="col-md-12 w-100">
                                <label>Password</label>
                                <div className="input-group input-color-icon w-100" style={{ display: 'flex' , background:'white'}}>

                                    <input
                                        value={values.password}
                                        className=" w-75 text-light deposit-input form-control col-md-12 input-field"
                                        id="password_reset"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete={'on'}
                                        placeholder='Password'
                                        onChange={ev => onFieldChanged(ev)}
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
                                {errors.password && <div className='text-danger'>
                                    {errors.password}
                                </div>}
                            </div>
                        </div>
                        <div className="form-group w-100 d-flex justify-content-center mt-5">
                            <div className="col-md-12 w-100">
                                <label>Confirm Password</label>
                                <div className="input-group input-color-icon w-100" style={{ display: 'flex' }}>
                                    <input
                                        value={values.repeat_password}
                                        className="w-75 text-light deposit-input form-control col-md-12 input-field"
                                        id="confirm_password"
                                        name="repeat_password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder='Password'
                                        onChange={ev => onFieldChanged(ev)}
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
                                {errors.repeat_password &&
                                    <div className='text-danger'>
                                        {errors.repeat_password}
                                    </div>}
                            </div>
                        </div>
                    </div>

                    <div className="form-group w-100 d-flex justify-content-left mb-4">
                        <div className="col">
                            <button type="submit"
                                    className='w-100 btn btn-lg btn-primary mt-5 col-md-12 deposit-withdraw-button button-page'>
                                Reset Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Form>
    );
})


const PasswordResetForm = React.memo(
    (props) => {
    const [resetID, setResetID] = useState('')
    const { state, dispatch } = useContext(StoreContext);
    const navigate = useNavigate();

    const initialResetFormValues = {
        id: '',
        code: '',
        password: '',
        repeat_password: ''
    }


    const handleSubmitPasswordReset = values => {
        values.mobile = state?.mobile
        values.id = resetID;
        let endpoint = '/v1/reset-password';
        makeRequest({url: endpoint, method: 'POST', data: values}).then(([status, response]) => {
            // setSuccess(status === 200 || status === 201);
            dispatch({type: "SET", key: "resetSuccess", payload: status === 200 || status === 201})
            // setMessage(response.error ? response.error.message : response.success.message);
            dispatch({type: "SET", key: "resetMessage", payload: response.error ? response.error.message : response.success.message})
            // response.error ? setSuccess(false) : setSuccess(true)
            response.error ?dispatch({type: "SET", key: "resetSuccess",payload: false}):dispatch({type: "SET", key: "resetSuccess", payload:true})

            let timer = setInterval(() => {
                clearInterval(timer)
                navigate("/")
            }, 3000)

        })
    }


    const validatePasswordReset = password_reset_values => {

        let password_reset_errors = {}

        if (!password_reset_values.code) {
            password_reset_errors.code = "Please enter your One Time Pin (OTP)"
        }

        if (password_reset_values.code.length < 4) {
            password_reset_errors.code = "Your OTP should be greater than 4 numbers."
        }

        if (!password_reset_values.password) {
            password_reset_errors.password = "Please enter your new password"
        }

        if (!password_reset_values.repeat_password) {
            password_reset_errors.repeat_password = "Please enter your password confirmation"
        }

        if (password_reset_values.password !== password_reset_values.repeat_password) {
            password_reset_errors.repeat_password = "The passwords do not match. Please enter the password you entered above."
        }

        return password_reset_errors
    }
    return (
        <Formik
            initialValues={initialResetFormValues}
            onSubmit={handleSubmitPasswordReset}
            validateOnChange={false}
            validateOnBlur={false}
            validate={validatePasswordReset}
        >{(props) => <MyPasswordResetForm {...props} />}</Formik>
    );
})

const OptForm = React.memo(
    (props) => {
    const { dispatch } = useContext(StoreContext);
    const initialValues = {
        mobile: '',
    }
    const validate = values => {

        let errors = {}

        if (!values.mobile || !values.mobile.match(/(254|0|)?[71]\d{8}/g)) {
            errors.mobile = 'Please enter a valid phone number'
        }

        return errors
    }

    const handleSubmit = values => {
        // setMobile(values.mobile)
        dispatch({type: "SET", key: "mobile", payload: values.mobile})
        let endpoint = '/v1/code';
        makeRequest({url: endpoint, method: 'POST', data: values}).then(([status, response]) => {
            // setSuccess(status === 200 || status === 201);
            dispatch({type: "SET", key: "resetSuccess", payload: status === 200 || status === 201})
            // setMessage(response.success.message);
            dispatch({type: "SET", key: "resetMessage", payload: response.success.message})
            // setOtpSent(true)
            dispatch({type: "SET", key: "otpSent", payload:true})
            // setResetID(response.success.id)
            dispatch({type: "SET", key: "resetID", payload: response.success.id})
        })
    }
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validate={validate}
        >{(props) => <MyOtpForm {...props} />}</Formik>
    );
})
export default ResetPassword2

