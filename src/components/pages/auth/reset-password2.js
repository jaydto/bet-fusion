import React, {useCallback, useEffect, useRef, useState} from 'react'
import { Row, Col } from "antd";
import authImg from '../../../assets/img/Logo.webp'
import fire from '../../../assets/img/fire.webp'

import {Link, useNavigate} from "react-router-dom";

import useWindowDimensions from "../../header/Dimensions";
import {getFromLocalStorage, setLocalStorage} from "../../utils/local-storage";
import {toast} from "react-toastify";
import only18 from '../../../assets/img/auth/18only.png'
import backgroundURL from '../../../assets/img/auth/img-17.webp'
import {Navbar, Offcanvas} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {LazyLoadImage} from "react-lazy-load-image-component";
import logo from "../../../assets/img/Logo.webp";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faBackspace, faBackward, faHome, faLessThan, faPowerOff} from "@fortawesome/free-solid-svg-icons";
import SidebarMobile from "../../sidebar/awesome/SidebarMobile";
import makeRequest from "../../utils/fetch-request";
import {Form, Formik} from "formik";
const backgroundStyle = {
    backgroundImage: `url(${backgroundURL})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
}


const ResetPassword2 = props => {
    const [message, setMessage] = useState(null);
    // const {setUser} = props;
    const navigate = useNavigate();
    const expand = "md"
    const {height, width} = useWindowDimensions();
    const [user, setUser] = useState(getFromLocalStorage("user"));

    const [inputDisabled, setInputDisabled] = useState(false)
    const [code, setCode] = useState(null);
    const [success, setSuccess] = useState(false);
    const verifyRef = useRef()

    const [otp_sent, setOtpSent] = useState(false)
    const [resetID, setResetID] = useState('')
    const [mobile, setMobile] = useState('')

    const initialValues = {
        mobile: '',
    }

    const initialResetFormValues = {
        id: '',
        code: '',
        password: '',
        repeat_password: ''
    }

    const handleSubmit = values => {
        setMobile(values.mobile)
        let endpoint = '/v1/code';
        makeRequest({url: endpoint, method: 'POST', data: values}).then(([status, response]) => {
            setSuccess(status === 200 || status === 201);
            setMessage(response.success.message);
            setOtpSent(true)
            setResetID(response.success.id)
        })
    }
    const handleSubmitPasswordReset = values => {
        values.mobile = mobile
        values.id = resetID;
        let endpoint = '/v1/reset-password';
        makeRequest({url: endpoint, method: 'POST', data: values}).then(([status, response]) => {
            setSuccess(status === 200 || status === 201);
            setMessage(response.error ? response.error.message : response.success.message);
            response.error ? setSuccess(false) : setSuccess(true)

            let timer = setInterval(() => {
                clearInterval(timer)
                navigate("/")
            }, 3000)

        })
    }

    const validate = values => {

        let errors = {}

        if (!values.mobile || !values.mobile.match(/(254|0|)?[71]\d{8}/g)) {
            errors.mobile = 'Please enter a valid phone number'
        }

        return errors
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

    const FormTitle = () => {
        return (
            <div className='col-md-12 col-md-12  pt-4 text-center text-light py-3 text-center w-100 top-login-mobile' style={{margin:'0px' }}>
                <h4 className="inline-block">
                    RECOVER YOUR ACCOUNT
                </h4>
            </div>
        )
    }

    const MyOtpForm = (props) => {
        const {errors, values, submitForm, setFieldValue} = props;

        const onFieldChanged = (ev) => {
            let field = ev.target.name;
            let value = ev.target.value;
            setFieldValue(field, value);
        }
        return (
            <Form className={`${otp_sent ? 'd-none' : ''}`}>
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
                                        onClick={submitForm}
                                        className=' btn btn-lg w-100 button-radius input-field btn-font cg login-button btn' style={{whiteSpace:'nowrap',fontSize:"12px",marginTop:"20px"}}>
                                    Send OTP
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        );
    }

    const MyPasswordResetForm = (props) => {

        const {errors, values, submitForm, setFieldValue} = props;

        const onFieldChanged = (ev) => {
            let field = ev.target.name;
            let value = ev.target.value;
            setFieldValue(field, value);
        }
        return (
            <Form className={`${otp_sent ? 'd-block' : 'd-none'}`}>
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
                                <div className="col-md-12">
                                    <label>Password</label>
                                    <input
                                        value={values.password}
                                        className="text-light deposit-input form-control col-md-12 input-field"
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder='Password'
                                        onChange={ev => onFieldChanged(ev)}
                                    />
                                    {errors.password && <div className='text-danger'>
                                        {errors.password}
                                    </div>}
                                </div>
                            </div>
                            <div className="form-group w-100 d-flex justify-content-center mt-5">
                                <div className="col-md-12">
                                    <label>Confirm Password</label>
                                    <input
                                        value={values.repeat_password}
                                        className="text-light deposit-input form-control col-md-12 input-field"
                                        id="confirm_password"
                                        name="repeat_password"
                                        type="password"
                                        placeholder='Password'
                                        onChange={ev => onFieldChanged(ev)}
                                    />
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
                                        onClick={submitForm}
                                        className='btn btn-lg btn-primary mt-5 col-md-12 deposit-withdraw-button'>
                                    Reset Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        );
    }
    const OptForm = (props) => {
        return (
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validateOnChange={false}
                validateOnBlur={false}
                validate={validate}
            >{(props) => <MyOtpForm {...props} />}</Formik>
        );
    }
    const PasswordResetForm = (props) => {
        return (
            <Formik
                initialValues={initialResetFormValues}
                onSubmit={handleSubmitPasswordReset}
                validateOnChange={false}
                validateOnBlur={false}
                validate={validatePasswordReset}
            >{(props) => <MyPasswordResetForm {...props} />}</Formik>
        );
    }

    const Alert = (props) => {
        let c = success ? 'success' : 'danger';
        return (<div role="alert" className={`fade alert alert-${c} show`}>{message}</div>);

    };


    return (
        <div style={{height:'100vh', background:'#16202C'}}>
            <div className={''}>
                <Navbar expand="md" className="mb-0 ck pc os app-navbar top-nav" fixed="top" variant="dark" style={{paddingLeft:'0px',paddingBottom:'0px'}}>
                    <Container fluid className={'d-flex justify-content-between mobile-change top-login-background-img'}>
                        <Navbar.Brand className="e logo align-self-start menu-control d-flex w-100" title="Betnare" style={{paddingLeft:'0px',paddingBottom:'0px'}}>
                            <Link to={'/'} className={'text-light'}>
                                <FontAwesomeIcon icon={faBackspace}/>&nbsp; HOME
                            </Link>
                            <div
                                className="col-md-6  d-flex  right justify-content-end align-items-center w-change3 gap-2 top-login-background-img-bg-page"
                                style={{marginLeft: 'auto'}}>
                                <Link to={{pathname: "/"}} className=" resize-mobile">
                                    <LazyLoadImage src={logo} alt="Betnare" title="Betnare" effects="blur"
                                                   className={"image-size "}/>
                                </Link>
                            </div>

                        </Navbar.Brand>

                        <Navbar.Offcanvas
                            style={{width: "80%", height: "100%",zIndex: "9999", marginTop: "0px"}}
                            className='off-canvas background-primary p-0 user-profile'
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="start">
                            <Offcanvas.Header closeButton className='text-white' closeVariant={"white"}>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    <div className="col-3">
                                        <div>
                                            <LazyLoadImage src={logo} alt="Betnare" title="Betnare" effects="blur"/>
                                        </div>
                                    </div>
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body className={('')}>
                                <SidebarMobile/>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>

            </div>
            <Row justify="center" className="align-items-stretch h-100">

                <Col xs={0} sm={0} md={0} lg={8}>
                    <div className="d-flex flex-column justify-content-between h-100 px-4" style={backgroundStyle}>
                        <div className="text-right">
                            {/*<img src="/img/logo-sm.jpg" style={{height:"35px"}}alt="logo"/>*/}
                        </div>
                        <Row justify="center">
                            <Col xs={0} sm={0} md={0} lg={20}>
                                <Link to={'/'}>
                                    <img className="img-fluid mb-5" src={authImg} alt=""/>
                                </Link>

                                <h1 className="text-white text-center" style={{fontSize:"30px"}}>Welcome to betnare</h1>
                                <p className="text-white px-3 d-flex align-items-center justify-content-center mt-3" style={{fontSize:"16px", opacity:'0.5px'}}>Bet ni Moto<img src={fire}  style={{width:"20px"}} alt={'betnare'}/></p>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-end pb-4">
                            <div className={'d-flex justify-content-center align-items-center'}>
                                <div className="text-white mx-2 bold d-flex justify-content-center align-items-center"><img src={only18} alt={'18 only'} style={{width:'30px', background:'aliceblue', borderRadius:'16px'}}/></div>
                                <span className="mx-2 text-white"> | </span>
                                <a className="text-white" href="/terms-and-conditions">Term & Conditions</a>
                                <span className="mx-2 text-white"> | </span>
                                <a className="text-white" href="/privacy-policy" >Privacy & Policy</a>
                            </div>
                        </div>
                    </div>
                </Col>
                <div className={'col-lg-8 col-sm-12 top-login-background-img-bg-down top-login-background-img-bg-page'} >

                    <div className="w-100 d-flex flex-column justify-content-center h-100 top-login-background-img-bg-page">
                        <div className={'width-page-centric reset-pass'}>
                            <FormTitle/>

                            <Row justify="center">

                                <div className={'d-flex w-100'}>
                                    {/**/}
                                    <div className={'w-100'}>

                                        <div className={"d-flex flex-row justify-content-between"}>
                                            <div className=" w-100">
                                                <div className="homepage d-flex flex-column align-items-center justify-content-center login-page">

                                                    <div className="col-md-12 mt-2 text-white px-2 w-100">
                                                        {message && <Alert/>}
                                                        <div className="modal-body pb-0" data-backdrop="static">
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
}

export default ResetPassword2

