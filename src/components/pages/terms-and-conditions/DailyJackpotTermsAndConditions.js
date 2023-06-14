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
            <Accordion allowMultipleExpanded={true} allowZeroExpanded preExpanded={['1']}>
                <AccordionItem uuid={'1'}>
                    <AccordionItemHeading>
                        <AccordionItemButton className='accordion-button'>
                            BETNARE MILLI DAILY JACKPOT
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className='accordion-item-panel'>
                        <div className={'text-white'}>
                            <ol>
                                <li>
                                    Jackpot Amount ; Kenya Shillings 1,000,000/=

                                </li>
                                <li>
                                    Stake 20/=
                                </li>
                                <li>
                                    20 Pre-Selected Soccer games

                                </li>
                                <li>
                                    Market Picks – 3-Way markets Only
                                </li>
                            </ol>

                        </div>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton className={"accordion-button"}>
                            <span className="text-uppercase">HOW TO PLAY BetNare Milli Daily Jackpot</span>
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className={'accordion-item-panel'}>
                        <p>The BetNare Jackpot is a pool betting platform that is promoted and operated by BetNare on
                            pre-selected football matches. The BetNare Daily Jackpot competition consists of predicting
                            results of 11 matches which are selected by BetNare Daily. </p>
                        <p>To take part and have a chance to win the BetNare jackpot you must get registered on
                            www.betnare.com and have at least KES20/= in your BetNare account. If you correctly predict
                            all the 11 match results, you win the Daily Jackpot prize of Kshs 1,000,000/= </p>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton className={"accordion-button"}>
                            JACKPOT MARKETS
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className={'accordion-item-panel'}>
                        <p>Jackpot Markets (3-Way Markets - 1X2)</p>
                        <p>Three possible outcomes are offered:</p>
                        <p>1 = The HOME team will win;</p>
                        <p>X=The teams will DRAW;</p>
                        <p>2=The AWAY team will win</p>

                        <h4 className='text-decoration-underline'>Example.</h4>
                        <p>Manchester United Vs Liverpool</p>
                        <p>Possible outcomes</p>
                        <p>Manchester United = 1</p>
                        <p>Draw = X</p>
                        <p>Liverpool = 2</p>

                        <h4 className='text-decoration-underline'>SMS format</h4>
                        <p>SMS JP (Daily Jackpot) pick1pick2pick3pick4pick5…. to 29877</p>
                        <p>Example JP12X21X… to 29877</p>

                        <h4 className='text-decoration-underline'>Jackpot rollover</h4>
                        <p>BETNARE may, at its own discretion, introduce a Jackpot rollover, in which jackpot totals
                            from jackpot competitions in prior days that have had no winners are accumulated
                            (rolled-over) and offered as a prize.</p>

                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton className={"accordion-button"}>
                            GENERAL BETNARE DAILY JACKPOT TERMS AND CONDITIONS
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className={'accordion-item-panel'}>
                        <p> Matches will be settled on the official results after 90 minutes on play, including injury
                            time. Extra time and penalty shoot-outs shall not be included.</p>
                        <p>The competitions are open to persons aged 18 years or over, resident in Kenya. Proof of age
                            and identity are a MUST requirement.</p>
                        <p>The BetNare Daily Jackpot prize money is KES 1,000,000/=</p>
                        <p>Players will be deemed to have accepted these terms and conditions and agreed to be bound by
                            them when entering this competition.</p>

                        <h4 className='text-decoration-underline'>DAILY JACKPOT BONUS</h4>
                        <ul>
                            <li>
                                The Daily Jackpot amount is subject to change in a daily jackpot as it is a Daily
                                Progressive Jackpot.

                            </li>
                            <li>
                                BetNare Half a Milli Daily Jackpot is based on ELEVEN (11) pre-selected Soccer games
                                with HUGE Guaranteed bonuses starting from TEN (10) Correct predictions and ZERO (0)
                                Correct predictions.

                            </li>
                            <li>
                                The Daily Jackpot amount thereof will be divided equally amongst all the Daily Jackpot
                                Prize winners and the Jackpot Bonus prize winners.

                            </li>
                            <li>
                                To make your selections- On the BetNare Daily Jackpot competition entry page
                                (www.betnare.com/jackpot) make your predictions on the 11 pre-selected football matches
                                (HOME WIN, DRAW, AWAY WIN). The stake amount of each combination is KES 10/=.
                            </li>
                            <li>
                                <strong>NOTE;</strong>&nbsp;BETNARE DOESNOT ACCEPT DOUBLE CHANCE COMBINATION ON THE
                                JACKPOT.
                            </li>
                            <li>
                                You CANNOT make more than 1 prediction for ONE match.
                            </li>
                            <li>
                                The Daily Jackpot bet can be placed by submitting predictions of the results of 11
                                pre-selected football matches at (www.betnare.com/jackpot) or through
                            </li>
                            <ul>
                                <li>
                                    a) A manual option where you select each prediction from our website and you will
                                    receive a confirmation SMS for your bet with the possible Daily Jackpot win, once
                                    the bet is placed. OR
                                </li>
                                <li>
                                    b) By choosing “Auto Bet” option, a random selection of one prediction per match
                                    will be automatically selected with a fixed stake of KES 10/=.
                                </li>
                            </ul>
                        </ul>


                        <h4 className='text-decoration-underline'> APPENDIX</h4>
                        <ol>

                            <li>Check and place bets – Make sure you check the bets before clicking “place bet” button.
                                Once
                                submitted, the bets cannot be cancelled, amended or refunded.
                            </li>
                            <li>Where a Daily Jackpot game is cancelled, an official public draw shall be carried out
                                with
                                strict compliance to BCLB requirements after (72) hours from the time of cancellation,
                                to
                                determine the result of the missing game result. Where three (3) or MORE games are
                                cancelled, interrupted, abandoned, suspended or postponed, BetNare may at its
                                discretion,
                                cancel the Daily Jackpot and refund the stake placed within 48 hours of cancellation.
                            </li>
                            <li>Winners shall be required to avail themselves in the BetNare offices with proof of
                                identity
                                before any payment is made.
                            </li>
                            <li>BetNare reserves the right to verify, with the relevant authorities, any identification
                                document presented, before making any payment.
                            </li>
                            <li>The period for claiming the prize is seven (7) days failure to which BetNare may deem
                                the
                                prize forfeited, unless the period is extended at the sole discretion of BetNare.
                            </li>
                            <li>BetNare reserves the right to withhold up to 90% of any prize share until the
                                presentation
                                day.
                            </li>
                            <li>BetNare reserves the right to pay the whole amount of any prize share to a winner by
                                cheque
                                or bank transfer.
                            </li>
                            <li>BetNare’s decision is final and legally binding on all entrants in relation to all
                                aspects of
                                the competition including (without limitation) allocation of the prizes and no
                                correspondence will be entered into.
                            </li>
                            <li>With the guidance of the BCLB, BetNARE reserves the right to amend the terms and
                                conditions
                                of the Daily Jackpot at any time, for any reason and without notice.
                            </li>
                            <li>Employees of BetNare, their relatives, agents or the agent’s relatives are not eligible
                                to
                                win prizes.
                            </li>

                        </ol>
                        <p><strong>General BetNare Terms and Conditions, Privacy and Responsible Gaming policies
                            apply.</strong></p>


                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton className={"accordion-button"}>
                            BetNare Half a Milli Daily Jackpot Bonuses
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className={'accordion-item-panel'}>
                        <ul>
                            <li>
                                Daily Jackpot players are eligible as WINNERS when they make 11/11 correct Predictions.
                                They also WIN various Bonus Prizes when they make ZERO (0/11) Correct predictions and
                                ELEVEN (11) Correct Predictions.
                            </li>
                            <li>
                                Where ONE (1) or MORE games are CANCELLED, INTERRUPTED, ABANDONED, SUSPENDED or
                                POSTPONED, BetNare may at its discretion, AWARD the Jackpot BET ID with the highest
                                correct predictions within 48 hours of CANCELLATION or REFUND ALL STAKES collected on
                                the SPECIFIC JACKPOT.
                            </li>
                            <li>
                                ZERO out of ELEVEN outcomes - In an instance THAT a player gets 0/11 CORRECT predictions
                                on the Running Jackpot, they automatically get a (FREE TICKET) onto the next available
                                BetNare Daily Jackpot. This Offer is ONLY available to players who get ZERO out of the
                                ELEVEN available jackpot games to play from.
                            </li>
                            <li>
                                TEN OUT OF ELEVEN outcomes - BetNare Jackpot contains 11 games, the Jackpot bonuses are
                                from 10 correct games. The Jackpot bonus amount shall vary between the Jackpot Bonuses.
                                The prize allocated to the Bonus winners is completely at BetNare’s discretion. Any
                                Jackpot Bonus shall be divided equally among the Jackpot bonus winners if there is more
                                than ONE winner within the respective class.
                            </li>
                        </ul>
                        <h4>
                            BETNARE HALF A MILLI DAILY JACKPOT
                        </h4>
                        <ul>
                            <li>
                                Jackpot Amount; Kenya Shillings 500,000/=
                            </li>
                            <li>
                                Stake 10/=
                            </li>
                            <li>
                                11 Soccer Pre-Match.
                            </li>
                            <li>
                                Market Picks – 3-Way markets Only.
                            </li>
                            <li>
                                The Jackpot has bonuses – 0/11 Correct predictions and 10/11 Correct predictions.
                            </li>
                            <li>
                                BetNare will also award the Player with the highest Correct predictions randomly.
                            </li>
                        </ul>
                    </AccordionItemPanel>
                </AccordionItem>


            </Accordion>
        </div>

    )

export default DailyJackpotTermsAndConditions