import React,{useCallback, useEffect, useRef, useState} from "react";
import {
    clearSlip,
    formatNumber,
    getBetslip,
    getJackpotBetslip,
    removeFromJackpotSlip,
    removeFromSlip,
} from "../utils/betslip";
import {publicIpv4 as publicIp} from "public-ip";
import "react-toastify/dist/ReactToastify.css";
import {Form as FormikForm, Formik, useFormikContext} from "formik";
import {getFromLocalStorage, setLocalStorage} from "../utils/local-storage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {faBolt, faFireAlt, faGift, faInfoCircle, faShare, faTrash,} from "@fortawesome/free-solid-svg-icons";
import {Switch} from "@mui/material";
import {useNavigate} from "react-router-dom";
import useWindowDimensions from "../header/Dimensions";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import Notify from "../utils/Notify";
import {useDispatch, useSelector} from "react-redux";
import {matchesShareBet, resetState} from "../../redux/matchesSlice";
import {userBalance} from "../../redux/authSlice";
import {
    bettingMatchesGames,
    setMatchBetslip,
    resetStateBetslip,
    removeSelected, removePickedData
} from "../../redux/bettingSlice";
import {setState} from "../../redux/dataSlice";
import {setState as setMatchBetslipOptions} from "../../redux/bettingSlice";
import DepositModal from "../modals/DepositModal";

const BetslipShareModal = React.lazy(() =>
    import("../modals/BetslipShareModal")
);

const Float = (equation, precision = 4) => {
    return Math.round(equation * 10 ** precision) / 10 ** precision;
};

