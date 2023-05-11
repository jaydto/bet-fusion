import React, {useCallback, useEffect, useState} from 'react';
import "./standing.css"
import makeRequest from "../../../utils/fetch-request";


const Standing = () => {
    const [standings, setStandings] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newData, setNewData] = useState({
        round_id: '3'
    });
    let endpoint = "/v1/nare-league/standings"
    const fetchData = useCallback(async () => {

        endpoint = endpoint.replaceAll(" ", '')

        const kiron_data= newData


        console.log(kiron_data)
        await makeRequest({url: endpoint, method: "POST", data:kiron_data }).then(([status, result]) => {
            if (status == 200) {
                setStandings(standings.length > 0 ? {...standings, ...result?.data} : result?.data || result)
                setFetching(false)
                setLoading(false)
                console.log("standings",result)

            }
        });

    }, []);

    useEffect(() => {
        fetchData();

    }, [newData]);

    return (
        <div>
            <section className="standing-wrapper text-center pt-1 pb-1">
                <div className="container">
                    <div className="row">
                        <div className="col-12 pb-2"><span className="standing-heading">English League #2804999</span>
                        </div>
                        <div className="col-12"><span className="standing-time">STANDING</span></div>
                    </div>
                </div>
            </section>
            <div className="league-wrapper">
                <div className="match-standing-wrapper pt-0">
                    <table className={"mx-3 table"}>
                        <tbody>
                        <tr className="table-header">
                            <th className={''}>P</th>
                            <th className={''}>Team</th>
                            <th className={''}>Pts</th>
                            <th className={'text-center'}>Form</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td className="playing-teams-r"><span className="team-badge">
                              </span>
                                <div>West Ham</div>
                            </td>
                            <td>29</td>
                            <td><span className="team-form"><span className="btn btn-sm btn-danger"  style={{width:'18%'}}>L</span><span
                                className="btn btn-sm btn-success" style={{width:'18%'}}>W</span><span
                                className="btn btn-sm btn-success" style={{width:'18%'}}>W</span><span
                                className="btn btn-sm btn-success" style={{width:'18%'}}>W</span><span
                                className="btn btn-sm btn-dark" style={{width:'18%'}}>D</span></span></td>
                        </tr>
                        
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Standing;
