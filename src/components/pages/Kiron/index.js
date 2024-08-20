import React, {useContext, useEffect,  useState} from 'react';
import Header from "../../header/header";
import KironTabs from "./KironTabs/KironTabs";
import KironCompetitions from "./competitions/KironCompetitions";
import MatchList from "./matches";
import {StoreContext} from "../../../context/store";
import {useLocation} from "react-router-dom";
import KironPeriods from "./periods";
import {getFromLocalStorage} from "../../utils/local-storage";
import { useSelector } from 'react-redux';
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
    const {state, dispatch} = useContext(StoreContext)
    ; // Import the async thunk from your virtualLeagueSlice

    const [tab, setTab] = useState('kiron')
    const [playout, setPlayout] = useState(null)

    const close_spinner=useSelector((state)=>state.virtualLeague.close_spinner)
    const inPlay=useSelector((state)=>state.virtualLeague.inPlay)
    const loading=useSelector((state)=>state.virtualLeague.loading)
    const current_selection_period=useSelector((state)=>state.virtualLeague.current_selection_period)

    const location = useLocation();

    const [isCountdownTimerActive, setIsCountdownTimerActive] = useState(false);

    const getUser = state?.userLogged || getFromLocalStorage('user')?.token

    const [userLogged, setUserLogged] = useState(null)

    useEffect(() => {
        const userLog = state?.userLogged || getFromLocalStorage("user")?.token

        setUserLogged(userLog)

    }, [getUser])



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
                                    <KironTabs tab={location?.pathname?.replace("/", "")} user={userLogged}/>
                                </div>
                                <div className={`${(tab!=='nare-league'&&tab!=='kiron'&&tab!=='bet-history')?'kiron-body-pages':'kiron-body-betslip'}`}>
                                    {tab == "results" ? <KironResults/> : tab == "standing" ?
                                        <Standing/> : tab == "bet-history" ? <KironBetHistory/> :
                                            <>
                                                <div className="d-flex flex-column kiron-matches-header">
                                                    <KironPeriods setPlayout={setPlayout}
                                                                  isCountdownTimerActive={isCountdownTimerActive}
                                                                  setIsCountdownTimerActive={setIsCountdownTimerActive}/>
                                                    {(!inPlay||current_selection_period)&& <KironMoreMarkets/>}
                                                </div>

                                                {loading ? <SkeletonLoader/> : close_spinner&&!current_selection_period ?
                                                    <div className="kiron-loader" id="kiron-loader">
                                                        <span id='game_week'></span>
                                                        <div
                                                            className="match-start d-flex flex-column align-items-center justify-content-center "
                                                            style={{marginTop: '120px'}}>
                                                            <span id="countdown"></span>
                                                        </div>
                                                        <div className="loader-kiron loading--full-height"></div>
                                                    </div> : (inPlay&&!current_selection_period)? <KironPlayouts playout={playout}
                                                                                            isCountdownTimerActive={isCountdownTimerActive}/> :
                                                        <div className="kiron_matches_now">
                                                            <MatchList/>
                                                        </div>
                                                }
                                            </>}
                                </div>

                            </div>
                            <Right kiron={true} virtualLeague={true}/>
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