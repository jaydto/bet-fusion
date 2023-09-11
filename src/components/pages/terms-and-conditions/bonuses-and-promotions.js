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
                <p>
                    Bonuses being offered and their details of crediting bonus money will be available on the
                    bonus/promotions section of the website. The amount of bonus money is determined by BetNare and set
                    out on the website.
                </p>

                <p>The CLIENT binds himself/herself not to abuse the ability of opening accounts in order to benefit
                    from bonus credits and other promotional offers that may be offered. The company reserves the right
                    in case of an abusive behavior on the CLIENT’S part as related to bonus credits and/or to
                    promotional offered by BetNare to rescind or block CLIENT accounts created to that end as well as
                    their transactions.</p>
                <p>BetNare reserves the right to revoke and/or cancel any bonus and/or promotional winnings which are
                    deemed to have occurred due to abuse and/or misuse of any promotional system. In the event of any
                    dispute the general conditions set out in the complaints procedure on the company’s website will
                    apply.</p>

                <p>The bonus money will be kept separately from the CASH on the account. The BONUS will not be paid
                    directly until it has been transformed into REAL CASH winnings.
                    If the cash account contains both BONUS and CASH, the bet used for wages will be subject to BONUS
                    BET conditions.</p>


                <p>Specific bonus bet conditions will be published on the website.
                    Any indication of fraud, manipulation, cash-back arbitrage or other forms of deceitful or fraudulent
                    activity based on the provision of the bonus will render the account inactive along with any and all
                    profits and losses generated.

                </p>
                <p>
                    ALL BONUSES and PROMOTIONAL OFFERS are subject to the terms ad conditions made available when
                    communicating the bonus offer
                </p>
                <p>
                    If the cash account contains both Bonus and real money, the total
                    bet
                    used
                    for wagers will be subject to bonus bet conditions. Specific bonus
                    bet
                    conditions will be published on the website.
                </p>
                <p>
                    Any indication of fraud, manipulation, cash-back arbitrage, or other
                    forms
                    of deceitful or fraudulent activity based on the provision of the
                    bonus
                    will
                    render the account inactive along with any and all profits or losses
                    generated.
                </p>
                <p>
                    All bonuses and promotional offers are subject to the terms and
                    conditions
                    made available when communicating the bonus offer.
                </p>
                Rules on BetNare Bonuses
                <br/>
                <strong className="text-decoration-underline">GENERAL BONUS/PROMOTION RULES</strong>
                <br/>
                <ol>
                    <li>
                         Apart from the JACKPOT BONUS, any other bonus CANNOT be WITHDRAWN. However, bonus winnings
                        derived from the bets placed successfully with the bonus can be withdrawn.
                    </li>
                    <li>
                        If BETNARE notices something suspicious about your activities with the bonus, then we may
                        take it away. This includes very similar betting patterns between the referrer and the referred
                        account.
                    </li>
                    <li>
                        BetNare bonus has no expiry.
                    </li>
                    {/*<li>*/}
                    {/*        The Maximum and Minimum stake of the bonuses is 100/=*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*        Total number of games per slip on bonus related bets is 4*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*        Minimum odds per game on bonus related bets is 1.8*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*        Minimum total odds per bonus bet is 10.50*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*        The maximum pays-out from bonus bets – KES300 per betslip.*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    	All rules on bonus bets will apply.*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    	Promotions are subject to change. All management decisions are final.*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*   	In the event of an error when attributing a bonus to a customer account, the company reserves the right to correct such errors by removing any funds that were put into the customer’s account erroneously and by avoid*/}
                    {/*</li>*/}
                </ol>
                <p><strong><strong>NB;</strong> APART FROM JACKPOT BONUSES , THE REST CANNOT BE WITHDRAWN</strong></p>


                <strong className="text-decoration-underline">250 FOR 250 PROMOTION TERMS AND CONDITIONS</strong>
                <br/>
                <p>Within the next 14 days, ONCE you DEPOSIT 250/=, BetNare Rewards you 250/= BONUS INSTANTLY.</p>
                <ol>
                    <li>The bonus must be used within 13 days of registration. After 14 days the bonus and all winnings made on the bonus will be revoked.
                    </li>
                    {/*<li>*/}
                    {/*A customer is entitled to only TWO bonus per day. The required Deposit to activate the bonus is Ksh 250.*/}
                    {/*</li>*/}
                    <li>
                    The bonus will be credited to the customer's account automatically once they have made their 1st and 2nd deposit.
                    </li>
                    <li>
                    To use the bonus the customer will be required to have placed an equivalent Sports Cash Bet on 1.5 Minimum odds.
                    </li>
                    <li>
                    The Bonus can only be used to place a Sports bet.
                    </li>
                    <li>
                    Sports Bet Cancellation will NOT be allowed during this promotion.
                    </li>
                    <li>
                    BetNare may limit or refuse to allow customers to take part in this or any other offer.
                    </li>
                    <li>
                    BetNare reserves the right to review customer transaction records and logs for any reason. If, upon such review, it appears that a customer is using strategies which BetNare, at its sole discretion, deems to be abusive, BetNare reserves the right to revoke that customer's right to participate in the bonus program and void their bonus and or winnings.
                    </li>
                    <li>
                    Only <strong>ONE</strong> bonus is allowed per customer, family, address, shared computer, shared IP address. Any misuse of this bonus offer will lead to an account being closed.
                    </li>
                </ol>
                <p><strong><strong>NB;</strong> BetNare has the right to amend the terms of the offer, cancel or renew the offer, or refuse to allow participation at any time without prior notice.
Customers must provide ID documents, when required, to validate their identity (KYC). Failure to produce these documents when requested will result in the forfeit of any bonuses/winnings.
If BetNare believes itself to be the victim of fraud or money laundering, the company has the right to close customers' accounts and freeze the remaining balance.</strong></p>

            </AccordionItemPanel>
        </AccordionItem>
    )
}

export default BonusesAndPromotions
