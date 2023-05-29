import React, {useContext, useEffect, useState, useCallback} from "react";
import {Context} from '../../../../context/store';
import  {BASE_URL} from '../../../utils/fetch-request';

import '../../../../assets/css/accordion.react.css';
import axios from "axios";
import {getFromLocalStorage} from "../../../utils/local-storage";
import {Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan, faCheck, faQuestionCircle, faReceipt, faTimes} from "@fortawesome/free-solid-svg-icons";


const Styles = {
    container: {
        background:'#22323e !important',
    },
    headers: {
        // background:'#18242f',
        color:'var(--light)',
        padding: '10px 40px 10px',
    },
    bet:{
        // background:'#1e2d3b',
        padding: '10px',
        color: 'var(--light)',
        opacity: 0.8,
        marginBottom: '1px'
    }
};

const KironBetHistory = (props) => {
    const [state, dispatch] = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);
    let user = getFromLocalStorage('user');
    const [betLoading, setBetLoading]=useState(false)
    // const [itemState, setItemState] = useState({});
    const [activeItem, setActiveItem] = useState(null);

    const fetchData = useCallback(async() => {
        if(isLoading) return;
        setIsLoading(true);
        let endpoint = "/v1/nare-league/bet-history";
        let method= "POST"

        const API_URL = BASE_URL

        const token = user?.token

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            "accept": "*/*"
        };
        const options={
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        }

        axios.post(`${API_URL}${endpoint}`,null ,{headers: headers,
            ...options})
            .then(response => {
                if (response.status === 200) {
                    dispatch({type: "SET", key: "kironbethistory", payload: response.data});
                        setIsLoading(false);

                } else {
                    // console.log('Request failed:', response.status);
                    // handle the error condition
                }
            })
            .catch(error => {
                console.error(error);
            });


    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const KironItemHeader = (props) => {
        return (
            <div className={`container-fluid kiron-font-size kiron-bet-history`} style={Styles.headers}>
                <div className="row">
                    <div className="col">CREATED</div>
                    <div className="col">ID</div>
                    <div className="col">GAMES</div>
                    <div className="col">BET AMOUNT</div>
                    <div className="col">POSSIBLE WIN</div>
                    <div className="col">Status</div>
                </div>
            </div>
        );
    }
    const BetItem = (props) => {
        const { bet } = props;
        return (
            <div className={`container-fluid`} style={Styles.bet} key={bet.bet_id}>
                <div className="row">
                    <div className="col kiron-font-size">{ bet.bet_date}</div>
                    <div className="col kiron-font-size">{ bet.bet_id}</div>
                    <div className="col kiron-font-size">{ bet.total_games}</div>
                    <div className="col kiron-font-size">{ bet.bet_amount}</div>
                    <div className="col kiron-font-size">{ bet.possible_win}</div>
                    <div className={`col kiron-font-size `}><span className={` badge ${bet.bet_status==="3"?"bg-dark text-warning":bet.bet_status==="5"?"bg-success":bet.bet_status==="1"?"bg-dark ":""}`} style={{color:"white"
                            ,marginTop:"10px", borderRadius: "7px", marginLeft:"1px", padding:"2.9px 9px "}}>{bet.bet_status==="3"?"NOT WON":bet.bet_status==="5"?"WON":bet.bet_status==="1"?"PENDING":""}</span></div>
                </div>
            </div>
        );
    }

    const BetslipHeader = () => {

        return (
            <div className={` slipheader `} >
                <div className="row">

                    <div className="col kiron-font-size">Home</div>
                    <div className="col kiron-font-size">Away</div>
                    <div className="col kiron-font-size">Odds</div>
                    <div className="col kiron-font-size">Pick</div>
                    <div className="col kiron-font-size">Outcome</div>
                    <div className="col kiron-font-size">Status</div>
                </div>
            </div>
        )
    }

    const BetslipItem = (props) => {

        // console.log("prematch_betslip", state?.kironbetdetails)


        return (

            state?.kironbetdetails!==undefined&&state?.kironbetdetails!==null&&!betLoading?state?.kironbetdetails.map((betlip_detail,id)=>(
              <div className={`accordion-betslips-style kiron-font-size`}  key={betlip_detail.game_id}>
                  <div className="row">
                      <div className="col  d-flex  align-items-center kiron-font-size">{ betlip_detail.home_team}</div>
                      <div className="col  d-flex  align-items-center kiron-font-size">{ betlip_detail.away_team}</div>
                      <div className="col  d-flex  align-items-center kiron-font-size">{betlip_detail.odd_value}</div>
                      <div className="col  d-flex  align-items-center kiron-font-size">{ betlip_detail.bet_pick}</div>
                      <div className="col  d-flex  align-items-center kiron-font-size">{ betlip_detail.outcome}</div>
                      <div className={`col  d-flex  align-items-center  kiron-font-size`}><span className={` badge`} style={{
                         borderRadius: "7px", marginLeft:"1px", padding:"2.9px 9px "}}>{betlip_detail.status===3?<FontAwesomeIcon icon={faTimes} style={{color: "yellow", fontSize:"19px"}} size={"lg"}/>:betlip_detail.status===5?<FontAwesomeIcon icon={faCheck} style={{color: "green", fontSize:"19px"}} size={"lg"} />:betlip_detail.status===1?<FontAwesomeIcon icon={faQuestionCircle} style={{color: "orange", fontSize:"19px"}} size={"lg"}/>:<FontAwesomeIcon icon={faBan} style={{color: "darkgray", fontSize:"19px"}} size={"lg"}/>}</span></div>
                  </div>
              </div>)
            ):<div className={`text-center mt-2 text-white d-block`}>
                <Spinner animation={'grow'} size={'lg'}/>
            </div>
        )
    }


    const [activeIndex, setActiveIndex] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const fetchDataDetails = useCallback(async(id) => {
        if(isLoading) return;
        let endpoint = "/v1/nare-league/bet-details";
        const data={
            'bet_id':id
        }
        setBetLoading(true)
        const API_URL = BASE_URL

        const token = user?.token

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            "accept": "*/*"
        };
        const options={
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        }

        axios.post(`${API_URL}${endpoint}`,data ,{headers: headers,
            ...options})
            .then(response => {
                if (response.status === 200) {
                    dispatch({type: "SET", key: "kironbetdetails", payload: response.data});
                    setIsLoading(false);
                    setBetLoading(false)

                } else {
                    // console.log('Request failed:', response.status);
                    // handle the error condition
                }
            })
            .catch(error => {
                console.error(error);
            });


    }, []);

    const handleAccordionClick = (id) => {
        if (id === activeIndex) {
            // if the clicked bet is already active, close the panel
            setIsOpen(false);
            setActiveIndex(null);
        } else {
            // otherwise, open the panel for the clicked bet
            setIsOpen(true);
            setActiveIndex(id);
            fetchDataDetails(id)

        }
    };


    const KironHistoryList = (props) => {

        return (
       <div className="accordion">
                { state?.kironbethistory !==null&&state?.kironbethistory !==undefined &&  state?.kironbethistory.map((bet) => (
                <React.Fragment key={bet?.bet_id}>
                    <div className="accordion-item bet-history-kiron">
                    <h2 className="accordion-header " id="headingOne">
                <button className="accordion-button bet-history-button" onClick={()=>handleAccordionClick(bet?.bet_id)}>
                    <BetItem bet={bet}  key={bet.bet_id}/>
                </button>
                    </h2>
                    </div>
                    {isOpen && activeIndex === bet.bet_id && (
                        <div className="accordion-panel">
                            <BetslipHeader />
                            <BetslipItem />
                        </div>
                    )}</React.Fragment>
                    ))}
            </div>
        );

    }

    const PageTitle = () => {
        return (
            <div className='col-md-12 primary-bg p-4 text-center'>
                <h4 className="inline-block">
                    BET HISTORY
                </h4>
            </div>
        )
    }
    return (
        <>

                <div className="d-flex flex-row justify-content-between">
                        <div className="w-100">
                            <PageTitle />
                            <KironItemHeader />
                            {isLoading ?
                                <div className={`text-center mt-2 text-white d-block`}>
                                    <Spinner animation={'grow'} size={'lg'}/>
                                </div> :
                            <KironHistoryList  />}
                        </div>


                </div>


        </>
    )
}

export default KironBetHistory
