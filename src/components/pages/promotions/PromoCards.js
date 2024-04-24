import React, { useEffect, useRef, useState } from "react";
import twentyPercentDepositBonus from "../../../assets/img/banner/products/Bet_Nare_gift_Mobile.webp";
import firstDeposit from "../../../assets/img/banner/products/Firstdeposit.jpeg";
import multibetCashback from "../../../assets/img/banner/products/Bet_Nare_100_Cashback_Mobile.webp";
import DepositBonus from "../../../assets/img/banner/products/365.webp";
import mia_sita_ham_sini from "../../../assets/img/banner/products/FreeKickBonanzaWeb.webp";

import { Link, useNavigate } from "react-router-dom";
import "./promo.css";
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";
import {
  getFromLocalStorage,
  setLocalStorage,
} from "../../utils/local-storage";
import Notify from "../../utils/Notify";
import { setState } from "../../../redux/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { virtualGameChoiceOptions } from "../../matches";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";

const PromoCards = () => {
  const gaEventTracker = useAnalyticsEventTracker("Promotions");
  const user = getFromLocalStorage("user");
  const dispatchRedux = useDispatch();
  const bottomSheetRef = useRef();
  const bottom_sheet = useSelector((state) => state.data.promo_bottom_sheet);
  // const games = virtualGameChoiceOptions('morning_glory');
  const [games, setGames] = useState([]);


  let ids = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29,30, 31, 32,33,34,35,36,37
  ];
  const navigate = useNavigate();

  let message = {
    status: 401,
    message: "This Promotion is for new Users",
    token: "",
  };

  const checkIfUser = () => {
    if (user) {
      Notify(message);
    } else {
      navigate("/signup");
    }
  };

  const showBottomSheet = (data) => {
    const options = virtualGameChoiceOptions(data);
    setGames(options);
    dispatchRedux(setState("promo_bottom_sheet", true));
  };
  const collapseBottomSheet = () => {
    dispatchRedux(setState("promo_bottom_sheet", false));
  };

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (
        bottomSheetRef.current &&
        !bottomSheetRef.current.contains(event.target)
      ) {
        dispatchRedux(setState("promo_bottom_sheet", false));
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    // document.addEventListener("click", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [bottomSheetRef, bottom_sheet]);

  const setUtmSouceCampaignOnPromotions = (event) => {
    setLocalStorage("utm_source", event);
  };

  return (
    <div className="col px-4 d-flex align-items-start align-self-start justify-content-start">
      <div
        className={`row text-white pt-2 border-0 d-flex promo-container-profile d-flex align-self-start align-items-start"`}
      >
         <div className="col-md-2 promo-styling shadow-lg promotion">
          <div className="d-flex flex-column promo-inner">
            <img
              src={"https://cdn.betnare.com/carousel/Pambazuka.webp"}
              className={"rounded promo-image "}
            />
            <h5
              className="bold d-flex justify-content-center h4 pt-2"
              style={{ color: "#ea5d0b" }}
            >
              PAMBAZUKA NA JOGOO!
            </h5>
            <p className="container-profile mx-1 px-2 text-data-promotions">
            Deposit 100 shillings and place a bet of 100 bob or more on all the games on Betnare Platform between 6:00 AM and 10:00 AM and win jogoo(2000)...           </p>
            <hr />

            <div className="d-flex justify-content-between my-2 mx-2">
              <button
                className={"profile-button border-0 h-25 rounded promo-button"}
                style={{ background: "#ea5d0b" }}
                onClick={() => {
                  gaEventTracker("pambazuka_na_jogoo");
                  navigate(`/`);
                  setUtmSouceCampaignOnPromotions("pambazuka_na_jogoo");
                }}
              >
                Bet Now!
              </button>
              <div
                className={
                  "d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"
                }
                style={{ color: "#ea5d0b" }}
                onClick={() => {
                  navigate(`/promo?id=${ids[35]}`);
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
            <img
              src={"https://cdn.betnare.com/carousel/DepositBonus.webp"}
              className={"rounded promo-image "}
            />
            <h5
              className="bold d-flex justify-content-center h4 pt-2"
              style={{ color: "#ea5d0b" }}
            >
              FREE DEPOSIT OF ALL DEPOSITS!
            </h5>
            <p className="container-profile mx-1 px-2 text-data-promotions">
              All new and existing customers get to enjoy a free deposit bonus
              on your all your deposit from 20bob and above!{" "}
            </p>
            <hr />

            <div className="d-flex justify-content-between my-2 mx-2">
              <button
                className={"profile-button border-0 h-25 rounded promo-button"}
                style={{ background: "#ea5d0b" }}
                onClick={() => {
                  gaEventTracker("ushago_na_mbao");
                  navigate(`/deposit`);
                  setUtmSouceCampaignOnPromotions("free_deposit_bonus");
                }}
              >
                Deposit
              </button>
              <div
                className={
                  "d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"
                }
                style={{ color: "#ea5d0b" }}
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
            <img
              src={"https://cdn.betnare.com/carousel/30kStakeBoosterWeb.webp"}
              className={"rounded promo-image "}
            />
            <h5
              className="bold d-flex justify-content-center h4 pt-2"
              style={{ color: "#ea5d0b" }}
            >
              KARIBU STAKE BOOSTER BONUS
            </h5>
            <p className="container-profile mx-1 px-2 text-data-promotions">
              Get Up to 30,000/= FREE Bet Booster once you register as a Free
              Stake Booster...
            </p>
            <hr />

            <div className="d-flex justify-content-between my-2 mx-2">
              <button
                className={"profile-button border-0 h-25 rounded promo-button"}
                style={{ background: "#ea5d0b" }}
                onClick={() => {
                  checkIfUser();
                  gaEventTracker("promo Stake Booster");
                  setUtmSouceCampaignOnPromotions("promo_Gift_Wallet");
                }}
              >
                Sign Up
              </button>
              <div
                className={
                  "d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"
                }
                style={{ color: "#ea5d0b" }}
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
              <img src={multibetCashback} className={"rounded promo-image"} />
              <h5
                className="bold d-flex justify-content-center h4 pt-2"
                style={{ color: "#ea5d0b" }}
              >
                {" "}
                100% MULTIBET LOST BONUS
              </h5>
              <div className="container-profile mx-1 px-2 text-data-promotions">
                Place a pre-match Multibet of 5 or MORE selections...
              </div>
              <hr />
              <div className="d-flex justify-content-between my-2 mx-2">
                <button
                  className={
                    "profile-button border-0 h-25 rounded promo-button"
                  }
                  style={{ background: "#ea5d0b" }}
                  onClick={() => {
                    navigate(`/`);
                    gaEventTracker("promo 100% MULTIBET LOST BONUS");
                    setUtmSouceCampaignOnPromotions(
                      "promo_100_MULTIBET_LOST_BONUS"
                    );
                    setUtmSouceCampaignOnPromotions(
                      "promo_100_MULTIBET_LOST_BONUS"
                    );
                  }}
                >
                  Bet Now
                </button>

                <div
                  className={
                    "  d-flex align-self-center h-25 border-0 bg-transparent cursor-pointer"
                  }
                  style={{ color: "#ea5d0b" }}
                  onClick={() => {
                    navigate(`/promo?id=${ids[3]}`);
                    window.scrollTo(0, 0); // Scroll to the top of the page
                  }}
                >
                  Read More
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-2 promo-styling shadow-lg promotion">
          <div className="d-flex flex-column promo-inner promo-inactive">
            <img
              src={"https://cdn.betnare.com/carousel/Mzinga.webp"}
              className={"rounded promo-image "}
            />
            <h5
              className="bold d-flex justify-content-center h4 pt-2"
              style={{ color: "#ea5d0b" }}
            >
              MZINGA YA MBOGI!
            </h5>
            <p className="container-profile mx-1 px-2 text-data-promotions">
            Mzinga worth 5,000 Kenyan Shillings (KES) if their betslip is shared with at least 5 friends.   </p>
            <hr />

            <div className="d-flex justify-content-between my-2 mx-2">
              <button
                className={"profile-button border-0 h-25 rounded promo-button"}
                style={{ background: "#ea5d0b" }}
                disabled={true}
                onClick={() => {
                  gaEventTracker("mzinga_ya_mbogi");
                  navigate(`/`);
                  setUtmSouceCampaignOnPromotions("mzinga_ya_mbogi");
                }}
              >
                Bet Now!
              </button>
              <div
                className={
                  "d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"
                }
                style={{ color: "#ea5d0b" }}
                onClick={() => {
                  navigate(`/promo?id=${ids[30]}`);
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
            <img
              src={"https://cdn.betnare.com/carousel/RaukaBonusWeb.webp"}
              className={"rounded promo-image "}
            />
            <h5
              className="bold d-flex justify-content-center h4 pt-2"
              style={{ color: "#ea5d0b" }}
            >
              RAUKA BONUS!
            </h5>
            <p className="container-profile mx-1 px-2 text-data-promotions">
            Deposit of at least 100 Kenyan Shillings (KES) into their Betnare account between 6:00 AM and 9:00 AM ...   </p>
            <hr />

            <div className="d-flex justify-content-between my-2 mx-2">
              <button
                className={"profile-button border-0 h-25 rounded promo-button"}
                style={{ background: "#ea5d0b" }}
                disabled={true}
                onClick={() => {
                  gaEventTracker("rauka_bonus");
                  navigate(`/deposit`);
                  setUtmSouceCampaignOnPromotions("rauka_bonus");
                }}
              >
                Bet Now!
              </button>
              <div
                className={
                  "d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"
                }
                style={{ color: "#ea5d0b" }}
                onClick={() => {
                  navigate(`/promo?id=${ids[31]}`);
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
            <img
              src={"https://cdn.betnare.com/carousel/PullOutWebNew.webp"}
              className={"rounded promo-image "}
            />
            <h5
              className="bold d-flex justify-content-center h4 pt-2"
              style={{ color: "#ea5d0b" }}
            >
              PULL-OUT KICHAMPE!
            </h5>
            <p className="container-profile mx-1 px-2 text-data-promotions">
            Stake a minimum of 20 Kenyan Shillings (KES) on both the JETX and Aviator games during the Promotion Period..   </p>
            <hr />

            <div className="d-flex justify-content-between my-2 mx-2">
              <button
                className={"profile-button border-0 h-25 rounded promo-button"}
                style={{ background: "#ea5d0b" }}
                disabled={true}
                onClick={() => {
                  gaEventTracker("pull_out_kichampe");
                  // navigate(`/deposit`);
                  showBottomSheet('pull_out');
                  setUtmSouceCampaignOnPromotions("pull_out_kichampe");
                }}
              >
                Play Games!
              </button>
              <div
                className={
                  "d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"
                }
                style={{ color: "#ea5d0b" }}
                
                onClick={() => {
                  navigate(`/promo?id=${ids[32]}`);
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
            <img
              src={"https://cdn.betnare.com/carousel/DondokaWeb.jpeg"}
              className={"rounded promo-image "}
            />
            <h5
              className="bold d-flex justify-content-center h4 pt-2"
              style={{ color: "#ea5d0b" }}
            >
              DONDOKA NA FREE BETS!
            </h5>
            <p className="container-profile mx-1 px-2 text-data-promotions">
            Win up to 1000 free bets every hour between 6:00 AM to 6:00 PM awards random it could be you ...
               </p>
            <hr />

            <div className="d-flex justify-content-between my-2 mx-2">
              <button
                className={"profile-button border-0 h-25 rounded promo-button"}
                style={{ background: "#ea5d0b" }}
                disabled={true}
                onClick={() => {
                  gaEventTracker("dondoka_free_bets");
                  navigate(`/nare-games/aviator?status=live`);
                  setUtmSouceCampaignOnPromotions("dondoka_free_bets");
                }}
              >
                Play Aviator!
              </button>
              <div
                className={
                  "d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"
                }
                style={{ color: "#ea5d0b" }}
                onClick={() => {
                  navigate(`/promo?id=${ids[33]}`);
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
            <img
              src={"https://cdn.betnare.com/carousel/MidnightRainsWeb.webp"}
              className={"rounded promo-image "}
            />
            <h5
              className="bold d-flex justify-content-center h4 pt-2"
              style={{ color: "#ea5d0b" }}
            >
              MIDNIGHT RAINS!
            </h5>
            <p className="container-profile mx-1 px-2 text-data-promotions">
            Engage in betting activities on Betnare during the Promotion Period and win free bets ...
               </p>
            <hr />

            <div className="d-flex justify-content-between my-2 mx-2">
              <button
                className={"profile-button border-0 h-25 rounded promo-button"}
                style={{ background: "#ea5d0b" }}
                disabled={true}
                onClick={() => {
                  gaEventTracker("midnight_rains");
                  navigate(`/nare-games/aviator?status=live`);
                  setUtmSouceCampaignOnPromotions("midnight_rains");
                }}
              >
                Play Aviator!
              </button>
              <div
                className={
                  "d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"
                }
                style={{ color: "#ea5d0b" }}
                onClick={() => {
                  navigate(`/promo?id=${ids[34]}`);
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
            <img
              src={"https://cdn.betnare.com/carousel/Rasha.webp"}
              className={"rounded promo-image "}
            />
            <h5
              className="bold d-flex justify-content-center h4 pt-2"
              style={{ color: "#ea5d0b" }}
            >
              RASHA RASHA ZA AVIATOR!
            </h5>
            <p className="container-profile mx-1 px-2 text-data-promotions">
              Play with a minimum of KES 20 between 12:00 AM and 6:00 AM and receive kenyan shillings 500 airtime...{" "}
            </p>
            <hr />

            <div className="d-flex justify-content-between my-2 mx-2">
              <button
                className={"profile-button border-0 h-25 rounded promo-button"}
                style={{ background: "#ea5d0b" }}
                disabled={true}
                onClick={() => {
                  gaEventTracker("rasha_rasha_za_aviator");
                  navigate(`/nare-games/aviator?status=live`);
                  setUtmSouceCampaignOnPromotions("rasha_rasha_za_aviator");
                }}
              >
                Play Aviator!
              </button>
              <div
                className={
                  "d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"
                }
                style={{ color: "#ea5d0b" }}
                onClick={() => {
                  navigate(`/promo?id=${ids[27]}`);
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
            <img
              src={"https://cdn.betnare.com/carousel/Morningglory.webp"}
              className={"rounded promo-image "}
            />
            <h5
              className="bold d-flex justify-content-center h4 pt-2"
              style={{ color: "#ea5d0b" }}
            >
              MORNING GLORY
            </h5>
            <p className="container-profile mx-1 px-2 text-data-promotions">
              Play with a minimum of KES 100  between 6:00 AM and 9:00 AM and stand a chance to
              be awarded cash worth 1000 Kenyan shillings...{" "}
            </p>
            <hr />

            <div className="d-flex justify-content-between my-2 mx-2">
              <button
                className={"profile-button border-0 h-25 rounded promo-button"}
                style={{ background: "#ea5d0b" }}
                disabled={true}
                onClick={() => {
                  gaEventTracker("morning_glory");
                  // navigate(`/nare-games/aviator?status=live`);
                  showBottomSheet('morning_glory');
                  setUtmSouceCampaignOnPromotions("morning_glory");
                }}
              >
                Play Games!
              </button>
              <div
                className={
                  "d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"
                }
                style={{ color: "#ea5d0b" }}
                onClick={() => {
                  navigate(`/promo?id=${ids[28]}`);
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
            <img
              src={"https://cdn.betnare.com/carousel/Mbuziyambogi.webp"}
              className={"rounded promo-image "}
            />
            <h5
              className="bold d-flex justify-content-center h4 pt-2"
              style={{ color: "#ea5d0b" }}
            >
              MBUZI YA MBOGI!
            </h5>
            <p className="container-profile mx-1 px-2 text-data-promotions">
            Place a bet on sportsbook with a minimum stake of 50 bob share with 5 friends and stand a chance to win a live goat(mbuzi ya mbogi) !{" "}
            </p>
            <hr />

            <div className="d-flex justify-content-between my-2 mx-2">
              <button
                className={"profile-button border-0 h-25 rounded promo-button"}
                style={{ background: "#ea5d0b" }}
                disabled={true}
                onClick={() => {
                  gaEventTracker("mbuzi_ya_mbogi");
                  navigate(`/`);
                  setUtmSouceCampaignOnPromotions("mbuzi_ya_mbogi");
                }}
              >
                Bet Now!
              </button>
              <div
                className={
                  "d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"
                }
                style={{ color: "#ea5d0b" }}
                onClick={() => {
                  navigate(`/promo?id=${ids[29]}`);
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
            <img
              src={"https://cdn.betnare.com/carousel/GoldRush.webp"}
              className={"rounded promo-image "}
            />
            <h5
              className="bold d-flex justify-content-center h4 pt-2"
              style={{ color: "#ea5d0b" }}
            >
              RUSH HOUR RAINS
            </h5>
            <p className="container-profile mx-1 px-2 text-data-promotions">
              During the Rush Hour Rains campaign ("the Campaign"), the
              multiplier for winnings is set at 1.5X the regular payout.
            </p>
            <hr />

            <div className="d-flex justify-content-between my-2 mx-2">
              <button
                className={"profile-button border-0 h-25 rounded promo-button"}
                style={{ background: "#ea5d0b" }}
                disabled={true}
                onClick={() => {
                  gaEventTracker("rush_hour_rains2");
                  navigate(`/nare-games/aviator?status=live`);
                  setUtmSouceCampaignOnPromotions("rush_hour_rains2");
                }}
              >
                Play Aviator!
              </button>
              <div
                className={
                  "d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"
                }
                style={{ color: "#ea5d0b" }}
                onClick={() => {
                  navigate(`/promo?id=${ids[26]}`);
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
            <img
              src={"https://cdn.betnare.com/carousel/PunchyaSare.webp"}
              className={"rounded promo-image "}
            />
            <h5
              className="bold d-flex justify-content-center h4 pt-2"
              style={{ color: "#ea5d0b" }}
            >
              PUNCH YA SARE
            </h5>
            <p className="container-profile mx-1 px-2 text-data-promotions">
              Prizes will be awarded based on the highest multipliers achieved
              by the players within the specified time frame.
            </p>
            <hr />

            <div className="d-flex justify-content-between my-2 mx-2">
              <button
                className={"profile-button border-0 h-25 rounded promo-button"}
                style={{ background: "#ea5d0b" }}
                disabled={true}
                onClick={() => {
                  gaEventTracker("punch_ya_sare");
                  navigate(`/nare-games/aviator?status=live`);
                  setUtmSouceCampaignOnPromotions("punch_ya_sare");
                }}
              >
                Play Aviator!
              </button>
              <div
                className={
                  "d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"
                }
                style={{ color: "#ea5d0b" }}
                onClick={() => {
                  navigate(`/promo?id=${ids[25]}`);
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
            <img
              src={"https://cdn.betnare.com/carousel/Kienyeji.webp"}
              className={"rounded promo-image "}
            />
            <h5
              className="bold d-flex justify-content-center h4 pt-2"
              style={{ color: "#ea5d0b" }}
            >
              KIENYEJI PROMAX
            </h5>
            <p className="container-profile mx-1 px-2 text-data-promotions">
              To qualify for the Campaign, players must place a bet of 99 bob or
              more on any of the following games: Aviator, JetX, Nare League,
              and Casino games.
            </p>
            <hr />

            <div className="d-flex justify-content-between my-2 mx-2">
              <button
                className={"profile-button border-0 h-25 rounded promo-button"}
                style={{ background: "#ea5d0b" }}
                disabled={true}
                onClick={() => {
                  gaEventTracker("kienyeji_promax");
                  navigate(`/`);
                  setUtmSouceCampaignOnPromotions("kienyeji_promax");
                }}
              >
                Play Games!
              </button>
              <div
                className={
                  "d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"
                }
                style={{ color: "#ea5d0b" }}
                onClick={() => {
                  navigate(`/promo?id=${ids[24]}`);
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
            <img
              src={"https://cdn.betnare.com/carousel/Spin&WIn.webp"}
              className={"rounded promo-image "}
            />
            <h5
              className="bold d-flex justify-content-center h4 pt-2"
              style={{ color: "#ea5d0b" }}
            >
              SPIN & WIN INSTANT PRIZES WITH JETX!
            </h5>
            <p className="container-profile mx-1 px-2 text-data-promotions">
              Participating Games are Jetx, Balloon, PlinkoX, Multihot5,
              FootballX, CricketX, GeniesBonanza, SlicerX, JokerBuyBonus,
              Cappadocia...{" "}
            </p>
            <hr />

            <div className="d-flex justify-content-between my-2 mx-2">
              <button
                className={"profile-button border-0 h-25 rounded promo-button"}
                style={{ background: "#ea5d0b" }}
                disabled={true}
                onClick={() => {
                  gaEventTracker("spin_n_win");
                  navigate(`/smart-play?game=JetX&category=JetX&status=live`);
                  setUtmSouceCampaignOnPromotions("spin_n_win");
                }}
              >
                Play Jetx!
              </button>
              <div
                className={
                  "d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"
                }
                style={{ color: "#ea5d0b" }}
                onClick={() => {
                  navigate(`/promo?id=${ids[21]}`);
                  window.scrollTo(0, 0); // Scroll to the top of the page
                }}
              >
                Read More
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-2 promo-styling shadow-lg promotion">
          <div className="d-flex flex-column promo-inner promo-inactive ">
            <img
              src={"https://cdn.betnare.com/carousel/ShikishanaAviatorWeb.webp"}
              className={"rounded promo-image "}
            />
            <h5
              className="bold d-flex justify-content-center h4 pt-2"
              style={{ color: "#ea5d0b" }}
            >
              SHIKISHA NA AVIATOR
            </h5>
            <p className="container-profile mx-1 px-2 text-data-promotions">
              The Promotion applies to cash bets placed on Betnare’s “Aviator”
              game...
            </p>
            <hr />

            <div className="d-flex justify-content-between my-2 mx-2">
              <button
                className={"profile-button border-0 h-25 rounded promo-button"}
                style={{ background: "#ea5d0b" }}
                disabled={true}
                onClick={() => {
                  gaEventTracker("shikisha_na_aviator");
                  navigate(`/nare-games/aviator?status=live`);
                  setUtmSouceCampaignOnPromotions("shikisha_na_aviator");
                }}
              >
                Play Aviator!
              </button>
              <div
                className={
                  "d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"
                }
                style={{ color: "#ea5d0b" }}
                onClick={() => {
                  navigate(`/promo?id=${ids[22]}`);
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
            <img
              src={"https://cdn.betnare.com/carousel/TheBigLeagueWeb.webp"}
              className={"rounded promo-image "}
            />
            <h5
              className="bold d-flex justify-content-center h4 pt-2"
              style={{ color: "#ea5d0b" }}
            >
              THE BIG LEAGUE
            </h5>
            <p className="container-profile mx-1 px-2 text-data-promotions">
              Participants have the chance to win up to 49,000 Kenya Shillings
              daily if they play 3 games ...
            </p>
            <hr />

            <div className="d-flex justify-content-between my-2 mx-2">
              <button
                className={"profile-button border-0 h-25 rounded promo-button"}
                style={{ background: "#ea5d0b" }}
                onClick={() => {
                  gaEventTracker("big_league");
                  navigate(`/nare-league`);
                  setUtmSouceCampaignOnPromotions("big_league");
                }}
              >
                Play NareLeague!
              </button>
              <div
                className={
                  "d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"
                }
                style={{ color: "#ea5d0b" }}
                disabled={true}
                onClick={() => {
                  navigate(`/promo?id=${ids[23]}`);
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
            <img
              src={"https://cdn.betnare.com/carousel/LuckyHourv2.webp"}
              className={"rounded promo-image "}
            />
            <h5
              className="bold d-flex justify-content-center h4 pt-2"
              style={{ color: "#ea5d0b" }}
            >
              Lucky Hour Bonus!
            </h5>
            <p className="container-profile mx-1 px-2 text-data-promotions">
              The Lucky Hour Bonus applies to new and existing customers who
              Deposit and place a bet{" "}
            </p>
            <hr />

            <div className="d-flex justify-content-between my-2 mx-2">
              <button
                className={"profile-button border-0 h-25 rounded promo-button"}
                style={{ background: "#ea5d0b" }}
                deactivate={true}
                onClick={() => {
                  gaEventTracker("lucky_hour_2");
                  navigate(`/deposit`);
                  setUtmSouceCampaignOnPromotions("lucky_hour_2");
                }}
              >
                Deposit
              </button>
              <div
                className={
                  "d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"
                }
                style={{ color: "#ea5d0b" }}
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
          <div className="d-flex flex-column promo-inner promo-inactive">
            <img
              src={"https://cdn.betnare.com/carousel/Mshipi.webp"}
              className={"rounded promo-image "}
            />
            <h5
              className="bold d-flex justify-content-center h4 pt-2"
              style={{ color: "#ea5d0b" }}
            >
              NIPOA KUFUNGA MSHIPI!
            </h5>
            <p className="container-profile mx-1 px-2 text-data-promotions">
              Participants have the chance to win up to 50,000 Kenyan Shillings
              daily if their multi-bet of 5 games is successful.{" "}
            </p>
            <hr />

            <div className="d-flex justify-content-between my-2 mx-2">
              <button
                className={"profile-button border-0 h-25 rounded promo-button"}
                style={{ background: "#ea5d0b" }}
                disabled={true}
                onClick={() => {
                  gaEventTracker("mshipi");
                  navigate(`/`);
                  setUtmSouceCampaignOnPromotions("mshipi");
                }}
              >
                Play Now!
              </button>
              <div
                className={
                  "d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"
                }
                style={{ color: "#ea5d0b" }}
                onClick={() => {
                  navigate(`/promo?id=${ids[20]}`);
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
            <img
              src={"https://cdn.betnare.com/carousel/ClimaxWeb.webp"}
              className={"rounded promo-image "}
            />
            <h5
              className="bold d-flex justify-content-center h4 pt-2"
              style={{ color: "#ea5d0b" }}
            >
              Climax Na Aviator!
            </h5>
            <p className="container-profile mx-1 px-2 text-data-promotions">
              The aim of this promotion is to get the highest odds from winners.
              Those with the highest in-game multiplier(s) to be awarded ...
            </p>
            <hr />

            <div className="d-flex justify-content-between my-2 mx-2">
              <button
                className={"profile-button border-0 h-25 rounded promo-button"}
                style={{ background: "#ea5d0b" }}
                disabled={true}
                onClick={() => {
                  gaEventTracker("lclimax_ na_aviator");
                  navigate(`/nare-games/aviator?status=live`);
                  setUtmSouceCampaignOnPromotions("climax_na_aviator");
                }}
              >
                Play Aviator
              </button>
              <div
                className={
                  "d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"
                }
                style={{ color: "#ea5d0b" }}
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
          <div className="d-flex flex-column promo-inner promo-inactive">
            <img
              src={"https://cdn.betnare.com/carousel/AfconPromoBanner.webp"}
              className={"rounded promo-image "}
            />
            <h5
              className="bold d-flex justify-content-center h4 pt-2"
              style={{ color: "#ea5d0b" }}
            >
              MAMILLI YA NJAANUARY NA AFCON
            </h5>
            <p className="container-profile mx-1 px-2 text-data-promotions">
              Customers will be required to place a cash bet on sports book
              (single or multibet) using a stake of 99/= or more
            </p>
            <hr />

            <div className="d-flex justify-content-between my-2 mx-2">
              <button
                className={"profile-button border-0 h-25 rounded promo-button"}
                style={{ background: "#ea5d0b" }}
                disabled={true}
                onClick={() => {
                  gaEventTracker("mamili_afcon");
                  navigate(
                    `/competition/79/8085/21843?sport_id=79&sub_type_id=1`
                  );
                  setUtmSouceCampaignOnPromotions("mamili_afcon");
                }}
              >
                Place Bets
              </button>
              <div
                className={
                  "d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"
                }
                style={{ color: "#ea5d0b" }}
                onClick={() => {
                  navigate(`/promo?id=${ids[14]}`);
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
            <img
              src={"https://cdn.betnare.com/carousel/LastPromoFeb.webp"}
              className={"rounded promo-image "}
            />
            <h5
              className="bold d-flex justify-content-center h4 pt-2"
              style={{ color: "#ea5d0b" }}
            >
              HOW LONG CAN YOU LAST
            </h5>
            <p className="container-profile mx-1 px-2 text-data-promotions">
              This promotion shall run daily for seven days from 08 February to
              15th February 2024 any extension ...
            </p>
            <hr />

            <div className="d-flex justify-content-between my-2 mx-2">
              <button
                className={"profile-button border-0 h-25 rounded promo-button"}
                disabled={true}
                style={{ background: "#ea5d0b" }}
                onClick={() => {
                  gaEventTracker("how_long_can_you_last");
                  navigate(`/nare-games/aviator?status=live`);
                  setUtmSouceCampaignOnPromotions("how_long_can_you_last");
                }}
              >
                Play Aviator!
              </button>
              <div
                className={
                  "d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"
                }
                style={{ color: "#ea5d0b" }}
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
            <img
              src={"https://cdn.betnare.com/carousel/14DaysofloveWeb.webp"}
              className={"rounded promo-image "}
            />
            <h5
              className="bold d-flex justify-content-center h4 pt-2"
              style={{ color: "#ea5d0b" }}
            >
              FOURTEEN DAYS OF LOVE NA BETNARE PROMOTION.
            </h5>
            <p className="container-profile mx-1 px-2 text-data-promotions">
              The aim is to place a multi bet of 5 games or more, with a stake
              of over Ksh 14 to stand a chance of winning Ksh 100 daily.{" "}
            </p>
            <hr />

            <div className="d-flex justify-content-between my-2 mx-2">
              <button
                className={"profile-button border-0 h-25 rounded promo-button"}
                style={{ background: "#ea5d0b" }}
                disabled={true}
                onClick={() => {
                  gaEventTracker("14_days_of_love");
                  navigate(`/`);
                  setUtmSouceCampaignOnPromotions("14_days_of_love");
                }}
              >
                Play Now!
              </button>
              <div
                className={
                  "d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"
                }
                style={{ color: "#ea5d0b" }}
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
            <img
              src={"https://cdn.betnare.com/carousel/ValentinesnaJETX.webp"}
              className={"rounded promo-image "}
            />
            <h5
              className="bold d-flex justify-content-center h4 pt-2"
              style={{ color: "#ea5d0b" }}
            >
              VALENTINES NA JET-X
            </h5>
            <p className="container-profile mx-1 px-2 text-data-promotions">
              Aim for a spot in the top to grab a share of the Ksh. 100,000 cash
              prizes daily by getting the highest in-game multiplier on Jet X.
            </p>
            <hr />

            <div className="d-flex justify-content-between my-2 mx-2">
              <button
                className={"profile-button border-0 h-25 rounded promo-button"}
                disabled={true}
                style={{ background: "#ea5d0b" }}
                onClick={() => {
                  gaEventTracker("valentine_jetx");
                  navigate(`/smart-play?game=JetX&category=JetX`);
                  setUtmSouceCampaignOnPromotions("valentine_jetx");
                }}
              >
                Play Jetx
              </button>
              <div
                className={
                  "d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"
                }
                style={{ color: "#ea5d0b" }}
                onClick={() => {
                  navigate(`/promo?id=${ids[16]}`);
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
            <img
              src={"https://cdn.betnare.com/carousel/Pepea.webp"}
              className={"rounded promo-image "}
            />
            <h5
              className="bold d-flex justify-content-center h4 pt-2"
              style={{ color: "#ea5d0b" }}
            >
              RUBANI CHALLENGE
            </h5>
            <p className="container-profile mx-1 px-2 text-data-promotions">
              Grab a share of the Ksh. 500,000 cash prizes daily by getting the
              highest in-game multiplier{" "}
            </p>
            <hr />

            <div className="d-flex justify-content-between my-2 mx-2">
              <button
                className={"profile-button border-0 h-25 rounded promo-button"}
                style={{ background: "#ea5d0b" }}
                disabled={true}
                onClick={() => {
                  gaEventTracker("rubani_challenge");
                  navigate(`/nare-games/aviator?status=live`);
                  setUtmSouceCampaignOnPromotions("rubani_challenge");
                }}
              >
                Play Aviator
              </button>
              <div
                className={
                  "d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"
                }
                style={{ color: "#ea5d0b" }}
                onClick={() => {
                  navigate(`/promo?id=${ids[15]}`);
                  window.scrollTo(0, 0); // Scroll to the top of the page
                }}
              >
                Read More
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-2 promo-styling shadow-lg promotion">
          <div className="d-flex flex-column promo-inner  promo-inactive">
            <img
              src={"https://cdn.betnare.com/carousel/chomokananduthi.webp"}
              className={"rounded promo-image "}
            />
            <h5
              className="bold d-flex justify-content-center h4 pt-2"
              style={{ color: "#ea5d0b" }}
            >
              CHOMOKA NA NDUTHI
            </h5>
            <p className="container-profile mx-1 px-2 text-data-promotions">
              Place a cash bet of KES 49/= and above on Sportsbook matches...
            </p>
            <hr />

            <div className="d-flex justify-content-between my-2 mx-2">
              <button
                className={"profile-button border-0 h-25 rounded promo-button"}
                disabled={true}
                style={{ background: "#ea5d0b" }}
                onClick={() => {
                  gaEventTracker("promo_nduthika");
                  navigate(`/`);
                  setUtmSouceCampaignOnPromotions("promo_nduthika");
                }}
              >
                Bet now
              </button>
              <div
                className={
                  "d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"
                }
                style={{ color: "#ea5d0b" }}
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
            <img src={mia_sita_ham_sini} className={"rounded promo-image "} />
            <h5
              className="bold d-flex justify-content-center h4 pt-2"
              style={{ color: "#ea5d0b" }}
            >
              650 FOR 650 PROMOTION TERMS AND CONDITIONS
            </h5>
            <p className="container-profile mx-1 px-2 text-data-promotions">
              Deposit 650 and Get 650 free bonus for your first and second
              deposit of the day
            </p>
            <hr />

            <div className="d-flex justify-content-between my-2 mx-2">
              <button
                className={"profile-button border-0 h-25 rounded promo-button"}
                disabled={true}
                style={{ background: "#ea5d0b" }}
                onClick={() => {
                  gaEventTracker("proo Mia Sita Hamsini");
                  navigate(`/deposit`);
                  setUtmSouceCampaignOnPromotions("mia-sita-hamusini");
                }}
              >
                Deposit now
              </button>
              <div
                className={
                  "d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"
                }
                style={{ color: "#ea5d0b" }}
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
              <img
                src={DepositBonus}
                className={"rounded promo-image"}
                alt="deposit bonus"
              />
              <h5
                className="bold d-flex justify-content-center h4 pt-2"
                style={{ color: "#ea5d0b" }}
              >
                {" "}
                365 DEPOSIT BONUS
              </h5>
              <div className="container-profile mx-1 px-2 text-data-promotions">
                Get 365/= Free When you deposit 365/=
              </div>
              <hr />
              <div className="d-flex justify-content-between my-2 mx-2">
                <button
                  disabled={true}
                  className={
                    "profile-button border-0 h-25 rounded promo-button"
                  }
                  style={{ background: "#ea5d0b" }}
                  onClick={() => {
                    navigate(`/deposit`);
                    gaEventTracker("365 Depoist Bonus");
                    setUtmSouceCampaignOnPromotions("promo_365_deposit_bonus");
                    setUtmSouceCampaignOnPromotions("promo_365_deposit_bonus");
                  }}
                >
                  Deposit Now
                </button>

                <div
                  className={
                    "  d-flex align-self-center h-25 border-0 bg-transparent cursor-pointer"
                  }
                  style={{ color: "#ea5d0b" }}
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
            <img src={firstDeposit} className={"rounded promo-image"} />
            <h5
              className="bold d-flex justify-content-center h4 pt-2 pb-1"
              style={{ color: "#ea5d0b", whiteSpace: "nowrap" }}
            >
              FIRST DEPOSIT BOOSTER
            </h5>
            <div className="container-profile mx-1  mb-2 px-2 text-data-promotions">
              Get 1500% BONUS on the FIRST ever deposit as Free Stake Booster
              now...
            </div>
            <hr />
            <div className="d-flex justify-content-between my-2 mx-2">
              <button
                disabled={true}
                className={"profile-button border-0 h-25 rounded promo-button"}
                style={{ background: "#ea5d0b" }}
                onClick={() => {
                  navigate(`/deposit`);
                  gaEventTracker("promo  FIRST DEPOSIT BOOSTER");
                  setUtmSouceCampaignOnPromotions(
                    "promo_FIRST_DEPOSIT_BOOSTER"
                  );
                }}
              >
                Deposit
              </button>
              <div
                className={
                  "d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"
                }
                style={{ color: "#ea5d0b" }}
                onClick={() => navigate(`/promo?id=${ids[1]}`)}
              >
                Read More
              </div>
            </div>
          </div>
        </div>

        <div
          className="col-md-2 promo-styling card shadow-lg promotion"
          style={{ opacity: "0.4" }}
        >
          <div className="d-flex flex-column promo-inner">
            <img
              src={twentyPercentDepositBonus}
              className={"rounded promo-image"}
            />
            <h5
              className="bold d-flex justify-content-center h4 pt-2"
              style={{ color: "#ea5d0b" }}
            >
              20% FIRST DAILY DEPOSIT BONUS{" "}
            </h5>

            <div className="container-profile mx-1 px-2 text-data-promotions">
              Get 20% daily deposit Boost on your 1st deposit of the day...
            </div>
            <hr />
            <div className="d-flex justify-content-between my-2 mx-2">
              <button
                disabled={true}
                className={"profile-button border-0 h-25 rounded promo-button"}
                style={{ background: "#ea5d0b" }}
                onClick={() => {
                  navigate(`/deposit`);
                  gaEventTracker("promo 20% deposit Boost");
                  setUtmSouceCampaignOnPromotions("promo_20_deposit_Boost");
                }}
              >
                Deposit
              </button>

              <div
                className={
                  "d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"
                }
                style={{ color: "#ea5d0b" }}
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
                style={{ color: "#ea5d0b" }}
              >
                BETNARE NGWARE
              </h5>
              <hr />
              <span className="container-profile mx-1 px-2 text-data-promotions">
                Monday promotion. BetNare Ngware, anzisha Wiki na Thao.
              </span>
              <hr />
              <div className="d-flex justify-content-between my-2 mx-2">
                <button
                  className={
                    "profile-button border-0 h-25 rounded promo-button"
                  }
                  style={{ background: "#ea5d0b" }}
                >
                  Bet Now
                </button>
                <div
                  className={
                    "d-flex  align-self-center h-25 border-0 bg-transparent cursor-pointer"
                  }
                  style={{ color: "#ea5d0b" }}
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
              <hr />
              <div className="d-flex justify-content-between my-2 mx-2">
                <button
                  className={"profile-button border-0 h-25 rounded"}
                  style={{ background: "#ea5d0b" }}
                >
                  Bet Now
                </button>
                <Link
                  className={
                    "d-flex  align-self-center  h-25 border-0 bg-transparent"
                  }
                  style={{ color: "#ea5d0b" }}
                  to={{ pathname: `/promo`, search: `id=${ids[5]}` }}
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
                style={{ color: "#ea5d0b" }}
              >
                FURAHIA RUSH HOUR KIBETNARE
              </h5>
              <hr />
              <div className="col-md-12 container-profile mx-1">
                ✅ This promotion will run every Friday for the Month Of October
                2022, 3pm to 7pm
                <br />
                ✅Award 3 Lucky winners with Ksh. 3000 each.
                <br />
                ✅Award a winner every two hours from 3pm to 7pm.
                <br />
              </div>
              <div className="d-flex justify-content-between my-2 mx-2">
                <button
                  className={"profile-button border-0 h-25 rounded"}
                  style={{ background: "#ea5d0b" }}
                >
                  Bet Now
                </button>
                <Link
                  className={
                    "d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"
                  }
                  style={{ color: "#ea5d0b" }}
                  to={{ pathname: `/promo`, search: `id=${ids[6]}` }}
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
                style={{ color: "#ea5d0b" }}
              >
                ANGUKIA RENT
              </h5>
              {/*<img src={rent} className={'rounded promo-image'}/>*/}
              <div className="col-md-12 container-profile mx-1">
                ✅ The Angukia rent draw will be conducted on Monday 31st
                October.
                <br />
                <div className="d-flex justify-content-end my-2 mx-2">
                  {/* <button className={"profile-button border-0 h-25 rounded"} style={{background:"#ea5d0b"}}>Bet Now</button>      */}
                  <Link
                    className={
                      "d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"
                    }
                    style={{ color: "#ea5d0b" }}
                    to={{ pathname: `/promo`, search: `id=${ids[7]}` }}
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${bottom_sheet ? "bottom-sheet show " : "d-none"}`}>
        <div className="sheet-overlay"></div>
        <div ref={bottomSheetRef} className="content">
          <div className="header d-flex justify-content-between">
            <div className="drag-icon">
              <span></span>
            </div>
            <FontAwesomeIcon
              icon={faXmark}
              onClick={() => {
                collapseBottomSheet();
              }}
              className={"filter-close-icon"}
            />
          </div>
          <h2 className="text-warning"> Participating Games</h2>
          <div className="body d-flex flex-column gap-4">
            {games.map((game_options, index) => (
              <Link
                key={index}
                to={game_options.url} // Assuming the URL is correctly set for each game option
                className="w-100 markets-default bottom-align "
                onClick={() => {
                  // Add any onClick logic here
                }}
              >
                {game_options.name}
              </Link>
            ))}
          </div>
          <div style={{ position: "relative" }}>
            <Button
              onClick={() => {
                collapseBottomSheet();
              }}
              className={
                "text-light bold color-inherit btn border-0 cancel-filter-markets"
              }
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoCards;
