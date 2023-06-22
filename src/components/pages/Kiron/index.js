import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import Header from "../../header/header";
import KironTabs from "./KironTabs/KironTabs";
import KironCompetitions from "./competitions/KironCompetitions";
import MatchList from "./matches";
import makeRequest from "../../utils/fetch-request";
import {Context} from "../../../context/store";
import {useLocation} from "react-router-dom";
import KironPeriods from "./periods";
import {getFromLocalStorage, setLocalStorage} from "../../utils/local-storage";

import Right from "../../right";
import KironMoreMarkets from "./kironMoreMarkets";
import Footer from "../../footer/footer";
import './index.css'
import './container.css'
import KironResults from "./results";
import Standing from "./standing";
import KironBetHistory from "./bet-history/KironBetHistory";
import SkeletonLoader from "./skeletonLoader/SkeletonLoader";
import KironPlayouts from "./playout";


const TestKiron = React.memo(() => {
    const [state, dispatch] = useContext(Context)
    const [tab, setTab] = useState('kiron')
    const [fetching, setFetching] = useState(false)
    const [playout, setPlayout] = useState(null)

    let endpoint = "/v1/nare-league/matches"
    let url = new URL(window.location.href)

    const location = useLocation();


    const [isCountdownTimerActive, setIsCountdownTimerActive] = useState(false);


    const getUser = state?.userLogged || getFromLocalStorage('user')?.token

    const [userLogged, setUserLogged] = useState(null)

    useEffect(() => {
        const userLog = state?.userLogged || getFromLocalStorage("user")?.token

        setUserLogged(userLog)

    }, [getUser])


    const [newData, setNewData] = useState({
        period: '', competition_id: '2', market_id: '3', round_id: ''
    });


    const prevNewData = useRef(newData);


    useEffect(() => {


        if (!state?.inPlay && prevNewData.current.competition_id !== newData.competition_id || // prevNewData.current.period !== newData.period ||
            prevNewData.current.round_id !== newData.round_id || prevNewData.current.market_id !== newData.market_id) {

            prevNewData.current = newData;

            setLocalStorage('kiron_search_data', newData);

        }

    }, [newData]);

    useEffect(() => {
        dispatch({type: "SET", key: 'playout_data', payload: null})
        dispatch({type: "SET", key: 'close_spinner', payload: false})
        dispatch({type: "SET", key: 'nareLoading', payload: true})
        if (window.location.pathname == "/nare-league") {
            if (state?.inPlay) {
                dispatch({type: "SET", key: 'nareLoading', payload: false})
                dispatch({type: 'SET', key: 'nare_league_matches', payload: null})
            } else if (!state?.inPlay && state?.start_fetching_match && !state?.periods_ready) {
                dispatch({type: 'SET', key: 'nare_league_matches', payload: null})
                dispatch({type: "SET", key: 'nareLoading', payload: true})
                fetchData();
            }

        }

    }, [state?.start_fetching_match]);


    const fetchData = useCallback(async () => {
        dispatch({type: "SET", key: 'nareLoading', payload: true})
        endpoint = endpoint.replaceAll(" ", '')


        let newSearchTerm = url.searchParams.get('search')


        if (newSearchTerm !== null) {
            endpoint += '&search=' + newSearchTerm
        }

        let data = getFromLocalStorage('kiron_search_data')
        console.log("selection", state?.current_selection_period?.round)
        const marketsChoice = {
            competition_id: data?.competition_id || newData?.competition_id,
            market_id: new URL(window.location).searchParams.get('sub_type_id'),
            round_id: state?.current_selection_period?.round||getFromLocalStorage("kiron_search_data")?.round_id
        }

        const kiron_data = new URL(window.location).searchParams.get('sub_type_id') ? marketsChoice : data || newData


        await makeRequest({url: endpoint, method: "POST", data: kiron_data}).then(([status, result]) => {
            if (status == 200) {
                dispatch({type: "SET", key: 'nare_league_matches', payload: result?.data || result})
                dispatch({type: "SET", key: 'start_fetching_match', payload: false})
                setFetching(false)
                dispatch({type: "SET", key: 'nareLoading', payload: false})

            } else {
                dispatch({type: "SET", key: 'nareLoading', payload: false})
            }
        });


    }, []);


    useEffect(() => {
        const kiron_competition = getFromLocalStorage("kiron_search_data")?.competition_id
        const kiron_market = getFromLocalStorage("kiron_search_data")?.market_id

        const newCompetitionId = new URL(window.location).searchParams.get('competition_id') || kiron_competition || '2'

        const newRoundId = state?.current_selection_period?.round || state?.period_first_round
        const newMarket = new URL(window.location).searchParams.get('sub_type_id') || kiron_market | '3'

        if ((!state?.inPlay && newData.competition_id !== newCompetitionId) || newData.round_id !== newRoundId || newData.market_id !== newMarket) {
            setNewData({
                competition_id: newCompetitionId, market_id: newMarket, round_id: newRoundId
            });


        }


    });


    useEffect(() => {
        let new_tab = ""


        if (window.location.href.includes("nare-league")) {
            new_tab = ("nare-league")
        }

        if (window.location.href.includes("results")) {
            new_tab = ("results")

        } else if (window.location.href.includes("standing")) {
            new_tab = ('standing')
        } else if (window.location.href.includes("bet-history")) {
            new_tab = ('bet-history')
        }

        if (new_tab !== tab) {
            setTab(new_tab)
            dispatch({type: "SET", key: 'nareLoading', payload: false})
        }

    }, [window.location.pathname])


    return (

        <div className={'flex-item-kiron'}>
            <div className="item-kiron4">
                <div>
                    <Header slip={true}/>
                </div>
            </div>
            <div className="flex-container-kiron kiron-test full-screen-mobile-kiron">
                <div className={'item-kiron-1 d-none'}></div>
                <div className="item-kiron2" style={{width: '100%'}}>
                    <div className="d-flex flex-row full-screen-mobile-kiron">
                        <div className="d-flex flex-row kiron-size" style={{marginTop: "2px", width: '100%'}}>
                            <div className="d-flex flex-column kiron-size"
                                 style={{marginTop: "2px", overflowY: 'auto'}}>
                                <div className="d-flex flex-column kiron-sticky-nav">
                                    <KironCompetitions/>
                                    <KironTabs tab={location.pathname.replace("/", "")} user={userLogged}/>
                                </div>
                                <div className={"kiron-body"}>
                                    {tab == "results" ? <KironResults/> : tab == "standing" ?
                                        <Standing/> : tab == "bet-history" ? <KironBetHistory/> :
                                            <>
                                            <div className="d-flex flex-column kiron-matches-header">
                                                <KironPeriods setPlayout={setPlayout}
                                                              isCountdownTimerActive={isCountdownTimerActive}
                                                              setIsCountdownTimerActive={setIsCountdownTimerActive}/>
                                                {!state?.inPlay && <KironMoreMarkets/>}
                                            </div>

                                            {state?.nareLoading ? <SkeletonLoader/> : state?.close_spinner ?
                                                <div className="kiron-loader" id="kiron-loader">
                                                    <span id='game_week'></span>
                                                    <div
                                                        className="match-start d-flex flex-column align-items-center justify-content-center "
                                                        style={{marginTop: '120px'}}>
                                                        <span id="countdown"></span>
                                                    </div>
                                                    <div className="loading loading--full-height"></div>
                                                </div> : state?.inPlay ? <KironPlayouts playout={playout}
                                                                                        isCountdownTimerActive={isCountdownTimerActive}/> :
                                                    <div className="kiron_matches_now">
                                                        <MatchList
                                                            fetching={fetching}
                                                            competition_id={newData?.competition_id}

                                                        />
                                                    </div>
                                                    }
                                        </>}
                                </div>

                            </div>
                            <Right kiron={true} nareleague={true}/>

                        </div>
                    </div>
                </div>


            </div>
            <div className="item6">
                <div className={"footer-mobile-none"}>
                    <Footer/>
                </div>
            </div>
        </div>


    );
});

export default React.memo(TestKiron);
