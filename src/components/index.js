import React, {useContext, useEffect, useCallback, useState, useRef} from "react";
import {useLocation} from 'react-router-dom';
import {Context} from '../context/store';
import makeRequest from './utils/fetch-request';
import {getBetslip} from './utils/betslip' ;
import useInterval from "../hooks/set-interval.hook";
import {Spinner} from "react-bootstrap";
import useAnalyticsEventTracker from '../components/analytics/useAnalyticsEventTracker';
import {getFromLocalStorage, setLocalStorage} from "./utils/local-storage";
import useWindowDimensions from "./header/Dimensions";
import {  Capacitor } from "@capacitor/core";
import axios from "axios";
import Testimonials from "./carousel/Testimonials";

const Header = React.lazy(() => import('./header/header'));
const Footer = React.lazy(() => import('./footer/footer'));
// const SideBar = React.lazy(()=>import('./sidebar/sidebar'));
const CarouselLoader = React.lazy(() => import('./carousel/index'));
const MainTabs = React.lazy(() => import('./header/main-tabs'));
const MatchList = React.lazy(() => import('./matches/index'));
const Right = React.lazy(() => import('./right/index'));
const SideBar = React.lazy(() => import('./sidebar/awesome/Sidebar'))
const Index = (props) => {
    const [user, setUser] = useState(getFromLocalStorage("user"));
    const gaEventTracker = useAnalyticsEventTracker('Home');
    const location = useLocation();

    const {height, width} = useWindowDimensions();
    const [matches, setMatches] = useState([]);
    const [limit, setLimit] = useState(10);
    const [producerDown, setProducerDown] = useState(false);
    const [threeWay, setThreeWay] = useState(false);
    const [page, setPage] = useState(1);
    const [userSlipsValidation, setUserSlipsValidation] = useState();
    const [state, dispatch] = useContext(Context);
    const [fetching, setFetching] = useState(false)
    const homePageRef = useRef()
    const [utmSource, setUtmSource] = useState('')


    // useEffect(() => {
    //     if (Capacitor.isNativePlatform) {
    //         App.addListener("backButton", (e) => {
    //             if (window.location.pathname === "/") {
    //                 // Show A Confirm Box For User to exit app or not
    //                 let ans = window.confirm("Are you sure");
    //                 if (ans) {
    //                     App.exitApp();
    //                 }
    //             }
    //             else if (window.location.pathname === "/highlights") {
    //                 // Show A Confirm Box For User to exit app or not
    //                 let ans = window.confirm("Are you sure");
    //                 if (ans) {
    //                     App.exitApp();
    //                 }
    //             }
    //
    //         });
    //     }
    // }, []);

    const findPostableSlip = () => {
        let betslips = getBetslip() || {};
        var values = Object.keys(betslips).map(function (key) {
            return betslips[key];
        });
        return values;
    };


    useInterval(async () => {
        // console.log("location",location.pathname)
        if(location.pathname==="/")
            setFetching(true)
        else
            setFetching(false)

        let endpoint = "/v1/matches";

        let betslip = findPostableSlip();

        let method = betslip ? "POST" : "GET";


        let tab = location.pathname.replace("/", "") || 'highlights';

        endpoint += "?page=" + (page || 1) + `&limit=${limit || 50}&tab=` + tab

        let url = new URL(window.location.href)


        let sport_id = url.searchParams.get('sport_id')

        if (sport_id !== null) {
            endpoint += " &sport_id=" + sport_id
        }
        //splitting before api call
        let sub_types = (url.searchParams.get('sub_type_id') || "1,18,29").split(",")
        // console.log("subtypes",sub_types[0]);
        if (width <= 767) {
            // console.log("condition has been met ", [sub_types[0]])
            sub_types = [sub_types[0]]
        }

        endpoint = endpoint.replaceAll(" ", '')

        endpoint += `&sub_type_id=` + (sub_types || "1,18,29")


        let search_term = url.searchParams.get('search')

        if (search_term !== null) {
            return
        }

        await makeRequest({url: endpoint, method: method, data: betslip}).then(([status, result]) => {
            if (status == 200) {
                setMatches(matches.length > 0 ? {...matches, ...result?.data} : result?.data || result)
                setFetching(false)
                // setMatches(result?.data || result)
                if (result?.slip_data) {
                    setUserSlipsValidation(result?.slip_data)
                }
                setProducerDown(result?.producer_status === 1);
            }
        });
    }, 3000);

    const fetchData = useCallback(async () => {
        setFetching(true)
        let tab = location.pathname.replace("/", "") || 'highlights';
        let betslip = findPostableSlip();
        let endpoint = "/v1/matches?page=" + (page || 1) + `&limit=${limit || 50}&tab=` + tab;
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
        console.log("subtypes", sub_types[0]);
        if (width <= 767) {
            // console.log("condition has been met ", [sub_types[0]])
            sub_types = [sub_types[0]]
        }

        endpoint += `&sub_type_id=` + (sub_types || "1,18,29")


        await makeRequest({url: endpoint, method: "POST", data: betslip}).then(([status, result]) => {
            if (status == 200) {
                setMatches(matches.length > 0 ? {...matches, ...result?.data} : result?.data || result)
                setFetching(false)
                if (result?.slip_data) {
                    setUserSlipsValidation(result?.slip_data)
                }
                setProducerDown(result?.producer_status === 1);
            }
        });

    }, []);



    useEffect(() => {
        checkThreeWay()
        fetchData();
        let cachedSlips = getBetslip("betslip");
        if (cachedSlips) {
            dispatch({type: "SET", key: "betslip", payload: cachedSlips});
        }
        return () => {
            setMatches(null);
        };
    }, [fetchData]);

    const checkThreeWay = () => {
        let url = new URL(window.location)
        let sub_types = (url.searchParams.get('sub_type_id') || "1,18,29").split(",")
        setThreeWay(sub_types.includes("1"))
    }

    document.addEventListener('scrollEnd', (event) => {
        if (!fetching) {
            setFetching(true)
            setLimit(limit + 10)
        }
    })

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


    return (<>
        <Header/>

        <div className={(width <= 514 ? user ? "user_logged" : "amt" : "amt ")} >
            <div className="d-flex flex-row justify-content-between">
                <SideBar loadCompetitions/>
                <div className="gz home moz-clip" >
                    <div className="homepage" ref={homePageRef} >
                        <CarouselLoader/>
                        <Testimonials/>

                        <MainTabs tab={location.pathname.replace("/", "")}/>
                        {/* <MobileCategories/> */}
                        <MatchList
                            live={false}
                            matches={matches}
                            pdown={producerDown}
                            three_way={threeWay}
                        />
                    </div>
                    <div className={`text-center mt-2 text-white ${fetching ? 'd-block' : 'd-none'}`}>
                        <Spinner animation={'grow'} size={'lg'}/>
                    </div>
                </div>
                <Right betslipValidationData={userSlipsValidation} jackpotData={matches?.meta}/>
            </div>
        </div>
        <div className={"mobile-remove"}>
            <Footer/>
        </div>
    </>)
}

export default Index
