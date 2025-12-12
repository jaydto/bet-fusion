import React, { useEffect, useState } from "react";
import "./component/newProfile.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { formatNumber } from "../../utils/betslip";
import {
  getFromLocalStorage,
  setLocalStorage,
} from "../../utils/local-storage";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import useWindowDimensions from "../../header/Dimensions";
import { userBalance, userPromoPoints } from "../../../redux/authSlice";

import WithdrawForm from "./component/withdrawCard";
import profilep from "../../../assets/img/mobile/profile-p.svg";
import balance from "../../../assets/img/mobile/balance.svg";
import DepositModal from "../../modals/DepositModal";
import WithdrawalModal from "../../modals/WithdrawModal";
import { setState } from "../../../redux/dataSlice";
import JisortModal from "../../modals/JisortModal";
import { Switch } from "@mui/material";
import { Card, Col, Grid, Row, Typography } from "antd";
import { WalletOutlined, GiftOutlined } from "@ant-design/icons";
import SearchModal from "../../modals/SearchModal";
import Profile from "../../../assets/img/Profile1.svg";
import Wallet from "../../../assets/img/Wallet1.svg";
import Coins from "../../../assets/img/Coins.svg";

const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

const NewProfile = React.memo(() => {
  const userData = useSelector((state) => state.auth.user);
  const [user, setUser] = useState(getFromLocalStorage("user"));
  const { width } = useWindowDimensions();
  const dispatchRedux = useDispatch();
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const casinoSearchModal = useSelector(
    (state) => state.virtuals.casino_search_modal
  );
  useEffect(() => {
    if (userData) {
      setUser(userData || getFromLocalStorage("user"));
    }
  }, [userData]);

  const updateUserOnHistory = () => {
    if (!user) {
      return false;
    }
    let udata = {
      token: user.token,
    };
    const userValues = {
      udata: udata,
      user: user,
    };

    dispatchRedux(userPromoPoints(userValues));
    dispatchRedux(userBalance(userValues));
  };
  useEffect(() => {
    const abort = new AbortController();
    updateUserOnHistory();
    return () => {
      abort.abort();
    };
  }, []);
  const clearHistory = () => {
    setLocalStorage("user", null);
    return (window.location.href = "/logout");
  };
  const showDepositModal = useSelector(
    (state) => state.data.show_deposit_modal
  );

  const showJisortModal = useSelector((state) => state.data.show_jisort_modal);

  const navigate = useNavigate();

  const [isLightTheme, setIsLightTheme] = useState(false);

  const hideJisortModal = () => {
    dispatchRedux(setState("show_jisort_modal", false));
  };

  const showJModal = () => {
    dispatchRedux(setState("show_jisort_modal", true));
  };
  const showModal = () => {
    dispatchRedux(setState("show_deposit_modal", true));
  };

  const handleWithdrawClick = () => {
    dispatchRedux(setState("show_withdraw_modal", true));
  };

  useEffect(() => {
    const body = document.body;
    if (isLightTheme) {
      body.classList.add("light-theme");
    } else {
      body.classList.remove("light-theme");
    }
  }, [isLightTheme]);

  return (
    <>
      {showDepositModal && <DepositModal />}
      {casinoSearchModal && <SearchModal />}
      {handleWithdrawClick && <WithdrawalModal />}

      {showJisortModal && (
        <JisortModal
          visible={showJisortModal}
          setShowJisortModal={hideJisortModal}
        />
      )}


      <div>
        <div
          className="profile-container-desktop d-flex"
          style={{ maxWidth: "767px", margin: "auto" }}
        >
          <Row gutter={isMobile ? [8, 6] : [16, 16]} style={{ width: "100%" }}>
            <Col xs={24} sm={24} md={24} lg={24}>
              {" "}
              {/* Adjust col span as needed */}
              <div className="col mobile-full-width">
                <div className="iphone">
                  <div className="content mb-4 px-4">
                    <div className="d-flex flex-column justify-content-center align-items-center gap-4">
                      <LazyLoadImage
                        src={Profile}
                        className="mb-2 icon-large icon-white  bg-p-icon "
                        style={{ borderRadius: "16px" }}
                      />
                      <span className="h4 text-light-p mb-4">{user?.msisdn}</span>
                    </div>
                    <BalanceCard  user={user}/>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                      <button
                        className={`w-100 button-radius input-field btn-font withdraw-button2 mb-4 btn bold`}
                        style={{ position: "relative", borderRadius: "12px" }}
                        disabled={user ? false : true}
                        onClick={handleWithdrawClick}
                        type="submit"
                      >
                        <span>Withdraw</span>
                      </button>

                      <button
                        className={`w-100 button-radius input-field btn-font login-button2 mb-4 btn bold`}
                        style={{ position: "relative", borderRadius: "12px" }}
                        disabled={user ? false : true}
                        onClick={showModal}
                        type="submit"
                      >
                        <span>Deposit</span>
                      </button>
                    </div>

                    {user?.promo_points?.end_date &&
                      new Date(user.promo_points.end_date) > new Date() && (
                        <Link
                          to={`/promo?id=15`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <div className="transaction d-flex align-items-center justify-content-between mb-0">
                            <div className="">
                              <div className="t-title gap-2 d-flex flex-column w-100">
                                <div
                                  className={
                                    "promo-text-size text-center title-promo"
                                  }
                                >
                                  {user?.promo_points?.title}
                                </div>
                                <div
                                  className={
                                    "d-flex justify-content-between points-promo-card px-3 mb-2"
                                  }
                                >
                                  <div className="">
                                    <div className="t-title d-flex flex-column justify-content-between  align-content-between">
                                      <div className={"promo-text-size"}>
                                        End Date:
                                      </div>
                                      <div
                                        style={{ color: "var(--faded-color)" }}
                                        className={"promo-text-actual"}
                                      >
                                        {user?.promo_points?.end_date}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="">
                                    <div className="t-title d-flex flex-column justify-content-between   align-content-between">
                                      <div className={"promo-text-size"}>
                                        Promo Entry Points:
                                      </div>
                                      <div
                                        className={"promo-text-actual dollar"}
                                      >
                                        Pts {user?.promo_points?.points}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <LazyLoadImage
                                  src={
                                    width > 991
                                      ? user?.promo_points?.promo_image
                                      : user?.promo_points?.promo_image
                                  }
                                  effect={"blur"}
                                  className={"promo-active-profile-img"}
                                />
                              </div>
                            </div>
                          </div>
                        </Link>
                      )}
                    {/* <div className="card mb-3 top-pr">
                      <div
                        className="upper-row text-light-p p-3"
                        onClick={showJModal}
                        style={{ cursor: "pointer" }}
                      >
                        Enquire missing deposit{" "}
                        <FontAwesomeIcon icon={faAngleRight} />
                      </div>
                    </div> */}
                    <div className="card mb-3 top-br" onClick={() => navigate("#")} style={{ cursor: "pointer" }}>
                      <div className="upper-row text-light-p p-3">
                        Self Exclusion <FontAwesomeIcon icon={faAngleRight} style={{ alignSelf: "center" }} />
                      </div>
                    </div>
                    <div className="card mb-3 top-br" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
                      <div className="upper-row text-light-p p-3">
                        Promotions <FontAwesomeIcon icon={faAngleRight} style={{ alignSelf: "center" }}/>
                      </div>
                    </div>

                    {/* <WithdrawForm /> */}

                    {/* <div className="card mb-3 top-pr">
                      <div className="upper-row text-light-p p-3">
                        Change Password <FontAwesomeIcon icon={faAngleRight} />
                      </div>
                    </div> */}
                    {/* <p style={{ color: "var(--light)" }}>Settings</p> */}
                    {/* Theme Toggle */}
                    {/* <div className="card mb-3 top-pr">
                      <div
                        className="upper-row text-light-p p-3 d-flex justify-content-between align-items-center"
                        onClick={() => setIsLightTheme((prev) => !prev)}
                        style={{ cursor: "pointer" }}
                      >
                        <span>Light Theme</span>
                        <span className="px-4">
                          <FontAwesomeIcon
                            color="var(--gold)"
                            size="lg"
                            icon={isLightTheme ? faMoon : faSun}
                          />
                        </span>
                      </div>

                      <div className="upper-row text-light-p p-3 d-flex justify-content-between align-items-center">
                        <span>Data Saver</span>
                        <Switch
                          checked={isDataSaverOn}
                          onChange={() => setIsDataSaverOn((prev) => !prev)}
                          color="primary"
                          inputProps={{ "aria-label": "Data Saver Switch" }}
                        />
                      </div>
                    </div> */}
                    <div style={{ padding: "10px", backgroundColor: "var(--bet-fusion-secondary)", borderRadius: "12px" }}>
                      <h4 style={{ color: "var(--white)", marginLeft: "5px" }}>Support</h4>
                      <div className="card mb-3 top-br">
                        <div
                          className="upper-row text-light-p p-3"
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate("#")}
                        >
                          Delete Account
                          <FontAwesomeIcon icon={faAngleRight} style={{ alignSelf: "center" }} />
                        </div>
                      </div>

                      <div className="card mb-3 top-br">
                        <div
                          className="upper-row text-light-p p-3"
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate("/responsible-gambling")}
                        >
                          Responsible gaming
                          <FontAwesomeIcon icon={faAngleRight} style={{ alignSelf: "center" }} />
                        </div>
                      </div>

                      <div className="card mb-3 top-br">
                        <div
                          className="upper-row p-3"
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate("/auth/logout")}
                        >
                          <span style={{ color: "var(--bet-fusion-red)"}}>Sign Out</span>
                        </div>
                      </div>
                      {/* <SupportContainer /> */}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
});
export default React.memo(NewProfile);

