import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import {useParams} from 'react-router-dom';
import makeRequest from "./utils/fetch-request";
import {StoreContext} from "../context/store"
import useInterval from "../hooks/set-interval.hook";
import {getBetslip} from './utils/betslip';
import './test.css'
import useWindowDimensions from "./header/Dimensions";
import {ToastContainer} from "react-toastify";
import SkeletonLoaderMobile from "./pages/skeletonLoadersWeb/SkeletonLoaderMobile";
import MobileNav2 from "./mobile-navigation/MobileNav2";

const Header = React.lazy(() => import('./header/header'));
const Footer = React.lazy(() => import('./footer/footer'));
const SideBar = React.lazy(() => import('./sidebar/awesome/Sidebar'));
const CarouselLoader = React.lazy(() => import('./carousel/index'));
const MatchList = React.lazy(() => import('./matches/index'));
const Right = React.lazy(() => import('./right/index'));

const CompetitionMatches = React.memo(
    () => {
        const [page,] = useState(1);
        const [matches, setMatches] = useState(null);
        const {state, dispatch} = useContext(StoreContext);
        const matchSizeRef = useRef(0)
        const {competitionid} = useParams();
        const [producerDown, setProducerDown] = useState(false);
        const [userSlipsValidation, setUserSlipsValidation] = useState();
        const [fetching, setFetching] = useState(false)
        const [reset, setReset] = useState(0);
        const [shouldFetch, setShouldFetch] = useState(true);
        let sportValue = new URL(window.location).searchParams.get('sport_id')


        const findPostableSlip = () => {

            let betslips = getBetslip() || {};
            var values = Object.keys(betslips).map(function (key) {
                return betslips[key];
            });
            return values;
        };

        useInterval(async () => {
            if (!shouldFetch) {
                return;
            }
            let endpoint = "/v1/sports/competition?id=" + competitionid + "&page=" + (page || 1) + "&sport_id=79";
            let url = new URL(window.location.href)
            let sub_types = (url.searchParams.get('sub_type_id') || "1")


            endpoint += `&sub_type_id=` + (sub_types || "1")
            let betslip = findPostableSlip();
            let method = betslip ? "POST" : "GET";
            await makeRequest({url: endpoint, method: method, data: betslip}).then(([status, result]) => {
                if (status == 200) {
                    setMatches(result?.data || result)
                    setShouldFetch(result?.data.length > 0)
                    matchSizeRef.current=result?.data?.length
                    if (result?.slip_data) {
                        setUserSlipsValidation(result?.slip_data)
                    }
                    setProducerDown(result?.producer_status === 1);
                    setFetching(false)
                }
            });
        }, 20000,reset);

        const fetchPagedData = useCallback(() => {
            // console.log("called here")
            if (!fetching && shouldFetch) {
                setFetching(true);
                let betslip = findPostableSlip();
                let endpoint = "/v1/sports/competition?id=" + competitionid + "&page=" + (page || 1);
                let url = new URL(window.location.href)
                let sub_types = (url.searchParams.get('sub_type_id') || "1")


                endpoint += `&sub_type_id=` + (sub_types || "1")
                makeRequest({url: endpoint, method: "post", data: betslip}).then(([status, result]) => {
                    if(status===200){
                        setMatches(result?.data || result);
                        setShouldFetch(result?.data.length > 0)
                        matchSizeRef.current=result?.data?.length
                        if (result?.slip_data) {
                            setUserSlipsValidation(result?.slip_data)
                        }
                        setProducerDown(result?.producer_status === 1);
                        setFetching(false);
                    }

                });
            }
        }, [competitionid]);

        useEffect(() => {
            // console.log("called this")
            setReset(c => c + 1);
            fetchPagedData()

        }, [window.location.pathname, window.location.search]);


        useEffect(() => {
            fetchPagedData();
            let cachedSlips = getBetslip("betslip");
            if (cachedSlips) {
                dispatch({type: "SET", key: "betslip", payload: cachedSlips});
            }
            return () => {
                setMatches(null);
            };
        }, [fetchPagedData]);

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
                                    {(sportValue==='79'||sportValue===null)&&
                                        <MobileNav2/>}
                                    <CarouselLoader/>
                                    {fetching?
                                        <SkeletonLoaderMobile/>:
                                        matches && <MatchList
                                        live={false}
                                        matches={matches}
                                        pdown={producerDown}
                                    />}
                                </div>
                                <div className={`text-center mt-2 text-white ${fetching ? 'd-block' : 'd-none'}`}>
                                    <SkeletonLoaderMobile/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item3">
                        <Right betslipValidationData={userSlipsValidation} test={true}/>
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
