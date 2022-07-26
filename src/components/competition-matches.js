import React, {useContext, useEffect, useState, useCallback} from "react";
import {useParams} from 'react-router-dom';
import banner from '../assets/img/banner.jpg';
import makeRequest from "./utils/fetch-request";
import {Context} from '../context/store';
import useInterval from "../hooks/set-interval.hook";
import {
    getFromLocalStorage,
    setLocalStorage
} from './utils/local-storage';
import {getBetslip} from './utils/betslip' ;
import {Spinner} from "react-bootstrap";

const Header = React.lazy(() => import('./header/header'));
const Footer = React.lazy(() => import('./footer/footer'));
const SideBar = React.lazy(() => import('./sidebar/awesome/Sidebar'));
const CarouselLoader = React.lazy(() => import('./carousel/index'));
const MainTabs = React.lazy(() => import('./header/main-tabs'));
const SearchBar = React.lazy(() => import('./header/search-bar'));
const MatchList = React.lazy(() => import('./matches/index'));
const Right = React.lazy(() => import('./right/index'));


const CompetitionMatches = (props) => {
    const [page, setPage] = useState(1);
    const [matches, setMatches] = useState(null);
    const [state, dispatch] = useContext(Context);
    const {sportid, categoryid, competitionid} = useParams();
    const [producerDown, setProducerDown] = useState(false);
    const [userSlipsValidation, setUserSlipsValidation] = useState();
    const [fetching, setFetching] = useState(false)
    const [limit, setLimit] = useState(50);
    const [shouldFetch, setShouldFetch] = useState(true);


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
        setFetching(true)
        let endpoint = "/v1/sports/competition?id=" + competitionid + "&page=" + (page || 1) + "&sport_id=79";
        let sub_types = new URL(window.location).searchParams.get('sub_type_id')
        endpoint += sub_types ? '&sub_type_id=' + sub_types : ''
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
    }, 3000);

    const fetchPagedData = useCallback(() => {
        if (!fetching && shouldFetch) {
            setFetching(true);
            let betslip = findPostableSlip();
            let endpoint = "/v1/sports/competition?id=" + competitionid + "&page=" + (page || 1);
            let sub_types = new URL(window.location).searchParams.get('sub_type_id')
            endpoint += sub_types ? '&sub_type_id=' + sub_types : ''
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

    return (
        <>
            <Header/>
            <div className="amt">
                <div className="d-flex flex-row justify-content-between">
                    <SideBar loadCompetitions/>
                    <div className="gz home" style={{width: '100%'}}>
                        <div className="homepage">
                            <CarouselLoader/>
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
                    <Right betslipValidationData={userSlipsValidation}/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default CompetitionMatches;
