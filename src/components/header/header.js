import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom"
import Row from 'react-bootstrap/Row';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {StoreContext} from "../../context/store";
import {getFromLocalStorage, setLocalStorage} from '../utils/local-storage';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import makeRequest from '../utils/fetch-request';
import 'react-lazy-load-image-component/src/effects/blur.css';
import logo from '../../assets/img/Logo.webp';
import {Navbar, Offcanvas} from "react-bootstrap";
import SidebarMobile from "../sidebar/awesome/SidebarMobile";
import MobileNav1 from "../mobile-navigation/MobileNav1";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import ListGroup from "react-bootstrap/ListGroup";
import LoginSection from "./LoginSection";
import {UserInfo} from "./UserInfo";
import {shouldShowDownload, shouldShowMobileNav} from './NavigationsHelper';

const ProfileMenu = React.lazy(() => import('./profile-menu'));
const HeaderNav = React.lazy(() => import('./header-nav'));


const Header = React.memo(
    (props) => {
        const {slip, scrollPosition, jackpot, profile} = props
        const gaEventTracker = useAnalyticsEventTracker('Navigation');
        const [user, setUser] = useState(getFromLocalStorage("user"));
        const {state, dispatch} = useContext(StoreContext);
        // const [searching, setSearching] = useState(false)
        const containerRef = useRef();
        const searchInputRef = useRef(null)
        const [matches, setMatches] = useState([])
        const navigate = useNavigate()
        // Import the navigationConfig object
        const {current} = containerRef;
        const [, setCompetitions] = useState({});
        const [isOpen, setIsOpen] = useState(false);
        const [, setShowLoadingModal] = useState(false);
        const pathname = window.location.pathname;
        const notShowMobileNav = shouldShowMobileNav(pathname);
        const showDownload = shouldShowDownload(pathname);
        const [settings,] = useState(getFromLocalStorage('settings'));


        // useEffect(() => {
        //     const abort = new AbortController();
        //
        //     const requestNotificationPermission = async () => {
        //         try {
        //             const permission = await Notification.requestPermission();
        //             if (permission === 'granted') {
        //                 onMessage(messaging, (payload) => {
        //                     console.log('Notification received:', payload);
        //                     // Handle the notification payload here.
        //                 });
        //             } else {
        //                 console.log('Notification permission denied.');
        //             }
        //         } catch (error) {
        //             console.error('Error requesting notification permission:', error);
        //         }
        //     };
        //
        //     requestNotificationPermission();
        //
        //     return () => abort.abort();
        // }, []);

        //       const CustomNotification = () =>
        //       {
        //           useEffect(() => {
        //               const abort = new AbortController();
        //
        //               const requestNotificationPermission = async () => {
        //                   try {
        //                       // Customized notification permission request
        //                       const permission = await customRequestPermission();
        //                       if (permission === 'granted') {
        //                           onMessage(messaging, (payload) => {
        //                               console.log('Notification received:', payload);
        //                               // Handle the notification payload here.
        //                           });
        //                       } else {
        //                           console.log('Notification permission denied.');
        //                       }
        //                   } catch (error) {
        //                       console.error('Error requesting notification permission:', error);
        //                   }
        //               };
        //
        //               requestNotificationPermission();
        //
        //               return () => abort.abort();
        //           }, []);
        //           // Customized notification permission function with UI elements
        //           const customRequestPermission = async () => {
        //               return new Promise((resolve, reject) => {
        //                   // Your custom UI elements and logic to ask for notification permission
        //                   const customNotificationUI = document.createElement('div');
        //                   customNotificationUI.innerHTML = `
        //   <p>This website would like to send you notifications.</p>
        //   <button class="permission-button" value="granted">Allow</button>
        //   <button class="permission-button" value="denied">Deny</button>
        // `;
        //                   document.body.appendChild(customNotificationUI);
        //
        //                   const permissionButtons = customNotificationUI.getElementsByClassName('permission-button');
        //                   Array.from(permissionButtons).forEach((button) => {
        //                       button.addEventListener('click', (event) => {
        //                           const value = event.target.value;
        //                           customNotificationUI.remove();
        //
        //                           if (value === 'granted') {
        //                               resolve('granted');
        //                           } else {
        //                               resolve('denied');
        //                           }
        //                       });
        //                   });
        //               });
        //           };
        //
        //           return <div>Custom Notification Component</div>;
        //       };


        useEffect(() => {
            const removeElement = () => {
                const element = document.querySelector('.app-color.lite-top-color');
                if (element) {
                    element.remove();
                }
            };

            setTimeout(removeElement, 1000);
        }, []);


        useEffect(() => {
            if (pathname !== "/login") {
                dispatch({type: "SET", key: "page_view", payload: pathname})
            }

        }, [pathname])


        useEffect(() => {
            const handleBackButton = () => {
                if (window.location.pathname === '/') {
                    setShowLoadingModal(true);
                    // let ans = window.confirm("Are you sure you want to exit this application?");
                    // if (ans) {
                    //   App.exitApp();
                    // }
                } else {
                    window.history.back();
                }
            };

        }, [setShowLoadingModal]);


        const dismissSearch = () => {
            // setSearching(false)
            dispatch({type: "SET", key: "searching", payload: false})
            setMatches([])
        }

        useEffect(() => {
            fetchMatches()
        }, [state?.searching])
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


                if (c_status === 200) {
                    dispatch({type: "SET", key: "settings", payload: c_result?.message})
                    setLocalStorage('settings', c_result?.message, 1800000);
                }

            } else {

            }
        })

        const setUtmCampaign = () => {
            const utm_source = new URL(window.location).searchParams.get('utm_source')
            const utm_campaign = new URL(window.location).searchParams.get('utm_campaign')
            const btag = new URL(window.location).searchParams.get('btag')
            if (utm_source) {
                setLocalStorage("utm_source", utm_source)
            }
            if (utm_campaign) {
                setLocalStorage("utm_campaign", utm_campaign)

            }
            if (btag) {
                setLocalStorage("btag", btag)
            }
        }


        useEffect(() => {
            const cleanUpFuction = async () => {
                const abort = new AbortController();
                await fetchAppConfigurations();
                await fetchData();

                // Custom function to clear settings from localStorage
                const clearLocalStorageSettings = () => {
                    localStorage.removeItem('settings');
                    // Manually call fetchAppConfigurations to update the settings
                    fetchAppConfigurations();
                };

                // Listen for the "storage" event to detect changes in "settings" localStorage
                const handleStorageChange = (event) => {
                    if (event.key === 'settings') {
                        fetchAppConfigurations();
                    }
                };

                // Listen for "beforeunload" event to handle clearing localStorage in the same tab
                const handleBeforeUnload = () => {
                    clearLocalStorageSettings();
                };

                window?.addEventListener('storage', handleStorageChange);
                window?.addEventListener('beforeunload', handleBeforeUnload);

                return () => {
                    // Clean up the event listeners when the component unmounts
                    window?.removeEventListener('storage', handleStorageChange);
                    window?.removeEventListener('beforeunload', handleBeforeUnload);
                    abort.abort();
                };
            }
            cleanUpFuction()
        }, [settings]);


        const NotifyToastContainer = () => {
            return (
                <>
                    {/* Render the ToastContainer */}
                    <ToastContainer
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

                    {/* Render the CustomNotification component */}
                </>
            );
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
                    dispatch({type: "SET", key: "user", payload: u});
                }
            });

        }, [current]);

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

        useEffect(() => {
            if (pathname == 'nare-league') {
                dispatch({type: "SET", key: "kiron_page", payload: true});
            } else {
                dispatch({type: "SET", key: "kiron_page", payload: false});
            }

        }, [pathname])


        return (
            <>

                <div className={'d-flex flex-column'}>
                    {(!showDownload) &&
                        <div>
                            <Link to={'/deposit?utm_source=365-promo'}
                                  target={"_self"}
                                  title={''}
                                  className={"lite-top d-flex flex-column"}
                                  onClick={() => {
                                      gaEventTracker('Aniversary Promotion');
                                  }}>
                                <div className={"app-download-link  d-flex flex-column"}>
                                   <span className={"color-app-text flashy"}>Deposit
                                       <strong style={{color: 'var(--gold'}}> 365/=</strong>  Get
                                       <strong style={{color: 'var(--gold'}}> 365/= </strong>Instant  <span style={{color:'var(--aqua-text)'}}>  Bonus</span>
                                   </span>
                                </div>
                            </Link>

                        </div>
                    }


                    <Navbar expand="md"
                            className={`${(scrollPosition || (showDownload)) && 'fixed-top-nav'} mb-0 ck pt-sm-0 pt-md-2 pc os app-navbar ${(slip || showDownload) && "top-betslip-page-fix"} ${user ? 'top-nav-login' : 'top-nav-login'}`}
                            fixed="top" variant="dark">
                        <div
                            className={'w-100 d-flex justify-content-between mobile-change desktop-ipad-size top-header-main'}>
                            <div className={"d-flex w-100 directions-header-nav"}>
                                <Navbar.Brand
                                    className={`e logo align-self-start menu-control d-flex justify-content-between w-100`}
                                    title="Betnare">
                                    <div onClick={() => navigate('/')}
                                         className="col-4 logo-betnare resize-mobile"
                                         style={{marginLeft: "2px"}}>
                                        <img
                                            src={logo}
                                            alt="Betnare"
                                            title="Betnare"
                                            effects="blur"
                                            className={`image-size ${!user && 'logo-top'}`}
                                            style={user ? {marginBottom: "0px"} : {
                                                marginBottom: "11px",
                                                width: 'auto'
                                            }}
                                        />
                                    </div>

                                    <UserInfo profile={profile}/>
                                </Navbar.Brand>

                                {/*todo check information provided for a user*/}
                                <div className={` col-10 change-size desk-top`} id="navbar-collapse-main ">
                                    <div
                                        className="col-md-11 col-sm-12 col-lg-7 right fix-view-2 disable-ipad to-navcheck justify-content-end pt-lg-0 pt-md-3">
                                        {user ? <ProfileMenu user={user} profile={profile}/> : <LoginSection/>}
                                    </div>

                                </div>
                            </div>

                            {!profile&&<Row
                                className={`second-nav ck pc os app-navbar ${user ? ' app-header-nav-login ' : ' app-header-nav '} to-navcheck `}>
                                {!pathname.includes('casino')&&<HeaderNav/>}
                            </Row>}
                            {state?.searching ?
                                <div id="navbar-collapse-main"
                                     className={`fadeIn header-menu d-flex justify-content-center w-100 d-block`}>
                                    <ListGroup as="ul" xs="9" horizontal
                                               className="nav navbar-nav og ale ss col-12 text-center w-100 d-flex">
                                        <div className="d-flex w-100">
                                            <div className="col-10  px-2" style={{marginLeft: '2vw'}}>
                                                <input type="text" placeholder={'Start typing to search for team ...'}
                                                       autoFocus={true} ref={searchInputRef}
                                                       onInput={(event) => fetchMatches(event.target.value)}
                                                       className={'form-control input-field-search border-0  text-default bg-light no-border-radius input-bg-user'}
                                                       style={{background: "#2D4352"}}/>
                                                <div style={{overflowY: 'auto', borderRadius: '2px'}}
                                                     className={`col-10 autocomplete-box  rounded position-fixed  search-results-box border-dark col-md-5 shadow-lg text-start`}
                                                     onClick={() => gaEventTracker('View Search Results')}>
                                                    {matches.map((match, index) => (
                                                        <Link to={`/?search=${match.home_team}&sub_type_id=1`}
                                                              key={index}
                                                              onClick={() => dismissSearch()}>
                                                            <li>
                                                                {match.home_team}
                                                            </li>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                            <button
                                                className={'col-2 btn text-warning align-right d-flex justify-content-center align-items-center flex-column'}
                                                onClick={() => dismissSearch()}>
                                                <FontAwesomeIcon icon={faTimes}/> Close
                                            </button>
                                        </div>

                                    </ListGroup>
                                </div>
                                : (notShowMobileNav && !slip && !jackpot&&!profile && !pathname.includes('match')) &&
                                <MobileNav1/>}


                            <Navbar.Offcanvas
                                style={{
                                    width: "80%",
                                    height: "100%",
                                    zIndex: "9999",
                                    marginTop: "0px",
                                    overflowY: "auto"
                                }}
                                className='off-canvas background-primary p-0'
                                id={`offcanvasNavbar-expand-${expand}`}
                                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                                placement="start">
                                <Offcanvas.Header closeButton className='text-white' closeVariant={"white"}
                                                  onClick={toggle}>
                                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                        <div className="col-5">
                                            <div>
                                                <img src={logo} alt="Betnare" title="Betnare" effects="blur"/>
                                            </div>
                                        </div>
                                    </Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    <SidebarMobile/>
                                </Offcanvas.Body>
                            </Navbar.Offcanvas>

                        </div>
                    </Navbar>
                </div>
            </>

        )
    })
export default React.memo(Header);