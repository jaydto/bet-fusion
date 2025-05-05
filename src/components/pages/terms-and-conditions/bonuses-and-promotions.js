import {
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import React from "react";

const BonusesAndPromotions = () => {
    return (
        <AccordionItem>
            <AccordionItemHeading>
                <AccordionItemButton className='accordion-button'>
                    BONUSES AND PROMOTIONS
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className='accordion-item-panel'>
                <ol>
                    <li>
                        Bonuses being offered and their details of crediting Bonus Money will be available on the Bonus/Promotions section of the website.
                        The amount of Bonus Money is determined byjazabets and set out on the website.
                    </li>

                    <li>The CLIENT binds himself not to abuse the ability of opening accounts in order to benefit from bonus credits and other promotional offers that may be offered. The company reserves the right, in case of abusive behavior on the CLIENT’S part as related to bonus credits and/or to promotional offers byjazabets, to rescind or block
                        CLIENT accounts created to that end, as well as their transactions.</li>
                    <li>BetDonjo reserves the right to revoke and/or cancel any bonus and/or promotional winnings which are deemed to have occurred due to abuse and/or misuse of any promotional system.
                        In the event of any dispute, the general conditions set out in the complaints procedure on the company’s website will apply.</li>

                    <li>The Bonus Money will be kept separately from the Real Money on the account.
                        The Bonus Money will not be paid out directly until it has been transformed into real cash winnings. </li>


                    <li>
                        If the cash account contains both Bonus and real money,
                        the total bet used for wagers will be subject to bonus bet conditions.
                        Specific bonus bet conditions will be published on the website.


                    </li>
                    <li>
                        Any indication of fraud, manipulation, cash-back arbitrage,
                        or other forms of deceitful or fraudulent activity based on the provision of the bonus will render the account inactive along with any and all profits or losses generated.
                    </li>
                    <li>
                        All bonuses and promotional
                        offers are subject to the terms and conditions made available when communicating the bonus offer.
                    </li>
                </ol>

                <br/>
                <strong className="text-decoration-underline">GENERAL BONUS/PROMOTION RULES</strong>
                <br/>
                <ol>
                    <li>
                         Apart from the JACKPOT BONUS, any other bonus CANNOT be WITHDRAWN. However, bonus winnings
                        derived from the bets placed successfully with the bonus can be withdrawn.
                    </li>
                    <li>
                        Ifjazabets notices something suspicious about your activities with the bonus, then we may
                        take it away. This includes very similar betting patterns between the referrer and the referred
                        account.
                    </li>
                    <li>
                       jazabets bonus has no expiry.
                    </li>

                </ol>
                <br/>
                <strong className="text-decoration-underline">BetDonjo Bonus Rules</strong>
                <br/>
                <ol>
                    <li>
                        Minimum Odds per Bonus Leg selection > 2.1
                    </li>
                    <li>
                        Minimum Number of Legs - 4
                    </li>
                    <li>
                        No Maximum Odds.
                    </li>
                    <li>
                        Minimum bonus bet is 1/=
                    </li>
                    <li>
                       Maximum bonus amount is 1,000 /=
                    </li>
                    <li>
                        You can only Use the Bonus when your cash balance is less than 1/=
                    </li>
                    <li>
                        Total Winnings = Total Winnings less the Initial stake.
                    </li>
                    <li>
                        The Deposit Bonus does not have an expiry.
                    </li>
                    <li>
                        The maximum Gross Payout is 10,000 /=
                    </li>
                </ol>
                <p><strong><strong>NB;</strong> APART FROM JACKPOT BONUSES , THE REST CANNOT BE WITHDRAWN</strong></p>

                <p><strong><strong>NB;</strong>jazabets has the right to amend the terms of the offer, cancel or renew the offer, or refuse to allow participation at any time without prior notice.
Customers must provide ID documents, when required, to validate their identity (KYC). Failure to produce these documents when requested will result in the forfeit of any bonuses/winnings.
Ifjazabets believes itself to be the victim of fraud or money laundering, the company has the right to close customers' accounts and freeze the remaining balance.</strong></p>

            </AccordionItemPanel>
        </AccordionItem>
    )
}

export default BonusesAndPromotions
