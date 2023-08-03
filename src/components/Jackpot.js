import React, {useCallback, useEffect, useState} from 'react';
import './test.css'
import "../assets/css/jackpot.css"
import useWindowDimensions from "./header/Dimensions";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import {FormatDate, FormatDate2, JackpotMatchList} from "./matches";
import Select from "react-select";
import "../assets/css/animationJackpot.css"
import DailyJackpotTermsAndConditions from "./pages/terms-and-conditions/DailyJackpotTermsAndConditions";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {ToastContainer} from "react-toastify";
import moment from "moment/moment";
import SkeletonJackpot from "./pages/skeletonLoadersWeb/SkeletonJackpot";
import SkeletonMobileJackpot from "./pages/skeletonLoadersWeb/SkeletonLoaderJackpotMobile";
import caution from '../assets/img/mobile/caution.png'
import {useDispatch, useSelector} from "react-redux";
import {jackpotById, jackpotHistoryData, matchesJackpot} from "../redux/matchesSlice";

const Header = React.lazy(() => import('./header/header'));
const Right = React.lazy(() => import('./right'));
const Jackpot = React.memo(
    () => {
        const {width} = useWindowDimensions();
        const dispatchRedux = useDispatch()
        const jackpot_data = useSelector((state) => state.matchesData.jackpot_data)
        const jackpot_history = useSelector((state) => state.matchesData.jackpot_history)
        const jackpot_by_id = useSelector((state) => state.matchesData.jackpot_by_id)
        const loading = useSelector((state) => state.matchesData.jackpot_loading)

        const fetchData = useCallback(async () => {
            dispatchRedux(matchesJackpot())
        }, []);

        const fetchJackpotById = useCallback(async (jackpot_id = '', jackpot_status = '') => {
            const trimmedStatus = jackpot_status.trim();
            const jackpotData = {
                jackpot_id: jackpot_id,
                jackpot_status: trimmedStatus
            }
            dispatchRedux(jackpotById(jackpotData))
        }, []);

        const jackpotHistory = useCallback(async () => {
            dispatchRedux(jackpotHistoryData())
        })

        useEffect(() => {
            const abortController = new AbortController();
            fetchData().then(() => {
                jackpotHistory()
            });
            return () => {
                abortController.abort();
            };
        }, []);

        const CountDownJackpot = () => {
            // Get the first match from the array
            const first_match = jackpot_data?.meta?.start_time
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
                    {jackpot_data?.meta?.start_time &&
                        <p className={"text-expiry-style"}>Expires on&nbsp;
                            <FormatDate live={0} start_time={jackpot_data?.meta?.start_time}
                                        match_time={jackpot_data?.meta?.start_time}/>
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

            return (

                <div className="scroller">
                        <span>
                            {jackpot_data?.meta?.prizes?.map((prize, index) => {
                                    return (
                                        <div key={index}>
                                            {prize}<br/>
                                        </div>
                                    )
                                }
                            )}
                        </span>
                </div>

            );
        };


        const loadJPResults = (jackpot) => {
            fetchJackpotById(jackpot?.value?.jackpot_event_id, jackpot?.value?.jackpot_status)
        }

        const [activeTab, setActiveTab] = useState('home'); // Set the initially active tab here

        const handleTabSelect = (eventKey) => {
            setActiveTab(eventKey);
        };

        return (
            <div className={'flex-item jackpot-container'}>
                <div className="item4">
                    <Header jackpot={true}/>
                    <ToastContainer/>
                </div>
                <div className={`flex-container jackpot flex-column  top-spacing-page-no-download-jackpot`}>
                    <div className="item2 size-all-markets jp-header-banner">
                        <div className={"jp-banner-image"}>
                            <div
                                className="d-flex h-100 w-100 justify-content-around  px-5 align-items-center jackpot-mobile-appearance">
                                {jackpot_data?.meta?.start_time && <div className="jackpot-counter-time">

                                    <div className="jackpot-count-text">
                                        <div className="jackpot-text">
                                            {jackpot_data && 'Time left'}
                                        </div>
                                        {jackpot_data?.meta?.start_time && <CountDownJackpot/>}
                                    </div>
                                </div>}
                                {jackpot_data?.meta?.start_time && <div className="jackpot-pages-information">
                                    <div className={`predict ${jackpot_data ? '' : 'd-none'}`}>
                                        <span>
                                            <span className="predict-text">
                                                Predict {jackpot_data?.meta?.total_games} Games
                                            </span>&nbsp;
                                            <span className={"predict-text-2"}>
                                                To Win
                                            </span>
                                        </span>
                                        {jackpot_data?.meta?.jackpot_amount && <span className={"predict-amount"}>
                                           KES&nbsp;
                                            <span className={"predict-amount-kes"}>
                                            {Number(jackpot_data?.meta?.jackpot_amount).toLocaleString()}
                                        </span>
                                        </span>}
                                        <PrizeComponent/>

                                    </div>

                                </div>}
                                {(!jackpot_data?.meta?.start_time == null && !jackpot_data?.meta?.length > 0) &&
                                    <div className={'no-jackpot-text'}>There are no Jackpot Events at the moment</div>}
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
                                        {loading ? (
                                            // Show skeleton loaders or loading indicators while data is being fetched
                                            <>
                                                {width < 1259 ? <SkeletonMobileJackpot/> : <SkeletonJackpot/>}
                                            </>
                                        ) : (
                                            <>
                                                {jackpot_data && jackpot_data?.data?.length > 0 ? (
                                                    <JackpotMatchList matches={jackpot_data} jackpot={true}/>
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
                                                )}
                                            </>
                                        )}


                                    </Tab>
                                    <Tab eventKey="results" title="Results">
                                        <div className="row shadow-lg">
                                            <h4 className={'text-white'}>Jackpot Results</h4>
                                            <Select options={jackpot_history} className={'bg-secondary'}
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
                                                    OUTCOME
                                                </div>
                                                <div className="col-md-2 col-sm-4 bold ">
                                                    RESULT
                                                </div>
                                            </div>
                                        </div>

                                        {(jackpot_by_id)?.data?.map((match, index) => (
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
                    {(activeTab === "home" && !jackpot_data?.meta?.length > 0) &&
                        <div className="item3">
                        <Right jackpot={true} jackpotData={jackpot_data?.meta} test={true} matches={jackpot_data}/>
                    </div>
                    }

                </div>
            </div>
        );
    });

export default React.memo(Jackpot);
