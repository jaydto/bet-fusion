import React, { useState, useEffect, useContext, useCallback } from "react";
import { Context } from "../../context/store";
import {
    getKironSlip, removeFromKironSlip,
} from "../utils/betslip";
import { getFromLocalStorage } from "../utils/local-storage";
import KironslipSubmitForm from "./kironslip-submit-form";

const clean_rep = (str) => {
    str = str.replace(/[^A-Za-z0-9\-]/g, "");
    return str.replace(/-+/g, "-");
};

const KironSlip = (props) => {
    const { kiron } = props;
    const [betslipKey, setBetslipKey] = useState("kironbetslip");
    const [betslipsData, setBetslipsData] = useState(null);
    const [state, dispatch] = useContext(Context);
    const totalGames = betslipsData ? Object.keys(betslipsData).length : 0;
    const [message, setMessage] = useState(null);
    const [qualifiesBonus, setQualifiesBonus] = useState(false);
    const [qualifiesGift, setQualifiesGift] = useState(false);
    const [settings, setSettings] = useState(getFromLocalStorage("settings"));
    const [expired, setExpired]=useState(false)

    const [totalOdds, setTotalOdds] = useState(1);
    //initial betslip loading
    const loadBetslip = useCallback(() => {
        if (!betslipsData) {
            let b = getKironSlip()
            setBetslipsData(b);
        }
    }, []);

    useEffect(() => {
        loadBetslip();
    }, [loadBetslip]);

    useEffect(() => {
        if (state[betslipKey]) {
           kiron && getKironSlip()!==null&& Object.keys(getKironSlip()).length == 0?
                    setBetslipsData(null) :
                    setBetslipsData(state[betslipKey]);
            // console.log("size of slip",Object.keys(getJackpotBetslip).length )
        }
    }, [state[betslipKey]]);



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

    // betslip key watch
    const setKironSlipkey = useCallback(() => {
        if (kiron === true) {
            setBetslipKey("kironbetslip");
        }
    }, [kiron]);

    useEffect(() => {
        setKironSlipkey();
    }, [setKironSlipkey]);

    const handledRemoveSlip = (match) => {
        let betslip =removeFromKironSlip(match?.parent_match_id)


        let match_selector = match.parent_match_id + "_selectedK";
        let ucn = clean_rep(
            match.parent_match_id + "" + match.market_id + match.odd_key
        );

        setBetslipsData(betslip);

        dispatch({ type: "SET", key: betslipKey, payload: betslip });
        dispatch({ type: "SET", key: match_selector, payload: "remove." + ucn });
    };


    const updateGiftState = () => {};

    const updateBonusState = () => {
        let maxBonusGames = Number(settings?.betnareBonus?.bonusBetLegs);

        let perSlipBonusOdd = settings?.betnareBonus?.minBonusOdd;

        let fixedOdd = settings?.betnareBonus?.fixedOdd === "1";

        let perSlipMaxOdd = settings?.betnareBonus?.maxBonusOdd;

        let bonusBetFixedAmount = settings?.betnareBonus?.bonusBetAmount;

        let message = "";

        let userBonus = Number(state?.user?.bonus || 0);

        if (totalGames < maxBonusGames) {
            let remainingGames = Number(maxBonusGames) - Number(totalGames);
            message = `Congratulations, you qualify for bonus. Add ${remainingGames} more game${
                remainingGames > 1 ? "s" : ""
            } to place your bet using bonus.`;
        } else if (totalGames === maxBonusGames) {
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

        if (!bonusBetEligible) {
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
    };

    const BonusAlert = () => {
        let c = message?.status === 201 ? "success" : "warning";
        let x_style = {
            float: "right",
            display: "block",
            fontSize: "22px",
            color: "orangered",
            cursor: "pointer",
            padding: "3px",
        };
        return (
            <>
                {message?.status && message?.message && (
                    <div
                        className={`fade col shadow p-0 alert-${c} show position-sticky`}
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

    return (
        <div className="bet-body text-white">
            {!kiron && <BonusAlert />}
            <div className={`flow  slip-top ${state?.user?kiron?'slip-max':'slip-height slip-log-max':'slip-max'} overflow-auto`}>
                <div className={"slip-bottom-space"}>
                    <ul className={"slip-bottom-space-list"}>
                        {(betslipsData && Object.keys(betslipsData)?.length == 0) ||
                        betslipsData == null ? (
                            ""
                        ) : (
                            Object.entries(betslipsData || {}).map(([match_id, slip]) => {
                                let odd = slip.odd_value;
                                let no_odd_bg = odd === 1 ? "#f29f7a" : "";

                                return (
                                    <li
                                        className={`bet-option hide-on-affix ${
                                            slip?.disable ? "warn" : ""
                                        } ${expired.map((id,index)=> (slip?.parent_match_id === id ?' expired-bg ':'')
                                        )}`}
                                        key={match_id}
                                        style={{ background: no_odd_bg }}
                                    >
                                        <div className="bet-cancel">
                                            <input
                                                id={slip.match_id}
                                                type="submit"
                                                value="X"
                                                onClick={() => handledRemoveSlip(slip)}
                                            />
                                        </div>
                                        <a
                                            href={`${
                                                slip?.bet_type === "0"
                                                    ? "/match/" + slip?.match_id
                                                    :kiron==true?"#":"/match/live/" + slip?.parent_match_id
                                            }`}
                                            style={{ color: "inherit", fontStyle: "inherit" }}
                                            className={"g url-link"}
                                        >
                                            <div className="bet-value" style={{width:'90%'}}>
                                                <b>
                                                    {
                                                        <span
                                                            style={{
                                                                float: "left",
                                                                width: "auto",
                                                                fontWeight: "bold",
                                                            }}
                                                        >
                                                    {slip?.sport_name==undefined?kiron==true?"Soccer":"Soccer":slip?.sport_name},&nbsp;

                                                    </span>
                                                    }
                                                    {expired.map((id,index)=>{
                                                        return slip?.parent_match_id === id && (
                                                            <span key={index} className='text-warning float-end'>
                                                             Expired
                                                        </span>
                                                        );
                                                    })}
                                                </b>
                                            </div>
                                            <div className="row">
                                                <div className="bet-value">
                                                    {`${slip.home_team} - ${slip.away_team}`}
                                                    <br />
                                                    <span className="sp_sport"></span>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="bet-value">Market - {slip.odd_type}</div>
                                            </div>
                                            <div className="bet-pick">
                                                <b>
                                                    Your Pick - {slip.outcome_id}
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
                                            <div className="row">
                                                <div className="warn">{slip?.comment} </div>
                                            </div>
                                        </a>
                                    </li>
                                );
                            })
                        )}
                    </ul>
                </div>
            </div>
            <div className="bottom" >
                <KironslipSubmitForm
                    setExpired={setExpired}
                    kiron={kiron}
                    totalOdds={totalOdds}
                    betslip={betslipsData}
                    setBetslipsData={setBetslipsData}
                    totalGames={betslipsData ? Object.keys(betslipsData).length : 0}
                    bonusBet={qualifiesBonus}

                />
            </div>
        </div>
    );
};
export default React.memo(KironSlip);

