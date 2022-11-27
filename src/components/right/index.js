import React, {useState, useContext, useEffect, useCallback} from 'react';
import QuickLogin from './quick-login';
import CompanyInfo from './company-info';
import BetSlip from './betslip';
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Badge} from "react-bootstrap";
import MobileMenu from '../mobile-menu';
import useWindowDimensions from "../header/Dimensions";

const AlertMessage = (props) => {
    return (<div className={`alert alert-dismissible ${props.classname}`} role='alert'>
        <button type='button' className='close' data-dismiss='alert' aria-label='Close'><span
            aria-hidden='true'>×</span>
        </button>
        {props.message}
    </div>)
}

const Right = (props) => {
    const {jackpot, betslipValidationData, jackpotData} = props;
    const [betSlipMobile, setBetSlipMobile] = useState(false)
    const {height, width} = useWindowDimensions();
    const {profile} = props;
    const {deposit} = props;
    const {app} = props;
    const {withdraw} = props;

    return (<div
        className={`col-md-3 ${deposit || withdraw||app ? "width-all" : "gn"} betslip-container sticky-top ${width <= 991 ? "remove-width" : "vh-100"} overflow-scroll tablet-view`}>
        <div className="betslip-container d-none d-lg-block">
            {props?.message && <AlertMessage classname={props.classname} message={props.message}/>}
            <div className="bet-option-list " id=''>
                <div className="bet alu block-shadow">
                    <header>
                        <div className="betslip-header d-flex justify-content-between">
                    <span className="col-sm-2 bkmrk d-none">
                        <i className="fa fa-bookmark" aria-hidden="true"></i></span>
                            <span className="col-sm-8 slp">BETSLIP</span>
                            <span className="col-sm-2  text-white">
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
                    <header style={{marginTop: "35px"}}>
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

            <MobileMenu jackpot={jackpot} betslipValidationData={betslipValidationData}/>
        </div>
    </div>)
}
export default Right;
