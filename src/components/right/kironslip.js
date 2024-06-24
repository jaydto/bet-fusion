import React, {useCallback, useContext, useEffect, useState} from "react";
import {StoreContext } from "../../context/store";
import {getKironSlip, removeFromKironSlip,} from "../utils/betslip";
import {getFromLocalStorage} from "../utils/local-storage";
import KironslipSubmitForm from "./kironslip-submit-form";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import useWindowDimensions from "../header/Dimensions";

const clean_rep = (str) => {
    str = str.replace(/[^A-Za-z0-9\-]/g, "");
    return str.replace(/-+/g, "-");
};

const KironSlip = React.memo(
    (props) => {
        const {kiron} = props;
        const {width}=useWindowDimensions()
        const [betslipKey, setBetslipKey] = useState("kironbetslip");
        const [betslipsData, setBetslipsData] = useState(null);
        const { state, dispatch } = useContext(StoreContext);
        const totalGames = betslipsData ? Object.keys(betslipsData||{}).length : 0;
        const [message, setMessage] = useState(null);
        const [qualifiesBonus, setQualifiesBonus] = useState(false);
        const [qualifiesGift, setQualifiesGift] = useState(false);
        const [settings, setSettings] = useState(getFromLocalStorage("settings"));

      
        const [expired, setExpired] = useState([])

        const [totalOdds, setTotalOdds] = useState(1);
        const userData = useSelector((state) => state.auth.user)
        const [user, setUser] = useState(getFromLocalStorage("user"))
        useEffect(() => {
            if (userData) {
                setUser(userData || getFromLocalStorage("user"))
            }
        }, [userData,getFromLocalStorage("user")])
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
                kiron && getKironSlip() !== null && Object.keys(getKironSlip()||{}).length == 0 ?
                    setBetslipsData(null) :
                    setBetslipsData(state[betslipKey]);
            }
        }, [state[betslipKey]]);


        //betslip update
        const updateBetslip = useCallback(() => {
            if (betslipsData) {
                let odds = Object.values(betslipsData||{}).reduce(
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
        const setKironSlipkey = useCallback(() => {
            if (kiron === true) {
                setBetslipKey("kironbetslip");
            }
        }, [kiron]);

        useEffect(() => {
            setKironSlipkey();
        }, [setKironSlipkey]);

        const betItem=getKironSlip();

        const betslipLength = Object.keys(betItem || {}).length;
        useEffect(()=>{
            dispatch({type: "SET", key: "betslipKironLength", payload: betslipLength});
        },[betslipLength] )

        const navigate= useNavigate()
        const handledRemoveSlip = (match) => {
            let betslip = removeFromKironSlip(match?.parent_match_id)


            let match_selector = match.parent_match_id + "_selectedK";
            let ucn = clean_rep(
                match.parent_match_id + "" + match.market_id + match.odd_key
            );

            setBetslipsData(betslip);

            dispatch({type: "SET", key: betslipKey, payload: betslip});
            dispatch({type: "SET", key: match_selector, payload: "remove." + ucn});
            if(Object.keys(betslip).length === 0){
                width<991&&navigate(-1)
            }
        };


        const updateGiftState = () => {
        };
        const updateBonusState = () => {
            let maxBonusGames = Number(settings?.CrashKaliBonus?.bonusBetLegs);

            let perSlipBonusOdd = settings?.CrashKaliBonus?.minBonusOdd;

            let fixedOdd = settings?.CrashKaliBonus?.fixedOdd === "1";

            let perSlipMaxOdd = settings?.CrashKaliBonus?.maxBonusOdd;

            let bonusBetFixedAmount = settings?.CrashKaliBonus?.bonusBetAmount;

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
                                {!kiron && <BonusAlert/>}

                <div
                    className={`flow  slip-top ${user ? kiron ? 'slip-max' : 'slip-height slip-log-max' : 'slip-max'} overflow-auto`}>
                    <div className={"slip-bottom-space"}>
                        <ul className={"slip-bottom-space-list"}>
                            {(betslipsData && Object.keys(betslipsData||{})?.length == 0) ||
                            betslipsData == null ? (
                                ""
                            ) : (
                                Object.entries(betslipsData || {})?.map(([match_id, slip], index) => {
                                    let odd = slip.odd_value;
                                    let no_odd_bg = odd === 1 ? "#f29f7a" : "";

                                    return (
                                        <div className={'d-flex slip-bg'} key={index}>
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
                                                    } ${expired.map((id, index) => (slip?.parent_match_id === id ? ' expired-bg ' : '')
                                                    )}`}
                                                    key={match_id}
                                                    style={{background: no_odd_bg}}
                                                >
                                                    <Link
                                                        key={index}
                                                        to={`${
                                                            slip?.bet_type === "0"
                                                                ? "/match/" + slip?.match_id
                                                                : kiron == true ? "#" : "/match/live/" + slip?.parent_match_id
                                                        }`}
                                                        style={{color: "inherit", fontStyle: "inherit"}}
                                                        className={"g url-link"}
                                                    >
                                                        <div className="row">
                                                            <div className="bet-value">
                                                     <span className={"team-info-slip-list-kiron"}>
                                                    <span
                                                        className={"slip-team"}>{slip.home_team}</span>&nbsp; Vs.&nbsp;
                                                         <span className={"slip-team"}>{slip.away_team}</span>
                                                     </span>
                                                                <span className="sp_sport"></span>
                                                            </div>
                                                        </div>
                                                        <div className="row d-flex flex-column">
                                                            <div
                                                                className="bet-value picks-user-slip"> {slip.odd_type}- <span
                                                                className={"pick-user-match"}> {slip.outcome_id}</span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </li>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                {expired?.includes(slip?.parent_match_id) ? (
                                                    <b>
                                                        <span className='text-warning float-end px-2'>Expired</span>
                                                    </b>
                                                ) : (
                                                    <b>
                                                        <span className="bet-odd">{slip.odd_value}</span>
                                                    </b>
                                                )}
                                            </div>

                                        </div>
                                    );
                                })
                            )}
                        </ul>
                    </div>
                </div>
                <div className="bottom">
                    <KironslipSubmitForm
                        setExpired={setExpired}
                        kiron={kiron}
                        totalOdds={totalOdds}
                        betslip={betslipsData}
                        setBetslipsData={setBetslipsData}
                        totalGames={betslipsData ? Object.keys(betslipsData||{}).length : 0}
                        bonusBet={qualifiesBonus}

                    />
                </div>
            </div>
        );
    });
export default React.memo(KironSlip);

