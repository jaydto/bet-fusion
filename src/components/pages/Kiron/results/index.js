import React, {useCallback, useEffect} from 'react';
import "./results.css"
import {Spinner} from "react-bootstrap";
import {LazyLoadImage} from "react-lazy-load-image-component";
import { useDispatch,useSelector } from 'react-redux'; // Import useDispatch hook
import {nareLeagueResults, resetState} from '../../../../redux/nareLeague';

const KironResults =
    () => {
        const competition_id=useSelector((state)=>state.nareLeague.competition_id)
        const newCompetition = new URL(window.location).searchParams.get('competition_id') || competition_id

        const dispatchRedux=useDispatch()

        const fetchData = useCallback(async () => {

            const kiron_data = {
                competition_id: new URL(window.location).searchParams.get('competition_id')||competition_id
            }
            dispatchRedux(nareLeagueResults(kiron_data));

        }, []);
        const loadingData = useSelector((state) => state.nareLeague.loading);
        const resultsData = useSelector((state) => state.nareLeague.results_data);

        useEffect(() => {
            fetchData();
            dispatchRedux(resetState('current_selection_period'))
        }, [newCompetition]);

        return (
            <>
                {resultsData && !loadingData ?
                    Object.entries(resultsData).map(([key, league], index) => (
                        <>
                            <section className="standing-wrapper text-center pt-2 pb-2" key={index}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12 pb-2">
                                <span
                                    className="standing-heading-r"><strong>{league?.competition_name.toUpperCase()} LEAGUE&nbsp; WEEK {league?.round_number}&nbsp;#{league?.round_id}</strong></span>
                                        </div>
                                        <div className="col-12"><span
                                            className="standing-time">{league?.event_time}</span></div>
                                    </div>
                                </div>
                            </section>
                            {Object.entries(league?.matches).map(([key, results], index) => (
                                <div className="league-games-wrapper" key={index}>
                                    <div className={'w-100'}>
                                        <div className="playing-games-wrapper float-left w-100 small">
                                            <div className="league-wrapper-r">
                                                <div className="matches-wrapper pt-2">

                                                    <div className="live-match-selection pt-1 pb-1">
                                                        <div className="container">
                                                            <div className="row px-3">
                                                                <div className="col-6 text-right pt-1"><span
                                                                    className="team-jersey"><LazyLoadImage
                                                                    src={results?.home_icon}
                                                                    alt="Nare League"/></span> <a href="#"
                                                                                                  style={{color: "var(--black)"}}>
                                                                    <span
                                                                        className="home-team-r bold px-2">{results.home_team}</span>
                                                                    <span
                                                                        className="ml-2 red-txt">{results.home_score}</span></a>
                                                                </div>

                                                                <div className="col-6 text-left pt-1">
                                                                    <a href="#"
                                                                       className={"d-flex justify-content-between align-items-center"}
                                                                       style={{color: "var(--black)"}}>
                                                                        <span
                                                                            className="mr-2 red-txt">{results.away_score}</span>
                                                                        <span
                                                                            className="away-team-r bold px-2">{results.away_team}</span>
                                                                    </a>
                                                                    <span className="team-jersey"><LazyLoadImage
                                                                        src={results?.away_icon}
                                                                        alt="Nare League"/></span>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </>
                    )) : <div className={`text-center mt-2 text-white d-block`}>
                        <Spinner animation={'grow'} size={'lg'}/>
                    </div>
                }

            </>


        );
    };

export default KironResults;
