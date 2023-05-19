import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import './test.css'
import {getFromLocalStorage, setLocalStorage} from "./utils/local-storage";
import useAnalyticsEventTracker from "./analytics/useAnalyticsEventTracker";
import {useLocation, useParams} from "react-router-dom";
import useWindowDimensions from "./header/Dimensions";
import {Context} from "../context/store";
import {getBetslip} from "./utils/betslip";
import useInterval from "../hooks/set-interval.hook";
import makeRequest from "./utils/fetch-request";
import Testimonials from "./carousel/Testimonials";
import LiveSideBar from "./sidebar/live-sidebar";

const Header = React.lazy(() => import('./header/header'));
const Footer = React.lazy(() => import('./footer/footer'));
const CarouselLoader = React.lazy(() => import('./carousel'));
const MainTabs = React.lazy(() => import('./header/main-tabs'));
const MatchList = React.lazy(() => import('./matches'));
const Right = React.lazy(() => import('./right'));
const SideBar = React.lazy(() => import('./sidebar/awesome/Sidebar'))
const  Live= () => {
    const [matches, setMatches] = useState();
    const [state, dispatch] = useContext(Context);
    const {height, width} = useWindowDimensions();
    const {spid} = useParams();

    const [producerDown, setProducerDown] = useState(false);
    const location = useLocation();
    const [userSlipsValidation, setUserSlipsValidation] = useState();

    const findPostableSlip = () => {
        let betslips = getBetslip() || {};
        var values = Object.keys(betslips).map(function (key) {
            return betslips[key];
        });
        return values;
    };

    useInterval(async () => {
        let endpoint = "/v1/matches/live";
        if (spid) {
            endpoint += "?spid=" + spid;
        }
        let betslip = findPostableSlip();
        let method = betslip ? "POST" : "GET";
        await makeRequest({url: endpoint, method: method, data: betslip}).then(([status, result]) => {
            if (status == 200) {
                setMatches(result?.data || result)
                if (result?.slip_data) {
                    setUserSlipsValidation(result?.slip_data)
                }
                setProducerDown(result?.producer_status === 1);
            }
        });
    }, 2000);

    const fetchData = useCallback(async () => {
        let endpoint = "/v1/matches/live";
        if (spid) {
            endpoint += "?spid=" + spid;
        }
        let betslip = findPostableSlip();
        let method = betslip ? "POST" : "GET";
        const [match_result] = await Promise.all([
            makeRequest({url: endpoint, method: method, data: betslip})
        ]);
        let [m_status, m_result] = match_result;
        if (m_status == 200) {
            setMatches(m_result?.data || m_result)
            if (m_result?.slip_data) {
                setUserSlipsValidation(m_result?.slip_data);
            }
            setProducerDown(m_result?.producer_status === 1);
        }

    }, []);


    useEffect(() => {
        const abort=new AbortController()

        fetchData();
        let cachedSlips = getBetslip("betslip");
        if (cachedSlips) {
            dispatch({type: "SET", key: "betslip", payload: cachedSlips});
        }
        setMatches(null)
        return () => {
            abort.abort()
        };
    }, []);


    return (
        <div className={'flex-item'}>
            <div className="item4"><Header/></div>
            <div className="flex-container">
                <div className="item1">
                    <div className={"mobile-remove"}>
                        <LiveSideBar/>
                    </div>
                </div>
                <div className="item2">
                    <div className="gz home match-overflow" >
                        <div className="homepage">
                            <CarouselLoader/>
                            <Testimonials/>
                            <div className={`${width<=767?"d-block":"d-none"}`}>
                                <LiveSideBar/>
                            </div>

                            {/*hello*/}
                            {matches && <MatchList live matches={matches} pdown={producerDown}/>}
                        </div>
                    </div>
                </div>
                <div className="item3">
                    <Right betslipValidationData={userSlipsValidation} jackpotData={matches?.meta} test={true}/>
                </div>

            </div>
            <div className="item6"><div className={"footer-mobile-none"}>
                <Footer/>
            </div></div>
        </div>

    );
};

export default Live;
