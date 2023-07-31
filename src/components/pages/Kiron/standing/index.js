import React, {useCallback, useContext, useEffect, useState} from 'react';
import "./standing.css"
import makeRequest from "../../../utils/fetch-request";
import {getFromLocalStorage} from "../../../utils/local-storage";
import {Spinner} from "react-bootstrap";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {StoreContext} from "../../../../context/store";
import { useDispatch,useSelector } from 'react-redux'; // Import useDispatch hook
import {nareLeagueStandings, resetState} from '../../../../redux/nareLeague';
const Standing = () => {
    const competition_id=useSelector((state)=>state.nareLeague.competition_id)
    const newCompetition = new URL(window.location).searchParams.get('competition_id') ||competition_id
    const {state,dispatch}=useContext(StoreContext)
    const dispatchRedux=useDispatch()
    const fetchData = useCallback(async () => {

        const kiron_data = {
            competition_id: new URL(window.location).searchParams.get('competition_id') || competition_id
        }
        dispatchRedux(nareLeagueStandings(kiron_data))
    }, []);
    const loadingData = useSelector((state) => state.nareLeague.loading);
    const standingsData = useSelector((state) => state.nareLeague.standings_data);



    useEffect(() => {
        fetchData();
        dispatchRedux(resetState('current_selection_period'))
    }, [newCompetition]);


    return (
        <div>
            <section className="standing-wrapper text-center pt-1 pb-1">
                <div className="container">
                    <div className="row">
                        <div className="col-12 pb-2 ">
                       <span
                           className="standing-heading mt-2">{newCompetition == 1 ? "KENYAN " : newCompetition == 2 ? "ENGLISH " : newCompetition == 3 ? "SPANISH " : newCompetition == 4 && "ITALIAN "} LEAGUE</span>
                        </div>
                        <div className="col-12"><span className="standing-time">STANDING</span></div>
                    </div>
                </div>
            </section>
            <div className="league-wrapper">
                <div className="match-standing-wrapper pt-0">
                    {!loadingData ? <table className={"mx-1 table"}>
                        <tbody style={{background: '#fff'}}>
                        <tr className="table-header">
                            <th className={'standings-menu'}>Position</th>
                            <th className={'standings-menu'}>Team</th>
                            <th className={'standings-menu'}>Points</th>
                            <th className={'standings-menu'} style={{textAlign: 'center'}}>Played</th>
                            <th className={'standings-menu text-center'}>Form</th>
                        </tr>
                        {standingsData &&
                            Object.entries(standingsData).map(([key, standing],index) => (
                                <tr key={index}>
                                    <td className={'standings-menu'}>{standing?.position}</td>
                                    <td className="playing-teams-r standings-menu">
                                    <span className="team-badge">
                                         <LazyLoadImage
                                             src={standing?.icon_url}
                                             alt="Nare League"/>&nbsp;
                                        {standing?.team_name}
                                  </span>
                                    </td>
                                    <td className={'standings-menu'}>{standing?.points}</td>
                                    <td className={'standings-menu'}>{standing?.games_played}</td>
                                    <td className={'standings-menu'}><span className="team-form">
                                       {Array.from(standing?.form)?.map((item, index) => (
                                           <span key={index} title={`${item == 'L' ? ' Lost' : item == 'W' ? ' Won ' : ' Draw '}`}
                                                 className={`size-form btn btn-sm ${item == 'L' ? ' btn-danger ' : item == 'W' ? ' btn-success ' : ' btn-dark '} mx-1`}
                                                 style={{width: '18%', cursor: 'default'}}><strong
                                               className={'bold'}>{item}</strong></span>
                                       ))}
                                         </span>
                                    </td>


                                </tr>)
                            )
                        }

                        </tbody>
                    </table> : <div className={`text-center mt-2 text-white d-block w-100`}>
                        <Spinner animation={'grow'} size={'lg'}/>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default Standing;
