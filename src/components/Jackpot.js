import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import './test.css'
import "../assets/css/jackpot.css"
import useWindowDimensions from "./header/Dimensions";
import makeRequest from "./utils/fetch-request";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import {FormatDate, FormatDate2, JackpotMatchList} from "./matches";
import Select from "react-select";
import "animate.css"
import "../assets/css/animationJackpot.css"
import Container from "react-bootstrap/Container";
import DailyJackpotTermsAndConditions from "./pages/terms-and-conditions/DailyJackpotTermsAndConditions";
import {Context} from "../context/store";
import caution from "../assets/img/mobile/caution.png"
import {LazyLoadImage} from "react-lazy-load-image-component";
import jackpotbg from "../assets/img/banner/products/jackpot-bg.jpg"
import Skeleton1 from "./skeleton/skeleton";
import {ToastContainer} from "react-toastify";
import moment from "moment/moment";

const Header = React.lazy(() => import('./header/header'));
const Footer = React.lazy(() => import('./footer/footer'));
const Right = React.lazy(() => import('./right'));
const SideBar = React.lazy(() => import('./sidebar/awesome/Sidebar'))

const Jackpot = React.memo(
    () => {
        const [matches, setMatches] = useState(null);
        const [loading, setLoading] = useState(false)
        const [finishedJackpots, setFinishedJackpots] = useState([])
        const {height, width} = useWindowDimensions();
        const [state] = useContext(Context)

        const fetchData = useCallback(async (jackpot_id = '', jackpot_status = '') => {
            setLoading(true)
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
                setLoading(false)
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

        const CountDownJackpot = () => {
            // Get the first match from the array
            const first_match = matches?.meta?.start_time
            const [countdownDay, setCountdownDay] = useState('');
            const [countdownHours, setCountdownHours] = useState('');
            const [countdownMinutes, setCountdownMinutes] = useState('');
            const [countdownSeconds, setCountdownSeconds] = useState('');

            useEffect(() => {
                const interval = setInterval(() => {
                    const now = moment();
                    const start = moment(first_match, 'YYYY-MM-DD HH:mm');
                    const diff = start.diff(now);
                    const countdown = moment.duration(diff);

                    const days = countdown.days();
                    const hours = countdown.hours();
                    const minutes = countdown.minutes();
                    const seconds = countdown.seconds();

                    // setCountdown(`${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`);
                    setCountdownDay(days)
                    setCountdownSeconds(seconds)
                    setCountdownHours(hours)
                    setCountdownMinutes(minutes)
                    if (diff <= 0) {
                        clearInterval(interval);
                    }
                }, 1000);

                return () => clearInterval(interval);
            }, [first_match?.meta?.start_time]);


            return (
                <div>
                    {matches?.meta?.start_time &&
                        <p className={"text-expiry-style"}>Expires on&nbsp;
                            <FormatDate live={0} start_time={matches?.meta?.start_time}
                                        match_time={matches?.meta?.start_time}/>
                        </p>}
                    {activeTab === "home" && <p className={"text-light count-down-jackpot d-flex gap-4"}>
                        <span className="days d-flex flex-column">
                            <span className={"counter-jackpot time-box__time"}>
                                {countdownDay}
                            </span>
                            <span className={'jackpot-text-info'}>
                                Days
                            </span>
                        </span>
                        <span className="hours d-flex flex-column">
                            <span className={"counter-jackpot time-box__time"}>
                                {countdownHours}
                            </span>
                            <span className={'jackpot-text-info'}>
                                Hours
                            </span>
                        </span>
                        <span className="Minutes d-flex flex-column">
                            <span className={"counter-jackpot time-box__time"}>
                                {countdownMinutes}
                            </span>
                            <span className={'jackpot-text-info'}>
                                Minutes
                            </span>
                        </span>
                        <span className="Seconds d-flex flex-column">
                            <span className={"counter-jackpot time-box__time"}>
                                {countdownSeconds}
                            </span>
                            <span className={'jackpot-text-info'}>
                                Seconds
                            </span>
                        </span>
                    </p>}
                </div>
            );
        };


        const PrizeComponent = () => {
            const [currentIndex, setCurrentIndex] = useState(0);
            const prizesJSON = JSON.stringify(matches?.meta?.prizes);
            const cleanedJSON = prizesJSON?.replace(/[\[\]"]/g, '');

            return (

                <div className="scroller">
                        <span>
                            {matches?.meta?.prizes?.map((prize) => {
                                    return (
                                        <>
                                            {prize}<br/>
                                        </>
                                    )
                                }
                            )}
                        </span>
                </div>

            );
        };


        const loadJPResults = (jackpot) => {
            fetchData(jackpot?.jackpot_event_id, jackpot?.jackpot_status)
        }
        const urlPath = window.location.pathname
        const showDownload = (!urlPath.includes("nare-games") && !urlPath.includes("gameplay") && !urlPath.includes("smart-play") && !urlPath.includes("betslip-slip") && !urlPath.includes("nare-league") && !urlPath.includes("bet-history") && !urlPath.includes("standings") && !urlPath.includes("results") && !urlPath.includes("casino") && !urlPath.includes("jackpot"))

        const [activeTab, setActiveTab] = useState('home'); // Set the initially active tab here

        const handleTabSelect = (eventKey) => {
            setActiveTab(eventKey);
        };
        return (
            <div className={'flex-item'}>
                <div className="item4">
                    <Header jackpot={true}/>
                    <ToastContainer/>
                </div>
                <div className={`flex-container flex-column ${!showDownload && 'top-spacing-page-no-download'}`}>
                    <div className="item2 size-all-markets jp-header-banner">
                        <div className={"jp-banner-image"}>
                            <div
                                className="d-flex h-100 w-100 justify-content-around  px-5 align-items-center jackpot-mobile-appearance">
                                <div className="jackpot-counter-time">

                                    <div className="jackpot-count-text">
                                        <div className="jackpot-text">
                                            {matches && 'Time left'}
                                        </div>
                                        {matches?.meta && <CountDownJackpot/>}
                                    </div>
                                </div>
                                <div className="jackpot-pages-information">
                                    <div className={`predict ${matches ? '' : 'd-none'}`}>
                                        <span>
                                            <span className="predict-text">
                                                Predict {matches?.meta?.total_games} Games
                                            </span>&nbsp;
                                            <span className={"predict-text-2"}>
                                                To Win
                                            </span>
                                        </span>
                                        {matches?.meta?.jackpot_amount && <span className={"predict-amount"}>
                                           KES&nbsp;
                                            <span className={"predict-amount-kes"}>
                                            {Number(matches?.meta?.jackpot_amount).toLocaleString()}
                                        </span>
                                        </span>}
                                        <PrizeComponent/>

                                    </div>

                                </div>
                            </div>


                        </div>
                        <div className="gz home jackpot-page-structure" style={{width: "100%", overflowX: "clip"}}>
                            <div className="homepage mobile-full-height ">
                                <Tabs
                                    variant={'tabs'}
                                    defaultActiveKey={activeTab}
                                    id=""
                                    className="background-primary "
                                    justify
                                    onSelect={handleTabSelect}>
                                    <Tab eventKey="home" title="Jackpot" className={'background-primary'}>

                                        {matches?.data?.length > 0 ? (
                                            <>
                                                <JackpotMatchList matches={matches} jackpot={true}/>
                                            </>
                                        ) : (
                                            loading ? (
                                                <>
                                                    <Skeleton1/>
                                                </>
                                            ) : (
                                                <div
                                                    className={'text-white col-md-12 text-center background-primary shadow mt-2 p-3 d-flex flex-column  align-items-center justify-content-center'}
                                                    style={{height: "30vh"}}>
                                                    <LazyLoadImage src={caution}
                                                                   className={'jackpot-image-caution'}/>
                                                    <p className={'jackpot-text-inactive'}>
                                                        1 Million Daily Jackpot not available. Please check back
                                                        later.
                                                    </p>
                                                </div>
                                            )
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

                                        <div className="matches full-mobile sticky-top container">
                                            <div
                                                className="top-matches d-flex position-sticky shadow-lg p-4 mt-5 text-white ">
                                                <div className="col-md-3 col-sm-3 bold">
                                                    TIME
                                                </div>
                                                <div className="col-md-3 col-sm-4 bold jackpot-game-header-info-games">
                                                    GAME
                                                </div>
                                                <div className="col-md-3 col-sm-3 bold ">
                                                    PICK
                                                </div>
                                                <div className="col-md-2 col-sm-4 bold ">
                                                    RESULT
                                                </div>
                                            </div>
                                        </div>

                                        {matches?.data.map((match, index) => (
                                            <div className={'matches full-width'} key={index}>
                                                <div className={`${width <= 767 ? "w-100 px-2" : "web-element px-2"}`}>
                                                    <div
                                                        className="col-md-12 shadow d-flex flex-row p-4 text-white top-matches jackpot-results-bg">
                                                        <div
                                                            className="col-md-3  col-sm-3 jackpot-mobile-top-results-space  d-flex align-items-center">
                                                            <FormatDate2 live={0} start_time={match?.start_time}
                                                                         match_time={match?.start_time}/>
                                                        </div>
                                                        <div
                                                            className="col-md-4  col-sm-4 d-flex flex-column jackpot-mobile-top-results-space">
                                                            <div>
                                                                <div className={'bold'}>
                                                                    {match?.home_team}
                                                                </div>
                                                                <div className={'bold'}>
                                                                    {match?.away_team}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="col-md-3 col-sm-3 jackpot-mobile-top-results-space d-flex align-items-center">
                                                            {match?.outcome || '-'}
                                                        </div>
                                                        <div
                                                            className="col-md-2 col-sm-3 jackpot-mobile-top-results-space d-flex align-items-center">
                                                            {match?.winning_outcome || '-'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Tab>
                                    <Tab eventKey="terms" title="T & C">
                                        <DailyJackpotTermsAndConditions/>
                                    </Tab>
                                </Tabs>


                            </div>

                        </div>
                    </div>
                    {activeTab === "home" && <div className="item3">
                        <Right jackpot={true} jackpotData={matches?.meta} test={true} matches={matches}/>
                    </div>}

                </div>
            </div>
        );
    });

export default React.memo(Jackpot);
