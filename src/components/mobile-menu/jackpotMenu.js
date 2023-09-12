import React, {useCallback, useContext, useEffect, useState} from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faExclamationCircle,
    faShuffle,
    faTimes,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";

import {
    getJackpotBetslip,
    removeFromJackpotSlip,
} from "../utils/betslip";
import {StoreContext} from "../../context/store";
import {SubmitButton} from "../right/betslip-submit-form";
import {Form, Formik} from "formik";
import {getFromLocalStorage, setLocalStorage} from "../utils/local-storage";
import {publicIpv4 as publicIp} from "public-ip";
import Notify from "../utils/Notify";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import {useDispatch, useSelector} from "react-redux";
import {
    bettingMatchesGames,
    removeSelected,
    removeSlipSelection,
    resetStateBetslip,
    setMatchBetslip
} from "../../redux/bettingSlice";
import {userBalance} from "../../redux/authSlice";

const JackpotMenu = React.memo(
    (props) => {
        const {jackpotData, matches} = props
        const {state, dispatch} = useContext(StoreContext);
        const [ipv4, setIpv4] = useState(null);
        const [selections, setSelections] = useState([])
        const dispatchRedux = useDispatch()
        const randomize = async () => {
            matches?.data?.forEach((match, index) => {
                let teams = [match?.home_team, 'draw', match?.away_team]
                let team = teams[Math.floor(Math.random() * teams.length)].replaceAll(" ", "")
                while (selections[index] === team) {
                    team = teams[Math.floor(Math.random() * teams.length)].replaceAll(" ", "")
                }
                selections[index] = team
                let selection = "jp_" + match?.match_id.toString() + match?.sub_type_id.toString() + team.toString();
                document.querySelectorAll('button[custom="' + selection + '"]')?.forEach((el) => {
                    if (!el.classList.contains('picked')) {
                        el.click()
                    }
                })
            })
            setSelections(selections)
        }

        const clean_rep = (str) => {
            str = str.replace(/[^A-Za-z0-9\-]/g, "");
            return str.replace(/-+/g, "-");
        };

        const userData = useSelector((state) => state.auth.user)
        const jackpot_data = useSelector((state) => state.betting.jackpotbestlip)
        const [user, setUser] = useState(getFromLocalStorage("user"))

        useEffect(() => {
            if (userData) {
                setUser(userData || getFromLocalStorage("user"))
            }
        }, [userData])
        const ipAddress = useCallback(async () => {
            try {
                let ip = await publicIp({
                    fallbackUrls: ["https://ifconfig.co/ip"],
                });

                setIpv4(ip);
            } catch (error) {
                console.error("Error getting IPv4 address:", error);
            }


        }, [ipv4]);


        useEffect(() => {
            ipAddress();
        }, [ipAddress])


        let winnings = jackpotData?.jackpot_amount;
        let jackpot_stake = jackpotData?.bet_amount;
        let jackpot_games = jackpotData?.total_games;

        const handleRemoveAll = useCallback(() => {
            let betslips = getJackpotBetslip()
            Object.entries(betslips||{}).map(([match_id, match]) => {
                // let slip=
                removeFromJackpotSlip(match_id)

                let match_selector = "jp_"+match.match_id + "_selected";

                dispatchRedux(removeSelected(match_selector))

            });
            const betslip_data = {
                betslip_type: "jackpotbetslip",
                data: {}
            }
            dispatchRedux(setMatchBetslip(betslip_data))
            // setLocalStorage("winnings",null)
            setLocalStorage('betslip_share_code', null)
        }, []);

        const gaEventTracker = useAnalyticsEventTracker('Place Jackpot Bet')

        const handlePlaceBet = useCallback(() => {
            let betslips = getJackpotBetslip()
            let bs = Object.values(betslips || []);

            let jackpotMessage = 'jp'

            bs = bs.sort(function (a, b) {
                return Number(a.position) - Number(b.position);
            });


            for (let slip of bs) {
                jackpotMessage += "#" + slip.bet_pick
            }

            let payload = {
                bet_string: 'web',
                app_name: 'desktop',
                possible_win: winnings,
                profile_id: user?.profile_id,
                stake_amount: jackpotData?.bet_amount,
                amount: jackpotData?.bet_amount,
                bet_total_odds: "",
                endCustomerIP: ipv4,
                channelID: 'web',
                slip: '',
                message: jackpotMessage,
                jackpot_id: jackpotData?.jackpot_event_id,
                account: 1,
                msisdn: user?.msisdn,
            };


            let endpoint = "/jp/bet";
            let use_jwt = false
            let method = "POST"

            dispatchRedux(bettingMatchesGames({
                endpoint: endpoint,
                method: method,
                data: payload,
                jackpot: true,
                use_jwt: use_jwt
            }))
                .then((response) => {
                    // Check if the action was fulfilled successfully
                    if (bettingMatchesGames.fulfilled.match(response)) {
                        console.log("response", response)

                        let betslips = getJackpotBetslip()
                        Object.entries(betslips).map(([match_id, match]) => {
                            // let slip=
                            removeFromJackpotSlip(match_id)

                            let match_selector = "jp_"+match.match_id + "_selected";


                            dispatchRedux(resetStateBetslip("jackpotbetslip"))
                            dispatchRedux(removeSelected(match_selector))

                            // dispatchRedux(removeSlipSelection(match_items));

                        });

                        let message = {
                            status: 201,
                            message: response?.payload.message,
                        };

                        Notify(message)


                        const betslip_data = {
                            betslip_type: "jackpotbetslip",
                            data: {}
                        }
                        let udata = {
                            token: user.token
                        }
                        const userValues={
                            udata:udata,
                            user:user
                        }

                        dispatchRedux(userBalance(userValues))
                        dispatchRedux(setMatchBetslip(betslip_data))
                    } else if (bettingMatchesGames.rejected.match(response)) {
                        // const data = {
                        //     event: jackpot ? 'place_jackpot_bet' : live ? 'place_live_bet' : 'place_prematch_bet',
                        //     message: response?.message
                        // }
                        // gaEventTracker("Bet Placement Failed " + response?.message, data)

                        let response_message = response?.error?.message;
                        if (response_message === "" || response_message === undefined) {
                            response_message = response?.error?.message;
                            if (response_message === "" || response_message === undefined) {
                                response_message = "Something went wrong. Please try again later or contact support. 0701 087 777";
                            }
                        }
                        let qmessage = {
                            status: 404,
                            message: response_message,
                        };
                        Notify(qmessage)
                    }
                })
                .catch((error) => {
                    // Handle errors if needed
                });
        });


        const [betSlipMobile, setBetSlipMobile] = useState(false);

        return (
            <div className={'jp-placebet-container'}>
                <div
                    className={`fixed-bottom text-white d-block  shadow-lg betslip-container-mobile jackpot-page-structure ${
                        betSlipMobile ? "d-flex" : "d-none"
                    }`}
                    style={{margin: "auto", marginBottom: "6.5rem"}}
                >
                    <div className={"w-100"} style={{position: "relative"}}>
                        <div
                            className="bet-option-list w-100"
                            id=""
                            style={{position: "absolute", bottom: "0"}}
                        >
                            <div className="bet alu  block-shadow d-flex flex-column">
                                <header>
                                    <div className="betslip-header d-flex justify-content-between">
                                        <span className="col-sm-8 slp">BETSLIP</span>
                                        <span
                                            className="col-sm-2 slip-counter d-flex justify-content-center"
                                            title={"Hide BetSlip"}
                                            onClick={() => setBetSlipMobile(false)}
                                        >
                    <FontAwesomeIcon
                        icon={faTimes}
                        className={"align-self-center"}
                    />
                  </span>
                                    </div>
                                </header>


                            </div>
                        </div>
                    </div>
                </div>

                <table className="mobile-menu jackpot-menu jp-placebet-container">
                    <tbody>
                    <tr className={"info-slip-bets d-flex w-100 justify-content-between px-3"}>

                        <td className={"bet-align-left-jackpot bold"} style={{fontSize: "15px"}}>
                            Bet Amount
                        </td>
                        <td className={"bet-align-left-jackpot bold"} style={{color: "var(--gold)", fontSize: "15px"}}>
                            {jackpot_stake}/=
                        </td>
                    </tr>
                    <tr className={"d-flex w-100 justify-content-between px-4"}>
                        <td className={`d-flex align-items-center bet-align-left w-100`}>
                            <div className="d-flex align-items-center w-100 justify-content-between ">
                                <div className={"d-flex align-items-center flex-column bold jackpot-autopick"}
                                     onClick={randomize} style={{fontSize: "15px"}}>
                                    <FontAwesomeIcon icon={faShuffle} style={{fontSize: "18px", color: "var(--light)"}}
                                                     title={"Auto Pick"}/> Auto Pick
                                </div>
                                <div className="place_jackpot_bet">
                                    <div id="odd-change-text-submit" onClick={handlePlaceBet}>
                                        <div className={"d-flex bet-select-values w-100 mt-2 p-lg-2 p-md-2 py-sm-0"}
                                             style={{whiteSpace: "nowrap"}}>
                                            <Formik>
                                                <Form>
                                                    {/* Your form fields */}
                                                    <SubmitButton title="PLACE BET" className="place-bet-btn jp-button bold "
                                                                  button_size={true} />
                                                </Form>
                                            </Formik>
                                        </div>

                                    </div>
                                </div>
                                <div onClick={handleRemoveAll}>
                                    <FontAwesomeIcon icon={faTrash} style={{fontSize: "18px", color: "var(--light)"}}/>
                                </div>

                            </div>
                        </td>
                    </tr>
                    <tr className={"d-flex w-100 justify-content-between px-3"}>
                        <td className={`w-100 d-flex justify-content-center`}>
                            <div
                                className="d-flex align-items-center gap-2 justify-content-center justify-content-center mt-2  ">
                                <div>
                                <span style={{color: "var(--light)", fontWeight: "600"}}> <FontAwesomeIcon
                                    icon={faExclamationCircle}
                                    style={{color: "var(--betnare-login-button)", fontSize: "12px"}}/> Picked
                                    &nbsp;{getJackpotBetslip() != null
                                        ? <strong>{Object.keys(jackpot_data||getJackpotBetslip())?.length}</strong>
                                        : <strong className={'slip-count-color'}>0</strong>
                                    } /{jackpot_games} Matches
                                </span>

                                </div>
                                <div className={"bold"} style={{color: "var(--gold", fontSize: "15px"}}>
                                    KES&nbsp;
                                    {winnings && Number(winnings).toLocaleString()
                                    }
                                </div>
                            </div>

                        </td>

                    </tr>
                    </tbody>
                </table>
            </div>
        );
    });
export default React.memo(JackpotMenu);
