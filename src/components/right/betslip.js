import React, {useCallback, useContext, useEffect, useState} from "react";
import BetslipSubmitForm from "./betslip-submit-form";
import {StoreContext } from "../../context/store";
import {addToSlip, getBetslip, getJackpotBetslip, removeFromJackpotSlip, removeFromSlip,} from "../utils/betslip";
import useWindowDimensions from "../header/Dimensions";
import {getFromLocalStorage} from "../utils/local-storage";
import DecodeCode from "./decode";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {removePickedData, removeSelected, removeSlipSelection, setMatchBetslip, setPickedData, setSelected} from "../../redux/bettingSlice";
import Notify from "../utils/Notify";

const clean_rep = (str) => {
    str = str.replace(/[^A-Za-z0-9\-]/g, "");
    return str.replace(/-+/g, "-");
};

const BetSlip = React.memo(
    (props) => {
        const {jackpot, betslipValidationData, jackpotData,live} = props;
        const [message, setMessage] = useState(null);
        const [qualifiesBonus, setQualifiesBonus] = useState(false);
        const [settings,] = useState(getFromLocalStorage("settings"));
        const {height} = useWindowDimensions();
        const dispatchRedux=useDispatch()

        const [similarEventIds, setSimilarEventIds] = useState([]);

        const [, setPopUpHeight] = useState(0);
        const [totalOdds, setTotalOdds] = useState(1);

        const [betslipsData, setBetslipsData] = useState(getBetslip());

        const slip_data=useSelector((state)=>state.betting.betslip)
        const userData = useSelector((state) => state.auth.user)
        const [user, setUser] = useState(getFromLocalStorage("user"))
        useEffect(() => {
            if (userData) {
                setUser(userData || getFromLocalStorage("user"))
            }
        }, [userData])

        useEffect(()=>{
            setBetslipsData(slip_data||getBetslip())
        },[slip_data])

        const totalGames = betslipsData ? Object.keys(betslipsData).length : 0;

        useEffect(() => {
            if (slip_data) {
                jackpot && Object.keys(getJackpotBetslip() || {}).length == 0
                    ? setBetslipsData(null)
                    : setBetslipsData(slip_data);
            }
        }, [slip_data]);

        //Handle db validation of betslip
        const validateBetslipwithDbData = useCallback(() => {
            if (betslipValidationData && betslipsData) {
                let clone_slip = betslipsData;
                Object.entries(betslipValidationData)?.forEach(([key, slipdata]) => {
                    let match_id = slipdata.match_id;
                    let slip = clone_slip[match_id];
                    if (slip) {
                        if (slipdata.odd_active !== 1) {
                            slip.comment = "Option not active for betting";
                            slip.disable = true;
                        } else if (
                            slipdata.market_active === 0 ||
                            (slipdata.market_active !== "Active" &&
                                slipdata.market_active !== 1)
                        ) {
                            slip.comment =
                                "Betting on this market is " +
                                (slipdata.market_active === 0
                                    ? "suspended"
                                    : slipdata.market_active);
                            slip.disable = true;
                        } else if (
                            slipdata.event_status === "Suspended" ||
                            slipdata.event_status === "Deacticated" ||
                            slipdata.event_status === "Ended" ||
                            slipdata.event_status === "Abandoned" ||
                            slipdata.event_status === "Finished"
                        ) {
                            slip.comment = "This event is  " + slipdata.event_status;
                            slip.disable = true;
                        } else if (slipdata.active !== 1) {
                            slip.comment = "Market not active for betting";
                            slip.disable = true;
                        } else if (slip.odd_value !== slipdata.odd_value) {
                            slip.prev_odds = slip.odd_value;
                            slip.odd_value = slipdata.odd_value;
                            slip.comment = "The odds for this event have changed";
                            slip.disable = false;
                        } else {
                            if (slip.disable !== false) {
                                slip.comment = null;
                            }
                            slip.disable = false;
                        }
                        clone_slip[match_id] = slip;
                    }
                });
                const betslip_data={
                    betslip_type:"betslip",
                    data:clone_slip
                }
                dispatchRedux(setMatchBetslip(betslip_data))
            }
        }, []);

        useEffect(() => {
            validateBetslipwithDbData();
        }, [validateBetslipwithDbData]);

        //betslip update
        const updateBetslip = useCallback(() => {
            if (betslipsData) {
                let odds = Object.values(betslipsData).reduce(
                    (previous, {odd_value}) => {
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


        const navigate=useNavigate();

        const handledRemoveSlip = (match) => {
            let betslip =
                jackpot !== true
                    ? removeFromSlip(match.match_id)
                    : removeFromJackpotSlip(match.match_id);

            let match_selector = match.match_id + "_selected";
            let ucn = clean_rep(
                match.match_id + "" + match.sub_type_id + match.bet_pick
            );

            setBetslipsData(betslip);
            const betslip_data={
                betslip_type:"betslip",
                data:betslip
            }
            dispatchRedux(setMatchBetslip(betslip_data))
            // const match_items={
            //     match_selector:match_selector,
            //     ucn:"remove." + ucn
            // }
            //
            // dispatchRedux(removeSlipSelection(match_items));
            dispatchRedux(removeSelected(match_selector))

            dispatchRedux(removePickedData(""));


            if(Object.keys(betslip).length === 0){
                navigate("/")
            }
        };



        // const updateBonusState = () => {
        //     let maxBonusGames = Number(settings?.betnareBonus?.bonusBetLegs);

        //     let perSlipBonusOdd = settings?.betnareBonus?.minBonusOdd;

        //     let fixedOdd = settings?.betnareBonus?.fixedOdd === "1";

        //     let perSlipMaxOdd = settings?.betnareBonus?.maxBonusOdd;

        //     let bonusBetFixedAmount = settings?.betnareBonus?.bonusBetAmount;

        //     let message = "";

        //     let userBonus = Number(user?.bonus || 0);

        //     if ((totalGames < maxBonusGames) && (maxBonusGames > 1)) {
        //         let remainingGames = Number(maxBonusGames) - Number(totalGames);
        //         message = `Congratulations, you qualify for bonus. Add ${remainingGames} more game${
        //             remainingGames > 1 ? "s" : ""
        //         } to place your bet using bonus.`;
        //     } else if ((totalGames === maxBonusGames) && (maxBonusGames > 1)) {
        //         message =
        //             "Congratulations, you are eligible for a bonus bet. Allowed Bonus Bet Amount is KES " +
        //             bonusBetFixedAmount;
        //     } else {
        //         message = "";
        //     }

        //     let bonusBetEligible = false;

        //     let bonusBetSportID = settings?.betnareBonus?.bonusSport;

        //     if (fixedOdd) {
        //         bonusBetEligible =
        //             Object.values(betslipsData || []).filter(
        //                 (slip) =>
        //                     Number(slip.odd_value) < Number(perSlipBonusOdd) ||
        //                     slip.sub_type_id !== "1" ||
        //                     slip.sport_id !== bonusBetSportID ||
        //                     slip.bet_type !== "1"
        //             ).length < 1 && userBonus > 0;
        //     } else {
        //         bonusBetEligible =
        //             Object.values(betslipsData || []).filter(
        //                 (slip) =>
        //                     Number(slip.odd_value) < Number(perSlipBonusOdd) ||
        //                     Number(slip.odd_value) > Number(perSlipMaxOdd) ||
        //                     slip.sub_type_id !== "1" ||
        //                     slip.sport_id !== bonusBetSportID ||
        //                     slip.bet_type !== "1"
        //             ).length < 1 && userBonus > 0;
        //     }

        //     if (!bonusBetEligible && (maxBonusGames > 1)) {
        //         message = `To qualify for bonus bet, please select ${maxBonusGames} games each with odds ${
        //             Number(fixedOdd) === 1
        //                 ? " of " + perSlipBonusOdd
        //                 : " between " + perSlipBonusOdd + " and " + perSlipMaxOdd
        //         }`;
        //     }

        //     if (userBonus < 1 || totalGames > maxBonusGames) {
        //         message = "";
        //     }

        //     let alertMessage = {
        //         status: bonusBetEligible ? 201 : 500,
        //         message: message,
        //     };

        //     setMessage(alertMessage);
        //     setQualifiesBonus(bonusBetEligible && totalGames <= maxBonusGames);
        // };
        
        // useEffect(() => {
        //     updateBonusState();
        //     }, 
        //     [totalOdds, totalGames]);

        const updateBonusStateCallback = useCallback(() => {
            let maxBonusGames = Number(settings?.betnareBonus?.bonusBetLegs);
        
            let perSlipBonusOdd = settings?.betnareBonus?.minBonusOdd;
        
            let fixedOdd = settings?.betnareBonus?.fixedOdd === "1";
        
            let perSlipMaxOdd = settings?.betnareBonus?.maxBonusOdd;
        
            let bonusBetFixedAmount = settings?.betnareBonus?.bonusBetAmount;
        
            let message = "";
        
            let userBonus = Number(user?.bonus || 0);
        
            if ((totalGames < maxBonusGames) && (maxBonusGames > 1)) {
                let remainingGames = Number(maxBonusGames) - Number(totalGames);
                message = `Congratulations, you qualify for bonus. Add ${remainingGames} more game${
                    remainingGames > 1 ? "s" : ""
                } to place your bet using bonus.`;
            } else if ((totalGames === maxBonusGames) && (maxBonusGames > 1)) {
                message =
                    "Congratulations, you are eligible for a bonus bet. Allowed Bonus Bet Amount is KES " +
                    bonusBetFixedAmount;
            } else {
                message = "";
            }
        
            let bonusBetEligible = false;
        
            let bonusBetSportID = settings?.betnareBonus?.bonusSport;
        
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
        
            if (!bonusBetEligible && (maxBonusGames > 1)) {
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

        console.log("bonusMessage data", message?.message);

       

        useEffect(() => {

            const remainingScreenHeight = height - (jackpot ? user ? 430 : 400 : user ? 560 : 500);
            // Set the pop up component height to be 20% of the remaining screen height
            setPopUpHeight(remainingScreenHeight);
        }, []);
     

        useEffect(() => {
            // Update similarEventIds based on the last item in betslipsData
            const lastBetslip = Object.values(betslipsData || []).filter((slip) => slip.parent_match_id).pop();

            console.log('lastBetslip', lastBetslip)
            const parentMatchId = lastBetslip?.parent_match_id || null;
        
            // Assuming you have a function to fetch similarEventIds based on parentMatchId
            // const newSimilarEventIds = fetchSimilarEventIds(parentMatchId);
            const newSimilarEventIds = parentMatchId;

            console.log("parent_match_id",typeof(newSimilarEventIds))
        
            // setSimilarEventIds(newSimilarEventIds);
            setSimilarEventIds((prevSimilarEventIds) => {
              const updatedSimilarEventIds = [...prevSimilarEventIds, parseInt(newSimilarEventIds)];
              return updatedSimilarEventIds;
            });

            console.log("similar event_ids", similarEventIds)
        
            // Configure SIR here
            window.SIR('registerAdapter', 'betnare', { onBetSlipChanged: onBetSlipChanged });
        
            // Add Widget 1 with updated similarEventIds
            window.SIR('addWidget', '.sr-widget-bets', 'betRecommendation.similarBets', {
              maxRows: 1,
              cardsLayout: 'horizontal',
              similarEventIds: [...similarEventIds, parseInt(newSimilarEventIds)], // Append newSimilarEventIds here
              onItemClick: handleButtonOnClick,
              user: user?user?.profile_id:null,
              filters: { recommendationType: { available: ['recommended'] } },
            });
        
            // Clean up: Remove the listener when the component is unmounted
            return () => {
              // Remove any event listeners or clean-up code as needed
            };
          }, [betslipsData]);

          let betSlipState = {
            betslip: [],
            combinedOddsValue: undefined
        };
        let changeCallback = undefined;

        // Function to register a callback for bet slip changes
        function onBetSlipChanged(callback) {
            changeCallback = callback;
            changeCallback && changeCallback(betSlipState);
        }

          // Function to handle item click
        function onItemClick(target, data) {

            console.log("checking what is the target", target)
            console.log("checking what is the data", data)
            if (target === 'externalOutcome') {
                // This is just an example of implementation.
                // Change it with your own betSlip functionality
                const newBet = {
                    externalEventId: data.externalEvent.id,
                    externalMarketId: data.externalMarket.id,
                    externalOutcomeId: data.externalOutcome.id
                };

                betSlipState = {
                    betslip: [...betSlipState.betslip, newBet],
                    combinedOddsValue: '14.52' // Just an example, replace with your actual calculation
                }

                // Update the betSlipState by adding the new bet and the combinedOddsValue
                changeCallback && changeCallback(betSlipState);

                // Update the SIR widget with the new similarEventIds
    window.SIR('updateWidgetConfig', '.sr-widget-bets', {
        similarEventIds: Object.values(betslipsData || []).map((slip) => slip.externalEventId),
      });
            }
        }
        const clear_rep = (str) => {
            return str.replace(/\s/g, "");
        };

        const picked = useSelector((state) => state.betting.picked);


        const handleButtonOnClick =
        (target,event) => {

          console.log("checking what is the target", target)
            console.log("checking what is the data", event)
            if (target === 'externalOutcome') {

              // console.log("target data", event.externalMarket.status.isActive)
            const attributes = {
                parent_match_id: event?.externalEvent?.id,
                // match_id: event.currentTarget.getAttribute("match_id"),
                sub_type_id: event?.externalMarket?.id,
                // special_bet_value: event.currentTarget.getAttribute("special_bet_value"),
                odd_key: event?.externalOutcome?.name,
                odd_value: event?.externalOutcome?.odds,
                bet_type: event?.externalEvent?.isLive===false?"0":"1",
                odd_type: event?.externalMarket?.name,
                start_time: event?.externalEvent?.date,
                home_team: event?.externalEvent?.teams[0]?.name,
                away_team: event?.externalEvent?.teams[1]?.name,
                sport_name: event?.externalEvent?.sport.name,
                market_active: event?.externalMarket?.status.isActive,
            };

            let cstm = clear_rep(
                attributes.match_id +
                "" +
                attributes.sub_type_id +
                attributes.odd_key
                //  +
                // (marketKey !== undefined ? marketKey : "")
            );
            const maxPickReached = () => {
                // console.log("max_pick_reached")
                dispatchRedux(removePickedData(" "))
                // dispatchRedux(removePickedData(""));
                Notify({
                    status: 401,
                    message: "Maximum selections reached",
                    token: "",
                });
            };
            const betItems = getBetslip();
            const slip = {
                match_id: attributes.match_id??attributes.parent_match_id,
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
                    `${attributes.match_id??attributes.parent_match_id}${attributes.sub_type_id}${attributes.odd_key}
                    `
                ),
                market_active: attributes.market_active,
                position: 0,
            };
            console.log("target data", slip)


            // if (cstm === match?.ucn) {
                let betslip;
                const updateRedux = () => {
                    betslip =  addToSlip(slip);
                    dispatchRedux( setSelected(event.externalEvent.id+"_selected", cstm));
                    dispatchRedux( setPickedData(cstm));
                };

                
                    updateRedux();
               
                    if (Object.keys(betItems || {}).length === Number(settings?.sportsBookLimits?.multiBetMaxSelections)) {
                        maxPickReached();
                    } else {
                        updateRedux();
                    }
                

                const betslip_data = {
                    betslip_type: "betslip",
                    data: betslip
                };

                dispatchRedux(setMatchBetslip(betslip_data));
            }
        };
       
        const pathLocation = window.location.pathname
        return (
          <div className="bet-body text-white">
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
                    Object.entries(betslipsData || {}).map(
                      ([match_id, slip], index) => {
                        let odd = slip.odd_value;
                        let no_odd_bg = odd === 1 ? "#f29f7a" : "";
                        // console.log(slip)
                        return (
                          <div key={index} className={"d-flex slip-bg"}>
                            <div className="bet-cancel">
                              <input
                                id={slip.match_id}
                                type="submit"
                                value="X"
                                onClick={() => handledRemoveSlip(slip)}
                              />
                            </div>
                            <div className="d-flex width-slip-item-container">
                              <li
                                className={`bet-option hide-on-affix ${
                                  slip?.disable ? "warn" : ""
                                }`}
                                key={match_id}
                                style={{ background: no_odd_bg }}
                              >
                                <Link
                                  to={`${
                                    slip?.bet_type === "0"
                                      ? "/match/" + slip?.match_id
                                      : "/match/live/" + slip?.parent_match_id
                                  }`}
                                  style={{
                                    color: "inherit",
                                    fontStyle: "inherit",
                                  }}
                                  className={"g url-link"}
                                >
                                  <div className="bet-value">
                                    <b>
                                      {
                                        <span
                                          className={
                                            "team-info-slip-list text-ellipsis"
                                          }
                                        >
                                          <span
                                            className={
                                              "slip-team text-ellipsis"
                                            }
                                          >
                                            {slip.home_team} &nbsp; Vs.&nbsp;{" "}
                                            {slip.away_team}
                                          </span>
                                        </span>
                                      }
                                    </b>
                                  </div>
                                  <div
                                    className={
                                      "d-flex w-100 slip-dim-color-selections"
                                    }
                                  >
                                    <div className="row d-flex flex-column">
                                      <div className="bet-value picks-user-slip">
                                        {" "}
                                        {slip.odd_type} -
                                        <span className={"pick-user-match"}>
                                          {slip.bet_pick}
                                        </span>
                                        &nbsp;
                                        <span style={{ color: "var(--red)" }}>
                                          {Number(slip.bet_type) === 1
                                            ? " Live'"
                                            : ""}
                                        </span>
                                      </div>
                                      <div className="bet-value time-slip-value">
                                        {" "}
                                        {slip?.start_time}
                                      </div>
                                    </div>
                                    <br />
                                  </div>
                                  <div className="row">
                                    <div className="warn">{slip?.comment} </div>
                                  </div>
                                </Link>
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
                      }
                    )
                  )}
                </ul>
                {(betslipsData && Object.keys(betslipsData)?.length == 0) ||
                betslipsData == null ? (
                  (
                    ""
                  ) 
                ) : (
                  <div className="widgets mt-3">
                    <div>
                      <div className="sr-widget sr-widget-bets"></div>
                    </div>
                    {/* <div>
                      <div className="sr-widget sr-widget-2"></div>
                    </div> */}
                    
                  </div>
                )}
              </div>
            </div>
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
