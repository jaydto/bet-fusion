import React, {useEffect, useCallback, useState} from "react";

import Header from './header/header';
import Footer from './footer/footer';
import SideBar from './sidebar/awesome/Sidebar';
import {JackpotMatchList, JackpotHeader} from './matches/index';
import makeRequest from "./utils/fetch-request";
import dailyJackpot from '../assets/img/banner/jackpots/DailyJackpot.png'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

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
                                className="background-primary"
                                justify>
                                <Tab eventKey="home" title="Jackpot" className={'background-primary'}>
                                    <JackpotHeader jackpot={matches?.meta}/>
                                    <JackpotMatchList matches={matches}/>
                                </Tab>
                                <Tab eventKey="results" title="Results">
                                    Jackpot results will be shown here...
                                </Tab>
                                <Tab eventKey="terms" title="Terms & Conditions">
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
