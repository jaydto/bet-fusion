import Header from "../../header/header";
import SideBar from "../../sidebar/awesome/Sidebar";
import Footer from "../../footer/footer";
import React from "react";

import twentyPercentDepositBonus from '../../../assets/img/banner/products/Twenty-Percent-Deposit-Bonus.jpeg'
import karibuBonus from '../../../assets/img/banner/products/Karibu-Bonus.jpeg'
import multibetCashback from '../../../assets/img/banner/products/Banner_100pc_Cashback.jpg'
import twoHundredPercent from '../../../assets/img/banner/products/Banner_200pc_Bonus_x.jpg'

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
                                                        ✅ Register on sms by sending the word JOIN or BET or Game etc to
                                                        29877
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
                                            x
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
                                                    <h5>100% DAILY CASHBACK</h5>
                                                    <img src={multibetCashback} className={'rounded'}/>
                                                    <span><u>How to Play</u></span>
                                                    <ul>
                                                        <li>
                                                            100% MULTIBET LOST BONUS

                                                            Place a pre-match Multibet/ accumulator of 5 or MORE
                                                            selections.
                                                        </li>
                                                        <li>
                                                            If your bet is unsuccessful from 1 loss out of the
                                                            accumulator, BetNare will refund a bonus of a set percentage
                                                            based on the matrix set on your stake. i.e. The bonus amount
                                                            is dependent on the number of selections.
                                                        </li>
                                                    </ul>
                                                    <div className="col-md-12">
                                                        <span><u>Terms and conditions</u></span>
                                                        <ol>
                                                            <br/>
                                                            This offer ONLY applies to returns on Pre-Match accumulators
                                                            <br/>
                                                            ✅ The MAXIMUM BONUS that you can receive is KES250.
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
                                                            offer.
                                                            <br/>

                                                            ✅ The refund is paid in BONUS and BONUS RULES apply.
                                                            <br/>

                                                            ✅ Jackpot bets will not apply/ be considered for this
                                                            promotion.
                                                            <br/>

                                                            ✅ Voided bets will not apply / be considered.

                                                        </ol>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 d-flex flex-row shadow-lg mt-2">
                                            <div className="col-md-12">
                                                <div className="d-flex flex-column">
                                                    <h5>200% FIRST DEPOSIT BONUS</h5>
                                                    <img src={twoHundredPercent} className={'rounded'}/>
                                                    <span><u>How to Play</u></span>
                                                    <ul>

                                                        ✅ Register – SMS “JOIN” or “BET” or “GAME” etc to 29877 Visit
                                                        www.betnare.com and REGISTER
                                                        <br/>
                                                        ✅Deposit ANY amount to your Cash Wallet on Betnare. PayBill
                                                        4087777 Acc.No. PHONE NUMBER

                                                    </ul>
                                                    <div className="col-md-12">
                                                        <span><u>Terms and conditions</u></span>
                                                        <ol>

                                                            ✅ This offer ONLY applies to your first ever deposit
                                                            <br/>

                                                            ✅ Any Amount above KES. 49 Thus 1st deposits of KES.100 up to
                                                            KES. 1000 are matched with a bonus.
                                                            <br/>
                                                            ✅ The maximum bonus that you can receive is KES.250
                                                            <br/>

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