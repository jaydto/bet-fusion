import React, {
    useLayoutEffect,
    useState,
    useCallback,
    useContext,
    useEffect,
} from "react";
import { useParams } from "react-router-dom";

import makeRequest from "../components/utils/fetch-request";
import useInterval from "../hooks/set-interval.hook";
import { getBetslip } from "../components//utils/betslip";

import { MarketList } from "../components/matches";
import { Context } from "../context/store";
import useWindowDimensions from "../components/header/Dimensions";
const Footer=React.lazy(()=>import( "./footer/footer"));
const SideBar = React.lazy(() => import('./sidebar/awesome/Sidebar'));
// import MobileNav2 from "../mobile-navigation/MobileNav2";

const Header = React.lazy(() => import("../components/header/header"));
const Right = React.lazy(() => import("../components/right"));

const MatchAllMarkets = (props) => {
    const [page, setPage] = useState(1);
    const [producerDown, setProducerDown] = useState(false);
    const [allMarkets,setAllMarkets]=useState(true)
    const params=useParams()
    let url = new URL(window.location);
    const {live} = props
    const id = params.id



    // const [userSlipsValidation, setUserSlipsValidation] = useState();
    const { height, width } = useWindowDimensions();
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

            makeRequest({ url: endpoint, method: method, data: betslip }).then(
                ([_status, response]) => {
                    dispatch({type: "SET", key: "all_markets", payload: response?.data||response});
                    // setMatchWithMarkets(response?.data || response);
                    if (response?.slip_data) {
                        dispatch({type: "SET", key: "user_slip_validation", payload: response?.slip_data});
                        // setUserSlipsValidation(response?.slip_data);
                    }
                    setProducerDown(response?.producer_status === 1);
                }
            );
        },
        live ? 2000 : null
    );
    // console.log("all-markets",Object.keys(state?.all_markets.data.odds));
    const fetchPagedData = useCallback(async () => {
        if (!isLoading && !isNaN(+id)) {
            setIsLoading(true);
            let betslip = findPostableSlip();
            let endpoint = live
                ? "/v1/matches/live?id=" + id
                : "/v1/matches?id=" + id;

            await makeRequest({ url: endpoint, method: "POST", data: betslip }).then(
                ([status, result]) => {
                    dispatch({type: "SET", key: "all_markets", payload: result?.data||result});
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
    }, [fetchPagedData]);



    return (<>
            <Header/>

            <div className="amt">
                <div className="d-flex flex-row justify-content-between">
                    <div className="gz home" style={{ width: "100%" ,marginBottom:"5rem"}}>
                        *<SideBar loadCompetitions/>
                        <div className="homepage">

                            <MarketList
                                allMarkets={allMarkets}
                                live={live}
                                matchwithmarkets={state?.all_markets}
                                pdown={producerDown}
                            />

                        </div>
                    </div>

                    {/*<div className={"mobile-top"}>*/}
                        <Right betslipValidationData={state?.user_slip_validation} />
                    {/*</div>*/}
                </div>
            </div>
            {/*<Footer/>*/}
        </>
    );
};

export default MatchAllMarkets;
