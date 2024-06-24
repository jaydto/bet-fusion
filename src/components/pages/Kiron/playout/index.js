import React, {useContext, useEffect} from 'react';
import "./results.css"
import {StoreContext} from "../../../../context/store"
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useDispatch, useSelector} from 'react-redux';
import {nareLeaguePlayouts, resetState} from "../../../../redux/nareLeague"; // Import useDispatch hook


const KironPlayouts = React.memo(
    (props) => {
        const {state, dispatch} = useContext(StoreContext);
        let timeVar;
        const dispatchRedux = useDispatch()
        const playouts_data = useSelector((state) => state.nareLeague.playouts_data)
        const competition_id = useSelector((state) => state.nareLeague.competition_id)
        const loading = useSelector((state) => state.nareLeague.loading)
        const round_id = useSelector((state) => state.nareLeague.round_id);
        const play_time = useSelector((state) => state.nareLeague.play_time);
        const Ended = useSelector((state) => state.nareLeague.ended);

        const fetchData = () => {
            const data = {
                competition_id: Number(competition_id),
                round_id: round_id
            }
            dispatchRedux(nareLeaguePlayouts(data)); // Dispatch nareLeaguePlayouts async thunk
        }

        useEffect(() => {
            let totalEmptyPlayouts = 0;

            {
                playouts_data?.playouts?.map((results, key) => {
                    if (results.home_scores.length == 0 && results.away_scores.length == 0) {
                        ++totalEmptyPlayouts
                    }
                })
            }
            // console.log("totalEmpty", totalEmptyPlayouts)
            if (totalEmptyPlayouts == playouts_data?.playouts?.length) {
                timeVar = setTimeout(() => {
                    fetchData()
                }, 5000)

            } else {
                if (loading) {
                    return clearTimeout(timeVar)
                }


            }


        }, [loading])

        useEffect(()=>{
            // dispatchRedux(resetState('play_time'))
            dispatchRedux(resetState('time_left'))

        },[])


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
                    <div className="w-100">
                        <div className="w-100">
                            <div
                                className="col-12 py-1 standings-container-heading playouts d-flex align-items-center justify-content-between px-3">
                                <span>
                                    <div className={'d-flex align-items-center'}>
                                        Matchday #{playouts_data?.game_week}
                                    </div>
                                </span>
                                <span>
                                    <div className={'d-flex align-items-center'}>
                                        You have {playouts_data?.selections || 0} selections
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="league-games-wrapper playout">

                    <div className={'w-100'}>
                        <div className="playing-games-wrapper float-left w-100 small">
                            <div className="league-wrapper">
                                <div className="matches-wrapper pt-2">
                                    {playouts_data?.playouts?.map((results, index) => (
                                        <div key={index}>
                                            <div className="live-match-selection pt-1 pb-1">
                                                <div className="container">
                                                    <div className="row px-3">
                                                        <div className="col-results-page-1 text-right pt-1 d-flex justify-content-between align-items-center"><span
                                                            className="team-jersey"><LazyLoadImage
                                                            src={results?.home_team_image}
                                                            alt="Big League"/></span>
                                                            <a href="#"
                                                               className={'d-flex  justify-content-between align-items-center gap-4 '}
                                                               style={{color: "var(--black)"}}>
                                                                    <span
                                                                        className="home-team-r bold px-2">{results.home_team}</span>
                                                            </a>
                                                        </div>
                                                        <div className="col-results-page-2 d-flex align-items-center justify-content-between ">
                                                                    <span
                                                                        className={`mr-2 bold ${handleScore_home(results.home_scores.filter((score) => score <= play_time).length, results.away_scores.filter((score) => score <= play_time).length) ? `${Ended ? 'score-value-txt-stopped' : 'kiron-playout-score-animation kiron-playout-score'}` : 'score-value-txt'}`}>
                                                                         {results.home_scores.filter((score) => score <= play_time).length}
                                                                    </span>
                                                            <span className={'separator-style'}>
                                                                    </span>
                                                            <span
                                                                className={`mr-2 bold ${handleScore_away(results.home_scores.filter((score) => score <= play_time).length, results.away_scores.filter((score) => score <= play_time).length) ? `${Ended ? 'score-value-txt-stopped' : 'kiron-playout-score-animation kiron-playout-score'}` : 'score-value-txt'}`}>
                                                                {results.away_scores.filter((score) => score <= play_time).length}
                                                            </span>
                                                        </div>
                                                        <div className="col-results-page-3 text-left pt-1 d-flex justify-content-between align-items-center">
                                                            <a href="#"
                                                               className={"d-flex justify-content-between align-items-center gap-4"}
                                                               style={{color: "var(--black)"}}>
                                                                        <span
                                                                            className="away-team-r bold px-2">{results.away_team}</span>
                                                            </a>
                                                            <span className="team-jersey"><LazyLoadImage
                                                                src={results?.away_team_image}
                                                                alt="Big League"/></span>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            {results?.bet_pick !== null &&
                                                <div className={'w-100 d-flex align-items-center'}>
                                             <span
                                                 className="w-100  d-flex  justify-content-center bold px-2 align-items-center background-color-orange w-100"
                                                 style={{fontSize: '13px', height: '23px'}}>
                                                 &nbsp;
                                                 <span className={'text-dark '}>Bet Pick:&nbsp;
                                                     <span
                                                         className={'text-success kiron_choice'}>{results?.bet_pick}</span>&nbsp;
                                                 </span>

                                                 <span className={'text-dark kiron_choice'}>Market :&nbsp;
                                                     <span
                                                         className={' text-secondary'}>{results?.market}</span></span>


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
    });

export default KironPlayouts;


