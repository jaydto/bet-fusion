import React from "react";
import twentyPercentDepositBonus from "../../../assets/img/banner/products/Bet_Nare_gift_Mobile.webp";
import firstDeposit from "../../../assets/img/banner/products/Firstdeposit.jpeg";
import multibetCashback from "../../../assets/img/banner/products/Bet_Nare_100_Cashback_Mobile.webp";
import karibuGiftWallet from "../../../assets/img/banner/products/Bet_Nare_3000_karibu_gift_Mobile.webp";
import {Link, useNavigate} from "react-router-dom";
import "./promo.css";
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";
import {getFromLocalStorage, setLocalStorage} from "../../utils/local-storage";


const PromoCards = () => {
    const gaEventTracker = useAnalyticsEventTracker('Promotions');

    let ids = [1, 2, 3, 4, 5, 6, 7, 8];
    const navigate = useNavigate()

    const setUtmSouceCampaignOnPromotions = (event) => {
        const utm_source = getFromLocalStorage('utm_source')
        if (!utm_source) {
            setLocalStorage('utm_source', event)
        }
    }

    return (
        <div className="col px-4 d-flex align-items-start align-self-start justify-content-start">
            <div
                className={
                    "row text-white pt-2 border-0 d-flex justify-content-center promo-container d-flex align-self-start align-items-start"
                }
            >
                <div className="col-md-2 promo-styling shadow-lg promotion">
                    <div className="d-flex flex-column promo-inner">
                        <img src={karibuGiftWallet} className={"rounded promo-image "}/>
                        <h5
                            className="bold d-flex justify-content-center h4 pt-2"
                            style={{color: "#ea5d0b"}}
                        >
                            KARIBU GIFT WALLET
                        </h5>
                        <p className="container mx-1 px-2">
                            Get Up to 3,000/= FREE Bet Booster once you register as a Free Nare Booster...
                        </p>
                        <hr/>
                        <div className="d-flex justify-content-between my-2 mx-2">
                            <button className={"profile-button border-0 h-25 rounded promo-button"}
                                    style={{background: "#ea5d0b"}} onClick={() => {
                                navigate(`/signup`);
                                gaEventTracker('promo Gift Wallet');
                                setUtmSouceCampaignOnPromotions('promo_Gift_Wallet')
                            }}>Sign Up
                            </button>
                            {/*<div*/}
                            {/*    className={"  h-25   button-promotions"}*/}
                            {/*    style={{ color: "#ea5d0b" }}*/}
                            {/*    onClick={()=>navigate(`/signup`)}>*/}
                            {/*  Sign Up*/}
                            {/*</div>*/}
                            <div
                                className={"d-flex  align-self-center   h-25 border-0 bg-transparent"}
                                style={{color: "#ea5d0b"}}
                                onClick={() => navigate(`/promo?id=${ids[0]}`)}
                            >
                                Read More
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-2 promo-styling shadow-lg promotion">
                    <div className="d-flex flex-column promo-inner">
                        <img src={'https://storage.googleapis.com/nareimages/carousel/SpaceMan.webp'}
                             className={"rounded promo-image "}/>
                        <h5
                            className="bold d-flex justify-content-center h4 pt-2"
                            style={{color: "#ea5d0b"}}
                        >
                            Pepea Angani na SpaceMan
                        </h5>
                        <p className="container mx-1 px-2">
                            Win big cash prizes when you hit the top spot and collect UPTO x5000...
                        </p>
                        <hr/>
                        <div className="d-flex justify-content-between my-2 mx-2">
                            <button className={"profile-button border-0 h-25 rounded promo-button"}
                                    style={{background: "#ea5d0b"}} onClick={() => {
                                navigate(`/gameplay/1301/1`);
                                gaEventTracker('promo SpaceMan');
                                setUtmSouceCampaignOnPromotions('promo_SpaceMan')
                            }}>Play SpaceMan
                            </button>
                            <div
                                className={"d-flex  align-self-center  h-25 border-0 bg-transparent"}
                                style={{color: "#ea5d0b"}}
                                onClick={() => navigate(`/promo?id=${ids[6]}`)}
                            >
                                Read More
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 promo-styling card shadow-lg promotion">
                    <div className="d-flex flex-column promo-inner">
                        <img src={firstDeposit} className={"rounded promo-image"}/>
                        <h5
                            className="bold d-flex justify-content-center h4 pt-2 pb-1"
                            style={{color: "#ea5d0b", whiteSpace: "nowrap"}}
                        >
                            FIRST DEPOSIT BOOSTER
                        </h5>
                        <div className="container mx-1  mb-2 px-2">
                            Get 1500% BONUS on the FIRST ever deposit as Free Nare Booster now...
                        </div>
                        <hr/>
                        <div className="d-flex justify-content-between my-2 mx-2">
                            <button className={"profile-button border-0 h-25 rounded promo-button"}
                                    style={{background: "#ea5d0b"}} onClick={() => {
                                navigate(`/deposit`);
                                gaEventTracker('promo  FIRST DEPOSIT BOOSTER');
                                setUtmSouceCampaignOnPromotions('promo_FIRST_DEPOSIT_BOOSTER')
                            }}>Deposit
                            </button>

                            <div
                                className={"d-flex  align-self-center   h-25 border-0 bg-transparent"}
                                style={{color: "#ea5d0b"}}
                                onClick={() => navigate(`/promo?id=${ids[1]}`)}
                            >
                                Read More
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 promo-styling shadow-lg promotion">
                    <div className="d-flex flex-column promo-inner">
                        <img src={'https://storage.googleapis.com/nareimages/carousel/Aviator.webp'}
                             className={"rounded promo-image "}/>
                        <h5
                            className="bold d-flex justify-content-center h4 pt-2"
                            style={{color: "#ea5d0b"}}
                        >
                            Gurumisha Mamili na Aviator
                        </h5>
                        <p className="container mx-1 px-2">
                            With as low as a stake of 10 bob tu, pata kushinda millions...
                        </p>
                        <hr/>
                        <div className="d-flex justify-content-between my-2 mx-2">
                            <button className={"profile-button border-0 h-25 rounded promo-button"}
                                    style={{background: "#ea5d0b"}} onClick={() => {
                                navigate(`/nare-games/aviator`);
                                gaEventTracker('promo Aviator');
                                setUtmSouceCampaignOnPromotions('promo_Aviator')
                            }}>Play Aviator
                            </button>
                            <div
                                className={"d-flex  align-self-center   h-25 border-0 bg-transparent"}
                                style={{color: "#ea5d0b"}}
                                onClick={() => navigate(`/promo?id=${ids[5]}`)}
                            >
                                Read More
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 promo-styling card shadow-lg promotion">
                    <div className="d-flex flex-column promo-inner">
                        <img
                            src={twentyPercentDepositBonus}
                            className={"rounded promo-image"}
                        />
                        <h5
                            className="bold d-flex justify-content-center h4 pt-2"
                            style={{color: "#ea5d0b"}}
                        >
                            20% FIRST DAILY DEPOSIT BONUS{" "}
                        </h5>

                        <div className="container mx-1 px-2">
                            Get 20% daily deposit Boost on your 1st deposit of the day...
                        </div>
                        <hr/>
                        <div className="d-flex justify-content-between my-2 mx-2">
                            <button className={"profile-button border-0 h-25 rounded promo-button"}
                                    style={{background: "#ea5d0b"}} onClick={() => {
                                navigate(`/deposit`);
                                gaEventTracker('promo 20% deposit Boost');
                                setUtmSouceCampaignOnPromotions('promo_20_deposit_Boost')
                            }}>Deposit
                            </button>
                            {/*<div*/}
                            {/*    className={"  h-25   button-promotions"}*/}
                            {/*    style={{ color: "#ea5d0b" }}*/}
                            {/*    onClick={()=>navigate(`/deposit`)}>*/}
                            {/*  Deposit*/}
                            {/*</div>*/}
                            <div
                                className={"d-flex  align-self-center   h-25 border-0 bg-transparent"}
                                style={{color: "#ea5d0b"}}
                                onClick={() => navigate(`/promo?id=${ids[2]}`)}
                            >
                                Read More
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 promo-styling card shadow-lg promotion">
                    <div className="d-flex flex-column  promo-inner">
                        <div className="d-flex flex-column">
                            <img src={multibetCashback} className={"rounded promo-image"}/>
                            <h5
                                className="bold d-flex justify-content-center h4 pt-2"
                                style={{color: "#ea5d0b"}}
                            >
                                {" "}
                                100% MULTIBET LOST BONUS
                            </h5>
                            <div className="container mx-1 px-2">
                                Place a pre-match Multibet of 5 or MORE selections...
                            </div>
                            <hr/>
                            <div className="d-flex justify-content-between my-2 mx-2">
                                <button className={"profile-button border-0 h-25 rounded promo-button"}
                                        style={{background: "#ea5d0b"}} onClick={() => {
                                    navigate(`/`);
                                    gaEventTracker('promo 100% MULTIBET LOST BONUS');
                                    setUtmSouceCampaignOnPromotions('promo_100_MULTIBET_LOST_BONUS')
                                    setUtmSouceCampaignOnPromotions('promo_100_MULTIBET_LOST_BONUS')
                                }}>Bet Now
                                </button>

                                <div
                                    className={"  d-flex align-self-center h-25 border-0 bg-transparent"}
                                    style={{color: "#ea5d0b"}}
                                    onClick={() => navigate(`/promo?id=${ids[3]}`)}
                                >
                                    Read More
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 promo-styling shadow-lg promotion">
                    <div className="d-flex flex-column promo-inner">
                        <img src={'https://storage.googleapis.com/nareimages/smartsoft/jetx.png'}
                             className={"rounded promo-image "}/>
                        <h5
                            className="bold d-flex justify-content-center h4 pt-2"
                            style={{color: "#ea5d0b"}}
                        >
                            JetX the Money Multiplier daily
                        </h5>
                        <p className="container mx-1 px-2">
                            Predict which multiplier the plane will crash. The longer the plane flies, the higher the ...
                        </p>
                        <hr/>
                        <div className="d-flex justify-content-between my-2 mx-2">
                            <button className={"profile-button border-0 h-25 rounded promo-button"}
                                    style={{background: "#ea5d0b"}}
                                    onClick={() => navigate(`/smart-play?game=JetX&category=JetXr`)}>Play JetX
                            </button>
                            <div
                                className={" d-flex align-self-center h-25 border-0 bg-transparent"}
                                style={{color: "#ea5d0b"}}
                                onClick={() => {
                                    navigate(`/promo?id=${ids[7]}`);
                                    gaEventTracker('promo JetX')
                                }}
                            >
                                Read More
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 promo-styling card d-flex flex-row shadow-lg mt-2 promotion d-none">
                    <div className="col-md-12 promo-inner">
                        <div className="d-flex flex-column">
                            {/*<img src={ngware} className={'rounded promo-image'}/>*/}
                            <h5
                                className="bold d-flex justify-content-center"
                                style={{color: "#ea5d0b"}}
                            >
                                BETNARE NGWARE
                            </h5>
                            <hr/>
                            <span className="container mx-1 px-2">
                Monday promotion. BetNare Ngware, anzisha Wiki na Thao.
              </span>
                            <hr/>
                            <div className="d-flex justify-content-between my-2 mx-2">
                                <button className={"profile-button border-0 h-25 rounded promo-button"}
                                        style={{background: "#ea5d0b"}}>Bet Now
                                </button>
                                <div
                                    className={"d-flex  align-self-center h-25 border-0 bg-transparent"}
                                    style={{color: "#ea5d0b"}}
                                    onClick={() => navigate(`/promo?id=${ids[4]}`)}
                                >
                                    {/*<div*/}
                                    {/*    className={"  h-25   button-promotions"}*/}
                                    {/*    style={{ color: "#ea5d0b" }}*/}
                                    {/*    onClick={()=>navigate(`/deposit`)}>*/}
                                    {/*  Deposit*/}
                                    {/*</div>*/}
                                    Read More
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 promo-styling d-flex flex-row shadow-lg mt-2 promotion d-none">
                    <div className="col-md-12 promo-inner">
                        <div className="d-flex flex-column">
                            <h5>LALA KICHAMPE</h5>
                            {/*<img src={lala} className={'rounded promo-image'}/>*/}
                            <span className="container mx-1">
                This promotion will run on every Wednesday of the Month of
                October, 8pm to 10pm.
              </span>
                            <hr/>
                            <div className="d-flex justify-content-between my-2 mx-2">
                                <button className={"profile-button border-0 h-25 rounded"}
                                        style={{background: "#ea5d0b"}}>Bet Now
                                </button>
                                <Link
                                    className={"d-flex  align-self-center  h-25 border-0 bg-transparent"}
                                    style={{color: "#ea5d0b"}}
                                    to={{pathname: `/promo`, search: `id=${ids[5]}`}}
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 promo-styling d-flex flex-row shadow-lg mt-2 promotion d-none">
                    <div className="col-md-12 promo-inner">
                        <div className="d-flex flex-column">
                            {/*<img src={rushHour} className={'rounded promo-image'}/>*/}
                            <h5
                                className="bold d-flex justify-content-center"
                                style={{color: "#ea5d0b"}}
                            >
                                FURAHIA RUSH HOUR KIBETNARE
                            </h5>
                            <hr/>
                            <div className="col-md-12 container mx-1">
                                ✅ This promotion will run every Friday for the Month Of October
                                2022, 3pm to 7pm
                                <br/>
                                ✅Award 3 Lucky winners with Ksh. 3000 each.
                                <br/>
                                ✅Award a winner every two hours from 3pm to 7pm.
                                <br/>
                            </div>
                            <div className="d-flex justify-content-between my-2 mx-2">
                                <button
                                    className={"profile-button border-0 h-25 rounded"}
                                    style={{background: "#ea5d0b"}}
                                >
                                    Bet Now
                                </button>
                                <Link
                                    className={"d-flex  align-self-center   h-25 border-0 bg-transparent"}
                                    style={{color: "#ea5d0b"}}
                                    to={{pathname: `/promo`, search: `id=${ids[6]}`}}
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 promo-styling d-flex flex-row shadow-lg mt-2 promotion d-none">
                    <div className="col-md-12 promo-inner">
                        <div className="d-flex flex-column">
                            <h5
                                className="bold d-flex justify-content-center"
                                style={{color: "#ea5d0b"}}
                            >
                                ANGUKIA RENT
                            </h5>
                            {/*<img src={rent} className={'rounded promo-image'}/>*/}
                            <div className="col-md-12 container mx-1">
                                ✅ The Angukia rent draw will be conducted on Monday 31st
                                October.
                                <br/>
                                <div className="d-flex justify-content-end my-2 mx-2">
                                    {/* <button className={"profile-button border-0 h-25 rounded"} style={{background:"#ea5d0b"}}>Bet Now</button>      */}
                                    <Link
                                        className={"d-flex  align-self-center   h-25 border-0 bg-transparent"}
                                        style={{color: "#ea5d0b"}}
                                        to={{pathname: `/promo`, search: `id=${ids[7]}`}}
                                    >
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromoCards;
