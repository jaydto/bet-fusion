import React, {useCallback, useContext, useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import makeRequest from "../utils/fetch-request";
import {Context} from '../../context/store';
import useInterval from "../../hooks/set-interval.hook";
import {getBetslip} from '../utils/betslip';
import {Spinner} from "react-bootstrap";
import useWindowDimensions from "../header/Dimensions";
import Testimonials from "../carousel/Testimonials";

const Header = React.lazy(() => import('../header/header'));
const Footer = React.lazy(() => import('../footer/footer'));
const SideBar = React.lazy(() => import('../sidebar/awesome/Sidebar'));
const CarouselLoader = React.lazy(() => import('../carousel'));
const MainTabs = React.lazy(() => import('../header/main-tabs'));
const SearchBar = React.lazy(() => import('../header/search-bar'));
const MatchList = React.lazy(() => import('../matches'));
const Right = React.lazy(() => import('../right'));


const CompetitionMatches = React.memo(
    (props) => {
    const [page, setPage] = useState(1);
    const [matches, setMatches] = useState(null);
    const [state, dispatch] = useContext(Context);
    const {height, width} = useWindowDimensions();
    const [loading,setLoading]=useState(false);
    let {sportid, categoryid, competitionid} = useParams();
    const [competitionID, SetcompetitionID] = useState(1)
    const url = new URL(window.location)
    let    competitioni1= url.searchParams.get('competitionid')

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
    const optionMatch=()=>{
        if(competitioni1){
            return competitioni1
        }
        else return competitionid
    }


    useInterval(async () => {
        if (!shouldFetch) {
            return;
        }
        setFetching(true)
        let endpoint = "/v1/sports/competition?id="+optionMatch()+"&page="+(page || 1)+"&sport_id=79";
        let sub_types = new URL(window.location).searchParams.get('sub_type_id')
        endpoint += sub_types ? '&sub_type_id=' + sub_types : ''
        let betslip = findPostableSlip();
        let method = betslip ? "POST" : "GET";
        await makeRequest({url: endpoint, method: method, data: betslip}).then(([status, result]) => {
            if (status == 200) {
                setMatches(result?.data || result)
                setLoading(false)
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
            setLoading(false)
            setFetching(true);
            let betslip = findPostableSlip();
            let endpoint = "/v1/sports/competition?id="+optionMatch()+"&page=" + (page || 1);
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
    useEffect(() => {
        const new_competition_id = Number(optionMatch())

        if (competitionID !== new_competition_id) {
            SetcompetitionID(new_competition_id)
            setLoading(true)
            setMatches([])


        } else {

        }

    })

    return (
        <>
            <Header/>
            <div className={(width<=575?state?.user?"user_logged":"amt":"amt")}>
            <div className="d-flex flex-row justify-content-between">
                    <SideBar loadCompetitions/>
                    <div className="gz home match-overflow" >
                        <div className="homepage mobile-full-height">
                            <CarouselLoader/>
                            <Testimonials/>
                            {loading?
                                <div className={`text-center mt-2 text-white d-block`}>
                                    <Spinner animation={'grow'} size={'lg'}/>
                                </div>:
                                matches && <MatchList
                                    live={false}
                                    matches={matches}
                                    pdown={producerDown}
                                />
                            }

                        </div>
                    </div>
                    <Right betslipValidationData={userSlipsValidation}/>
                </div>
            </div>
            <div className={"mobile-remove"}>
            <Footer/>
            </div>
        </>
    )
})

export default CompetitionMatches;
