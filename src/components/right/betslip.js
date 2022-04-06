import React,{ useState, useEffect, useContext, useCallback} from 'react';
import BetslipSubmitForm from './betslip-submit-form';
import { Context }  from '../../context/store';
import { 
    removeFromSlip, 
    removeFromJackpotSlip, 
    getBetslip, 
    getJackpotBetslip
}  from '../utils/betslip';

import PerfectScrollbar from 'react-perfect-scrollbar';

const clean_rep = (str) => {
    str = str.replace(/[^A-Za-z0-9\-]/g, '');
    return str.replace(/-+/g, '-');
}

const BetSlip = (props) => {
    const [state, dispatch] = useContext(Context);                              
    const {jackpot } = props;
    const [betslipKey, setBetslipKey] = useState("betslip");
    const [totalOdds, setTotalOdds] = useState(1);

    const updateBetslip = useCallback(()=> {
       if(state?.[betslipKey]){
            let odds= Object.values(state[betslipKey]).reduce((previous, {odd_value}) => {
                return previous * odd_value;
            }, 1 );
            setTotalOdds(odds);
        }
    }, [state?.[betslipKey]]);

    const setJackpotSlipkey = useCallback(()=>{
        if(jackpot === true ) {
            setBetslipKey("jackpotbetslip");
        }
    }, [jackpot]);


    const loadBetslip = useCallback(() => {
        if(!state[betslipKey]) {
            let b = jackpot === true 
                ? getJackpotBetslip()
                : getBetslip();
            dispatch({type:"SET", key:betslipKey, payload:b});
        }
    }, []);

    useEffect(() => {
        loadBetslip();
    }, [loadBetslip]);

    useEffect(() => {
        setJackpotSlipkey();
    }, [setJackpotSlipkey]);

    useEffect(() => {
        updateBetslip();
    }, [updateBetslip]);

    const handledRemoveSlip = (match) => {
       let betslip = jackpot !== true 
            ? removeFromSlip(match.match_id)
            : removeFromJackpotSlip(match.match_id);

       let match_selector = match.match_id + "_selected";
       let ucn = clean_rep(                                                         
                       match.match_id                                                      
                       + "" + match.sub_type_id                                            
                       + (match.bet_pick)                                          
                   );   
       
       dispatch({type:"SET", key:betslipKey, payload:betslip});
       dispatch({type:"SET", key:match_selector, payload:"remove."+ucn});
    }

    return (
        <div className="bet-body">

          <PerfectScrollbar style={{ maxHeight: "60vh" }}> 
           <ul>
            { state?.[betslipKey] && Object.entries(state[betslipKey]).map(([match_id, slip]) => {
                let odd = slip.odd_value;
                let no_odd_bg = odd === 1 ? '#f29f7a' : '';

                return (
                    <li className="bet-option hide-on-affix" key={match_id} 
                        style={{background:no_odd_bg}} >
                                
                        <div className="bet-cancel">
                            <input id={slip.match_id} type="submit" value="X" onClick={() => handledRemoveSlip(slip)} />
                        </div>
                        <div className="bet-value">
                          <b>
                            {<span style={{float:"left", width:"auto",fontWeight:"bold"}}>{slip.sport_name},&nbsp;</span>} 
                            {slip.bet_type == 0  && ' Pre-match'}
                            {slip.bet_type == 1  && ' Live'}
                           </b>
                         </div>
                        <div className="row">
                            <div className="bet-value">{`${slip.home_team} - ${slip.away_team}`}
                                <br /><span className="sp_sport" ></span>
                            </div>
                        </div>
                        <div className="row">
                        <div className="bet-value">
                            Market - {slip.odd_type }
                         </div>
                        </div>
                        <div className="bet-pick" ><b>Your Pick - {slip.bet_pick}
                            <span className="bet-odd">{slip.odd_value}
                               { slip.odd_value === 1 &&
                                        (<span style={{color:"#cc0000", fontSize:"11px", display:"block"}}>Market Disabled</span>)
                               }
                            </span></b>
                        </div>

                    </li>)
                })
            }
            </ul>
          </PerfectScrollbar>
        <BetslipSubmitForm 
            totalOdds={totalOdds}
            betslip = {state?.[betslipKey]}
            totalGames = { state?.[betslipKey] 
                ? Object.keys(state[betslipKey]).length :  0 } 
            jackpot={jackpot} 
        />

    </div>
    )
}
export default React.memo(BetSlip);
