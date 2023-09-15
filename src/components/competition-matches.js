import React, {useContext, useEffect, useRef, useState} from "react";
import {Link, useLocation, useParams} from 'react-router-dom';
import {getBetslip} from './utils/betslip';
import './test.css'
import "../assets/css/bottomSheet.css"
import {ToastContainer} from "react-toastify";
import SkeletonLoaderMobile from "./pages/skeletonLoadersWeb/SkeletonLoaderMobile";
import MainTabs from "./header/main-tabs";
import MatchList, {marketChoiceOptions, MatchHeaderRow} from "./matches/index";
import {useDispatch, useSelector} from "react-redux";
import {
    matchesCompetition,
    setFetching, setInitialLoadingState,
    startFetchingMatches,
    stopFetchingMatches
} from "../redux/matchesSlice";
import {StoreContext} from "../context/store";
import useWindowDimensions from "./header/Dimensions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {Button} from "react-bootstrap";

const Header = React.lazy(() => import('./header/header'));
const Footer = React.lazy(() => import('./footer/footer'));
const SideBar = React.lazy(() => import('./sidebar/awesome/Sidebar'));
const CarouselLoader = React.lazy(() => import('./carousel/index'));
const Right = React.lazy(() => import('./right/index'));

const CompetitionMatches = React.memo(
    () => {
        const [page,] = useState(1);
        const location = useLocation();
        const [tab, setTab] = useState('highlights');

        const {competitionid} = useParams();
        const {state,dispatch}=useContext(StoreContext)

        const dispatchRedux=useDispatch()
        const producer_down=useSelector((state)=>state.matchesData.producer_down)
        const user_slip_validation=useSelector((state)=>state.matchesData.user_slip_validation)
        const fetching=useSelector((state)=>state.matchesData.fetching)
        const competitonMatches=useSelector((state)=>state.matchesData.matches)
        const { width} = useWindowDimensions();
        const bottomSheetRef = useRef()
        const competitionPageRef = useRef()

        const markets = marketChoiceOptions();
        let marketName = new URLSearchParams(window.location.search).get('market_name')
        let url = new URL(window.location.href)
        let sub_type = (url.searchParams.get("sub_type_id") || "1")
        let sportId = new URLSearchParams(window.location.search).get('sport_id') || '79'
        let tab_data = new URLSearchParams(window.location.search).get('tab') || 'highlights'
        const setFilterPicked=(filters)=>{
            const data={
                param_fetch_type:"filters",
                filters:filters
            }
            dispatchRedux(setInitialLoadingState(data))
        }
        useEffect(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, []);

        const showBottomSheet = () => {
            dispatch({type: "SET", key: "bottomSheet", payload: true});
        }
        const collapseBottomSheet = () => {
            dispatch({type: "SET", key: "bottomSheet", payload: false});
        }
        const [matches, setMatches]=useState()
        useEffect(()=>{
            setMatches(competitonMatches)
        },[competitonMatches])

        useEffect(() => {
            let new_tab = ""
            let url = new URL(window.location.href)

            if (url.searchParams.get("tab")=="highlights") {
                new_tab = ("highlights")
            }

            if (url.searchParams.get("tab")=="upcoming") {
                new_tab = ("upcoming")

            }
            if (url.searchParams.get("tab")=="tomorrow") {
                new_tab = ('tomorrow')
            }
            if (window.location.href.includes("countries")) {
                new_tab = ('countries')
            }

            if (new_tab !== tab && new_tab !=='countries') {
                setTab(new_tab)
                const data={
                    param_fetch_type:"tabs",
                    tab:new_tab
                }
                dispatchRedux(setInitialLoadingState(data))
            }else{
                setTab(new_tab)
            }

        }, [ tab, window.location.href,tab_data])

        const fetchAdditionalData=()=>{
            return
        }


        const filteredMarkets = markets.find((market) => market.sport_id === sportId);
        // Get the pathname of the URL (everything after the domain)
        let c_pathname = url.pathname;

// Split the pathname by "/competition/"
        let parts = c_pathname.split("/competition/");
        let competitionpath
        let competition_filter;
// If there are parts after "/competition/", reconstruct the modified URL
        if (parts.length > 1) {
            competitionpath ="/competition/" + parts[1];
            competition_filter=parts[0]


        }



        const findPostableSlip = () => {

            let betslips = getBetslip() || {};
            var values = Object.keys(betslips).map(function (key) {
                return betslips[key];
            });
            return values;
        };
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (
                    bottomSheetRef.current &&
                    !bottomSheetRef.current.contains(event.target)
                ) {
                    // const clickableItem = homePageRef.current.querySelector('a, button'); // You can customize this selector

                    dispatch({ type: "SET", key: "bottomSheet", payload: false });
                }
            }

            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);

            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [bottomSheetRef, competitionPageRef]);



        const fetchPagedData = () => {
            // console.log("called here")

                let betslip = findPostableSlip();
                let endpoint = "/v1/sports/competition?id=" + competitionid + "&page=" + (page || 1);
                let url = new URL(window.location.href)
                let sub_types = (url.searchParams.get('sub_type_id') || "1")
                let tab_info = competition_filter==='/upcoming-competition'?'upcoming':competition_filter==='/tomorrow-competition'?'tomorrow':competition_filter==='/highlights-competition'?'highlights':'highlights'


                endpoint += `&sub_type_id=` + (sub_types || "1")
                endpoint+="&tab="+(tab_info)
                dispatchRedux(matchesCompetition({endpoint,method:"POST",data:betslip})); // Dispatch matchesCompetition with the updated fetchParams

                // Clear the interval when fetchParams change
                dispatchRedux(startFetchingMatches({endpoint,method:"POST",data:betslip, interval:20000, competition:true}));



        };

        useEffect(() => {
            // console.log("called this")
            dispatchRedux(stopFetchingMatches())
            fetchPagedData()
            dispatchRedux(setFetching("fetching",true))


        }, [window.location.pathname, window.location.search]);


        const urlPath = window.location.pathname
        const showDownload = (!urlPath.includes("nare-games") && !urlPath.includes("gameplay") && !urlPath.includes("smart-play") && !urlPath.includes("betslip-slip") && !urlPath.includes("nare-league") && !urlPath.includes("bet-history") && !urlPath.includes("standings") && !urlPath.includes("results") && !urlPath.includes("casino") && !urlPath.includes("jackpot") && !urlPath.includes("smart-soft") && !urlPath.includes("virtuals") && !urlPath.includes("match") && !urlPath.includes("competition"))


        return (
            <div className={'flex-item'}>
                <div className="item4"><Header/>
                    <ToastContainer/></div>
                <div className={`flex-container ${!showDownload && 'top-spacing-page-no-download competitions-page'}`}>
                    <div className="item1"><SideBar loadCompetitions/></div>
                    <div className="item2">

                            <div className="gz home match-overflow" >
                                <div className="homepage mobile-full-height" ref={competitionPageRef}>
                                    <div
                                        className={'filters-navigation gap-3 d-flex justify-content-between align-items-center mt-2 pt-2'}>
                                        <MainTabs tab={location.pathname.replace("/", "")} competition={competitionpath}/>
                                        <div className={'d-flex justify-content-between my-3 my-filter-button'}>
                                            {filteredMarkets?.default_markets.length > 0 &&
                                                <div className="myButton markets-button"
                                                     onClick={() => showBottomSheet()}> {marketName || '1x2'}</div>
                                            }
                                        </div>
                                    </div>
                                    <CarouselLoader/>
                                    {matches&&<MatchHeaderRow live={false} first_match={matches ? matches[0] : {}} loading={fetching}/>}
                                    {fetching?
                                        <SkeletonLoaderMobile/>:
                                        matches && <MatchList
                                        live={false}
                                        matches={matches}
                                        pdown={producer_down}
                                        onEndReached={fetchAdditionalData}
                                    />}
                                </div>
                                <div className={`text-center mt-2 text-white ${fetching ? 'd-block' : 'd-none'}`}>
                                    <SkeletonLoaderMobile/>
                                </div>
                            </div>

                    </div>
                    <div className="item3">
                        {state?.bottomSheet&&width<991?"":<Right betslipValidationData={user_slip_validation} test={true}/>}
                        <div className={`${state?.bottomSheet ? 'bottom-sheet show ' : 'd-none'}`}>
                            <div className="sheet-overlay"></div>
                            <div  ref={bottomSheetRef} className="content">
                                <div className="header d-flex justify-content-between">
                                    <div className="drag-icon"><span></span></div>
                                    <FontAwesomeIcon  icon={faXmark} onClick={()=>{collapseBottomSheet()}} className={'filter-close-icon'}/>

                                </div>
                                <div className="body d-flex flex-column gap-4">
                                    {filteredMarkets?.default_markets?.map((market, index) => {
                                        // c_pathname contains a leading "/"
                                        const pathnameWithLeadingSlash = c_pathname.startsWith('/') ? c_pathname : `/${c_pathname}`;

                                        return (
                                            <Link
                                                key={index}
                                                to={`${pathnameWithLeadingSlash}?sport_id=79&sub_type_id=${market?.id}&market_name=${market?.name}`}
                                                className={`markets-default ${sub_type === market?.id && 'active-market-display'}`}
                                                onClick={() => {
                                                    collapseBottomSheet();
                                                    setFilterPicked(market?.market_name);
                                                }}
                                            >
                                                {market?.market_name}
                                            </Link>
                                        );
                                    })}

                                    <Button onClick={()=>{collapseBottomSheet()}} className={"text-light bold color-inherit btn border-0 cancel-filter-markets"}>Cancel</Button>

                                </div>
                            </div >
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

export default React.memo(CompetitionMatches);
