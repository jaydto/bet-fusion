import React, {useCallback, useContext, useEffect, useLayoutEffect, useState} from 'react';
import './test.css'
import {useParams} from "react-router-dom";
import {Context} from "../context/store";
import {getBetslip} from "./utils/betslip";
import useInterval from "../hooks/set-interval.hook";
import makeRequest from "./utils/fetch-request";

import {MarketList} from "./matches";
import LiveSideBar from "./sidebar/live-sidebar";

const Header = React.lazy(() => import('./header/header'));
const Footer = React.lazy(() => import('./footer/footer'));
const Right = React.lazy(() => import('./right'));
const SideBar = React.lazy(() => import('./sidebar/awesome/Sidebar'))
const AllMarkets = React.memo(
    (props) => {
        const [producerDown, setProducerDown] = useState(false);
        const [allMarkets, setAllMarkets] = useState(true)
        const params = useParams()
        let url = new URL(window.location);
        const {live} = props
        const id = params.id

        // const [userSlipsValidation, setUserSlipsValidation] = useState();
        const [state, dispatch] = useContext(Context);

        const [isLoading, setIsLoading] = useState(false);

        const findPostableSlip = () => {
            let betslips = getBetslip() || {};
            var values = Object.keys(betslips).map(function (key) {
                return betslips[key];
            });
            return values;
        };

        useInterval(
            () => {
                let endpoint = live
                    ? "/v1/matches/live?id=" + id
                    : "/v1/matches?id=" + id;

                let betslip = findPostableSlip();
                let method = betslip ? "POST" : "GET";

                makeRequest({url: endpoint, method: method, data: betslip}).then(
                    ([_status, response]) => {
                        dispatch({type: "SET", key: "all_markets", payload: response?.data || response});
                        // setMatchWithMarkets(response?.data || response);
                        if (response?.slip_data) {
                            dispatch({type: "SET", key: "user_slip_validation", payload: response?.slip_data});
                            // setUserSlipsValidation(response?.slip_data);
                        }
                        setProducerDown(response?.producer_status === 1);
                    }
                );
            },
            live ? 5000 : null
        );

        const fetchPagedData = useCallback(async () => {
            if (!isLoading && !isNaN(+id)) {
                setIsLoading(true);
                let betslip = findPostableSlip();
                let endpoint = live
                    ? "/v1/matches/live?id=" + id
                    : "/v1/matches?id=" + id;

                await makeRequest({url: endpoint, method: "POST", data: betslip}).then(
                    ([status, result]) => {
                        dispatch({type: "SET", key: "all_markets", payload: result?.data || result});
                        // setMatchWithMarkets(result?.data || result);
                        setProducerDown(result?.producer_status === 1);
                        setIsLoading(false);
                    }
                );
            }
        }, []);

        useLayoutEffect(() => {
            const abortController = new AbortController();
            fetchPagedData();
            return () => {
                abortController.abort();
            };
        }, []);
        const urlPath = window.location.pathname
        const showDownload = (!urlPath.includes("nare-games") && !urlPath.includes("gameplay") && !urlPath.includes("smart-play") && !urlPath.includes("betslip-slip") && !urlPath.includes("nare-league") && !urlPath.includes("bet-history") && !urlPath.includes("standings") && !urlPath.includes("results") && !urlPath.includes("casino") && !urlPath.includes("jackpot") && !urlPath.includes("smart-soft") && !urlPath.includes("virtuals") && !urlPath.includes("match") && !urlPath.includes("competition"))
        return (
            <div className={'flex-item'}>
                <div className="item4"><Header/></div>
                <div className={`flex-container ${!showDownload && 'top-spacing-page-no-download'}`}>
                    <div className="item1">
                        {window.location.pathname.includes('/match/live') ? <LiveSideBar/> :
                            <SideBar loadCompetitions/>}
                    </div>
                    <div className="item2 size-all-markets">
                        <div className="gz home" style={{width: "100%", marginBottom: "5rem"}}>

                            <div className="homepage mobile-full-height">

                                <MarketList
                                    allMarkets={allMarkets}
                                    live={live}
                                    matchwithmarkets={state?.all_markets}
                                    pdown={producerDown}
                                    groups={state?.market_groups}
                                />

                            </div>
                        </div>
                    </div>
                    <div className="item3">
                        <Right betslipValidationData={state?.user_slip_validation} test={true}/>
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
