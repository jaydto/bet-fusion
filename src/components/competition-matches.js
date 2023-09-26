import React, { useEffect, useRef, useState} from "react";
import { useParams} from 'react-router-dom';
import {getBetslip} from './utils/betslip';
import './test.css'
import "../assets/css/bottomSheet.css"
import SkeletonLoaderMobile from "./pages/skeletonLoadersWeb/SkeletonLoaderMobile";
import MatchList, {marketChoiceOptions, MatchHeaderRow} from "./matches/index";
import {useDispatch, useSelector} from "react-redux";
import {
    matchesCompetition,
    setFetching, setInitialLoadingState,
    startFetchingMatches,
    stopFetchingMatches
} from "../redux/matchesSlice";
import {getFromLocalStorage} from "./utils/local-storage";
import {setState} from "../redux/dataSlice";


const CarouselLoader = React.lazy(() => import('./carousel/index'));

const CompetitionMatches = React.memo(
    (props) => {
        const { tab}=props
        const [page,] = useState(1);
        const {competitionid} = useParams();
        const dispatchRedux = useDispatch()
        const producer_down = useSelector((state) => state.matchesData.producer_down)
        const fetching = useSelector((state) => state.matchesData.fetching)
        const competitonMatches = useSelector((state) => state.matchesData.matches)
        const competitionPageRef = useRef()

        const markets = marketChoiceOptions();
        let url = new URL(window.location.href)
        let sportId = new URLSearchParams(window.location.search).get('sport_id') || '79'

        const [matches, setMatches] = useState()
        useEffect(() => {
            setMatches(competitonMatches)
        }, [competitonMatches])


        const fetchAdditionalData = () => {
            return
        }

        const findPostableSlip = () => {

            let betslips = getBetslip() || {};
            var values = Object.keys(betslips).map(function (key) {
                return betslips[key];
            });
            return values;
        };
        let c_pathname = url.pathname;

        let parts = c_pathname.split("/competition/");
        let competitionpath
        let competition_filter;
// If there are parts after "/competition/", reconstruct the modified URL
        if (parts.length > 1) {
            competitionpath = "/competition/" + parts[1];
            competition_filter = parts[0]


        }

        const fetchPagedData = () => {
            // console.log("called here")

            let betslip = findPostableSlip();
            let endpoint = "/v1/sports/competition?id=" + competitionid + "&page=" + (page || 1);
            let url = new URL(window.location.href)
            let sub_types = (url.searchParams.get('sub_type_id') || "1")
            let tab_info = competition_filter === '/upcoming-competition' ? 'upcoming' : competition_filter === '/tomorrow-competition' ? 'tomorrow' : competition_filter === '/highlights-competition' ? 'highlights' : 'highlights'

            endpoint += `&sub_type_id=` + (sub_types || "1")
            endpoint += "&tab=" + (tab_info)
            let sport_id = url.searchParams.get('sport_id')
            let market_name = (url.searchParams.get('market_name') || "1x2")
            let search = (url.searchParams.get('search') || false)
            const categories = getFromLocalStorage('sport_categories')
            let sport = categories?.all_sports?.filter((category) => Number(category.sport_id) === Number(sport_id))
            const sport_type = sport != null ? sport?.[0]?.sport_name || 'Soccer' : "";


            dispatchRedux(matchesCompetition({
                endpoint,
                method: "POST",
                data: betslip,
                search: search,
                active_sport: sport_type,
                active_sub_type: market_name
            })); // Dispatch matchesCompetition with the updated fetchParams

            // Clear the interval when fetchParams change
            dispatchRedux(startFetchingMatches({
                endpoint,
                method: "POST",
                data: betslip,
                interval: 20000,
                competition: true,
                search: search,
                active_sport: sport_type,
                active_sub_type: market_name
            }));


        };

        useEffect(() => {
            // console.log("called this")
            dispatchRedux(stopFetchingMatches())
            fetchPagedData()
            dispatchRedux(setFetching("fetching", true))


        }, [window.location.pathname, window.location.search]);

        useEffect(()=>{
            const data = {
                param_fetch_type: "tabs",
                tab: tab
            }
            dispatchRedux(setInitialLoadingState(data))
        }, [tab])

        let sport_league = Number(new URL(window.location).searchParams.get("competition_league"))

        useEffect(() => {
            const data = {
                param_fetch_type: "competition_league",
                competition_league: sport_league
            }
            dispatchRedux(setInitialLoadingState(data))
        }, [sport_league]);



        return (
                <>
                    {matches &&
                        <MatchHeaderRow live={false} first_match={matches ? matches[0] : {}}
                                                loading={fetching}/>}
                    {fetching ?
                    <SkeletonLoaderMobile/> :
                    matches && <MatchList
                        live={false}
                        matches={matches}
                        pdown={producer_down}
                        onEndReached={fetchAdditionalData}
                    />}
                    <div className={`text-center mt-2 text-white ${fetching ? 'd-block' : 'd-none'}`}>
                        <SkeletonLoaderMobile/>
                    </div>
                </>

        );
    });

export default React.memo(CompetitionMatches);
