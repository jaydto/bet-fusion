import React, {useCallback, useLayoutEffect, useState} from 'react';
import {Badge} from "react-bootstrap";
import BetSlip from "../../right/betslip";
import QuickLogin from "../../right/quick-login";
import CompanyInfo from "../../right/company-info";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import MobileMenu from "../../mobile-menu";
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
const Betslip = (props) => {
    const {jackpot, betslipValidationData, jackpotData,slipJackpot} = props;
    const [betSlipMobile, setBetSlipMobile] = useState(false);

    return (
        <div className="col-md-3 gn betslip-container sticky-top vh-100 overflow-scroll tablet-view">
            <div className="betslip-container d-none d-md-block">
                {props?.message && <AlertMessage classname={props.classname} message={props.message}/>}
                <div className="bet-option-list " id=''>
                    <div className="bet alu block-shadow">
                        <header>
                            <div className="betslip-header d-flex justify-content-between">
                    <span className="col-sm-2 bkmrk d-none">
                        <i className="fa fa-bookmark" aria-hidden="true"></i></span>
                                <span className="col-sm-8 slp">BETSLIP</span>
                                <span className="col-sm-2 slip-counter ">
                                     <Badge pill bg="dark">
                                      {betslipValidationData?.length || 0}
                                      </Badge>
                                </span>
                            </div>
                        </header>
                        <button id="slip-button-close" type="button" className="close mobi" aria-hidden="true">
                            X
                        </button>
                        <div id="betslip" className="betslip">
                            <BetSlip jackpot={jackpot} betslipValidationData={betslipValidationData}
                                     jackpotData={jackpotData}/>
                        </div>
                        <QuickLogin/>
                    </div>
                </div>
                <CompanyInfo/>
            </div>
            <div
                className={`fixed-bottom text-white d-block d-md-none shadow-lg betslip-container-mobile ${betSlipMobile ? 'd-block' : 'd-none'}`}>
                <div className="bet-option-list sticky-top mobile-slip" id=''>
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
                className={`${betSlipMobile ? 'd-none' : 'd-block'} tablet-only fixed-bottom text-center text-white bg-info bet-slip-footer-toggle`}>
                <MobileMenu betslip={betslipValidationData} />
            </div>
        </div>
    );
};

export default React.memo(Betslip);
