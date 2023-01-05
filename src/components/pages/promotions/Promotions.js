import Header from "../../header/header";
import SideBar from "../../sidebar/awesome/Sidebar";
import Footer from "../../footer/footer";
import React from "react";

import twentyPercentDepositBonus from '../../../assets/img/banner/products/dailyDeposit.webp'

import firstDeposit from '../../../assets/img/banner/products/stakeBooster.webp'
import multibetCashback from '../../../assets/img/banner/products/100PercentCashback.jpg'

import karibuGiftWallet from "../../../assets/img/banner/products/karibuGift.webp"

import {Table} from "react-bootstrap";

const Promotions = () => {
    return (
        <>
            <Header/>
            <div className="amt">
                <div className="d-flex flex-row">
                    <SideBar loadCompetitions/>
                    <div className="gz home" style={{width: '100%'}}>
                        <div className="homepage">
                            <div className="col-md-12 d-flex flex-column">
                                <div className="col-md-12">
                                    <div
                                        className="game-categories shadow-sm  p-2 shadow-sm casino-category-container text-white">
                                        BETNARE PROMOTIONS
                                    </div>
                                </div>
                                <div className="col">
                                    <div className={'row text-white p-2 shadow-sm d-flex justify-content-center'}>
                                        {/*<div className="col-md-12 d-flex flex-row shadow-lg mt-2 promotion">*/}
                                        {/*    <div className="col-md-12">*/}
                                        {/*        <div className="d-flex flex-column">*/}
                                        {/*            <h5 className={'text-uppercase'}>*/}
                                        {/*                Open to all NEW and Existing customers.*/}
                                        {/*                It is Christmas come early in BetNare, 5 JOGOOS & 2 MBUZI’s UP*/}
                                        {/*                FOR GRABS DAILY*/}
                                        {/*            </h5>*/}
                                        {/*            <img src={krisi} className={'rounded'}/>*/}
                                        {/*            <div className="col-md-12">*/}
                                        {/*                ✅*/}
                                        {/*                This applies to both Multibets and Single bets.*/}
                                        {/*                <br/>*/}
                                        {/*                ✅*/}
                                        {/*                The promotion is Open for a customer once you place a bet*/}
                                        {/*                (Any type of bet).*/}
                                        {/*                <br/>*/}

                                        {/*                ✅*/}
                                        {/*                No Minimum odds or Number of legs are required for One to*/}
                                        {/*                qualify for the award*/}
                                        {/*                <br/>*/}

                                        {/*                ✅*/}
                                        {/*                Daily winners will receive different prizes credited into*/}
                                        {/*                their BetNare account. This can be WITHDRAWN directly via Mpesa*/}
                                        {/*                <br/>*/}
                                        {/*                ✅Winners are chosen randomly by the BetNare promotion systems*/}
                                        {/*                <br/>*/}
                                        {/*                ✅JOGOOS up for grabs daily when you stake using KES29/= or*/}
                                        {/*                MORE*/}
                                        {/*                <br/>*/}
                                        {/*                ✅*/}
                                        {/*                MBUZIS up for grabs daily when you stake using KES49/= or MORE*/}
                                        {/*                <br/>*/}
                                        {/*                ✅*/}
                                        {/*                Promo runs from the 10th December 2022 to 25th December 2022.*/}
                                        {/*                <br/>*/}
                                        {/*                ✅*/}
                                        {/*                General BetNare terms and conditions apply.*/}
                                        {/*            </div>*/}
                                        {/*        </div>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        <div className="col-md-12 shadow-lg promotion">
                                            <div className="d-flex flex-column">
                                                <h5>KARIBU GIFT WALLET</h5>
                                                <img src={karibuGiftWallet} className={'rounded'}/>
                                                <p>Register and Get the BetNare Bet Booster of UPTO 3,000/= FREE</p>
                                                <p>The client is set to receive Up to 3,000/= to Unlock their Gift
                                                    Wallet once they Register</p>
                                                <br/>
                                                <ul>
                                                    How to get the Nare Booster Gifts
                                                    <br/>
                                                    ✅REGISTER on BetNare.
                                                    <br/>
                                                    ✅Get UPTO 3,000 of registration as Free Nare Booster to be used on
                                                    BetNare
                                                    when placing bets (in the Betslip)
                                                    <br/>
                                                    ✅Start using your BOOSTERS immediately on your 1 st Cash Bet.
                                                    <br/>
                                                </ul>
                                                <span><u>HOW TO USE THE BOOSTERS;</u></span>
                                                <ul>
                                                    ✅Place a bet with a minimum of odds of 1.5 per leg
                                                    <br/>
                                                    ✅A minimum of 4 games on a Multi Bet.
                                                    <br/>
                                                    ✅BetNare will top up your stake by 20% of the stake used.
                                                    e.g., When you stake 50/= BetNare will boost your stake by 20%
                                                    meaning
                                                    your stake will be 60/=, if you place a Stake of 200/=, BetNare will
                                                    boost it to
                                                    240/=
                                                    <br/>
                                                    <br/>
                                                    <p className={"text-center lead"}>
                                                        <strong>NB:</strong> - Kindly Note that the Maximum Gift Bonus
                                                        One can be topped up with is 40/=
                                                        PER TICKET.
                                                        <br/>
                                                        - Kindly Note that the BOOSTER wallet funds Do Not have an
                                                        expiry date.

                                                    </p>


                                                </ul>
                                                <br/>
                                                <div className="col-md-12">
                                                    <span><u>Terms and conditions</u></span>
                                                    <ol>


                                                        ✅ One account one Nare Booster. Accounts with the same IP
                                                        address and same
                                                        Password will be regarded as the same customer and will not be
                                                        able to claim the
                                                        Booster Gift. First Deposit Gifts would be available only if a
                                                        user makes a deposit
                                                        within the first 3 months of account opening.<br/>

                                                        ✅ Once you REGISTER you get GIFT BOOSTER in total value of up to
                                                        KES.3,000.<br/>

                                                        ✅ You will receive all the gifts once you REGISTER . The gifts
                                                        will become valid only
                                                        on cash bets.<br/>
                                                        ✅ The Gifts can only be used for &quot;Real Sports&quot; and not
                                                        on Virtuals , Jackpot and
                                                        Casino.<br/>

                                                        ✅ These Free Bet Gifts can only be used to place bets with 4+
                                                        selections with at
                                                        least 4 selections having Odds &gt; 1.5.<br/>

                                                        ✅ Only 1 Booster Gift can be used in 1 Betslip.<br/>

                                                        ✅ In this promotion, BetNare only allows one chance to award
                                                        Gifts per person /
                                                        mobile number/ IP address/device number.<br/>

                                                        ✅ Duplicate accounts will be closed and will not qualify for
                                                        this offer. Any winnings
                                                        obtained unlawfully from this bonus will be removed. Promotions
                                                        and Gifts are
                                                        created in order to reward our most valued customers.<br/>

                                                    </ol>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 shadow-lg promotion">
                                            <div className="d-flex flex-column">
                                                <h5>1500% FIRST DEPOSIT BOOSTER</h5>
                                                <img src={firstDeposit} className={'rounded'}/>
                                                <span><u>How to Play</u></span>
                                                <ul>
                                                    ✅ A client receives 1500% BONUS on the FIRST ever deposit.
                                                    <br/>

                                                </ul>
                                                <div className="col-md-12">
                                                    <span><u>Terms and conditions</u></span>
                                                    <ol>

                                                        ✅ Make a single first deposit of any AMOUNT on BetNare.
                                                        <br/>
                                                        ✅Get 1500% of your first deposit value as Free Nare Booster
                                                        to be used at BetNare when placing bets (in the Betslip)
                                                        <br/>

                                                        ✅ Start using your BOOSTERS immediately on your 1st Cash Bet.
                                                        day.
                                                        <br/>

                                                        ✅This offer ONLY applies to your first ever deposit from
                                                        November 25th

                                                        <br/>

                                                        ✅The BOOSTER wallet funds Do Not have an expiry date.

                                                        <br/>
                                                    </ol>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 shadow-lg promotion">
                                            <div className="d-flex flex-column">
                                                <h5>20% FIRST DAILY DEPOSIT BONUS </h5>
                                                <img src={twentyPercentDepositBonus} className={'rounded'}/>
                                                <span><u>How to Play</u></span>
                                                <ul>
                                                    ✅ Get 20% daily deposit Boost on your 1st deposit of the day.
                                                    <br/>
                                                    ✅ E.g., When you make a deposit of 100/=, BetNare will boost your
                                                    deposit by 20% which is 20/=. The 20/= will be Topped up into your
                                                    BOOSTER wallet.
                                                    <br/>

                                                </ul>
                                                <div className="col-md-12">
                                                    <span><u>Terms and conditions</u></span>
                                                    <ol>

                                                        <ul>
                                                            <>✅ Deposit any AMOUNT to GET the 20% DAILY BOOSTER</>
                                                            <br/>
                                                            <>✅ The GIFT is ONLY to be issued ONCE per player, per
                                                                account, per day.
                                                            </>
                                                            <br/>
                                                            <>✅ Kindly Note that the Gift wallet funds Do Not have
                                                                an expiry date.
                                                            </>
                                                        </ul>

                                                    </ol>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 d-flex flex-row shadow-lg mt-2 promotion">
                                            <div className="col-md-12">
                                                <div className="d-flex flex-column">
                                                    <h5> 100% MULTIBET LOST BONUS</h5>
                                                    <img src={multibetCashback} className={'rounded'}/>
                                                    <span><u>How it works</u></span>
                                                    <ol>
                                                        <br/>
                                                        ✅
                                                        Place a pre-match Multibet/ accumulator of 5 or MORE
                                                        selections.
                                                        <br/>
                                                        ✅
                                                        If your bet is unsuccessful from 1 loss out of the
                                                        accumulator,
                                                        BetNare will refund a bonus of a set percentage based on the
                                                        matrix
                                                        set on your stake. i.e. The bonus amount is dependent on the
                                                        number of selections.

                                                    </ol>
                                                    <hr/>

                                                    <Table bordered responsive className={"text-white"}
                                                           style={{backgroundColor: "#1f2f38"}}>
                                                        <thead>
                                                        <tr>
                                                            <th>Types</th>
                                                            <th>Bonus LOSS
                                                                Breakdown Table
                                                            </th>
                                                            <th>Percentage</th>

                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr>
                                                            <td>#</td>
                                                            <td>Bet Type</td>
                                                            <td>Bonus</td>

                                                        </tr>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>1/5 folds</td>
                                                            <td>30% bonus</td>

                                                        </tr>
                                                        <tr>
                                                            <td>2</td>
                                                            <td> 1/6 folds</td>
                                                            <td>35% bonus</td>

                                                        </tr>
                                                        <tr>
                                                            <td>3</td>
                                                            <td> 1/7 folds</td>
                                                            <td>40% bonus</td>

                                                        </tr>
                                                        <tr>
                                                            <td>4</td>
                                                            <td> 1/8 folds</td>
                                                            <td>45% bonus</td>

                                                        </tr>
                                                        <tr>
                                                            <td>5</td>
                                                            <td> 1/9 folds</td>
                                                            <td>50% bonus</td>

                                                        </tr>
                                                        <tr>
                                                            <td>6</td>
                                                            <td> 1/10 folds</td>
                                                            <td>55% bonus</td>

                                                        </tr>
                                                        <tr>
                                                            <td>7</td>
                                                            <td> 1/11 folds</td>
                                                            <td>60% bonus</td>

                                                        </tr>
                                                        <tr>
                                                            <td>6</td>
                                                            <td> 1/12 folds</td>
                                                            <td>get 100% bonus</td>

                                                        </tr>
                                                        </tbody>
                                                    </Table>
                                                    <hr/>

                                                    <h5><u>Example</u></h5>
                                                    ✅ If I lose 1/5 and my stake was 100% THEN I will be awarded a
                                                    BONUS of KES.30.
                                                    <br/>
                                                    ✅ If I LOSE 1/10 folds and my STAKE was KES 100, THEN I will
                                                    be awarded a bonus of KES.55.
                                                    <br/>
                                                    ✅
                                                    If I LOSE 1/20 selections and my STAKE was 1000, THEN I will
                                                    be awarded a bonus of KES250.
                                                    <br/>
                                                    <h5><u>Significant Terms and Conditions</u></h5>
                                                    <br/>
                                                    ✅
                                                    This offer ONLY applies to returns on Pre-Match accumulators
                                                    <br/>
                                                    ✅
                                                    The MAXIMUM BONUS that you can receive is KES250.
                                                    <br/>
                                                    ✅ BetNare may, at any time reclaim any bonus amount; Free
                                                    Bets, Nare Points and enhanced payments that you may have
                                                    been awarded in error.
                                                    <br/>
                                                    ✅ BetNare may at any time make minor amendments to this
                                                    promotion to correct typographical errors or to improve on
                                                    clarity of customer experience and may CANCEL this promotion
                                                    for legal or regulatory reasons.
                                                    <br/>
                                                    ✅ Bets placed with Bonuses DO NOT apply/qualify for this
                                                    offer
                                                    <br/>
                                                    ✅ The refund is paid in BONUS and BONUS RULES apply
                                                    <br/>
                                                    ✅
                                                    Jackpot bets will not apply/ be considered for this
                                                    promotion
                                                    <br/>
                                                    ✅ Voided bets will not apply / be considered.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 d-flex flex-row shadow-lg mt-2 promotion d-none">
                                            <div className="col-md-12">
                                                <div className="d-flex flex-column">
                                                    <h5>BETNARE NGWARE</h5>
                                                    {/*<img src={ngware} className={'rounded'}/>*/}
                                                    <span>
                                                        Monday promotion. BetNare Ngware, anzisha Wiki na Thao.
                                                    </span>
                                                    <div className="col-md-12">
                                                        <span><u>Entry Requirements</u></span>
                                                        <ol>

                                                            ✅ This promotion will be running every Monday for the Month
                                                            Of October 2022.<br/>

                                                            ✅ Place a bet with 50/= or more between 6am and 12 pm.<br/>

                                                            ✅ Like the social media post in any of our channels.<br/>

                                                            <strong>
                                                                NB: Kindly NOTE that the WINS will be credited on
                                                                your BetNare Account. You can Play with or Withdraw the
                                                                Funds.
                                                            </strong>

                                                        </ol>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 d-flex flex-row shadow-lg mt-2 promotion d-none">
                                            <div className="col-md-12">
                                                <div className="d-flex flex-column">
                                                    <h5>LALA KICHAMPE</h5>
                                                    {/*<img src={lala} className={'rounded'}/>*/}
                                                    <span>
                                                        This promotion will run on every Wednesday of the Month of
                                                            October, 8pm to 10pm.
                                                    </span>
                                                    <div className="col-md-12">
                                                        <span><u>Entry Requirements</u></span>
                                                        <ol>

                                                            ✅ BetNare will Award 4 lucky winners with Ksh. 2000 each, 2
                                                            winners each hour from 8 pm to 10 pm. <br/>
                                                            ✅ Place a bet with 50/= or more between 8pm and 10 pm
                                                            <br/>

                                                            ✅ Like the social media post in any of our channels

                                                            <strong>
                                                                NB; Kindly NOTE that the WINS will be credited on your
                                                                BetNare accounts. You can Play with or Withdraw the
                                                                Funds
                                                            </strong>

                                                        </ol>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 d-flex flex-row shadow-lg mt-2 promotion d-none">
                                            <div className="col-md-12">
                                                <div className="d-flex flex-column">
                                                    <h5>Furahia Rush Hour kiBetNare</h5>
                                                    {/*<img src={rushHour} className={'rounded'}/>*/}
                                                    <div className="col-md-12">
                                                        ✅ This promotion will run every Friday for the Month Of October
                                                        2022, 3pm to 7pm<br/>

                                                        ✅Award 3 Lucky winners with Ksh. 3000 each.<br/>

                                                        ✅Award a winner every two hours from 3pm to 7pm.<br/>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <span><u>Entry Requirements</u></span>
                                                        <ol>

                                                            ✅Entry requirements:<br/>

                                                            ✅ Place a bet with 50/= or more between 3pm and 7pm<br/>

                                                            ✅ Like the social media post in any of our channels<br/>

                                                            <strong>
                                                                Kindly NOTE that the WINS will be credited on your
                                                                BetNare accounts. You can Play with or Withdraw the
                                                                Funds
                                                            </strong>

                                                        </ol>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 d-flex flex-row shadow-lg mt-2 promotion d-none">
                                            <div className="col-md-12">
                                                <div className="d-flex flex-column">
                                                    <h5 className={'text-uppercase'}>
                                                        Angukia Rent
                                                    </h5>
                                                    {/*<img src={rent} className={'rounded'}/>*/}
                                                    <div className="col-md-12">
                                                        ✅
                                                        The Angukia rent draw will be conducted on Monday 31st October.
                                                        <br/>

                                                        ✅BetNare will Award 1 lucky winner with KSh. 30,000 who’d
                                                        participated in any of the running October Promotions.

                                                        <br/>
                                                        <strong className={'text-uppercase'}>
                                                            Entry requirements:
                                                        </strong>
                                                        <br/>
                                                        ✅
                                                        Place a bet with 50/= or more between 3rd October and 31st
                                                        October at 12noon
                                                        <br/>
                                                        ✅
                                                        Follow/Like any of our social media channels
                                                        <br/>
                                                        ✅
                                                        <strong>Kindly NOTE that the WINS will be credited on your
                                                            BetNare
                                                            accounts. You can Play with or Withdraw the Funds</strong>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>

    )
}

export default Promotions