import {ToastContainer} from "react-toastify";
import {marketChoiceOptions} from "./matches";
import React, {useContext, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {StoreContext} from "../context/store";
import Footer from "./footer/footer";
import CompetitionMatches from "./competition-matches";
import Index from "./index";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {Link, useLocation, useParams} from "react-router-dom";
import {Button} from "react-bootstrap";
import {setState} from "../redux/dataSlice";
import {setInitialLoadingState, stopFetchingMatches} from "../redux/matchesSlice";
import Right from "./right";
import useWindowDimensions from "./header/Dimensions";
import {userBalance} from "../redux/authSlice";
import {getFromLocalStorage, setLocalStorage} from "./utils/local-storage";
import MainTabs from "./header/main-tabs";
import CarouselLoader from "./carousel";
import {removeScrollPosition, setScrollPast, setScrollPosition, setScrollToTop} from "../redux/ScrollBehavior";
import LiveSideBar from "./sidebar/live-sidebar";
import Live from "./live";
import AllMarkets from "./all-markets";

const SideBar = React.lazy(() => import('./sidebar/awesome/Sidebar'))


const DefaultPage = React.memo(
    () => {
        let url = new URL(window.location.href)
        const {spid} = useParams();
        const bottomSheetRef = useRef()
        const bottom_sheet = useSelector((state) => state.data.bottom_sheet)

        const user_slip_validation = useSelector((state) => state.matchesData.user_slip_validation)
        const {height,width} = useWindowDimensions();
        let marketName = new URLSearchParams(window.location.search).get('market_name')

        const newMatches = useSelector((state) => state.matchesData.matches)
        const homePageRef = useRef()

        let c_pathname = url.pathname;

        let sub_type = (url.searchParams.get("sub_type_id") || "1")
        const [tab, setTab] = useState('highlights');
        const [sportID, setSportID] = useState(79);
        const [sportLeague, setSportLeague] = useState('');

        const {state, dispatch} = useContext(StoreContext);
        const dispatchRedux = useDispatch()
        const markets = marketChoiceOptions();
        let sportId = new URLSearchParams(window.location.search).get('sport_id') || '79'
        let sportValue = new URL(window.location).searchParams.get('sport_id')
        const userData = useSelector((state) => state.auth.user)
        const [user, setUser] = useState(getFromLocalStorage("user"))


        const filteredMarkets = markets.find((market) => market.sport_id === sportId);

        const pathname = window.location.pathname
        const showBottomSheet = () => {
            dispatchRedux(setState('bottom_sheet', true))
        }

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
            const abort = new AbortController();
            setUtmCampaign()
            return () => {
                abort.abort(); // Cleanup function to abort the controller when the component unmounts.
            };
        }, [])

        const updateUserOnHistory = () => {
            if (!user) {
                return false;
            }
            let udata = {
                token: user.token
            }
            const userValues = {
                udata: udata,
                user: user
            }

            dispatchRedux(userBalance(userValues))

        };
        useEffect(() => {
            const abort = new AbortController()
            updateUserOnHistory()
            return () => {
                abort.abort()
            }
        }, [])

        useEffect(() => {
            if (userData) {
                setUser(userData || getFromLocalStorage("user"))
            }
        }, [userData])

        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (
                    bottomSheetRef.current &&
                    !bottomSheetRef.current.contains(event.target)
                ) {
                    dispatchRedux(setState('bottom_sheet', false))

                }

            }

            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            // document.addEventListener("click", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);

            };
        }, [bottomSheetRef, bottom_sheet]);

        const collapseBottomSheet = () => {
            dispatchRedux(setState('bottom_sheet', false))

        }
        const setFilterPicked = (filters) => {
            const data = {
                param_fetch_type: "filters",
                filters: filters
            }
            dispatchRedux(setInitialLoadingState(data))
        }

        useEffect(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, []);
        const scrolledPast=useSelector((state)=>state.scroll.scroll_past)
        const scrolledToTop=useSelector((state)=>state.scroll.scroll_top)

        useEffect(() => {
            const handleScroll = () => {
                if (homePageRef.current) {
                    const scrollPosition = homePageRef.current.scrollTop;
                    if (!scrolledPast && scrollPosition > 10) {
                        dispatchRedux(setScrollPosition())
                        dispatchRedux(setScrollPast({scroll_past:true}))
                        dispatchRedux(setScrollToTop({scroll_top:false}))

                    } else if (!scrolledToTop && scrollPosition <= 10) {
                        dispatchRedux(removeScrollPosition())
                        dispatchRedux(setScrollPast({scroll_past:false}))
                        dispatchRedux(setScrollToTop({scroll_top:true}))

                    }
                }
            };

            if (homePageRef.current) {
                homePageRef.current.addEventListener('scroll', handleScroll);
            }

            return () => {
                if (homePageRef.current) {
                    homePageRef.current.removeEventListener('scroll', handleScroll);
                }
            };
        }, [homePageRef, scrolledPast, scrolledToTop]);

        const updateSearchTerm = () => {
            const params = new URL(window.location).searchParams;
            const sportId = params.get('sport_id');
            dispatch({type: "SET", key: 'active_sport', payload: sportId});
        }
        const updateSearchSport = () => {
            const params = new URL(window.location).searchParams;
            const sportName = params.get('sport_name');
            dispatch({type: "SET", key: 'active_sport_name', payload: sportName});
        }

        useEffect(() => {
            updateSearchTerm();
            updateSearchSport();
        }, [sportValue]);
        // Split the pathname by "/competition/"
        let parts = c_pathname.split("/competition/");
        let competitionpath
        let competition_filter;
