import React from "react";

import {
    Accordion,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

const Header = React.lazy(()=>import('../../header/header'));
const Footer = React.lazy(()=>import('../../footer/footer'));
const SideBar = React.lazy(()=>import('../../sidebar/awesome/Sidebar'));
const Right = React.lazy(()=>import('../../right/index'));

const General = React.lazy(()=>import('./general'));
const AccountUsage = React.lazy(()=>import('./account-usage'));
const Deposits = React.lazy(()=>import('./deposits'));
const Withdrawals = React.lazy(()=>import('./withdrawals'));
const LiveBetting = React.lazy(()=>import('./live-betting'));
const BonusesAndPromotions = React.lazy(()=>import('./bonuses-and-promotions'));
const Complaints = React.lazy(()=>import('./complaints'));
const Misconduct = React.lazy(()=>import('./misconduct'));
const ErrorsOrOmissions = React.lazy(()=>import('./errors-or-omissions'));
const IntellectualProperty = React.lazy(()=>import('./intellectual-property'));
const ThirdPartyLinking = React.lazy(()=>import('./third-party-linking'));
const Assignment = React.lazy(()=>import('./assignment'));
const Indemnification = React.lazy(()=>import('./indemnification'));
const Waiver = React.lazy(()=>import('./waiver'));
const Severability = React.lazy(()=>import('./severability'));
const DisputeResolution = React.lazy(()=>import('./dispute-resolution'));
const Ammendments = React.lazy(()=>import('./ammendments'));
const CommunicationsAndNotices = React.lazy(()=>import('./communications-and-notices'));
const ApplicableLaw = React.lazy(()=>import('./applicable-law'));
const TermAndTermination = React.lazy(()=>import('./term-and-termination'));


const TermsAndConditions = (props) => {
    return (
        <>
            <Header/>
            <div className="amt">
                <div className="d-flex flex-row justify-content-between">
                    <SideBar loadCompetitions/>
                    <div className="gz home">
                        <div className="homepage">
                            <div className='col-md-12 primary-bg p-4 text-center'>
                                <h4 className="inline-block">
                                    TERMS AND CONDITIONS
                                </h4>
                            </div>
                            <div className="col-md-12 mt-2 text-white p-2">
                                These General Terms and Conditions are effective from 01.12.2021
                            </div>
                            <div className="col-md-12 mt-2 text-white accordion-container">
                                <Accordion allowMultipleExpanded={false} allowZeroExpanded={true}>
                                    <General/>
                                    <AccountUsage/>
                                    <Deposits/>
                                    <Withdrawals/>
                                    <LiveBetting/>
                                    <BonusesAndPromotions/>
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
                    <Right/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default TermsAndConditions
