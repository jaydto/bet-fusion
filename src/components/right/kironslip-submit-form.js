import React, {
    useState,
    useEffect,
    useContext,
    useCallback,
    useMemo,
} from "react";
import {Context} from "../../context/store";
import {
    formatNumber, clearKironSlip, getKironSlip, removeFromKironSlip,
} from "../utils/betslip";
import publicIp from "public-ip";
import makeRequest from "../utils/fetch-request";
import "react-toastify/dist/ReactToastify.css";

import {Formik, Form as FormikForm, useFormikContext} from "formik";
import {getFromLocalStorage, setLocalStorage} from "../utils/local-storage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBolt,
    faCheck,
    faCut,
    faFire,
    faFireAlt,
    faGift,
    faShare, faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {Spinner} from "react-bootstrap";
import {getTime} from "../pages/Kiron/periods";

const Float = (equation, precision = 4) => {
    return Math.round(equation * 10 ** precision) / 10 ** precision;
};

const KironslipSubmitForm = (props) => {
    const BetslipShareModal = React.lazy(() =>
        import("../modals/BetslipShareModal")
    );

    const {
        totalGames,
        totalOdds,
        betslip,
        setBetslipsData,
        setExpired,
        kiron
    } = props;
    const [showExpired, setShowExpired]=useState(false)
    const [hasMultiBetBoost, setHasMultiBetBoost] = useState(true);
    const [multiBoostAmount, setMultiBoostAmount] = useState(0);
    const [showShareModal, setShowShareModal] = useState(false);
    const [betSharePayload, setBetSharePayload] = useState({});
    const [ipv4, setIpv4] = useState(null);
    const [message, setMessage] = useState(null);
    const [state, dispatch] = useContext(Context);
    const [loadingShare, setLoadingShare] = useState(false);

    const [stake, setStake] = useState(100);
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

    const [betslipKey, setBetslipKey] = useState("kironbetslip");

    useEffect(() => {
        if (kiron) {
            setBetslipKey("kironbetslip");
        }
    }, [kiron]);

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
        let c =
            message?.status == 201
                ? "success"
                : message?.status == 421
                    ? "warning"
                    : "danger";
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
                {message?.status && (
                    <div
                        role="alert"
                        className={`fade alert alert-${c} show alert-dismissible d-flex justify-content-between align-items-center`}
                    >
                        {message.message}
                        <span
                            aria-hidden="true"
                            style={x_style}
                            onClick={() => setMessage(null)}
                        >
              &times;
            </span>
                    </div>
                )}
            </>
        );
    };
    useEffect(() => {
        ipAddress();
    }, [ipAddress]);

    const handlePlaceBet = useCallback(
        (values, {setSubmitting, resetForm, setStatus, setErrors}) => {
            // let bs = Object.values(betslip || []);

            let slipHasOddsChange = false;

            if (slipHasOddsChange === true) {
                setMessage({
                    status: 400,
                    message:
                        "Slip has events with changed odds, tick " +
                        " accept odds all odds change box to accept and place bet",
                });
                setSubmitting(false);
                return false;
            }


            const betDataArray = kiron&& Object.values(betslip).map(bet => ({
                parent_match_id: parseInt(bet.parent_match_id),
                market_id: parseInt(bet.market_id),
                competition_id: bet.competition_id,
                round_id: bet.round_id,
                outcome_id: bet.outcome_id,
                odd_type: bet.odd_type,
                odd_value: parseFloat(bet.odd_value)
            }));

            let payload ={
                amount: values.bet_amount,
                app_name: "desktop",
                bet_data:betDataArray
            }

            let endpoint ="/v1/nare-league/bet"
            let method = "POST";
            let use_jwt = false ;


            makeRequest({
                url: endpoint,
                method: method,
                data: payload,
                use_jwt: use_jwt,
            }).then(([status, response]) => {
                if (status === 200 || status == 201 || status == 204) {
                    setMessage(response);
                    let  betslips= getKironSlip()
                    Object.entries(betslips).map(([match_id, match]) => {
                        removeFromKironSlip(match_id)
                        let match_selector = match?.parent_match_id+"_selectedK"
                        let ucn =clean_rep(
                            match?.parent_match_id + "" +match?.market_id +""+match?.odd_key)


                        dispatch({type: "SET", key: match_selector, payload: "remove." + ucn});

                    });
                        clearKironSlip()
                        setMessage({
                            status: 201,
                            message: response?.message,
                        });
                    setBetslipsData(null);
                    dispatch({
                        type: "SET",
                        key: "kironbetslip",
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


            if (raw_possible_win > 500000 ) {
                raw_possible_win = 500000;
            }
            if (boosted_raw_possible_win > 500000 ) {
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
        let  betslips= getKironSlip()
        Object.entries(betslips).map(([match_id, match]) => {
          removeFromKironSlip(match_id)
            let match_selector = match?.parent_match_id+"_selectedK"
            let ucn =clean_rep(
                    match?.parent_match_id + "" +match?.market_id +""+match?.odd_key)


            dispatch({type: "SET", key: match_selector, payload: "remove." + ucn});
            // dispatch({type: "SET", key: "betslip", payload: slip});
        });
        clearKironSlip()
        setMessage(null);
        setBetslipsData(null)
        dispatch({
            type: "SET",
            key: "kironbetslip",
            payload: {},
        });
    }, []);

    // const showRemoveExpired= useCallback(() =>{
    //     let  betslips= getKironSlip()||{}
    //
    //    const data= Object.entries(betslips).map(([match_id, match]) => {
    //         let start_time=match?.start_time
    //         console.log("diff_match_end_start_time",match)
    //         let gettime = getTime(start_time)
    //         console.log("diff_match_end_time",gettime)
    //         let timePeriod = new Date(Date.parse(`${new Date().toDateString()} ${gettime}`));
    //         let firstRound = timePeriod.getTime();
    //         let now = new Date().getTime();
    //         let diff = (firstRound - now);
    //         let initialTime = Math.floor(diff / 1000);
    //         let parent_match_id=match?.parent_match_id
    //        return initialTime
    //
    //     });
    //
    //     let expired=[]
    //     expired.push(...data)
    //     const status=expired.some(exp=>exp<10
    //     )
    //
    //     setShowExpired(status)
    //
    //
    // },[]);

    const showRemoveExpired = useCallback(() => {
        let betslips = getKironSlip() || {};

        const data = Object.entries(betslips).map(([match_id, match]) => {
            let start_time = match?.start_time;
            let gettime = getTime(start_time);
            let timePeriod = new Date(Date.parse(`${new Date().toDateString()} ${gettime}`));
            let firstRound = timePeriod.getTime();
            let now = new Date().getTime();
            let diff = (firstRound - now);
            let initialTime = Math.floor(diff / 1000);
            let parent_match_id;
            if(initialTime<10){
                 parent_match_id= match?.parent_match_id;
            }

            return { parent_match_id, initialTime };
        });

        let parentMatchId = data.map((item) => item.parent_match_id).filter(item => item !== undefined);

        let initialTime = data.map((item) => item.initialTime);

        setExpired(parentMatchId)

        const status = initialTime.some((exp) => exp < 10);
        setShowExpired(status);

        return { parentMatchId, initialTime };
    }, []);

    useEffect(()=>{

        showRemoveExpired()
    },[Date.now()])



    const handleRemoveExpired= useCallback(() =>{
        let  betslips= getKironSlip()

        Object.entries(betslips).map(([match_id, match]) => {
            let start_time=match?.start_time
            let gettime = getTime(start_time)

            let timePeriod = new Date(Date.parse(`${new Date().toDateString()} ${gettime}`));
            let firstRound = timePeriod.getTime();
            let now = new Date().getTime();
            let diff = (firstRound - now);
            let initialTime = Math.floor(diff / 1000);
            // let seconds = initialTime % 60;

            if(initialTime<10){
                let match_selector = match?.parent_match_id+"_selectedK"
                let ucn =clean_rep(
                    match?.parent_match_id + "" +match?.market_id +""+match?.odd_key)
                dispatch({type: "SET", key: match_selector, payload: "remove." + ucn});
                let betslip=removeFromKironSlip(match?.parent_match_id)
                dispatch({ type: "SET", key: 'kironbetslip', payload: betslip });
            }


        });
        // clearKironSlip()
        // setMessage(null);
        // setBetslipsData(null)
        // dispatch({
        //     type: "SET",
        //     key: "kironbetslip",
        //     payload: {},
        // });
    },[]);



    useEffect(() => {
        updateWinnings();
    }, [updateWinnings]);

    const initialValues = {
        bet_amount: 100,
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
                type={"submit"}
                {...rest}
                id={"place_bet_button_nare"}
                style={{padding: "7px", width: "100%",borderRadius: "0.7rem"}}
                className={`${
                    disabled ? "disabled" : ""
                }'bg-warning bold text-dark cursor-pointer'`}
                disabled={isSubmitting || disabled}
                title="Place Bet"
            >
                {isSubmitting ? "Please Wait " : title}{" "}
                <FontAwesomeIcon icon={faFireAlt}/>
            </button>
        );
    };


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
                    let value =
                        ev.target.type === "checkbox" ? ev.target.checked : ev.target.value;
                    if (field == "bet_amount") {
                        value = value.replace(/[^\d]/g, "");
                        setFieldValue(field, value);
                        setStake(value);
                    } else {
                        setFieldValue(field, value);
                    }
                };

                return (
                    <FormikForm name="betslip-submit-form">
                        <Alert/>
                        {
                        awardMultiGift &&
                        Number(totalGames) > settings?.betnareBonus?.bonusBetLegs ? (
                            <div className={"alert alert-success"}>
                                <FontAwesomeIcon icon={faGift}/> {multiBoostMessage}
                            </div>
                        ) : (
                            <></>
                        )}
                        {totalGames > 0 && (
                            <table className="bet-table">
                                {showExpired&&<td colSpan={'100%'} className={""} style={{whiteSpace: "nowrap"}}>
                                    <button
                                        className="bold  w-100"
                                        type="button"
                                        style={{
                                            padding: "6px",
                                            borderRadius: "0.7rem",
                                            fontSize: "14px",
                                            background: "#CC5500",
                                        }}
                                        onClick={() => handleRemoveExpired()}
                                    >
                                       Remove Expired &nbsp;<FontAwesomeIcon icon={faTrash}/>
                                    </button>
                                </td>}
                                {(
                                    <tr className="hide-on-affix">
                                        <td>TOTAL ODDS</td>
                                        <td>
                                            <b>{Float(totalOdds, 2)}</b>
                                        </td>
                                    </tr>
                                )}

                                <tr>
                                    <td>Stake</td>
                                    <td>
                                        <div id="betting">
                                            {
                                                <input
                                                    type="text"
                                                    className="bet-select"
                                                    name="bet_amount"
                                                    id="bet_amount"
                                                    value={values.bet_amount}
                                                    onChange={(e) => onFieldChanged(e)}
                                                />
                                            }
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2"></td>
                                </tr>
                                { (
                                    <tr className="bet-win-tr hide-on-affix">
                                        <td>Possible winnings</td>
                                        <td>
                                            KES.{" "}
                                            <span id="pos_win">
                        {formatNumber(
                            hasMultiBetBoost ? possibleWinBoosted : possibleWin
                        )}
                      </span>
                                        </td>
                                    </tr>
                                )}

                                <tr className="bet-win-tr hide-on-affix">
                                    <td> Excise Tax (7.5%)</td>
                                    <td>
                                        KES.{" "}
                                        <span id="tax">
                      {formatNumber(
                          hasMultiBetBoost ? exciseTaxBoosted : exciseTax
                      )}
                    </span>
                                    </td>
                                </tr>
                                { (
                                    <tr className="bet-win-tr hide-on-affix">
                                        <td> Withholding (20%)</td>
                                        <td>
                                            KES.{" "}
                                            <span id="tax">
                        {formatNumber(
                            hasMultiBetBoost
                                ? withholdingTaxBoosted
                                : withholdingTax
                        )}
                      </span>
                                        </td>
                                    </tr>
                                )}
                                <tr className="bet-win-tr hide-on-affix">
                                    <td>{"Nare Amount"}</td>
                                    <td>
                                        KES.{" "}
                                        <span id="net-amount">
                      {formatNumber(
                           hasMultiBetBoost ? netWinBoosted : netWin
                      )}
                    </span>
                                    </td>
                                </tr>

                                <tr id="odd-change-text">
                                    <td className={"d-flex"} style={{whiteSpace: "nowrap"}}>
                                        <SubmitButton
                                            id="place_bet_button_nare_submit"
                                            className="place-bet-btn bold "
                                            title="PLACE BET"
                                        ></SubmitButton>
                                    </td>
                                    <td className={""} style={{whiteSpace: "nowrap"}}>
                                        <button
                                            className="bold btn-secondary   bg-secondary w-100"
                                            type="button"
                                            style={{
                                                padding: "5px",
                                                borderRadius: "0.7rem",
                                                fontSize: "14px",
                                            }}
                                            onClick={() => handleRemoveAll()}
                                        >
                                            Clear All <FontAwesomeIcon icon={faCut}/>
                                        </button>
                                    </td>
                                </tr>
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
                    </FormikForm>
                );
            }}
        </Formik>
    );
};
export default React.memo(KironslipSubmitForm);
