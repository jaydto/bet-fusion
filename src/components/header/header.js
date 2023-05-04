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

import logo from '../../assets/img/Logo.webp';
import {Navbar, Offcanvas} from "react-bootstrap";
import SidebarMobile from "../sidebar/awesome/SidebarMobile";
import MobileNav1 from "../mobile-navigation/MobileNav1";
import MobileProfile from "./MobileProfile";
// const CompetitionsMatches = React.lazy(
//     () => import('./components/competition/competition-matches')
// );
import useWindowDimensions from "./Dimensions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloudDownloadAlt, faCoins, faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import ListGroup from "react-bootstrap/ListGroup";
import {formatNumber} from "../utils/betslip";
const  MobileNav2=React.lazy(()=>import( "../mobile-navigation/MobileNav2"));
const ProfileMenu = React.lazy(() => import('./profile-menu'));
const HeaderLogin = React.lazy(() => import('./top-login'));
const HeaderNav = React.lazy(() => import('./header-nav'));

const Header = (props) => {
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
    const [isOpen, setIsOpen] = useState(false);


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
        // searchInputRef.current.focus()
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

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const expand = "md"
    const pathname = window.location.pathname;
    useEffect(()=>{
        if(pathname=='nare-league'){
            dispatch({type: "SET", key: "kiron_page", payload:true});
        }else{
            dispatch({type: "SET", key: "kiron_page", payload:false});
        }

    },[ pathname ])
    return (
        <>
            <Navbar expand="md"   className="mb-0 ck pt-sm-0 pt-md-3 pc os app-navbar top-nav" fixed="top" variant="dark">
                <div className={'w-100 d-flex justify-content-between mobile-change desktop-ipad-size'}>
                    <div className={"d-flex w-100 directions-header-nav"}>
                    <Navbar.Brand className={`e logo align-self-start menu-control d-flex justify-content-between w-100`} title="Betnare">
                        <Link to={{pathname: "/"}} className="col-4 resize-mobile" style={{ marginLeft:"-5px"}}>
                            <img src={logo} alt="Betnare" title="Betnare" effects="blur"
                                 className={"image-size "} style={user?{marginBottom:"0px" }:{marginBottom:"11px", width:'auto'}}/>
                        </Link>

                        {user &&
                            <div
                                className="col-md-6  d-flex  right justify-content-end align-items-center w-change2 gap-2 ipad-show"
                                style={{marginLeft: 'auto'}}>
                                <div>
                                    <Link
                                        to={{pathname: "/deposit"}}
                                        className={"deposit-button size-font-user-action"}>
                                      <span className="">
                                       <span className=" "> <FontAwesomeIcon
                                           icon={faCloudDownloadAlt}/></span>&nbsp;
                                          DEPOSIT
                                      </span>
                                    </Link>
                                </div>
                                <div>

                                    <div
                                        className={"deposit-button size-font-user-action d-flex align-items-center"}
                                        style={{marginRight: "12px"}}>
                                      <span className="text-warning">
                                       <span className=" "><FontAwesomeIcon icon={faCoins} className={"text-warning"}/>
                                           </span>&nbsp;
                                          KSH {formatNumber(user.balance) || 0}
                                      </span>
                                    </div>
                                </div>
                                <div className='d-flex align-items-baseline'>
                                    <div className={` align-items-center  ${searching ? 'd-none' : 'd-flex'}`}>
                                        <Link className="" to={"#"} title="Search"
                                              onClick={() => showSearchBar()}>
                                            <span
                                                className="border-radius-search p-2 text-dark bg-light justify-content-center d-flex"><FontAwesomeIcon
                                                icon={faSearch}/> </span><span
                                        ></span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-1 button-toggle space-button"
                                     style={{width: "4.1rem", overflowY: "auto", marginLeft: '20px'}}>
                                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"lg"}`}
                                                   className="px-3 py-3" onClick={toggle}/>
                                </div>
                            </div>}
                                <>
                                {!user&&<div className="col-sm-2 mobile-profile1 align-items-center gap-3 ipad-show" style={{marginLeft:'auto'}}>
                                    <div className="remove-verify">
                                        <Link className="cg  login-color login-size btn bg-success text-light"
                                              to={"/verify"} title="Verify Account"
                                              onClick={() => gaEventTracker('Verify')}>
                                            <span className="register-label text-light">Verify</span>
                                        </Link>
                                    </div>
                                    <div className="">
                                        <Link className="cg  login-color login-size btn bg-warning text-light"
                                              to={"/signup"} title="Join now"
                                              onClick={() => gaEventTracker('Register')}>
                                            <span className="text-light ">Register</span>
                                        </Link>
                                    </div>

                                    <Link to={"/login"} className="cg  login-color login-size btn" type="submit">
                                        <span>Login</span>
                                    </Link>
                                    <div className='d-flex align-items-baseline'>
                                        <div className={` align-items-center  ${searching ? 'd-none' : 'd-flex'}`}>
                                            <Link className="" to={"#"} title="Search"
                                                  onClick={() => showSearchBar()} >
                                                <span className="border-radius-search p-2 text-dark bg-light justify-content-center d-flex"><FontAwesomeIcon  icon={faSearch}/> </span><span
                                            ></span>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-1 button-toggle space-button" style={{width: "4.1rem", overflowY:"auto",marginLeft:'20px'}}>
                                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"lg"}`} className="px-3 py-3" onClick={toggle} />
                                    </div>

                                </div>}
