import React, {useState, useContext, useEffect, useCallback} from 'react';
import QuickLogin from './quick-login';
import CompanyInfo from './company-info';
import {Context} from '../../context/store';
import BetSlip from './betslip';
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const AlertMessage = (props) => {
    return (
        <div className={`alert alert-dismissible ${props.classname}`} role='alert'>
            <button type='button' className='close' data-dismiss='alert' aria-label='Close'><span
                aria-hidden='true'>×</span>
            </button>
            {props.message}
        </div>
    )
}

const Right = (props) => {
    const {jackpot, betslipValidationData} = props;
    const [betSlipMobile, setBetSlipMobile] = useState(false)

    return (
        <div className="col-md-3 gn betslip-container sticky-top">
            <div className="overflow-scroll betslip-container d-none d-md-block">
                {props?.message && <AlertMessage classname={props.classname} message={props.message}/>}
                <div className="bet-option-list sticky-top" id=''>
                    <div className="bet alu block-shadow">
                        <header>
                            <div className="betslip-header">
                    <span className="col-sm-2 bkmrk">
                        <i className="fa fa-bookmark" aria-hidden="true"></i></span>
                                <span className="col-sm-8 slp">BETSLIP</span>
                                <span className="col-sm-2 slip-counter"></span>
                            </div>
                        </header>
                        <button id="slip-button-close" type="button" className="close mobi" aria-hidden="true">×
                        </button>
                        <div id="betslip" className="betslip">
                            <BetSlip jackpot={jackpot} betslipValidationData={betslipValidationData}/>
                        </div>
                        <QuickLogin/>
                    </div>
                </div>
            </div>
            <div
                className={`fixed-bottom text-white d-block d-md-none bg-secondary betslip-container-mobile ${betSlipMobile ? 'd-block' : 'd-none'}`}>
                <div className="bet-option-list sticky-top" id=''>
                    <div className="bet alu  block-shadow">
                        <header style={{marginTop: "60px"}}>
                            <div className="betslip-header d-flex justify-content-between">
                                <span className="col-sm-8 slp">BETSLIP</span>
                                <span className="col-sm-2 slip-counter d-flex justify-content-center"
                                      title={'Hide BetSlip'} onClick={() => setBetSlipMobile(false)}>
                                    <FontAwesomeIcon icon={faTimes} className={'align-self-center'}/>
                                </span>
                            </div>
                        </header>
                        <div id="betslip" className="betslip">
                            <BetSlip jackpot={jackpot} betslipValidationData={betslipValidationData}/>
                        </div>
                        <QuickLogin/>
                    </div>
                </div>
            </div>
            <div
                className={`${betSlipMobile ? 'd-none' : 'd-block'} d-block d-md-none fixed-bottom text-center text-white bg-info bet-slip-footer-toggle`}
                onClick={() => setBetSlipMobile(true)}>
                Click to show BetSlip
            </div>
        </div>
    )
}
export default Right;
