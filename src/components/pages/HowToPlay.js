import React, {useCallback, useEffect, useState, useContext} from "react";


import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

import makeRequest from "../utils/fetch-request";
import {
    getFromLocalStorage,
    setLocalStorage
} from '../utils/local-storage';

import {getBetslip} from '../utils/betslip' ;
import {Context} from '../../context/store';

const Header = React.lazy(() => import('../header/header'));
const Footer = React.lazy(() => import('../footer/footer'));
const SideBar = React.lazy(() => import('../sidebar/sidebar'));
const Right = React.lazy(() => import('../right/index'));


const HowToPlay = (props) => {

    const [, dispatch] = useContext(Context);
    const [competitions, setCompetitions] = useState({});

    const fetchData = useCallback(async () => {
        let cached_categories = getFromLocalStorage('categories');
        let endpoint = "/v1/categories";

        if (!cached_categories) {
            const [competition_result] = await Promise.all([
                makeRequest({url: endpoint, method: "get", data: null}),
            ]);
            let [c_status, c_result] = competition_result

            if (c_status === 200) {
                setCompetitions(c_result);
            }
            setLocalStorage('categories', c_result);
        } else {
            setCompetitions(cached_categories);
        }

    }, []);

    useEffect(() => {

        const abortController = new AbortController();
        fetchData();

        return () => {
            abortController.abort();
        };
    }, [fetchData]);

    useEffect(() => {
        let betslip = getBetslip();
        if (betslip) {
            dispatch({type: "SET", key: "betslip", payload: betslip});
        }
    }, []);
    return (
        <>
            <Header/>
            <div className="by amt">
                <div className="gc">
                    <SideBar competitions={competitions}/>
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
                                                account, please click on <a href="/signup" target="_blank">
                                                Create Account</a>. We need your account to process your payments and
                                                your bets.
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
                                                <strong className='text-success'> 4087777</strong>
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
                                                website at <a href="https://betnare.com">betnare.com</a>
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
                                                <a href="/withdraw">Withdrawals</a> to initiate a withdrawal request.
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
