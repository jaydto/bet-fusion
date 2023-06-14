import React, {
    useLayoutEffect,
    useState,
    useCallback, useContext,
} from "react";
import { useParams } from 'react-router-dom';


import makeRequest from "../utils/fetch-request";
import useInterval from "../../hooks/set-interval.hook";
import { getBetslip } from '../utils/betslip' ;

import { MarketList } from '../matches';
import {Context} from "../../context/store";
import useWindowDimensions from "../header/Dimensions";

const Header = React.lazy(()=>import('../header/header'));
const Footer = React.lazy(()=>import('../footer/footer'));
const SideBar = React.lazy(()=>import('../sidebar/awesome/Sidebar'));
const Right = React.lazy(()=>import('../right'));

const MatchAllMarkets = (props) => {
    const [page, setPage] = useState(1);
    const [producerDown, setProducerDown] = useState(false);
    const [allMarkets,setAllMarkets]=useState(true)

    let url = new URL(window.location)
    const live = url.searchParams.get('live')
    const id= url.searchParams.get('id')

    const [matchwithmarkets, setMatchWithMarkets] = useState();
    const [userSlipsValidation, setUserSlipsValidation] = useState();
    const {height, width} = useWindowDimensions();
    const [state, dispatch] = useContext(Context);


    const [isLoading, setIsLoading] = useState(false);

    const findPostableSlip = () => {
        let betslips = getBetslip() || {};
        var values = Object.keys(betslips).map(function(key){
            return betslips[key];
        });
        return values;
    };
    useInterval(() => {
        let endpoint = live
            ? "/v1/matches/live?id="+id
            : "/v1/matches?id="+id;

        let betslip = findPostableSlip();
        let method = betslip ? "POST" : "GET";

        makeRequest({url:endpoint, method:method, data:betslip}).then(([_status, response]) => {
            setMatchWithMarkets(response?.data || response );
            dispatch({type: "SET", key: "all_markets", payload: response?.data||response});
            if(response?.slip_data) {
                dispatch({type: "SET", key: "user_slip_validation", payload: response?.slip_data});
                setUserSlipsValidation(response?.slip_data);
            }
            setProducerDown(response?.producer_status === 1);
        });
    }, (live ? 2000: null));


    const fetchPagedData =useCallback(async() => {
        if(!isLoading && !isNaN(+id)) {
            setIsLoading(true);
            let betslip = findPostableSlip();
            let endpoint = live
                ? "/v1/matches/live?id="+id
                : "/v1/matches?id="+id;

            await makeRequest({url: endpoint, method: "POST", data: betslip}).then(([status, result]) => {
                dispatch({type: "SET", key: "all_markets", payload: result?.data||result});
                setMatchWithMarkets(result?.data|| result)
                setProducerDown(result?.producer_status === 1);
                setIsLoading(false);
            });
        }
    }, []);

    useLayoutEffect(() => {
        const abortController = new AbortController();
        fetchPagedData();
        return () => {
            abortController.abort();
        };
    }, [fetchPagedData]);

    return (

        <>
            <Header />
            <div className={(width<=514?state?.user?"user_logged":"amt":"amt")}>
                <div className="d-flex flex-row justify-content-between">
                    <SideBar loadCompetitions />
                    <div className="gz home" style={{ width: "100%" ,marginBottom:"5rem"}}>
                        <div className="homepage vh-100">

                            <MarketList
                                allMarkets={allMarkets}
                                live={live}
                                matchwithmarkets={state?.all_markets}
                                pdown={producerDown}
                            />

                        </div>
                    </div>

                        <Right betslipValidationData={userSlipsValidation} />


                </div>
            </div>
            <div className={"mobile-remove"}>
                <Footer/>
            </div>
        </>
    )
}

export default MatchAllMarkets;



