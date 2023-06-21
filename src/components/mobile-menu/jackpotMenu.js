import React, { useContext,  useState} from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faExclamation,
    faExclamationCircle,
    faRedo,
    faShuffle,
    faTimes,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { getJackpotBetslip} from "../utils/betslip";
import {Context} from "../../context/store";
import {SubmitButton} from "../right/betslip-submit-form";
import {Form, Formik} from "formik";

const MobileMenu = React.memo(
    (props) => {
    const {jackpotData}=props


    const [betSlipMobile, setBetSlipMobile] = useState(false);

    const [state, ] = useContext(Context);

    let  winnings=jackpotData?.jackpot_amount;
    let  jackpot_stake=jackpotData?.bet_amount;
    let  jackpot_games=jackpotData?.total_games;


    return (
        <div>
            <div
                className={`fixed-bottom text-white d-block  shadow-lg betslip-container-mobile ${
                    betSlipMobile ? "d-flex" : "d-none"
                }`}
                style={{ margin: "auto", marginBottom: "6.5rem" }}
            >
                <div className={"w-100"} style={{ position: "relative" }}>
                    <div
                        className="bet-option-list w-100"
                        id=""
                        style={{ position: "absolute", bottom: "0" }}
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
                            <div className={"d-flex align-items-center flex-column"}>
                                <FontAwesomeIcon icon={faShuffle} style={{fontSize:"18px",color:"var(--light)"}} title={"Auto Pick"}/> Auto Pick
                            </div>
                            <div className="place_jackpot_bet">
                                <div id="odd-change-text-submit">
                                    <div className={"d-flex bet-select-values w-100 mt-2 p-lg-2 p-md-2 py-sm-0"}  style={{whiteSpace: "nowrap"}}>
                                        <Formik>
                                            <Form>
                                                {/* Your form fields */}
                                                <SubmitButton title="Place Bet"  className="place-bet-btn bold " button_size={true}/>
                                            </Form>
                                        </Formik>
                                    </div>

                                </div>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faTrash} style={{fontSize:"18px",color:"var(--red)"}}/>
                            </div>

                        </div>
                    </td>
                </tr>
                <tr className={"d-flex w-100 justify-content-between px-3"}>
                    <td className={`w-100 d-flex justify-content-center`}>
                        <div className="d-flex align-items-center gap-2 justify-content-center justify-content-center mt-2  ">
                            <div>
                                <span style={{color:"var(--light)",fontWeight:"600"}}> <FontAwesomeIcon icon={faExclamationCircle} style={{color:"var(--betnare-login-button)", fontSize:"12px"}}/> Picked
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
