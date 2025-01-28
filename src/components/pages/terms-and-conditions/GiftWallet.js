import {
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import React from "react";

const GiftWallet = () => {
    return (
        <AccordionItem>
            <AccordionItemHeading>
                <AccordionItemButton className='accordion-button'>
                    KARIBU STAKE BOOSTER
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className='accordion-item-panel'>
<ol>
    <li>
        Register and Get the BetTena Bet Booster of UPTO 3,000/= FREE
    </li>
    <li>The client is set to receive Up to 3,000/= to Unlock their Stake Booster once they REGISTER</li>
</ol>

                <br/>
                <strong className="text-decoration-underline">HOW TO GET THE BOOSTER GIFTS</strong>
                <ol>
                    <li>REGISTER on BetTena.</li>
                    <li>Get UPTO 3,000 of registration as Free Booster to be used on BetTena
                        when placing bets (in the Betslip)
                    </li>
                    <li>Start using your BOOSTERS immediately on your 1 st Cash Bet.
                    </li>
                </ol>

                <br/>
                <strong className="text-decoration-underline">HOW TO USE THE BOOSTERS;</strong>
                <ol>

                    <li>
                        Place a bet with a minimum of odds of 1.5 per leg
                    </li>
                    <li>
                        A minimum of 4 games on a Multi Bet.
                    </li>
                    <li>
                        BetTena will top up your stake by 20% of the stake used.
                        e.g., When you stake 50/= BetTena will boost your stake by 20% meaning
                        your stake will be 60/=, if you place a Stake of 200/=, BetTena will boost it to
                        240/=
                    </li>
                </ol>

                <p className="lead text-center">
                    <strong>NB:> - Kindly Note that the Maximum Gift Bonus One can be topped up with is 40/=
                        PER TICKET.</strong>
                    <br/>
                    <strong>- Kindly Note that the BOOSTER wallet funds Do Not have an expiry date.</strong>
                </p>

                <br/>
                <strong className="text-decoration-underline">TERMS AND CONDITIONS</strong>
                <br/>
                <ol>
                    <li>
                        One account one Nare Booster. Accounts with the same IP address and same
                        Password will be regarded as the same customer and will not be able to claim the
                        Booster Gift. First Deposit Gifts would be available only if a user makes a deposit
                        within the first 3 months of account opening.
                    </li>
                    <li>
                        Once you REGISTER you get GIFT BOOSTER in total value of up to KES.3,000.
                    </li>
                    <li>
                        You will receive all the gifts once you REGISTER . The gifts will become valid only
                        on cash bets.
                    </li>
                    <li>
                        The Gifts can only be used for &quot;Real Sports&quot; and not on Virtuals , Jackpot and
                        Casino.
                    </li>
                    <li>
                        These Free Bet Gifts can only be used to place bets with 4+ selections with at
                        least 4 selections having Odds &gt; 1.5.
                    </li>
                    <li>
                        Only 1 Booster Gift can be used in 1 Betslip.
                    </li>
                    <li>
                        In this promotion, BetTena only allows one chance to award Gifts per person /
                        mobile number/ IP address/device number.
                    </li>
                    <li>
                        Duplicate accounts will be closed and will not qualify for this offer. Any winnings
                        obtained unlawfully from this bonus will be removed. Promotions and Gifts are
                        created in order to reward our most valued customers.
                    </li>
                    <li>
                        Under suspect of fraud or abuse of this promotion by any customer, we reserve ourselves the
                        right to remove Gifts and associated winnings from a given account or any associated accounts.
                        BetTena reserves itself the rights to amend, cancel, reclaim or refuse any promotion at its own
                        discretion.
                    </li>

                </ol>
            </AccordionItemPanel>
        </AccordionItem>
    )
}

export default GiftWallet;