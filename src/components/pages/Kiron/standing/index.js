import React, {useCallback, useEffect, useState} from 'react';
import "./standing.css"
import makeRequest from "../../../utils/fetch-request";
import {getFromLocalStorage} from "../../../utils/local-storage";
import {Spinner} from "react-bootstrap";


const Standing = () => {
    const [standings, setStandings] = useState([]);
    const [loading, setLoading] = useState(false);

    const newCompetition=new URL(window.location).searchParams.get('competition_id')

    let endpoint = "/v1/nare-league/standings"
    const fetchData = useCallback(async () => {
        setLoading(true)
        endpoint = endpoint.replaceAll(" ", '')

        const kiron_data= {
            competition_id: new URL(window.location).searchParams.get('competition_id')||getFromLocalStorage("kiron_search_data")?.competition_id
        }
        await makeRequest({url: endpoint, method: "POST", data:kiron_data }).then(([status, result]) => {
            if (status == 200) {
                setStandings(result?.data || result)
                setLoading(false)

            }
        });

    }, []);


    useEffect(() => {
        fetchData();
    }, [newCompetition]);


    return (
        <div>
            <section className="standing-wrapper text-center pt-1 pb-1">
                <div className="container">
                    <div className="row">
                        <div className="col-12 pb-2">
                       <span
                           className="standing-heading">{newCompetition==1?"KENYAN ":newCompetition==2?"ENGLISH ":newCompetition==3?"SPANISH ":"ITALIAN "} LEAGUE</span>
                        </div>
                        <div className="col-12"><span className="standing-time">STANDING</span></div>
                    </div>
                </div>
            </section>
            <div className="league-wrapper">
                <div className="match-standing-wrapper pt-0">
                    {!loading?<table className={"mx-1 table"}>
                        <tbody style={{background:'#fff'}}>
                        <tr className="table-header">
                            <th className={''}>Position</th>
                            <th className={''}>Team</th>
                            <th className={''}>Points</th>
                            <th className={''}>Played</th>
                            <th className={'text-center'}>Form</th>
                        </tr>
                        { standings &&
                            Object.entries(standings).map(([key, standing]) => (
                                <tr>
                                    <td className={''}>{standing?.position}</td>
                                    <td className="playing-teams-r">
                                    <span className="team-badge">
                                         <img
                                             src={standing?.icon_url}
                                             alt="Nare League"/>&nbsp;
                                        {standing?.team_name}
                                  </span>
                                    </td>
                                    <td>{standing?.points}</td>
                                    <td>{standing?.games_played}</td>
                                    <td><span className="team-form">
                                       {Array.from(standing?.form)?.map((item) => (
                                           <span title={`${item=='L'?' Lost':item=='W'?' Won ':' Draw '}`} className={`btn btn-sm ${item=='L'?' btn-danger ':item=='W'?' btn-success ':' btn-dark '} mx-1`} style={{width: '18%', cursor:'default'}}><strong className={'bold'}>{item}</strong></span>
                                       ))}
                                         </span>
                                    </td>


                                </tr>)
                            )
                        }
                        
                        </tbody>
                    </table>: <div className={`text-center mt-2 text-white d-block w-100`}>
                        <Spinner animation={'grow'} size={'lg'}/>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default Standing;
