import React, {useContext, useEffect} from "react";

import {Accordion,} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import useWindowDimensions from "../../header/Dimensions";
import {StoreContext} from "../../../context/store"
// import GiftWallet from "./GiftWallet";
import {ToastContainer} from "react-toastify";
import '../../test.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

const Footer = React.lazy(() => import('../../footer/footer'));
const Right = React.lazy(() => import('../../right/index'));
const General = React.lazy(() => import('./general'));
const AccountUsage = React.lazy(() => import('./account-usage'));
const Deposits = React.lazy(() => import('./deposits'));
const Withdrawals = React.lazy(() => import('./withdrawals'));
// const BonusesAndPromotions = React.lazy(() => import('./bonuses-and-promotions'));
const Complaints = React.lazy(() => import('./complaints'));
const Misconduct = React.lazy(() => import('./misconduct'));
const ErrorsOrOmissions = React.lazy(() => import('./errors-or-omissions'));
const IntellectualProperty = React.lazy(() => import('./intellectual-property'));
const ThirdPartyLinking = React.lazy(() => import('./third-party-linking'));
const Assignment = React.lazy(() => import('./assignment'));
const Indemnification = React.lazy(() => import('./indemnification'));
const Waiver = React.lazy(() => import('./waiver'));
const Severability = React.lazy(() => import('./severability'));
const DisputeResolution = React.lazy(() => import('./dispute-resolution'));
const Ammendments = React.lazy(() => import('./ammendments'));
const CommunicationsAndNotices = React.lazy(() => import('./communications-and-notices'));
const ApplicableLaw = React.lazy(() => import('./applicable-law'));
const TermAndTermination = React.lazy(() => import('./term-and-termination'));
const Definitions = React.lazy(() => import('./Definitions'))

const TermsAndConditions = React.memo(
    (props) => {
        const {width} = useWindowDimensions();
        const {state} = useContext(StoreContext);
        useEffect(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, []);
        const navigate=useNavigate()
        return (
            <div className={'flex-item '}>
                <div className="item4">
                    <ToastContainer/>
                </div>
                <div className="flex-container height-default-body top-diff-pages">
              
                    <div className={`item2 `} >
                        <div className="home" >
                            <div className="homepage mobile-full-height">
                                <div className='col-md-12 primary-bg p-4 text-center'>
                                    <div className={'d-flex align-items-center'}>
                                            <span className={'spacing-backbutton remove-backbutton-on-desktop'}
                                                  onClick={() => navigate('/')}>
                                             <FontAwesomeIcon icon={faAngleLeft} style={{
                                                 fontSize: "24px",
                                                 color: 'var(--light)',
                                                 fontWeight: '700',
                                                 opacity: '0.7'
                                             }}/>
                                            </span>
                                        <h4 className="inline-block ">
                                        TERMS AND CONDITIONS
                                    </h4>
                                    </div>


                                </div>
                                <div className="col-md-12 mt-2 text-white p-2 mx-3">
                                    These General Terms and Conditions are effective from 01.12.2021
                                </div>
                                <div className="col-md-12 mt-2 text-white accordion-container">
                                    <Accordion allowMultipleExpanded={false} allowZeroExpanded={true}>
                                        <Definitions/>
                                        <General/>
                                        <AccountUsage/>
                                        <Deposits/>
                                        <Withdrawals/>
                                        {/* <BonusesAndPromotions/> */}
                                        {/* <GiftWallet/> */}
                                        <Complaints/>
                                        <Misconduct/>
                                        <ErrorsOrOmissions/>
                                        <IntellectualProperty/>
                                        <ThirdPartyLinking/>
                                        <Assignment/>
                                        <Indemnification/>
                                        <Waiver/>
                                        <Severability/>
                                        <DisputeResolution/>
                                        <Ammendments/>
                                        <CommunicationsAndNotices/>
                                        <ApplicableLaw/>
                                        <TermAndTermination/>
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className={"item3 mobile-remove"}>
                        <Right test={true}/>

                    </div> */}
                </div>
          

            </div>
        )
    })

export default TermsAndConditions
