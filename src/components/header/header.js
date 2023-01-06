import React, {useEffect, useCallback, useState, useContext, useRef} from 'react';
import {Link, useNavigate} from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {Context} from '../../context/store';
import {getFromLocalStorage} from '../utils/local-storage';
import {ToastContainer} from 'react-toastify';
import makeRequest from '../utils/fetch-request';
import {setLocalStorage} from '../utils/local-storage';
import 'react-lazy-load-image-component/src/effects/blur.css';

import logo from '../../assets/img/logo.png';
import {Navbar, Offcanvas} from "react-bootstrap";
import SidebarMobile from "../sidebar/awesome/SidebarMobile";
import MobileNav1 from "../mobile-navigation/MobileNav1";
import MobileProfile from "./MobileProfile";
import useWindowDimensions from "./Dimensions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloudDownloadAlt, faCoins, faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import ListGroup from "react-bootstrap/ListGroup";
import MobileNav2 from "../mobile-navigation/MobileNav2";
import {App} from "@capacitor/app";
import {AppUpdater} from "../pages/capacitorListeners/CheckForUpdate";
const ProfileMenu = React.lazy(() => import('./profile-menu'));
const HeaderLogin = React.lazy(() => import('./top-login'));
const HeaderNav = React.lazy(() => import('./header-nav'));

