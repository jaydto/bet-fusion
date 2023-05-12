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


const VerifyAccount2 = props => {
    const [message, setMessage] = useState(null);
    // const {setUser} = props;
    const [isMobileNumberValid, setIsMobileNumberValid] = useState(false);
    const navigate = useNavigate();
    const expand = "md"
    const {height, width} = useWindowDimensions();
    const [user, setUser] = useState(getFromLocalStorage("user"));

    const [inputDisabled, setInputDisabled] = useState(false)
    const [code, setCode] = useState(null);
    const [success, setSuccess] = useState(false);
    const verifyRef = useRef()


    const initialValues = {
        mobile: '',
        code: ''
    }

    const verifyAccount = () => {
        let code = new URL(window.location).searchParams.get('code')
        let msisdn = new URL(window.location).searchParams.get('msisdn')
        if (code !== null && msisdn !== null) {
            setInputDisabled(true)
            handleSubmit({
                mobile: msisdn,
                code: code
            })
        }
    }

    useEffect(() => {
        verifyAccount()
    }, [])

    const handleSubmit = values => {
        let endpoint = '/v1/verify';
        makeRequest({url: endpoint, method: 'POST', data: values}).then(([status, response]) => {
            setMessage(response.success ? response.success.message : response.error.message);
            response.success ? setSuccess(true) : setSuccess(false)

            if (response?.success) {
                setLocalStorage('user', response?.success?.user);
                let timer = setInterval(() => {
                    clearInterval(timer)
                    window.location.href = "/deposit"
                }, 1000)
            }

        }).catch((err) => {

        })
    }

    const validate = values => {

        let errors = {}

        if (!values.mobile || !values.mobile.match(/(254|0|)?[71]\d{8}/g)) {
            errors.mobile = 'Please enter a valid phone number'
        }

        if (!values.code || values.code.length < 4) {
            errors.code = "Please enter four or more characters for code";
        }

        return errors
    }

    const resendOTP = () => {

        let endpoint = '/v1/code';

        let values = {
            mobile: verifyRef.current.values.mobile
        }

        makeRequest({url: endpoint, method: 'POST', data: values}).then(([status, response]) => {
            console.log("status_verify", status)
            setMessage(response.success ? response.success.message : response.error.message);
            let timer = setInterval(() => {
                setIsMobileNumberValid(false)
                clearInterval(timer)
            }, 3000)
            response?.success&&timer()
            response.error ? setSuccess(false) : setSuccess(false)
        })
    }

    const FormTitle = () => {
        return (
            <div className='col-md-12  pt-4 text-center text-light' >
                <h4 className="inline-block">
                    VERIFY YOUR PHONE NUMBER
                </h4>
            </div>
        )
    }


    const MyVerifyAccountForm = (props) => {
        const {errors, values, submitForm, setFieldValue} = props;

        const onFieldChanged = (ev) => {
            let field = ev.target.name;
            let value = ev.target.value;
            setFieldValue(field, value);
            setIsMobileNumberValid(value.trim() !== '');
        }
        return (
            <Form>
                <div className="pt-0">
                    <div className="w-100">

                        <div className="form-group row d-flex justify-content-center mt-3">
                            <div className="col-md-12">
                                <label>Mobile Number</label>
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <input
                                            value={values.mobile}
                                            className="h-100 text-light deposit-input form-control col-md-12 input-field"
                                            id="mobile"
                                            name="mobile"
                                            type="text"
                                            placeholder='Phone number'
                                            onChange={ev => onFieldChanged(ev)}
                                        />
                                        {isMobileNumberValid && errors.mobile && (
                                            <div className='text-danger'>{errors.mobile}</div>
                                        )}
                                    </div>
                                    <div className="col-md-4 d-flex justify-content-between">
                                        <span className='' style={{
                                            marginLeft: 'auto',
                                            whiteSpace: 'nowrap',
                                            gap: '10px',
                                            width: 'auto',
                                        }}>
                                            Didn't receive code? Resend Code
                                        </span>
                                        &nbsp;
                                        <button onClick={() => resendOTP()} type={"button"}
                                                className='btn py-1 px-2 text-light btn-sm bg-success rounded-3 border-0 ' style={{fontSize:"12px",whiteSpace:'nowrap'}} disabled={!isMobileNumberValid}>Resend OTP
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="form-group row d-flex  mt-4">
                            <div className="col-md-12">
                                <label>Code (OTP)</label>
                                <input
                                    value={code !== null ? code : values.code}
                                    className="text-light deposit-input form-control col-md-12 input-field"
                                    id="code"
                                    name="code"
                                    type="code"
                                    placeholder='Code'
                                    onChange={ev => onFieldChanged(ev)}
                                />
                                {errors.code && <div className='text-danger'> {errors.code} </div>}
                            </div>
                        </div>
                        <div className="form-group row d-flex justify-content-left mb-4">
                            <div className="col">
                                <button type="submit"
                                        disabled={inputDisabled}
                                        onClick={submitForm}
                                        className=' btn btn-lg w-100 button-radius input-field btn-font cg login-button btn' style={{marginTop:"47px"}}>
                                    VERIFY ACCOUNT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        );
    }

    const VerifyAccountForm = (props) => {
        return (
            <Formik
                innerRef={verifyRef}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validateOnChange={false}
                validateOnBlur={false}
                validate={validate}
                render={(props) => <MyVerifyAccountForm {...props} />}/>
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

                                <h1 className="text-white text-center" style={{fontSize:"30px"}}>Verify Your Account</h1>
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
                        <div className={'width-page-centric'}>
                            <FormTitle/>

                            <Row justify="center">

                                <div className={'d-flex'}>
                                    {/**/}
                                    <div >
                                        {/*{user?setTimeout(navigate("/"),500):""}*/}
                                        {/*{success?setTimeout(window.location.href="/deposit",1000):""}*/}
                                        <div className={"d-flex flex-row justify-content-between"}>
                                            <div className=" w-100">
                                                <div className="homepage d-flex flex-column align-items-center justify-content-center login-page">

                                                    <div className="col-md-12 mt-2 text-white p-2">
                                                        {message && <Alert/>}
                                                        {success?setTimeout(window.location.href="/deposit",2000):""}
                                                        <div className="modal-body pb-0" data-backdrop="static">
                                                            <VerifyAccountForm/>
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

export default VerifyAccount2