const BalanceCard = ({ user }) => {
  const balance = user?.balance || 0;

  return (
    <Card className="mb-3 top-pr balance-card p-0">
      <div className="w-100" style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
        {/* Cash Balance */}
        <div className="d-flex align-items-center px-2">
          <LazyLoadImage
            src={Wallet}
            className="mb-2 icon-large icon-white  bg-p-icon "
          />
          <div className="d-flex flex-column">
            <Text type="secondary" style={{ color: "var(--white)" }}>
              Balance
            </Text>
            <Title level={5} style={{ margin: 0, color: "var(--white)" }}>
              Ksh {formatNumber(balance)}
            </Title>
          </div>
        </div>

        {/* Bonus Balance */}
        <div className="d-flex align-items-center px-2">
          <LazyLoadImage
            src={Coins}
            className="mb-2 icon-large icon-white  bg-p-icon "
          />
          <div className="d-flex flex-column">
            <Text type="secondary" style={{ color: "var(--white)" }}>
              Balance
            </Text>
            <Title level={5} style={{ margin: 0, color: "var(--white)" }}>
              Ksh {formatNumber(balance)}
            </Title>
          </div>
        </div>


        {/* Bonus Balance */}
        {/* <div className="d-flex align-items-center px-2">
          <GiftOutlined
            style={{
              fontSize: 32,
              color: "var(--bet-fusion-button-login)",
              marginRight: 12,
            }}
          />
          <div className="d-flex flex-column">
            <Text type="secondary" style={{ color: "var(--light)" }}>
              Bonus
            </Text>
            <Title level={5} style={{ margin: 0, color: "var(--light)" }}>
              Ksh {formatNumber(bonus)}
            </Title>
          </div>
        </div> */}
      </div>
    </Card>
  );
};
