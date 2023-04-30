import React, {useCallback, useEffect, useState} from 'react';
import "./results.css"
import {getFromLocalStorage} from "../../../utils/local-storage";
import makeRequest from "../../../utils/fetch-request";

const KironResults = () => {
    const [fetching, setFetching] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resulted, setResulted] = useState([]);
    let endpoint = "/v1/nare-league/live"
    const kironSearchCompetition=getFromLocalStorage("kiron_search_data")?.competition_id
    const [newData, setNewData] = useState({
        round_id: '116892538'
    });

    const fetchData = useCallback(async () => {

        endpoint = endpoint.replaceAll(" ", '')

        const kiron_data= newData


        console.log(kiron_data)
        await makeRequest({url: endpoint, method: "POST", data:kiron_data }).then(([status, result]) => {
            if (status == 200) {
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

    }, [newData]);

    console.log("resulted", resulted)
    return (
        <>
            <section className="standing-wrapper text-center pt-2 pb-2">
            <div className="container">
                <div className="row">
                    <div className="col-12 pb-2"><span
                        className="standing-heading">{kironSearchCompetition==1?"Kenyan ":kironSearchCompetition==2?"English ":kironSearchCompetition==3?"Spanish ":"Italian "}League</span></div>
                    <div className="col-12"><span className="standing-time">15:38</span></div>
                </div>
            </div>
        </section>
            <div className="league-games-wrapper">

            <div>
                <div className="playing-games-wrapper float-left w-100 small">
                    <div className="league-wrapper">

                        <div className="matches-wrapper pt-2">
                            {resulted &&
                                Object.entries(resulted).map(([key, results]) => (
                                    <div className="live-match-selection pt-1 pb-1">
                                        <div className="container">
                                            <div className="row px-3">
                                                <div className="col-6 text-right pt-1"><span className="team-jersey"><img
                                                    src={results?.home_team_image}
                                                    alt="Nare League"/></span> <a href="#"
                                                                                      style={{color: "var(--black)"}}>
                                                    <span className="home-team-r bold px-2">{results.home_team}</span>
                                                    <span className="ml-2 black-txt">{results.home_scores?.length}</span></a></div>

                                                <div className="col-6 text-left pt-1">
                                                    <a href="#" className={"d-flex justify-content-between align-items-center"} style={{color: "var(--black)"}}>
                                                    <span className="mr-2 red-txt">{results.away_scores?.length}</span>
                                                    <span className="away-team-r bold px-2">{results.away_team}</span>
                                                </a>
                                                    <span className="team-jersey"><img
                                                        src={results?.away_team_image}
                                                        alt="Nare League"/></span>
                                                </div>
                                                {/*<div className="col-12">*/}
                                                {/*    <div className="row">*/}
                                                {/*        <div className="col-time text-right"><span*/}
                                                {/*            className="score-time"><span>41'</span></span></div>*/}
                                                {/*        <div className="col-time-c text-center"><strong*/}
                                                {/*            className="score-time"></strong></div>*/}
                                                {/*        <div className="col-time text-left"><span*/}
                                                {/*            className="score-time"><span></span></span></div>*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}
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

export default KironResults;
