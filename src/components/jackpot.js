import React, {useEffect, useCallback, useState} from "react";

import Header from './header/header';
import Footer from './footer/footer';
import SideBar from './sidebar/awesome/Sidebar';
import {JackpotMatchList, JackpotHeader} from './matches/index';
import makeRequest from "./utils/fetch-request";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from "react-bootstrap/Container";
import Select from "react-select";
import {getFromLocalStorage} from "./utils/local-storage";
import useWindowDimensions from "./header/Dimensions";
import {getBetslip, getJackpotBetslip} from "./utils/betslip";

const Right = React.lazy(() => import('./right/index'));
const DailyJackpotTermsAndConditions = React.lazy(
    () => import('./pages/terms-and-conditions/DailyJackpotTermsAndConditions'))

const Jackpot = (props) => {
    const [matches, setMatches] = useState(null);
    const [finishedJackpots, setFinishedJackpots] = useState([])
    const [user, setUser] = useState(getFromLocalStorage("user"));
    const {height, width} = useWindowDimensions();

    // const findPostableSlip = () => {
    //     let betslips = getJackpotBetslip() || {};
    //     var values = Object.keys(betslips).map(function (key) {
    //         return betslips[key];
    //     });
    //     return values;
    // };

    const fetchData = useCallback(async (jackpot_id = '', jackpot_status = '') => {
        // let betslip=findPostableSlip();
        let match_endpoint = "/v1/matches/jackpot";
        if (jackpot_id !== '') {
            match_endpoint += '?jackpot_id=' + jackpot_id
        }
        if (jackpot_status !== '') {
            match_endpoint += "&jackpot_status=" + jackpot_status
        }

        const [match_result] = await Promise.all([
            makeRequest({url: match_endpoint, method: "get", data: null})
        ]);
        let [m_status, m_result] = match_result;
        if (m_status === 200) {
            setMatches(m_result);
            console.log("jackpot results",m_result)

        }

    }, []);

    const jackpotHistory = useCallback(async () => {

        let endpoint = "/v1/matches/jp-history"

        const [match_result] = await Promise.all([
            makeRequest({url: endpoint, method: "get", data: null})
        ]);

        let [m_status, m_result] = match_result;

        if (m_status === 200) {
            m_result?.map((result) => {
                result.value = result
                result.label = result?.jackpot_name
                return result
            })
            setFinishedJackpots(m_result)
        }
    })

    useEffect(() => {

        const abortController = new AbortController();
        fetchData();
        jackpotHistory()

        return () => {
            abortController.abort();
        };
    }, [fetchData]);

    const loadJPResults = (jackpot) => {
        fetchData(jackpot?.jackpot_event_id, jackpot?.jackpot_status)
    }

    return (
        <>
            <Header/>
            <div className={(width<=514?user?"user_logged":"amt":"amt")}>
                <div className="d-flex flex-row justify-content-between">
                    <SideBar loadCompetitions/>
                    <div className="gz home" style={{width: "100%", overflowX: "clip"}}>
                        <div className="homepage">
                            {/*<img src={dailyJackpot}/>*/}
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
                                    <div className="row shadow-lg">
                                        <h4 className={'text-white'}>Jackpot Results</h4>
                                        <Select options={finishedJackpots} className={'bg-secondary'}
                                                menuPortalTarget={document.body}
                                                menuPosition="fixed"
                                                isSearchable={true}
                                                styles={{
                                                    menuPortal: (provided) => ({...provided, zIndex: 9999}),
                                                    menu: (provided) => ({...provided, zIndex: 9999})
                                                }}
                                                onChange={loadJPResults}/>
                                    </div>

                                    <JackpotHeader jackpot={matches?.meta}/>
                                    <div className="matches full-mobile sticky-top container">
                                        <div
                                            className="top-matches d-flex position-sticky shadow-lg p-4 mt-5 text-white">
                                            <div className="col-md-3 bold">
                                                TIME
                                            </div>
                                            <div className="col-md-4 bold">
                                                MATCH
                                            </div>
                                            <div className="col-md-3 bold">
                                                OUTCOME
                                            </div>
                                            <div className="col-md-4 bold">
                                                WINNING OUTCOME
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
                                                    <div className="col-md-4 d-flex flex-column">
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
                                                    <div className="col-md-2">
                                                        {match?.winning_outcome || '-'}
                                                    </div>
                                                </div>
                                            </Container>
                                        </div>
                                    ))}
                                </Tab>
                                <Tab eventKey="terms" title="Terms & Conditions">
                                    <DailyJackpotTermsAndConditions/>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                    <Right jackpot={true} jackpotData={matches?.meta} />


                </div>
            </div>
            <div className={"mobile-remove"}>
            <Footer/>
            </div>
        </>
    )
}

export default Jackpot
