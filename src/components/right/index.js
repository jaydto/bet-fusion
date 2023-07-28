import React, {useContext, useEffect, useState} from 'react';
import QuickLogin from './quick-login';
import CompanyInfo from './company-info';
import BetSlip from './betslip';
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Badge} from "react-bootstrap";
import {getBetslip, getJackpotBetslip, getKironSlip} from "../utils/betslip";
import Kironslip from "./kironslip";
import MobileMenu from "../mobile-menu";
import useWindowDimensions from "../header/Dimensions";
import JackpotMenu from "../mobile-menu/jackpotMenu";
import {StoreContext} from "../../context/store";

const AlertMessage = React.memo(
    (props) => {
        return (
            <div className={`alert alert-dismissible ${props.classname}`} role='alert'>
                <button type='button' className='close' data-dismiss='alert' aria-label='Close'><span
                    aria-hidden='true'>×</span>
                </button>
                {props.message}
            </div>
        )
    })


const Right = React.memo(
    (props) => {
        const {jackpot, betslipValidationData, jackpotData, kiron, test, matches, live, remove_mobile} = props;
        const {height, width} = useWindowDimensions();
        const [betSlipMobile, setBetSlipMobile] = useState(false)
        const pathname = window.location.pathname
        const {state, dispatch}=useContext((StoreContext))

        const CountBadge=React.memo(
            ()=>{
            return (<Badge pill
                           bg="warning nav__betslip d-flex justify-content-center align-items-center">
                {kiron?state?.betslipKironLength:state?.betslipLength}
            </Badge>)
        })

        return (
            <div className={`${width > 991 &&
            `col ${test ? '' : 'gn'} 
        ${jackpot && 'jackpot-height'} ipad-dismiss-info betslip-container sticky-top vh-100 overflow-scroll betslip-container-mozilla container-sticky-top top-login-background-img-bg
         ${kiron && 'kiron-betslip-size'}
         `}
         ${remove_mobile && ' desktop-only-show '}
         ${pathname.includes('bet-history') && ' desktop-only-show '}
         ${pathname.includes('results') && ' desktop-only-show '}
         ${pathname.includes('standing') && ' desktop-only-show '}
         `}>
                <div className={`betslip-container  ${jackpot ? 'd-none' : 'd-none d-md-block'}`}>
                    {props?.message && <AlertMessage classname={props.classname} message={props.message}/>}
                    <div className="bet-option-list " id=''>
                        <div className="bet alu block-shadow">
                            <header className={'d-flex justify-content-between gap-2'}>
                                <div className="betslip-header d-flex justify-content-between w-100">
                            <span className="col-sm-2 bkmrk d-none">
                            <i className="fa fa-bookmark" aria-hidden="true"></i></span>
                                    <span className="col-sm-8 slp">BETSLIP</span>
                                    <span className="col-sm-2 slip-counter ">
                                        <CountBadge/>
                                    </span>
                                </div>
                            </header>
                            <button id="slip-button-close" type="button" className="close mobi" aria-hidden="true">
                                X
                            </button>
                            <div id="betslip" className="betslip">
                                {kiron == true ? <Kironslip kiron={kiron}/>
                                    :
                                    <BetSlip jackpot={jackpot} betslipValidationData={betslipValidationData} live={live}
                                             jackpotData={jackpotData}/>}

                            </div>
                            <QuickLogin/>
                        </div>
                    </div>
                    <CompanyInfo/>
                </div>
                <div
                    className={`fixed-bottom text-white d-block d-md-none shadow-lg betslip-container-mobile ${betSlipMobile ? 'd-block' : jackpot ? "d-block" : 'd-none'}`}>
                    <div className={`bet-option-list sticky-top ${jackpot}`} id=''>
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
                            <div id="betslip" className="betslip mobile-betslip-none">]
                                <BetSlip jackpot={jackpot} betslipValidationData={betslipValidationData}/>
                            </div>
                            <QuickLogin/>
                        </div>
                    </div>
                </div>
                <div
                    className={`${betSlipMobile ? jackpot ? 'd-block' : 'd-none' : jackpot ? ' d-block ' : ' d-block tablet-only '}  fixed-bottom text-center text-white bet-slip-footer-toggle`}>
                    {pathname == "/jackpot" ? <JackpotMenu jackpotData={jackpotData} matches={matches}/> :
                        <MobileMenu jackpot={jackpot} betslipValidationData={betslipValidationData}
                                    jackpotData={jackpotData}
                                    kiron={kiron}/>}
                </div>
            </div>
        )
    })
export default React.memo(Right);
