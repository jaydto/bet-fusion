import React from 'react';
import "./standing.css"

const Standing = () => {
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
