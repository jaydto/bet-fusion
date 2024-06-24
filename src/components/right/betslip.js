import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import BetslipSubmitForm from "./betslip-submit-form";
import { StoreContext } from "../../context/store";
import {
  addToSlip,
  findPostableSlip,
  getBetslip,
  getJackpotBetslip,
  removeFromJackpotSlip,
  removeFromSlip,
} from "../utils/betslip";
import useWindowDimensions from "../header/Dimensions";
import { getFromLocalStorage, setLocalStorage } from "../utils/local-storage";
import DecodeCode from "./decode";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removePickedData,
  removeSelected,
  setMatchBetslip,
  removeSlipSelection,
  setPickedData,
  setSelected,
  startBetslipValidation,
  stopBetslipValidation,
} from "../../redux/bettingSlice";
import Notify from "../utils/Notify";

const clean_rep = (str) => {
  str = str.replace(/[^A-Za-z0-9\-]/g, "");
  return str.replace(/-+/g, "-");
};

const SlipLink2 = ({ slip }) => {
  const isDisabled = slip?.disable;
  const linkTo =
    slip?.bet_type === "0"
      ? `/match/${slip?.parent_match_id}`
      : `/match/live/${slip?.parent_match_id}`;
  return (
    <Link
      to={isDisabled ? "#" : linkTo}
      style={{ color: "inherit", fontStyle: "inherit" }}
      className={"g url-link"}
    >
      <div className="bet-value">
        <b>
          {
            <span className={"team-info-slip-list text-ellipsis"}>
              <span className={"slip-team text-ellipsis"}>
                {slip.home_team} &nbsp; Vs.&nbsp; {slip.away_team}
              </span>
            </span>
          }
        </b>
      </div>
      <div className={"d-flex w-100 slip-dim-color-selections"}>
        <div className="row d-flex flex-column">
          <div className="bet-value picks-user-slip">
            {" "}
            {slip.odd_type} -
            <span className={"pick-user-match"}>{slip.bet_pick}</span>
            &nbsp;
            <span style={{ color: "var(--red)" }}>
              {Number(slip.bet_type) === 1 ? " Live'" : ""}
            </span>
          </div>
          <div className="bet-value time-slip-value"> {slip?.start_time}</div>
        </div>
        <br />
      </div>
      <div className="row">
        <div className="warn">{slip?.comment} </div>
      </div>
    </Link>
  );
};

const Widget=()=>{
  return  <div className="widgets mt-3 mobile-widget-position" >
  <div>
   { <h4 className="px-4 mb-0 mt-5" style={{ color: "var(--grey)" }}>
      Recommended Picks
    </h4>}

    <div className="sr-widget sr-widget-bets"></div>
  </div>
  
</div>
}

