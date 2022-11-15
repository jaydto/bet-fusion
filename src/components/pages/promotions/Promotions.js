import Header from "../../header/header";
import SideBar from "../../sidebar/awesome/Sidebar";
import Footer from "../../footer/footer";
import React from "react";

import twentyPercentDepositBonus from '../../../assets/img/banner/products/150PercentDaily_.jpg'
import karibuBonus from '../../../assets/img/banner/products/100_RegBonus.jpg'
import multibetCashback from '../../../assets/img/banner/products/100PercentCashback.jpg'
import twoHundredPercent from '../../../assets/img/banner/products/500PercentBonus_.jpg'
import advance from '../../../assets/img/banner/products/Advance.jpg'
// import lala from '../../../assets/img/banner/products/Lala.jpg'
// import ngware from '../../../assets/img/banner/products/Ngware.jpg'
// import rent from '../../../assets/img/banner/products/Rent.jpg'
// import rushHour from '../../../assets/img/banner/products/Rush Hour.jpg'

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
                                    
                                        <div className="col-md-12 shadow-lg promotion">
                                            <div className="d-flex flex-column">
                                                <h5>100 BOB KARIBU BONUS</h5>
                                                <img src={karibuBonus} className={'rounded'}/>
                                                <span><u>Register</u></span>
                                                <ul>

                                                    ✅ Register on sms by sending the word JOIN or BET or Game etc to
                                                    29877
                                                    <br/>

                                                    ✅ Visit betnare.com and create an account
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
                                        <div className="col-md-12 shadow-lg promotion">
                                            <div className="d-flex flex-column">
                                                <h5>150% FIRST DAILY DEPOSIT BONUS (DEPOSIT UPEWE)</h5>
                                                <img src={twentyPercentDepositBonus} className={'rounded'}/>
                                                <span><u>How to Play</u></span>
                                                <ul>
                                                    ✅ A client receives 150% BONUS on the FIRST deposit of the day.
                                                    <br/>

    
                                                </ul>
                                                <div className="col-md-12">
                                                    <span><u>Terms and conditions</u></span>
                                                    <ol>

                                                        ✅ Promotion is capped at KES.1000 max
                                                        <br/>
                                                        ✅ Any deposit amounts exceeding 667 will only get
                                                        KES.1000
                                                        <br/>

                                                        ✅ The bonus is only to be issued ONCE, per player per
                                                        day.
                                                        <br/>

                                                        

                                                        Bonus rules apply

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
                                        <div className="col-md-12 d-flex flex-row shadow-lg mt-2 promotion">
                                            <div className="col-md-12">
                                                <div className="d-flex flex-column">
                                                    <h5>500% FIRST DEPOSIT BONUS</h5>
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

                                                            ✅ Any Amount above KES. 49 Thus 1st deposits of KES.100 up
                                                            to
                                                            KES. 200 are matched with a bonus.
                                                            <br/>
                                                            ✅ The maximum bonus that you can receive is KES.1000
                                                            <br/>

                                                        </ol>
                                                    </div>
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
                                        <div className="col-md-12 d-flex flex-row shadow-lg mt-2 promotion">
                                            <div className="col-md-12">
                                                <div className="d-flex flex-column">
                                                    <h5 className={'text-uppercase'}>Jijenge kaAdvance na BetNare</h5>
                                                    <img src={advance} className={'rounded'}/>
                                                    <div className="col-md-12">
                                                        ✅
                                                        Place a bet with 50/= or more between 3rd October 2022 and 17th
                                                        October 2022
                                                        <br/>
                                                        ✅
                                                        Follow/Like any of our social media channels
                                                        <br/>

                                                        ✅Award 3 Lucky winners with Ksh. 3000 each.<br/>

                                                        ✅Award a winner every two hours from 3pm to 7pm.<br/>
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