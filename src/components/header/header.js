import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom"
import Row from 'react-bootstrap/Row';
import {StoreContext} from "../../context/store";
import {getFromLocalStorage, setLocalStorage} from '../utils/local-storage';
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
import {useDispatch, useSelector} from "react-redux";
import {configSettings} from "../../redux/dataSlice";
import { userBalance} from "../../redux/authSlice";
import {matchCategories, matchesSearch} from "../../redux/matchesSlice";

const ProfileMenu = React.lazy(() => import('./profile-menu'));
const HeaderNav = React.lazy(() => import('./header-nav'));


const Header = React.memo(
    (props) => {
        const {slip, scrollPosition, jackpot, profile} = props
        const gaEventTracker = useAnalyticsEventTracker('Navigation');
        const {state, dispatch} = useContext(StoreContext);
        // const [searching, setSearching] = useState(false)
        const containerRef = useRef();
        const searchInputRef = useRef(null)
        const navigate = useNavigate()
        // Import the navigationConfig object
        const [isOpen, setIsOpen] = useState(false);
        const pathname = window.location.pathname;
        const notShowMobileNav = shouldShowMobileNav(pathname);
        const showDownload = shouldShowDownload(pathname);

        const dispatchRedux = useDispatch()
        const appConfigs=useSelector((state)=>state.data.app_config)

        const [settings,setSettings] = useState(getFromLocalStorage('settings'));
        const userData=useSelector((state)=>state.data.user)
        const matchesData=useSelector((state)=>state.matchesData.searched_matches)
        const [user, setUser]=useState(getFromLocalStorage("user"))
        const [matches, setMatches] = useState([])

        useEffect(()=>{
            setMatches(matchesData)
        },[matchesData])

        useEffect(()=>{
            if(userData){
                setUser(userData||getFromLocalStorage("user"))
            }
        }, [userData])

        useEffect(()=>{
            setSettings(appConfigs||getFromLocalStorage('settings'))
        },[appConfigs ])

        useEffect(() => {
            if (pathname !== "/login") {
                dispatch({type: "SET", key: "page_view", payload: pathname})
            }

        }, [pathname])


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
                dispatchRedux(matchesSearch({endpoint:endpoint, method:method}))
            }

        };

        const fetchData = useCallback(async () => {
            let cached_categories = getFromLocalStorage('sport_categories');

            if (!cached_categories) {
               dispatchRedux(matchCategories())
            }

        }, []);

        const fetchAppConfigurations = useCallback(async () => {

            let cached_settings = getFromLocalStorage('settings');

            if (!cached_settings) {
                dispatchRedux(configSettings())
            }
        })

        const cleanUpFuction = async () => {
            await fetchAppConfigurations();
            await fetchData();

            // Custom function to clear settings from localStorage
            // const clearLocalStorageSettings = () => {
            //     localStorage.removeItem('settings');
            //     // Manually call fetchAppConfigurations to update the settings
            //     fetchAppConfigurations();
            // };

            // Listen for the "storage" event to detect changes in "settings" localStorage
            const handleStorageChange = (event) => {
                if (event.key === 'settings') {
                    fetchAppConfigurations();
                }
            };

            // Listen for "beforeunload" event to handle clearing localStorage in the same tab
            // const handleBeforeUnload = () => {
            //     clearLocalStorageSettings();
            // };

            window?.addEventListener('storage', handleStorageChange);
            // window?.addEventListener('beforeunload', handleBeforeUnload);

            return () => {
                // Clean up the event listeners when the component unmounts
                window?.removeEventListener('storage', handleStorageChange);
                // window?.removeEventListener('beforeunload', handleBeforeUnload);

            };
        }

        useEffect(() => {
                if(settings==undefined){
                    cleanUpFuction()
                }

        }, [settings]);

        const updateUserOnHistory = () => {
            if (!user) {
                return false;
            }
            let udata = {
                token: user.token
            }
            const userValues={
                udata:udata,
                user:user
            }

            dispatchRedux(userBalance(userValues))

        };

        useEffect(()=>{
            const abort=new AbortController()
            updateUserOnHistory()
            return ()=>{
                abort.abort()
            }
        },[])

        const updateUserOnLogin = useCallback(() => {
            dispatch({type: "SET", key: "user", payload: user});
        }, [user?.msisdn, user?.balance]);



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
                    <div className={` optional-action ${showDownload?'d-none':'d-flex'}`}>
                            <Link to={'/deposit?utm_source=free-deposit-promo'}
                                  target={"_self"}
                                  title={''}
                                  className={"lite-top d-flex flex-column"}
                                  onClick={() => {
                                      gaEventTracker('Aniversary Promotion');
                                  }}>
                                <div className={"app-download-link  d-flex flex-column"}>
                                   <span className={"color-app-text flashy"}>Enjoy
                                       <strong style={{color: 'var(--gold'}}> Free</strong>  Deposits on
                                       <strong style={{color: 'var(--gold'}}> ALL </strong>Deposits
                                   </span>
                                </div>
                            </Link>

                        </div>
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

                                    <UserInfo profile={profile} user={user}/>
                                </Navbar.Brand>

                                {/*todo check information provided for a user*/}
                                <div className={` col-10 change-size desk-top`} id="navbar-collapse-main ">
                                    <div
                                        className="col-md-11 col-sm-12 col-lg-7 right fix-view-2 disable-ipad to-navcheck justify-content-end pt-lg-0 pt-md-3">
                                        {user ? <ProfileMenu user={user} profile={profile}/> : <LoginSection/>}
                                    </div>

                                </div>
                            </div>

                            {!profile && <Row
                                className={`second-nav ck pc os app-navbar ${user ? ' app-header-nav-login ' : ' app-header-nav '} to-navcheck `}>
                                 <HeaderNav/>
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
                                                    {matches?.map((match, index) => (
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
                                : (notShowMobileNav && !slip && !jackpot && !profile && !pathname.includes('match')) &&
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