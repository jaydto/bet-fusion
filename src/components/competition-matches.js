import React, { useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {getBetslip} from './utils/betslip';
import './test.css'
import {ToastContainer} from "react-toastify";
import SkeletonLoaderMobile from "./pages/skeletonLoadersWeb/SkeletonLoaderMobile";
import MainTabs from "./header/main-tabs";
import MatchList, {MatchHeaderRow} from "./matches/index";
import {useDispatch, useSelector} from "react-redux";
import {
    matchesCompetition,
    setFetching,
    startFetchingMatches,
    stopFetchingMatches
} from "../redux/matchesSlice";

const Header = React.lazy(() => import('./header/header'));
const Footer = React.lazy(() => import('./footer/footer'));
const SideBar = React.lazy(() => import('./sidebar/awesome/Sidebar'));
const CarouselLoader = React.lazy(() => import('./carousel/index'));
const Right = React.lazy(() => import('./right/index'));

const CompetitionMatches = React.memo(
    () => {
        const [page,] = useState(1);
        const {competitionid} = useParams();

        const dispatchRedux=useDispatch()
        const producer_down=useSelector((state)=>state.matchesData.producer_down)
        const user_slip_validation=useSelector((state)=>state.matchesData.user_slip_validation)
        const fetching=useSelector((state)=>state.matchesData.fetching)
        const competitonMatches=useSelector((state)=>state.matchesData.matches)
        const [matches, setMatches]=useState()
        useEffect(()=>{
            setMatches(competitonMatches)
        },[competitonMatches])

        const fetchAdditionalData=()=>{
            console.log("fetching live")
        }


        const findPostableSlip = () => {

            let betslips = getBetslip() || {};
            var values = Object.keys(betslips).map(function (key) {
                return betslips[key];
            });
            return values;
        };


        const fetchPagedData = () => {
            // console.log("called here")

                let betslip = findPostableSlip();
                let endpoint = "/v1/sports/competition?id=" + competitionid + "&page=" + (page || 1);
                let url = new URL(window.location.href)
                let sub_types = (url.searchParams.get('sub_type_id') || "1")


                endpoint += `&sub_type_id=` + (sub_types || "1")
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
                        <div className="gz home match-overflow ">
                            <div className="gz home match-overflow">
                                <div className="homepage mobile-full-height">
                                    <div
                                        className={'filters-navigation gap-3 d-flex justify-content-between align-items-center'}>
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

export default React.memo(CompetitionMatches);
