import React, {useEffect, useCallback, useState} from "react";

import Header from './header/header';
import Footer from './footer/footer';
import SideBar from './sidebar/awesome/Sidebar';
import {JackpotMatchList, JackpotHeader} from './matches/index';
import makeRequest from "./utils/fetch-request";
import dailyJackpot from '../assets/img/banner/jackpots/DailyJackpot.png'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from "react-bootstrap/Container";

const Right = React.lazy(() => import('./right/index'));
const DailyJackpotTermsAndConditions = React.lazy(() => import('./pages/terms-and-conditions/DailyJackpotTermsAndConditions'))

const Jackpot = (props) => {
    const [matches, setMatches] = useState(null);

    const fetchData = useCallback(async () => {
        let match_endpoint = "/v1/matches/jackpot";

        const [match_result] = await Promise.all([
            makeRequest({url: match_endpoint, method: "get", data: null})
        ]);
        let [m_status, m_result] = match_result;
        if (m_status === 200) {
            setMatches(m_result);
        }

    }, []);

    useEffect(() => {

        const abortController = new AbortController();
        fetchData();

        return () => {
            abortController.abort();
        };
    }, [fetchData]);

    return (
        <>
            <Header/>
            <div className="amt">
                <div className="d-flex flex-row justify-content-between">
                    <SideBar loadCompetitions/>
                    <div className="gz home" style={{width: "100%"}}>
                        <div className="homepage">
                            <img src={dailyJackpot}/>
                            <Tabs
                                variant={'tabs'}
                                defaultActiveKey="home"
                                id=""
                                className="background-primary "
                                justify>
                                <Tab eventKey="home" title="Jackpot" className={'background-primary'}>
                                    {matches?.data?.length > 0 ? (
                                        <>
                                            <JackpotHeader jackpot={matches?.meta}/>
                                            <JackpotMatchList matches={matches}/>
                                        </>
                                    ) : (
                                        <div
                                            className={'text-white col-md-12 text-center background-primary shadow mt-2 p-3'}>
                                            There are no active jackpots at the moment.
                                        </div>
                                    )}
                                </Tab>
                                <Tab eventKey="results" title="Results">
                                    <JackpotHeader jackpot={matches?.meta}/>
                                    <div className="matches full-mobile sticky-top container">
                                        <div
                                            className="top-matches d-flex position-sticky shadow-lg p-4 mt-5 text-white">
                                            <div className="col-md-3 bold">
                                                TIME
                                            </div>
                                            <div className="col-md-6 bold">
                                                MATCH
                                            </div>
                                            <div className="col-md-3 bold">
                                                OUTCOME
                                            </div>
                                        </div>
                                    </div>

                                    {matches?.data.map((match, index) => (
                                        <div className={'matches full-width'} key={index}>
                                            <Container className="web-element">
                                                <div
                                                    className="col-md-12 shadow d-flex flex-row p-2 text-white top-matches">
                                                    <div className="col-md-3">
                                                        {match?.start_time}
                                                    </div>
                                                    <div className="col-md-6 d-flex flex-column">
                                                        <div className={'small'}>
                                                            {match?.category} | {match?.competition_name}
                                                        </div>
                                                        <div>
                                                            <div className={'bold'}>
                                                                {match?.home_team}
                                                            </div>
                                                            <div className={'bold'}>
                                                                {match?.away_team}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        {match?.outcome || '-'}
                                                    </div>
                                                </div>
                                            </Container>
                                        </div>
                                    ))}
                                </Tab>
                                <Tab eventKey="terms" title="Terms & Conditions" >
                                    <DailyJackpotTermsAndConditions/>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                    <Right jackpot={true} jackpotData={matches?.meta}/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Jackpot
