import React, {useCallback, useContext, useEffect, useState} from 'react';
import "./results.css"
import {getFromLocalStorage} from "../../../utils/local-storage";
import makeRequest from "../../../utils/fetch-request";
import {Context} from "../../../../context/store";

const KironPlayouts = (props) => {
    const {playout,isCountdownTimerActive}=props
    const [fetching, setFetching] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resulted, setResulted] = useState([]);
    const [state, dispatch] = useContext(Context);
    const [lastScorer, setLastScorer] = useState(null);
    const [timeAfter, setTimeAfter] = useState(null);
    const kironSearchCompetition=getFromLocalStorage("kiron_search_data")?.competition_id
    const kironSearchRoundId=getFromLocalStorage("kiron_first_round")||new URL(window.location).searchParams.get('round_id')
    let endpoint = "/v1/nare-league/live"
    console.log("live_count",kironSearchRoundId )
    console.log("live_playout",playout )
    const [newData, setNewData] = useState({
        round_id: kironSearchRoundId
    });

    const fetchData = useCallback(async () => {

        endpoint = endpoint.replaceAll(" ", '')

        const kiron_data= newData


        console.log(kiron_data)
        await makeRequest({url: endpoint, method: "POST", data:kiron_data }).then(([status, result]) => {
            if (status == 200) {
                dispatch({ type: "SET", key: 'playout_data', payload: resulted })
                setResulted(resulted.length > 0 ? {...resulted, ...result?.data} : result?.data || result)
                setFetching(false)
                setLoading(false)
                console.log("resulting",result)
                if (result?.slip_data) {

                }
            }
        });

    }, []);

    useEffect(() => {

        fetchData();

    }, [fetchData]);

    useEffect(() => {

        fetchData();

    }, [getFromLocalStorage("kiron_first_round")]);

    let totalSeconds = 0;

    useEffect(()=>{
        if (isCountdownTimerActive) {

            const timerVar = setInterval(countTimer, 1000);
            function countTimer() {
                ++totalSeconds;
                const seconds = totalSeconds;
                if (seconds < 7) {
                   //do nothing
                } else {
                    console.log("fetchTimeOut Data", seconds)
                    setTimeAfter(null)
                    fetchData()
                    clearInterval(timerVar);
                }
            }


            return () => clearInterval(timerVar);
        }

    },[isCountdownTimerActive])


 const handleScore_home=(home_score,away_score)=>{
     if(home_score!=0&&(home_score>away_score)){
         console.log("Yinhome_score_active",home_score)
         return true
     }else if((home_score!=0)){
         if(home_score==away_score){
             console.log("Yindraw_score_active",home_score)
             return true
         }else{
             return false
         }
     }else{
         return false
     }
 }
 const handleScore_away=(home_score,away_score)=>{
     if(away_score!=0&&(away_score>home_score)){
         console.log("Yinaway_score_active",away_score)
         return true
     }else if((away_score!=0)){
         if(away_score==home_score){
             console.log("Yindraw_score_active",home_score)
             return true
         }else{
             return false
         }
     }else{
         return false
     }
 }
    return (
        <>
            <section className="standing-wrapper text-center pt-2 pb-2">
                <div className="container">
                    <div className="row">
                        <div className="col-12 pb-2"><span
                            className="standing-heading">{kironSearchCompetition==1?"Kenyan":kironSearchCompetition==2?"English ":kironSearchCompetition==3?"Spanish":"Italian"}League</span></div>
                        <div className="col-12"><span className="standing-time">15:38</span></div>
                    </div>
                </div>
            </section>
            <div className="league-games-wrapper">

                <div className={'w-100'}>
                    <div className="playing-games-wrapper float-left w-100 small">
                        <div className="league-wrapper">

                            <div className="matches-wrapper pt-2">
                                {resulted &&
                                    Object.entries(resulted).map(([key, results]) => (
                                        <div className="live-match-selection pt-1 pb-1">
                                            <div className="container">
                                                <div className="row px-3">

                                                    <div className="col-6 text-right pt-1">
                                                        <span className="team-jersey">
                                                            <img src={results?.home_team_image} alt="Nare League"  style={{height: '32px'}}/>
                                                        </span>
                                                        <a href="#" style={{color: "var(--black)"}}  className={"d-flex justify-content-between align-items-center"}>
                                                            <span className="home-team-r bold px-2">{results.home_team}</span>
                                                            <span className={`mr-2 ${handleScore_home(results.home_scores.filter((score) => score <= playout).length,results.away_scores.filter((score) => score <= playout).length)?' kiron-playout-score-animation kiron-playout-score':'red-txt'}`}>
                                                            { results.home_scores.filter((score) => score <= playout).length}
                                                            </span>
                                                        </a>
                                                    </div>

                                                    <div className="col-6 text-left pt-1">
                                                        <a href="#" className={"d-flex justify-content-between align-items-center"} style={{color: "var(--black)"}}>
                                                            <span className={`mr-2  ${handleScore_away(results.home_scores.filter((score) => score <= playout).length,results.away_scores.filter((score) => score <= playout).length)?' kiron-playout-score-animation kiron-playout-score':'red-txt'}`}> { results.away_scores.filter((score) => score <= playout).length}</span>
                                                            <span className="away-team-r bold px-2">{results.away_team}</span>
                                                        </a>
                                                        <span className="team-jersey"><img
                                                            src={results?.away_team_image}
                                                            alt="Nare League" style={{height: '32px'}}/></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </>


);
};

export default KironPlayouts;
