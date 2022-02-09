import React from "react";

import Header from '../../header/header';
import Footer from '../../footer/footer';
import SideBar from '../../sidebar/sidebar';
import banner from '../../../assets/img/banner.jpg';
import CarouselLoader from '../../carousel/index';
import MainTabs from '../../header/main-tabs';
import SearchBar from '../../header/search-bar';
import {MarketList} from '../../matches/index';
import Right from '../../right/index';
import Row from 'react-bootstrap/Row';

import General from './general'
import AccountUsage from './account-usage'
import Deposits from './deposits'
import Withdrawals from './withdrawals'
import LiveBetting from './live-betting'
import BonusesAndPromotions from './bonuses-and-promotions'
import Complaints from './complaints'
import Misconduct from './misconduct'
import ErrorsOrOmissions from './errors-or-omissions'
import IntellectualProperty from './intellectual-property'
import ThirdPartyLinking from './third-party-linking'
import Assignment from './assignment'
import Indemnification from './indemnification'
import Waiver from './waiver'
import Severability from './severability'
import DisputeResolution from './dispute-resolution'
import Ammendments from './ammendments'
import CommunicationsAndNotices from './communications-and-notices'
import ApplicableLaw from './applicable-law'
import TermAndTermination from './term-and-termination'


import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

const TermsAndConditions = (props) => {
    return (
        <>
            <Header/>
            <div className="by amt">
                <div className="gc">
                    <SideBar/>
                    <div className="gz home">
                        <div className="homepage">
                            <div className='col-md-12 primary-bg p-4 text-center'>
                                <h4 className="inline-block">
                                    TERMS AND CONDITIONS
                                </h4>
                            </div>
                            <div className="col-md-12 mt-2 text-white p-2 text-center">
                                These General Terms and Conditions are effective from 01.12.2021
                            </div>
                            <div className="col-md-12 mt-2 p-5 text-white accordion-container">
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