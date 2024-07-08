import React, {useCallback, useContext, useEffect, useState} from 'react';
import "./standing.css"
import {Spinner} from "react-bootstrap";
import {LazyLoadImage} from "react-lazy-load-image-component";
import { useDispatch,useSelector } from 'react-redux'; // Import useDispatch hook
import {virtualLeagueStandings, resetState} from '../../../../redux/virtualLeague';
import SkeletonLoader from "../skeletonLoader/SkeletonLoader";
const Standing = () => {
    const competition_id=useSelector((state)=>state.virtualLeague.competition_id)
    const newCompetition = new URL(window.location).searchParams.get('competition_id') ||competition_id
    const dispatchRedux=useDispatch()
    const fetchData = useCallback(async () => {

        const kiron_data = {
            competition_id: new URL(window.location).searchParams.get('competition_id') || competition_id
        }
        dispatchRedux(virtualLeagueStandings(kiron_data))
    }, []);
    const loadingData = useSelector((state) => state.virtualLeague.loading);
    const standingsData = useSelector((state) => state.virtualLeague.standings_data);



    useEffect(() => {
        fetchData();
        dispatchRedux(resetState('current_selection_period'))
    }, [newCompetition]);

    useEffect(()=>{
        // dispatchRedux(resetState('play_time'))
        dispatchRedux(resetState('time_left'))

    },[])



    return (
        <div>
            <section className="standing-wrapper text-center pt-1 pb-1">
                <div className="container">
                    <div className="row">
                        <div className="col-12 pb-2 ">
                       <span
                           className="heading-standings mt-2 d-flex gap-4 justify-content-center">
                           {newCompetition == 1 ? "KENYAN " : newCompetition == 2 ? "ENGLISH " : newCompetition == 3 ? "SPANISH " : newCompetition == 4 && "ITALIAN "}
                           LEAGUE
                           <span className="standing-time">SEASON {standingsData?.[0]?.season_id}</span>
                       </span>
                        </div>
                    </div>
                </div>
            </section>
            <div className="league-wrapper">
                <div className="match-standing-wrapper pt-0">
                    {!loadingData ? <table className={"mx-1 table"}>
                        <tbody style={{background: 'var(--CrashKali-body-bg)'}}>
                        <tr className="table-header">
                            <th className={'standings-menu'}>Position</th>
                            <th className={'standings-menu'}>Team</th>
                            <th className={'standings-menu'}>Played</th>
                            <th className={'standings-menu'}>Form</th>
                            <th className={'standings-menu'} style={{textAlign: 'center'}}>Points</th>

                        </tr>
                        {standingsData &&
                            Object.entries(standingsData).map(([key, standing],index) => (
                                <tr key={index}>
                                    <td className={'standings-menu'}>{standing?.position}</td>
                                    <td className="playing-teams-r standings-menu">
                                        <span className="team-badge d-flex align-items-center">
                                             <LazyLoadImage
                                                 src={standing?.icon_url}
                                                 alt="Virtual League"/>&nbsp;
                                            <span>{standing?.team_name}</span>
                                      </span>
                                    </td>
                                    <td className={'standings-menu'}>{standing?.games_played}</td>
                                    <td className={'standings-menu'}>
                                        <span className="team-form">
                                       {Array.from(standing?.form)?.map((item, index) => (
                                           <span key={index} title={`${item == 'L' ? ' Lost' : item == 'W' ? ' Won ' : ' Draw '}`}
                                                 className={`size-form btn btn-sm ${item == 'L' ? ' btn-danger ' : item == 'W' ? ' btn-success ' : ' btn-secondary '} mx-1`}
                                                 style={{width: '18%', cursor: 'default'}}><strong
                                               className={'bold'}>{item}</strong></span>
                                       ))}
                                         </span>
                                    </td>
                                    <td className={'standings-menu'}>{standing?.points}</td>

                                </tr>)
                            )
                        }

                        </tbody>
                    </table> : <SkeletonLoader/>}
                </div>
            </div>
        </div>
    );
};

export default Standing;
