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

const KironPeriods= (props) => {
    const {setClosed,setInPlay, setPlayout,setIsCountdownTimerActive,isCountdownTimerActive}=props
    const [state, dispatch] = useContext(Context);
    let [kiron, setKiron] = useState(getFromLocalStorage('kiron-periods'));
    const [timeLeft, setTimeLeft] = useState(0);
    const [timeAfter, setTimeAfter] = useState(null);
    const [ended, setEnded] = useState(false);
    // const [loading,setLoading]=useState(false)
    const [timerColor, setTimerColor] = useState('count-green');
    const [timerInterval, setTimerInterval] = useState(null);
    const [isContinuing,setIsContinuing]=useState(false)
    const firstMatchEndTime=getFromLocalStorage('kiron_end_time')
    const [startCount, setStartCount]=useState(false)

    const kironSearch1 = getFromLocalStorage('kiron_search_data') || {}; // Use empty object as default value if kiron_search_data is null or undefined
    const kironPeriodsRef = useRef(null);
    const newCompetition=new URL(window.location).searchParams.get('competition_id')||getFromLocalStorage('kiron_search_data')?.competition_id||'2'

    const  [initialCompetition, setCompetition] = useState({
        competition_id:newCompetition
    })


    const prevNewData = useRef(initialCompetition);


    useEffect(() => {
        console.log("competition2", initialCompetition)
        console.log("competition3", initialCompetition)
        if (prevNewData.current.competition_id !== initialCompetition?.competition_id ){
            // setLoading(true)
            dispatch({type: "SET", key: "loading", payload:true});
            console.log("competition", initialCompetition)
            const payload={
                start:'',
                round:'',
                end:''
            }
            dispatch({ type: "SET", key: 'current_selection_period', payload: payload })
            prevNewData.current = initialCompetition;
        }
    }, [initialCompetition]);


    useEffect(() => {
        const abortController = new AbortController();
        // setInPlay(false)
        fetchData();

        return () => {
            abortController.abort();
        };
    }, []);



    const fetchData = useCallback(async () => {
        setIsCountdownTimerActive(false);
        let endpoint = "/v1/nare-league/periods";
        let method="POST"

        const newCompetition2= {competition_id:new URL(window.location).searchParams.get('competition_id') || getFromLocalStorage('kiron_search_data')?.competition_id||'2'}

        // const [competition_result] = await Promise.all([
        //     makeRequest({url: endpoint, method: method, data: newCompetition2}),
        // ])
        makeRequest({url: endpoint, method: method, data: newCompetition2}).then(([c_status, c_result] ) =>{

            if (c_status === 200) {
                // setLoading(false)
                dispatch({type: "SET", key: "loading", payload:false});
                setKiron(c_result);
                dispatch({ type: "SET", key: 'periods_data', payload: c_result })

                const keys = Object.keys(c_result);
                const firstKey = keys[0];
                const firstItem = c_result[firstKey];
                dispatch({ type: "SET", key: 'periods_first', payload:  firstItem?.start_time})
                setLocalStorage('kiron-periods', c_result);
                setLocalStorage('kiron_first_period', firstItem?.start_time);
                setLocalStorage('kiron_first_round', firstItem?.round_id);
                setLocalStorage('kiron_end_time', firstItem?.end_time)
            } else {
                fetchData()
            }

        })



    }, []);


    useEffect(()=>{
        const links = document.querySelectorAll('.link');
        links.forEach((link) => link.classList.remove('highlight'));
        console.log("links",links)
        const kironSearch = getFromLocalStorage('kiron_search_data') || {}; // Use empty object as default value if kiron_search_data is null or undefined
        const competition1 = new URL(window.location).searchParams.get('competition_id')||kironSearch?.competition_id||'2'

        if(initialCompetition?.competition_id!==competition1){
            // setLoading(true)
            dispatch({type: "SET", key: "loading", payload:true});
            setTimeAfter(null)
            console.log("competition_local", competition1)
            setCompetition({
                competition_id:competition1
            })
            fetchData()
        }


    },[kironSearch1?.competition_id])
    // console.log("competition",initialCompetition)
    const pathname = window.location.pathname;

    const handleLinkClick=(event)=> {
        // remove highlight class from all links
        const links = document.querySelectorAll('.link');
        links.forEach((link) => link.classList.remove('highlight'));

        // add highlight class to clicked link
        event.currentTarget.classList.add('highlight');
    }




    useEffect(() => {
        console.log("newCompetitionChanged", newCompetition)
        fetchData()
    }, [newCompetition])

    useEffect(() => {
        if (isCountdownTimerActive==false) {
            console.log("Timesinitial_time_use", timeLeft);
            setClosed(false)
            setIsCountdownTimerActive(false)
            setInPlay(false)
            fetchData();
            if (timeLeft< 0) {
                setTimeLeft(0);
            }

        }
    }, [isCountdownTimerActive]);

    useEffect(() => {
      fetchData()
    }, [newCompetition]);

    useEffect(() => {
        let timerInterval;
        const first_period=getFromLocalStorage("kiron_first_period")
        setInPlay(false);
        console.log("periods_first",state?.periods_first)
        let timeLocal = getFromLocalStorage("kiron_first_period") ?? state?.periods_first

        if (!timeLocal) {
            // fetchData();
            return
        }

        let gettime = getTime(timeLocal);
        let time = gettime;
        let timePeriod = new Date(Date.parse(`${new Date().toDateString()} ${time}`));
        let firstRound = timePeriod.getTime();
        let now = new Date().getTime();
        let diff = (firstRound - now);
        let initialTime = Math.floor(diff / 1000);
        let seconds;

        seconds = initialTime % 60;
        let minutes = Math.floor(initialTime / 60);


        let timer = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        setTimeLeft(timer);
        setStartCount(false)

        if (minutes < 0 || (minutes === 0 && seconds === 0)) {
            // setTimeLeft(0)
            clearInterval(timerInterval);
        }

        function timeBefore() {
            timeLocal = getFromLocalStorage("kiron_first_period")
            gettime = getTime(timeLocal);
            time = gettime;
            timePeriod = new Date(Date.parse(`${new Date().toDateString()} ${time}`));
            firstRound = timePeriod.getTime();
            now = new Date().getTime();
            diff = firstRound - now - 1000;
            seconds = initialTime % 60;
            minutes = Math.floor(initialTime / 60);
            timer = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            initialTime = Math.floor(diff / 1000);

            setTimeLeft(timer);
            initialTime -= 1;
            // console.log("time_time", initialTime)

            if (initialTime > 5) {
                setTimerColor('count-red');
                setClosed(false);
            } else if (initialTime <= 10 && initialTime > 0) {
                setTimerColor('count-red');
                // if todo if in another selection close/spinner should be false
                if(state?.current_selection_period?.start.length>0){
                    setClosed(false);
                }else{
                    setClosed(true);
                }
                document.getElementById('countdown').innerHTML = timer;
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
    }, [newCompetition,getFromLocalStorage('kiron_first_round'),state?.current_selection_period?.start ,getFromLocalStorage('kiron_first_period'),startCount]);


    useEffect(()=>{
        console.log("Timescheck_before_load",state?.current_selection_period?.start&&state?.current_selection_period?.start.length>0)
        console.log("Timescheck_before_load1",state?.current_selection_period?.start)
        console.log("Timescheck_before_load2",state?.current_selection_period?.start.length)
        console.log("Timescheck_before_load3",state?.current_selection_period?.start.length>0)

        if(state?.current_selection_period?.start>0){
            setInPlay(false)
            setClosed(false)
            console.log("Timescheck_after_load",state?.current_selection_period?.start)
        }else if(state?.current_selection_period?.start.length==0){
            console.log("Timescheck_after_load2",state?.current_selection_period?.start)
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
                console.log("TimessTime==now&&now<eTime ")
                setInPlay(true)
            } else if(sTime<now&&now<eTime){
                // if(initialTime>1){
                //     console.log("TimesGreatersTime<now&&now<eTime",initialTime)
                //     setInPlay(false)
                // }else{
                    console.log("TimessTime<now&&now<eTime",initialTime)
                    setInPlay(true)
                // }
            }

            // else if(sTime>now&&now<eTime){
            //     console.log("TimessTime>now&&now<eTime")
            //     setInPlay(false)
            // }

        }

    },[state?.current_selection_period])

    //todo check if inplay time is  over
   const time= (new Date(Date.parse(`${new Date().toDateString()} ${getTime(firstMatchEndTime)}`))-new Date().getTime())/1000
    console.log("time_check",time)
    let totalSeconds = timeAfter;
    useEffect(() => {

        if (isCountdownTimerActive) {
            if(state?.current_selection_period?.start.length>0){
                setInPlay(false)
            }else if(state?.current_selection_period?.start.length==0){
                setInPlay(true)
            }

            // setInPlay(true);
            const timerVar = setInterval(countTimer, 722);
            setTimeLeft(getTime(Date.now()))
            function countTimer() {
                ++totalSeconds;
                const seconds = totalSeconds;
                console.log("secondstime", seconds)
                setEnded(null)
                if(state?.current_selection_period?.start&&state?.current_selection_period?.start.length>0){
                    setInPlay(false)
                }else if(state?.current_selection_period?.start.length==0){
                    setInPlay(true)
                }
                // setTimeAfter(seconds)
                if (seconds < 90) {
                    setTimeAfter(seconds)
                    setPlayout(seconds)
                    // if(state?.)//todo when in another selection inPlay False spinner close
                } else {
                    console.log("checkEndINPLay", seconds)
                    setIsCountdownTimerActive(false);

                    setTimeAfter(null)

                    clearInterval(timerVar);
                    // fetchData()
                    setStartCount(true)
                    setEnded('Ended')
                    setTimeout(()=>{
                        setInPlay(false)
                        fetchData()
                        setTimeAfter(null)
                        }, 1500);
                }
            }

            return () => clearInterval(timerVar);
        }
    }, [isCountdownTimerActive,newCompetition,state?.current_selection_period?.start]);


    function getTimeInSeconds(timeString) {
        const [minutes, seconds] = timeString.split(':');
        const secondsArray = seconds.split('0').map(Number);
        const totalSeconds = (secondsArray[1] !== 0 ? secondsArray[1] : secondsArray[0]) ?? Number(seconds);

        console.log("allSeconds",totalSeconds)
        return totalSeconds < 0 ? 0 : totalSeconds;
    }


    const handleNextSelected=(start,round, end)=>{
        const payload={
            start:start,
            round:round,
            end:end
        }
        console.log("start_round_end", start+" round "+round+" end "+end)
        console.log("payload_period: ",payload)
        dispatch({ type: "SET", key: 'current_selection_period', payload: payload })

    }

    console.log("check_inPlayTime",isCountdownTimerActive)
    console.log("check_timeInPlay",timeAfter)
    console.log("check_timeLeftBeforeMatchStarts",timeLeft)
    const kironTabVisible=()=>{
        const time= (new Date(Date.parse(`${new Date().toDateString()} ${getTime(firstMatchEndTime)}`))-new Date().getTime())/1000

        document.addEventListener("visibilitychange", (event) => {
            if (document.visibilityState == "visible") {
                if(window.location.pathname=="/nare-league"){
                    if(time<=0){
                        fetchData()
                        console.log("switched tab",time)
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
                <tr className={"d-flex league-row gap-2 justify-content-center align-items-center  kiron-period"} ref={kironPeriodsRef} style={{ flex: '0 0 auto', overflowX:"hidden" }}>
                    {
                        // loading ?
                        // <td className={`text-center mt-2 text-white d-block`}>
                        //     <Element/>
                        // </td>
                        // :
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
                                        <div className={`card inner-div active d-flex align-items-center kiron-value flex-column justify-content-center link period-height ${isFirst? timeLeft&&isCountdownTimerActive==false?'count-red':timeAfter&&isCountdownTimerActive==true?'count-green':'':''}`}
                                             onClick={(event)=>{handleLinkClick(event);handleNextSelected( startTime,roundId,endTime )}}
                                             style={{width:'60px',cursor:'pointer'}}>
                                            {isFirst && timeLeft&&isCountdownTimerActive==false? (
                                                getTimeInSeconds(timeLeft)>0&&<div  style={{color:'#fff'}} className={`countdown-timer`} >{timeLeft}</div>
                                            ) :isFirst && timeAfter? (
                                                <div style={{color:'#fff'}}    className={`countdown-timer `} >{ended?ended:'00:'+timeAfter}</div>
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


