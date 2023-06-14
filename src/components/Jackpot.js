import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import './test.css'
import useWindowDimensions from "./header/Dimensions";
import makeRequest from "./utils/fetch-request";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import {JackpotMatchList} from "./matches";
import Select from "react-select";
import Container from "react-bootstrap/Container";
import DailyJackpotTermsAndConditions from "./pages/terms-and-conditions/DailyJackpotTermsAndConditions";
import {Context} from "../context/store";

const Header = React.lazy(() => import('./header/header'));
const Footer = React.lazy(() => import('./footer/footer'));
const Right = React.lazy(() => import('./right'));
const SideBar = React.lazy(() => import('./sidebar/awesome/Sidebar'))
const  Jackpot= () => {
    const [matches, setMatches] = useState(null);
    const [finishedJackpots, setFinishedJackpots] = useState([])
    const {height, width} = useWindowDimensions();
    const [state]=useContext(Context)

    const fetchData = useCallback(async (jackpot_id = '', jackpot_status = '') => {
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
        <div className={'flex-item'}>
            <div className="item4"><Header/></div>
            <div className="flex-container">
                <div className="item1"> <SideBar loadCompetitions/></div>
                <div className="item2 size-all-markets" >
                    <div className="gz home" style={{width: "100%", overflowX: "clip"}}>
                        <div className="homepage">
                            <Tabs
                                variant={'tabs'}
                                defaultActiveKey="home"
                                id=""
                                className="background-primary "
                                justify>
                                <Tab eventKey="home" title="Jackpot" className={'background-primary'}>
                                    <img src={"https://storage.googleapis.com/nareimages/carousel/jackpot.webp"}/>
                                    {matches?.data?.length > 0 ? (
                                        <>
                                            {/*<JackpotHeader jackpot={matches?.meta}/>*/}
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

                                    {/*<JackpotHeader jackpot={matches?.meta}/>*/}
                                    <img src={"https://storage.googleapis.com/nareimages/carousel/jackpot.webp"}/>

                                    <div className="matches full-mobile sticky-top container">
                                        <div
                                            className="top-matches d-flex position-sticky shadow-lg p-4 mt-5 text-white ">
                                            <div className="col-md-3 col-sm-3 bold">
                                                TIME
                                            </div>
                                            <div className="col-md-3 col-sm-4 bold">
                                                MATCH COMPETITION
                                            </div>
                                            <div className="col-md-3 col-sm-3 bold">
                                                MATCH OUTCOME
                                            </div>
                                            <div className="col-md-2 col-sm-4 bold">
                                                WINNING OUTCOME
                                            </div>
                                        </div>
                                    </div>

                                    {matches?.data.map((match, index) => (
                                        <div className={'matches full-width'} key={index}>
                                            <Container className={`${width<=767?"":"web-element"}`}>
                                                <div
                                                    className="col-md-12 shadow d-flex flex-row p-2 text-white top-matches">
                                                    <div className="col-md-3  col-sm-3">
                                                        {match?.start_time}
                                                    </div>
                                                    <div className="col-md-4  col-sm-4 d-flex flex-column">
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
                                                    <div className="col-md-3 col-sm-3">
                                                        {match?.outcome || '-'}
                                                    </div>
                                                    <div className="col-md-2 col-sm-2">
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
                </div>
                <div className="item3">
                    <Right jackpot={true} jackpotData={matches?.meta}  test={true}/>
                </div>

            </div>
            <div className="item6"><div className={"footer-mobile-none"}>
                <Footer/>
            </div></div>
        </div>


    );
};

export default React.memo(Jackpot);
