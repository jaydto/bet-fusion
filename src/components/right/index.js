import React, { useContext, useEffect, useState } from "react";
import QuickLogin from "./quick-login";
import CompanyInfo from "./company-info";
import BetSlip from "./betslip";
import { Badge } from "react-bootstrap";
import Kironslip from "./kironslip";
import MobileMenu from "../mobile-menu";
import useWindowDimensions from "../header/Dimensions";
import JackpotMenu from "../mobile-menu/jackpotMenu";
import { StoreContext } from "../../context/store";
import { getFromLocalStorage } from "../utils/local-storage";
import { useDispatch, useSelector } from "react-redux";
import {
  sportLiveCount,
  startFetchingLiveCount,
  stopFetchingLiveCount,
} from "../../redux/matchesSlice";
import { setState } from "../../redux/dataSlice";
import {
  betslipValidation,
  startBetslipValidation,
  stopBetslipValidation,
} from "../../redux/bettingSlice";
import { findPostableSlip, getBetslip } from "../utils/betslip";

const AlertMessage = React.memo((props) => {
  return (
    <div className={`alert alert-dismissible ${props.classname}`} role="alert">
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">×</span>
      </button>
      {props.message}
    </div>
  );
});

const Right = React.memo((props) => {
  const {
    jackpot,
    betslipValidationData,
    jackpotData,
    kiron,
    test,
    matches,
    live,
    remove_mobile,
    slipPage,
  } = props;
  const { width } = useWindowDimensions();
  const [betSlipMobile] = useState(false);
  const pathname = window.location.pathname;
  const { state, dispatch } = useContext(StoreContext);
  const appConfigs = useSelector((state) => state.data.app_config);
  const [settings, setSettings] = useState(getFromLocalStorage("settings"));
  const dispatchRedux = useDispatch();
  const stake_value = useSelector((state) => state.data.stake_value);
  //   const betslipData = useSelector((state) => state.betting.betslip);
  const betslipLength = useSelector((state) => state.betting.betslipLength);
  const slip_validated_data = useSelector(
    (state) => state.betting.slip_validation_data
  );
  const betslip_validation_status = useSelector(
    (state) => state.betting.betslip_validation_status
  );
  useEffect(() => {
    setSettings(appConfigs || getFromLocalStorage("settings"));
  }, [appConfigs]);

  const fetchLiveData = () => {
    dispatchRedux(sportLiveCount());
    dispatchRedux(startFetchingLiveCount({ interval: 30000 }));
  };

  useEffect(() => {
    const abortController = new AbortController();
    dispatchRedux(stopFetchingLiveCount());
    fetchLiveData();

    return () => {
      abortController.abort();
    };
  }, []);
  useEffect(() => {
    let value =
      stake_value ||
      getFromLocalStorage("userStake") ||
      Number(settings?.sportsBookLimits?.defaultBetAmount);
    if (isNaN(value)) {
      dispatchRedux(setState("stake_value", 0));
      // dispatch({type: "SET", key: "stakeValue", payload: 0});
    } else {
      dispatchRedux(setState("stake_value", value));

      // dispatch({type: "SET", key: "stakeValue", payload: value});
    }
  }, [settings]);

  const fetchData = async () => {
    let betslip = findPostableSlip();

    
    let endpoint = "v1/betslip-validation";

    const hasLiveInterval = betslip.some((item) => item.live);

    console.log("call has live data ", hasLiveInterval);

    // Define the interval duration based on whether any betslip has a live interval
    const interval = hasLiveInterval ? 10000 : 20000;

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
    if ((!kiron || slipPage) && (width > 991) && betslip_validation_status) {
      dispatchRedux(stopBetslipValidation());
      // Start betslip validation
      fetchData();
    }
  }, [betslip_validation_status]);

  const CountBadge = React.memo(() => {
    return (
      <Badge
        pill
        bg="warning nav__betslip d-flex justify-content-center align-items-center"
      >
        {kiron ? state?.betslipKironLength : betslipLength}
      </Badge>
    );
  });

  return (
    <div
      className={`${
        width > 991 &&
        `col ${test ? "" : "gn"} 
        ${
          jackpot && "jackpot-height"
        } ipad-dismiss-info betslip-container sticky-top vh-100 overflow-scroll betslip-container-mozilla container-sticky-top top-login-background-img-bg
         ${kiron && "kiron-betslip-size"}
         `
      }
         ${remove_mobile && " desktop-only-show "}
         ${pathname.includes("bet-history") && " desktop-only-show "}
         ${pathname.includes("results") && " desktop-only-show "}
         ${pathname.includes("standing") && " desktop-only-show "}
         `}
    >
      {!slipPage && (
        <>
          <div
            className={`betslip-container  ${
              jackpot ? "d-none" : "d-none d-md-block"
            }`}
          >
            {props?.message && (
              <AlertMessage
                classname={props.classname}
                message={props.message}
              />
            )}
            <div className="bet-option-list " id="">
              <div className="bet alu block-shadow">
                <header className={"d-flex justify-content-between gap-2"}>
                  <div className="betslip-header d-flex justify-content-between w-100">
                    <span className="col-sm-2 bkmrk d-none">
                      <i className="fa fa-bookmark" aria-hidden="true"></i>
                    </span>
                    <span className="col-sm-8 slp bold">BETSLIP</span>
                    <span className="col-sm-2 slip-counter ">
                      <CountBadge />
                    </span>
                  </div>
                </header>
                <button
                  id="slip-button-close"
                  type="button"
                  className="close mobi"
                  aria-hidden="true"
                >
                  X
                </button>
                <div id="betslip" className="betslip">
                  {kiron == true ? (
                    <Kironslip kiron={kiron} />
                  ) : (
                    <BetSlip
                      jackpot={jackpot}
                      betslipValidationData={
                        slip_validated_data ?? betslipValidationData
                      }
                      live={live}
                      jackpotData={jackpotData}
                    />
                  )}
                </div>
                <QuickLogin />
              </div>
            </div>
            <CompanyInfo />
          </div>

          {/*    removed item here*/}
        </>
      )}

      <div
        className={`${
          betSlipMobile
            ? jackpot
              ? "d-block"
              : "d-none"
            : jackpot
            ? " d-block "
            : " d-block tablet-only "
        }  
                      fixed-bottom text-center text-white bet-slip-footer-toggle`}
      >
        {pathname == "/jackpot" ? (
          <JackpotMenu jackpotData={jackpotData} matches={matches} />
        ) : (
          <MobileMenu
            jackpot={jackpot}
            betslipValidationData={betslipValidationData}
            jackpotData={jackpotData}
            kiron={kiron}
          />
        )}
      </div>
    </div>
  );
});
export default React.memo(Right);
