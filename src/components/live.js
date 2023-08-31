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


        const fetchData = async () => {
            let endpoint = "/v1/matches/live";
            if (spid) {
                endpoint += "?spid=" + spid;
            }
            let betslip = findPostableSlip();
            let method_type = betslip ? "POST" : "GET";
            dispatchRedux(matchesLive({endpoint,method:method_type,data:betslip}))

            // Clear the interval when fetchParams change
            dispatchRedux(startFetchingMatches({endpoint,method:method_type,data:betslip, interval:5000, prematch:false}));

        };


        useEffect(()=>{
            dispatchRedux(stopFetchingMatches())
            dispatchRedux(setFetching("live_fetching",true))

            fetchData()
            let cachedSlips = getBetslip("betslip");
            if (cachedSlips) {
                dispatch({type: "SET", key: "betslip", payload: cachedSlips});
            }
        },[sportID])

        useEffect(() => {
            const new_sport_id = spid
            if (sportID !== new_sport_id) {
                setSportID(new_sport_id)
            }
        })
        const homePageRef = useRef()
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

        const fetchAdditionalData=()=>{
            console.log("fetching live")
        }

        return (
            <div className={'flex-item'}>
                <div className="item4"><Header scrollPosition={scrollPosition}/>
                    <ToastContainer/></div>
                <div className="flex-container">
                    <div className="item1 live">
                        <div className={"mobile-live-remove"}>
                            <LiveSideBar/>
                        </div>
                    </div>
                    <div className="item2">
                        <div className="gz home match-overflow ">
                            <div className="homepage mobile-full-height" ref={homePageRef}
                                 style={width < 991 ? {height: `${height}px`, overflowY: 'auto'} : {}}>
                                <CarouselLoader/>
                                <div className={`${width <= 991 ? "d-block" : "d-none"}`}>
                                    <LiveSideBar/>
                                </div>
                                {console.log("live_matches", matches)}
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
