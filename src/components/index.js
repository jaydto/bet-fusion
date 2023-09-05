import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import './test.css'
import "../assets/css/bottomSheet.css"
import {Link, useLocation} from "react-router-dom";
import useWindowDimensions from "./header/Dimensions";
import {StoreContext} from "../context/store"
import {getBetslip} from "./utils/betslip";
import Countries from "./countries/Countries";
import {ToastContainer} from "react-toastify";
import {marketChoiceOptions} from "./matches";
import SkeletonLoaderMobile from "./pages/skeletonLoadersWeb/SkeletonLoaderMobile";
import Skeleton1 from "./skeleton/skeleton";
import {getFromLocalStorage, setLocalStorage} from "./utils/local-storage";
import {useDispatch, useSelector} from "react-redux";
import {
    matchesPrematch, resetState, setFetching,
    setInitialLoadingState, setLimit,
    startFetchingMatches,
    stopFetchingMatches
} from "../redux/matchesSlice";
import {userBalance} from "../redux/authSlice";
import {setMatchBetslip} from "../redux/bettingSlice";

const Header = React.lazy(() => import('./header/header'));
const Footer = React.lazy(() => import('./footer/footer'));
const CarouselLoader = React.lazy(() => import('./carousel'));
const MainTabs = React.lazy(() => import('./header/main-tabs'));
const MatchList = React.lazy(() => import('./matches'));
const Right = React.lazy(() => import('./right'));
const SideBar = React.lazy(() => import('./sidebar/awesome/Sidebar'))
const Index = React.memo(
    () => {
        const location = useLocation();
        const userData=useSelector((state)=>state.data.user)
        const [user, setUser]=useState(getFromLocalStorage("user"))
        const [tab, setTab] = useState('highlights');
        const [sportID, setSportID] = useState(79);
        const {height, width} = useWindowDimensions();
        const [threeWay, setThreeWay] = useState(false);
        const [page,] = useState(1);
        const {state, dispatch} = useContext(StoreContext);
        const homePageRef = useRef()
        const bottomSheetRef = useRef()

        useEffect(()=>{
            if(userData){
                setUser(userData||getFromLocalStorage("user"))
            }
        }, [userData])


        const markets = marketChoiceOptions();
        let sportValue = new URL(window.location).searchParams.get('sport_id')
        let url = new URL(window.location.href)
        let sub_type = (url.searchParams.get("sub_type_id") || "1")
        const dispatchRedux=useDispatch()
        const matches=useSelector((state)=>state.matchesData.matches)
        // const prev_match_size=useSelector((state)=>state.matchesData.prev_match_size)
        const match_size=useSelector((state)=>state.matchesData.match_size)
        const producer_down=useSelector((state)=>state.matchesData.producer_down)
        const user_slip_validation=useSelector((state)=>state.matchesData.user_slip_validation)
        const loading=useSelector((state)=>state.matchesData.loading)
        const fetching=useSelector((state)=>state.matchesData.fetching)
        const limit=useSelector((state)=>state.matchesData.limit)
        const [newLimit, setNewLimit]=useState(10)
        const [newMatches, setNewMatches]=useState()
        useEffect(()=>{
            setNewLimit(limit)
        },[limit])
        useEffect(()=>{
            setNewMatches(matches)
        },[matches])

        useEffect(()=>{
            if(limit!==10){
                dispatchRedux(stopFetchingMatches())
                fetchData()
            }
        },[newLimit])
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


        useEffect(() => {
            const abort = new AbortController()
            updateUserOnHistory()
            return () => {
                dispatchRedux(stopFetchingMatches())
                abort.abort()
            }
        }, [])



        const fetchData = async () => {

            let tab = location.pathname.replace("/", "") || 'highlights';
            let tabInfo = window.location.pathname
            tabInfo = tabInfo.substring(tabInfo.lastIndexOf('/') + 1)

            let betslip = findPostableSlip();

            let endpoint = "/v1/matches?page=" + (page || 1) + `&limit=${newLimit}&tab=` + tabInfo || tab;
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
            let sub_types = (url.searchParams.get('sub_type_id') || "1")

            endpoint += `&sub_type_id=` + (sub_types || "1")

            dispatchRedux(matchesPrematch({endpoint,method:"POST",data:betslip})); // Dispatch matchesPrematch with the updated fetchParams

            // Clear the interval when fetchParams change
            dispatchRedux(startFetchingMatches({endpoint,method:"POST",data:betslip, interval:20000, prematch:true}));

        };

        const checkThreeWay = () => {
            let url = new URL(window.location)
            let sub_types = (url.searchParams.get('sub_type_id') || "1")
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


            if (new_tab !== tab && new_tab !=='countries') {
                setTab(new_tab)
                // dispatchRedux(setLimit(limit+10))
                dispatchRedux(setInitialLoadingState("tabs", new_tab))
            }else{
                setTab(new_tab)
            }


            if (sportID !== new_sport_id) {
                // dispatchRedux(setLimit(limit+10))
                setSportID(new_sport_id)
                dispatchRedux(setInitialLoadingState("sport_id", new_sport_id))
                // setMatches([])

            } else {
                setSportID(new_sport_id)
            }

        }, [sportID, tab, window.location.href])



        useEffect(() => {
            // stop the fetchInterva;
            dispatchRedux(stopFetchingMatches())
            dispatchRedux(resetState("limit"))
            // Start fetching matches with the new fetchParams
            fetchData();
            checkThreeWay()
            let cachedSlips = getBetslip("betslip");
            if (cachedSlips) {
                const betslip_data={
                    betslip_type:"betslip",
                    data:cachedSlips
                }
                dispatchRedux(setMatchBetslip(betslip_data))
                // dispatch({type: "SET", key: "betslip", payload: cachedSlips});
            }

        }, [window.location.pathname, window.location.search]);




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

        const showBottomSheet = () => {
            dispatch({type: "SET", key: "bottomSheet", payload: true});
        }
        const collapseBottomSheet = () => {
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
        let sportId = new URLSearchParams(window.location.search).get('sport_id') || '79'
        const filteredMarkets = markets.find((market) => market.sport_id === sportId);

        const fetchAdditionalData=()=>{
            if (limit>match_size){
                console.log("we have reached end of match List")
            }else{
                dispatchRedux(setLimit(10))
                dispatchRedux(setFetching("fetching",true))
            }

        }



        return (
            <div className={'flex-item'}>

                <div className="item4">
                    <Header scrollPosition={scrollPosition}/>
                    <ToastContainer/>
                </div>
                <div className="flex-container">
                    <div className="item1" style={state?.sidebarToggled ? {width: '12%'} : {}}><SideBar
                        loadCompetitions/></div>
                    <div className="item2">
                        <div className="gz home match-overflow ">
                            <div className="homepage mobile-full-height" ref={homePageRef}
                                 style={width < 991 ? {height: `${height}px`, overflowY: 'auto'} : {}}>
                                <div
                                    className={'filters-navigation gap-3 d-flex justify-content-between align-items-center'}>
                                    <MainTabs tab={location.pathname.replace("/", "")}/>
                                    <div className={'d-flex justify-content-between my-3 my-filter-button'}>
                                        {filteredMarkets?.default_markets.length > 0 &&
                                            <div className="myButton markets-button"
                                                 onClick={() => showBottomSheet()}> {marketName || '1x2'}</div>
                                        }
                                    </div>
                                </div>
                                <CarouselLoader/>
                                {loading ?
                                    <div className={`text-center mt-2 text-white d-block`}>
                                        {tab == 'countries' ? <Skeleton1/> : <SkeletonLoaderMobile/>}
                                    </div> : tab == 'countries' ? <Countries/> :
                                        <div>
                                            <MatchList
                                                live={false}
                                                fetching={fetching}
                                                matches={newMatches}
                                                pdown={producer_down}
                                                three_way={threeWay}
                                                onEndReached={fetchAdditionalData}

                                            />
                                            <div
                                                className={`text-center mt-2 text-white ${fetching ? 'd-block' : 'd-none'}`}>
                                                {tab == 'countries' ? <Skeleton1/> :<SkeletonLoaderMobile/>}
                                            </div>
                                        </div>

                                }
                                {/*{showNotificationModal && <CustomNotificationModal onClose={handleCloseNotificationModal} />}*/}
                            </div>
                        </div>
                    </div>
                    <div className="item3">
                        <Right betslipValidationData={user_slip_validation}
                               jackpotData={newMatches?.meta}
                               test={true}/>
                        <div className={`${state?.bottomSheet ? 'bottom-sheet show ' : 'd-none'}`} ref={bottomSheetRef}>
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
                                            className={`markets-default ${sub_type === market?.id && 'active-market-display'}`}
                                            onClick={collapseBottomSheet}>
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