const Header = (props) => {
    const {height, width} = useWindowDimensions();
    const gaEventTracker = useAnalyticsEventTracker('Navigation');
    const [user, setUser] = useState(getFromLocalStorage("user"));
    const [, dispatch] = useContext(Context);
    const history = useNavigate();
    const [searching, setSearching] = useState(false)
    const containerRef = useRef();
    const searchInputRef = useRef(null)
    const [matches, setMatches] = useState([])
    const {current} = containerRef;
    const [competitions, setCompetitions] = useState({});
    const [settings, setSettings] = useState({});
    // const [appInsets, setAppinsets] = useState({top: 0, bottom:0})
    //
    // useEffect(() => {
    //     const setupWithInsets = async function () {
    //         const insets = await SafeArea.getSafeAreaInsets()
    //         appInsets.top = insets.insets.top;
    //         appInsets.bottom = insets.insets.bottom
    //         setAppinsets({...appInsets})
    //     }
    //     setupWithInsets();
    // }, []);

    const dismissSearch = () => {
        setSearching(false)
        setMatches([])
    }

    useEffect(() => {
        fetchMatches()
    }, [searching])

    const fetchMatches = async (search) => {
        if (search && search.length >= 3) {
            gaEventTracker('Searching')
            let method = "POST"
            let endpoint = "/v1/matches?page=" + (1) + `&limit=${10}&search=${search}`;
            await makeRequest({url: endpoint, method: method, data: []}).then(([status, result]) => {
                if (status === 200) {
                    setMatches(result?.data || result)
                }
            });
        }

    };

    const fetchData = useCallback(async () => {
        let cached_categories = getFromLocalStorage('categories');
        let endpoint = "/v1/categories";

        if (!cached_categories) {
            const [competition_result] = await Promise.all([
                makeRequest({url: endpoint, method: "get", data: null}),
            ]);
            let [c_status, c_result] = competition_result

            if (c_status === 200) {
                setCompetitions(c_result);
                setLocalStorage('categories', c_result);
            }
        } else {
            setCompetitions(cached_categories);
        }

    }, []);

    const fetchAppConfigurations = useCallback(async () => {

        let cached_settings = getFromLocalStorage('settings');

        let endpoint = "/v1/bet/settings";

        if (!cached_settings) {

            const [result] = await Promise.all([
                makeRequest({url: endpoint, method: "POST", data: null}),
            ]);

            let [c_status, c_result] = result

            // console.log("C Result is now ", c_result?.message)

            if (c_status === 200) {
                setSettings(c_result?.message);
                setLocalStorage('settings', c_result?.message);
            }

        } else {
            setSettings(cached_settings);
        }
    })

    useEffect(() => {

        const abortController = new AbortController();
        fetchData();
        fetchAppConfigurations();

        return () => {
            abortController.abort();
        };
    }, [fetchData]);


    const NotifyToastContaner = () => {
        return <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    };
    const updateUserOnHistory = useCallback(() => {
        if (!user) {
            return false;
        }
        let endpoint = "/v1/balance";
        let udata = {
            token: user.token
        }
        makeRequest({url: endpoint, method: "post", data: udata}).then(([_status, response]) => {
            if (_status == 200) {
                let u = {...user, ...response.user};
                setLocalStorage('user', u);
                setUser(u)
                dispatch({type: "SET", key: "user", payload: user});
            }
        });

    }, [current]);

    const showSearchBar = () => {
        setSearching(true)
        searchInputRef.current.focus()
        gaEventTracker('Clicked on Search')
    }

    const updateUserOnLogin = useCallback(() => {
        dispatch({type: "SET", key: "user", payload: user});
    }, [user?.msisdn, user?.balance]);


    useEffect(() => {
        updateUserOnHistory()
    }, [updateUserOnHistory])


    useEffect(() => {
        updateUserOnLogin()
    }, [updateUserOnLogin])

    useEffect(() => {

       const unsubscribe= App.addListener('backButton', () => {
            // Check if the current route is the root route
            if (window.location.pathname === '/') {
                // Exit the app
                App.exitApp();
            }
        });

        return () => {
            // Don't forget to unsubscribe when the component unmounts
            unsubscribe();
        };
    }, []);


    const expand = "md"
    return (
        <>
            <AppUpdater/>
            <Navbar expand="md"   className="mb-0 ck pt-sm-0 pt-md-3 pc os app-navbar top-nav" fixed="top" variant="dark">
                <Container fluid className={'d-flex justify-content-between mobile-change'}>
                    <Navbar.Brand className="e logo align-self-start menu-control" title="Betnare">
                        <Link to={{pathname: "/"}} className="col-4 resize-mobile">
                            <LazyLoadImage src={logo} alt="Betnare" title="Betnare" effects="blur"
                                           className={"image-size "}/>
                        </Link>
                        {width <= 514 ? user?
                                <div className="col-md-3  d-flex flex-column right justify-content-center align-items-center w-change2">
                                    <div>
                                        <Link
                                            to={{pathname: "/deposit"}}
                                            className={"deposit-button"}>
                                      <span className="">
                                       <span className=" space-icons"> <FontAwesomeIcon
                                           icon={faCloudDownloadAlt}/></span>
                                          DEPOSIT
                                      </span>
                                        </Link>
                                    </div>
                                </div>
                                :""
                            : ""}
                        {width<=514? <div className={`col-sm-1 align-items-center ${searching ? 'd-none' : 'd-flex'}`}>
                            <Link className="" to={"#"} title="Search"
                                  onClick={() => showSearchBar()}>
                                <span className=""><FontAwesomeIcon icon={faSearch}/> </span><span
                            ></span>
                            </Link>
                        </div>:""}

                        {width<=514?user?"":
                            <div className="col-sm-2 style-mobile">
                                <Link to={"/login"} className="cg  login-color btn" type="submit">
                                    <span>Login</span>
                                </Link>
                                <div className="">
                                    <Link className="cg login-button btn bg-warning" to={"/signup"} title="Join now" onClick={() => gaEventTracker('Register')}>
                                        <span className=" ">Register</span>
                                    </Link>
                                    <Link className="m-lg-2 badge bg-success d-none" to={"/verify-account"} title="Verify Account"
                                          onClick={() => gaEventTracker('Verify')}>
                                        <span className="register-label">Verify Account</span>
                                    </Link>
                                </div>
                            </div>:""}

                        {width <= 514 ?

                            <div className="col-1 button-toggle space-button" style={{width: "3.1rem"}}>
                                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"md"}`} className="px-3 py-3" />
                            </div> : ""}
                    </Navbar.Brand>
                    <div className={` col-9 change-size ${width>767?"desk-top":""}`} id="navbar-collapse-main " >
                        <div
                            className="col-md-11 col-sm-12 col-lg-8 right disable-ipad to-navcheck justify-content-end">
                            {user ? <ProfileMenu user={user}/> : <HeaderLogin setUser={setUser}/>}
                        </div>
                        <div
                            className="col-md-11 col-sm-12 col-lg-8 right to-profilecheck w-100 justify-content-end style-mobile">
                            {width > 514 ? user?
                                <div className="col-md-3  d-flex flex-column right justify-content-center align-items-center w-change2">
                                    <div>
                                        <Link
                                            to={{pathname: "/deposit"}}
                                            className={"deposit-button"}>
                                      <span className="">
                                       <span className=" space-icons"> <FontAwesomeIcon
                                           icon={faCloudDownloadAlt}/></span>
                                          DEPOSIT
                                      </span>
                                        </Link>
                                    </div>
                                </div>
                                :"" : ""}
                            {width<=514?
                                <Container id="navbar-collapse-main"
                                           className={`fadeIn header-menu d-flex justify-content-center px-4 ${searching ? 'd-block' : 'd-none'}`}>
                                    <ListGroup as="ul" xs="9" horizontal className="nav navbar-nav og ale ss col-md-6 text-center w-100">
                                        <div className="d-flex">
                                            <div className="col-md-10 w-100 px-4">
                                                <input type="text" placeholder={'Start typing to search for team ...'} ref={searchInputRef}
                                                       onInput={(event) => fetchMatches(event.target.value)}
                                                       className={'form-control input-field border-0 bg-dark text-white no-border-radius'}/>
                                            </div>

                                            <button className={'btn text-white -align-right'} onClick={() => dismissSearch()}>
                                                <FontAwesomeIcon icon={faTimes}/> Close
                                            </button>
                                        </div>
                                        <div
                                            className={`autocomplete-box position-fixed bg-white border-dark col-md-5 mt-1 shadow-lg text-start`}
                                            onClick={() => gaEventTracker('View Search Results')}>
                                            {matches.map((match, index) => (
                                                <Link to={`/?search=${match.home_team}`} key={index}>
                                                    <li>
                                                        {match.home_team}
                                                    </li>
                                                </Link>
                                            ))}
                                        </div>
                                    </ListGroup>
                                </Container>:""}

                            {width<=767&&width>514? <div className={`${searching?"col-sm-5":"col px-4"}  align-items-center justify-content-end  d-flex`}>
                                <Link className={`${searching ? 'd-none' : 'd-flex'}`}to={"#"} title="Search"
                                      onClick={() => showSearchBar()}>
                                    <span className=""><FontAwesomeIcon icon={faSearch}/> </span><span
                                ></span>
                                </Link>
                                <Container id="navbar-collapse-main"
                                           className={`fadeIn header-menu d-flex justify-content-center px-4 ${searching ? 'd-block' : 'd-none'}`}>
                                    <ListGroup as="ul" xs="9" horizontal className="nav navbar-nav og ale ss col-md-6 text-center">
                                        <div className="d-flex">
                                            <div className="col-md-10">
                                                <input type="text" placeholder={'Start typing to search for team ...'} ref={searchInputRef}
                                                       onInput={(event) => fetchMatches(event.target.value)}
                                                       className={'form-control input-field border-0 bg-dark text-white no-border-radius'}/>
                                            </div>

                                            <button className={'btn text-white -align-right'} onClick={() => dismissSearch()}>
                                                <FontAwesomeIcon icon={faTimes}/> Close
                                            </button>
                                        </div>
                                        <div
                                            className={`autocomplete-box position-fixed bg-white border-dark col-md-5 mt-1 shadow-lg text-start`}
                                            onClick={() => gaEventTracker('View Search Results')}>
                                            {matches.map((match, index) => (
                                                <Link to={`/?search=${match.home_team}`} key={index}>
                                                    <li>
                                                        {match.home_team}
                                                    </li>
                                                </Link>
                                            ))}
                                        </div>
                                    </ListGroup>
                                </Container>
                            </div>:""}
                            {width>514?user?"":
                                <div className="col-sm-3 style-mobile">
                                    <Link to={"/login"} className="cg login-color btn" type="submit">
                                        <span>Login</span>
                                    </Link>
                                    <div className="">
                                        <Link className="cg login-button btn bg-warning" to={"/signup"} title="Join now" onClick={() => gaEventTracker('Register')}>
                                            <span className=" ">Register</span>
                                        </Link>
                                        <Link className="m-lg-2 badge bg-success d-none" to={"/verify-account"} title="Verify Account"
                                              onClick={() => gaEventTracker('Verify')}>
                                            <span className="register-label">Verify Account</span>
                                        </Link>
                                    </div>
                                </div>:""}


                            {user ? searching?"": <MobileProfile user={user}/> : ""}
                            {width > 514 ? <div
                                className="col-1 button-toggle space-button">
                                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"md"}`} className="px-3 py-3"/>
                            </div> : ""
                            }

                        </div>

                    </div>

                    <Row className="second-nav ck pc os app-navbar app-header-nav to-navcheck ">
                        <HeaderNav/>
                    </Row>
                    <Row className={"mobile-only"}>
                        <MobileNav1/>
                        <MobileNav2/>
                    </Row>

                    <Navbar.Offcanvas
                        style={{width: "80%", height: "100%",zIndex: "9999", marginTop: "0px"}}
                        className='off-canvas background-primary p-0'
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
                        <Offcanvas.Body className={(width<=514?user?"":"":"")}>
                            <SidebarMobile/>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>

                </Container>
            </Navbar>
        </>

    )
}
export default React.memo(Header);