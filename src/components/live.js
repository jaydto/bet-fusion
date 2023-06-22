import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import './test.css'
import {useParams} from "react-router-dom";
import useWindowDimensions from "./header/Dimensions";
import {Context} from "../context/store";
import {getBetslip} from "./utils/betslip";
import useInterval from "../hooks/set-interval.hook";
import makeRequest from "./utils/fetch-request";
import Testimonials from "./carousel/Testimonials";
import LiveSideBar from "./sidebar/live-sidebar";
import {Spinner} from "react-bootstrap";

const Header = React.lazy(() => import('./header/header'));
const Footer = React.lazy(() => import('./footer/footer'));
const CarouselLoader = React.lazy(() => import('./carousel'));
const MatchList = React.lazy(() => import('./matches'));
const Right = React.lazy(() => import('./right'));

const  Live= React.memo(
    () => {
    const [matches, setMatches] = useState();
    const [state, dispatch] = useContext(Context);
    const {height, width} = useWindowDimensions();
    const {spid} = useParams();
    const [sportID, setSportID] = useState(79)

    const [producerDown, setProducerDown] = useState(false);
    const [userSlipsValidation, setUserSlipsValidation] = useState();
    const [loading, setLoading] = useState(false)
    const findPostableSlip = () => {
        let betslips = getBetslip() || {};
        var values = Object.keys(betslips).map(function (key) {
            return betslips[key];
        });
        return values;
    };

    const ResetInterval=useInterval(async () => {
        let endpoint = "/v1/matches/live";
        if (spid) {
            endpoint += "?spid=" + spid;
        }
        let betslip = findPostableSlip();
        let method = betslip ? "POST" : "GET";
        await makeRequest({url: endpoint, method: method, data: betslip}).then(([status, result]) => {
            if (status == 200) {
                setMatches(result?.data || result)
                setLoading(false)
                if (result?.slip_data) {
                    setUserSlipsValidation(result?.slip_data)
                }
                setProducerDown(result?.producer_status === 1);
            }
        });
    }, 5000);

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
            setLoading(false)
            if (m_result?.slip_data) {
                setUserSlipsValidation(m_result?.slip_data);
            }
            setProducerDown(m_result?.producer_status === 1);
        }

    }, []);


    useEffect(() => {
        const abort=new AbortController()

        fetchData();
        clearInterval(ResetInterval)
        let cachedSlips = getBetslip("betslip");
        if (cachedSlips) {
            dispatch({type: "SET", key: "betslip", payload: cachedSlips});
        }
        setMatches(null)
        return () => {
            abort.abort()
        };
    }, []);

    useEffect(()=>{
        const new_sport_id = spid
        if (sportID !== new_sport_id) {
            setSportID(new_sport_id)
            setLoading(true)
            setMatches([])

        } else {

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

    return (
        <div className={'flex-item'}>
            <div className="item4"><Header scrollPosition={scrollPosition}/></div>
            <div className="flex-container">
                <div className="item1">
                    <div className={"mobile-remove"}>
                        <LiveSideBar/>
                    </div>
                </div>
                <div className="item2">
                    <div className="gz home match-overflow " >
                        <div className="homepage mobile-full-height" ref={homePageRef} style={width<991?{height: `${height}px`,overflowY:'auto'}:{}}>
                            <CarouselLoader/>
                            <Testimonials/>
                            <div className={`${width<=991?"d-block":"d-none"}`}>
                                <LiveSideBar/>
                            </div>
                            {loading ? <div className={`text-center mt-2 text-white d-block`}>
                                <Spinner animation={'grow'} size={'lg'}/>
                            </div>: matches && <MatchList live={1} matches={matches} pdown={producerDown}/>}
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
});

export default React.memo(Live);