export const SubmitButton = (props) => {
    const {title, button_size, disabled, ...rest} = props;
    const {isSubmitting} = useFormikContext();
    return (
        <button
            type={button_size ? "button" : "submit"}
            {...rest}
            id={"place_bet_button"}
            style={button_size ? {
                padding: "10px",
                borderRadius: "0.7rem",
                fontSize: "14px",
                background: "var(--betnare-button-login",
                whiteSpace: 'nowrap'
            } : {padding: "10px", width: "100%", borderRadius: "0.7rem",whiteSpace: 'nowrap'}}
            className={`${disabled ? "disabled" : ""} ${button_size ? " jackpot-button-placebet " : " "} 'bg-warning bold rounded-2 text-dark cursor-pointer'`}
            disabled={isSubmitting || disabled}
            title="Place Bet"
        >
            {isSubmitting ? "Please Wait " : title}{" "}
        </button>
    );
};
const BetslipSubmitForm = React.memo(
    (props) => {
        const {
            live,
            jackpot,
            totalGames,
            totalOdds,
            betslip,
            jackpotData,
            bonusBet,

        } = props;

        const [hasMultiBetBoost, setHasMultiBetBoost] = useState(true);
        const [multiBoostAmount, setMultiBoostAmount] = useState(0);
        const [ipv4, setIpv4] = useState(null);
        const [message, setMessage] = useState(null);
        const loading=useSelector((state)=>state.betting.loading)
        const [settings,] = useState(getFromLocalStorage("settings"));
        const stake_value=useSelector((state)=>state.data.stake_value)
        const [stake, setStake] = useState(jackpot ? parseInt(jackpotData?.bet_amount) : stake_value||getFromLocalStorage('userStake'));


        const [stakeAfterTax, setStakeAfterTax] = useState(0);
        const [stakeAfterTaxBoosted, setStakeAfterTaxBoosted] = useState(0);

        const [exciseTax, setExciseTax] = useState(0);
        const [exciseTaxBoosted, setExciseTaxBoosted] = useState(0);
        const minStake=useSelector((state)=>state.betting.minStake)


        const [withholdingTax, setWithholdingTax] = useState(0);
        const [withholdingTaxBoosted, setWithholdingTaxBoosted] = useState(0);

        const [possibleWin, setPossibleWin] = useState(0);
        const [possibleWinBoosted, setPossibleWinBoosted] = useState(0);

        const [netWin, setNetWin] = useState(0);
        const [netWinBoosted, setNetWinBoosted] = useState(0);
        const [multiBoostMessage, setMultiBoostMessage] = useState("");
        const [awardMultiGift, setAwardMultiGift] = useState(false);

        const [, setBetslipKey] = useState("betslip");

        const scrollToRef = useRef(null);
        const {width} = useWindowDimensions();
        const userData=useSelector((state)=>state.auth.user)
        const [user, setUser]=useState(getFromLocalStorage("user"))

        useEffect(()=>{
            if(userData){
                setUser(userData||getFromLocalStorage("user"))
            }
        }, [userData])

        useEffect(()=>{
                setStake(stake_value)
        }, [stake_value])


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
            if (scrollToRef.current) {
                scrollToRef.current.scrollIntoView({behavior: 'auto'});
            }
        }, []);

        useEffect(() => {
            if (jackpot) {
                setBetslipKey("jackpotbetslip");
            }
        }, [jackpot]);
        const clearMessage=()=>{

            setMessage(null)
        }


        const Alert = (props) => {
            let c = message?.status == 201 ? 'success' : message?.status == 421 ? 'warning' : 'danger';
            let x_style = {
                float: "right",
                display: "block",
                fontSize: "22px",
                color: "orangered",
                cursor: "pointer",
                padding: "3px",
                position: 'absolute',
                top: '0',
                right: '0'
            }
            return (<>{message &&
                <div role="alert"
                     className={`fade alert alert-${c} show alert-dismissible d-flex justify-content-between align-items-center alert-message-line-height alert-position-betslip-top`}>
                    {message.message}
                    <span aria-hidden="true" style={x_style} onClick={clearMessage}>&times;</span>
                </div>}
            </>);

        };
        const getIpAddress = async () => {
            try{
                let ip = await publicIp({
                    fallbackUrls: ["https://ifconfig.co/ip"],
                });
                setIpv4(ip);
            }catch (e) {
                console.log("ip error", e)
            }



        }
        useEffect(() => {
            getIpAddress();
        }, [])

        const betItem = getBetslip()
        const sportBookLimits = settings?.sportsBookLimits
        const betslipLength = Object.keys(betItem || {}).length;
        // const gaEventTracker = useAnalyticsEventTracker(live ? 'PlaceLiveBet' : 'PlacePrematchBet')


        useEffect(() => {

            dispatchRedux(setMatchBetslipOptions('betslipLength', betslipLength))

        }, [betslipLength])


        const handlePlaceBet = (values,
                                {setSubmitting, resetForm, setStatus, setErrors}) => {
            let bs = Object.values(betslip || []);

            let slipHasOddsChange = false;

            for (let slip of bs) {
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
                msisdn: user?.msisdn,
                accept_all_odds_change: values.accept_all_odds_change
            };
            let endpoint = '/bet';
            let method = "GET"
            let use_jwt = true
            dispatchRedux(setState('deposits_message', null))


            // const data = {
            //     event: jackpot ? 'place_jackpot_bet' : live ? 'place_live_bet' : 'place_prematch_bet',
            //     data: payload
            // }
            // gaEventTracker("Bet Placed", data)
            dispatchRedux(bettingMatchesGames({endpoint:endpoint, method:method, data:payload, jackpot:jackpot, use_jwt:use_jwt})).then((response) => {
                // Check if the action was fulfilled successfully
                if (bettingMatchesGames.fulfilled.match(response)) {

                        // Dispatch the clearUcn action when fulfilled
                        setMessage(response?.payload)
                        let betslips = getBetslip();
                        Object.entries(betslips).map(([match_id, match]) => {
                            let match_selector = match.match_id + "_selected";

                            dispatchRedux(resetStateBetslip("betslip"))
                            dispatchRedux(removeSelected(match_selector))

                        });
                        clearSlip();
                        const betslip_data={
                            betslip_type:"betslip",
                            data:{}
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

                    setLocalStorage('betslip_share_code', null)
                    // dispatchRedux(setState('stake_value',0))
                    // setLocalStorage('userStake', null)

                    updateUserOnHistory()
                    return width < 991 ? setTimeout(() => {
                        navigate("/")
                    }, 4500) : "";

                }
                else if(bettingMatchesGames.rejected.match(response)){
                    // const data = {
                    //     event: jackpot ? 'place_jackpot_bet' : live ? 'place_live_bet' : 'place_prematch_bet',
                    //     message: response?.message
                    // }
                    // gaEventTracker("Bet Placement Failed " + response?.message, data)
                    const message_error=JSON.parse(response?.error?.message)

                    let response_message =message_error[0].message ;
                    if (response_message === "" || response_message === undefined) {
                        response_message = message_error[0].message;
                        if (response_message === "" || response_message === undefined) {
                            response_message = "Something went wrong. Please try again later or contact support. 0701 087 777";
                        }
                    }
                    let qmessage = {
                        status: 404,
                        message: response_message,
                    };
                    setMessage(qmessage)
                }
            })
                .catch((error) => {
                    // Handle errors if needed
                });
            let timer = setTimeout(() => {
                setMessage(null)
                clearTimeout(timer)
            }, 10000)
            setSubmitting(false);
        };

        const updateWinnings = useCallback(() => {
            if (betslip) {
                let stake_after_tax = (Float(stake) / Float(112.5)) * 100;
                let stake_after_tax_boosted =
                    ((Float(stake) + Float(multiBoostAmount)) / Float(112.5)) * 100;

                let ext = Float(stake) - Float(stake_after_tax);
                let ext_boosted =
                    Float(stake) + Float(multiBoostAmount) - Float(stake_after_tax_boosted);

                let raw_possible_win = Float(stake_after_tax) * Float(totalOdds);
                let boosted_raw_possible_win =
                    Float(stake_after_tax_boosted) * Float(totalOdds);

                if (jackpot) {
                    raw_possible_win = jackpotData?.jackpot_amount;
                }


                if (betslipLength === 1 && !jackpot) {
                    if (Number(raw_possible_win) > (Number(sportBookLimits?.singleBetMaxWin) || 500000)) {
                        raw_possible_win = (Number(sportBookLimits?.singleBetMaxWin) || 500000);
                    }

                    if (Number(boosted_raw_possible_win) > (Number(sportBookLimits?.singleBetMaxWin) || 500000)) {
                        boosted_raw_possible_win = (Number(sportBookLimits?.singleBetMaxWin) || 500000);
                    }
                } else if (betslipLength > 1 && !jackpot) {
                    if (Number(raw_possible_win) > (Number(sportBookLimits?.multiBetMaxWin) || 500000)) {
                        raw_possible_win = (Number(sportBookLimits?.multiBetMaxWin) || 500000);
                    }

                    if (Number(boosted_raw_possible_win) > (Number(sportBookLimits?.multiBetMaxWin) || 500000)) {
                        boosted_raw_possible_win = (Number(sportBookLimits?.multiBetMaxWin) || 500000);
                    }
                } else {
                    if (Number(raw_possible_win) > 500000 && !jackpot) {
                        raw_possible_win = 500000;
                    }
                    if (Number(boosted_raw_possible_win) > 500000 && !jackpot) {
                        boosted_raw_possible_win = 500000;
                    }
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
                dispatchRedux(setMatchBetslipOptions('betslip_options', {...betslip_options,...{netWin:Float(nw,2),netWinBoosted:Float(nw_boosted,2) }}))


                // dispatch({type: "SET", key: "netWinBoosted", payload: Float(nw_boosted, 2)});
                // dispatchRedux(setMatchBetslipOptions('netWinBoosted', Float(nw_boosted,2)))


                setPossibleWin(Float(raw_possible_win, 2));
                setPossibleWinBoosted(Float(boosted_raw_possible_win, 2));

                setWithholdingTax(Float(wint, 2));
                setWithholdingTaxBoosted(Float(wint_boosted, 2));
            } else {
                setNetWin(0);
                dispatchRedux(setMatchBetslipOptions('betslip_options', {...betslip_options,...{netWin:0}}))


                setWithholdingTax(0);
                setExciseTax(0);
                setPossibleWin(0);
                setStakeAfterTax(0);
            }
            if (message && message.status > 299) {
                setMessage(null);
            }
        }, [betslip, stake, totalOdds, multiBoostAmount]);

        const navigate = useNavigate()

        const handleRemoveAll = useCallback(() => {
            let betslips = jackpot ? getJackpotBetslip() : getBetslip();
            Object.entries(betslips).map(([match_id, match]) => {
                // let slip=
                jackpot ? removeFromJackpotSlip(match_id) :
                    removeFromSlip(match_id);

                let match_selector = match.match_id + "_selected";
                let ucn = clean_rep(
                    match.match_id
                    + "" + match.sub_type_id
                    + (match.bet_pick)
                );

                // dispatch({type: "SET", key: match_selector, payload: "remove." + ucn});
                // const match_items={
                //     match_selector:match_selector,
                //     ucn:"remove." + ucn
                // }
                // dispatchRedux(removeSlipSelection(match_items));
                dispatchRedux(removeSelected(match_selector))
                dispatchRedux(removePickedData(""));

            });

            const betslip_data={
                betslip_type:"betslip",
                data:{}
            }
            dispatchRedux(setMatchBetslip(betslip_data))
            setMessage(null);
            // setLocalStorage("winnings",null)
            // setLocalStorage('userStake', null)
            // dispatchRedux(setState('stake_value',0) )
            setLocalStorage('betslip_share_code', null)
            return width < 991 ? navigate(-1) : ""
        }, []);

        useEffect(() => {
            updateWinnings();
        }, [updateWinnings]);

        const value_for_odds_change = getFromLocalStorage("accept_all_odds_change") === undefined ? true :getFromLocalStorage("accept_all_odds_change") === null?true: getFromLocalStorage("accept_all_odds_change")
        const initialValues = {
            bet_amount: (jackpot && jackpotData?.bet_amount) || (bonusBet ? Number(settings?.betnareBonus?.defaultBonusBetAmount) : stake),
            accept_all_odds_change: value_for_odds_change,
            user_id: user?.profile_id,
            total_games: totalGames,
            total_odd: totalOdds,
        };

        const validate = (values) => {
            let errors = {};

            if (!values.user_id) {
                // errors.user_id = "Kindly login to proceed";
                // setMessage({status: 400, message: errors.user_id});
                // return errors;
                navigate('/login')
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
            if (jackpot && Object.keys(getJackpotBetslip()).length < jackpotData?.total_games) {
                let remaining = Number(jackpotData?.total_games) - Number(Object.keys(getJackpotBetslip()).length);
                errors.jackpot_select = `Please select the ${remaining} remaining jackpot matches`
                setMessage({status: 421, message: errors.jackpot_select})
                return errors
            }

            return errors;
        };

        const clean_rep = (str) => {
            str = str.replace(/[^A-Za-z0-9\-]/g, "");
            return str.replace(/-+/g, "-");
        };


        const calculateMultiBetBoostAmount = () => {
            let settings = getFromLocalStorage("settings");

            let giftMinGames = Number(settings?.betnareGifts?.giftBoostMinLegs);

            if (totalGames < giftMinGames) {
                setHasMultiBetBoost(false);

                dispatchRedux(setMatchBetslipOptions('betslip_options', {...betslip_options,...{hasBoost:false,  alert_slip_color:'not_qualified'}}))


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
                Number(user?.gift_balance || 0) > 0;

            setAwardMultiGift(awardGifts);
            if (Number(giftQualificationOdds) < Number(giftMinGames)) {
                let remainingGames = Number(giftMinGames) - Number(giftQualificationOdds);

                dispatchRedux(setMatchBetslipOptions('betslip_options', {...betslip_options,...{remaining_games:remainingGames, hasBoost:false, alert_slip_color:'not_qualified', multiboostmessage: ` Add ${remainingGames} more game${
                            remainingGames > 1 ? "s" : ""
                        } with odds of  ${
                            settings?.betnareGifts?.giftBoostMinOdds
                        } or above to boost your winnings.`}}))


                setMultiBoostMessage(
                    `Congratulations, you qualify for Nare Gift. Add ${remainingGames} more game${
                        remainingGames > 1 ? "s" : ""
                    } with odds of  ${
                        settings?.betnareGifts?.giftBoostMinOdds
                    } or above to redeem your gift.`
                );

                setMultiBoostAmount(0)



            }
            else if (Number(giftQualificationOdds) >= Number(giftMinGames)) {
                boost = Math.round(((Number(settings?.betnareGifts?.giftBoostPercentage)||20)/ 100) * stake);
                if(isNaN(boost)){
                    boost=0
                }

                if (boost >= Number(settings?.betnareGifts?.maxGiftBoostAmount)) {
                    boost = Number(settings?.betnareGifts?.maxGiftBoostAmount);
                }
                if (boost >= 1) {
                    setMultiBoostAmount(boost);
                    setHasMultiBetBoost(true);

                    let boostedStake = Number(stake) + Number(boost);
                    boostedStake = formatNumber(boostedStake);
                    dispatchRedux(setMatchBetslipOptions('betslip_options', {...betslip_options,...{hasBoost:true, alert_slip_color: 'valid', remaining_games: 0, multiboostmessage:"Congratulations! we have gifted you KES " +
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
                    dispatchRedux(setMatchBetslipOptions('betslip_options', {...betslip_options,...{hasBoost:true,remaining_games: 0, alert_slip_color:'valid',multiboostmessage: "You Qualify for Nare Boost Minimum Stake is " +
                                3 +
                                " KES "  }}))


                    setMultiBoostMessage(
                        "You Qualify for a Nare Boost Minimum stake is " +
                        3 +
                        " KES "
                    );


                }
            }
            else{
                setMultiBoostAmount(0)

                dispatchRedux(setMatchBetslipOptions('betslip_options', {...betslip_options,...{hasBoost:false, alert_slip_color:'not_qualified'}}))


                setMultiBoostMessage("")

            }
        };

        useEffect(() => {
            calculateMultiBetBoostAmount();
        }, [betslip, stake]);

        const show_share_modal=useSelector((state)=>state.matchesData.show_share_modal)
        const share_bet=useSelector((state)=>state.matchesData.share_bet)
        const loadingShare=useSelector((state)=>state.matchesData.loading_bet_history)

        const [showShareModal, setShowShareModal] = useState(false);
        const [betSharePayload, setBetSharePayload] = useState({});
        const show_deposit_modal=useSelector((state)=>state.betting.insufficient_balance)
        const betslip_options=useSelector((state)=>state.betting.betslip_options)
        const [showDepositModal, setShowDepositModal] = useState(false);

        const dispatchRedux=useDispatch()

        useEffect(()=>{
            if(show_share_modal){
                setShowShareModal(show_share_modal)
            }
            return ()=>{
                dispatchRedux(resetState("show_share_modal"))
            }

        },[show_share_modal])

        useEffect(()=>{
            if(show_deposit_modal){
                setShowDepositModal(show_deposit_modal)
            }
            return ()=>{
                dispatchRedux(resetState("show_deposit_modal"))
            }

        },[show_deposit_modal])

        useEffect(()=>{
            if(share_bet){
                setBetSharePayload(share_bet)
            }
            return ()=>{
                dispatchRedux(resetState("share_bet"))
            }

        },[share_bet])


        const encodeBetSlip = () => {
            dispatchRedux(matchesShareBet(betslip))

        };
        const [showInfo, setShowInfo] = useState()
        const label = {
            inputProps: {
                'aria-label': 'accept_all_odds_change',
                value: 'accept_all_odds_change' // Make sure this is the correct value for your use case.
            }
        };

        const closeAlert = () => {
            setMultiBoostMessage(null)
        }

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

                        if (field === "accept_all_odds_change") {
                            // Handle the value of the accept_all_odds_change checkbox here

                            setLocalStorage("accept_all_odds_change", value)
                        }

                        if (field === "bet_amount") {
                            value = value.replace(/[^\d]/g, "");
                            let newValue = value;

                            let message = {
                                status: 401,
                                message: 'You have reached the maximum allowable stake for this bet',
                                token: ''
                            };
                            let minStakeMessage = {message: `Minimum amount is ${sportBookLimits?.singleBetMinStake} KSH`};

                            if (betslipLength === 1 && !jackpot) {
                                const maxStake = sportBookLimits?.singleBetMaxStake;
                                if (Number(value) > Number(maxStake)) {
                                    Notify(message);
                                    newValue = maxStake;
                                } else {
                                    newValue = value
                                }
                            } else if (betslipLength > 1 && !jackpot) {
                                const maxStake = sportBookLimits?.multiBetMaxStake;
                                if (Number(value) > Number(maxStake)) {
                                    Notify(message);
                                    newValue = maxStake;
                                } else {
                                    newValue = value
                                }
                            }
                            const minStake = sportBookLimits?.singleBetMinStake;
                            if (Number(value) < Number(minStake)) {

                                dispatchRedux(setMatchBetslipOptions('betslip_options', {...betslip_options,...{minStake:minStakeMessage}}))
                            } else {
                                dispatchRedux(setMatchBetslipOptions('betslip_options', {...betslip_options,...{minStake:null}}))

                                }

                            setFieldValue(field, newValue);
                            dispatchRedux(setState('stake_value', newValue))
                            setLocalStorage('userStake', newValue);
                            setStake(newValue);
                        } else {
                            setFieldValue(field, value);
                        }
                    };


                    const UserInfoContainer = () => {
                        return (
                            <table className={"show-tax-info "}>
                                <tbody>
                                <tr>
                                    <td colSpan={2} className={" bet-align-right closeinfo"}>
                                        <input
                                            type="submit"
                                            value="X"
                                            onClick={() => showUserInfo()}
                                        />
                                    </td>
                                </tr>
                                {!jackpot && <tr className="bet-win-tr hide-on-affix">
                                    <td className={"bet-align-left tax-info"}>Possible Win</td>
                                    <td className={"bet-align-right tax-info"}>
                                        KES. <span
                                        id="pos_win">{formatNumber(hasMultiBetBoost ? possibleWinBoosted : possibleWin)}</span>
                                    </td>
                                </tr>}

                                <tr className="bet-win-tr hide-on-affix">
                                    <td className={"bet-align-left tax-info"}> Excise Tax (12.5%)</td>
                                    <td className={"bet-align-right tax-info"}>KES. <span
                                        id="tax">{formatNumber(hasMultiBetBoost ? exciseTaxBoosted : exciseTax)}</span>
                                    </td>
                                </tr>
                                {jackpot ? (
                                    ''
                                ) : (
                                    <tr className="bet-win-tr hide-on-affix">
                                        <td className={"bet-align-left tax-info"}> Withholding (20%)</td>
                                        <td className={"bet-align-right tax-info"}>KES. <span
                                            id="tax">{formatNumber(hasMultiBetBoost ? withholdingTaxBoosted : withholdingTax)}</span>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        )
                    }

                    const showUserInfo = () => {
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
                        {showDepositModal && (
                            <DepositModal
                                visible={showDepositModal}
                                payload={message?.message}
                                setMessage={clearMessage}
                                setShowShareModal={setShowDepositModal}
                            />
                        )}
                        <div>
                            {!jackpot && !message &&
                                awardMultiGift &&
                                Number(totalGames) >= settings?.betnareBonus?.bonusBetLegs && (
                                    multiBoostMessage &&
                                    <div className={` slip-message-alert`}>
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
                        </div>
                        {totalGames > 0 && (
                            <div className="bet-table w-100 box-shadow-table-submit-form ">
                                <div className={"slip-body"}>
                                    <div id="odd-change-text">
                                        <div className={"odd-change-position"}>
                                            <Switch id={"accept_all_odds_change"} {...label}
                                                    className="odds-change-box"
                                                    name={"accept_all_odds_change"}
                                                    checked={values?.accept_all_odds_change || false}
                                                    color="primary"

                                                    onChange={(e) => onFieldChanged(e)}
                                            /> Accept any odds change

                                        </div>
                                        <div className={"slip-clear-all"}>
                                            <FontAwesomeIcon icon={faTrash} title={"Clear All"}
                                                             style={{color: "var(--light)"}}
                                                             onClick={() => handleRemoveAll()}/>
                                        </div>
                                    </div>
                                    {!jackpot && <div
                                        className="hide-on-affix mt-2 d-flex justify-content-between p-lg-2 p-md-2 py-sm-0 ">
                                        <div className={"bet-align-left d-flex align-items-center bet-select-values"}>
                                            Total Odds
                                        </div>
                                        <div className={"bet-align-right"}>
                                            <b>{Float(totalOdds, 2)}</b>
                                        </div>
                                    </div>}

                                    <div>
                                        <div></div>
                                    </div>

                                    <div className="bet-win-tr hide-on-affix d-flex justify-content-between ">
                                        <div
                                            className={" bet-align-left d-flex align-items-center  show-container bet-select-values p-lg-2 p-md-2 py-sm-0"}>
                                            <div>{jackpot ? 'Jackpot Amount' : 'Final Payout'}</div>
                                            <span onClick={() => showUserInfo()} className={'bold'}>
                                        <FontAwesomeIcon icon={faInfoCircle} className={"show-values-betslip"}/>
                                                {showInfo && <UserInfoContainer/>}
                                    </span>
                                        </div>
                                        <div className={"bet-align-right d-flex align-items-center"}>KES. <strong
                                            id="net-amount">{formatNumber(jackpot ? jackpotData?.jackpot_amount : (hasMultiBetBoost ? netWinBoosted : netWin))}</strong>
                                        </div>
                                    </div>
                                    {user && !jackpot && <div
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
                                    <div
                                        className={"d-flex align-items-center container-styling-input-placebet mt-2 p-lg-2 p-md-2 py-sm-0 "}>
                                        <div className={"bg-input-placebet"}>
                                            Amount (KES)
                                        </div>
                                        <div className={"w-100"}>
                                            <div id="betting">
                                                {jackpot
                                                    ? jackpotData?.bet_amount :
                                                    (<input type="number"
                                                            className="bet-select bet-stake-input"
                                                            name="bet_amount"
                                                            id="bet_amount"
                                                            value={values.bet_amount || ""}
                                                            onChange={(e) => onFieldChanged(e)}
                                                    />)}

                                            </div>
                                        </div>
                                    </div>
                                    <div className={'w-100 justify-content-end p-1 d-flex min-skake-container'}>
                                        {minStake?.message && <span className={'min_stake_alert'}>
                                                    {minStake?.message}
                                                </span>}
                                    </div>
                                    <br className={"ipad-show"}/>
                                    <div className={"d-flex gap-2 align-items-center"}>
                                        <div className="bet-win-tr hide-on-affix col-4" style={{position:'relative'}}>
                                            <div className={"d-flex w-100 align-items-center"} style={{whiteSpace: "nowrap"}}>
                                                <button
                                                    id="share-btn"
                                                    onClick={() => encodeBetSlip()}
                                                    style={{
                                                        padding: "6px",
                                                        backgroundColor: "var(--odds-button)",
                                                        whiteSpace: "nowrap",
                                                        fontSize: "14px",
                                                        borderRadius: "4px",

                                                    }}
                                                    type={"button"}
                                                    className="bold btn-secondary  flex-nowrap w-100 d-flex justify-content-center share-button-styling"
                                                    title="SHARE BET"
                                                    disabled={loadingShare}
                                                >
                                                    {loadingShare ?
                                                        <span className="loader position-top-buttons"></span>:<span>Share <FontAwesomeIcon icon={faShare}/></span>
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                        <div id="odd-change-text" className={"col-8"}>
                                            <div className={"d-flex bet-select-values w-100  p-lg-2 p-md-2 py-sm-0"}
                                                 style={{whiteSpace: "nowrap"}} ref={scrollToRef}>
                                                <SubmitButton
                                                    style={{whiteSpace: 'nowrap'}}
                                                    id="place_bet_button_submit"
                                                    className="place-bet-btn bold "
                                                    disabled={loading}
                                                    title={
                                                        loading ? (
                                                            <div
                                                                className={'d-flex align-items-center justify-content-center'}
                                                                style={{whiteSpace: 'nowrap'}}>
                                                                <span className="loader"></span>
                                                            </div>
                                                        ) : (
                                                            <span>PLACE BET <FontAwesomeIcon icon={faFireAlt}/></span>
                                                        )
                                                    }
                                                ></SubmitButton>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}
                        <input
                            type="hidden"
                            name={"user_id"}
                            id={"user_id"}
                            value={user?.profile_id || ""}
                        />
                        <input
                            type="hidden"
                            name={"total_odd"}
                            id={"total_odd"}
                            value={totalOdds || ""}
                        />
                        <input
                            type="hidden"
                            name={"total_games"}
                            id={"total_games"}
                            value={totalGames || ""}
                        />
                    </FormikForm>)
                }}
            </Formik>)

    })
export default React.memo(BetslipSubmitForm);
