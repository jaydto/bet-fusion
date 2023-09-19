import React, {useContext, useEffect, useState} from "react";

import Betslip from "../../right/betslip";
import Right from "../../right";

import SlipTabs from "./tabs/slip-tabs";

import KironSlip from "../../right/kironslip";
import Header from "../../header/header";
import {ToastContainer} from "react-toastify";
import {StoreContext} from "../../../context/store";
import {getFromLocalStorage} from "../../utils/local-storage";
import {useDispatch, useSelector} from "react-redux";
import {setState} from "../../../redux/dataSlice";

const BetslipPage = React.memo(
    () => {
        const [tab, setTab] = useState(null);
        const [, setLoading] = useState(false);

        let url = new URL(window.location);
        const jp = url.searchParams.get("jackpot");
        const nL = url.searchParams.get("nare-league")
        const nare_league = nL == 'true' ? true : false
        const jackpot = jp == "true" ? true : false;
        const slipParam = url.searchParams.get("betslipValidationData");
        const jackpotParam = url.searchParams.get("jackpotData");
        const nareParams = url.searchParams.get('nare-league')
        const pathname = window.location.pathname;
        const stake_value=useSelector((state)=>state.data.stake_value)
        const dispatchRedux=useDispatch()

        const [settings,] = useState(getFromLocalStorage("settings"));


        useEffect(() => {
            let value=stake_value || getFromLocalStorage("userStake") || Number(settings?.sportsBookLimits?.defaultBetAmount)
            if(isNaN(value)){
                dispatchRedux(setState('stake_value', 0))
                // dispatch({type: "SET", key: "stakeValue", payload: 0});
            }else{
                dispatchRedux(setState('stake_value', value))

                // dispatch({type: "SET", key: "stakeValue", payload: value});
            }
        }, [settings])



        const betslipValidationData =
            slipParam && JSON.parse(decodeURIComponent(slipParam));
        const nareData =
            nareParams && JSON.parse(decodeURIComponent(slipParam))

        const jackpotData =
            jackpotParam && JSON.parse(decodeURIComponent(jackpotParam));


        useEffect(() => {
            let new_tab = "";

            if (window.location.href.includes("betslip-slip")) {
                new_tab = "betslip-slip";
            }

            if (window.location.href.includes("betslip-jackpot")) {
                new_tab = "betslip-jackpot";
            }

            if (window.location.href.includes("betslip-nare")) {
                new_tab = "betslip-nare";
            }

            if (new_tab !== tab) {
                setTab(new_tab);
                setLoading(true);
            }
        });

        return (
            <>

                <div
                    className=" "
                    style={{overflow: 'hidden'}}>
                    <div>
                        <Header slip={true}/>
                        <ToastContainer/>
                    </div>
                    <div className={"w-100 top-spacing-betslip "}>
                        <div className="bet-option-list w-100" id="" style={{bottom: "0", height: "100%"}}>
                            <div
                                className="bet alu  block-shadow d-flex flex-column"
                            >
                                <div className={"slip-tabs-top"} style={{position: "sticky", width: "100%"}}>
                                    <SlipTabs tab={tab}/>
                                </div>
                                <div
                                    id="betslip"
                                    className={`betslip  slip-max-height `}
                                    style={{height: "100%"}}
                                >
                                    <div
                                        className={" d-flex flex-column w-100 justify-content-end"}
                                        style={{height: "100%"}}
                                    >

                                        {nare_league ? <KironSlip kironValidation={nareData}
                                                                  kiron={nare_league || (pathname === '/betslip-nare')}/> :
                                            <Betslip
                                                jackpot={jackpot ? true : false}
                                                betslipValidationData={betslipValidationData}
                                                jackpotData={jackpotData}
                                            />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<footer>*/}
                <div className={"styling-mobile-size"}>
                    <Right betslipValidationData={betslipValidationData} jackpotData={jackpotData}
                           jackpot={jackpot ? true : false} slipPage={true}/>
                </div>
                {/*</footer>*/}
            </>
        );
    });

export default React.memo(BetslipPage);
