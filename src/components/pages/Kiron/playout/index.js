import React, {useCallback, useContext, useEffect, useState} from 'react';
import "./results.css"
import {getFromLocalStorage} from "../../../utils/local-storage";
import makeRequest from "../../../utils/fetch-request";
import {Context} from "../../../../context/store";

const KironPlayouts = (props) => {
    const {playout, isCountdownTimerActive} = props
    const [success, setSuccess] = useState(false)
    // const [resulted, setResulted] = useState([]);
    const [state, dispatch] = useContext(Context);

    const kironSearchCompetition = getFromLocalStorage("kiron_search_data")?.competition_id
    const kironSearchRoundId = getFromLocalStorage("kiron_first_round") || new URL(window.location).searchParams.get('round_id')
    let endpoint = "/v1/nare-league/live"
    let timeVar;

    const [newData, setNewData] = useState({
        round_id: kironSearchRoundId
    });

    const fetchData = useCallback(async () => {
        setSuccess(false)

        endpoint = endpoint.replaceAll(" ", '')

        const kiron_data = newData

        await makeRequest({url: endpoint, method: "POST", data: kiron_data}).then(([status, result]) => {
            if (status == 200) {
                dispatch({type: "SET", key: 'playout_data', payload: result?.data || result})
                setSuccess(true)
                dispatch({type: "SET", key: 'nareLoading', payload: false})

            }
        });

    }, []);


    useEffect(() => {
        if(state?.start_playout|| !state?.Ended){
            if(!state?.periods_ready){
                fetchData();
            }

        }

    }, [state?.period_first_round]);


    useEffect(() => {
        let totalEmptyPlayouts = 0;
        if (isCountdownTimerActive) {
            {
                state?.playout_data?.playouts?.map((results, key) => {
                    if (results.home_scores.length == 0 && results.away_scores.length == 0) {
                        ++totalEmptyPlayouts
                    }
                })
            }
            // console.log("totalEmpty", totalEmptyPlayouts)
            if (totalEmptyPlayouts == state?.playout_data?.playouts?.length) {
                timeVar=setTimeout(() => {
                    fetchData()
                }, 5000)

            }else{
                if(success){
                    return clearTimeout(timeVar)
                }


            }

        }

    }, [success])


    const handleScore_home = (home_score, away_score) => {
        if (home_score != 0 && (home_score > away_score)) {
            return true
        } else if ((home_score != 0)) {
            if (home_score == away_score) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }
    const handleScore_away = (home_score, away_score) => {
        if (away_score != 0 && (away_score > home_score)) {
            return true
        } else if ((away_score != 0)) {
            if (away_score == home_score) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    return (
        <>
            <section className="standing-wrapper text-center pt-2 pb-2">
                <div className="container">
                    <div className="row">
                        <div className="col-12 pb-2">
                            <span className="standing-heading d-flex  flex-column
                            ">{kironSearchCompetition == 1 ? "KENYAN" : kironSearchCompetition == 2 ? "ENGLISH " : kironSearchCompetition == 3 ? "SPANISH" : "ITALIAN"} LEAGUE</span>
                            <span><strong className={'font-bold-md'}>
                                GAME WEEK {state?.playout_data?.game_week}
                            </strong> </span> &nbsp;  <span>
                            <strong className={'font-bold-md'}>
                                TOTAL SELECTIONS {state?.playout_data?.selections || 0}
                            </strong>
                        </span>
                        </div>
                    </div>
                </div>
            </section>
            <div className="league-games-wrapper">

                <div className={'w-100'}>
                    <div className="playing-games-wrapper float-left w-100 small">
                        <div className="league-wrapper">
                            <div className="matches-wrapper pt-2">
                                {state?.playout_data?.playouts?.map((results, key) => (
                                    <div key={key}>
                                        <div className="live-match-selection pt-1 pb-1" >
                                            <div className="container">
                                                <div className="row px-3">

                                                    <div className="col-6 text-right pt-1">
                                                        <span className="team-jersey">
                                                            <img src={results?.home_team_image} alt="Nare League"
                                                                 style={{height: '32px'}}/>
                                                        </span>
                                                        <a href="#" style={{color: "var(--black)"}}
                                                           className={"d-flex justify-content-between align-items-center"}>
                                                            <span
                                                                className="home-team-r bold px-2">{results.home_team}</span>
                                                            <span
                                                                className={`mr-2 bold ${handleScore_home(results.home_scores.filter((score) => score <= playout).length, results.away_scores.filter((score) => score <= playout).length) ? `${state?.Ended?'': 'kiron-playout-score-animation kiron-playout-score'}`: 'red-txt'}`}>
                                                            {results.home_scores.filter((score) => score <= playout).length}
                                                            </span>
                                                        </a>
                                                    </div>

                                                    <div className="col-6 text-left pt-1">
                                                        <a href="#"
                                                           className={"d-flex justify-content-between align-items-center"}
                                                           style={{color: "var(--black)"}}>
                                                            <span
                                                                className={`mr-2 bold ${handleScore_away(results.home_scores.filter((score) => score <= playout).length, results.away_scores.filter((score) => score <= playout).length) ?`${state?.Ended?'': 'kiron-playout-score-animation kiron-playout-score'}`: 'red-txt'}`}> {results.away_scores.filter((score) => score <= playout).length}</span>
                                                            <span
                                                                className="away-team-r bold px-2">{results.away_team}</span>

                                                        </a>
                                                        <span className="team-jersey"><img
                                                            src={results?.away_team_image}
                                                            alt="Nare League" style={{height: '32px'}}/></span>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        {results?.bet_pick !== null &&
                                            <div className={'w-100 d-flex'}>
                                             <span className="w-100  d-flex  justify-content-center bold px-2 bg-success w-100" style={{fontSize:'13px',height:'23px'}}>
                                                 &nbsp;
                                                 <span className={'text-warning '}>Bet Pick:&nbsp;
                                                     <span className={'text-light kiron_choice'}>{results?.bet_pick}</span>&nbsp;
                                                 </span>

                                                 <span className={'text-warning'}>Market :&nbsp;
                                                     <span className={'text-light kiron_choice'}>{results?.market}</span></span>


                                             </span>
                                            </div>
                                        }
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


