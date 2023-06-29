import React, {useCallback, useContext, useEffect, useState} from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faExclamation,
    faExclamationCircle,
    faRedo,
    faShuffle,
    faTimes,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";

import {
    clearJackpotSlip,
    clearSlip,
    getBetslip,
    getJackpotBetslip,
    removeFromJackpotSlip,
    removeFromSlip
} from "../utils/betslip";
import {Context} from "../../context/store";
import {SubmitButton} from "../right/betslip-submit-form";
import {Form, Formik} from "formik";
import {getFromLocalStorage, setLocalStorage} from "../utils/local-storage";
import makeRequest from "../utils/fetch-request";
import publicIp from "public-ip";
import Notify from "../utils/Notify";
import {ToastContainer} from "react-toastify";

const MobileMenu = React.memo(
    (props) => {
        const {jackpotData, matches} = props
        const [state,dispatch]=useContext(Context)
        const [ipv4, setIpv4] = useState(null);
        const [selections, setSelections] = useState([])
        const randomize = async () => {
            matches?.data?.forEach((match, index) => {
                let teams = [match?.home_team, 'draw', match?.away_team]
                let team = teams[Math.floor(Math.random() * teams.length)].replaceAll(" ", "")
                while (selections[index] === team) {
                    team = teams[Math.floor(Math.random() * teams.length)].replaceAll(" ", "")
                }
                selections[index] = team
                let selection = match?.match_id.toString() + match?.sub_type_id.toString() +
                    team.toString()
                document.querySelectorAll('button[custom="' + selection + '"]').forEach((el) => {
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
        const ipAddress = useCallback(async () => {
            let ip = await publicIp
                .v4({
                    fallbackUrls: ["https://ifconfig.co/ip"],
                })
                .then((result) => {
                    return result;
                });

            setIpv4(ip);
        }, [ipv4]);

        useEffect(() => {
            ipAddress();
        }, [ipAddress])


        let winnings = jackpotData?.jackpot_amount;
        let jackpot_stake = jackpotData?.bet_amount;
        let jackpot_games = jackpotData?.total_games;

        const handleRemoveAll = useCallback(() => {
            let betslips = getJackpotBetslip()
            Object.entries(betslips).map(([match_id, match]) => {
                // let slip=
                removeFromJackpotSlip(match_id)

                let match_selector = match.match_id + "_selected";
                let ucn = clean_rep(
                    match.match_id
                    + "" + match.sub_type_id
                    + (match.bet_pick)
                );

                dispatch({type: "SET", key: match_selector, payload: "remove." + ucn});
            });
            dispatch({
                type: "SET",
                key: "jackpotbetslip" ,
                payload: {},
            });

            // setLocalStorage("winnings",null)
            setLocalStorage('betslip_share_code', null)
        }, []);

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
                profile_id: state?.user?.profile_id||getFromLocalStorage("user")?.profile_id,
                stake_amount: jackpotData?.bet_amount,
                amount: jackpotData?.bet_amount,
                bet_total_odds: "",
                endCustomerIP: ipv4,
                channelID: 'web',
                slip: '',
                message:jackpotMessage,
                jackpot_id:jackpotData?.jackpot_event_id,
                account: 1,
                msisdn: state?.user?.msisdn||getFromLocalStorage("user")?.msisdn,
            };


            let endpoint="/jp/bet" ;
            let use_jwt = false
            let method = "POST"


            makeRequest({url: endpoint, method: method, data: payload, use_jwt: use_jwt})
                .then(([status, response]) => {


                    if (status === 200 || status == 201 || status == 204) {
                        // setMessage(response);


                            clearJackpotSlip();
                        let message = {
                            status: 201,
                            message: response?.message,
                        };

                        Notify(message)

                        // setBetslipsData(null);
                        dispatch({
                            type: "SET",
                            key:  "jackpotbetslip" ,
                            payload: {},
                        });

                    } else {
                        let response_message = response?.message;
                        if (response_message === "" || response_message === undefined) {
                            response_message = response?.error;
                            if (response_message === "" || response_message === undefined) {
                                response_message =
                                    "Something went wrong. Please try again later or contact support. 0701 087 777";
                            }
                        }
                        let qmessage = {
                            status: status,
                            message: response_message,
                        };
                        Notify(qmessage)
                        // setMessage(qmessage);
                    }
                    // setSubmitting(false);
                });
        });

        const [betSlipMobile, setBetSlipMobile] = useState(false);





        return (
            <div>
                <div
                    className={`fixed-bottom text-white d-block  shadow-lg betslip-container-mobile ${
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

                <table className="mobile-menu jackpot-menu">
                    <tbody>
                    <tr className={"info-slip-bets d-flex w-100 justify-content-between px-3"}>

                        <td className={"bet-align-left"}>
                            Total Stakes
                        </td>
                        <td className={"bet-align-right"}>
                            {jackpot_stake}
                        </td>
                    </tr>
                    <tr className={"d-flex w-100 justify-content-between px-4"}>
                        <td className={`d-flex align-items-center bet-align-left w-100`}>
                            <div className="d-flex align-items-center w-100 justify-content-between ">
                                <div className={"d-flex align-items-center flex-column"} onClick={randomize}>
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
                                                    <SubmitButton title="Place Bet" className="place-bet-btn bold "
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
                                        ? <strong>{Object.keys(getJackpotBetslip())?.length}</strong>
                                        : <strong className={'slip-count-color'}>0</strong>
                                    } /{jackpot_games} Matches
                                </span>

                                </div>
                                <div>
                                    Ksh
                                    {
                                        winnings
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
export default React.memo(MobileMenu);
