import React, {useCallback, useContext, useEffect, useState} from 'react'
import {Col, Row} from "antd";
import authImg from '../../assets/img/Logo.webp'
import {Link, useNavigate} from "react-router-dom";
import HeaderLogin from "../header/top-login";
import {getFromLocalStorage, setLocalStorage} from "../utils/local-storage";
import {toast} from "react-toastify";
import only18 from '../../assets/img/auth/18only.png'
import backgroundURL from '../../assets/img/auth/img-17.webp'
import {LazyLoadImage} from "react-lazy-load-image-component";

import {StoreContext} from "../../context/store";
import {useSelector} from "react-redux";

const backgroundStyle = {
    backgroundImage: `url(${backgroundURL})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
}

const LoginTwo = React.memo(
    props => {
        const [message,] = useState(null);
        // const {setUser} = props;
        const navigate = useNavigate();
        const userData = useSelector((state) => state.auth.user)
        const [user, setUser] = useState(getFromLocalStorage("user"))

        useEffect(() => {
            if (userData) {
                setUser(userData || getFromLocalStorage("user"))
            }
        }, [userData])


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
                    // 1 month
                    setLocalStorage('user', message.user, 2629746000);
                    // setUser(message.user);
                }

            }
        }, [message])

        useEffect(() => {
            dispatchUser();
        }, [dispatchUser]);


        const FormTitle = () => {
            return (<div
                className='col-md-12 col-md-12  pt-4 text-center text-light py-3 text-center w-100 top-login-mobile'
                style={{margin: '0px'}}>
                <h4 className="inline-block form-title-centric">
                    Login
                </h4>
            </div>)
        }


        const LoginInstructions = () => {
            return (<p className={"text-white py-2 px-4 font-input text-center mb-4"}>
                    Enter your phone number and password below to Login to your existing account.
                </p>

            );
        }

        const {state} = useContext(StoreContext);

        return (
            <div style={{height: '100vh', background: '#16202C', overflowX: 'hidden'}}>
                <Row justify="center" className="align-items-stretch h-100">

                    <Col xs={0} sm={0} md={0} lg={8}>
                        <div className="d-flex flex-column justify-content-between h-100 px-4" style={backgroundStyle}>
                            <div className="text-right"></div>
                            <Row justify="center">
                                <Col xs={0} sm={0} md={0} lg={20}>
                                    <Link to={'/'}>
                                        <LazyLoadImage className="img-fluid mb-5" src={authImg} alt=""/>
                                    </Link>

                                    <h1 className="text-white text-center" style={{fontSize: "30px"}}>Welcome to
                                        betnare</h1>
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
                                    <a className="text-white" href="/terms-and-conditions">Terms & Conditions</a>
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
                            <div className={'width-page-centric '}>
                                <FormTitle/>

                                <Row justify="center">
                                    <LoginInstructions/>

                                    <div className={'d-flex'}>
                                        {/**/}
                                        <div>
                                            {user ?
                                                setTimeout(() => {
                                                        if (getFromLocalStorage('ActiveLink') == undefined || getFromLocalStorage('ActiveLink') == null) {
                                                            return navigate(state?.page_view ?state?.page_view ==='/signup'?'/': `${state?.page_view}` : '/')
                                                        } else {
                                                            navigate(getFromLocalStorage('ActiveLink')==='/signup'?'/':getFromLocalStorage('ActiveLink'))
                                                            localStorage.removeItem('ActiveLink')
                                                        }
                                                    }
                                                    , 500) : ""}
                                            <div className={"d-flex flex-row justify-content-between"}>
                                                <div className=" w-100">
                                                    <div
                                                        className="homepage d-flex flex-column align-items-center justify-content-center login-page">

                                                        <HeaderLogin setUser={setUser} login={true}/>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4">
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


export default React.memo(LoginTwo)