// If there are parts after "/competition/", reconstruct the modified URL
        if (parts.length > 1) {
            competitionpath = "/competition/" + parts[1];
            competition_filter = parts[0]


        }
        const location = useLocation();
        const user_slip_validation_live=useSelector((state)=>state.matchesData.live_user_slip_validation)

        return (
            <div className={'flex-item'}>
                <div className={bottom_sheet ? 'pointer-event-handler item4' : "item4"}>
                    <ToastContainer/>
                </div>
                <div className={`flex-container ${pathname.includes('match')?' top-spacing-page-no-download':''}`}>
                    <div className={bottom_sheet ? 'pointer-event-handler item1' : "item1"}>
                        {pathname.includes('live')?<LiveSideBar spid={spid}/>:<SideBar loadCompetitions/>}
                    </div>
                    <div className={bottom_sheet ? `pointer-event-handler item2` : `item2 ${pathname.includes('match')?' size-all-markets':pathname.includes('live')?' live-top':''}`}
                         style={bottom_sheet ? {opacity: '0.5', background: '#13171c'} : {}}>
                        <div className={`gz home match-overflow ${competitionpath&&'competition-mobile-top'} `}>
                            <div className={`homepage mobile-full-height ${pathname.includes('match')?' all-markets':''}`} ref={homePageRef} style={width < 991 ? {height: `${height}px`, overflowY: 'auto'} : {}}>

                                {(!pathname.includes('live')&&!pathname.includes('match'))&&<div
                                    className={'filters-navigation gap-3 d-flex justify-content-between align-items-center'}>
                                    <MainTabs tab={
                                        competitionpath?
                                            pathname.includes('upcoming')?'upcoming':
                                                pathname.includes('tomorrow')?'tomorrow':
                                                    pathname.includes('countries')?'countries':
                                                        'highlights':
                                                            location.pathname.replace("/", "")
                                    } competition={competitionpath}/>

                                    <div className={'d-flex justify-content-between my-3 my-filter-button'}>
                                        {filteredMarkets?.default_markets.length > 0 &&
                                            <div className="myButton markets-button"
                                                 onClick={() => showBottomSheet()}> {marketName || '1x2'}</div>
                                        }
                                    </div>
                                </div>}
                                {!pathname.includes('match')&&<CarouselLoader/>}
                                {pathname.includes('competition') ?
                                    <CompetitionMatches tab={tab}/> :
                                    (pathname.includes('match'))?<AllMarkets/>:
                                    pathname.includes('live')?
                                        <Live/>:
                                        <Index tab={location.pathname.replace("/", "")}/>}

                            </div>


                        </div>
                    </div>
                    <div className={"item3"}>
                        {
                            bottom_sheet && width < 991 ? '' :
                                <Right betslipValidationData={spid?user_slip_validation_live:user_slip_validation}
                                                                      jackpotData={newMatches?.meta}
                                                                      test={true}/>
                        }

                        <div className={`${bottom_sheet ? 'bottom-sheet show ' : 'd-none'}`}>
                            <div className="sheet-overlay"></div>
                            <div ref={bottomSheetRef} className="content">
                                <div className="header d-flex justify-content-between">
                                    <div className="drag-icon"><span></span></div>
                                    <FontAwesomeIcon icon={faXmark} onClick={() => {
                                        collapseBottomSheet()
                                    }} className={'filter-close-icon'}/>

                                </div>
                                <div className="body d-flex flex-column gap-4">
                                    {filteredMarkets?.default_markets?.map((market, index) => {

                                        const tab_start = 'highlights'

                                        const pathnameWithLeadingSlash = c_pathname.startsWith('/') ? c_pathname.length == 1 ? tab_start : c_pathname : `/${tab_start}`;


                                        return (<Link
                                            key={index}
                                            to={`${pathnameWithLeadingSlash}?sport_id=79&sub_type_id=${market?.id}&market_name=${market?.name}`}
                                            className={`w-100 markets-default bottom-align ${sub_type === market?.id && 'active-market-display'}`}
                                            onClick={() => {
                                                collapseBottomSheet();
                                                setFilterPicked(market?.market_name)
                                            }}>
                                            {market?.market_name}
                                        </Link>)
                                    })}

                                </div>
                                <div style={{position: 'relative'}}>
                                    <Button onClick={() => {
                                        collapseBottomSheet()
                                    }}
                                            className={"text-light bold color-inherit btn border-0 cancel-filter-markets"}>Cancel</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="item6">
                    <div className={"footer-mobile-none"}>
                        <Footer/>
                    </div>
                </div>
            </div>

        );
    })
export default React.memo(DefaultPage)