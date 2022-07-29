import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import React from "react";
import {Accordion} from "react-accessible-accordion";

const DailyJackpotTermsAndConditions = () =>
    (
        <div className="col-md-12 mt-2 text-white accordion-container">
            <div className="col-md-12 text-center shadow-lg">JACKPOT TERMS</div>
            <Accordion allowMultipleExpanded={true} allowZeroExpanded={false}>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton className='accordion-button'>
                            DAILY JACKPOT
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className='accordion-item-panel'>
                        <div className={'text-white'}>
                            <ol>
                                <li>
                                    Jackpot amount: Kenya Shillings 1,000,000
                                </li>
                                <li>
                                    Fixed stake: Kenya shillings 15.00
                                </li>
                                <li>
                                    No. of matches: 13 Pre selected Soccer Matches
                                </li>
                                <li>
                                    Number of possible outcomes per match: 3
                                </li>
                                <li>
                                    Jackpot Winning predictions: 13 out of 13 matches
                                </li>
                                <li>
                                    No. of distinction bets for a guaranteed win – 1,594,323
                                    % of total distinction bets – 4%
                                </li>
                                <li>
                                    Bonus awards
                                    11/13 and 12/13 correct predictions ONLY
                                </li>
                                <li>
                                    Jackpot Markets (3-Way Markets - 1X2)
                                    Three possible outcomes are offered:
                                    <ul>
                                        <li>
                                            1 = The HOME team will win;
                                        </li>
                                        <li>
                                            X=The teams will DRAW;
                                        </li>
                                        <li>
                                            2=The AWAY team will win
                                        </li>
                                    </ul>
                                </li>

                            </ol>
                            <p>

                                Example.
                                Manchester United Vs Liverpool
                                Possible outcomes
                                Manchester United = 1
                                Draw = X
                                Liverpool = 2
                            </p>

                            <b>SMS format</b><br/>
                            SMS DJP (Daily Jackpot) pick1pick2pick3pick4pick5…. to 29877
                            Example DJP12X21X… to 29877
                            <br/>

                            <b className={'text-uppercase'}>Jackpot rollover</b><br/>
                            BETNARE may, at its own discretion, introduce a Jackpot rollover, in which jackpot totals
                            from
                            jackpot
                            competitions in prior days that have had no winners are accumulated (rolled-over) and
                            offered as a
                            prize.


                        </div>
                    </AccordionItemPanel>
                </AccordionItem>
            </Accordion>
        </div>

    )

export default DailyJackpotTermsAndConditions