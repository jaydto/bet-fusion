import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import Header from "../../header/header";
import KironTabs from "./KironTabs/KironTabs";
import logo from "../../../assets/img/Logo.webp";
import KironCompetitions from "./competitions/KironCompetitions";
import MatchList from "./matches";
import makeRequest from "../../utils/fetch-request";

import {Context} from "../../../context/store";
import {Link, useLocation, useNavigate} from "react-router-dom";
import KironPeriods from "./periods";
import {getFromLocalStorage, setLocalStorage} from "../../utils/local-storage";

import Right from "../../right";
import KironMoreMarkets from "./kironMoreMarkets";
import Footer from "../../footer/footer";
import './index.css'
import './test.css'
import KironResults from "./results";
import Standing from "./standing";
import KironBetHistory from "./bet-history/KironBetHistory";
import SkeletonLoader from "./skeletonLoader/SkeletonLoader";
import KironPlayouts from "./playout";

import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";
import {formatNumber} from "../../utils/betslip";

const  TestKiron= () => {
    const [state,dispatch]=useContext(Context)
    const gaEventTracker = useAnalyticsEventTracker('Navigation');
    const [loading, setLoading] = useState(false)
    const [tab, setTab] = useState('kiron')
    const [fetching, setFetching] = useState(false)
    const [kironValidation, setKironValidation] = useState();
    const [matches, setMatches] = useState([]);
    const [closed, setClosed] = useState(false);
    // const [inPlay, setInPlay] = useState(false);
    const [playout, setPlayout] =useState(null)

    let endpoint = "/v1/nare-league/matches"
    let url = new URL(window.location.href)

    const location = useLocation();


    const [isCountdownTimerActive, setIsCountdownTimerActive] = useState(false);


    const getUser =state?.userLogged|| getFromLocalStorage('user')?.token

    const [userLogged, setUserLogged] = useState(null)

    useEffect(() => {
        const userLog=state?.userLogged||getFromLocalStorage("user")?.token

        setUserLogged(userLog)

    }, [getUser])


    const [newData, setNewData] = useState({
        period:'',
        competition_id: '2',
        market_id: '3',
        round_id: ''
    });


    const prevNewData = useRef(newData);


    useEffect(() => {

        if (
            prevNewData.current.competition_id !== newData.competition_id ||
            prevNewData.current.period !== newData.period ||
            prevNewData.current.market_id !== newData.market_id) {
            setLoading(true)

            prevNewData.current = newData;

            setLocalStorage('kiron_search_data', newData);

        }
    }, [newData]);

    useEffect(() => {
        // checkThreeWay()
        if(window.location.pathname=="/nare-league"){
            fetchData();
        }

    }, [newData,window.location.pathname]);




    const fetchData =useCallback(async ()  => {
        // if(!pathname){return}
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
                if (result?.event_time) {
                    setLoading(false)
                    setKironValidation(result?.slip_data)
                }
            }
        });




    },[]);


    useEffect(() => {
        const kiron_competition=getFromLocalStorage("kiron_search_data")?.competition_id
        const kiron_period=getFromLocalStorage("kiron_search_data")?.period
        const kiron_market=getFromLocalStorage("kiron_search_data")?.market_id
        const kiron_first_period=getFromLocalStorage("kiron_first_period")


        const newCompetitionId = new URL(window.location).searchParams.get('competition_id')||kiron_competition||'2'
        const newPeriod = state?.current_selection_period?.start?
            state?.current_selection_period?.start:
            state?.current_selection_period?.start.length==0||state?.current_selection_period?.start==null||state?.current_selection_period?.start==undefined?
                kiron_first_period||kiron_period:
                state?.current_selection_period?.start

        const newRoundId = state?.current_selection_period?.round
        const newMarket = new URL(window.location).searchParams.get('sub_type_id') ||kiron_market|'3'


        if ((newData.competition_id !== newCompetitionId) ||
            newData.competition_id !== newCompetitionId && newData.period !== newPeriod ||
            newData.round_id !== newRoundId ||
            newData.market_id !== newMarket) {
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
        <div className={'flex-item'}>
            <div className="item4">
                <div className={'header-desktop-kiron'}>
                    <Header/>
                </div></div>
            <div className="flex-container kiron-test" >
                <div className={'item-1 d-none'}></div>
                <div className="item2" style={{width:'100%'}}>
                    <div className="d-flex flex-row">
                        <div className="d-flex flex-row kiron-size" style={{marginTop:"2px", width:'100%'}}>
                        <div className="d-flex flex-column kiron-size" style={{marginTop:"2px", overflowY:'auto'}}>
                        <KironCompetitions/>
                        {!state?.inPlay&&<KironTabs tab={location.pathname.replace("/", "")} user={userLogged}/>}
                        {tab == "results" ? <KironResults/>:tab == "standing" ?<Standing/>:tab == "bet-history" ?<KironBetHistory/>:<>
                            <KironPeriods setClosed={setClosed} setPlayout={setPlayout}
                                          isCountdownTimerActive={isCountdownTimerActive} setIsCountdownTimerActive={setIsCountdownTimerActive}/>
                            {!state?.inPlay&&<KironMoreMarkets/>}
                            {loading ?
                                <SkeletonLoader/>:closed? <div className="kiron-loader" id="kiron-loader">
                                Game  Weeek<span id={'game_week'}></span>
                                <div className="match-start d-flex flex-column align-items-center justify-content-center " style={{marginTop:'120px'}}>
                                 <span id="countdown"></span>
                                </div>
                                <div className="loading loading--full-height"></div>
                            </div>:state?.inPlay?<KironPlayouts playout={playout} isCountdownTimerActive={isCountdownTimerActive}/>:
                                <MatchList
                                    fetching={fetching}
                                    matches={matches}
                                    competition_id={newData?.competition_id}

                                />
                            }
                        </>
                        }
                    </div>
                            {/*<div className="item3 ">*/}
                                <Right kiron={true} kironValidation={kironValidation} nareleague={true}/>
                            {/*</div>*/}
                        </div>
                    </div>
                </div>


            </div>
            <div className="item6">
                <div className={"footer-mobile-none"}>
                <Footer/>
            </div></div>
        </div>

    );
};

export default TestKiron;
