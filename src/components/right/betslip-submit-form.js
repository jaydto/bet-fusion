import React, { useState, useEffect, useContext }from 'react';
import { Context }  from '../../context/store';
import { removeFromSlip, getBetslip }  from '../utils/betslip';

import {
    Formik,
    Form as FormikForm,
    useFormikContext,
    Field
} from 'formik';

const Float = (equation, precision=4) => {
    return Math.round(equation * (10 ** precision)) / (10 ** precision);
}

const clean_rep = (_str) => {
    _str = _str.replace(/[^A-Za-z0-9\-]/g, '');
    return _str.replace(/-+/g, '-');
}
const Form = (props) => {
    return (
        <Formik {...props} >
            <FormikForm className="needs-validation" noValidate="">
                {props.children}
            </FormikForm>
        </Formik>
    );
};

const SubmitButton = (props) => {
    const { title, ...rest } = props;
    const { isSubmitting } = useFormikContext();
    return (
         <button type="submit" {...rest} disabled={isSubmitting}>{isSubmitting ? "wait..." : title}</button>
    );
};


const BetslipSubmitForm = (props) =>{
    const handlePlaceBet =  (values, { setSubmitting,  resetForm, setStatus, setErrors})  => {
       console.log("Place net hanling here", values);
    } 

    const [state, dispatch] = useContext(Context);                              
    const [acceptOddsChange, setAcceptOddsChange] = useState(1);
    const [stake, setStake] = useState(100);
    const [exciseTax, setExciseTax] = useState(0);
    const [withholdingTax, setWithholdingTax] = useState(0);
    const [possibleWin, setPossibleWin] = useState(0);
    const [netWin, setNetWin] = useState(0);
    const [userId, setUserId] = useState(null);
    const [totalOdd, setTotalOdds] = useState(1);
    const [totalGames, setTotalGames] = useState(0);


    const updateWinnings = () => {
        if( state?.betslip) { 
            let tOdd = 1;
            Object.entries(state.betslip).map(([match_id, slip]) => {
                tOdd *= slip.odd_value;
            });
            let stake_after_tax = Float(stake)/Float(107.5)*100

            let ext = Float(stake) - Float(stake_after_tax);
            let raw_possible_win = Float(stake_after_tax) * Float(tOdd);
            let taxable_amount = Float(raw_possible_win)-Float(stake_after_tax);
            let wint = taxable_amount*0.2;
            let nw = raw_possible_win - wint;

            setExciseTax(Float(ext,2));
            setNetWin(Float(nw,2));
            setPossibleWin(Float(raw_possible_win,2));
            setWithholdingTax(Float(wint,2));
            setTotalOdds(Float(tOdd,2));
       } else {
          setTotalOdds(1);
          setNetWin(0);
          setWithholdingTax(0);
          setExciseTax(0);
          setPossibleWin(0);
          setTotalGames(0);
          setTotalOdds(0)
       }
    } 

    const handleRemoveAll = () => {
        let betslips = getBetslip();
        Object.entries(betslips).map(([match_id, match]) => {
           let betslip = removeFromSlip(match_id); 
           let match_selector = match.match_id + "_selected";
           let ucn = clean_rep(                                                         
                           match.match_id                                                      
                           + "" + match.sub_type_id                                            
                           + (match.bet_pick)                                          
                       );   
           
           dispatch({type:"SET", key:match_selector, payload:"remove."+ucn});
        });
        dispatch({type:"SET", key:"betslip", payload:{}});
    }
    const handleStakeAmountChange = (event, setFieldValue) => {
        let bamount = event.target.value;
        setStake(bamount);
    }
    useEffect(() => {
        updateWinnings();
    }, [state?.betslip, stake]);

    const initialValues = {
        bet_amount: stake ?? 100,
        accept_all_odds_change: acceptOddsChange ?? 1,
        user_id:userId ?? "",
        total_games:totalGames ?? 0,
        total_odd:totalOdd ?? 0,
    };
    return (
        <Form enableReinitialize={true} 
          name="betslip-submit-form"
          initialValues={initialValues}
          onSubmit={handlePlaceBet}
          >
            <table className="bet-table">
             <tbody>
                <tr className="hide-on-affix">
                    <td>TOTAL ODDS</td>
                    <td><b>{props?.totalOdds}</b></td>
                </tr>
                <tr id="odd-change-text">
                    <td colSpan="2">
                        <label className="checkbox">
                            
                            <Field type="checkbox"
                                className="odds-change-box"
                                name={"accept-all-odds-change"}
                                id={"accept-all-odds-change"}
                            /> Accept any odds change
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>Stake</td>
                    <td>
                        <div id="betting">
                            <Field type="text"
                                className="bet-select"
                                name="bet_amount"
                                id="bet_amount"
                                onKeyUp = {(e) => handleStakeAmountChange(e)}
                            /> 
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colSpan="2"></td>
                </tr>
                <tr className="bet-win-tr hide-on-affix">
                    <td>Possible winnings</td>
                    <td>
                        KES. <span
                                id="pos_win">{possibleWin}</span>
                    </td>
                </tr>
                <tr className="bet-win-tr hide-on-affix">
                    <td> Excise Tax (7.5%)</td>
                    <td>KES. <span id="tax">{exciseTax}</span></td>
                </tr>
                <tr className="bet-win-tr hide-on-affix">
                    <td> Withholding (20%)</td>
                    <td>KES. <span id="tax">{withholdingTax}</span></td>
                </tr>
                <tr className="bet-win-tr hide-on-affix">
                    <td>Net Amount</td>
                    <td>KES. <span id="net-amount">{netWin}</span></td>
                </tr>
                <tr>
                    <td>
                        <button className="place-bet-btn" 
                            type="button" 
                            onClick={()=> handleRemoveAll()}>REMOVE ALL</button>
                    </td>
                    <td>
                        <SubmitButton id="place_bet_button" 
                           className="place-bet-btn" 
                           title="PLACE BET"/>
                    </td>
                </tr>
            </tbody>
            </table>
                
            <Field
                type="hidden"
                name={"user_id"}
                id={"user_id"}
                value={userId}
            />
            <Field
                type="hidden"
                name={"total_odd"}
                id={"total_odd"}
                value={totalOdd}
            />
            <Field
                type="hidden"
                name={"total_games"}
                id={"total_games"}
                value={totalGames}
            />
        </Form>
    )
}
export default BetslipSubmitForm;
