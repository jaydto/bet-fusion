import React, { useContext, useEffect, useState } from "react";

import Right from "../../right";

import SlipTabs from "./tabs/slip-tabs";

import KironSlip from "../../right/kironslip";
import Header from "../../header/header";
import { ToastContainer } from "react-toastify";
import { getFromLocalStorage } from "../../utils/local-storage";
import { useDispatch, useSelector } from "react-redux";
import { setState } from "../../../redux/dataSlice";
import { findPostableSlip, getBetslip } from "../../utils/betslip";
import {
  betslipValidation,
  startBetslipValidation,
  stopBetslipValidation,
} from "../../../redux/bettingSlice";

const BetslipPage = React.memo(() => {
  const [tab, setTab] = useState(null);
  const [, setLoading] = useState(false);

  let url = new URL(window.location);
  const jp = url.searchParams.get("jackpot");
  const nL = url.searchParams.get("nare-league");
  const nare_league = nL == "true" ? true : false;
  const jackpot = jp == "true" ? true : false;
  const slipParam = url.searchParams.get("betslipValidationData");
  const jackpotParam = url.searchParams.get("jackpotData");
  const nareParams = url.searchParams.get("nare-league");
  const pathname = window.location.pathname;
  const stake_value = useSelector((state) => state.data.stake_value);
  const slip_validated_data = useSelector(
    (state) => state.betting.slip_validation_data
  );
  const betslip_validation_status = useSelector(
    (state) => state.betting.betslip_validation_status
  );
  // const slip_data = useSelector((state) => state.betting.betslip);
  const dispatchRedux = useDispatch();

  const [settings] = useState(getFromLocalStorage("settings"));

  useEffect(() => {
    let value =
      stake_value ||
      getFromLocalStorage("userStake") ||
      Number(settings?.sportsBookLimits?.defaultBetAmount);
    if (isNaN(value)) {
      dispatchRedux(setState("stake_value", 0));
    } else {
      dispatchRedux(setState("stake_value", value));
    }
  }, [settings]);

 

  const fetchData = async () => {
    let betslip = findPostableSlip();

    if (betslip.length === 0) {
      console.log("Betslip is empty. Skipping validation.");
      return;
    }
    let endpoint = "v1/betslip-validation";

    const hasLiveInterval = betslip.some((item) => item.live);


    // Define the interval duration based on whether any betslip has a live interval
    const interval = hasLiveInterval ? 6000 : 20000;

    // Dispatch the action with the appropriate interval duration
    dispatchRedux(
      betslipValidation({
        endpoint,
        method: "POST",
        data: betslip,
        payload: betslip,
      })
    );
    dispatchRedux(
      startBetslipValidation({
        endpoint,
        method: "POST",
        data: betslip,
        interval,
      })
    );

    // Clear the interval when fetchParams change
  };

  

  useEffect(() => {
    // stop the fetchInterva;
    if (!nare_league) {
      dispatchRedux(stopBetslipValidation());
      // Start betslip validation
      fetchData();
    }
    return () => {
      dispatchRedux(stopBetslipValidation());
    }
  }, []);

  const betslipValidationData =
    slipParam && JSON.parse(decodeURIComponent(slipParam));
  const nareData = nareParams && JSON.parse(decodeURIComponent(slipParam));

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
      <div className=" " style={{ overflow: "hidden" }}>
        <div>
          <Header slip={true} />
          <ToastContainer />
        </div>
        <div className={"w-100 top-spacing-betslip "}>
          <div
            className="bet-option-list w-100"
            id=""
            style={{ bottom: "0", height: "100%" }}
          >
            <div className="bet alu  block-shadow d-flex flex-column">
              <div
                className={"slip-tabs-top"}
                style={{ position: "sticky", width: "100%" }}
              >
                <SlipTabs tab={tab} />
              </div>
              <div
                id="betslip"
                className={`betslip  slip-max-height `}
                style={{ height: "100%" }}
              >
                <div
                  className={" d-flex flex-column w-100 justify-content-end"}
                  style={{ height: "100%" }}
                >
                 
                    <KironSlip
                      kironValidation={nareData}
                      kiron={nare_league || pathname === "/betslip-nare"}
                    />
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={"styling-mobile-size"}>
        <Right
          betslipValidationData={slip_validated_data??betslipValidationData}
          jackpotData={jackpotData}
          jackpot={jackpot ? true : false}
          slipPage={true}
        />
      </div>
    </>
  );
});

export default React.memo(BetslipPage);
