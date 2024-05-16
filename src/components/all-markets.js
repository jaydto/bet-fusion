import React, {useCallback, useEffect, useState} from 'react';
import './test.css'
import {useParams} from "react-router-dom";
import {getBetslip} from "./utils/betslip";

import {MarketList} from "./matches";

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
import SkeletonLoaderMore from "./pages/skeletonLoadersWeb/SkeletonLoaderMore";

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
        const [market_groups, setMarketGroups]=useState(getFromLocalStorage("market_groups"))
        const [matches, setMatches]=useState()
        useEffect(()=>{
            const cache=getFromLocalStorage("market_groups")
            setMarketGroups(mkGroup||cache)
        },[mkGroup])
        useEffect(()=>{
            setMatches(moreMatches)
        },[moreMatches])

       
        const clean = (str) => {
            return str.replace(/\s/g, "");
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
        const pathname = window.location.pathname

        const fetchPagedData = async () => {
            if (!isNaN(id)) {
                // let betslip = findPostableSlip();
                let endpoint = pathname.includes('live')
                    ? "/v2/matches/live?id=" + id
                    : "/v2/matches?id=" + id;
                setInitialData()
                if(live){
                    dispatchRedux(matchesMoreLiveMarkets({endpoint,method:"POST",data:[]}))
                    dispatchRedux(startFetchingMoreMatches({endpoint,method:"POST",data:[], interval:5000, more_live:true}));

                }else{
                    dispatchRedux(matchesMorePrematchMarkets({endpoint,method:"POST",data:[]}))
                    dispatchRedux(startFetchingMoreMatches({endpoint,method:"POST",data:[], interval:20000, more_prematch:true}));

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
        useEffect(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, []);
        return (
          <>
              {!fetching&&matches? <MarketList
                      allMarkets={allMarkets}
                      live={pathname.includes('live')}
                      matchwithmarkets={matches}
                      pdown={producer_down}
                      groups={market_groups}
                  />:
                  <div>
                      <SkeletonLoaderMore/>
                  </div>
              }</>

        );
    });

export default React.memo(AllMarkets);
