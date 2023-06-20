import React, {useCallback, useContext, useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import makeRequest from "./utils/fetch-request";
import {Context} from '../context/store';
import useInterval from "../hooks/set-interval.hook";
import {getBetslip} from './utils/betslip';
import {Spinner} from "react-bootstrap";
import Testimonials from "./carousel/Testimonials";
import './test.css'
import useWindowDimensions from "./header/Dimensions";

const Header = React.lazy(() => import('./header/header'));
const Footer = React.lazy(() => import('./footer/footer'));
const SideBar = React.lazy(() => import('./sidebar/awesome/Sidebar'));
const CarouselLoader = React.lazy(() => import('./carousel/index'));
const MainTabs = React.lazy(() => import('./header/main-tabs'));
const SearchBar = React.lazy(() => import('./header/search-bar'));
const MatchList = React.lazy(() => import('./matches/index'));
const Right = React.lazy(() => import('./right/index'));

const   CompetitionMatches= React.memo(
    () => {
    const [page, setPage] = useState(1);
    const [matches, setMatches] = useState(null);
    const [state, dispatch] = useContext(Context);
    const {sportid, categoryid, competitionid} = useParams();
    const [producerDown, setProducerDown] = useState(false);
    const [userSlipsValidation, setUserSlipsValidation] = useState();
    const [fetching, setFetching] = useState(false)
    const [limit, setLimit] = useState(50);
    const [shouldFetch, setShouldFetch] = useState(true);
    const {height, width} = useWindowDimensions();


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
        let sub_types = (url.searchParams.get('sub_type_id') || "1,18,29").split(",")

        if (width <= 1259) {
            sub_types = [sub_types[0]]
        }

        endpoint += `&sub_type_id=` + (sub_types || "1,18,29")
        let betslip = findPostableSlip();
        let method = betslip ? "POST" : "GET";
        await makeRequest({url: endpoint, method: method, data: betslip}).then(([status, result]) => {
            if (status == 200) {
                setMatches(result?.data || result)
                setShouldFetch(result?.data.length > 0)
                if (result?.slip_data) {
                    setUserSlipsValidation(result?.slip_data)
                }
                setProducerDown(result?.producer_status === 1);
                setFetching(false)
            }
        });
    }, 20000);

    const fetchPagedData = useCallback(() => {
        if (!fetching && shouldFetch) {
            setFetching(true);
            let betslip = findPostableSlip();
            let endpoint = "/v1/sports/competition?id=" + competitionid + "&page=" + (page || 1);
            let url = new URL(window.location.href)
            let sub_types = (url.searchParams.get('sub_type_id') || "1,18,29").split(",")

            if (width <= 1259) {
                sub_types = [sub_types[0]]
            }

            endpoint += `&sub_type_id=` + (sub_types || "1,18,29")
            makeRequest({url: endpoint, method: "post", data: betslip}).then(([status, result]) => {
                setMatches(result?.data || result);
                setShouldFetch(result?.data.length > 0)
                if (result?.slip_data) {
                    setUserSlipsValidation(result?.slip_data)
                }
                setProducerDown(result?.producer_status === 1);
                setFetching(false);
            });
        }
    }, []);


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

    document.addEventListener('scrollEnd', (event) => {
        if (!fetching) {
            setFetching(true)
            setLimit(limit + 50)
        }
    })

    const urlPath=window.location.pathname
    const showDownload=(!urlPath.includes("nare-games")&&!urlPath.includes("gameplay")&&!urlPath.includes("smart-play")&&!urlPath.includes("betslip-slip")&&!urlPath.includes("nare-league")&&!urlPath.includes("bet-history")&&!urlPath.includes("standings")&&!urlPath.includes("results")&&!urlPath.includes("casino")&&!urlPath.includes("jackpot")&&!urlPath.includes("smart-soft")&&!urlPath.includes("virtuals")&&!urlPath.includes("match")&&!urlPath.includes("competition"))



    return (
        <div className={'flex-item'}>
            <div className="item4"><Header/></div>
            <div className={`flex-container ${!showDownload&&'top-spacing-page-no-download'}`}>
                <div className="item1"> <SideBar loadCompetitions/></div>
                <div className="item2"><div className="gz home match-overflow " >
                    <div className="gz home match-overflow" >
                        <div className="homepage mobile-full-height">
                            <CarouselLoader/>
                            <Testimonials/>
                            {matches && <MatchList
                                live={false}
                                matches={matches}
                                pdown={producerDown}
                            />}
                        </div>
                        <div className={`text-center mt-2 text-white ${fetching ? 'd-block' : 'd-none'}`}>
                            <Spinner animation={'grow'} size={'lg'}/>
                        </div>
                    </div>
                </div></div>
                <div className="item3">
                    <Right betslipValidationData={userSlipsValidation} test={true}/>
                </div>


            </div>
            <div className="item6"><div className={"footer-mobile-none"}>
                <Footer/>
            </div></div>
        </div>

    );
});

export default React.memo(CompetitionMatches);
