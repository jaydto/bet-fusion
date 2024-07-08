import React, {useCallback, useContext, useEffect, useRef, useState,} from "react";
import {StoreContext} from "../../context/store";
import {clearKironSlip, formatNumber, getKironSlip, removeFromKironSlip,} from "../utils/betslip";
import makeRequest from "../utils/fetch-request";
import "react-toastify/dist/ReactToastify.css";

import {Form as FormikForm, Formik, useFormikContext} from "formik";
import {getFromLocalStorage, setLocalStorage} from "../utils/local-storage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBolt, faFireAlt, faGift, faTrash,} from "@fortawesome/free-solid-svg-icons";

import {getTime} from "../pages/Kiron/periods";
import {useNavigate} from "react-router-dom";
import useWindowDimensions from "../header/Dimensions";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import {userBalance} from "../../redux/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {setState as setMatchBetslipOptions} from "../../redux/bettingSlice";

const Float = (equation, precision = 4) => {
    return Math.round(equation * 10 ** precision) / 10 ** precision;
};

const KironslipSubmitForm = React.memo(
    (props) => {
        const {
            totalGames,
            totalOdds,
            betslip,
            setBetslipsData,
            setExpired,
            kiron
        } = props;
        const [showExpired, setShowExpired] = useState(false)
        const [hasMultiBetBoost, setHasMultiBetBoost] = useState(true);
        const [multiBoostAmount, setMultiBoostAmount] = useState(0);
        const [expiredParentMatchIds, setExpiredParentMatchIds] = useState([]);

        // const [showShareModal, setShowShareModal] = useState(false);
        // const [betSharePayload, setBetSharePayload] = useState({});
        // const [ipv4, setIpv4] = useState(null);
        const [message, setMessage] = useState(null);
        const {state, dispatch} = useContext(StoreContext);
        // const [loadingShare, setLoadingShare] = useState(false);

        const [stake, setStake] = useState(100);
        // const [stakeAfterTax, setStakeAfterTax] = useState(0);
        // const [stakeAfterTaxBoosted, setStakeAfterTaxBoosted] = useState(0);
        const {width} = useWindowDimensions();

        // const [exciseTax, setExciseTax] = useState(0);
        // const [exciseTaxBoosted, setExciseTaxBoosted] = useState(0);

        // const [withholdingTax, setWithholdingTax] = useState(0);
        // const [withholdingTaxBoosted, setWithholdingTaxBoosted] = useState(0);

        const [possibleWin, setPossibleWin] = useState(0);
        const [possibleWinBoosted, setPossibleWinBoosted] = useState(0);

        // const [netWin, setNetWin] = useState(0);
        // const [netWinBoosted, setNetWinBoosted] = useState(0);

        const [settings, ] = useState(getFromLocalStorage("settings"));
        const [multiBoostMessage, setMultiBoostMessage] = useState("");
        const [awardMultiGift, setAwardMultiGift] = useState( Number(settings?.kironGifts?.awardGiftBoost) === 1);

        // const [betslipKey, setBetslipKey] = useState("kironbetslip");
        const dispatchRedux=useDispatch()
        const userData=useSelector((state)=>state.auth.user)
        const betslip_options=useSelector((state)=>state.betting.kiron_betslip_options)


        const [user, setUser] = useState(getFromLocalStorage("user"));
        useEffect(()=>{
            setUser(userData||getFromLocalStorage("user"))
        },[userData])

        const updateUserOnHistory = () => {
            if (!user) {
                return false;
            }
            let udata = {
                token: user.token
            }
            const userValues={
                udata:udata,
                user:user
            }

            dispatchRedux(userBalance(userValues))

        };


        useEffect(() => {
            updateUserOnHistory()
        }, [message?.message])

        // useEffect(() => {
        //     if (kiron) {
        //         setBetslipKey("kironbetslip");
        //     }
        // }, [kiron]);

        const scrollToRef = useRef(null);

        useEffect(() => {
            if (scrollToRef.current) {
                scrollToRef.current.scrollIntoView({behavior: 'auto'});
            }
        }, []);

        // const ipAddress = useCallback(async () => {
        //     try {
        //         let ip = await publicIp({
        //             fallbackUrls: ["https://ifconfig.co/ip"],
        //         });
        //
        //         setIpv4(ip);
        //     } catch (error) {
        //         console.error("Error getting IPv4 address:", error);
        //     }
        //
        //
        // }, [ipv4]);


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
                            style={{lineHeight:'1.2'}}
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
        // useEffect(() => {
        //     ipAddress();
        // }, [ipAddress]);
        const gaEventTracker = useAnalyticsEventTracker('Place Kiron Bet')

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


                const betDataArray = kiron && Object.values(betslip).map(bet => ({
                    parent_match_id: parseInt(bet.parent_match_id),
                    market_id: parseInt(bet.market_id),
                    competition_id: bet.competition_id,
                    round_id: bet.round_id,
                    outcome_id: bet.outcome_id,
                    odd_type: bet.odd_type,
                    odd_value: parseFloat(bet.odd_value)
                }));

                let payload = {
                    bet_string: 'web',
                    channelID: 'web',
                    app_name: width <= 767 ? "mobile":width>767&&width<=967? "tablet":'desktop',
                    amount: values.bet_amount,
                    bet_data: betDataArray
                }

                let endpoint = "/v1/nare-league/bet"
                let method = "POST";
                let use_jwt = false;

                makeRequest({
                    url: endpoint,
                    method: method,
                    data: payload,
                    use_jwt: use_jwt,
                }).then(([status, response]) => {
                    if (status === 200 || status == 201 || status == 204) {
                        const data = {
                            event: 'place_kiron_bet',
                            data: payload
                        }
                        gaEventTracker("Kiron Bet Placed", data)
                        setMessage(response);
                        let betslips = getKironSlip()
                        Object.entries(betslips || {})?.map(([match_id, match]) => {
                            removeFromKironSlip(match_id)
                            let match_selector = match?.parent_match_id + "_selectedK"
                            let ucn = clean_rep(
                                match?.parent_match_id + "" + match?.market_id + "" + match?.odd_key)


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
                        return width < 991 ? navigate(-1) : "/"
                    } else {
                        const data = {
                            event: 'place_kiron_bet',
                            message: response?.message
                        }
                        gaEventTracker("Kiron Bet Failed", data)
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
                // let stake_after_tax = (Float(stake) / Float(112.5)) * 100;
                let stake_after_tax = Float(stake);
                // let stake_after_tax_boosted =
                //     ((Float(stake) + Float(multiBoostAmount)) / Float(112.5)) * 100;
                let stake_after_tax_boosted =
                    (Float(stake) + Float(multiBoostAmount));

                // let ext = Float(stake) - Float(stake_after_tax);
                // let ext_boosted =
                //     Float(stake) + Float(multiBoostAmount) - Float(stake_after_tax_boosted);

                let raw_possible_win = Float(stake_after_tax) * Float(totalOdds);
                let boosted_raw_possible_win =
                    Float(stake_after_tax_boosted) * Float(totalOdds);


                if (raw_possible_win > 500000) {
                    raw_possible_win = 500000;
                }
                if (boosted_raw_possible_win > 500000) {
                    boosted_raw_possible_win = 500000;
                }

                // let taxable_amount = Float(raw_possible_win) - Float(stake_after_tax);
                // let taxable_amount_boosted =
                //     Float(boosted_raw_possible_win) - Float(stake_after_tax_boosted);

                // let wint = taxable_amount * 0.2;
                // let wint_boosted = taxable_amount_boosted * 0.2;

                // let nw = raw_possible_win - wint;
                // let nw_boosted = boosted_raw_possible_win - wint_boosted; 
                let nw = raw_possible_win;
                let nw_boosted = boosted_raw_possible_win ;

                // setExciseTax(Float(ext, 2));
                // setExciseTaxBoosted(Float(ext_boosted, 2));

                // setStakeAfterTax(stake_after_tax);
                // setStakeAfterTaxBoosted(stake_after_tax_boosted);

                // setNetWin(Float(nw, 2));
                // setNetWinBoosted(Float(nw_boosted, 2));

                dispatchRedux(setMatchBetslipOptions('kiron_betslip_options', {...betslip_options,...{netWin:Float(nw,2),netWinBoosted:Float(nw_boosted,2) }}))


                setPossibleWin(Float(raw_possible_win, 2));
                setPossibleWinBoosted(Float(boosted_raw_possible_win, 2));

                // setWithholdingTax(Float(wint, 2));
                // setWithholdingTaxBoosted(Float(wint_boosted, 2));
            } else {
                // setNetWin(0);
                // setWithholdingTax(0);
                // setExciseTax(0);
                setPossibleWin(0);
                // setStakeAfterTax(0);
            }
            if (message && message.status > 299) {
                setMessage(null);
            }
        }, [betslip, stake, totalOdds, multiBoostAmount]);

        const navigate = useNavigate()
        const handleRemoveAll = useCallback(() => {
            let betslips = getKironSlip()
            Object.entries(betslips || {})?.map(([match_id, match]) => {
                removeFromKironSlip(match_id)
                let match_selector = match?.parent_match_id + "_selectedK"
                let ucn = clean_rep(
                    match?.parent_match_id + "" + match?.market_id + "" + match?.odd_key)


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
            return navigate("/")
        }, []);

        // Todo check and create an array for my function 
        // const showRemoveExpired = useCallback(() => {
        //     let betslips = getKironSlip() || {};

        //     const data = Object.entries(betslips || {})?.map(([match_id, match]) => {
        //         let start_time = match?.start_time;
        //         let gettime = getTime(start_time);
        //         let timePeriod = new Date(Date.parse(`${new Date().toDateString()} ${gettime}`));
        //         let firstRound = timePeriod.getTime();
        //         let now = new Date().getTime();
        //         let diff = (firstRound - now);
        //         let initialTime = Math.floor(diff / 1000);
        //         let parent_match_id;
        //         if (initialTime < 10) {
        //             parent_match_id = match?.parent_match_id;
        //         }

        //         return {parent_match_id, initialTime};
        //     });

        //     let parentMatchId = data.map((item) => item.parent_match_id).filter(item => item !== undefined);
        //     setExpiredParentMatchIds(parentMatchId);


        //     let initialTime = data.map((item) => item.initialTime);

        //     setExpired(parentMatchId)

        //         const status = initialTime.some((exp) => exp < 10);
        //     setShowExpired(status);

        //     return {parentMatchId, initialTime};
        // }, []);

        // useEffect(() => {

        //     showRemoveExpired()
        // }, [Date.now()])


    const showRemoveExpired = useCallback(() => {
        let betslips = getKironSlip() || {};

        const data = Object.entries(betslips || {}).map(([match_id, match]) => {
            let start_time = match?.start_time;
            let gettime = getTime(start_time);
            let timePeriod = new Date(Date.parse(`${new Date().toDateString()} ${gettime}`));
            let firstRound = timePeriod.getTime();
            let now = new Date().getTime();
            let diff = (firstRound - now);
            let initialTime = Math.floor(diff / 1000);
            let parent_match_id;
            if (initialTime < 10) {
                parent_match_id = match?.parent_match_id;
            }

            return { parent_match_id, initialTime };
        });

        let parentMatchId = data.map((item) => item.parent_match_id).filter(item => item !== undefined);


        // Update expiredParentMatchIds only if it has changed
        if (JSON.stringify(parentMatchId) !== JSON.stringify(expiredParentMatchIds)) {
            setExpiredParentMatchIds(parentMatchId);
            setExpired(parentMatchId)

        }

        const status = data.some((item) => item.initialTime < 10);
        setShowExpired(status);

        return { parentMatchId, initialTime: data.map(item => item.initialTime) };
    }, [getKironSlip, getTime, setExpiredParentMatchIds, setShowExpired, expiredParentMatchIds]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            showRemoveExpired();
        }, 1000); // Update every second

        return () => clearInterval(intervalId);
    }, [showRemoveExpired]);




        const handleRemoveExpired = useCallback(() => {
            let betslips = getKironSlip()

            Object.entries(betslips || {})?.map(([match_id, match]) => {
                let start_time = match?.start_time
                let gettime = getTime(start_time)

                let timePeriod = new Date(Date.parse(`${new Date().toDateString()} ${gettime}`));
                let firstRound = timePeriod.getTime();
                let now = new Date().getTime();
                let diff = (firstRound - now);
                let initialTime = Math.floor(diff / 1000);
                // let seconds = initialTime % 60;

                if (initialTime < 10) {
                    let match_selector = match?.parent_match_id + "_selectedK"
                    let ucn = clean_rep(
                        match?.parent_match_id + "" + match?.market_id + "" + match?.odd_key)
                    dispatch({type: "SET", key: match_selector, payload: "remove." + ucn});
                    let betslip = removeFromKironSlip(match?.parent_match_id)
                    dispatch({type: "SET", key: 'kironbetslip', payload: betslip});
                    if (Object.keys(betslip).length === 0) {
                        return navigate('/')
                    }

                }


            });
            // clear the expired parent matchids on removal
            setExpiredParentMatchIds([])
            setExpired([])

        }, []);


        useEffect(() => {
            updateWinnings();
        }, [updateWinnings]);

        const initialValues = {
            bet_amount: 100,
            accept_all_odds_change: true,
            user_id: user?.profile_id,
            total_games: totalGames,
            total_odd: totalOdds,
        };

        const validate = (values) => {
            let errors = {};

            if (!values.user_id) {
                errors.user_id = "Kindly login to proceed";
                setMessage({status: 400, message: errors.user_id});
                return navigate('/login');
            }

            if (!values.bet_amount || values.bet_amount < 10) {
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

        const calculateMultiBetBoostAmount = () => {
            let settings = getFromLocalStorage("settings");

            let giftMinGames = Number(settings?.kironGifts?.giftBoostMinLegs);

            let betslips = getKironSlip() || {};

             // Filter out expired matches based on your array of expired matches
            const validBetslips = Object.entries(betslips || {}).filter(([match_id, match]) => !expiredParentMatchIds.includes(match_id));

           

            if (validBetslips.length < giftMinGames) {
                
                setHasMultiBetBoost(false);

                dispatchRedux(setMatchBetslipOptions('kiron_betslip_options', {...betslip_options,...{hasBoost:false,  alert_slip_color:'not_qualified'}}))


            }

            let boost = 0;


            // let odds = Object.values(validBetslips || [])?.filter(
            //     (slip) =>
            //         slip.bet_type !== "1" &&
            //         Number(slip.odd_value) >= settings?.kironGifts?.giftBoostMinOdds
            // );
            let odds = validBetslips?.filter(
                ([match_id, slip]) => {
                    return slip.bet_type !== "1" && Number(slip.odd_value) >= settings?.kironGifts?.giftBoostMinOdds;
                }
            );

           

            let giftQualificationOdds = odds.length;

            console.log("information oon nare boost is here ")


            let awardGifts =
                Number(settings?.kironGifts?.awardGiftBoost) === 1 &&
                Number(user?.gift_balance || 0) > 0;

            setAwardMultiGift(awardGifts);
            if(!awardGifts){
                setMultiBoostAmount(0)
                setMultiBoostMessage("")
                dispatchRedux(setMatchBetslipOptions('kiron_betslip_options',0))

            }
            else if (Number(giftQualificationOdds) < Number(giftMinGames)) {
                let remainingGames = Number(giftMinGames) - Number(giftQualificationOdds);

                dispatchRedux(setMatchBetslipOptions('kiron_betslip_options', {...betslip_options,...{remaining_games:remainingGames, hasBoost:false, alert_slip_color:'not_qualified', multiboostmessage: ` Add ${remainingGames} more game${
                            remainingGames > 1 ? "s" : ""
                        } with odds of  ${
                            settings?.kironGifts?.giftBoostMinOdds
                        } or above to boost your winnings.`}}))


                setMultiBoostMessage(
                    `Congratulations, you qualify for a Gift. Add ${remainingGames} more game${
                        remainingGames > 1 ? "s" : ""
                    } with odds of  ${
                        settings?.kironGifts?.giftBoostMinOdds
                    } or above to redeem your gift.`
                );

                setMultiBoostAmount(0)



            }
            else if (Number(giftQualificationOdds) >= Number(giftMinGames)) {
                boost = ((Number(settings?.kironGifts?.giftBoostPercentage)||20)/ 100) * stake;
                console.log("boost information", boost)

                if(isNaN(boost)){
                    boost=0
                }

                if (boost >= Number(settings?.kironGifts?.maxGiftBoostAmount)) {
                    boost = Number(settings?.kironGifts?.maxGiftBoostAmount);
                }
                if (boost >= 1) {
                    setMultiBoostAmount(boost);
                    setHasMultiBetBoost(true);
                    console.log("boost information", boost)

                    let boostedStake = Number(stake) + Number(boost);
                    boostedStake = formatNumber(boostedStake);
                    dispatchRedux(setMatchBetslipOptions('kiron_betslip_options', {...betslip_options,...{hasBoost:true, alert_slip_color: 'valid', remaining_games: 0, multiboostmessage:"Congratulations! we have gifted you KES " +
                                boost +
                                " on your stake. Your new stake is " +
                                boostedStake }}))
                    setMultiBoostMessage(
                        "Congratulations! we have boosted you stake from KES " +
                        stake +
                        " to " +
                        boostedStake
                    );


                }
                else{
                    setMultiBoostAmount(boost);
                    setHasMultiBetBoost(true);
                    dispatchRedux(setMatchBetslipOptions('kiron_betslip_options', {...betslip_options,...{hasBoost:true,remaining_games: 0, alert_slip_color:'valid',multiboostmessage: "You Have Qualified for a Nare Boost  " 
                                }}))


                    setMultiBoostMessage(
                        "You  Have Qualified for a Nare Boost " 
                    );


                }
            }
            else{
                setMultiBoostAmount(0)

                dispatchRedux(setMatchBetslipOptions('kiron_betslip_options', {...betslip_options,...{hasBoost:false, alert_slip_color:'not_qualified'}}))


                setMultiBoostMessage("")

            }
        };

        useEffect(() => {
            calculateMultiBetBoostAmount();
        }, [betslip, stake, expiredParentMatchIds]);


        const closeAlert = () => {
            setMultiBoostMessage(null)
        }

        const SubmitButton = (props) => {
            const {title, disabled, ...rest} = props;
            const {isSubmitting} = useFormikContext();
            return (
                <button
                    type={"submit"}
                    {...rest}
                    id={"place_bet_button_nare"}
                    style={{padding: "10px", width: "100%", borderRadius: "0.7rem"}}
                    className={`${
                        disabled ? "disabled" : ""
                    }'bg-warning bold text-dark cursor-pointer'`}
                    disabled={isSubmitting || disabled}
                    title={(
                        <span>PLACE BET <FontAwesomeIcon icon={faFireAlt}/></span>

                    )}>
                    {isSubmitting ? <div
                            className={'d-flex align-items-center justify-content-center'}
                            style={{whiteSpace: 'nowrap'}}>
                            <span className="loader"></span>
                        </div>
                        : title}{" "}
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
                            {!message && 
                               awardMultiGift &&
                                 (
                                    multiBoostMessage &&
                                    <div className={` slip-message-alert`} style={{ fontSize:"12px", fontWeight:"300"}}>
                                        <div colSpan="2" className={'d-flex col-2'} style={{width: '100%'}}>
                                            <FontAwesomeIcon icon={faGift}/> {multiBoostMessage}
                                        </div>
                                        <td colSpan={2} className={" bet-align-right betslip-alert-close"}>
                                            <input
                                                type="submit"
                                                value="X"
                                                onClick={() => closeAlert()}
                                            />
                                        </td>

                                    </div>
                                )}
                            {totalGames > 0 && (
                                <div className="bet-table w-100 box-shadow-table-submit-form ">
                                    <div id="odd-change-text"
                                         className={'d-flex justify-content-end align-items-center mb-3'}>
                                        <div className={"slip-clear-all"}>
                                            <FontAwesomeIcon icon={faTrash} title={"Clear All"}
                                                             style={{color: "var(--light)"}}
                                                             onClick={() => handleRemoveAll()}/>
                                        </div>
                                    </div>

                                    {(
                                        <div
                                            className="hide-on-affix d-flex align-items-center justify-content-between p-2">
                                            <div>Total Odds</div>
                                            <div className={"bet-align-right"}>
                                                <b>{Float(totalOdds, 2)}</b>
                                            </div>
                                        </div>
                                    )}
                                    <div>
                                        <div></div>
                                    </div>
                                    {(
                                        <div
                                            className="bet-win-tr hide-on-affix d-flex align-items-center justify-content-between p-2">
                                            <div>Final Payout</div>
                                            <div className={"bet-align-right"}>
                                                KES.{" "}
                                                <span id="pos_win">
                        {formatNumber(
                            hasMultiBetBoost ? possibleWinBoosted : possibleWin
                        )}
                      </span>
                                            </div>
                                        </div>
                                    )}
                                     {(user && awardMultiGift)&&
                                     <div
                                        className="hide-on-affix d-flex justify-content-between p-lg-2 p-md-2 py-sm-0">
                                        <div
                                            className={"bet-align-left nare-boost-color d-flex align-items-center"}>Nare
                                            Boost
                                            &nbsp;<FontAwesomeIcon icon={faBolt} className={'boost-betslip'}/>
                                        </div>
                                        <div className={"bet-align-right nare-boost-color"}>
                                            <b>{multiBoostAmount}</b>
                                        </div>
                                    </div>
                                    }

                                    <div>

                                        <div
                                            className={"d-flex align-items-center container-styling-input-placebet mt-2 p-lg-2 p-md-2 py-sm-0 "}>
                                            <div className={"bg-input-placebet"}>
                                                Amount (KES)
                                            </div>
                                            <div className={"w-100"}>
                                                <div id="betting">
                                                    {
                                                        <input
                                                            type="text"
                                                            className="bet-select bet-stake-input"
                                                            name="bet_amount"
                                                            id="bet_amount"
                                                            value={values.bet_amount || ""}
                                                            onChange={(e) => onFieldChanged(e)}
                                                        />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="odd-change-text2">
                                        <div className={"d-flex bet-select-values w-100 mt-2 p-lg-2 p-md-2 py-sm-0"}
                                             style={{whiteSpace: "nowrap"}}>
                                            {showExpired ?
                                                <div className={"w-100"} style={{whiteSpace: "nowrap"}}>
                                                    <button
                                                        className="bold w-100"
                                                        type="button"
                                                        style={{
                                                            padding: "6px",
                                                            borderRadius: "0.7rem",
                                                            fontSize: "14px",
                                                            height: '3.5rem',
                                                            background: "#CC5500",
                                                        }}
                                                        onClick={() => handleRemoveExpired()}
                                                    >
                                                        Remove Expired &nbsp;<FontAwesomeIcon icon={faTrash}/>
                                                    </button>
                                                </div>
                                                : <SubmitButton
                                                    id="place_bet_button_nare_submit"
                                                    className="place-bet-btn bold "
                                                    title="PLACE BET"
                                                ></SubmitButton>
                                            }

                                        </div>
                                    </div>
                                </div>
                            )}
                            <input
                                type="hidden"
                                name={"user_kiron_id"}
                                id={"user_kiron_id"}
                                value={user?.profile_id || ""}
                            />
                            <input
                                type="hidden"
                                name={"total_kiron_odd"}
                                id={"total_kiron_odd"}
                                value={totalOdds || ""}
                            />
                            <input ref={scrollToRef}
                                   type="hidden"
                                   name={"total_kiron_games"}
                                   id={"total_kiron_games"}
                                   value={totalGames || ""}
                            />
                        </FormikForm>
                    );
                }}
            </Formik>
        );
    });
export default React.memo(KironslipSubmitForm);
