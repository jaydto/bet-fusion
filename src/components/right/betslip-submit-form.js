import React, {
    useState,
    useEffect,
    useContext,
    useCallback, useRef,
} from "react";
import {Context} from "../../context/store";
import {
    removeFromSlip,
    getBetslip,
    clearSlip,
    clearJackpotSlip,
    formatNumber,
    getJackpotBetslip,
    removeFromJackpotSlip,
} from "../utils/betslip";
import publicIp from "public-ip";
import makeRequest from "../utils/fetch-request";
import "react-toastify/dist/ReactToastify.css";
import {Formik, Form as FormikForm, useFormikContext} from "formik";
import {getFromLocalStorage, setLocalStorage} from "../utils/local-storage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {
    faCut,
    faFireAlt,
    faGift, faQuestionCircle,
    faShare,
} from "@fortawesome/free-solid-svg-icons";
import {Spinner} from "react-bootstrap";
import {Switch} from "@material-ui/core";
const BetslipShareModal = React.lazy(() =>
    import("../modals/BetslipShareModal")
);

const Float = (equation, precision = 4) => {
    return Math.round(equation * 10 ** precision) / 10 ** precision;
};

const BetslipSubmitForm = (props) => {


    const {
        jackpot,
        totalGames,
        totalOdds,
        betslip,
        setBetslipsData,
        jackpotData,
        bonusBet,
    } = props;
    const [hasMultiBetBoost, setHasMultiBetBoost] = useState(true);
    const [multiBoostAmount, setMultiBoostAmount] = useState(0);
    const [showShareModal, setShowShareModal] = useState(false);
    const [betSharePayload, setBetSharePayload] = useState({});
    const [ipv4, setIpv4] = useState(null);
    const [message, setMessage] = useState(null);
    const [state, dispatch] = useContext(Context);
    const [loadingShare, setLoadingShare] = useState(false);

    const [stake, setStake] = useState(jackpot?parseInt(jackpotData?.bet_amount):100);
    const [stakeBoosted, setStakeBoosted] = useState(100);

    const [stakeAfterTax, setStakeAfterTax] = useState(0);
    const [stakeAfterTaxBoosted, setStakeAfterTaxBoosted] = useState(0);

    const [exciseTax, setExciseTax] = useState(0);
    const [exciseTaxBoosted, setExciseTaxBoosted] = useState(0);

    const [withholdingTax, setWithholdingTax] = useState(0);
    const [withholdingTaxBoosted, setWithholdingTaxBoosted] = useState(0);

    const [possibleWin, setPossibleWin] = useState(0);
    const [possibleWinBoosted, setPossibleWinBoosted] = useState(0);

    const [netWin, setNetWin] = useState(0);
    const [netWinBoosted, setNetWinBoosted] = useState(0);

    const [settings, setSettings] = useState(getFromLocalStorage("settings"));
    const [multiBoostMessage, setMultiBoostMessage] = useState("");
    const [awardMultiGift, setAwardMultiGift] = useState(false);

    const [betslipKey, setBetslipKey] = useState("betslip");

    const scrollToRef = useRef(null);

    const [user, setUser] = useState(getFromLocalStorage("user"));

    const updateUserOnHistory = () => {
        if (!user) {
            return false;
        }
        let endpoint = "/v1/balance";
        let udata = {
            token: user.token
        }
        makeRequest({url: endpoint, method: "post", data: udata}).then(([_status, response]) => {
            if (_status == 200) {
                let u = {...user, ...response.user};
                setLocalStorage('user', u);
                setUser(u)
                dispatch({type: "SET", key: "user", payload: u});
                setTimeout(()=>{
                    setMessage(null)
                },5000)
                dispatch({type: "SET", key: "placebet", payload: true});
            }
        });

    };



    useEffect(() => {
        updateUserOnHistory()
    }, [message?.message])

    useEffect(() => {
        if (scrollToRef.current) {
            scrollToRef.current.scrollIntoView({ behavior: 'auto' });
        }
    }, []);

    useEffect(() => {
        if (jackpot) {
            setBetslipKey("jackpotbetslip");
        }
    }, [jackpot]);

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

    const Alert = (props) => {
        let c = message?.status == 201 ? 'success' :message?.status ==421?'warning': 'danger';
        let x_style = {
            float: "right",
            display: "block",
            fontSize: "22px",
            color: "orangered",
            cursor: "pointer",
            padding: "3px",
            position: 'absolute',
            top:'0',
            right:'0'
        }
        return (<>{message?.status &&
            <div role="alert"
                 className={`fade alert alert-${c} show alert-dismissible d-flex justify-content-between align-items-center alert-message-line-height alert-position-betslip-top`}>
                {message.message}
                <span aria-hidden="true" style={x_style} onClick={() => setMessage(null)}>&times;</span>
            </div>}
        </>);

    };
    useEffect(() => {
        ipAddress();
    }, [ipAddress])


    const handlePlaceBet = useCallback((values,
                                        {setSubmitting, resetForm, setStatus, setErrors}) => {
            let bs = Object.values(betslip || []);

            let slipHasOddsChange = false;

            let jackpotMessage = 'jp'


            if (jackpot) {

                bs = bs.sort(function (a, b) {
                    return Number(a.position) - Number(b.position);
                });

            }

            for (let slip of bs) {
                if (jackpot) {
                    jackpotMessage += "#" + slip.bet_pick
                }
                if (slip.prev_odds
                    && slip.prev_odds != slip.odd_value
                    && values.accept_all_odds_change === false) {
                    slipHasOddsChange = true;
                    break;
                }
            }

            if (slipHasOddsChange === true) {
                setMessage({
                    status: 400,
                    message: "Slip has events with changed odds, tick "
                        + " accept odds all odds change box to accept and place bet"
                });
                setSubmitting(false);
                return false;
            }

            let payload = {
                bet_string: 'web',
                app_name: 'desktop',
                possible_win: possibleWin,
                profile_id: values.user_id,
                stake_amount: values.bet_amount,
                amount: values.bet_amount,
                bet_total_odds: totalOdds,
                endCustomerIP: ipv4,
                channelID: 'web',
                slip: bs,
                account: 1,
                msisdn: state?.user?.msisdn,
                accept_all_odds_change: values.accept_all_odds_change
            };
            let endpoint = '/bet';
            let method = "GET"
            let use_jwt = !jackpot
            if (jackpot) {
                payload.message = jackpotMessage
                payload.jackpot_id = jackpotData?.jackpot_event_id
                payload.slip = ''
                endpoint = "/jp/bet"
                method = "POST"
            }

            makeRequest({url: endpoint, method: method, data: payload, use_jwt: use_jwt})
                .then(([status, response]) => {


                    if (status === 200 || status == 201 || status == 204) {
                        setMessage(response);
                        //all is good am be quiet
                        if (jackpot) {
                            clearJackpotSlip();
                            setMessage({
                                status: 201,
                                message: response?.message,
                            });
                        } else {
                            clearSlip();
                        }
                        setBetslipsData(null);
                        dispatch({
                            type: "SET",
                            key: jackpot ? "jackpotbetslip" : "betslip",
                            payload: {},
                        });
                        setLocalStorage('betslip_share_code', null)
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
                        setMessage(qmessage);
                    }
                    setSubmitting(false);
                });
        }
    );

    const updateWinnings = useCallback(() => {
        if (betslip) {
            let stake_after_tax = (Float(stake) / Float(107.5)) * 100;
            let stake_after_tax_boosted =
                ((Float(stake) + Float(multiBoostAmount)) / Float(107.5)) * 100;

            let ext = Float(stake) - Float(stake_after_tax);
            let ext_boosted =
                Float(stake) + Float(multiBoostAmount) - Float(stake_after_tax_boosted);

            let raw_possible_win = Float(stake_after_tax) * Float(totalOdds);
            let boosted_raw_possible_win =
                Float(stake_after_tax_boosted) * Float(totalOdds);

            if (jackpot) {
                raw_possible_win = jackpotData?.jackpot_amount;
            }

            if (raw_possible_win > 500000 && !jackpot) {
                raw_possible_win = 500000;
            }
            if (boosted_raw_possible_win > 500000 && !jackpot) {
                boosted_raw_possible_win = 500000;
            }

            let taxable_amount = Float(raw_possible_win) - Float(stake_after_tax);
            let taxable_amount_boosted =
                Float(boosted_raw_possible_win) - Float(stake_after_tax_boosted);

            let wint = taxable_amount * 0.2;
            let wint_boosted = taxable_amount_boosted * 0.2;

            let nw = raw_possible_win - wint;
            let nw_boosted = boosted_raw_possible_win - wint_boosted;

            setExciseTax(Float(ext, 2));
            setExciseTaxBoosted(Float(ext_boosted, 2));

            setStakeAfterTax(stake_after_tax);
            setStakeAfterTaxBoosted(stake_after_tax_boosted);

            setNetWin(Float(nw, 2));
            setNetWinBoosted(Float(nw_boosted, 2));

            setPossibleWin(Float(raw_possible_win, 2));
            setPossibleWinBoosted(Float(boosted_raw_possible_win, 2));

            setWithholdingTax(Float(wint, 2));
            setWithholdingTaxBoosted(Float(wint_boosted, 2));
        } else {
            setNetWin(0);
            setWithholdingTax(0);
            setExciseTax(0);
            setPossibleWin(0);
            setStakeAfterTax(0);
        }
        if (message && message.status > 299) {
            setMessage(null);
        }
    }, [betslip, stake, totalOdds, multiBoostAmount]);

    const handleRemoveAll = useCallback(() => {
        let betslips =jackpot?getJackpotBetslip():getBetslip();
        Object.entries(betslips).map(([match_id, match]) =>
        {
            // let slip=
            jackpot ? removeFromJackpotSlip(match_id):
                removeFromSlip(match_id);

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
            key: jackpot ? "jackpotbetslip" : "betslip",
            payload: {},
        });
        setMessage(null);
        setLocalStorage('betslip_share_code', null)
    }, []);

    useEffect(() => {
        updateWinnings();
    }, [updateWinnings]);

    const initialValues = {
        bet_amount: jackpot ? jackpotData?.bet_amount : bonusBet ? 100 : 100,
        accept_all_odds_change: true,
        user_id: state?.user?.profile_id,
        total_games: totalGames,
        total_odd: totalOdds,
    };

    const validate = (values) => {
        let errors = {};

        if (!values.user_id) {
            errors.user_id = "Kindly login to proceed";
            setMessage({status: 400, message: errors.user_id});
            return errors;
        }

        if (!values.bet_amount || values.bet_amount < 1) {
            errors.bet_amount = "Enter valid bet amount";
            setMessage({status: 400, message: errors.bet_amount});
            return errors;
        }
        if (!betslip || Object.keys(betslip).length === 0) {
            errors.user_id = "No betlip selected";
            setMessage({status: 400, message: errors.user_id});
            return errors;
        }
        if(jackpot && Object.keys(getJackpotBetslip()).length<jackpotData?.total_games){
            let remaining=Number(jackpotData?.total_games)-Number(Object.keys(getJackpotBetslip()).length);
            errors.jackpot_select=`Please select the ${remaining} remaining jackpot matches`
            setMessage({status:421,message: errors.jackpot_select})
            return errors
        }

        return errors;
    };

    const clean_rep = (str) => {
        str = str.replace(/[^A-Za-z0-9\-]/g, "");
        return str.replace(/-+/g, "-");
    };

    const SubmitButton = (props) => {
        const {title, disabled, ...rest} = props;
        const {isSubmitting} = useFormikContext();
        return (
            <button
                ref={scrollToRef}
                type={"submit"}
                {...rest}
                id={"place_bet_button"}
                style={{padding: "10px", width: "100%",borderRadius: "0.7rem"}}
                className={`${
                    disabled ? "disabled" : ""
                }'bg-warning bold rounded-2 text-dark cursor-pointer'`}
                disabled={isSubmitting || disabled}
                title="Place Bet"
            >
                {isSubmitting ? "Please Wait " : title}{" "}
                <FontAwesomeIcon icon={faFireAlt}/>
            </button>
        );
    };

    const calculateMultiBetBoostAmount = () => {
        let settings = getFromLocalStorage("settings");

        let giftMinGames = Number(settings?.betnareGifts?.giftBoostMinLegs);

        if (totalGames < giftMinGames) {
            setHasMultiBetBoost(false);
        }

        let boost = 0;

        let betslips = getBetslip() || {};

        let odds = Object.values(betslips || [])?.filter(
            (slip) =>
                slip.bet_type !== "1" &&
                Number(slip.odd_value) >= settings?.betnareGifts?.giftBoostMinOdds
        );

        let giftQualificationOdds = odds.length;

        let awardGifts =
            Number(settings?.betnareGifts?.awardGiftBoost) === 1 &&
            Number(state?.user?.gift_balance || 0) > 0;

        setAwardMultiGift(awardGifts);
        if (giftQualificationOdds < giftMinGames) {
            let remainingGames = Number(giftMinGames) - Number(giftQualificationOdds);
            setMultiBoostMessage(
                `Congratulations, you qualify for Nare Gift. Add ${remainingGames} more game${
                    remainingGames > 1 ? "s" : ""
                } with odds of  ${
                    settings?.betnareGifts?.giftBoostMinOdds
                } or above to redeem your gift.`
            );
        } else if (giftQualificationOdds >= giftMinGames) {
            boost = Math.round((20 / 100) * stake);
            if (boost > Number(settings?.betnareGifts?.maxGiftBoostAmount)) {
                boost = Number(settings?.betnareGifts?.maxGiftBoostAmount);
            }
            if (boost > 1) {
                setMultiBoostAmount(boost);
                setHasMultiBetBoost(true);
                let boostedStake = Number(stake) + Number(boost);
                boostedStake = formatNumber(boostedStake);
                setMultiBoostMessage(
                    "Congratulations! we have gifted you KES " +
                    boost +
                    " on your stake. Your new stake is " +
                    boostedStake
                );
            }
        }
    };

    useEffect(() => {
        calculateMultiBetBoostAmount();
    }, [betslip, stake]);

    const encodeBetSlip = () => {
        setLoadingShare(true);

        let endpoint = "/v1/bs-encode";
        makeRequest({url: endpoint, method: "POST", data: betslip}).then(
            ([status, response]) => {
                if (status === 200) {
                    setShowShareModal(true);
                    setBetSharePayload(response);
                    setLoadingShare(false);
                } else {
                    setLoadingShare(false);
                }
            }
        );
    };
    const [showInfo,setShowInfo]=useState()
    const label = { inputProps: { 'aria-label': 'accept_all_odds_change',
            'value':'accept_all_odds_change'} };


    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handlePlaceBet}
            validate={validate}
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize={true}
        >
            {(props) => {
                const {isValid, errors, values, submitForm, setFieldValue} = props;

                const onFieldChanged = (ev) => {

                    let field = ev.target.name;
                    let value = ev.target.type === "checkbox" ? ev.target.checked : ev.target.value;
                    if (field == "bet_amount") {
                        value = value.replace(/[^\d]/g, "");
                        setFieldValue(field, value);
                        setStake(value);
                    } else {
                        setFieldValue(field, value);
                    }
                };
                const UserInfoContainer=()=>{
                    return(
                        <table className={"show-tax-info"}>
                            <tbody>
                            <tr>
                                {/*<td><FontAwesomeIcon icon={faCheck}</td>*/}
                            </tr>
                            {!jackpot && <tr className="bet-win-tr hide-on-affix">
                                <td className={"bet-align-left"}>Possible winnings</td>
                                <td className={"bet-align-right"}>
                                    KES. <span
                                    id="pos_win">{formatNumber(hasMultiBetBoost ? possibleWinBoosted : possibleWin)}</span>
                                </td>
                            </tr>}

                            <tr className="bet-win-tr hide-on-affix">
                                <td className={"bet-align-left"}> Excise Tax (7.5%)</td>
                                <td className={"bet-align-right"}>KES. <span
                                    id="tax">{formatNumber(hasMultiBetBoost ? exciseTaxBoosted : exciseTax)}</span></td>
                            </tr>
                            {jackpot ? (
                                ''
                            ) : (
                                <tr className="bet-win-tr hide-on-affix">
                                    <td className={"bet-align-left"}> Withholding (20%)</td>
                                    <td className={"bet-align-right"}>KES. <span
                                        id="tax">{formatNumber(hasMultiBetBoost ? withholdingTaxBoosted : withholdingTax)}</span>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    )
                }


                const showUserInfo=()=> {
                    setShowInfo(!showInfo)
                }


                return (<FormikForm name="betslip-submit-form">
                    <Alert/>
                    {showShareModal && (
                        <BetslipShareModal
                            visible={showShareModal}
                            payload={betSharePayload}
                            setShowShareModal={setShowShareModal}
                        />
                    )}

                    {totalGames > 0 && (
                        <table className="bet-table w-100 ">
                            <thead>
                            {showInfo&&<UserInfoContainer/>}
                            {!jackpot &&
                            awardMultiGift &&
                            Number(totalGames) > settings?.betnareBonus?.bonusBetLegs ? (
                                <tr className={" slip-message-alert "}>
                                    <td colspan="2" className={' col-2'}  style={{ width: '100%' }}>
                                        <FontAwesomeIcon icon={faGift}/> {multiBoostMessage}
                                    </td>

                                </tr>
                            ) : (
                                <tr></tr>
                            )}
                            </thead>
                            <tbody className={"slip-body"}>



                            {!jackpot && <tr className="hide-on-affix mt-2">
                                <td className={"bet-align-left d-flex align-items-center "}>
                                    TOTAL ODDS
                                    <span onClick={()=>showUserInfo()}>
                                        <FontAwesomeIcon icon={faQuestionCircle} className={"show-values-betslip"}/>
                                    </span>
                                </td>
                                <td className={"bet-align-right"}>
                                    <b>{Float(totalOdds, 2)}</b>
                                </td>
                            </tr>}
                            <tr id="odd-change-text">
                                <td colSpan="2" className={"odd-change-position"}>
                                    <Switch id={"accept-all-odds-change"} {...label} className="odds-change-box" name={"accept_all_odds_change"} checked={values?.accept_all_odds_change}  color="primary" onChange={(e)=>onFieldChanged(e)}/> Accept any odds change
                                </td>
                            </tr>
                            <tr>
                                <td className={"bet-align-left"}>Stake</td>
                                <td className={"bet-align-right"}>
                                    <div id="betting">
                                        {jackpot ?
                                            jackpotData?.bet_amount :
                                            (<input type="text"
                                                    className="bet-select"
                                                    name="bet_amount"
                                                    id="bet_amount"
                                                    value={values.bet_amount}
                                                    onChange={(e) => onFieldChanged(e)}
                                            />)}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2"></td>
                            </tr>

                            <tr className="bet-win-tr hide-on-affix">
                                <td className={"bet-align-left"}>{jackpot ? 'Jackpot Amount' : 'Net Amount'}</td>
                                <td className={"bet-align-right"}>KES. <span
                                    id="net-amount">{formatNumber(jackpot ? jackpotData?.jackpot_amount : (hasMultiBetBoost ? netWinBoosted : netWin))}</span>
                                </td>
                            </tr>
                            {state?.user&&!jackpot&&<tr className="hide-on-affix">
                                <td >NARE BOOST</td>
                                <td className={"bet-align-right"}>
                                    <b>{multiBoostAmount}</b>
                                </td>
                            </tr>
                            }
                            <tr className="bet-win-tr hide-on-affix">
                                <td className={"d-flex"} style={{whiteSpace: "nowrap"}}>
                                    <button
                                        id=""
                                        onClick={() => encodeBetSlip()}
                                        style={{
                                            padding: "9px",
                                            backgroundColor: "linear-gradient(45deg, rgb(63, 154, 209), transparent)",
                                            whiteSpace: "nowrap",
                                            fontSize: "14px",
                                            borderRadius: "0.7rem",
                                        }}
                                        type={"button"}
                                        className="bold btn-secondary  flex-nowrap w-100 d-flex justify-content-center share-button-styling"
                                        title="SHARE BET"
                                    >
                                        Share&nbsp;
                                        {loadingShare ? (
                                            <div className={`text-center  text-white d-block`}>
                                                <Spinner animation={"grow"} size={"sm"}/>
                                            </div>
                                        ) : (
                                            <FontAwesomeIcon icon={faShare}/>
                                        )}
                                    </button>
                                </td>
                            </tr>
                            <tr id="odd-change-text">
                                <td className={""} style={{whiteSpace: "nowrap"}}>
                                    <button
                                        className="bold btn-secondary   bg-secondary w-100"
                                        type="button"
                                        style={{
                                            padding: "10px",
                                            borderRadius: "0.7rem",
                                            fontSize: "14px",
                                        }}
                                        onClick={() => handleRemoveAll()}
                                    >
                                        Clear All <FontAwesomeIcon icon={faCut}/>
                                    </button>
                                </td>
                                <td className={"d-flex"} style={{whiteSpace: "nowrap"}}>
                                    <SubmitButton
                                        id="place_bet_button_submit"
                                        className="place-bet-btn bold "
                                        title="PLACE BET"
                                    ></SubmitButton>
                                </td>

                            </tr>
                            </tbody>
                        </table>
                    )}
                    <input
                        type="hidden"
                        name={"user_id"}
                        id={"user_id"}
                        value={state?.user?.profile_id}
                    />
                    <input
                        type="hidden"
                        name={"total_odd"}
                        id={"total_odd"}
                        value={totalOdds}
                    />
                    <input
                        type="hidden"
                        name={"total_games"}
                        id={"total_games"}
                        value={totalGames}
                    />
                </FormikForm>)
            }}
        </Formik>)

}
export default React.memo(BetslipSubmitForm);