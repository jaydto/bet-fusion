import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import './test.css'
import {setLocalStorage} from "./utils/local-storage";
import useAnalyticsEventTracker from "./analytics/useAnalyticsEventTracker";
import {useLocation} from "react-router-dom";
import useWindowDimensions from "./header/Dimensions";
import {Context} from "../context/store";
import {getBetslip} from "./utils/betslip";
import useInterval from "../hooks/set-interval.hook";
import makeRequest from "./utils/fetch-request";
import MobileNav2 from "./mobile-navigation/MobileNav2";
import Testimonials from "./carousel/Testimonials";
import Countries from "./countries/Countries";
import Skeleton1 from "./skeleton/skeleton";
import {Spinner} from "react-bootstrap";

const Header = React.lazy(() => import('./header/header'));
const Footer = React.lazy(() => import('./footer/footer'));
const CarouselLoader = React.lazy(() => import('./carousel'));
const MainTabs = React.lazy(() => import('./header/main-tabs'));
const MatchList = React.lazy(() => import('./matches'));
const Right = React.lazy(() => import('./right'));
const SideBar = React.lazy(() => import('./sidebar/awesome/Sidebar'))
const Index = () => {
    const [scrollEndedActive, setScrollEndedActive] = useState(false)
    const gaEventTracker = useAnalyticsEventTracker('Home');
    const location = useLocation();
    const [tab, setTab] = useState('highlights');
    const [sportID, setSportID] = useState(79);
    const [loading, setLoading] = useState(false);

    const {height, width} = useWindowDimensions();
    const [matches, setMatches] = useState([]);
    const [limit, setLimit] = useState(20);
    const [producerDown, setProducerDown] = useState(false);
    const [threeWay, setThreeWay] = useState(false);
    const [page,] = useState(1);
    const [userSlipsValidation, setUserSlipsValidation] = useState();
    const [state, dispatch] = useContext(Context);
    const [fetching, setFetching] = useState(false)
    const homePageRef = useRef()
    const [utmSource,] = useState('')
    const prevLimit = useRef(limit);
    const [reset, setReset] = useState(0);
    const findPostableSlip = () => {
        let betslips = getBetslip() || {};
        var values = Object.keys(betslips).map(function (key) {
            return betslips[key];
        });
        return values;
    };


     useInterval(() => {

        let endpoint = "/v1/matches";

        let betslip = findPostableSlip();

        let method = betslip ? "POST" : "GET";

        let tab = location.pathname.replace("/", "") || 'highlights';

        endpoint += "?page=" + (page || 1) + `&limit=${prevLimit.current }&tab=` + tab

        let url = new URL(window.location.href)

        let sport_id = url.searchParams.get('sport_id')

        if (sport_id !== null) {
            endpoint += " &sport_id=" + sport_id
        }
        let sub_types = (url.searchParams.get('sub_type_id') || "1,18,29").split(",")
        if (width <= 1259) {
            sub_types = [sub_types[0]]
        }

        endpoint = endpoint.replaceAll(" ", '')
        endpoint += `&sub_type_id=` + (sub_types || "1,18,29")

        let search_term = url.searchParams.get('search')

        if (search_term !== null) {
            return
        }
        makeRequest({url: endpoint, method: method, data: betslip}).then(([status, result]) => {
            if (status == 200) {
                setMatches(matches.length > 0 ? {...matches, ...result?.data} : result?.data || result)
                setFetching(false)
                setLoading(false)
                if (result?.slip_data) {
                    setUserSlipsValidation(result?.slip_data)
                }
                setProducerDown(result?.producer_status === 1);
            }
        });
    }, 20000,reset);

    const fetchData = useCallback(async () => {
        // setFetching(true)
        setScrollEndedActive(true) // todo; additional checks
        let tab = location.pathname.replace("/", "") || 'highlights';
        let betslip = findPostableSlip();

        let endpoint = "/v1/matches?page=" + (page || 1) + `&limit=${prevLimit.current }&tab=` + tab;
        let url = new URL(window.location.href)
        let sport_id = url.searchParams.get('sport_id')

        if (sport_id !== null) {
            endpoint += " &sport_id=" + sport_id
        }

        endpoint = endpoint.replaceAll(" ", '')


        let search_term = url.searchParams.get('search')
        if (search_term !== null) {
            endpoint += ' &search=' + search_term
        }
        //splitting before api call
        let sub_types = (url.searchParams.get('sub_type_id') || "1,18,29").split(",")

        if (width <= 1259) {
            sub_types = [sub_types[0]]
        }

        endpoint += `&sub_type_id=` + (sub_types || "1,18,29")


        await makeRequest({url: endpoint, method: "POST", data: betslip}).then(([status, result]) => {
            if (status == 200) {
                setMatches(matches.length > 0 ? {...matches, ...result?.data} : result?.data || result)
                setFetching(false)
                setLoading(false)
                setScrollEndedActive(false)
                if (result?.slip_data) {
                    setUserSlipsValidation(result?.slip_data)
                }
                setProducerDown(result?.producer_status === 1);
            }
        });

    }, []);

    const checkThreeWay = () => {
        let url = new URL(window.location)
        let sub_types = (url.searchParams.get('sub_type_id') || "1,18,29").split(",")
        setThreeWay(sub_types.includes("1"))
    }

    const configureCampaignCookie = () => {

        let url = new URL(window.location)

        let utm_source = url.searchParams.get('utm_source')

        let utm_campaign = url.searchParams.get('utm_campaign')

        if (utm_source !== null) {
            setLocalStorage('utm_source', utm_source)
        }

        if (utm_campaign !== null) {
            setLocalStorage('utm_campaign', utm_campaign)
        }
    }

    useEffect(() => {
        configureCampaignCookie()
    }, [utmSource])

    useEffect(() => {
        let new_tab = ""
        const new_sport_id = Number(new URL(window.location).searchParams.get("sport_id"))

        if (window.location.href.includes("highlights")) {
            new_tab = ("highlights")
        }

        if (window.location.href.includes("upcoming")) {
            new_tab = ("upcoming")

        }
        if (window.location.href.includes("tomorrow")) {
            new_tab = ('tomorrow')
        }
        if (window.location.href.includes("countries")) {
            new_tab = ('countries')
        }


        if (new_tab !== tab) {
            setTab(new_tab)
            setLoading(true)
        }


        if (sportID !== new_sport_id) {

            setSportID(new_sport_id)
            setLoading(true)
            setMatches([])

        } else {

        }

    })


    useEffect(() => {
        setReset(c => c + 1);
        fetchData();

        checkThreeWay()
        let cachedSlips = getBetslip("betslip");
        if (cachedSlips) {
            dispatch({type: "SET", key: "betslip", payload: cachedSlips});
        }
        return () => {
            setMatches(null);
        };
    }, [window.location.pathname,window.location.search]);


    useEffect(()=>{

        if(prevLimit.current!==limit&&limit>prevLimit.current){
            setReset(c => c + 1);

            prevLimit.current=limit

        }

    },[limit])

    useEffect(()=>{

        if(prevLimit.current!==20){
            fetchData()
        }

    },[prevLimit.current])

    document.addEventListener('scrollEnd', (event) => {
        if (!fetching) {
            setFetching(true)
            setLimit(limit + 20)
        }
    })



    return (
        <div className={'flex-item'}  >
            <div className="item4"><Header/></div>
            <div className="flex-container" >
                <div className="item1"><SideBar loadCompetitions/></div>
                <div className="item2">
                    <div className="gz home match-overflow " >
                        <div className="homepage" ref={homePageRef}>
                            <MobileNav2/>
                            <CarouselLoader/>
                            <Testimonials/>

                            <MainTabs tab={location.pathname.replace("/", "")}/>

                            {loading ?
                                <div className={`text-center mt-2 text-white d-block`}>
                                    <Skeleton1/>
                                </div> : tab == 'countries' ? <Countries/> :
                                    <div >
                                        <MatchList
                                            live={false}
                                            fetching={fetching}
                                            matches={matches}
                                            pdown={producerDown}
                                            three_way={threeWay}

                                        />
                                        <div
                                            className={`text-center mt-2 text-white ${fetching ? 'd-block' : 'd-none'}`}>
                                            <Spinner animation={'grow'} size={'lg'}/>
                                        </div>
                                    </div>

                            }

                        </div>
                    </div>
                </div>
                <div className="item3"><Right betslipValidationData={userSlipsValidation} jackpotData={matches?.meta}
                                              test={true}/></div>

            </div>
            <div className="item6">
                <div className={"footer-mobile-none"}>
                    <Footer/>
                </div>
            </div>
        </div>

    );
};

export default React.memo(Index);
