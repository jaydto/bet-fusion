import React, {useContext, useEffect, useCallback, useState, useRef} from "react";
import {useLocation} from 'react-router-dom';
import {Context} from '../context/store';
import makeRequest from './utils/fetch-request';
import {getBetslip} from './utils/betslip' ;
import useInterval from "../hooks/set-interval.hook";

const Header = React.lazy(() => import('./header/header'));
const Footer = React.lazy(() => import('./footer/footer'));
// const SideBar = React.lazy(()=>import('./sidebar/sidebar'));
const CarouselLoader = React.lazy(() => import('./carousel/index'));
const MainTabs = React.lazy(() => import('./header/main-tabs'));
const MatchList = React.lazy(() => import('./matches/index'));
const Right = React.lazy(() => import('./right/index'));
const SideBar = React.lazy(() => import('./sidebar/awesome/Sidebar'))

const Index = (props) => {
    const location = useLocation();
    const [matches, setMatches] = useState([]);
    const [producerDown, setProducerDown] = useState(false);
    const [page, setPage] = useState(1);
    const [userSlipsValidation, setUserSlipsValidation] = useState();
    const [state, dispatch] = useContext(Context);

    const findPostableSlip = () => {
        let betslips = getBetslip() || {};
        var values = Object.keys(betslips).map(function (key) {
            return betslips[key];
        });
        return values;
    };

    useInterval(async () => {

        let endpoint = "/v1/matches";

        let betslip = findPostableSlip();

        let method = betslip ? "POST" : "GET";

        let tab = location.pathname.replace("/", "") || 'highlights';

        endpoint += "?page=" + (page || 1) + "&limit=50&tab=" + tab

        let url = new URL(window.location.href)

        let sport_id = url.searchParams.get('sport_id')

        if (sport_id !== null) {
            endpoint += " &sport_id=" + sport_id
        }
        endpoint += ` &sub_type_id=` + (url.searchParams.get('sub_type_id') || "1,10,18")


        let search_term = url.searchParams.get('search')

        if (search_term !== null) {
            return
        }

        await makeRequest({url: endpoint, method: method, data: betslip}).then(([status, result]) => {
            if (status == 200) {
                setMatches(matches.length>0?{...matches,...result?.data}:result?.data || result)
                // setMatches(result?.data || result)
                if (result?.slip_data) {
                    setUserSlipsValidation(result?.slip_data)
                }
                setProducerDown(result?.producer_status === 1);
            }
        });
    }, 3000);

    const fetchData = useCallback(async () => {

        let tab = location.pathname.replace("/", "") || 'highlights';
        let betslip = findPostableSlip();
        let endpoint = "/v1/matches?page=" + (page || 1) + "&limit=50&tab=" + tab;
        let url = new URL(window.location.href)
        let search_term = url.searchParams.get('search')
        if (search_term !== null) {
            endpoint += ' &search=' + search_term
        }

        let sport_id = url.searchParams.get('sport_id')

        if (sport_id !== null) {
            endpoint += " &sport_id=" + sport_id
        }

        endpoint += ` &sub_type_id=` + (url.searchParams.get('sub_type_id') || "1,10,18")

        await makeRequest({url: endpoint, method: "POST", data: betslip}).then(([status, result]) => {
            if (status == 200) {
                setMatches(matches.length>0?{...matches,...result?.data}:result?.data || result)
                if (result?.slip_data) {
                    setUserSlipsValidation(result?.slip_data)
                }
                setProducerDown(result?.producer_status === 1);
            }
        });

    }, []);


    useEffect(() => {
        fetchData();
        let cachedSlips = getBetslip("betslip");
        if (cachedSlips) {
            dispatch({type: "SET", key: "betslip", payload: cachedSlips});
        }
        return () => {
            setMatches(null);
        };
    }, [fetchData]);

    const listInnerRef = useRef();

    const onScroll = () => {
        console.log("scrolling")
        if (listInnerRef.current) {
            const {scrollTop, scrollHeight, clientHeight} = listInnerRef.current;
            if (scrollTop + clientHeight === scrollHeight) {
                console.log("Bottom fetching ....")
                setPage(page+1)
            }
        }
    };

    return (
        <>
            <Header/>
            <div className="amt">
                <div className="d-flex flex-row justify-content-between">
                    <SideBar loadCompetitions/>
                    <div className="gz home" style={{width: '100%'}} onScroll={() => onScroll()} ref={listInnerRef}>
                        <div className="homepage">
                            <CarouselLoader/>
                            <MainTabs tab={location.pathname.replace("/", "")}/>
                            {/*<MobileCategories/>*/}
                            <MatchList
                                live={false}
                                scroll={()=>onScroll()}
                                matches={matches}
                                pdown={producerDown}
                            />
                        </div>
                    </div>
                    <Right betslipValidationData={userSlipsValidation}/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Index
