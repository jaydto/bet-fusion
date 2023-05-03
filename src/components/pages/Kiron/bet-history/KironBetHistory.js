import React, {useContext, useEffect, useState, useCallback} from "react";
import {Context} from '../../../../context/store';
import makeRequest, {BASE_URL} from '../../../utils/fetch-request';
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
} from 'react-accessible-accordion';

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
        background:'#18242f',
        color:'#ffffff',
        padding: '10px 40px 10px',
        fontSize: '12px'
    },
    bet:{
        background:'#1e2d3b',
        padding: '10px',
        color: '#fff',
        opacity: 0.8,
        marginBottom: '1px'
    }
};

const KironBetHistory = (props) => {
    const [state, dispatch] = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);
    let user = getFromLocalStorage('user');
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
                    console.log('Request failed:', response.status);
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
            <div className={`container-fluid`} style={Styles.headers}>
                <div className="row">
                    <div className="col">CREATED</div>
                    <div className="col">ID</div>
                    <div className="col">GAMES</div>
                    <div className="col">BET AMOUNT</div>
                    <div className="col">POSSIBLE WIN</div>
                    <div className="col">State</div>
                </div>
            </div>
        );
    }
    const BetItem = (props) => {
        const { bet } = props;

        return (
            <div className={`container-fluid`} style={Styles.bet} key={bet.bet_id}>
                <div className="row">
                    <div className="col">{ bet.bet_date}</div>
                    <div className="col">{ bet.bet_id}</div>
                    <div className="col">{ bet.total_games}</div>
                    <div className="col">{ bet.bet_amount}</div>
                    <div className="col">{ bet.possible_win}</div>
                    <div className={`col `}><span className={` badge ${bet.bet_status==="3"?"bg-dark text-warning":bet.bet_status==="5"?"bg-success":bet.bet_status==="1"?"bg-dark ":""}`} style={{color:"white"
                            ,marginTop:"10px", borderRadius: "7px", marginLeft:"1px", padding:"2.9px 9px "}}>{bet.bet_status==="3"?"NOT WON":bet.bet_status==="5"?"WON":bet.bet_status==="1"?"PENDING":""}</span></div>
                </div>
            </div>
        );
    }

    const BetslipHeader = () => {

        return (
            <div className={` slipheader`} >
                <div className="row">

                    <div className="col">Home</div>
                    <div className="col">Away</div>
                    <div className="col">Odds</div>
                    <div className="col">Pick</div>
                    <div className="col">Outcome</div>
                    <div className="col">Status</div>
                </div>
            </div>
        )
    }

    const BetslipItem = (props) => {
        const { betslip } = props;


        return (
            <div className={` kumbafu`}  key={betslip.game_id}>
                <div className="row">
                    <div className="col">{ betslip.home_team}</div>
                    <div className="col">{ betslip.away_team}</div>
                    <div className="col">{ betslip.odd_value}</div>
                    <div className="col">{ betslip.bet_pick}</div>
                    <div className="col">{ betslip.outcome}</div>
                    <div className={`col `}><span className={` badge`} style={{
                        marginTop:"10px", borderRadius: "7px", marginLeft:"1px", padding:"2.9px 9px "}}>{betslip.status==="3"?<FontAwesomeIcon icon={faTimes} style={{color: "yellow", fontSize:"19px"}} size={"lg"}/>:betslip.status==="5"?<FontAwesomeIcon icon={faCheck} style={{color: "green", fontSize:"19px"}} size={"lg"} />:betslip.status==="1"?<FontAwesomeIcon icon={faQuestionCircle} style={{color: "orange", fontSize:"19px"}} size={"lg"}/>:<FontAwesomeIcon icon={faBan} style={{color: "darkgray", fontSize:"19px"}} size={"lg"}/>}</span></div>
                </div>
            </div>
        )
    }
    // const handleBetClick = (event, uuid) => {
    //     if (uuid === activeItem) {
    //         setActiveItem(null);
    //     } else {
    //         setActiveItem(uuid);
    //     }
    // };

    console.log("bethistory",state?.kironbethistory )
    const KironHistoryList = (props) => {

        return (
            <Accordion className={"bg-dark"} >
                { state?.kironbethistory !==null&&state?.kironbethistory !==undefined &&  state?.kironbethistory.map((bet) => (
                    <AccordionItem
                        key = {bet.bet_id}
                        uuid = { bet.bet_id }
                        // onClick={(event) => handleBetClick(event, bet.bet_id)}
                        // isExpanded={activeItem === bet.bet_id}
                        // isCollapsible={activeItem !== bet.bet_id}
                    >
                        <AccordionItemHeading >
                            <AccordionItemButton >
                                <BetItem bet={bet}  key={bet.bet_id}/>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel >
                            <BetslipHeader />
                            {  bet.bet_slip?.map((betslip) => (
                                <BetslipItem
                                    betslip={betslip}
                                    key={betslip.match_id}
                                />
                            ))
                            }
                            { isLoading && <p>Loading ... </p>}
                        </AccordionItemPanel>
                    </AccordionItem>
                ))}
            </Accordion>
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