const BetSlip = React.memo((props) => {
  const { jackpot, betslipValidationData, jackpotData, live } = props;
  const [message, setMessage] = useState(null);
  const [qualifiesBonus, setQualifiesBonus] = useState(false);
  const [settings] = useState(getFromLocalStorage("settings"));
  const { height } = useWindowDimensions();
  const dispatchRedux = useDispatch();
  const widgetRef = useRef(null);
  const prevKeysRef = useRef([]);
  // const widgetContainerRef = useRef(null); // Define a ref for the widget container


  // const [similarEventIds, setSimilarEventIds] = useState([]);

  const [, setPopUpHeight] = useState(0);
  const [totalOdds, setTotalOdds] = useState(1);

  const [betslipsData, setBetslipsData] = useState(getBetslip());

  const slip_data = useSelector((state) => state.betting.betslip);
  const slip_has_live_interval = useSelector(
    (state) => state.betting.slip_has_live_interval
  );
  const userData = useSelector((state) => state.auth.user);
  const [user, setUser] = useState(getFromLocalStorage("user"));
  useEffect(() => {
    if (userData) {
      setUser(userData || getFromLocalStorage("user"));
    }
  }, [userData]);

  useEffect(() => {
    setBetslipsData(slip_data || getBetslip());
  }, [slip_data]);

  const totalGames = betslipsData ? Object.keys(betslipsData).length : 0;
  const producer_down = useSelector((state) => state.matchesData.producer_down);
  const live_producer_down = useSelector(
    (state) => state.matchesData.live_producer_down
  );

  useEffect(() => {
    if (slip_data) {
      jackpot && Object.keys(getJackpotBetslip() || {}).length == 0
        ? setBetslipsData(null)
        : setBetslipsData(slip_data);
    }
  }, [slip_data]);

  const validateBetslipwithDbData = useCallback(() => {
    if (betslipValidationData && betslipsData) {
      let clone_slip = { ...betslipsData }; // Create a shallow clone of betslipsData

      Object.entries(betslipValidationData)?.forEach(([key, slipdata]) => {
        let match_id = slipdata.parent_match_id;
        let slip = clone_slip[match_id];
        if (slip) {
          console.log(" odd active values ", slipdata.odd_active);

          if (slipdata.live === 0 && producer_down) {
            slip = {
              ...slip,
              comment: `Betting on this market is ${"suspended"}`,
              disable: true,
            }; // Create a new object with updated properties
          }
          if (slipdata.live === 1 && live_producer_down) {
            slip = {
              ...slip,
              comment: `Betting on this market is ${"suspended"}`,
              disable: true,
            }; // Create a new object with updated properties
          }

          if (slipdata.odd_active === 0) {
            console.log(" slip info here ", slipdata.odd_active);
            slip = {
              ...slip,
              comment: "Option not active for betting",
              disable: true,
            }; // Create a new object with updated properties
          }

          if (
            slipdata.market_active === 0 ||
            (slipdata.market_active !== "Active" &&
              slipdata.market_active !== 1)
          ) {
            slip = {
              ...slip,
              comment: `Betting on this market is ${
                slipdata.market_active === 0
                  ? "suspended"
                  : slipdata.market_active
              }`,
              disable: true,
            }; // Create a new object with updated properties
          } else if (
            [
              "Suspended",
              "Deacticated",
              "Ended",
              "Expired",
              "Abandoned",
              "Finished",
            ].includes(slipdata.event_status)
          ) {
            slip = {
              ...slip,
              comment: `This event is ${slipdata.event_status}`,
              disable: true,
            }; // Create a new object with updated properties
          } else if (slipdata.active !== 1) {
            slip = {
              ...slip,
              comment: "Market not active for betting",
              disable: true,
            }; // Create a new object with updated properties
          } else if (slip.odd_value !== slipdata.odd_value) {
            slip = {
              ...slip,
              prev_odds: slip.odd_value,
              odd_value: slipdata.odd_value,
              comment: "The odds for this event have changed",
              disable: false,
            }; // Create a new object with updated properties
          } else {
            if (slip.disable !== false) {
              slip = { ...slip, comment: null }; // Create a new object with updated properties
            }
            slip = { ...slip, disable: false }; // Create a new object with updated properties
          }
          clone_slip[match_id] = slip;
        }
      });

      const betslip_data = {
        betslip_type: "betslip",
        data: clone_slip,
      };
      setLocalStorage("betslip", clone_slip);
      dispatchRedux(setMatchBetslip(betslip_data));
    }
  }, [betslipValidationData]);

  useEffect(() => {
    validateBetslipwithDbData();
  }, [validateBetslipwithDbData]);

  //betslip update
  const updateBetslip = useCallback(() => {
    if (betslipsData) {
      let odds = Object.values(betslipsData).reduce(
        (previous, { odd_value }) => {
          return previous * odd_value;
        },
        1
      );
      setTotalOdds(odds);
    }
  }, [betslipsData]);

  useEffect(() => {
    updateBetslip();
  }, [updateBetslip]);

  useEffect(() => {
    const betslipData = findPostableSlip();

    if (!slip_has_live_interval) {
      if (betslipData.length > 0) {
        dispatchRedux(
          startBetslipValidation({
            endpoint: "v1/betslip-validation",
            method: "POST",
            interval: 20000,
            data: findPostableSlip(),
          })
        );
      }
    }
    return () => {
      stopBetslipValidation();
    };
  }, [slip_has_live_interval]);

  const navigate = useNavigate();

  const handledRemoveSlip = (match) => {
    let betslip =
      jackpot !== true
        ? removeFromSlip(match.parent_match_id)
        : removeFromJackpotSlip(match.match_id);

    let match_selector = jackpot
      ? match.match_id + "_selected"
      : match.parent_match_id + "_selected";
    let ucn = clean_rep(
      match.match_id + "" + match.sub_type_id + match.bet_pick
    );

    setBetslipsData(betslip);
    const betslip_data = {
      betslip_type: "betslip",
      data: betslip,
    };
    dispatchRedux(setMatchBetslip(betslip_data));

    dispatchRedux(removeSelected(match_selector));

    dispatchRedux(removePickedData(""));

    if (Object.keys(betslip).length === 0) {
      navigate("/");
    }
  };

  const updateBonusStateCallback = useCallback(() => {
    let maxBonusGames = Number(settings?.CrashKaliBonus?.bonusBetLegs);

    let perSlipBonusOdd = settings?.CrashKaliBonus?.minBonusOdd;

    let fixedOdd = settings?.CrashKaliBonus?.fixedOdd === "1";

    let perSlipMaxOdd = settings?.CrashKaliBonus?.maxBonusOdd;

    let bonusBetFixedAmount = settings?.CrashKaliBonus?.bonusBetAmount;

    let message = "";

    let userBonus = Number(user?.bonus || 0);

    if (totalGames < maxBonusGames && maxBonusGames > 1) {
      let remainingGames = Number(maxBonusGames) - Number(totalGames);
      message = `Congratulations, you qualify for bonus. Add ${remainingGames} more game${
        remainingGames > 1 ? "s" : ""
      } to place your bet using bonus.`;
    } else if (totalGames === maxBonusGames && maxBonusGames > 1) {
      message =
        "Congratulations, you are eligible for a bonus bet. Allowed Bonus Bet Amount is KES " +
        bonusBetFixedAmount;
    } else {
      message = "";
    }

    let bonusBetEligible = false;

    let bonusBetSportID = settings?.CrashKaliBonus?.bonusSport;

    if (fixedOdd) {
      bonusBetEligible =
        Object.values(betslipsData || []).filter(
          (slip) =>
            Number(slip.odd_value) < Number(perSlipBonusOdd) ||
            slip.sub_type_id !== "1" ||
            slip.sport_id !== bonusBetSportID ||
            slip.bet_type !== "1"
        ).length < 1 && userBonus > 0;
    } else {
      bonusBetEligible =
        Object.values(betslipsData || []).filter(
          (slip) =>
            Number(slip.odd_value) < Number(perSlipBonusOdd) ||
            Number(slip.odd_value) > Number(perSlipMaxOdd) ||
            slip.sub_type_id !== "1" ||
            slip.sport_id !== bonusBetSportID ||
            slip.bet_type !== "1"
        ).length < 1 && userBonus > 0;
    }

    if (!bonusBetEligible && maxBonusGames > 1) {
      message = `To qualify for bonus bet, please select ${maxBonusGames} games each with odds ${
        Number(fixedOdd) === 1
          ? " of " + perSlipBonusOdd
          : " between " + perSlipBonusOdd + " and " + perSlipMaxOdd
      }`;
    }

    if (userBonus < 1 || totalGames > maxBonusGames) {
      message = "";
    }

    let alertMessage = {
      status: bonusBetEligible ? 201 : 500,
      message: message,
    };

    setMessage(alertMessage);
    setQualifiesBonus(bonusBetEligible && totalGames <= maxBonusGames);
  }, [totalGames, settings, user, betslipsData, setMessage, setQualifiesBonus]);

  useEffect(() => {
    updateBonusStateCallback();
  }, [updateBonusStateCallback]);

  const BonusAlert = () => {
    let c = message?.status === 201 ? "success" : "warning";
    return (
      <>
        {message?.status && message?.message && (
          <div
            className={`fade col shadow p-0 alert-${c} show position-sticky alert-message-line-height`}
          >
            {message.message}
          </div>
        )}
      </>
    );
  };

  //   console.log("bonusMessage data", message?.message);

  useEffect(() => {
    const remainingScreenHeight =
      height - (jackpot ? (user ? 430 : 400) : user ? 560 : 500);
    // Set the pop up component height to be 20% of the remaining screen height
    setPopUpHeight(remainingScreenHeight);
  }, []);

  let changeCallback = undefined;

  // Function to register a callback for bet slip changes
  function onBetSlipChanged(callback) {
    changeCallback = callback;
    changeCallback && changeCallback(betSlipState);
  }

  // Initialize the betSlipState object
  let betSlipState = {
    betslip: [],
    combinedOddsValue: undefined,
  };

  useEffect(() => {
    // Extract all keys from betslipsData and reverse the array
    const allKeys = Object.keys(betslipsData || []).reverse();

    // Check if there is a new key added
    const isNewKeyAdded = allKeys.some(
      (key) => !prevKeysRef.current.includes(key)
    );

    // Check if any key is removed
    const isKeyRemoved = prevKeysRef.current.some(
      (key) => !allKeys.includes(key)
    );

    console.log("is New Key added", isNewKeyAdded);
    console.log("is Key removed", isKeyRemoved);

    if (isNewKeyAdded || isKeyRemoved) {
      // scrolling this widget to the top
      // if (widgetContainerRef.current && scrollableContainerRef.current) {
      //   console.log("we are working on this item")
      //   const widgetOffsetTop = widgetContainerRef.current.offsetTop;
      //   console.log(" we are working on this item widgetOffsetTop", widgetOffsetTop);
      //   widgetContainerRef.current.scrollIntoView = 0;
      // }
      // Update prevKeysRef with current keys
      prevKeysRef.current = allKeys;

      // Set similarEventIds with the reversed array of keys
      // setSimilarEventIds(allKeys);

      // Configure SIR and add Widget 1 with updated similarEventIds
      window.SIR("registerAdapter", "CrashKali", {
        onBetSlipChanged: onBetSlipChanged,
      });
      window.SIR(
        "addWidget",
        ".sr-widget-bets",
        "betRecommendation.similarBets",
        {
          maxRows: 1,
          cardsLayout: "horizontal",
          similarEventIds: allKeys, // Pass the reversed array directly
          onItemClick: handleButtonOnClick,
          user: user ? user.profile_id : null,
          sportsMapping: {
            172: 10,
          },
        }
      );
    }

    return () => {
      // Clean up code here if needed
    };
  }, [betslipsData]);

  // const scrollableContainerRef = useRef(null); // Define a ref for the scrollable container



  

  const clear_rep = (str) => {
    return str.replace(/\s/g, "");
  };

  const handleButtonOnClick = (target, event) => {
    console.log("checking what is the target", target);
    console.log("checking what is the data", event);
    if (target === "externalOutcome") {
      // console.log("target data", event.externalMarket.status.isActive)

      const attributes = {
        parent_match_id: event?.externalEvent?.id,
        // match_id: event.currentTarget.getAttribute("match_id"),
        sub_type_id: event?.externalMarket?.id,
        // special_bet_value: event.currentTarget.getAttribute("special_bet_value"),
        odd_key: event?.externalOutcome?.name,
        odd_value: event?.externalOutcome?.odds,
        bet_type: event?.externalEvent?.isLive === false ? "0" : "1",
        odd_type: event?.externalMarket?.name,
        start_time: event?.externalEvent?.date,
        home_team: event?.externalEvent?.teams[0]?.name,
        away_team: event?.externalEvent?.teams[1]?.name,
        sport_name: event?.externalEvent?.sport.name,
        market_active: event?.externalMarket?.status.isActive,
      };

      const newBet = {
        externalEventId: event?.externalEvent.id,
        externalMarketId: event?.externalMarket.id,
        externalOutcomeId: event?.externalOutcome.id,
      };

      betSlipState = {
        betslip: [...betSlipState.betslip, newBet],
        // combinedOddsValue: '14.52' // Just an example, replace with your actual calculation
      };

      // Update the betSlipState by adding the new bet and the combinedOddsValue
      changeCallback && changeCallback(betSlipState);

      let cstm = clear_rep(
        attributes.parent_match_id +
          "" +
          attributes.sub_type_id +
          attributes.odd_key
        //  +
        // (marketKey !== undefined ? marketKey : "")
      );
      const maxPickReached = () => {
        // console.log("max_pick_reached")
        dispatchRedux(removePickedData(" "));
        // dispatchRedux(removePickedData(""));
        Notify({
          status: 401,
          message: "Maximum selections reached",
          token: "",
        });
      };
      const betItems = getBetslip();
      // let priority = 1; // Initialize priority value

      // // Calculate the next priority value by finding the maximum priority currently in the betslip and adding one
      // if (Object.keys(betItems).length > 0) {
      //   priority = Math.max(...Object.values(betItems).map(item => item.priority)) + 1;
      // }

      const priority = Object.keys(betItems || {}).length + 1; // Incremental priority
      const slip = {
        match_id: attributes.match_id ?? attributes.parent_match_id,
        parent_match_id: attributes.parent_match_id,
        special_bet_value: "",
        sub_type_id: attributes.sub_type_id,
        bet_pick: attributes.odd_key,
        start_time: attributes.start_time,
        odd_value: attributes.odd_value,
        home_team: attributes.home_team,
        away_team: attributes.away_team,
        bet_type: attributes.bet_type,
        odd_type: attributes.odd_type,
        sport_name: attributes.sport_name,
        live: live,
        ucn: clear_rep(
          `${attributes.match_id ?? attributes.parent_match_id}${
            attributes.sub_type_id
          }${attributes.odd_key}
                    `
        ),
        market_active: attributes.market_active,
        position: 0,
        priority: priority, // Assign priority
      };
      console.log("target data", slip);

      // if (cstm === match?.ucn) {
      let betslip;
      console.log("parent_match_id", event.externalEvent.id);
      const updateRedux = () => {
        betslip = addToSlip(slip);
        dispatchRedux(
          setSelected(attributes.parent_match_id + "_selected", cstm)
        );
        dispatchRedux(setPickedData(cstm));
      };

      updateRedux();

      if (
        Object.keys(betItems || {}).length ===
        Number(settings?.sportsBookLimits?.multiBetMaxSelections)
      ) {
        maxPickReached();
      } else {
        updateRedux();
      }

      const betslip_data = {
        betslip_type: "betslip",
        data: betslip,
      };

      dispatchRedux(setMatchBetslip(betslip_data));
    }
    if (target=="externalEvent"){
      navigate("match/"+event?.externalEvent?.id)

    }
  };

  useEffect(() => {
    // Scroll to the widget element when the component mounts
    if (widgetRef.current) {
      widgetRef.current.scrollIntoView({ behavior: "smooth"});
    }
  }, []);

  const pathLocation = window.location.pathname;
  return (
    <div className="bet-body text-white" >
      {!jackpot && <BonusAlert />}
      <div 
        className={`flow  slip-top ${
          user
            ? jackpot
              ? "slip-max"
              : "slip-height slip-log-max"
            : "slip-max"
        } overflow-auto`}
      >
        <div
          className={`${
            pathLocation === "/betslip-slip"
              ? user && !jackpot
                ? "slip-bottom-betlip-active"
                : "slip-bottom-betlip"
              : "slip-bottom-space"
          }`}
        >
          <ul className={"slip-bottom-space-list"}>
            {(betslipsData && Object.keys(betslipsData)?.length == 0) ||
            betslipsData == null ? (
              jackpot ? (
                ""
              ) : (
                <DecodeCode />
              )
            ) : (
              Object.entries(betslipsData || {})
                .sort(([, slipA], [, slipB]) => slipA.priority - slipB.priority)
                .map(([match_id, slip], index) => {
                  let odd = slip.odd_value;
                  let no_odd_bg = odd === 1 ? "#f29f7a" : "";
                  // console.log(slip)
                  return (
                    <div
                      key={index}
                      className={`d-flex slip-bg slip-optional-statuses ${
                        slip?.disable ? "warn" : ""
                      }`}
                    >
                      <div className="bet-cancel">
                        <div>
                           <input
                          id={slip.match_id}
                          type="submit"
                          value="X"
                          onClick={() => handledRemoveSlip(slip)}
                        />
                        </div>
                       
                      </div>
                      <div className="d-flex width-slip-item-container">
                        <li
                          className={`bet-option hide-on-affix ${
                            slip?.disable ? "warn" : ""
                          }`}
                          key={match_id}
                          style={{ background: no_odd_bg }}
                        >
                          <SlipLink2 slip={slip} />
                        </li>
                      </div>
                      <div className="d-flex align-items-center">
                        <b>
                          <span className="bet-odd">
                            {slip.odd_value}
                            {slip.odd_value === 1 && (
                              <span
                                style={{
                                  color: "#cc0000",
                                  fontSize: "11px",
                                  display: "block",
                                }}
                              >
                                Market Disabled
                              </span>
                            )}
                          </span>
                        </b>
                      </div>
                    </div>
                  );
                })
            )}
            {(betslipsData && Object.keys(betslipsData)?.length == 0) ||
            betslipsData == null ? (
              ""
            ) : (
              <div>

             <Widget/>
             </div>
            )}
          </ul>
        </div>
      </div>
      <div ref={widgetRef}></div>

      <div className="bottom">
        <BetslipSubmitForm
          jackpotData={jackpotData}
          live={live}
          totalOdds={totalOdds}
          betslip={betslipsData}
          totalGames={betslipsData ? Object.keys(betslipsData).length : 0}
          jackpot={jackpot}
          bonusBet={qualifiesBonus}
        />
      </div>
    </div>
  );
});
export default React.memo(BetSlip);
