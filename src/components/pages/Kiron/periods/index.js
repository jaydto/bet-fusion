import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {getFromLocalStorage, setLocalStorage} from "../../../utils/local-storage";
import makeRequest from "../../../utils/fetch-request";
import './period.css'
import {Context} from "../../../../context/store";


export const getTime = (time) => {
    const start = new Date(time);
    const startTimeString = start.toLocaleTimeString('en-Us', {hour12: false, hour: '2-digit', minute: '2-digit'});
    return (startTimeString)
}


let timerInterval;
let timerVar;

const KironPeriods = (props) => {
    const {setPlayout, setIsCountdownTimerActive, isCountdownTimerActive} = props
    const [state, dispatch] = useContext(Context);
    const [timeLeft, setTimeLeft] = useState(0);
    const [timeAfter, setTimeAfter] = useState(null);
    const firstMatchEndTime = getFromLocalStorage('kiron_end_time')
    const kironSearch1 = getFromLocalStorage('kiron_search_data') || {}; // Use empty object as default value if kiron_search_data is null or undefined
    const kironPeriodsRef = useRef(null);
    const newCompetition = new URL(window.location).searchParams.get('competition_id') || getFromLocalStorage('kiron_search_data')?.competition_id || '2'

    const [initialCompetition, setCompetition] = useState({
        competition_id: newCompetition
    })

    const fetchData = useCallback(async () => {
        clearInterval(timerVar)
        setTimeAfter(null)
        dispatch({type:'SET',key:'timeAfter', payload:null})
        dispatch({type: "SET", key: 'nareLoading', payload: true})
        dispatch({type: 'SET', key: 'nare_league_matches', payload: null})
        dispatch({type: 'SET', key: 'playout_data', payload: null})
        // dispatch({type: 'SET', key: 'periods_data', payload: null})
        setIsCountdownTimerActive(false);
        let endpoint = "/v1/nare-league/periods";
        let method = "POST"

        const newCompetition2 = {competition_id: new URL(window.location).searchParams.get('competition_id') || getFromLocalStorage('kiron_search_data')?.competition_id || '2'}

        makeRequest({url: endpoint, method: method, data: newCompetition2}).then(([c_status, c_result]) => {

            if (c_status === 200) {

                setTimeAfter(null)
                dispatch({type:'SET',key:'timeAfter', payload:null})
                setIsCountdownTimerActive(false)
                dispatch({type: "SET", key: 'periods_data', payload: c_result})

                const keys = Object.keys(c_result);
                const firstKey = keys[0];
                const firstItem = c_result[firstKey];
                dispatch({type: "SET", key: 'periods_first', payload: firstItem?.start_time})
                dispatch({type: "SET", key: 'periods_first_round', payload: firstItem?.round_id})
                setLocalStorage('kiron-periods', c_result);
                setLocalStorage('kiron_first_period', firstItem?.start_time);
                setLocalStorage('kiron_first_week', firstItem?.round_number);
                setLocalStorage('kiron_first_round', firstItem?.round_id);
                setLocalStorage('kiron_end_time', firstItem?.end_time)
                dispatch({type: "SET", key: 'nare_league_matches', payload: null})
                dispatch({type: "SET", key: 'periods_ready', payload: true})
            } else {
                fetchData()
            }

        })

    }, []);
    useEffect(()=>{
        if(state?.periods_ready){
            if(!state?.inPlay){
                dispatch({type: "SET", key: 'inPlay', payload: false})
                dispatch({type: "SET", key: 'start_fetching_match', payload: true})
                dispatch({type: "SET", key: 'periods_ready', payload: false})
            }else{
                setTimeout(()=>{
                    dispatch({type: "SET", key: 'nareLoading', payload: false})
                },3)

            }
        }

    },[state?.periods_ready])

    const prevNewData = useRef(initialCompetition);

    const handleLinkClick = (event) => {
        const links = document.querySelectorAll('.link');
        links.forEach((link) => link.classList.remove('highlight'));
        event.currentTarget.classList.add('highlight');
    }

    useEffect(() => {
        if (prevNewData.current.competition_id !== initialCompetition?.competition_id) {
            const payload = {
                start: '', round: '', end: ''
            }
            dispatch({type: "SET", key: 'current_selection_period', payload: payload})
            prevNewData.current = initialCompetition;
        }
    }, [initialCompetition]);


    useEffect(() => {
        const links = document.querySelectorAll('.link');
        links.forEach((link) => link.classList.remove('highlight'));

        const payload = {
            start: '', round: '', end: ''
        }
        dispatch({type: "SET", key: 'current_selection_period', payload: payload})

        const kironSearch = getFromLocalStorage('kiron_search_data') || {}; // Use empty object as default value if kiron_search_data is null or undefined
        const competition1 = new URL(window.location).searchParams.get('competition_id') || kironSearch?.competition_id || '2'

        if (initialCompetition?.competition_id !== competition1) {

            setTimeAfter(null)
            dispatch({type:'SET',key:'timeAfter', payload:null})
            // setIsCountdownTimerActive(false)
            // todo check if i should have in play false at this point
            dispatch({type: "SET", key: "inPlay", payload: false});
            dispatch({type: "SET", key: 'periods_first', payload: null})
            setCompetition({
                competition_id: competition1
            })
        }

    }, [kironSearch1?.competition_id, window.location.pathname])

    const pathname = window.location.pathname;


    useEffect(() => {
        clearInterval(timerVar)
        clearInterval(timerInterval)
        dispatch({type: "SET", key: "inPlay", payload: false});
        dispatch({type: "SET", key: 'close_spinner', payload: false})
        dispatch({type: "SET", key: 'periods_first', payload: null})
        dispatch({type: "SET", key: 'playout_data', payload: null})
        fetchData()

    }, [newCompetition,new URL(window.location).searchParams.get('competition_id')])

    useEffect(() => {
        if (isCountdownTimerActive == false) {
            dispatch({type: "SET", key: 'close_spinner', payload: false})
            setIsCountdownTimerActive(false)
            dispatch({type: "SET", key: 'playout_data', payload: null})
            clearInterval(timerVar)
            if (timeLeft < 0) {
                setTimeLeft(0);
            }

        }
    }, [isCountdownTimerActive]);


    useEffect(() => {
        dispatch({type: "SET", key: "inPlay", payload: false});

        let timeLocal = state?.periods_first ?? getFromLocalStorage("kiron_first_period")

        if (!timeLocal) {

            return
        }

        let firstRound = Date.parse(timeLocal)

        let now = new Date().getTime();
        let diff = (firstRound - now);
        let initialTime = Math.floor(diff / 1000);
        let seconds;

        seconds = initialTime % 60;
        let minutes = Math.floor(initialTime / 60);


        let timer = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        setTimeLeft(timer);


        if (minutes < 0 || (minutes === 0 && seconds === 0)) {
            clearInterval(timerInterval);
        }

        function timeBefore() {
            if (isCountdownTimerActive != false) {
                return
            }
            dispatch({type: "SET", key: 'close_spinner', payload: false})
            dispatch({type: "SET", key: "inPlay", payload: false});
            timeLocal = state?.periods_first ?? getFromLocalStorage("kiron_first_period")
            firstRound = Date.parse(timeLocal)

            now = new Date().getTime();
            diff = firstRound - now - 1000;
            seconds = initialTime % 60;
            minutes = Math.floor(initialTime / 60);
            timer = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            initialTime = Math.floor(diff / 1000);

            setTimeLeft(timer);
            initialTime -= 1;


            if (initialTime > 10 && initialTime < 60) {

            } else if (initialTime <= 9 && initialTime > 0) {
                //todo if in another selection close/spinner should be false
                if (state?.current_selection_period?.start.length > 0) {
                    dispatch({type: "SET", key: 'close_spinner', payload: false})

                } else {
                    // setClosed(true);
                    dispatch({type: "SET", key: 'close_spinner', payload: true})
                }
                document.getElementById('game_week').innerHTML = "Game Week " + getFromLocalStorage('kiron_first_week')
                document.getElementById('countdown').innerHTML = 'Match Starts In ' + timer;
            } else if (initialTime <= 0) {
                if (state?.current_selection_period?.start.length > 0) {
                    dispatch({type: "SET", key: "inPlay", payload: false});

                } else {

                    dispatch({type: "SET", key: "inPlay", payload: true});
                }
                setIsCountdownTimerActive(true);
                dispatch({type: "SET", key: 'close_spinner', payload: false})

                clearInterval(timerInterval);
            }
        }

        timerInterval = setInterval(timeBefore, 1000);

        return () => clearInterval(timerInterval);
    }, [getFromLocalStorage('kiron_search_data')?.competition_id, state?.current_selection_period?.start, state?.periods_first ?? getFromLocalStorage("kiron_first_period"), isCountdownTimerActive,state?.periods_data]);

    useEffect(() => {

        //calculation to include the right time inPlay
        let startTime = state?.periods_first ?? getFromLocalStorage("kiron_first_period")

        let timeInPlay = (new Date().getTime() - Date.parse(startTime)) / 1000;
        let timeMapping = (Math.round((timeInPlay) * (90 / 65)))


        if (isCountdownTimerActive) {
            clearInterval(timerInterval)
            if (state?.current_selection_period?.start.length > 0) {
                dispatch({type: "SET", key: "inPlay", payload: false});

            } else if (state?.current_selection_period?.start.length == 0) {
                dispatch({type: "SET", key: "inPlay", payload: true});
            } else if (timeAfter == false) {
                setIsCountdownTimerActive(false)
                dispatch({type: "SET", key: "inPlay", payload: false});
            }
            dispatch({type: "SET", key: 'start_playout', payload: 'START'})
            timerVar = setInterval(countTimer, 722);
            setTimeLeft(getTime(Date.now()))

            function countTimer() {
                if (isCountdownTimerActive != true) {
                    return
                }
                startTime = getFromLocalStorage('kiron_first_period')

                timeInPlay = (new Date().getTime() - Date.parse(startTime)) / 1000;
                timeMapping = (Math.round((timeInPlay) * (90 / 65)))

                if (timeMapping < 0) {
                    // setInPlay(false)
                    dispatch({type: "SET", key: "inPlay", payload: false});
                    setIsCountdownTimerActive(false)
                    // setEnded('Ended')
                    dispatch({type: "SET", key: 'Ended', payload: 'Ended'})
                    // setInPlay(false)
                    dispatch({type: "SET", key: "inPlay", payload: false});
                    // setTimerColor('count-red');
                }


                ++timeMapping;
                const seconds = timeMapping;

                dispatch({type: "SET", key: 'Ended', payload: null})
                if (state?.current_selection_period?.start && state?.current_selection_period?.start.length > 0) {
                    // setInPlay(false)

                    dispatch({type: "SET", key: "inPlay", payload: false});
                } else if (state?.current_selection_period?.start.length == 0) {
                    // setInPlay(true)
                    dispatch({type: "SET", key: "inPlay", payload: true});
                }

                if (seconds < 90) {
                    dispatch({type: "SET", key: 'start_playout', payload: null})
                    dispatch({type:'SET',key:'timeAfter', payload:seconds})
                    setTimeAfter(seconds)
                    setPlayout(seconds)

                } else {
                    // setEnded('Ended')
                    dispatch({type: "SET", key: 'Ended', payload: 'Ended'})
                    clearInterval(timerInterval)
                    clearInterval(timerVar);
                    //todo remove first_period
                    setLocalStorage('kiron-periods', null);
                    setLocalStorage('kiron_first_period', null);
                    setLocalStorage('kiron_first_week', null);
                    setLocalStorage('kiron_first_round', null);
                    setLocalStorage('kiron_end_time', null)

                    setTimeout(() => {
                        dispatch({type: "SET", key: 'periods_first', payload: null})
                        setTimeAfter(null)
                        dispatch({type:'SET',key:'timeAfter', payload:null})
                        setIsCountdownTimerActive(false);
                        dispatch({type: "SET", key: 'Ended', payload: null})
                        dispatch({type: "SET", key: "inPlay", payload: false});
                        dispatch({type: "SET", key: 'playout_data', payload: null})
                        // dispatch({type: "SET", key: 'periods_data', payload: null})
                        fetchData()

                    }, 5000);

                }
            }

            return () => clearInterval(timerVar);
        }
    }, [isCountdownTimerActive, newCompetition, state?.current_selection_period?.start,state?.periods_data]);

    useEffect(() => {
        if (state?.current_selection_period!=undefined){
            if(state?.current_selection_period?.start!=''){
                dispatch({ type: "SET", key: 'start_fetching_selection', payload: true })
            }

        }
        if (state?.current_selection_period?.start > 0) {
            dispatch({type: "SET", key: "inPlay", payload: false});
            dispatch({type: "SET", key: 'close_spinner', payload: false})

        }
        else if (state?.current_selection_period?.start.length == 0) {
            const kiron_end = getFromLocalStorage('kiron_end_time')
            const kiron_start = state?.periods_first ?? getFromLocalStorage("kiron_first_period")

            let sTime = Date.parse(kiron_start)
            let eTime = Date.parse(kiron_end)
            let now = new Date().getTime();

            if (sTime <= now && now < eTime) {
                dispatch({type: "SET", key: "inPlay", payload: true});
            } else if (sTime > now && now < eTime) {
                dispatch({type: "SET", key: "inPlay", payload: false});

            }

        }

    }, [state?.current_selection_period])

    useEffect(()=>{
        if(state?.start_fetching_selection){
            dispatch({ type: "SET", key: 'start_fetching_match', payload: true })
            dispatch({ type: "SET", key: 'start_fetching_selection', payload: false})
        }
    },[state?.start_fetching_selection])

    function getTimeInSeconds(timeString) {
        const [minutes, seconds] = timeString.split(':');
        const secondsArray = seconds.split('0').map(Number);
        const totalSeconds = (secondsArray[1] !== 0 ? secondsArray[1] : secondsArray[0]) ?? Number(seconds);
        return totalSeconds < 0 ? 0 : totalSeconds;
    }


    const handleNextSelected = (start, round, end) => {
        const payload = {
            start: start, round: round, end: end
        }

        dispatch({type: "SET", key: 'current_selection_period', payload: payload})

    }


    const kironTabVisible = () => {
        //todo check this part
        // const time= (new Date(Date.parse(`${new Date().toDateString()} ${getTime()}`))-new Date().getTime())/1000
        const time = (Date.parse(firstMatchEndTime) - new Date().getTime()) / 1000

        document.addEventListener("visibilitychange", (event) => {
            if (document.visibilityState == "visible") {
                if (window.location.pathname == "/nare-league") {
                    if (time <= 0) {
                        // setInPlay(false)
                        dispatch({type: "SET", key: "inPlay", payload: false});
                        setTimeAfter(false)
                        dispatch({type:'SET',key:'timeAfter', payload:false})
                        setIsCountdownTimerActive(false)
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
            {state?.periods_data && (
                <table className={'kiron-table'} style={{width: "100%", textAlign: "center", display: 'flex'}}>
                    <tbody className={"d-flex periods"} style={{overflowX: "auto"}}>
                    <tr className={"d-flex league-row gap-2 justify-content-center align-items-center  kiron-period"}
                        ref={kironPeriodsRef} style={{flex: '0 0 auto', overflowX: "hidden", height: '50px'}}>
                        {state?.periods_data?.map((kiron_options, index) => {
                            const time = getTime(kiron_options.start_time);
                            const isFirst = index === 0;
                            const startTime = isFirst ? '' : kiron_options?.start_time;
                            const roundId = isFirst ? '' : kiron_options?.round_id;
                            const endTime = isFirst ? '' : kiron_options?.end_time;
                            return (<td key={index} id={`kiron-period-${kiron_options?.round_id}`}
                                        className={` d-flex menu-t sport-check w-100 period-card standings-menu ${pathname === kiron_options.round_id ? " active" : ""}`}
                                        style={{textAlign: 'center', lineHeight: '1.5'}}>
                                    <div style={{width: "100%", color: "#000"}}>
                                        <div
                                            className={` inner-div active d-flex align-items-center kiron-value flex-column justify-content-center link period-height ${isFirst ? timeLeft && isCountdownTimerActive == false ? 'count-red' : timeAfter && isCountdownTimerActive == true ? 'count-green' : '' : ''}`}
                                            onClick={(event) => {
                                                handleLinkClick(event);
                                                handleNextSelected(startTime, roundId, endTime)
                                            }}
                                            style={{width: '60px', cursor: 'pointer'}}>
                                            {isFirst && timeLeft && isCountdownTimerActive == false ? (getTimeInSeconds(timeLeft) > 0 &&
                                                <div style={{color: '#fff'}}
                                                     className={`countdown-timer`}>{timeLeft}</div>) : isFirst && timeAfter ? (
                                                <div style={{color: '#fff'}}
                                                     className={`countdown-timer `}>{state?.Ended ? state?.Ended : `${timeAfter > 0 ? "LIVE'" + timeAfter : state?.start_playout}`}</div>) : (
                                                <div style={{color: '#fff'}} id={`x${time}`}>{time}</div>)}
                                        </div>
                                    </div>
                                </td>);
                        })}

                    </tr>
                    </tbody>

                </table>)}

        </div>)
};

export default React.memo(KironPeriods);