</>


                    </Navbar.Brand>

                    {/*todo check information provided for a user*/}
                    <div className={` col-9 change-size desk-top`} id="navbar-collapse-main " >
                        <div
                            className="col-md-11 col-sm-12 col-lg-7 right fix-view-2 disable-ipad to-navcheck justify-content-end">
                            {user ? <ProfileMenu user={user}/> : <HeaderLogin setUser={setUser}/>}
                        </div>

                    </div>
                    </div>

                    <Row className="second-nav ck pc os app-navbar app-header-nav to-navcheck ">
                        <HeaderNav/>
                    </Row>
                    <Row className={"mobile-only"}>
                        {searching?
                            <Container id="navbar-collapse-main"
                                       className={`fadeIn header-menu d-flex justify-content-center px-4 d-block`}>
                                <ListGroup as="ul" xs="9" horizontal className="nav navbar-nav og ale ss col-md-6 text-center w-100 d-flex">
                                    <div className="d-flex">
                                        <div className="col-md-12  px-2" style={{width:'90vw',marginLeft:'2vw'}}>
                                            <input type="text" placeholder={'Start typing to search for team ...'} ref={searchInputRef}
                                                   onInput={(event) => fetchMatches(event.target.value)}
                                                   className={'form-control input-field-search border-0  text-default bg-light no-border-radius'}  style={{background: "#2D4352"}}/>
                                        </div>

                                        <button className={'btn text-warning align-right d-flex justify-content-center align-items-center flex-column'} onClick={() => dismissSearch()}>
                                            <FontAwesomeIcon icon={faTimes}/> Close
                                        </button>
                                    </div>
                                    <div style={{marginLeft:'29.2px', marginTop:'33px',width:'83.6vw', overflowY:'auto', borderRadius:'2px'}}
                                        className={`autocomplete-box  rounded position-fixed bg-white border-dark col-md-5 shadow-lg text-start`}
                                        onClick={() => gaEventTracker('View Search Results')}>
                                        {matches.map((match, index) => (
                                            <Link to={`/?search=${match.home_team}`} key={index} onClick={()=> window.location.href=`/?search=${match.home_team}`}>
                                                <li>
                                                    {match.home_team}
                                                </li>
                                            </Link>
                                        ))}
                                    </div>
                                </ListGroup>
                            </Container>
                        :<MobileNav1/>}
                    </Row>

                    <Navbar.Offcanvas
                        style={{width: "80%", height: "100%",zIndex: "9999", marginTop: "0px", overflowY:"auto"}}
                        className='off-canvas background-primary p-0'
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="start">
                        <Offcanvas.Header closeButton className='text-white' closeVariant={"white"} onClick={toggle}>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                <div className="col-3">
                                    <div>
                                        <LazyLoadImage src={logo} alt="Betnare" title="Betnare" effects="blur"/>
                                    </div>
                                </div>
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body >
                            <SidebarMobile/>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>

                </div>
            </Navbar>
        </>

    )
}
export default React.memo(Header);