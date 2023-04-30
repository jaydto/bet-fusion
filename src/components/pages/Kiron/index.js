import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import Header from "../../header/header";
import KironTabs from "./KironTabs/KironTabs";

import KironCompetitions from "./competitions/KironCompetitions";
import MatchList from "./matches";
import makeRequest from "../../utils/fetch-request";

import {Context} from "../../../context/store";
import {Link, useLocation, useNavigate} from "react-router-dom";
import KironPeriods from "./periods";
import {getFromLocalStorage, setLocalStorage} from "../../utils/local-storage";
import useWindowDimensions from "../../header/Dimensions";

import Right from "../../right";
import KironMoreMarkets from "./kironMoreMarkets";
import Footer from "../../footer/footer";
import './index.css'
import KironResults from "./results";
import Standing from "./standing";
import KironBetHistory from "./bet-history/KironBetHistory";
import Complex from "../../skeleton/Complex";
import KironPlayouts from "./playout";

const Kiron = () => {
    const [state,dispatch]=useContext(Context)
    const [loading, setLoading] = useState(false)
    const [tab, setTab] = useState('kiron')
    const [fetching, setFetching] = useState(false)
    const [threeWay, setThreeWay] = useState(false);
    const [limit, setLimit] = useState(10);
    const [kironValidation, setKironValidation] = useState();
    const [matches, setMatches] = useState([]);
    const [closed, setClosed] = useState(false);
    const [inPlay, setInPlay] = useState(false);
    const [playout, setPlayout] =useState(null)
    // const subTypes = new URL(window.location).searchParams.get('sub_type_id')||getFromLocalStorage('kiron_search_data')?.sub_type_id||'3'
    let endpoint = "/v1/nare-league/matches"
    let url = new URL(window.location.href)

    const location = useLocation();
    const navigate = useNavigate();

    const [kironCompetition, setKironCompetition] = useState(null);
    const [kironPeriod, setKironPeriod] = useState(null);
    const [roundId, setRoundId] = useState(null);
    const [kironSub, setKironSub] = useState(null);

    const [user, setUser] = useState(getFromLocalStorage("user"));
    const {height, width} = useWindowDimensions();
    const expand = "lg"
    const [isOpen, setIsOpen] = useState(false);

    const  userIn={
        marginTop: "4rem"
    }

    const toggle = () => {
        setIsOpen(!isOpen);
    };
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed, so add 1 and pad with a leading zero if necessary
    const day = String(now.getDate()).padStart(2, '0'); // Pad with a leading zero if necessary
    const hours = String(now.getHours()).padStart(2, '0'); // Pad with a leading zero if necessary
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Pad with a leading zero if necessary
    const seconds = String(now.getSeconds()).padStart(2, '0'); // Pad with a leading zero if necessary
    const kiron_first_round=getFromLocalStorage("kiron_first_round");
    const kiron_first_period=getFromLocalStorage("kiron_first_period");
    const [isCountdownTimerActive, setIsCountdownTimerActive] = useState(false);
    const [kironPeriods, setKironPeriods] = useState(kiron_first_period)
    const dateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    const getUser =state?.userLogged|| getFromLocalStorage('user')?.token

    const [userLogged, setUserLogged] = useState(null)

    useEffect(() => {
        const userLog=state?.userLogged||getFromLocalStorage("user")?.token

                console.log('userValue')
                setUserLogged(userLog)

    }, [getUser])


    useEffect(() => {
        const period = getFromLocalStorage("kiron_first_period")||dateString;

        if (kironPeriods !== period) {
            setKironPeriods(period)
        }
    }, [kiron_first_period])


    const [newData, setNewData] = useState({
        period:'',
        competition_id: '2',
        market_id: '3',
        round_id: ''
    });


    const prevNewData = useRef(newData);


    useEffect(() => {
        if (prevNewData.current.period !== newData.period ||
            prevNewData.current.competition_id !== newData.competition_id ||
            prevNewData.current.market_id !== newData.market_id) {
            setLoading(true)

            prevNewData.current = newData;
            // console.log("here working", newData)
            setLocalStorage('kiron_search_data', newData);
        }
    }, [newData]);

    useEffect(() => {
        // checkThreeWay()
        fetchData();

    }, [newData]);

    useEffect(() => {
        const abortController = new AbortController();
       console.log("abortController")
        fetchData();

        return () => {
            abortController.abort();
        };
    }, []);

    console.log("Match_status", loading)
    const fetchData = useCallback(async () => {

        let tab = location.pathname.replace("/", "") || 'markets'

        endpoint = endpoint.replaceAll(" ", '')


        let newSearchTerm = url.searchParams.get('search')


        if (newSearchTerm !== null) {
            endpoint += '&search=' + newSearchTerm
        }

        let data=getFromLocalStorage('kiron_search_data')

        const kiron_data= data|| newData


        await makeRequest({url: endpoint, method: "POST", data:kiron_data }).then(([status, result]) => {
             if (status == 200) {
                setMatches(matches.length > 0 ? {...matches, ...result?.data} : result?.data || result)
                setFetching(false)
                setLoading(false)
                 console.log("slip_data", result)
                if (result?.event_time) {
                    setLoading(false)
                    setKironValidation(result?.slip_data)
                }


            }
        });

    }, []);


    useEffect(() => {
        const kiron_competition=getFromLocalStorage("kiron_search_data")?.competition_id
        const kiron_period=getFromLocalStorage("kiron_search_data")?.period
        const kiron_market=getFromLocalStorage("kiron_search_data")?.market_id
        const kiron_first_period=getFromLocalStorage("kiron_first_period")

console.log("variable_state",state?.current_selection_period?.start)
        const newCompetitionId = new URL(window.location).searchParams.get('competition_id')||kiron_competition||'2'
        const newPeriod = state?.current_selection_period?.start?
            state?.current_selection_period?.start:
            state?.current_selection_period?.start.length==0||state?.current_selection_period?.start==null||state?.current_selection_period?.start==null?
                kiron_first_period||kiron_period:
                state?.current_selection_period?.start

        const newRoundId = state?.current_selection_period?.round
        const newMarket = new URL(window.location).searchParams.get('sub_type_id') ||kiron_market|'3'

//todo review christmas lights flickering
        if (newData.competition_id!==newCompetitionId  ||
            newData.competition_id!==newCompetitionId&&newData.period !==newPeriod  ||
            newData.round_id!==newRoundId   ||
            newData.market_id!==newMarket)  {
            setNewData({
                period: newPeriod,
                competition_id: newCompetitionId,
                market_id: newMarket,
                round_id: newRoundId
            });
            setLoading(true)

        }

    } );



    useEffect(() => {
        let new_tab = ""


        if (window.location.href.includes("nare-league")) {
            new_tab = ("nare-league")
        }

        if (window.location.href.includes("results")) {
            new_tab = ("results")

        }
        if (window.location.href.includes("standing")) {
            new_tab = ('standing')
        }
        if (window.location.href.includes("bet-history")) {
            new_tab = ('bet-history')
        }

        if (new_tab !== tab) {
            setTab(new_tab)
            setLoading(false)
        }

    })


    return (
        <>

        <Header/>
        <div className="amt">
            <div className="d-flex flex-row">
            <div className="d-flex flex-column" style={{width:"75%",marginTop:"2px"}}>
                    <KironCompetitions/>
                {!inPlay&&<KironTabs tab={location.pathname.replace("/", "")} user={userLogged}/>}
                {tab == "results" ? <KironResults/>:tab == "standing" ?<Standing/>:tab == "bet-history" ?<KironBetHistory/>:<>
                    <KironPeriods setClosed={setClosed} setInPlay={setInPlay} setPlayout={setPlayout}
                                  isCountdownTimerActive={isCountdownTimerActive} setIsCountdownTimerActive={setIsCountdownTimerActive}/>
                    <KironMoreMarkets/>
                    {loading ?matches.length>0&&matches?.map((match, index) => (
                        <Complex key={index}/>)):closed? <div className="kiron-loader" id="kiron-loader">
                            <div className="match-start">
                                Match Starts In <span id="countdown"></span>
                            </div>
                            <div className="loading loading--full-height"></div>
                        </div>:inPlay?<KironPlayouts playout={playout} isCountdownTimerActive={isCountdownTimerActive}/>:
                        <MatchList
                            fetching={fetching}
                            matches={matches}
                            competition_id={newData?.competition_id}
                            three_way={threeWay}

                        />
                    }
                </>
                }
            </div>
                <Right kiron={true} kironValidation={kironValidation}/>
            </div>
        </div>
            <Footer/>
        </>
    );
};

export default Kiron;
