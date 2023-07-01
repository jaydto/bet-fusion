import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import './test.css'
import "../assets/css/bottomSheet.css"
import {Link, useLocation} from "react-router-dom";
import useWindowDimensions from "./header/Dimensions";
import {Context} from "../context/store";
import {getBetslip} from "./utils/betslip";
import useInterval from "../hooks/set-interval.hook";
import makeRequest from "./utils/fetch-request";
import Testimonials from "./carousel/Testimonials";
import Countries from "./countries/Countries";
import Skeleton1 from "./skeleton/skeleton";
import {Spinner} from "react-bootstrap";
import {ToastContainer} from "react-toastify";
import {marketChoiceOptions} from "./matches";

const Header = React.lazy(() => import('./header/header'));
const Footer = React.lazy(() => import('./footer/footer'));
const CarouselLoader = React.lazy(() => import('./carousel'));
const MainTabs = React.lazy(() => import('./header/main-tabs'));
const MatchList = React.lazy(() => import('./matches'));
const Right = React.lazy(() => import('./right'));
const SideBar = React.lazy(() => import('./sidebar/awesome/Sidebar'))
const Index = React.memo(
    () => {
        const [scrollEndedActive, setScrollEndedActive] = useState(false)
        const location = useLocation();
        const [tab, setTab] = useState('highlights');
        const [sportID, setSportID] = useState(79);
        const [loading, setLoading] = useState(false);

        const {height, width} = useWindowDimensions();
        const [matches, setMatches] = useState([]);
        const [limit, setLimit] = useState(20);
        const [producerDown, setProducerDown] = useState(false);
        const [threeWay, setThreeWay] = useState(false);
        const [page,] = useState(1);
        const [userSlipsValidation, setUserSlipsValidation] = useState();
        const [state, dispatch] = useContext(Context);
        const [fetching, setFetching] = useState(false)
        const homePageRef = useRef()
        const bottomSheetRef = useRef()
        const prevLimit = useRef(limit);
        const [reset, setReset] = useState(0);

        const markets = marketChoiceOptions();
        let sportValue = new URL(window.location).searchParams.get('sport_id')
        let url = new URL(window.location.href)
        let sub_type = (url.searchParams.get("sub_type_id") || "1")
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

        const findPostableSlip = () => {
            let betslips = getBetslip() || {};
            var values = Object.keys(betslips).map(function (key) {
                return betslips[key];
            });
            return values;
        };


        useInterval(() => {

            let endpoint = "/v1/matches";

            let betslip = findPostableSlip();

            let method = betslip ? "POST" : "GET";

            let tab = location.pathname.replace("/", "") || 'highlights';

            endpoint += "?page=" + (page || 1) + `&limit=${prevLimit.current}&tab=` + tab

            let url = new URL(window.location.href)

            let sport_id = url.searchParams.get('sport_id')

            if (sport_id !== null) {
                endpoint += " &sport_id=" + sport_id
            }
            let sub_types = (url.searchParams.get('sub_type_id') || "1,18,29").split(",")
            if (width <= 1259) {
                sub_types = [sub_types[0]]
            }

            endpoint = endpoint.replaceAll(" ", '')
            endpoint += `&sub_type_id=` + (sub_types || "1,18,29")

            let search_term = url.searchParams.get('search')

            if (search_term !== null) {
                return
            }
            makeRequest({url: endpoint, method: method, data: betslip}).then(([status, result]) => {
                if (status == 200) {
                    setMatches(matches.length > 0 ? {...matches, ...result?.data} : result?.data || result)
                    setFetching(false)
                    setLoading(false)
                    if (result?.slip_data) {
                        setUserSlipsValidation(result?.slip_data)
                    }
                    setProducerDown(result?.producer_status === 1);
                }
            });
        }, 20000, reset);

        const fetchData = useCallback(async () => {
            // setFetching(true)
            let tab = location.pathname.replace("/", "") || 'highlights';
            let tabInfo = window.location.pathname
            tabInfo = tabInfo.substring(tabInfo.lastIndexOf('/') + 1)

            let betslip = findPostableSlip();

            let endpoint = "/v1/matches?page=" + (page || 1) + `&limit=${prevLimit.current}&tab=` + tabInfo || tab;
            let url = new URL(window.location.href)
            let sport_id = url.searchParams.get('sport_id')

            if (sport_id !== null) {
                endpoint += " &sport_id=" + sport_id
            }

            endpoint = endpoint.replaceAll(" ", '')


            let search_term = url.searchParams.get('search')
            if (search_term !== null) {
                endpoint += ' &search=' + search_term
            }
            //splitting before api call
            let sub_types = (url.searchParams.get('sub_type_id') || "1,18,29").split(",")

            if (width <= 1259) {
                sub_types = [sub_types[0]]
            }

            endpoint += `&sub_type_id=` + (sub_types || "1,18,29")


            await makeRequest({url: endpoint, method: "POST", data: betslip}).then(([status, result]) => {
                if (status == 200) {
                    setMatches(matches.length > 0 ? {...matches, ...result?.data} : result?.data || result)
                    setFetching(false)
                    setLoading(false)
                    setScrollEndedActive(false)
                    if (result?.slip_data) {
                        setUserSlipsValidation(result?.slip_data)
                    }
                    setProducerDown(result?.producer_status === 1);
                }
            });

        }, []);

        const checkThreeWay = () => {
            let url = new URL(window.location)
            let sub_types = (url.searchParams.get('sub_type_id') || "1,18,29").split(",")
            setThreeWay(sub_types.includes("1"))
        }


        useEffect(() => {
            let new_tab = ""
            const new_sport_id = Number(new URL(window.location).searchParams.get("sport_id"))

            if (window.location.href.includes("highlights")) {
                new_tab = ("highlights")
            }

            if (window.location.href.includes("upcoming")) {
                new_tab = ("upcoming")

            }
            if (window.location.href.includes("tomorrow")) {
                new_tab = ('tomorrow')
            }
            if (window.location.href.includes("countries")) {
                new_tab = ('countries')
            }


            if (new_tab !== tab) {
                setTab(new_tab)
                setLoading(true)
            }


            if (sportID !== new_sport_id) {

                setSportID(new_sport_id)
                setLoading(true)
                setMatches([])

            } else {

            }

        })


        useEffect(() => {
            setReset(c => c + 1);
            fetchData();

            checkThreeWay()
            let cachedSlips = getBetslip("betslip");
            if (cachedSlips) {
                dispatch({type: "SET", key: "betslip", payload: cachedSlips});
            }
            return () => {
                setMatches(null);
            };
        }, [window.location.pathname, window.location.search]);


        useEffect(() => {

            if (prevLimit.current !== limit && limit > prevLimit.current) {
                setReset(c => c + 1);

                prevLimit.current = limit

            }

        }, [limit])

        useEffect(() => {

            if (prevLimit.current !== 20) {
                fetchData()
            }

        }, [prevLimit.current])

        document.addEventListener('scrollEnd', (event) => {
            if (!fetching) {
                setFetching(true)
                setLimit(limit + 20)
            }
        })

        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (bottomSheetRef.current && !bottomSheetRef.current.contains(event.target)) {
                    dispatch({type: "SET", key: "bottomSheet", payload: false});
                }
            }

            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [bottomSheetRef]);

        const showBottomSheet=()=>{
            console.log("sheeet")
            dispatch({type: "SET", key: "bottomSheet", payload: true});
        }
        const collapseBottomSheet=()=>{
            dispatch({type: "SET", key: "bottomSheet", payload: false});
        }

        const [scrolledPast, setScrolledPast] = useState(false);
        const [scrolledToTop, setScrolledToTop] = useState(false);
        const [scrollPosition, setScrollPosition] = useState(false);

        useEffect(() => {
            const handleScroll = () => {
                if (homePageRef.current) {
                    const scrollPosition = homePageRef.current.scrollTop;
                    if (!scrolledPast && scrollPosition > 10) {

                        setScrollPosition(true)
                        setScrolledPast(true);
                        setScrolledToTop(false); // Reset the other variable
                    } else if (!scrolledToTop && scrollPosition <= 10) {

                        setScrollPosition(false)
                        setScrolledToTop(true);
                        setScrolledPast(false); // Reset the other variable
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
        let marketName = new URLSearchParams(window.location.search).get('market_name')
        let sportId = new URLSearchParams(window.location.search).get('sport_id')||'79'
        const filteredMarkets = markets.find((market) => market.sport_id === sportId);


        return (
            <div className={'flex-item'}>

                <div className="item4">
                    <Header scrollPosition={scrollPosition}/>
                    <ToastContainer/>
                </div>
                <div className="flex-container">
                    <div className="item1"><SideBar loadCompetitions/></div>
                    <div className="item2">
                        <div className="gz home match-overflow ">
                            <div className="homepage mobile-full-height" ref={homePageRef}
                                 style={width < 991 ? {height: `${height}px`, overflowY: 'auto'} : {}}>
                                {/*<MobileNav2/>*/}
                                <CarouselLoader/>
                                <Testimonials/>
                                <div className={'filters-navigation gap-3 d-flex justify-content-between align-items-center'}>
                                    <MainTabs tab={location.pathname.replace("/", "")}/>
                                    {width<991&&<div className={'d-flex justify-content-between my-3'}>
                                        {filteredMarkets?.default_markets.length > 0 &&
                                            <div className="myButton markets-button"
                                                 onClick={()=>showBottomSheet()}> {marketName || '1x2'}</div>
                                        }
                                    </div>}
                                </div>
                                {loading ?
                                    <div className={`text-center mt-2 text-white d-block`}>
                                        <Skeleton1/>
                                    </div> : tab == 'countries' ? <Countries/> :
                                        <div>
                                            <MatchList
                                                live={false}
                                                fetching={fetching}
                                                matches={matches}
                                                pdown={producerDown}
                                                three_way={threeWay}

                                            />
                                            <div
                                                className={`text-center mt-2 text-white ${fetching ? 'd-block' : 'd-none'}`}>
                                                <Spinner animation={'grow'} size={'lg'}/>
                                            </div>
                                        </div>

                                }

                            </div>
                        </div>
                    </div>
                    <div className="item3">
                        <Right betslipValidationData={userSlipsValidation}
                                                  jackpotData={matches?.meta}
                                                  test={true}/>
                        <div className={`${state?.bottomSheet?'bottom-sheet show ':'d-none'}`} ref={bottomSheetRef}>
                            <div className="sheet-overlay"></div>
                            <div className="content">
                                <div className="header">
                                    <div className="drag-icon"><span></span></div>
                                </div>
                                <div className="body d-flex flex-column gap-4">
                                    {filteredMarkets?.default_markets?.map((market) => (
                                        <Link
                                            key={market?.id}
                                            to={`/highlights?sport_id=79&sub_type_id=${market?.id}&market_name=${market?.name}`}
                                            className={`markets-default ${sub_type===market?.id&& 'active-market-display'}`} onClick={collapseBottomSheet}>
                                            {market?.market_name}
                                        </Link>
                                    ))}

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
    });

export default React.memo(Index);
