import React, {useCallback, useEffect, useRef} from 'react';
import {getFromLocalStorage} from "../../../utils/local-storage";
import './period.css'
import moment from "moment"
import {useDispatch, useSelector} from 'react-redux'; // Import useDispatch hook
import {
    nareLeagueMatches,
    nareLeaguePeriods,
    nareLeaguePlayouts,
    resetState,
    setState,
    setTimerData
} from '../../../../redux/nareLeague';

export const getTime = (dateTime) => {

    // Split the input date-time string into date and time parts
    const [datePart, timePart] = dateTime.split(' ');

    // Split the time part into hours and minutes
    const [hours, minutes] = timePart.split(':').map(Number);

    // Create a new Date object with the extracted date and time
    const [year, month, day] = datePart.split('-').map(Number);
    const start = new Date(year, month - 1, day, hours, minutes); // Note: Months are 0-indexed


    // Format the time string with just hours and minutes
    const formattedHour = String(start.getHours()).padStart(2, '0');
    const formattedMinute = String(start.getMinutes()).padStart(2, '0');

    const startTimeString = `${formattedHour}:${formattedMinute}`;


    return startTimeString;
}


let timerInterval;
let timerVar;
const KironPeriods = React.memo(
    (props) => {
        const dispatchRedux = useDispatch();
        const firstMatchEndTime = getFromLocalStorage('kiron_end_time') // Use empty object as default value if kiron_search_data is null or undefined
        const kironPeriodsRef = useRef(null);
        const competition = useSelector((state) => state.nareLeague.competition_id)
        const competition_id=Number(new URL(window.location).searchParams.get('competition_id'))||competition

        const fetchData = useCallback(async () => {
            const newCompetition = {competition_id: Number(new URL(window.location).searchParams.get('competition_id')) || Number(competition_id)}
            await dispatchRedux(nareLeaguePeriods(newCompetition));
        }, [competition_id]);

        useEffect(() => {
            const abort = new AbortController()
            fetchData()
            return () => {
                abort.abort()
            }
        }, [])


        // track when competiton_id changes and resets for all previous states
        useEffect(() => {
            const links = document.querySelectorAll('.link');
            links?.forEach((link) => link.classList.remove('highlight'));
            clearInterval(timerVar)
            clearInterval(timerInterval)
            dispatchRedux(resetState('current_selection_period'))
            dispatchRedux(setState('close_spinner', false))
            dispatchRedux(resetState('start_time'))
            dispatchRedux(resetState('inPlay'))
            dispatchRedux(resetState('playout_data'))
            dispatchRedux(resetState('active_market'))
            dispatchRedux(resetState('play_time'))
            dispatchRedux(resetState('ended'))
            dispatchRedux(resetState('time_left'))
            dispatchRedux(resetState('playout_data'))
            dispatchRedux(resetState('matches_data'))
            fetchData()

        }, [competition_id])

        // Access the nareLeague period states
        const periodsData = useSelector((state) => state.nareLeague.periods_data);
        const periodsReady = useSelector((state) => state.nareLeague.periods_ready);
        const periodFirst = useSelector((state) => state.nareLeague.start_time);
        const time_left = useSelector((state) => state.nareLeague.time_left);
        const play_time = useSelector((state) => state.nareLeague.play_time);
        const inPlay = useSelector((state) => state.nareLeague.inPlay);
        const round_id = useSelector((state) => state.nareLeague.round_id);
        const market_id = useSelector((state) => state.nareLeague.active_market);
        const current_selection_period = useSelector((state) => state.nareLeague.current_selection_period);
        const game_week = useSelector((state) => state.nareLeague.game_week);
        const Ended = useSelector((state) => state.nareLeague.ended);


        useEffect(() => {
            const data = {
                competition_id: Number(new URL(window.location).searchParams.get('competition_id')) || Number(competition_id),
                round_id: round_id
            }
            const dataMatches = {
                competition_id: Number(new URL(window.location).searchParams.get('competition_id')) || Number(competition_id),
                round_id: (current_selection_period?.round !== '' || current_selection_period?.round !== undefined) ? current_selection_period?.round : round_id,
                market_id: Number(market_id)
            }
            // todo initial calculations here
            const startTime = periodFirst;
            const timeInPlay = (moment().valueOf() - moment(startTime).valueOf()) / 1000;
            const timeMapping = Math.round(timeInPlay * (90 / 65));

            if (timeMapping < 0) {
                dispatchRedux(setState('inPlay', false));
            } else if(timeMapping>0){
                dispatchRedux(setState('inPlay', true));
            }

            if (periodsReady && (current_selection_period || !inPlay)) {
                dispatchRedux(nareLeagueMatches(dataMatches)); // Dispatch nareLeagueMatches async thunk
                dispatchRedux(resetState('playouts_data'))
            } else if (periodsReady && (inPlay || !current_selection_period)) {
                dispatchRedux(nareLeaguePlayouts(data)); // Dispatch nareLeaguePlayouts async thunk
                dispatchRedux(resetState('matches_data'))
            }
        }, [periodsReady, inPlay, market_id, current_selection_period]);

        const handleLinkClick = (event) => {
            const links = document.querySelectorAll('.link');
            links?.forEach((link) => link.classList.remove('highlight'));
            event.currentTarget.classList.add('highlight');
        }


        const pathname = window.location.pathname;

        useEffect(() => {

            // Calculate initial time_left when the component mounts
            let timeLocal = periodFirst;
            if (!timeLocal) {
                return;
            }
            let firstRound = moment(timeLocal);
            let now = moment();
            let diff = firstRound.diff(now);
            let initialTimeLeft = Math.floor(diff / 1000);

            let secondsLeft = initialTimeLeft % 60;
            let minutesLeft = Math.floor(initialTimeLeft / 60);
            let timeLeft = `${minutesLeft}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
            dispatchRedux(setTimerData('time_left', timeLeft));

            // Function to update time_left
            function updateTimeLeft() {
                timeLocal = periodFirst;
                firstRound = moment(timeLocal);
                now = moment();
                diff = firstRound.diff(now);
                secondsLeft = Math.abs(initialTimeLeft) % 60;
                minutesLeft = Math.floor(Math.abs(initialTimeLeft) / 60);
                timeLeft = `${minutesLeft}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
                dispatchRedux(setTimerData('time_left', timeLeft));

                // Update the "Game Week" DOM element when time_left is less than 10
                if (initialTimeLeft <= 10) {

                    dispatchRedux(setState('close_spinner', true))

                    const gameWeekElement = document.getElementById('game_week');
                    if (gameWeekElement) {
                        gameWeekElement.innerHTML = "Game Week " + game_week;
                    }
                    // Update the "Match Starts In" DOM element with the countdown timer
                    const countdownElement = document.getElementById('countdown');
                    if (countdownElement) {
                        countdownElement.innerHTML = 'Match Starts In ' + `${initialTimeLeft}`;
                    }
                }
                // set inPlay to true when time_left is less than 0
                if (initialTimeLeft <= 0) {
                    dispatchRedux(setState('inPlay', true))
                    dispatchRedux(resetState('ended'));
                    dispatchRedux(setState('close_spinner', false))

                    clearInterval(timerInterval);
                }
                initialTimeLeft -= 1;
            }

            // Start the interval for updating time_left
            timerInterval = setInterval(updateTimeLeft, 1000);

            return () => clearInterval(timerInterval);
        }, [periodFirst]);

        useEffect(() => {
            // Function to update play_time
            function updatePlayTime() {
                const startTime = periodFirst;
                const timeInPlay = (moment().valueOf() - moment(startTime).valueOf()) / 1000;
                const timeMapping = Math.round(timeInPlay * (90 / 65));

                if (timeMapping < 0) {
                    dispatchRedux(setState('ended', 'Ended'));
                    dispatchRedux(setState('inPlay', false));
                }

                const seconds = timeMapping;

                if (seconds < 90) {
                    dispatchRedux(setTimerData('play_time', seconds));
                } else {
                    dispatchRedux(setState('ended', 'Ended'));
                    clearInterval(timerVar);
                    setTimeout(() => {
                        dispatchRedux(resetState('play_time'));
                        dispatchRedux(resetState('periods_first'));
                        dispatchRedux(resetState('ended'));
                        dispatchRedux(resetState('inPlay'));
                        dispatchRedux(resetState('playouts_data'));
                        dispatchRedux(resetState('active_market'));
                        fetchData();
                    }, 5000);
                }
            }

            if (!inPlay) {
                clearInterval(timerVar)
            } else {
                // Start the interval for updating play_time
                timerVar = setInterval(updatePlayTime, 722);
            }

            return () => clearInterval(timerVar);
        }, [periodFirst, inPlay]);


        const handleNextSelected = (start, round, end) => {
            const payload = {
                start: start, round: round, end: end
            }
            if (start?.length > 0) {
                dispatchRedux(setState('current_selection_period', payload))
            } else {
                dispatchRedux(resetState('current_selection_period'))
            }

        }


        const kironTabVisible = () => {
            const time = (Date.parse(firstMatchEndTime) - new Date().getTime()) / 1000

            document.addEventListener("visibilitychange", (event) => {
                if (document.visibilityState == "visible") {
                    if (window.location.pathname == "/nare-league") {
                        if (time <= 0) {
                            dispatchRedux(resetState('inPlay'));
                            dispatchRedux(resetState('play_time'));
                            dispatchRedux(resetState('active_market'))
                            fetchData()

                        }
                    }
                }
            })
        }

        useEffect(() => {
            kironTabVisible()
        }, [])

        return (<div className={`  container-period `} style={{background: " #162024"}}>
            {periodsData && (
                <table className={'kiron-table'} style={{width: "100%", textAlign: "center", display: 'flex'}}>
                    <tbody className={"d-flex periods"} style={{overflowX: "auto"}}>
                    <tr className={"d-flex league-row gap-2 justify-content-center align-items-center  kiron-period"}
                        ref={kironPeriodsRef} style={{flex: '0 0 auto', overflowX: "hidden", height: '50px'}}>
                        {periodsData?.map((kiron_options, index) => {
                            const time = getTime(kiron_options.start_time);
                            const isFirst = index === 0;
                            const startTime = isFirst ? '' : kiron_options?.start_time;
                            const roundId = isFirst ? '' : kiron_options?.round_id;
                            const endTime = isFirst ? '' : kiron_options?.end_time;
                            // Check if time_left includes a '-', if yes, show an empty string, otherwise show time_left
                            const formattedTimeLeft = /^-/.test(time_left) ? '' : time_left;
                            return (<td key={index} id={`kiron-period-${kiron_options?.round_id}`}
                                        className={` d-flex menu-t sport-check w-100 period-card standings-menu ${pathname === kiron_options.round_id ? " active" : ""}`}
                                        style={{textAlign: 'center', lineHeight: '1.5'}}>
                                <div style={{width: "100%", color: "#000"}}>
                                    <div
                                        className={` inner-div active d-flex align-items-center kiron-value flex-column justify-content-center link period-height ${isFirst ? !inPlay ? 'count-red' : inPlay ? 'count-red' : '' : ''}`}
                                        onClick={(event) => {
                                            handleLinkClick(event);
                                            handleNextSelected(startTime, roundId, endTime)
                                        }}
                                        style={{width: '60px', cursor: 'pointer'}}>
                                        {isFirst && !inPlay ? (
                                                <div style={{color: '#fff'}}
                                                     className={`countdown-timer`}>
                                                    {formattedTimeLeft}
                                                </div>) :
                                            isFirst && inPlay ?
                                                (
                                                    <div style={{color: '#fff'}}
                                                         className={`countdown-timer `}>
                                                        {Ended ? Ended : `${play_time > 0 ? "LIVE '" + play_time : 'LIVE'}`}
                                                    </div>
                                                ) :
                                                (
                                                    <div style={{color: '#fff'}} id={`${time}`}>{time}</div>
                                                )}
                                    </div>
                                </div>
                            </td>);
                        })}

                    </tr>
                    </tbody>

                </table>)}

        </div>)
    });

export default React.memo(KironPeriods);


