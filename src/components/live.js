import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import './test.css'
import {useParams} from "react-router-dom";
import useWindowDimensions from "./header/Dimensions";
import {StoreContext} from "../context/store"
import {getBetslip} from "./utils/betslip";
import LiveSideBar from "./sidebar/live-sidebar";
import {ToastContainer} from "react-toastify";
import SkeletonMobileLive from "./pages/skeletonLoadersWeb/SkeletonLoaderMobile";
import {
    matchesLive,
    setFetching,
    startFetchingMatches,
    stopFetchingMatches
} from "../redux/matchesSlice";
import {useDispatch, useSelector} from "react-redux";
import {setMatchBetslip} from "../redux/bettingSlice";
import {MatchHeaderRow} from "./matches";
import {getFromLocalStorage} from "./utils/local-storage";
import {removeScrollPosition, setScrollPast, setScrollPosition, setScrollToTop} from "../redux/ScrollBehavior";

const Header = React.lazy(() => import('./header/header'));
const Footer = React.lazy(() => import('./footer/footer'));
const CarouselLoader = React.lazy(() => import('./carousel'));
const MatchList = React.lazy(() => import('./matches'));
const Right = React.lazy(() => import('./right'));

const Live = React.memo(
    () => {
        const { dispatch} = useContext(StoreContext);
        const {height, width} = useWindowDimensions();
        const {spid} = useParams();
        const [sportID, setSportID] = useState(79)

        const dispatchRedux=useDispatch()
        const producer_down=useSelector((state)=>state.matchesData.live_producer_down)
        const user_slip_validation=useSelector((state)=>state.matchesData.live_user_slip_validation)
        const fetching=useSelector((state)=>state.matchesData.live_fetching)
        const liveMatches=useSelector((state)=>state.matchesData.live_matches)
        const [matches, setMatches]=useState()
        useEffect(()=>{
            setMatches(liveMatches)
        },[liveMatches])

        const findPostableSlip = () => {
            let betslips = getBetslip() || {};
            var values = Object.keys(betslips).map(function (key) {
                return betslips[key];
            });
            return values;
        };

        useEffect(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, []);

        const fetchData = async () => {
            let endpoint = "/v1/matches/live";
            if (spid) {
                endpoint += "?spid=" + spid;
            }
            let url = new URL(window.location.href)

            let search = (url.searchParams.get('search') ||false)

            let betslip = findPostableSlip();
            let method_type = betslip ? "POST" : "GET";
            const categories = getFromLocalStorage('sport_categories')
            let sport = categories?.all_sports?.filter((category) => Number(category.sport_id) === Number(spid||79))
            const sport_type=sport != null ? sport?.[0]?.sport_name || 'Soccer' : "";
            dispatchRedux(matchesLive({endpoint,method:method_type,data:betslip,search:search, active_sport:sport_type}))
            dispatchRedux(startFetchingMatches({endpoint,method:method_type,data:betslip, interval:6000, live:true,search:search, active_sport:sport_type}));

        };


        useEffect(()=>{
            dispatchRedux(stopFetchingMatches())
            dispatchRedux(setFetching("live_fetching",true))
            fetchData()
            let cachedSlips = getBetslip("betslip");
            const betslip_data={
                betslip_type:"betslip",
                data:cachedSlips
            }
            dispatchRedux(setMatchBetslip(betslip_data))
            return ()=>{
                dispatchRedux(stopFetchingMatches())}
        },[sportID])

        useEffect(() => {
            const new_sport_id = spid
            if (sportID !== new_sport_id) {
                setSportID(new_sport_id)
            }
        })

        const homePageRef = useRef()
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

        const fetchAdditionalData=()=>{
            console.log("fetching live")
        }

        return (
            <div className={'flex-item'}>
                <div className="item4">
                    <ToastContainer/></div>
                <div className="flex-container">
                    <div className="item1 live">
                        <div className={"mobile-live-remove"}>
                            <LiveSideBar/>
                        </div>
                    </div>
                    <div className="item2 live-top">
                        <div className="gz home match-overflow ">
                            <div className="homepage mobile-full-height" ref={homePageRef}
                                 style={width < 991 ? {height: `${height}px`, overflowY: 'auto'} : {}}>
                                <CarouselLoader/>
                                <div className={`${width <= 991 ? "d-block" : "d-none"}`}>
                                    <LiveSideBar spid={spid}/>
                                </div>
                                {matches&&<MatchHeaderRow live={true} first_match={matches ? matches[0] : {}} loading={fetching} spid={spid}/>}
                                {fetching ? <SkeletonMobileLive/> : matches &&
                                    <MatchList live={1}  fetching={true} matches={matches} pdown={producer_down} onEndReached={fetchAdditionalData}/>}
                            </div>
                        </div>
                    </div>
                    <div className="item3">
                        <Right betslipValidationData={user_slip_validation} jackpotData={matches?.meta} test={true}
                               live={true}/>
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

export default React.memo(Live);
