import React, {useCallback, useContext, useEffect, useState} from "react";
import {Context} from '../../../../context/store';
import makeRequest from '../../../utils/fetch-request';
import './newProfile.css'
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import '../.././../../assets/css/accordion.react.css';
import useWindowDimensions from "../../../header/Dimensions";
import Header from "../../../header/header";

const Styles = {
    container: {
        background:'#22323e !important',
    },
    headers: {
        background:'var(--betnare-header-bg)',
        color:'var(--light)',
        padding: '10px 10px 10px 40px',
        fontSize: '12px'
    },
    bet:{
        background:'var(--mybets-slip)',
        padding: '10px',
        color: 'var(--light)',
        opacity: 0.8,
        marginBottom: '1px'
    }
};

const MyBets = (props) => {
    const [state, dispatch] = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);
    const {height, width} = useWindowDimensions();

    const fetchData = useCallback(async() => {
        if(isLoading) return;
        setIsLoading(true);
        let endpoint = "/v1/full/betdetails";
        makeRequest({url: endpoint, method: "POST", data: null}).then(([status, result]) => {
            dispatch({type: "SET", key: "mybets", payload: result});
            setIsLoading(false);
        });

    }, []);

    useEffect(() => {
       fetchData();
    }, [fetchData]);

    const BetItemHeader = (props) => {
        return (
            <div className={`${width<=767?"w-100 header-styling-mobile ":'container'}`} style={Styles.headers}>
                <div className="row w-100">
                    <div className="col text-center mybets-font overflow-hidden">DATE</div>
                    <div className="col  text-center mybets-font overflow-hidden">BET ID</div>
                    <div className="col text-center mybets-font overflow-hidden">GAMES</div>
                    <div className="col text-center mybets-font overflow-hidden">AMOUNT</div>
                    <div className="col text-center mybets-font overflow-hidden">WIN</div>
                    <div className="col text-center mybets-font overflow-hidden">STATUS</div>
                </div>
            </div>
        );
    }
    const BetItem = (props) => {
        const { bet } = props;

        const [betStatus, setBetStatus] = useState(bet.status_desc);
        const [canCancel, setCanCancel] = useState(bet.can_cancel === 1);

        const cancelBet = () => {
            let endpoint = '/bet-cancel';
            let data = {
                bet_id:bet.bet_id,
                cancel_code:101,
            }
            makeRequest({url: endpoint, method: "POST", data: data, use_jwt:true}).then(([status, result]) => {
                if(status === 201){
                    setBetStatus('CANCEL RQ');
                    setCanCancel(false);
                }
            });
        };

        const cancelBetMarkup = () => {
            return (
                <div className="col">
                    <button
                        title="Cancel Bet"
                        className="col btn btn-sm place-bet-btn "
                        onClick={()=> cancelBet()}
                    >
                        Cancel
                    </button>
                </div>
            )
        }

        return (
            <div className={`${width<=767?"w-100 mybets-details":"container"}`} style={Styles.bet} key={bet.bet_id}>
                <div className="row w-100">
                    <div className="col text-center mybets-font overflow-hidden">{ bet.created}</div>
                    <div className="col text-center mybets-font overflow-hidden">{ bet.bet_id}</div>
                    <div className="col text-center mybets-font overflow-hidden">{ bet.total_matches}</div>
                    <div className="col text-center mybets-font overflow-hidden">{ bet.bet_amount}</div>
                    <div className="col text-center mybets-font overflow-hidden">{ bet.possible_win}</div>
                    { canCancel == false
                        ? <div className={`col text-center mybets-styling-mobile`}><span className={` badge  ${betStatus=="LOST"?"bg-dark text-warning":betStatus=="WON"?"bg-success":betStatus=="PENDING"?"bg-dark ":""}`} style={{color:"white"
                            ,marginTop:"10px", borderRadius: "7px", marginLeft:"1px", padding:"2.9px 9px "}}>{betStatus=="LOST"?"NOT WON":betStatus}</span></div>
                        : cancelBetMarkup()
                    }
                </div>
            </div>
        );
    }


    const BetslipItem = (props) => {
        const { betslip } = props;

		
        return (
            <div className={`container accordion-betslips-style`}  key={betslip.game_id}>
                <div className="row">
                    <div className="card shadow-sm d-flex background-mybets-mobile" style={{background:'transparent',border:'none'}}>
                        <div className="d-flex flex-column bg-dark mx-4 p-4 card-mybets-radius">
                            <div className="col d-flex px-4">
                                <div className={'col '}><h4 className={'header-slip-mybets'}>{betslip.home_team}</h4></div>
                                <div className={'col text-center'}><h2 className={'text-success'}>VS</h2></div>
                                <div className={'col text-end'}><h4 className={'header-slip-mybets'}>{betslip.away_team}</h4></div>
                            </div>
                            <div className="col d-flex text-center">
                                <strong style={{color:'dark-orange',paddingBottom:'5px'}}>{betslip.start_time}</strong>
                            </div>
                            <div
                                className="d-flex flex-column px-5 profile-bg mb-3 rounded-3 px-5 mx-3 slip-border-radius-mybets">
                                <div className="col d-flex ">
                                    <div className={'col'}>Pick</div>
                                    <div className={'col text-end'}>{betslip.bet_pick}</div>
                                </div>
                                <div className="col d-flex ">
                                    <div className={'col'}>Market</div>
                                    <div className={'col text-end'}>{betslip.market}</div>
                                </div>
                                <div className="col d-flex ">
                                    <div className={'col'}>Odd</div>
                                    <div className={'col text-end'}>{betslip.odd_value}</div>
                                </div>
                                <div className="col d-flex ">
                                    <div className={'col'}>Outcome</div>
                                    <div className={'col text-end'}>{betslip.outcomes}</div>
                                </div>
                                <div className="col d-flex ">
                                    <div className={'col'}>Status</div>
                                    <div className={'col text-end'}><span
                                        className={` badge  ${betslip.status == "LOST" ? "bg-dark text-warning" : betslip.status == "WON" ? "bg-success" : betslip.status == "PENDING" ? "bg-dark " : ""}`}
                                        style={{
                                            color: "white"
                                            ,
                                            marginTop: "10px",
                                            borderRadius: "7px",
                                            marginLeft: "1px",
                                            padding: "2.9px 9px "
                                        }}>{betslip.status == "LOST" ? "NOT WON" : betslip.status}
                              </span>
                                    </div>
                                </div>

                            </div>

                        </div>
                   </div>

                </div>
            </div>
        )
    }

    const MyBetsList = (props) => {
		return (
         <Accordion className={" px-1"} >
			{state?.mybets && state.mybets.map((bet) => (
				<AccordionItem
                    key = {bet.bet_id}
                    uuid = { bet.bet_id }>
					<AccordionItemHeading >
                        <AccordionItemButton >
							<BetItem bet={bet}  key={bet.id}/>
						</AccordionItemButton>
					</AccordionItemHeading>
					<AccordionItemPanel >
                     {/*<BetslipHeader />*/}
					{  bet.betslip?.map((betslip) => (
                         <BetslipItem 
                            betslip={betslip}  
                            key={betslip.bet_slip_id}
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
            <div className='col-md-12 background-profile p-4 text-center'>
                <h4 className="inline-block">
                    MY BETS
                </h4>
            </div>
       )
    }
    return (
        <>
            <div >
                <Header/>
                {/*<div className={'back-navigation original-button top-spacing'}  onClick={()=>window.history.back()}>*/}
                {/*    <FontAwesomeIcon icon={faArrowLeft} className={'back-navigation-icon'} /> Back*/}
                {/*</div>*/}
                <div className="container top-spacing">
                    <div className="iphone background-profile">
                        {/*<div className="header">*/}
                        {/*    <div className="user-profile d-flex align-items-center">*/}
                        {/*        <img src={accounts} className="user-photo "/>*/}

                        {/*    </div>*/}
                        {/*    /!*<div className="header-summary">*!/*/}
                        {/*    /!*    <div className="summary-text d-flex gap-2 text-align-center">*!/*/}
                        {/*    /!*    *!/*/}
                        {/*    /!*        <>*!/*/}
                        {/*    /!*            <Link to="/" className={'betslip-links'}  style={{textDecoration: "none", color: "black"}}>*!/*/}
                        {/*    /!*                <div className="navigations-mybets-page align-items-end ">*!/*/}
                        {/*    /!*                    <div className="b-details">*!/*/}
                        {/*    /!*                        <div className="b-title">Home </div>*!/*/}
                        {/*    /!*                    </div>*!/*/}
                        {/*    /!*                    <div className="b-icon">*!/*/}
                        {/*    /!*                        /!*<i className="fas fa-power-off" style={{fontSize: "24px"}}></i>*!/*!/*/}
                        {/*    /!*                        <FontAwesomeIcon  icon={faHome} style={{fontSize: "24px"}}/>*!/*/}
                        {/*    /!*                    </div>*!/*/}
                        {/*    /!*                </div>*!/*/}
                        {/*    /!*            </Link>*!/*/}
                        {/*    /!*            <Link to="/logout" className={'betslip-links'} style={{textDecoration: "none"}}>*!/*/}
                        {/*    /!*                <div className="navigations-mybets-page align-items-end ">*!/*/}
                        {/*    /!*                    <div className="b-details">*!/*/}
                        {/*    /!*                        <div className="b-title">logout </div>*!/*/}
                        {/*    /!*                    </div>*!/*/}
                        {/*    /!*                    <div className="b-icon">*!/*/}
                        {/*    /!*                        /!*<i className="fas fa-power-off" style={{fontSize: "24px"}}></i>*!/*!/*/}
                        {/*    /!*                        <FontAwesomeIcon  icon={faPowerOff} style={{fontSize: "24px"}}/>*!/*/}
                        {/*    /!*                    </div>*!/*/}
                        {/*    /!*                </div>*!/*/}
                        {/*    /!*            </Link>*!/*/}

                        {/*    /!*        </>*!/*/}
                        {/*    /!*    </div>*!/*/}
                        {/*    /!*</div>*!/*/}
                        {/*</div>*/}
                        <div className="d-flex flex-row justify-content-between">

                            <div className="gz home" style={{width: '100%'}}>

                                <PageTitle />
                                <div className={'top-login-background-img-bg'}>
                                    <BetItemHeader />
                                    <MyBetsList  />
                                </div>

                            </div>
                        </div>
                    </div>


                </div>

            </div>


        </>
    )
}

export default React.memo(MyBets)
