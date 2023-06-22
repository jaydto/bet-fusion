import React, {useCallback, useContext, useEffect, useState} from "react";
import {Context} from '../context/store';
import makeRequest from './utils/fetch-request';
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
} from 'react-accessible-accordion';

import '../assets/css/accordion.react.css';
import Testimonials from "./carousel/Testimonials";
import useWindowDimensions from "./header/Dimensions";


const Header = React.lazy(()=>import('./header/header'));
const Footer = React.lazy(()=>import('./footer/footer'));
const SideBar = React.lazy(()=>import('./sidebar/awesome/Sidebar'));
const CarouselLoader = React.lazy(()=>import('./carousel/index'));
const Right = React.lazy(()=>import('./right/index'));

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

const MyBets = React.memo(
    (props) => {
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
            <div className={`${width<=767?"w-100":'container'}`} style={Styles.headers}>
                <div className="row">
                    {/*<div className={`${width<=767?"col":"d-none"}`}></div>*/}
                    <div className="col text-center mybets-font overflow-hidden">CREATED</div>
                    <div className="col  text-center mybets-font overflow-hidden">ID</div>
                    <div className="col text-center mybets-font overflow-hidden">GAMES</div>
                    <div className="col text-center mybets-font overflow-hidden">BET AMOUNT</div>
                    <div className="col text-center mybets-font overflow-hidden">POSSIBLE WIN</div>
                    <div className="col text-center mybets-font overflow-hidden">TAX</div>
                    <div className="col text-center mybets-font overflow-hidden">State</div>
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
            <div className={`${width<=767?"w-100":"container"}`} style={Styles.bet} key={bet.bet_id}>
                <div className="row">
                    <div className="col text-center mybets-font overflow-hidden">{ bet.created}</div>
                    <div className="col text-center mybets-font overflow-hidden">{ bet.bet_id}</div>
                    <div className="col text-center mybets-font overflow-hidden">{ bet.total_matches}</div>
                    <div className="col text-center mybets-font overflow-hidden">{ bet.bet_amount}</div>
                    <div className="col text-center mybets-font overflow-hidden">{ bet.possible_win}</div>
                    <div className="col text-center mybets-font overflow-hidden">{ bet.tax}</div>
                    { canCancel == false
                        ? <div className="col text-center mybets-font overflow-hidden">{ betStatus}</div>
                        : cancelBetMarkup()
                    }
                </div>
            </div>
        );
    }

    const BetslipHeader = () => {
        
        return (
            <div className={`container slipheader`} >
                <div className="row">
                    <div className="col">Start</div>
                    <div className="col">Home</div>
                    <div className="col">Away</div>
                    <div className="col">MKT</div>
                    <div className="col">Odds</div>
                    <div className="col">Pick</div>
                    <div className="col">Outcome</div>
                    <div className="col">FT</div>
                    <div className="col">Status</div>
                </div>
            </div>
        )
    }

    const BetslipItem = (props) => {
        const { betslip } = props;

		
        return (
            <div className={`container accordion-betslips-style`}  key={betslip.game_id}>
                <div className="row">
                    <div className="col">{ betslip.start_time}</div>
                    <div className="col">{ betslip.home_team}</div>
                    <div className="col">{ betslip.away_team}</div>
                    <div className="col">{ betslip.market}</div>
                    <div className="col">{ betslip.odd_value}</div>
                    <div className="col">{ betslip.bet_pick}</div>
                    <div className="col px-1">{ betslip.outcomes}</div>
                    <div className="col">{ betslip.ft_result}</div>
                    <div className="col">{ betslip.status}</div>
                </div>
            </div>
        )
    }

    const MyBetsList = (props) => {
		return (
         <Accordion className={" px-1"} >
			{state?.mybets && state.mybets.map((bet,index) => (
				<AccordionItem
                    key = {index}
                    uuid = { bet.bet_id }>
					<AccordionItemHeading >
                        <AccordionItemButton >
							<BetItem bet={bet}  key={bet.id}/>
						</AccordionItemButton>
					</AccordionItemHeading>
					<AccordionItemPanel >
                     <BetslipHeader />
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
            <div className='col-md-12 primary-bg p-4 text-center'>
                <h4 className="inline-block">
                    MY BETS
                </h4>
            </div>
       )
    }
    return (
        <>
            <Header user={state?.user}/>
            <div className={(width<=575?state?.user?"user_logged":"amt":"amt")}>
                <div className="d-flex flex-row justify-content-between">
                    <SideBar loadCompetitions/>
                    <div className="gz home" style={{width: '100%'}}>
                        <div className="homepage">
                            <CarouselLoader/>
                            <Testimonials/>
                            <PageTitle />
                           <div className={'top-login-background-img-bg'}>
                               <BetItemHeader />
                               <MyBetsList  />
                           </div>
                        </div>
                    </div>

                        <Right/>


                </div>
            </div>
            <div className={"footer-mobile-none mobile-top"}>
                <Footer/>
            </div>

        </>
    )
})

export default React.memo(MyBets)
