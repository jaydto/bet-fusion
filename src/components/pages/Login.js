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
import {Navbar, Offcanvas} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {LazyLoadImage} from "react-lazy-load-image-component";
import logo from "../../assets/img/Logo.webp";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faPowerOff} from "@fortawesome/free-solid-svg-icons";
import SidebarMobile from "../sidebar/awesome/SidebarMobile";
import HeaderNav from "../header/header-nav";


const Header = React.lazy(() => import('../header/header'));


const Login = () => {

    const [message, setMessage] = useState(null);
    // const {setUser} = props;
    const expand = "md"
    const {height, width} = useWindowDimensions();
    const [user, setUser] = useState(getFromLocalStorage("user"));

    const navigate = useNavigate();



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
        return (<div className='col-md-12 col-md-12  pt-4 text-center text-light py-3 text-center w-100 top-login-mobile' style={{margin:'0px'}}>
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
            <Navbar expand="md" className="mb-0 ck pc os app-navbar top-nav" fixed="top" variant="dark" style={{paddingLeft:'0px',paddingBottom:'0px'}}>
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
            <div className={'desk-top profile-desktop-style' } >
                <HeaderNav profile={true}/>
            </div>
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
