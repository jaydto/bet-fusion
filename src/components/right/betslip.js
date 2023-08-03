import React, {useCallback, useContext, useEffect, useState} from "react";
import BetslipSubmitForm from "./betslip-submit-form";
import {StoreContext } from "../../context/store";
import {getBetslip, getJackpotBetslip, removeFromJackpotSlip, removeFromSlip,} from "../utils/betslip";
import useWindowDimensions from "../header/Dimensions";
import {getFromLocalStorage} from "../utils/local-storage";
import DecodeCode from "./decode";
import {Link, useNavigate} from "react-router-dom";

const clean_rep = (str) => {
    str = str.replace(/[^A-Za-z0-9\-]/g, "");
    return str.replace(/-+/g, "-");
};

const BetSlip = React.memo(
    (props) => {
        const {jackpot, betslipValidationData, jackpotData,live} = props;
        const [betslipKey, setBetslipKey] = useState(jackpot ? "jackpotbetslip" : "betslip");
        const [betslipsData, setBetslipsData] = useState(null);
        const { state, dispatch } = useContext(StoreContext);
        const totalGames = betslipsData ? Object.keys(betslipsData).length : 0;
        const [message, setMessage] = useState(null);
        const [qualifiesBonus, setQualifiesBonus] = useState(false);
        const [settings,] = useState(getFromLocalStorage("settings"));
        const {height, width} = useWindowDimensions();
        const [popUpHeight, setPopUpHeight] = useState(0);
        const [totalOdds, setTotalOdds] = useState(1);
        //initial betslip loading
        const loadBetslip = useCallback(() => {
            if (!betslipsData) {
                let b = jackpot === true ? getJackpotBetslip() : getBetslip();
                setBetslipsData(b);
            }
        }, []);

        useEffect(() => {
            loadBetslip();
        }, [loadBetslip]);

        useEffect(() => {
            if (state[betslipKey]) {
                jackpot && Object.keys(getJackpotBetslip() || {}).length == 0
                    ? setBetslipsData(null)
                    : setBetslipsData(state[betslipKey]);
                // console.log("size of slip",Object.keys(getJackpotBetslip).length )
            }
        }, [state[betslipKey]]);

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
                dispatch({type: "SET", key: betslipKey, payload: clone_slip});
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

        // betslip key watch
        const setJackpotSlipkey = useCallback(() => {
            if (jackpot === true) {
                setBetslipKey("jackpotbetslip");
            }
        }, [jackpot]);

        useEffect(() => {
            setJackpotSlipkey();
        }, [setJackpotSlipkey]);

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

            dispatch({type: "SET", key: betslipKey, payload: betslip});
            dispatch({type: "SET", key: match_selector, payload: "remove." + ucn});

            if(Object.keys(betslip).length === 0){
                navigate("/")
            }
        };

        const updateGiftState = () => {
        };

        const updateBonusState = () => {
            let maxBonusGames = Number(settings?.betnareBonus?.bonusBetLegs);

            let perSlipBonusOdd = settings?.betnareBonus?.minBonusOdd;

            let fixedOdd = settings?.betnareBonus?.fixedOdd === "1";

            let perSlipMaxOdd = settings?.betnareBonus?.maxBonusOdd;

            let bonusBetFixedAmount = settings?.betnareBonus?.bonusBetAmount;

            let message = "";

            let userBonus = Number(state?.user?.bonus || 0);

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
                message = `To qualify for bonus bet, please select ${maxBonusGames} game each with odds ${
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
        };

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

        useEffect(() => {
            updateBonusState();
            updateGiftState();
        }, [totalOdds, totalGames]);

        useEffect(() => {

            const remainingScreenHeight = height - (jackpot ? state?.user ? 430 : 400 : state?.user ? 560 : 500);
            // Set the pop up component height to be 20% of the remaining screen height
            setPopUpHeight(remainingScreenHeight);
        }, []);
        const pathLocation = window.location.pathname
        return (
            <div className="bet-body text-white">
                {!jackpot && <BonusAlert/>}
                <div
                    className={`flow  slip-top ${state?.user ? jackpot ? 'slip-max' : 'slip-height slip-log-max' : 'slip-max'} overflow-auto`}>
                    <div
                        className={`${pathLocation === '/betslip-slip' ? state?.user && !jackpot ? 'slip-bottom-betlip-active' : 'slip-bottom-betlip' : 'slip-bottom-space'}`}>
                        <ul className={"slip-bottom-space-list"}>
                            {(betslipsData && Object.keys(betslipsData)?.length == 0) ||
                            betslipsData == null ? (
                                jackpot ? (
                                    ""
                                ) : (
                                    <DecodeCode/>
                                )
                            ) : (
                                Object.entries(betslipsData || {}).map(([match_id, slip], index) => {
                                    let odd = slip.odd_value;
                                    let no_odd_bg = odd === 1 ? "#f29f7a" : "";
                                    // console.log(slip)
                                    return (

                                        <div key={index} className={'d-flex slip-bg'}>
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
                                                    style={{background: no_odd_bg}}
                                                >

                                                    <Link
                                                        to={`${jackpot ? "#" :
                                                            slip?.bet_type === "0"
                                                                ? "/match/" + slip?.match_id
                                                                : "/match/live/" + slip?.parent_match_id
                                                        }`}
                                                        style={{color: "inherit", fontStyle: "inherit"}}
                                                        className={"g url-link"}>
                                                        <div className="bet-value">
                                                            <b>
                                                                {
                                                                    <span
                                                                        className={"team-info-slip-list text-ellipsis"}>
                                                                     <span
                                                                         className={"slip-team text-ellipsis"}>{slip.home_team} &nbsp; Vs.&nbsp; {slip.away_team}</span>
                                                                        </span>
                                                                }
                                                                {slip.bet_type === 0 && " Pre-match"}
                                                                {slip.bet_type === 1 && " Live"}
                                                            </b>
                                                        </div>
                                                        <div className={"d-flex w-100 slip-dim-color-selections"}>
                                                            <div className="row d-flex flex-column">
                                                                <div
                                                                    className="bet-value picks-user-slip"> {slip.odd_type} - <span
                                                                    className={"pick-user-match"}>{slip.bet_pick}</span>
                                                                </div>
                                                                <div
                                                                    className="bet-value time-slip-value"> {slip?.start_time}</div>
                                                            </div>
                                                            <br/>

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
                                })
                            )}
                        </ul>
                    </div>
                </div>
                <div className="bottom">
                    <BetslipSubmitForm
                        jackpotData={jackpotData}
                        live={live}
                        totalOdds={totalOdds}
                        betslip={betslipsData}
                        setBetslipsData={setBetslipsData}
                        totalGames={betslipsData ? Object.keys(betslipsData).length : 0}
                        jackpot={jackpot}
                        bonusBet={qualifiesBonus}
                    />
                </div>
            </div>
        );
    });
export default React.memo(BetSlip);
