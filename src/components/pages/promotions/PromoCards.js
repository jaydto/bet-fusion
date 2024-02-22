import React from "react";
import twentyPercentDepositBonus from "../../../assets/img/banner/products/Bet_Nare_gift_Mobile.webp";
import firstDeposit from "../../../assets/img/banner/products/Firstdeposit.jpeg";
import multibetCashback from "../../../assets/img/banner/products/Bet_Nare_100_Cashback_Mobile.webp";
import DepositBonus from "../../../assets/img/banner/products/365.webp";
import mia_sita_ham_sini from "../../../assets/img/banner/products/FreeKickBonanzaWeb.webp";

import {Link, useNavigate} from "react-router-dom";
import "./promo.css";
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";
import {getFromLocalStorage, setLocalStorage} from "../../utils/local-storage";
import Notify from "../../utils/Notify";


const PromoCards = () => {
    const gaEventTracker = useAnalyticsEventTracker('Promotions');
    const user = getFromLocalStorage('user')

    let ids = [1, 2, 3, 4, 5, 6, 7, 8, 9,10,11, 12, 13, 14,15,16,17,18,19,20];
    const navigate = useNavigate()

    let message = {status: 401, message: 'This Promotion is for new Users', token: ''};

    const checkIfUser = () => {
        if (user) {
            Notify(message)
        } else {
            navigate('/signup')
        }

    }

    const setUtmSouceCampaignOnPromotions = (event) => {
        setLocalStorage('utm_source', event)
    }

    return (
        <div className="col px-4 d-flex align-items-start align-self-start justify-content-start">
            <div
                className={
                    "row text-white pt-2 border-0 d-flex promo-container-profile d-flex align-self-start align-items-start"
                }
            > <div className="col-md-2 promo-styling shadow-lg promotion">
                    <div className="d-flex flex-column promo-inner">
                        <img src={'https://cdn.betnare.com/carousel/ClimaxWeb.webp'} className={"rounded promo-image "}/>
                        <h5
                            className="bold d-flex justify-content-center h4 pt-2"
                            style={{color: "#ea5d0b"}}
                        >
                            Climax Na Aviator!
                        </h5>
                        <p className="container-profile mx-1 px-2 text-data-promotions">
                        The aim of this promotion is to get the highest odds from winners. Those with the highest in-game multiplier(s) to be awarded ...        
                                 </p>
                        <hr/>

                        <div className="d-flex justify-content-between my-2 mx-2">

                            <button className={"profile-button border-0 h-25 rounded promo-button"}
                                    style={{background: "#ea5d0b"}} onClick={() => {
                                gaEventTracker('lclimax_ na_aviator');
                                navigate(`/nare-games/aviator?status=live`);
                                setUtmSouceCampaignOnPromotions('climax_na_aviator')
                            }}>Play Aviator
                            </button>
                            <div
                                className={"d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"}
                                style={{color: "#ea5d0b"}}
                                onClick={() => {
                                    navigate(`/promo?id=${ids[19]}`);
                                    window.scrollTo(0, 0); // Scroll to the top of the page
                                }}
                            >
                                Read More
                            </div>
                        </div>
                    </div>
                </div>
            <div className="col-md-2 promo-styling shadow-lg promotion">
                    <div className="d-flex flex-column promo-inner">
                        <img src={'https://cdn.betnare.com/carousel/LuckyHourv2.webp'} className={"rounded promo-image "}/>
                        <h5
                            className="bold d-flex justify-content-center h4 pt-2"
                            style={{color: "#ea5d0b"}}
                        >
                            Lucky Hour Bonus!
                        </h5>
                        <p className="container-profile mx-1 px-2 text-data-promotions">
                        The Lucky Hour Bonus applies to new and existing customers who Deposit and place a bet                   </p>
                        <hr/>

                        <div className="d-flex justify-content-between my-2 mx-2">

                            <button className={"profile-button border-0 h-25 rounded promo-button"}
                                    style={{background: "#ea5d0b"}} onClick={() => {
                                gaEventTracker('lucky_hour_2');
                                navigate(`/deposit`);
                                setUtmSouceCampaignOnPromotions('lucky_hour_2')
                            }}>Deposit
                            </button>
                            <div
                                className={"d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"}
                                style={{color: "#ea5d0b"}}
                                onClick={() => {
                                    navigate(`/promo?id=${ids[4]}`);
                                    window.scrollTo(0, 0); // Scroll to the top of the page
                                }}
                            >
                                Read More
                            </div>
                        </div>
                    </div>
                </div>
                
            <div className="col-md-2 promo-styling shadow-lg promotion">
                    <div className="d-flex flex-column promo-inner">
                        <img src={'https://cdn.betnare.com/carousel/DepositBonus.webp'} className={"rounded promo-image "}/>
                        <h5
                            className="bold d-flex justify-content-center h4 pt-2"
                            style={{color: "#ea5d0b"}}
                        >
                            FREE  DEPOSIT OF ALL DEPOSITS!
                        </h5>
                        <p className="container-profile mx-1 px-2 text-data-promotions">
                        All new and existing customers get to enjoy a free deposit bonus on your  all your deposit  from 20bob and above!                       </p>
                        <hr/>

                        <div className="d-flex justify-content-between my-2 mx-2">

                            <button className={"profile-button border-0 h-25 rounded promo-button"}
                                    style={{background: "#ea5d0b"}} onClick={() => {
                                gaEventTracker('ushago_na_mbao');
                                navigate(`/deposit`);
                                setUtmSouceCampaignOnPromotions('free_deposit_bonus')
                            }}>Deposit
                            </button>
                            <div
                                className={"d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"}
                                style={{color: "#ea5d0b"}}
                                onClick={() => {
                                    navigate(`/promo?id=${ids[6]}`);
                                    window.scrollTo(0, 0); // Scroll to the top of the page
                                }}
                            >
                                Read More
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-2 promo-styling shadow-lg promotion">
                    <div className="d-flex flex-column promo-inner">
                        <img src={'https://cdn.betnare.com/carousel/StakeBooster.webp'} className={"rounded promo-image "}/>
                        <h5
                            className="bold d-flex justify-content-center h4 pt-2"
                            style={{color: "#ea5d0b"}}
                        >
                           KARIBU STAKE BOOSTER
                        </h5>
                        <p className="container-profile mx-1 px-2 text-data-promotions">
                            Get Up to 3,000/= FREE Bet Booster once you register as a Free Stake Booster...
                        </p>
                        <hr/>

                        <div className="d-flex justify-content-between my-2 mx-2">

                            <button className={"profile-button border-0 h-25 rounded promo-button"}
                                    style={{background: "#ea5d0b"}} onClick={() => {
                                checkIfUser();
                                gaEventTracker('promo Stake Booster');
                                setUtmSouceCampaignOnPromotions('promo_Gift_Wallet')
                            }}>Sign Up
                            </button>
                            <div
                                className={"d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"}
                                style={{color: "#ea5d0b"}}
                                onClick={() => {
                                    navigate(`/promo?id=${ids[0]}`);
                                    window.scrollTo(0, 0); // Scroll to the top of the page
                                }}
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
                            <div className="container-profile mx-1 px-2 text-data-promotions">
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
                                    className={"  d-flex align-self-center h-25 border-0 bg-transparent cursor-pointer"}
                                    style={{color: "#ea5d0b"}}
                                    onClick={() => {
                                        navigate(`/promo?id=${ids[3]}`);
                                        window.scrollTo(0, 0); // Scroll to the top of the page
                                    }
                                }
                                >
                                    Read More
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 promo-styling shadow-lg promotion">
                    <div className="d-flex flex-column promo-inner promo-inactive">
                        <img src={'https://cdn.betnare.com/carousel/AfconPromoBanner.webp'} className={"rounded promo-image "}/>
                        <h5
                            className="bold d-flex justify-content-center h4 pt-2"
                            style={{color: "#ea5d0b"}}
                        >
                            MAMILLI YA NJAANUARY NA AFCON

                        </h5>
                        <p className="container-profile mx-1 px-2 text-data-promotions">
                        Customers will be required to place a cash bet on sports book (single or multibet) using a stake of 99/= or more
                        </p>                      
                          <hr/>

                        <div className="d-flex justify-content-between my-2 mx-2">

                            <button className={"profile-button border-0 h-25 rounded promo-button"}
                                    style={{background: "#ea5d0b"}} 
                                    disabled={true}
                                    
                                    onClick={() => {
                                gaEventTracker('mamili_afcon');
                                navigate(`/competition/79/8085/21843?sport_id=79&sub_type_id=1`);
                                setUtmSouceCampaignOnPromotions('mamili_afcon')
                            }}>Place Bets
                            </button>
                            <div
                                className={"d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"}
                                style={{color: "#ea5d0b"}}
                                onClick={() => {
                                    navigate(`/promo?id=${ids[14]}`);
                                    window.scrollTo(0, 0); // Scroll to the top of the page
                                }}
                            >
                                Read More
                            </div>
                        </div>
                    </div>
                </div
                >
            <div className="col-md-2 promo-styling shadow-lg promotion">
            
               
            <div className="d-flex flex-column promo-inner promo-inactive">
                        <img src={'https://cdn.betnare.com/carousel/LastPromoFeb.webp'} className={"rounded promo-image "}/>
                        <h5
                            className="bold d-flex justify-content-center h4 pt-2"
                            style={{color: "#ea5d0b"}}
                        >
                          HOW LONG CAN YOU LAST 

                        </h5>
                        <p className="container-profile mx-1 px-2 text-data-promotions">
                        This promotion shall run daily for seven days from 08 February to 15th February 2024 any extension ...
                        </p>
                                                   <hr/>

                        <div className="d-flex justify-content-between my-2 mx-2">

                            <button className={"profile-button border-0 h-25 rounded promo-button"}
                            disabled={true}
                                    style={{background: "#ea5d0b"}} onClick={() => {
                                gaEventTracker('how_long_can_you_last');
                                navigate(`/nare-games/aviator?status=live`);
                                setUtmSouceCampaignOnPromotions('how_long_can_you_last')
                            }}>Play Aviator!
                            </button>
                            <div
                                className={"d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"}
                                style={{color: "#ea5d0b"}}
                                onClick={() => {
                                    navigate(`/promo?id=${ids[18]}`);
                                    window.scrollTo(0, 0); // Scroll to the top of the page
                                }}
                            >
                                Read More
                            </div>
                        </div>
                    </div>
                    
                    
                </div>
                <div className="col-md-2 promo-styling shadow-lg promotion">
                <div className="d-flex flex-column promo-inner promo-inactive">
                        <img src={'https://cdn.betnare.com/carousel/14DaysofloveWeb.webp'} className={"rounded promo-image "}/>
                        <h5
                            className="bold d-flex justify-content-center h4 pt-2"
                            style={{color: "#ea5d0b"}}
                        >
                            FOURTEEN DAYS OF LOVE NA BETNARE PROMOTION.

                        </h5>
                        <p className="container-profile mx-1 px-2 text-data-promotions">
                        The aim is to place a multi bet of 5 games or more, with a stake of over Ksh 14 to stand a chance of winning Ksh 100 daily.                        </p>                       
                           <hr/>

                        <div className="d-flex justify-content-between my-2 mx-2">

                            <button className={"profile-button border-0 h-25 rounded promo-button"}
                                    style={{background: "#ea5d0b"}} 
                                    disabled={true}
                                    onClick={() => {
                                gaEventTracker('14_days_of_love');
                                navigate(`/`);
                                setUtmSouceCampaignOnPromotions('14_days_of_love')
                            }}>Play Now!
                            </button>
                            <div
                                className={"d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"}
                                style={{color: "#ea5d0b"}}
                                onClick={() => {
                                    navigate(`/promo?id=${ids[17]}`);
                                    window.scrollTo(0, 0); // Scroll to the top of the page
                                }}
                            >
                                Read More
                            </div>
                        </div>
                    </div>
                    </div>
                
                 <div className="col-md-2 promo-styling shadow-lg promotion">
                    <div className="d-flex flex-column promo-inner promo-inactive">
                        <img src={'https://cdn.betnare.com/carousel/ValentinesnaJETX.webp'} className={"rounded promo-image "}/>
                        <h5
                            className="bold d-flex justify-content-center h4 pt-2"
                            style={{color: "#ea5d0b"}}
                        >
                            VALENTINES NA JET-X

                        </h5>
                        <p className="container-profile mx-1 px-2 text-data-promotions">
                        Aim for a spot in the top to grab a share of the Ksh. 100,000 cash prizes daily by getting the highest in-game multiplier on Jet X.
                        </p>                       
                           <hr/>

                        <div className="d-flex justify-content-between my-2 mx-2">

                            <button className={"profile-button border-0 h-25 rounded promo-button"}
                                    disabled={true}
                                    style={{background: "#ea5d0b"}} onClick={() => {
                                gaEventTracker('valentine_jetx');
                                navigate(`/smart-play?game=JetX&category=JetX`);
                                setUtmSouceCampaignOnPromotions('valentine_jetx')
                            }}>Play Jetx
                            </button>
                            <div
                                className={"d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"}
                                style={{color: "#ea5d0b"}}
                                onClick={() => {
                                    navigate(`/promo?id=${ids[16]}`);
                                    window.scrollTo(0, 0); // Scroll to the top of the page
                                }}
                            >
                                Read More
                            </div>
                        </div>
                    </div>
                </div
                >
               
               
               
                
                <div className="col-md-2 promo-styling shadow-lg promotion">
                    <div className="d-flex flex-column promo-inner promo-inactive">
                        <img src={'https://cdn.betnare.com/carousel/Pepea.webp'} className={"rounded promo-image "}/>
                        <h5
                            className="bold d-flex justify-content-center h4 pt-2"
                            style={{color: "#ea5d0b"}}
                        >
                            RUBANI CHALLENGE

                        </h5>
                        <p className="container-profile mx-1 px-2 text-data-promotions">
                        Grab a share of the Ksh. 500,000 cash prizes daily by getting the highest in-game multiplier                       </p>                      
                          <hr/>

                        <div className="d-flex justify-content-between my-2 mx-2">

                            <button className={"profile-button border-0 h-25 rounded promo-button"}
                                    style={{background: "#ea5d0b"}} 
                                    disabled={true}
                                    onClick={() => {
                                gaEventTracker('rubani_challenge');
                                navigate(`/nare-games/aviator?status=live`);
                                setUtmSouceCampaignOnPromotions('rubani_challenge')
                            }}>Play Aviator
                            </button>
                            <div
                                className={"d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"}
                                style={{color: "#ea5d0b"}}
                                onClick={() => {
                                    navigate(`/promo?id=${ids[15]}`);
                                    window.scrollTo(0, 0); // Scroll to the top of the page
                                }}
                            >
                                Read More
                            </div>
                        </div>
                    </div>
                </div
                >
                
                <div className="col-md-2 promo-styling shadow-lg promotion">
                    <div className="d-flex flex-column promo-inner  promo-inactive">
                        <img src={'https://cdn.betnare.com/carousel/chomokananduthi.webp'} className={"rounded promo-image "}/>
                        <h5
                            className="bold d-flex justify-content-center h4 pt-2"
                            style={{color: "#ea5d0b"}}
                        >
                            CHOMOKA NA NDUTHI
                        </h5>
                        <p className="container-profile mx-1 px-2 text-data-promotions">
                            Place a  cash bet of KES 49/= and above on Sportsbook matches...
                        </p>
                        <hr/>

                        <div className="d-flex justify-content-between my-2 mx-2">

                            <button className={"profile-button border-0 h-25 rounded promo-button"}
                            disabled={true}
                                    style={{background: "#ea5d0b"}} onClick={() => {
                                gaEventTracker('promo_nduthika');
                                navigate(`/`);
                                setUtmSouceCampaignOnPromotions('promo_nduthika')
                            }}>Bet now
                            </button>
                            <div
                                className={"d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"}
                                style={{color: "#ea5d0b"}}
                                onClick={() => {
                                    navigate(`/promo?id=${ids[11]}`);
                                    window.scrollTo(0, 0); // Scroll to the top of the page
                                }}
                            >
                                Read More
                            </div>
                        </div>
                    </div>
                </div>
               
              
                <div className="col-md-2 promo-styling shadow-lg promotion">
                    <div className="d-flex flex-column promo-inner promo-inactive">
                        <img src={mia_sita_ham_sini} className={"rounded promo-image "}/>
                        <h5
                            className="bold d-flex justify-content-center h4 pt-2"
                            style={{color: "#ea5d0b"}}
                        >
                            650 FOR 650 PROMOTION TERMS AND CONDITIONS
                        </h5>
                        <p className="container-profile mx-1 px-2 text-data-promotions">
                            Deposit 650 and Get 650 free bonus for your first and second deposit of the day
                        </p>
                        <hr/>

                        <div className="d-flex justify-content-between my-2 mx-2">

                            <button className={"profile-button border-0 h-25 rounded promo-button"}
                                    disabled={true}
                                    style={{background: "#ea5d0b"}} onClick={() => {
                                gaEventTracker('proo Mia Sita Hamsini');
                                navigate(`/deposit`);
                                setUtmSouceCampaignOnPromotions('mia-sita-hamusini')
                            }}>Deposit now
                            </button>
                            <div
                                className={"d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"}
                                style={{color: "#ea5d0b"}}
                                onClick={() => {
                                    navigate(`/promo?id=${ids[9]}`);
                                    window.scrollTo(0, 0); // Scroll to the top of the page
                                }}
                            >
                                Read More
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-2 promo-styling card shadow-lg promotion">
                    <div className="d-flex flex-column  promo-inner promo-inactive">
                        <div className="d-flex flex-column">
                            <img src={DepositBonus} className={"rounded promo-image"}/>
                            <h5
                                className="bold d-flex justify-content-center h4 pt-2"
                                style={{color: "#ea5d0b"}}
                            >
                                {" "}
                                365 DEPOSIT BONUS
                            </h5>
                            <div className="container-profile mx-1 px-2 text-data-promotions">
                                Get 365/= Free When you deposit 365/=
                            </div>
                            <hr/>
                            <div className="d-flex justify-content-between my-2 mx-2">
                                <button disabled={true}  className={"profile-button border-0 h-25 rounded promo-button"}
                                        style={{background: "#ea5d0b"}} onClick={() => {
                                    navigate(`/deposit`);
                                    gaEventTracker('365 Depoist Bonus');
                                    setUtmSouceCampaignOnPromotions('promo_365_deposit_bonus')
                                    setUtmSouceCampaignOnPromotions('promo_365_deposit_bonus')
                                }}>
                                    Deposit Now
                                </button>

                                <div
                                    className={"  d-flex align-self-center h-25 border-0 bg-transparent cursor-pointer"}
                                    style={{color: "#ea5d0b"}}
                                    onClick={() => {
                                        navigate(`/promo?id=${ids[8]}`);
                                        window.scrollTo(0, 0); // Scroll to the top of the page
                                    }}
                                >
                                    Read More
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-2 promo-styling card shadow-lg promotion">
                    <div className="d-flex flex-column promo-inner promo-inactive">
                        <img src={firstDeposit} className={"rounded promo-image"}/>
                        <h5
                            className="bold d-flex justify-content-center h4 pt-2 pb-1"
                            style={{color: "#ea5d0b", whiteSpace: "nowrap"}}
                        >
                            FIRST DEPOSIT BOOSTER
                        </h5>
                        <div className="container-profile mx-1  mb-2 px-2 text-data-promotions">
                            Get 1500% BONUS on the FIRST ever deposit as Free Stake Booster now...
                        </div>
                        <hr/>
                        <div className="d-flex justify-content-between my-2 mx-2">
                            <button disabled={true} className={"profile-button border-0 h-25 rounded promo-button"}
                                    style={{background: "#ea5d0b"}} onClick={() => {
                                navigate(`/deposit`);
                                gaEventTracker('promo  FIRST DEPOSIT BOOSTER');
                                setUtmSouceCampaignOnPromotions('promo_FIRST_DEPOSIT_BOOSTER')
                            }}>Deposit
                            </button>
                            <div
                                className={"d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"}
                                style={{color: "#ea5d0b"}}
                                onClick={() => navigate(`/promo?id=${ids[1]}`)}

                            >
                                Read More
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-2 promo-styling card shadow-lg promotion" style={{opacity: '0.4'}}>
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

                        <div className="container-profile mx-1 px-2 text-data-promotions">
                            Get 20% daily deposit Boost on your 1st deposit of the day...
                        </div>
                        <hr/>
                        <div className="d-flex justify-content-between my-2 mx-2">
                            <button disabled={true} className={"profile-button border-0 h-25 rounded promo-button"}
                                    style={{background: "#ea5d0b"}} onClick={() => {
                                navigate(`/deposit`);
                                gaEventTracker('promo 20% deposit Boost');
                                setUtmSouceCampaignOnPromotions('promo_20_deposit_Boost')
                            }}>Deposit
                            </button>

                            <div
                                className={"d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"}
                                style={{color: "#ea5d0b"}}
                                onClick={() => navigate(`/promo?id=${ids[2]}`)}
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
                            <span className="container-profile mx-1 px-2 text-data-promotions">
                Monday promotion. BetNare Ngware, anzisha Wiki na Thao.
              </span>
                            <hr/>
                            <div className="d-flex justify-content-between my-2 mx-2">
                                <button className={"profile-button border-0 h-25 rounded promo-button"}
                                        style={{background: "#ea5d0b"}}>Bet Now
                                </button>
                                <div
                                    className={"d-flex  align-self-center h-25 border-0 bg-transparent cursor-pointer"}
                                    style={{color: "#ea5d0b"}}
                                    onClick={() => navigate(`/promo?id=${ids[4]}`)}
                                >

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
                            <span className="container-profile mx-1">
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
                            <div className="col-md-12 container-profile mx-1">
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
                                    className={"d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"}
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
                            <div className="col-md-12 container-profile mx-1">
                                ✅ The Angukia rent draw will be conducted on Monday 31st
                                October.
                                <br/>
                                <div className="d-flex justify-content-end my-2 mx-2">
                                    {/* <button className={"profile-button border-0 h-25 rounded"} style={{background:"#ea5d0b"}}>Bet Now</button>      */}
                                    <Link
                                        className={"d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"}
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