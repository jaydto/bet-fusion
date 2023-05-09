import React, {useState} from 'react';
import {Formik, Form} from 'formik';
import makeRequest from "../utils/fetch-request";
import karibu from '../../assets/img/banner/products/Bet_Nare_3000_karibu_gift.webp'
import {clearTrackingData, getFromLocalStorage, setLocalStorage, setTrackingData} from "../utils/local-storage";
import {Link} from "react-router-dom";
import {Navbar, Offcanvas} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {LazyLoadImage} from "react-lazy-load-image-component";
import logo from "../../assets/img/Logo.webp";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faPowerOff} from "@fortawesome/free-solid-svg-icons";
import SidebarMobile from "../sidebar/awesome/SidebarMobile";
import HeaderNav from "../header/header-nav";
import useWindowDimensions from "../header/Dimensions";

const Header = React.lazy(() => import('../header/header'));
const SideBar = React.lazy(() => import('../sidebar/awesome/Sidebar'));
const Right = React.lazy(() => import('../right/index'));
const Footer = React.lazy(() => import('../footer/footer'));

const Signup2 = (props) => {

    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState(null);
    const expand = "md"
    const {height, width} = useWindowDimensions();
    const [user, setUser] = useState(getFromLocalStorage("user"));


    const initialValues = {
        msisdn: '',
        password: ''
    }

    const handleSubmit = values => {

        let endpoint = '/v1/signup'

        setTrackingData(values)

        makeRequest({url: endpoint, method: 'POST', data: values}).then(([status, response]) => {
            setSuccess(status === 200 || status === 201);
            setMessage(response?.success?.message || "");
            if (values.utm_source !== undefined) {
                if (values.utm_source === 'eskimi') {
                    window.esk('track', 'Conversion');
                }
                if (values.utm_source === 'google') {
                    window.gtag_report_conversion(window.location)
                }
            }
            clearTrackingData()
            let timer = setInterval(() => {
                // window.location.href = "/"
                clearInterval(timer)
            }, 3000)
        })
    }

    const validate = values => {

        let errors = {}

        if (!values.msisdn || !values.msisdn.match(/(254|0|)?[71]\d{8}/g)) {
            errors.msisdn = 'Please enter a valid phone number'
        }

        if (!values.password || values.password.length < 4) {
            errors.password = "Please enter four or more characters for password";
        }

        return errors
    }

    const FormTitle = () => {
        return (
            <div className='col-md-12  pt-4 text-center text-light' >
                <h4 className="inline-block">
                    SIGNUP | CREATE A NEW ACCOUNT
                </h4>
            </div>
        )
    }

    const MySignupForm = (props) => {
        const {errors, values, submitForm, setFieldValue} = props;

        const onFieldChanged = (ev) => {
            let field = ev.target.name;
            let value = ev.target.value;
            setFieldValue(field, value);
        }
        return (
            <Form>
                <div className="pt-0">
                    <div className="row">
                        {/*<div className='row'>*/}
                        {/*    <img src={ karibu} alt="" className={''}/>*/}
                        {/*</div>*/}
                        {/*<hr/>*/}
                        <div className="form-group container-lg row d-flex justify-content-center mt-5">
                            <div className="col-md-12">
                                <label>Mobile Number</label>
                                <input
                                    value={values.msisdn}
                                    className="text-light deposit-input form-control col-md-12 input-field input-bg-user"
                                    id="msisdn"
                                    name="msisdn"
                                    type="text"
                                    placeholder='Phone number'
                                    onChange={ev => onFieldChanged(ev)}
                                />
                                {errors.msisdn && <div className='text-danger'> {errors.msisdn} </div>}
                            </div>
                        </div>

                        <div className="form-group container-lg row d-flex justify-content-center mt-5">
                            <div className="col-md-12">
                                <label>Password</label>
                                <input
                                    value={values.password}
                                    className="text-light deposit-input form-control col-md-12 input-field input-bg-user"
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder='Password'
                                    onChange={ev => onFieldChanged(ev)}
                                />
                                {errors.password && <div className='text-danger'> {errors.password} </div>}
                            </div>
                        </div>
                        <div className="form-group container-lg row d-flex justify-content-left mb-4">
                            <div className="col">
                                <button type={"submit"}
                                        className='btn btn-lg w-100 button-radius input-field btn-font cg login-button2 btn ' style={{marginTop:"47px"}}>
                                    <strong>SIGNUP</strong>
                                </button>
                                <Link className={`d-flex justify-content-center w-100 mt-3`} to={"/verify"} title="Verify" >
                                    <span className={`text-warning font-input register-label`} style={{fontSize:'18px'}}>Already have a verification code ?  </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        );
    }

    const SignupForm = (props) => {
        return (
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validateOnChange={false}
                validateOnBlur={false}
                validate={validate}
                render={(props) => <MySignupForm {...props} />}/>
        );
    }

    const Alert = (props) => {
        let c = success ? 'success' : 'danger';
        return (<div role="alert" className={`fade alert alert-${c} show`}>{message}</div>);

    };

    return (
        <React.Fragment>
            <Navbar expand="md" className="mb-0 ck pc os app-navbar top-nav" fixed="top" variant="dark" >
                <Container fluid className={'d-flex justify-content-between mobile-change'}>
                    <Navbar.Brand className="e logo align-self-start menu-control d-flex w-100" title="Betnare" style={{paddingLeft:'0px',paddingBottom:'0px'}}>
                        <Link to={{pathname: "/"}} className="col-4 resize-mobile">
                            <LazyLoadImage src={logo} alt="Betnare" title="Betnare" effects="blur"
                                           className={"image-size "}/>
                        </Link>
                        <div
                            className="col-md-6  d-flex  right justify-content-end align-items-center w-change2 gap-2 "
                            style={{marginLeft: 'auto'}}>
                            <div>
                                <Link
                                    to={{pathname: "/"}}
                                    className={"deposit-button size-font-user-action"} title={'HOME'} style={{fontSize:'14px'}}>
                                      <span className="">
                                       <span className=" "> <FontAwesomeIcon
                                           icon={faHome}/></span>&nbsp;
                                          HOME
                                      </span>
                                </Link>
                            </div>
                            {user&&<div>
                                <Link
                                    to={{pathname: "/logout"}}
                                    className={"deposit-button size-font-user-action"}
                                    style={{marginRight: "12px", fontSize: '14px'}} title={'LOGOUT'}>
                                      <span className="text-warning">
                                       <span className=" "><FontAwesomeIcon icon={faPowerOff}
                                                                            className={"text-warning"}/>
                                           </span>&nbsp;
                                          LOGOUT
                                      </span>
                                </Link>
                            </div>}
                            <div className="col-1 button-toggle mx-2" style={{width: "3.1rem"}}>
                                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"md"}`} className="px-3 py-3 user-profile" />
                            </div>
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
                        <Offcanvas.Body className={(width<=575?user?"":"":"")}>
                            <SidebarMobile/>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
            <div className={'desk-top profile-desktop-style' } style={{padding:'10px 0',position:'sticky',top:'63px'}} >
                <HeaderNav profile={true}/>
            </div>
            <div className="">
                <div className="d-flex flex-row justify-content-between">

                    <div className=" home" style={{margin:'auto'}}>
                        <div className="homepage sign-up-size" style={{marginTop:'54px'}}>
                            <FormTitle/>
                            <div className="col-md-12 mt-2 text-white p-2">
                                {message && <Alert/>}
                                {success?setTimeout(window.location.href="/verify",1000):""}
                                <div className="modal-body pb-0" data-backdrop="static">
                                    <SignupForm/>
                                </div>
                            </div>
                        </div>

                        <div className={`card-radius`} style={{maxWidth:'991px', margin:'auto'}}>
                            <Footer deposit2={true}/>
                        </div>

                    </div>


                </div>
            </div>


        </React.Fragment>
    );
}

export default Signup2;
