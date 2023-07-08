import React, {useCallback, useEffect, useState} from 'react';
import "./standing.css"
import makeRequest from "../../../utils/fetch-request";
import {getFromLocalStorage} from "../../../utils/local-storage";
import {Spinner} from "react-bootstrap";
import {LazyLoadImage} from "react-lazy-load-image-component";

const Standing = () => {
    const [standings, setStandings] = useState([]);
    const [loading, setLoading] = useState(false);
    const newCompetition = new URL(window.location).searchParams.get('competition_id') || getFromLocalStorage("kiron_search_data")?.competition_id

    let endpoint = "/v1/nare-league/standings"
    const fetchData = useCallback(async () => {
        setLoading(true)
        endpoint = endpoint.replaceAll(" ", '')

        const kiron_data = {
            competition_id: new URL(window.location).searchParams.get('competition_id') || getFromLocalStorage("kiron_search_data")?.competition_id
        }
        await makeRequest({url: endpoint, method: "POST", data: kiron_data}).then(([status, result]) => {
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
                    {!loading ? <table className={"mx-1 table"}>
                        <tbody style={{background: '#fff'}}>
                        <tr className="table-header">
                            <th className={'standings-menu'}>Position</th>
                            <th className={'standings-menu'}>Team</th>
                            <th className={'standings-menu'}>Points</th>
                            <th className={'standings-menu'} style={{textAlign: 'center'}}>Played</th>
                            <th className={'standings-menu text-center'}>Form</th>
                        </tr>
                        {standings &&
                            Object.entries(standings).map(([key, standing],index) => (
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
