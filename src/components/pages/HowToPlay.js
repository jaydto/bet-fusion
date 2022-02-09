import React from "react";

import Header from '../header/header';
import Footer from '../footer/footer';
import SideBar from '../sidebar/sidebar';
import banner from '../../assets/img/banner.jpg';
import CarouselLoader from '../carousel/index';
import MainTabs from '../header/main-tabs';
import SearchBar from '../header/search-bar';
import {MarketList} from '../matches/index';
import Right from '../right/index';
import Row from 'react-bootstrap/Row';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

const HowToPlay = (props) => {
    return (
        <>
            <Header/>
            <div className="by amt">
                <div className="gc">
                    <SideBar/>
                    <div className="gz home">
                        <div className="homepage">
                            <div className='col-md-12 primary-bg p-4 text-center'>
                                <h4 className="inline-block"> HOW TO PLAY </h4>
                            </div>
                            <div className="col-md-12 card mt-2"></div>
                            <div className="col-md-12 mt-2 p-5 text-white accordion-container">
                                <Accordion preExpanded={['1']}>
                                    <AccordionItem uuid="1">
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                Account Creation
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <p>
                                                Before you can play, you need an account with Betnare. To create your
                                                account, please click on <a href="">Create Account</a>. We need your
                                                account to process your payments and your bets.
                                            </p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                Depositing Funds
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <p>
                                                Before you can place a bet, you need sufficient funds in your account.
                                                To deposit, send money to the Paybill number
                                            </p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                Placing a Bet
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <p>
                                                You can place a bet from our <a href="">MOBILE APP</a> or online on our
                                                website at <a href="/">betnare.com</a>
                                            </p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                Withdrawing Money
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <p>
                                                You will have an alltime access to your money and you can withdraw
                                                easily through your mobile money vendors. Please click on &nbsp;
                                                <a href="">Withdrawals</a> to initiate a withdrawal request.
                                            </p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className='accordion-button'>
                                                Support
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className='accordion-item-panel'>
                                            <p>
                                                If you have any issues, you can reach out to us any time through our
                                                official phone numbers, displayed on the right side of this screen.
                                            </p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
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

export default HowToPlay