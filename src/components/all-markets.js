import React, {useCallback, useEffect, useState} from 'react';
import './test.css'
import {useParams} from "react-router-dom";
import {getBetslip} from "./utils/betslip";


import {MarketList} from "./matches";
import LiveSideBar from "./sidebar/live-sidebar";
import {ToastContainer} from "react-toastify";
import Skeleton1 from "./skeleton/skeleton";
import {
    favoriteMarkets,
    matchesMoreLiveMarkets,
    matchesMorePrematchMarkets,
    setFetching,
    setInitialLoadingState,
    startFetchingMoreMatches,
    stopFetchingMoreMatches
} from "../redux/matchesSlice";
import {useDispatch, useSelector} from "react-redux";
import {setMatchBetslip, setSelected} from "../redux/bettingSlice";
import {getFromLocalStorage} from "./utils/local-storage";

const Header = React.lazy(() => import('./header/header'));
const Footer = React.lazy(() => import('./footer/footer'));
const Right = React.lazy(() => import('./right'));
const SideBar = React.lazy(() => import('./sidebar/awesome/Sidebar'))
const AllMarkets = React.memo(
    (props) => {
        const [allMarkets, ] = useState(true)
        const params = useParams()
        const dispatchRedux=useDispatch()
        const {live} = props
        const id = params.id
        // const [userSlipsValidation, setUserSlipsValidation] = useState();
        const mkGroup=useSelector((state)=>state.matchesData.market_groups)
        const fetching=useSelector((state)=>state.matchesData.live_fetching)
        const moreMatches=useSelector((state)=>state.matchesData.more_matches)
        const producer_down=useSelector((state)=>state.matchesData.producer_down)
        const user_slip_validation=useSelector((state)=>state.matchesData.user_slip_validation)
        const [market_groups, setMarketGroups]=useState(getFromLocalStorage("market_groups"))
        const [matches, setMatches]=useState()
        useEffect(()=>{
            const cache=getFromLocalStorage("market_groups")
            setMarketGroups(mkGroup||cache)
        },[mkGroup])
        useEffect(()=>{
            setMatches(moreMatches)
        },[moreMatches])

        const findPostableSlip = () => {
            let betslips = getBetslip() || {};
            return Object.keys(betslips).map(function (key) {
                return betslips[key];
            });
        };
        const clean = (_str) => {
            _str = _str.replace(/[^A-Za-z0-9\-]/g, '');
            return _str.replace(/-+/g, '-');
        }

        const setInitialData=()=>{
            const betslip = getBetslip()
            const betslip_data = {
                betslip_type: 'betslip',
                data: betslip
            }
            Object.entries(betslip || {}).map(([matchId, match]) => {
                let uc = clean(
                    match.match_id +
                    "" +
                    match.sub_type_id +
                    (match?.bet_pick || "draw")
                );
                const reference = matchId + "_selected";
                dispatchRedux(setSelected(reference, uc));
            });

            dispatchRedux(setMatchBetslip(betslip_data))
        }


        const fetchPagedData = async () => {
            if (!isNaN(id)) {
                let betslip = findPostableSlip();
                let endpoint = live
                    ? "/v2/matches/live?id=" + id
                    : "/v2/matches?id=" + id;
                setInitialData()
                if(live){
                    dispatchRedux(matchesMoreLiveMarkets({endpoint,method:"POST",data:betslip}))
                    dispatchRedux(startFetchingMoreMatches({endpoint,method:"POST",data:betslip, interval:5000, more_live:true}));

                }else{
                    dispatchRedux(matchesMorePrematchMarkets({endpoint,method:"POST",data:betslip}))
                    dispatchRedux(startFetchingMoreMatches({endpoint,method:"POST",data:betslip, interval:20000, more_prematch:true}));

                }

            }
        };

        const getFavoriteMarkets = useCallback(async () => {
            dispatchRedux(favoriteMarkets())
        }, []);

        useEffect(() => {
            const abortController = new AbortController();
            dispatchRedux(stopFetchingMoreMatches())
            const data={
                param_fetch_type:"more_markets",
                match:id
            }
            dispatchRedux(setInitialLoadingState(data))
            dispatchRedux(setFetching("fetching",true))

            fetchPagedData();
            getFavoriteMarkets()


            return () => {
                dispatchRedux(stopFetchingMoreMatches())
                abortController.abort();
            };
        }, []);
        const urlPath = window.location.pathname
        const showDownload = (!urlPath.includes("nare-games") && !urlPath.includes("gameplay") && !urlPath.includes("smart-play") && !urlPath.includes("betslip-slip") && !urlPath.includes("nare-league") && !urlPath.includes("bet-history") && !urlPath.includes("standings") && !urlPath.includes("results") && !urlPath.includes("casino") && !urlPath.includes("jackpot") && !urlPath.includes("smart-soft") && !urlPath.includes("virtuals") && !urlPath.includes("match") && !urlPath.includes("competition"))
        return (
            <div className={'flex-item'}>
                <div className="item4"><Header/>
                <ToastContainer/>
                </div>
                <div className={`flex-container ${!showDownload && 'top-spacing-page-no-download'}`}>
                    <div className="item1">
                        {window.location.pathname.includes('/match/live') ? <LiveSideBar/> :
                            <SideBar loadCompetitions/>}
                    </div>
                    <div className="item2 size-all-markets">
                        <div className="gz home" style={{width: "100%", marginBottom: "5rem"}}>

                            <div className="homepage mobile-full-height all-markets">

                                {!fetching&&matches? <MarketList
                                    allMarkets={allMarkets}
                                    live={live}
                                    matchwithmarkets={matches}
                                    pdown={producer_down}
                                    groups={market_groups}
                                />:
                                    <div>
                                        <Skeleton1/>
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                    <div className="item3">
                        <Right betslipValidationData={user_slip_validation} test={true}/>
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

export default React.memo(AllMarkets);
