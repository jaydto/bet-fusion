import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
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
                    Bonuses being offered and their details of crediting Bonus Money will be
                    available on the Bonus/Promotions section of the website. The amount of
                    Bonus Money is determined by BetNare and set out on the website.
                </p>

                <p>The CLIENT binds himself not to abuse the ability of opening accounts
                    in order to benefit from bonus credits and other promotional offers
                    that may be offered. The company reserves the right, in case of
                    abusive behavior on the CLIENT’S part as related to bonus credits
                    and/or to promotional offers by
                    BetNare, to rescind or block CLIENT accounts created to that end, as
                    well as
                    their transactions.
                </p>
                <p>BetNare reserves the right to revoke and/or cancel any bonus and/or
                    promotional winnings which are deemed to have occurred due to abuse
                    and/or
                    misuse of any promotional system. In the event of any dispute, the
                    general
                    conditions set out in the complaints procedure on the company’s
                    website will apply.
                </p>
                <p>
                    The Bonus Money will be kept separately from the Real Money on the
                    account.
                    The Bonus Money will not be paid out directly until it has been
                    transformed
                    into real cash winnings.
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
                <strong>General rules</strong>
                <br/>
                <ol>
                    <li>
                        Apart from Jackpot Bonus, any other bonus awarded cannot be
                        withdrawn.
                        However, bonus winnings derived from the bets placed
                        successfully with
                        the
                        bonus can be withdrawn.
                    </li>
                    <li>
                        If BETNARE notices something suspicious about your activities
                        with
                        the
                        bonus, then we may take it away. This includes very similar
                        betting
                        patterns
                        between the referrer and the referred account.
                    </li>
                    <li>
                        All bonuses require a 3x play through limited odds of 7.50 or
                        higher
                        on
                        any Sport offered by BetNare.
                    </li>
                    <li>
                        All bonuses expire at midnight.
                        5. When any bonuses are mixed with cash, all rules on bonus bets
                        will
                        apply.
                    </li>
                    <li>
                        Each bonus offer will have its own "terms and conditions” and
                        Customers
                        should ensure that the terms and conditions associated with each
                        individual
                        bonus offer are read and understood prior to accepting the
                        bonus.
                    </li>
                    <li>
                        Promotions are subject to change. All management decisions are
                        final.
                    </li>
                    <li>
                        In the event of an error when attributing a bonus to a Customer
                        account,
                        the company reserves the right to correct such errors by
                        removing any
                        funds
                        that were put into a Customer's account erroneously and by
                        voiding any
                        bets
                        that were placed by these funds.
                    </li>
                </ol>
            </AccordionItemPanel>
        </AccordionItem>
    )
}

export default BonusesAndPromotions