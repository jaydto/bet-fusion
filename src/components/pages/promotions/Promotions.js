import Header from "../../header/header";
import SideBar from "../../sidebar/awesome/Sidebar";
import Footer from "../../footer/footer";
import React from "react";

import twentyPercentDepositBonus from '../../../assets/img/banner/products/20PercentFirstdepositBonus-min.png'
import thirtyPercentDailyCashback from '../../../assets/img/banner/products/30PercentDAILYCASHBACK.png'
import seventyPercentMultibetCashback from '../../../assets/img/banner/products/70PercentMULTIBETCASHBACK.png'
import karibuBonus from '../../../assets/img/banner/products/KaribuBonus.png'

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
                                        <div className="col-md-12 shadow-lg">
                                            <div className="d-flex flex-column">
                                                <h5>50 BOB KARIBU BONUS</h5>
                                                <img src={karibuBonus} className={'rounded'}/>
                                                <span><u>Register</u></span>
                                                <ul>
                                                    <li>
                                                        ✅ Register on sms by sending the word JOIN or BET or Game etc to 29877
                                                    </li>
                                                    <li>
                                                        ✅ Visit betnare.com and create an account
                                                    </li>
                                                </ul>
                                                <div className="col-md-12">
                                                    <span><u>Terms and conditions</u></span>
                                                    <ol>

                                                        ✅ Eligible for new accounts only.
                                                        <br/>

                                                        Bonus rules apply

                                                    </ol>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 shadow-lg">
                                            <div className="d-flex flex-column">
                                                <h5>20% FIRST DEPOSIT BONUS (DEPOSIT UPEWE)</h5>
                                                <img src={twentyPercentDepositBonus} className={'rounded'}/>
                                                <span><u>How to Play</u></span>
                                                <ul>
                                                    <li>
                                                        ✅ Deposit KES.50 to 500 get 20% as bonus
                                                    </li>
                                                    <li>
                                                        ✅ Deposit 500 and above get ksh.100 free (bonus). i.e. it is
                                                        capped at Ksh.500. Any
                                                        amount above 500 bonus issued will be Ksh.100.
                                                    </li>
                                                </ul>
                                                <div className="col-md-12">
                                                    <span><u>Terms and conditions</u></span>
                                                    <ol>

                                                        ✅ Promotion is capped at KES.500 max
                                                        <br/>
                                                        ✅ Any deposit amounts exceeding 500 will only get
                                                        KES.100
                                                        <br/>

                                                        ✅ The bonus is only to be issued ONCE, per player per
                                                        day.
                                                        <br/>

                                                        ✅ The bonus is ONLY to be issued on one transaction of
                                                        KES 50 and above.
                                                        <br/>

                                                        Bonus rules apply

                                                    </ol>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 d-flex flex-row shadow-lg mt-2">
                                            <div className="col-md-12">
                                                <div className="d-flex flex-column">
                                                    <h5>DAILY CASHBACK</h5>
                                                    <img src={thirtyPercentDailyCashback} className={'rounded'}/>
                                                    <span><u>How to Play</u></span>
                                                    <ul>
                                                        <li>
                                                            Get a 30% cash
                                                            back which comes as a bonus when you lose their third cash
                                                            bet (Single bets and
                                                            multi-bets) with an odd of 2.5 and above
                                                        </li>
                                                    </ul>
                                                    <div className="col-md-12">
                                                        <span><u>Terms and conditions</u></span>
                                                        <ol>

                                                            ✅ This promotion will apply to your third (2.5 and above
                                                            odds) cash bet made
                                                            every day.

                                                            <br/>

                                                            ✅ The award in is CASH, which is credited to the
                                                            customer’s wallet
                                                            <br/>


                                                            ✅ The maximum amount issued as a cash back bonus will be
                                                            KSH 100.
                                                            <br/>

                                                            ✅ Bets with bonus amounts will not be considered for
                                                            this promotion as they
                                                            are not cash bets.
                                                            <br/>

                                                            ✅ Jackpot bets will not be considered for this
                                                            promotion.
                                                            <br/>

                                                            ✅ Voided Bets will be considered as cash refunds.
                                                            <br/>

                                                            ✅ The promotion runs on Monday to Thursday ONLY and WILL
                                                            NOT be
                                                            available on FRIDAY, SATURDAY & SUNDAY
                                                            <br/>

                                                            ✅ Betnare reserves the right to end the promotion at any
                                                            time without any
                                                            explanation or notification.
                                                            <br/>

                                                            ✅ Betnare reserves the right to disqualify any player at
                                                            any time without being
                                                            bound to give reasons.
                                                            <br/>

                                                            Bonus rules apply
                                                        </ol>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 d-flex flex-row shadow-lg mt-2">

                                            <div className="col-md-12">
                                                <div className="d-flex flex-column">
                                                    <h5>MULTIBET LOST BONUS</h5>
                                                    <img src={seventyPercentMultibetCashback} className={'rounded'}/>
                                                    <span><u>How to Play</u></span>
                                                    <ul>

                                                        ✅ Place a pre-match Multibet / accumulator of 5 or more
                                                        selections.

                                                        ✅ If your bet is unsuccessful from 1 loss out of the
                                                        accumulator, we will refund a
                                                        bonus of a set percentage based on the matrix set on your
                                                        stake. i.e., The bonus
                                                        amount is dependent on the number of selections

                                                    </ul>
                                                    <div className="col-md-12">
                                                        <span><u>Terms and conditions</u></span>
                                                        <ol>

                                                            ✅ This offer ONLY applies to returns on pre-match
                                                            accumulators
                                                            <br/>

                                                            ✅ The maximum bonus that you can receive is KES.500
                                                            <br/>

                                                            ✅ Betnare may reclaim any bonus amount, Free Bets,
                                                            shinda points or enhanced
                                                            payments that have been awarded in error.
                                                            <br/>

                                                            ✅ Betnare may, at any time, make minor amendments to
                                                            this promotion to correct
                                                            typographical errors or to improve on clarity or
                                                            customer experience and may
                                                            cancel this promotion for legal or regulatory reasons.
                                                            <br/>

                                                            ✅ Bets placed with bonuses do not apply/qualify for this
                                                            offer
                                                            <br/>

                                                            ✅ The refund is paid in BONUS and bonus rules apply
                                                            <br/>

                                                            ✅ Jackpot bets will not apply/ be considered for this
                                                            promotion
                                                            <br/>

                                                            ✅ Voided Bets will not apply/ be considered.

                                                        </ol>
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