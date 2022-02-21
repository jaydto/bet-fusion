import React,{ useState, useEffect, useContext} from 'react';
import BetslipSubmitForm from './betslip-submit-form';
import { Context }  from '../../context/store';
import { removeFromSlip }  from '../utils/betslip';
import PerfectScrollbar from 'react-perfect-scrollbar';

const clean_rep = (_str) => {
    _str = _str.replace(/[^A-Za-z0-9\-]/g, '');
    return _str.replace(/-+/g, '-');
}

const BetSlip = (props) => {
    const {betslip, setBetSlip} = useState();
    const [bonusAmout, setBonusAmount] = useState(0);
    const [state, dispatch] = useContext(Context);                              

    const [totalOdds, setTotalOdds] = useState(1);
    useEffect(() => {
        if(state?.betslip){
            let odds = 1;
            Object.entries(state.betslip).map(([match_id, slip]) => {
                odds = Math.round(odds*slip.odd_value, 2);
            });
            setTotalOdds(odds);
        }
    }, [state?.betslip]);

    const handledRemoveSlip = (match) => {
       let betslip = removeFromSlip(match.match_id); 
       let match_selector = match.match_id + "_selected";
       let ucn = clean_rep(                                                         
                       match.match_id                                                      
                       + "" + match.sub_type_id                                            
                       + (match.bet_pick)                                          
                   );   
       
       dispatch({type:"SET", key:"betslip", payload:betslip});
       dispatch({type:"SET", key:match_selector, payload:"remove."+ucn});
    }
    return (
        <div className="bet-body">

          <PerfectScrollbar style={{ maxHeight: "60vh" }}> 
           <ul>
            { state?.betslip && Object.entries(state.betslip).map(([match_id, slip]) => {
                let odd = slip.odd_value;
                let no_odd_bg = odd == 1 ? '#f29f7a' : '';

                return (
                    <li className="bet-option hide-on-affix" key={match_id} 
                        style={{background:no_odd_bg}} >
                                
                        <div className="bet-cancel">
                            <input id={slip.match_id} type="submit" value="X" onClick={() => handledRemoveSlip(slip)} />
                        </div>
                        <div className="bet-value">{`${slip.home_team} v ${slip.away_team}`}
                            <br /><span className="sp_sport" ></span>
                        </div>
                        <div className="clearfix row">{!slip?.live && <>LIVE: </>} {slip.bet_type}</div>
                        <div className="bet-pick" >Pick : {slip.bet_pick}
                            <span className="bet-odd">{slip.odd_value}
                               { slip.odd_value == 1 &&
                                        (<span style={{color:"#cc0000", fontSize:"11px", display:"block"}}>Market Disabled</span>)
                               }
                            </span>
                        </div>

                    </li>)
                })
            }
            </ul>
          </PerfectScrollbar>
        <BetslipSubmitForm />
    </div>
    )
}
export default BetSlip;
