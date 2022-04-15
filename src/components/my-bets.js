import React, {useContext, useEffect, useState, useCallback} from "react";
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

const Header = React.lazy(()=>import('./header/header'));
const Footer = React.lazy(()=>import('./footer/footer'));
const SideBar = React.lazy(()=>import('./sidebar/sidebar'));
const CarouselLoader = React.lazy(()=>import('./carousel/index'));
const Right = React.lazy(()=>import('./right/index'));

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

const MyBets = (props) => {
    const [state, dispatch] = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);

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
       console.log("state.mybets", state?.mybets);
    }, [fetchData]);

    const BetItemHeader = (props) => {
        return (
            <div className={`container`} style={Styles.headers}>
                <div className="row">
                    <div className="col">ID</div>
                    <div className="col">ID</div>
                    <div className="col">GAMES</div>
                    <div className="col">BET AMOUNT</div>
                    <div className="col">POSSIBLE WIN</div>
                    <div className="col">TAX</div>
                    <div className="col">WON</div>
                </div>
            </div>
        );
    }
    const BetItem = (props) => {
        const { bet } = props;
        return (
            <div className={`container`} style={Styles.bet} key={bet.bet_id}>
                <div className="row">
                    <div className="col">{ bet.created}</div>
                    <div className="col">{ bet.bet_id}</div>
                    <div className="col">{ bet.total_matches}</div>
                    <div className="col">{ bet.bet_amount}</div>
                    <div className="col">{ bet.possible_win}</div>
                    <div className="col">{ bet.tax}</div>
                    <div className="col">{ bet.status }</div>
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
                    <div className="col">Market</div>
                    <div className="col">Odds</div>
                    <div className="col">Pick</div>
                    <div className="col">Outcome</div>
                    <div className="col">FT</div>
                    <div className="col">Won</div>
                </div>
            </div>
        )
    }

    const BetslipItem = (props) => {
        const { betslip } = props;
		
	    console.log("Reloading betslip again", betslip.bet_id, betslip.game_id);
        return (
            <div className={`container kumbafu`}  key={betslip.game_id}>
                <div className="row">
                    <div className="col">{ betslip.start_time}</div>
                    <div className="col">{ betslip.home_team}</div>
                    <div className="col">{ betslip.away_team}</div>
                    <div className="col">{ betslip.market}</div>
                    <div className="col">{ betslip.odd_value}</div>
                    <div className="col">{ betslip.bet_pick}</div>
                    <div className="col">{ betslip.outcomes}</div>
                    <div className="col">{ betslip.ft_result}</div>
                    <div className="col">{ betslip.win}</div>
                </div>
            </div>
        )
    }

    const MyBetsList = (props) => {
        console.log("MyBetsList ...");
		return (
         <Accordion >
			{state?.mybets && state.mybets.map((bet) => (
				<AccordionItem 
                    key = {bet.bet_id} 
                    uuid = { bet.bet_id }
					>
					<AccordionItemHeading>
						<AccordionItemButton>
							<BetItem bet={bet} />
						</AccordionItemButton>
					</AccordionItemHeading>
					<AccordionItemPanel>
                     <BetslipHeader />
					{  bet.betslip?.map((betslip) => (
                         <BetslipItem betslip={betslip} />  
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
            <div className="by amt">
                <div className="gc">
                    <SideBar loadCompetitions />
                    <div className="gz home">
                        <div className="homepage">
                            <CarouselLoader/>
                            <PageTitle />
                            <BetItemHeader />
                            <MyBetsList  />
                        </div>
                    </div>
                    <Right/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default MyBets
