import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {Link,} from "react-router-dom";
import {getFromLocalStorage, setLocalStorage} from "../../../utils/local-storage";
import makeRequest from "../../../utils/fetch-request";
import useAnalyticsEventTracker from "../../../analytics/useAnalyticsEventTracker";
import './period.css'
import Element from "../../../skeleton/Element";
import {Context} from "../../../../context/store";




export const getTime=(time)=>{
    const start = new Date(time);
    const startTimeString = start.toLocaleTimeString('en-Us', {hour12:false,hour: '2-digit',minute: '2-digit'});
    return (startTimeString)
}

let timerInterval;
let timerVar;

const KironPeriods= (props) => {
    const {setClosed,setInPlay, setPlayout,setIsCountdownTimerActive,isCountdownTimerActive}=props
    const [state, dispatch] = useContext(Context);
    let [kiron, setKiron] = useState(getFromLocalStorage('kiron-periods'));
    const [timeLeft, setTimeLeft] = useState(0);
    const [timeDuration, setTimeDuration] = useState(0);
    const [timeAfter, setTimeAfter] = useState(null);
    const [ended, setEnded] = useState(false);
    const [timerColor, setTimerColor] = useState('count-green');
    const [isContinuing,setIsContinuing]=useState(false)
    const firstMatchEndTime=getFromLocalStorage('kiron_end_time')
    const firstMatchStartTime=getFromLocalStorage('kiron_first_period')
    const [count, setCount]=useState(false)


    const kironSearch1 = getFromLocalStorage('kiron_search_data') || {}; // Use empty object as default value if kiron_search_data is null or undefined
    const kironPeriodsRef = useRef(null);
    const newCompetition=new URL(window.location).searchParams.get('competition_id')||getFromLocalStorage('kiron_search_data')?.competition_id||'2'

    const  [initialCompetition, setCompetition] = useState({
        competition_id:newCompetition
    })

    const fetchData = useCallback(async () => {
        // clearInterval(timerVar)
        setCount(true)
        setTimeAfter(null)
        setInPlay(false)
        setIsCountdownTimerActive(false);
        let endpoint = "/v1/nare-league/periods";
        let method="POST"

        const newCompetition2= {competition_id:new URL(window.location).searchParams.get('competition_id') || getFromLocalStorage('kiron_search_data')?.competition_id||'2'}

        makeRequest({url: endpoint, method: method, data: newCompetition2}).then(([c_status, c_result] ) =>{

            if (c_status === 200) {
                // setLoading(false)
                setTimeAfter(null)
                setIsCountdownTimerActive(false)
                setInPlay(false)
                dispatch({type: "SET", key: "loading", payload:false});
                setKiron(c_result);
                dispatch({ type: "SET", key: 'periods_data', payload: c_result })

                const keys = Object.keys(c_result);
                const firstKey = keys[0];
                const firstItem = c_result[firstKey];
                dispatch({ type: "SET", key: 'periods_first', payload:  firstItem?.start_time})
                setLocalStorage('kiron-periods', c_result);
                setLocalStorage('kiron_first_period', firstItem?.start_time);
                setLocalStorage('kiron_first_week', firstItem?.round_number);
                setLocalStorage('kiron_first_round', firstItem?.round_id);
                setLocalStorage('kiron_end_time', firstItem?.end_time)
            }
            else {
                fetchData()
            }

        })

    }, []);


    const prevNewData = useRef(initialCompetition);

    const handleLinkClick=(event)=> {
        // remove highlight class from all links
        const links = document.querySelectorAll('.link');
        links.forEach((link) => link.classList.remove('highlight'));

        // add highlight class to clicked link
        event.currentTarget.classList.add('highlight');
    }


    useEffect(() => {
        if (prevNewData.current.competition_id !== initialCompetition?.competition_id ){
            // setLoading(true)
            dispatch({type: "SET", key: "loading", payload:true});
            const payload={
                start:'',
                round:'',
                end:''
            }
            dispatch({ type: "SET", key: 'current_selection_period', payload: payload })
            prevNewData.current = initialCompetition;
        }
    }, [initialCompetition]);


    useEffect(()=>{
        const links = document.querySelectorAll('.link');
        links.forEach((link) => link.classList.remove('highlight'));

        const payload={
            start:'',
            round:'',
            end:''
        }
        dispatch({ type: "SET", key: 'current_selection_period', payload: payload })

        const kironSearch = getFromLocalStorage('kiron_search_data') || {}; // Use empty object as default value if kiron_search_data is null or undefined
        const competition1 = new URL(window.location).searchParams.get('competition_id')||kironSearch?.competition_id||'2'

        if(initialCompetition?.competition_id!==competition1){
            // setLoading(true)
            dispatch({type: "SET", key: "loading", payload:true});
            setTimeAfter(null)
            setIsCountdownTimerActive(false)
            setInPlay(false)
            setCompetition({
                competition_id:competition1
            })
        }

    },[kironSearch1?.competition_id, window.location.pathname])

    const pathname = window.location.pathname;


    useEffect(() => {
        setTimeAfter(null)
        setIsCountdownTimerActive(false)
        setInPlay(false)
        fetchData()
        setInPlay(false)
    }, [getFromLocalStorage('kiron_search_data')?.competition_id])

    useEffect(() => {
        if (isCountdownTimerActive==false) {

            setClosed(false)
            setIsCountdownTimerActive(false)
            setInPlay(false)
            clearInterval(timerVar)
            if (timeLeft< 0) {
                setTimeLeft(0);
            }

        }
    }, [isCountdownTimerActive]);


    useEffect(() => {
        setInPlay(false);
        let timeLocal = getFromLocalStorage("kiron_first_period") ?? state?.periods_first

        if (!timeLocal) {

            return
        }

        let timePeriod = Date.parse(timeLocal)
        let firstRound = timePeriod;
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
            // if(isCountdownTimerActive!=false){
            //     return
            // }
            timeLocal = getFromLocalStorage("kiron_first_period")
            timePeriod = Date.parse(timeLocal)
            firstRound = timePeriod
            now = new Date().getTime();
            diff = firstRound - now - 1000;
            seconds = initialTime % 60;
            minutes = Math.floor(initialTime / 60);
            timer = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            initialTime = Math.floor(diff / 1000);

            setTimeLeft(timer);
            initialTime -= 1;


            if (initialTime > 10 ) {
                setTimerColor('count-red');
                setClosed(false);
            } else if (initialTime <= 9 && initialTime > 0) {
                setTimerColor('count-red');
                // if todo if in another selection close/spinner should be false
                if(state?.current_selection_period?.start.length>0){
                    setClosed(false);
                }else{
                    setClosed(true);
                }
                document.getElementById('game_week').innerHTML="Game Week "+getFromLocalStorage('kiron_first_week')
                document.getElementById('countdown').innerHTML ='Match Starts In '+ timer;
            } else {
                if(state?.current_selection_period?.start.length>0){
                    setInPlay(false)
                }else{
                    setInPlay(true)
                }
                setTimerColor('count-green');
                setIsCountdownTimerActive(true);
                setClosed(false);
                setTimerColor('count-green');
                setClosed(false);

                clearInterval(timerInterval);
            }
        }

        timerInterval = setInterval(timeBefore, 1000);

        return () => clearInterval(timerInterval);
    }, [getFromLocalStorage('kiron_search_data')?.competition_id,state?.current_selection_period?.start ,getFromLocalStorage('kiron_first_period'),isCountdownTimerActive]);


    useEffect(()=>{
        if(state?.current_selection_period?.start>0){
            setInPlay(false)
            setClosed(false)

        }else if(state?.current_selection_period?.start.length==0){
            const kiron_end=getFromLocalStorage('kiron_end_time')
            const kiron_start=getFromLocalStorage('kiron_first_period')

            //start time
            const startTime=getTime(kiron_start)
            const timeStart=new Date(Date.parse(`${new Date().toDateString()} ${startTime}`));
            let sTime = timeStart.getTime();

            //end time
            const endTime=getTime(kiron_end)
            let timeEnd = new Date(Date.parse(`${new Date().toDateString()} ${endTime}`));
            let eTime = timeEnd.getTime();
            let now = new Date().getTime();
            let diff = (eTime  - now);

            //time difference
            let initialTime = Math.floor(diff / 1000);

            if(sTime==now&&now<eTime ){

                setInPlay(true)
            } else if(sTime<now&&now<eTime){
                setInPlay(true)

            }

        }

    },[state?.current_selection_period])


    useEffect(() => {
        //calculation to include the right time inPlay
        let startTime=getFromLocalStorage('kiron_first_period')

        let timeInPlay=(new Date().getTime()-Date.parse(startTime))/1000;
        let timeMapping=(Math.round((timeInPlay)*(90/65)))


        if (isCountdownTimerActive) {
            if(state?.current_selection_period?.start.length>0){
                setInPlay(false)
            }else if(state?.current_selection_period?.start.length==0){
                setInPlay(true)
            }else if(timeAfter==false){
                setIsCountdownTimerActive(false)
                setInPlay(false)
            }

            timerVar = setInterval(countTimer, 722);
            setTimeLeft(getTime(Date.now()))
            function countTimer() {
                if(isCountdownTimerActive!=true){
                    return
                }
                //calculation to include the right time inPlay
                startTime=getFromLocalStorage('kiron_first_period')

                timeInPlay=(new Date().getTime()-Date.parse(startTime))/1000;
                timeMapping=(Math.round((timeInPlay)*(90/65)))

                if(timeMapping<0){
                    setInPlay(false)
                    setIsCountdownTimerActive(false)
                    setEnded(true)
                    setInPlay(false)
                    setTimerColor('count-red');
                }

                ++timeMapping;
                const seconds = timeMapping;

                setEnded(null)
                if(state?.current_selection_period?.start&&state?.current_selection_period?.start.length>0){
                    setInPlay(false)
                }else if(state?.current_selection_period?.start.length==0){
                    setInPlay(true)
                }
                // setTimeAfter(seconds)
                if (seconds < 90 ) {
                    setTimeAfter(seconds)
                    setPlayout(seconds)
                    // if(state?.)//todo when in another selection inPlay False spinner close
                } else {

                    setIsCountdownTimerActive(false);

                    setTimeAfter(null)

                    clearInterval(timerVar);

                    setEnded('Ended')
                    setTimeout(()=>{
                        setInPlay(false)
                        fetchData()
                        setTimeAfter(null)
                    }, 100);
                }
            }

            return () => clearInterval(timerVar);
        }
    }, [isCountdownTimerActive,newCompetition,state?.current_selection_period?.start]);


    function getTimeInSeconds(timeString) {
        const [minutes, seconds] = timeString.split(':');
        const secondsArray = seconds.split('0').map(Number);
        const totalSeconds = (secondsArray[1] !== 0 ? secondsArray[1] : secondsArray[0]) ?? Number(seconds);


        return totalSeconds < 0 ? 0 : totalSeconds;
    }


    const handleNextSelected=(start,round, end)=>{
        const payload={
            start:start,
            round:round,
            end:end
        }

        dispatch({ type: "SET", key: 'current_selection_period', payload: payload })

    }


    const kironTabVisible=()=>{
        const time= (new Date(Date.parse(`${new Date().toDateString()} ${getTime(firstMatchEndTime)}`))-new Date().getTime())/1000

        document.addEventListener("visibilitychange", (event) => {
            if (document.visibilityState == "visible") {
                if(window.location.pathname=="/nare-league"){
                    if(time<=0){
                        setInPlay(false)
                        setTimeAfter(false)
                        setIsCountdownTimerActive(false)
                        fetchData()

                    }
                }
            }
        })
    }

    useEffect(()=>{
        kironTabVisible()
    },[])


    return (
        kiron&&<div className={ `  container-period ` } style={{background:" #162024"}}>
            <table className={'kiron-table'} style={{width: "100%", textAlign: "center", display:'flex'}}>
                <tbody className={"d-flex periods"} style={{overflowX: "auto"}} >
                <tr className={"d-flex league-row gap-2 justify-content-center align-items-center  kiron-period"} ref={kironPeriodsRef} style={{ flex: '0 0 auto', overflowX:"hidden",height:'50px' }}>
                    {
                        kiron?.map((kiron_options, index) => {
                            const time = getTime(kiron_options.start_time);
                            const isFirst = index === 0;
                            const startTime = isFirst ? '' : kiron_options?.start_time;
                            const roundId = isFirst ? '' : kiron_options?.round_id;
                            const endTime = isFirst ? '' : kiron_options?.end_time;
                            return (
                                <td key={index} id={`kiron-period-${index}`} className={` d-flex menu-t sport-check w-100 period-card ${pathname === kiron_options.round_id ? " active" : ""}`}
                                    style={{textAlign: 'center',lineHeight: '1.5'}}>
                                    <div style={{width:"100%", color:"#000"}} >
                                        <div className={` inner-div active d-flex align-items-center kiron-value flex-column justify-content-center link period-height ${isFirst? timeLeft&&isCountdownTimerActive==false?'count-red':timeAfter&&isCountdownTimerActive==true?'count-green':'':''}`}
                                             onClick={(event)=>{handleLinkClick(event);handleNextSelected( startTime,roundId,endTime )}}
                                             style={{width:'60px',cursor:'pointer'}}>
                                            {isFirst && timeLeft&&isCountdownTimerActive==false? (
                                                getTimeInSeconds(timeLeft)>0&&<div  style={{color:'#fff'}} className={`countdown-timer`} >{timeLeft}</div>
                                            ) :isFirst && timeAfter? (
                                                <div style={{color:'#fff'}}    className={`countdown-timer `} >{ended?ended:"LIVE'"+timeAfter}</div>
                                            ):(
                                                <div style={{color:'#fff'}}   id={`x${time}`}>{time}</div>
                                            )}
                                        </div>
                                    </div>
                                </td>
                            );
                        })}

                </tr>
                </tbody>

            </table>

        </div>
    )
};

export default React.memo(KironPeriods);


