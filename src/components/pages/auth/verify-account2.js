import React, {useContext, useEffect, useRef} from 'react'
import {Col, Row} from "antd";
import authImg from '../../../assets/img/Logo.webp'
import logo from '../../../assets/img/Logo.webp'
import fire from '../../../assets/img/fire.webp'

import {Link} from "react-router-dom";
import {setLocalStorage} from "../../utils/local-storage";
import only18 from '../../../assets/img/auth/18only.png'
import backgroundURL from '../../../assets/img/auth/img-17.webp'
import {Navbar, Offcanvas} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBackspace} from "@fortawesome/free-solid-svg-icons";
import SidebarMobile from "../../sidebar/awesome/SidebarMobile";
import makeRequest from "../../utils/fetch-request";
import {Form, Formik} from "formik";
import {StoreContext } from "../../../context/store"
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";

const backgroundStyle = {
    backgroundImage: `url(${backgroundURL})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
}


const VerifyAccount2 = React.memo(
    props => {
        // const [message, setMessage] = useState(null);
        const { state, dispatch } = useContext(StoreContext);
        // const {setUser} = props;
        const expand = "md"
        const FormTitle = () => {
            return (
                <div className='col-md-12  pt-4 text-center text-light'>
                    <h4 className="inline-block">
                        VERIFY YOUR PHONE NUMBER
                    </h4>
                </div>
            )
        }


        const Alert = (props) => {
            let c = state?.verifySuccess ? 'success' : 'danger';
            return (<div role="alert" className={`fade alert alert-${c} show`}>{state?.verifyMessage}</div>);

        };

        return (
            <div style={{height: '100vh', background: '#16202C'}}>
                <div className={''}>
                    <Navbar expand="md" className="mb-0 ck pc os app-navbar top-nav" fixed="top" variant="dark"
                            style={{paddingLeft: '0px', paddingBottom: '0px', position: "fixed"}}>
                        <Container fluid
                                   className={'d-flex justify-content-between mobile-change top-login-background-img'}>
                            <Navbar.Brand className="e logo align-self-start menu-control d-flex w-100" title="Betnare"
                                          style={{paddingLeft: '0px', paddingBottom: '0px'}}>
                                <div onClick={() => window.history.back()} className={'text-light'}
                                     style={{cursor: "pointer"}}>
                                    <FontAwesomeIcon icon={faBackspace}/>&nbsp; Back
                                </div>
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
                                style={{width: "80%", height: "100%", zIndex: "9999", marginTop: "0px"}}
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
                                {/*<LazyLoadImage src="/img/logo-sm.jpg" style={{height:"35px"}}alt="logo"/>*/}
                            </div>
                            <Row justify="center">
                                <Col xs={0} sm={0} md={0} lg={20}>
                                    <Link to={'/'}>
                                        <LazyLoadImage className="img-fluid mb-5" src={authImg} alt=""/>
                                    </Link>

                                    <h1 className="text-white text-center" style={{fontSize: "30px"}}>Verify Your
                                        Account</h1>
                                    <p className="text-white px-3 d-flex align-items-center justify-content-center mt-3"
                                       style={{fontSize: "16px", opacity: '0.5px'}}>Bet ni Moto<LazyLoadImage src={fire}
                                                                                                              style={{width: "20px"}}
                                                                                                              alt={'betnare'}/>
                                    </p>
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-end pb-4">
                                <div className={'d-flex justify-content-center align-items-center'}>
                                    <div
                                        className="text-white mx-2 bold d-flex justify-content-center align-items-center">
                                        <LazyLoadImage src={only18} alt={'18 only'} style={{
                                            width: '30px',
                                            background: 'aliceblue',
                                            borderRadius: '16px'
                                        }}/></div>
                                    <span className="mx-2 text-white"> | </span>
                                    <a className="text-white" href="/terms-and-conditions">Term & Conditions</a>
                                    <span className="mx-2 text-white"> | </span>
                                    <a className="text-white" href="/privacy-policy">Privacy & Policy</a>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <div
                        className={'col-lg-8 col-sm-12 top-login-background-img-bg-down top-login-background-img-bg-page'}>

                        <div
                            className="w-100 d-flex flex-column justify-content-center h-100 top-login-background-img-bg-page">
                            <div className={'width-page-centric register-page'}>
                                <FormTitle/>

                                <Row justify="center">

                                    <div className={'d-flex'}>
                                        {/**/}
                                        <div>

                                            <div className={"d-flex flex-row justify-content-between"}>
                                                <div className=" w-100">
                                                    <div
                                                        className="homepage d-flex flex-column align-items-center justify-content-center login-page">

                                                        <div className="col-md-12 mt-0 text-white px-2">
                                                            {state?.verifyMessage && <Alert/>}
                                                            {state?.verifySuccess ? setTimeout(window.location.href = "/", 2000) : ""}
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
    })
const MyVerifyAccountForm = React.memo(
    (props) => {
        const {errors, values, submitForm, setFieldValue} = props;
        const { state, dispatch } = useContext(StoreContext);

        const gaEventTracker=useAnalyticsEventTracker("Resend Verifiction Code")
        const resendOTP = () => {

            let endpoint = '/v1/code';

            let payload = {
                mobile: values?.mobile
            }

            makeRequest({url: endpoint, method: 'POST', data: payload}).then(([status, response]) => {

                // setMessage(response.success ? response.success.message : response.error.message);
                dispatch({
                    type: "SET",
                    key: "verifyMessage",
                    payload: response.success ? response.success.message : response.error.message
                })
                // response.success?dispatch({type: "SET", key: "verifySuccess", payload: true}):dispatch({type: "SET", key: "verifySuccess", payload: false})

                let timer = setInterval(() => {
                    // setIsMobileNumberValid(false)
                    dispatch({type: "SET", key: "isMobileNumberValid", payload: false})
                    clearInterval(timer)
                }, 3000)
                response?.success && timer()
                // response.error ? setSuccess(false) : setSuccess(false)
                response.success ? dispatch({type: "SET", key: "verifySuccess", payload: true}) : dispatch({
                    type: "SET",
                    key: "verifySuccess",
                    payload: false
                })
                if (status === 200 || status === 201) {
                    const data={
                        event:'resend_verification',
                        msisdn:values?.msisdn,
                        message:response?.success?.message
                    }
                    gaEventTracker("Verify Success",data)
                }else{
                    const data={
                        event:'resend_verification_failed',
                        msisdn:values?.msisdn,
                        message:response?.error?.message
                    }
                    gaEventTracker("Verify Failed",data)
                }
            })
        }

        const onFieldChanged = (ev) => {
            let field = ev.target.name;
            let value = ev.target.value;
            setFieldValue(field, value);
            // setIsMobileNumberValid(value.trim() !== '');
            dispatch({type: "SET", key: "isMobileNumberValid", payload: value.trim() !== ''})
        }
        let number = String(state?.signup_msisdn).split("0")[1]
        let msisdn = number ? "254" + number : ""
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
                                            value={values.mobile || msisdn}
                                            className="h-100 text-light deposit-input form-control col-md-12 input-field"
                                            id="mobile"
                                            name="mobile"
                                            type="text"
                                            placeholder='Phone number'
                                            onChange={ev => onFieldChanged(ev)}
                                        />
                                        {state?.isMobileNumberValid && errors.mobile && (
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
                                                className='btn py-1 px-2 text-light btn-sm bg-success rounded-3 border-0 '
                                                style={{fontSize: "12px", whiteSpace: 'nowrap'}}
                                                disabled={!state?.isMobileNumberValid && !msisdn}>Resend OTP
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="form-group row d-flex  mt-4">
                            <div className="col-md-12">
                                <label>Code (OTP)</label>
                                <input
                                    value={values?.code || ''}
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
                                        disabled={state?.inputDisabled}
                                        onClick={submitForm}
                                        className=' btn btn-lg w-100 button-radius input-field btn-font cg login-button btn button-page'
                                        style={{marginTop: "47px"}}>
                                    VERIFY ACCOUNT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        );
    })

const VerifyAccountForm = React.memo(
    (props) => {
        const { state, dispatch } = useContext(StoreContext);
        let number = String(state?.signup_msisdn).split("0")[1]
        let msisdn = number ? "254" + number : ""

        const initialValues = {
            mobile: msisdn,
            code: ''
        }
        const verifyAccount = () => {
            let code = new URL(window.location).searchParams.get('code')
            let msisdn = new URL(window.location).searchParams.get('msisdn')
            if (code !== null && msisdn !== null) {
                dispatch({type: "SET", key: "inputDisabled", payload: true})

                handleSubmit({
                    mobile: msisdn,
                    code: code
                })
            }
        }

        useEffect(() => {
            verifyAccount()
        }, [])

        const gaEventTracker = useAnalyticsEventTracker("Verify Account")
        const handleSubmit = values => {
            let endpoint = '/v1/verify';
            makeRequest({url: endpoint, method: 'POST', data: values}).then(([status, response]) => {
                // setMessage(response.success ? response.success.message : response.error.message);
                // response.success ? setSuccess(true) : setSuccess(false)
                dispatch({
                    type: "SET",
                    key: "verifyMessage",
                    payload: response.success ? response.success.message : response.error.message
                })
                response.success ? dispatch({type: "SET", key: "verifySuccess", payload: true}) : dispatch({
                    type: "SET",
                    key: "verifySuccess",
                    payload: false
                })
                const data = {
                    event: 'verify_account',
                    msisdn: response?.success?.user?.msisdn,
                    user_id: response?.success?.user?.profile_id
                }

                if (response?.success) {
                    setLocalStorage('user', response?.success?.user);
                    const data = {
                        event: 'verify_account',
                        msisdn: response?.success?.user?.msisdn,
                        user_id: response?.success?.user?.profile_id
                    }
                    gaEventTracker("verify_success", data)
                    let timer = setInterval(() => {
                        clearInterval(timer)
                        window.location.href = "/"
                    }, 1000)
                } else {
                    const data = {
                        event: 'verify_failure',
                        msisdn: values?.msisdn,
                        message: response?.error?.message
                    }
                    gaEventTracker("verify_success", data)
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

        const verifyRef = useRef()

        return (
            <Formik
                innerRef={verifyRef}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validateOnChange={false}
                validateOnBlur={false}
                validate={validate}
                render={(props) => <    MyVerifyAccountForm {...props} />}/>
        );
    })
export default React.memo(VerifyAccount2);

