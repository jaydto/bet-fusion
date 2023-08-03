import React, {useCallback, useContext, useEffect, useState} from "react";
import {StoreContext} from '../../../../context/store';
import {getFromLocalStorage, setLocalStorage} from "../../../utils/local-storage";
import {Spinner} from "react-bootstrap";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import './kiron.css';
import {Link, useNavigate, useParams} from 'react-router-dom';

import {useDispatch, useSelector} from 'react-redux'; // Import useDispatch hook
import {
    nareLeagueBetDetails,
    nareLeagueBetHistory,
    nareLeagueOldBetDetails,
    nareLeagueOldBets, resetState
} from '../../../../redux/nareLeague';

const OldBetDetails = React.lazy(() => import('./OldBetDetails'))
const ActiveBetDetails = React.lazy(() => import('./ActiveBetDetails'))

const Styles = {
    contain: {
        background: '#22323e !important',
    },
    headers: {
        // background:'#18242f',
        color: 'var(--light)',
        padding: '10px 40px 10px',
    },
    bet: {
        // background:'#1e2d3b',
        padding: '10px',
        color: 'var(--light)',
        opacity: 0.8,
        marginBottom: '1px'
    }
};

const KironBetHistory = React.memo(
    (props) => {
        const dispatchRedux = useDispatch()
        const navigate = useNavigate();
        const {betID} = useParams()

        const [activeTab, setActiveTab] = useState(getFromLocalStorage("tab_history_kiron") || "active");
        const loading = useSelector((state) => state.nareLeague.loading)
        //functions to fetch active and old bets from the API
        const fetchData = useCallback(async () => {
            dispatchRedux(nareLeagueBetHistory())
        }, []);

        const fetchOldBetDetails = useCallback(async () => {
            const data = {
                'bet_id': betID
            };
            await dispatchRedux(nareLeagueOldBetDetails(data))
        }, [betID]);

        const fetchOldBets = useCallback(async () => {
            dispatchRedux(nareLeagueOldBets())
        }, []);

        const fetchActiveBetDetails = useCallback(async () => {

            const betIdData = {
                bet_id: betID,
            };
            await dispatchRedux(nareLeagueBetDetails(betIdData))

        },[betID]);

        //function to fetch old bet details
        useEffect(() => {
            if (betID) {
                // If there's a betID, it means we're viewing the details of a specific bet,
                if (activeTab == "active")
                {
                    fetchActiveBetDetails()
                } else {
                    fetchOldBetDetails()
                }
            }else{
                // When changing the active tab, fetch the data accordingly
                if (activeTab == "active")
                {
                    fetchData();
                   dispatchRedux(resetState('current_selection_period'))
                } else {
                    fetchOldBets();
                    dispatchRedux(resetState('current_selection_period'))
                }
            }


        }, [activeTab, betID]);

        const activeBetHistory = useSelector((state) => state.nareLeague.bet_history_data)
        const oldBetHistory = useSelector((state) => state.nareLeague.old_bets_data)

        const OldBets = React.memo(
            () => {
                const handleOldBetClick = (betID) => {
                    // Navigate to the old bet details page when clicked
                    navigate(`/bet-history/${betID}`);
                };

                return (
                    <>  {
                        oldBetHistory && oldBetHistory?.map((bets, index) => (
                            <div onClick={() => handleOldBetClick(bets?.bet_id)}  key={index}>
                                <div key={bets?.bet_id} className="bet_item">
                                    <>
                                        <div className="left mt-0 d-flex justify-content-center flex-column align-items-start">
                                            <p><span className="bold">Bet Id</span> : {bets?.bet_id}</p>
                                            <p><span className="bold">Date</span> : {bets?.created}</p>
                                        </div>
                                        <div className=" mt-0 kiron-right">
                                            <p><span className="bold">Bet Amount</span> : {bets?.bet_amount}
                                                <span style={{position: "relative"}}>

                                                    </span>
                                            </p>
                                            <p className="ban  ban-value-data mt-1"
                                               style={{
                                                   backgroundColor: parseInt(bets?.status) === 5 ? 'hsl(120, 70%, 50%)' : parseInt(bets?.status) === 3 ? '#ff9900' : 'inherit',
                                                   borderRadius: '20px',
                                                   height: "1.8em",
                                                   marginTop: "-10px",
                                                   width: '1.6cm',
                                                   textAlign: 'center',
                                                   fontSize: "small",

                                               }}

                                            >
                                                {parseInt(bets?.status) === 1
                                                    ? 'placed'
                                                    : parseInt(bets?.status) === 3
                                                        ? 'Not won'
                                                        : parseInt(bets?.status) === 24
                                                            ? 'Cancelled'
                                                            : parseInt(bets?.status) === 9
                                                                ? 'Jackpot'
                                                                : parseInt(bets?.status) === 25
                                                                    ? 'Voided'
                                                                    : parseInt(bets?.status) === 5
                                                                        ? 'Won'
                                                                        : 'Unknown Status'}
                                            </p>
                                        </div>
                                    </>
                                </div>

                            </div>

                        ))
                    }
                    </>
                )
            })

        const BetArchive = React.memo(
            () => {
                return (
                    <div className="contain">
                        {betID ? (
                            <OldBetDetails />
                        ) : (
                            <OldBets/>
                        )}
                    </div>
                );
            });
        const ActiveBet = () => {
            const handleOldBetClick = (betID) => {
                // Navigate to the old bet details page when clicked
                navigate(`/bet-history/${betID}`);
            };
            return (
                <>  {
                    activeBetHistory && activeBetHistory?.map((bets, index) => (
                        <div onClick={() => handleOldBetClick(bets?.bet_id)}  key={index}>
                            <div key={bets?.bet_id} className="bet_item">
                                <>
                                    <div className="left mt-0 d-flex justify-content-center flex-column align-items-start">
                                        <p><span className="bold">Bet Id</span> : {bets?.bet_id}</p>
                                        <p><span className="bold">Date</span> : {bets?.bet_date}</p>
                                    </div>
                                    <div className=" kiron-right mt-0">
                                        <p><span className="bold">Bet Amount </span>: {bets?.bet_amount}
                                            <span
                                                style={{position: "relative"}}>
                                                    </span></p>
                                        <p className="ban ban-value-data mt-1"
                                           style={{
                                               backgroundColor: parseInt(bets?.bet_status) === 5 ? 'hsl(120, 70%, 50%)' : parseInt(bets?.bet_status) === 3 ? '#ff9900' : 'inherit',
                                               borderRadius: '20px',
                                               height: "1.8em",
                                               marginTop: "-10px",
                                               width: '1.6cm',
                                               textAlign: 'center',
                                               fontSize: "small",
                                           }}>
                                            {parseInt(bets?.bet_status) === 1
                                                ? 'placed'
                                                : parseInt(bets?.bet_status) === 3
                                                    ? 'Not won'
                                                    : parseInt(bets?.bet_status) === 24
                                                        ? 'Cancelled'
                                                        : parseInt(bets?.bet_status) === 9
                                                            ? 'Jackpot'
                                                            : parseInt(bets?.bet_status) === 25
                                                                ? 'Voided'
                                                                : parseInt(bets?.bet_status) === 5
                                                                    ? 'Won'
                                                                    : 'Unknown Status'}
                                        </p>
                                    </div>
                                </>
                            </div>
                        </div>
                    ))
                }
                </>
            )
        }

        const ActiveBets = React.memo(
            () => {

                return (
                    <div className="contain">
                        {betID ? (
                            <ActiveBetDetails betID={betID}/>
                        ) : (
                            <ActiveBet/>
                        )}
                    </div>
                );
            });

        const TabbedDetails = React.memo(
            () => {
                const handleTabSelect = (eventKey) => {
                    setActiveTab(eventKey); // Update activeTab state when a tab is selected
                    setLocalStorage("tab_history_kiron", eventKey)
                    navigate('/bet-history')
                };

                return (
                    <Tabs
                        variant={'tabs'}
                        defaultActiveKey={activeTab || getFromLocalStorage("tab_history_kiron")}
                        id=""
                        className="background-primary kiron-bet-history-tabs"
                        justify
                        onSelect={handleTabSelect}>
                        <Tab eventKey="active" title="ACTIVE BETS" className={'background-primary'}>
                            {loading ?
                                <div className={`text-center mt-2 text-white d-block`}>
                                    <Spinner animation={'grow'} size={'lg'}/>
                                </div> :
                                <ActiveBets/>}
                        </Tab>
                        <Tab eventKey="older" title="OLDER BETS" className={'background-primary'}>
                            {loading ?
                                <div className={`text-center mt-2 text-white d-block`}>
                                    <Spinner animation={'grow'} size={'lg'}/>
                                </div>
                                : <BetArchive/>
                            }
                        </Tab>
                    </Tabs>
                )
            })

        return (
            <div className="d-flex flex-row justify-content-between">
                <div className="w-100">
                    <TabbedDetails/>
                </div>
            </div>
        )
    })

export default React.memo(KironBetHistory)