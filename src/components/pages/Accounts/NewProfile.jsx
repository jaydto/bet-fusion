import React, { useEffect, useState } from "react";
import "./component/newProfile.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faBars,
  faCoins,
  faDownload,
  faGift,
  faPowerOff,
  faUpload,
  faUserCircle,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { formatNumber } from "../../utils/betslip";
import {
  getFromLocalStorage,
  setLocalStorage,
} from "../../utils/local-storage";
import SidebarProfile from "../../sidebar/sidebarProfile";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import useWindowDimensions from "../../header/Dimensions";
import { userPromoPoints } from "../../../redux/authSlice";
import WithdrawProfile from "./component/WithdrawProfile";
import DepositForm from "./component/depositCard";
import WithdrawForm from "./component/withdrawCard";
import SupportContainer from "./component/supportContainer";
import bonus from "../../../assets/img/mobile/bonus.svg";
import profilep from "../../../assets/img/mobile/profile-p.svg";
import balance from "../../../assets/img/mobile/balance.svg";
import DepositModal from "../../modals/DepositModal";
import { setState } from "../../../redux/dataSlice";

const NewProfile = React.memo(() => {
  const userData = useSelector((state) => state.auth.user);
  const [user, setUser] = useState(getFromLocalStorage("user"));
  const { width } = useWindowDimensions();
  const dispatchRedux = useDispatch();

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

  const navigate = useNavigate();
  const hideModal = () => {
    dispatchRedux(setState("show_deposit_modal", false));
  };
  const showModal = () => {
    dispatchRedux(setState("show_deposit_modal", true));
  };
  return (
    <>
      {showDepositModal && <DepositModal />}

      <div>
        <div className="profile-container-desktop d-flex">
          <div
            className="col mobile-full-width"
            style={{ background: "var(--bet-dojo-header-bg)" }}
          >
            <div className="iphone">
              <div className="content mb-4 px-4">
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <LazyLoadImage
                    src={profilep}
                    className="mb-2 icon-large icon-white  bg-p-icon "
                  />
                  <span className="h4 text-light">{user?.msisdn}</span>
                </div>
                <div className="card mb-3 top-pr">
                  <div className="upper-row">
                    <div className="card-item d-flex  align-items-center px-2">
                      {/* Cash Balance with Wallet Icon in Column Layout */}
                      <LazyLoadImage
                        src={balance}
                        className="mb-2 icon-large icon-white "
                      />
                      <div className="balance-container d-flex flex-column align-items-start px-3">
                        <div className="t-label">Balance</div>
                        <div className="dollar">
                          Ksh {formatNumber(user?.balance) || 0}
                        </div>
                      </div>
                    </div>
                    <div className="card-item d-flex  align-items-center px-2">
                      {/* Bonus Balance with Gift Icon in Column Layout */}
                      <LazyLoadImage
                        src={bonus}
                        className="mb-2 icon-large icon-white "
                      />
                      <div className="balance-container d-flex flex-column align-items-start px-3">
                        <div className="t-label">Bonus </div>
                        <div className="dollar">
                          Ksh {formatNumber(user?.bonus) || 0}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  className={`w-100 button-radius input-field btn-font login-button2 mb-4 btn bold`}
                  style={{ position: "relative", borderRadius: "12px" }}
                  disabled={user ? false : true}
                  onClick={showModal}
                  type="submit"
                >
                  <span>Deposit</span>
                </button>

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
                                  <div className={"promo-text-actual dollar"}>
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
                <div className="card mb-3 top-pr">
                  <div className="upper-row text-light p-3">
                    Enquire missing deposit{" "}
                    <FontAwesomeIcon icon={faAngleRight} />
                  </div>
                </div>
                <div className="card mb-3 top-pr">
                  <div className="upper-row text-light p-3">
                    Promotions <FontAwesomeIcon icon={faAngleRight} />
                  </div>
                </div>
                <div className="card mb-3 top-pr">
                  <div className="upper-row text-light p-3">
                    My Transactions <FontAwesomeIcon icon={faAngleRight} />
                  </div>
                </div>

                <WithdrawForm />
                <div className="card mb-3 top-pr">
                  <div className="upper-row text-light p-3">
                    Gaming Records <FontAwesomeIcon icon={faAngleRight} />
                  </div>
                </div>
                <div className="card mb-3 top-pr">
                  <div className="upper-row text-light p-3">
                    Change Password <FontAwesomeIcon icon={faAngleRight} />
                  </div>
                </div>
                <p>Settings</p>
                <div className="card mb-3 top-pr">
                  <div className="upper-row text-light p-3">
                    Light theme
                    <FontAwesomeIcon icon={faAngleRight} />
                  </div>
                  <div className="upper-row text-light p-3">
                    Data Saver
                    <FontAwesomeIcon icon={faAngleRight} />
                  </div>
                </div>

                <p>Support</p>
                <div className="card mb-3 top-pr">
                  <div className="upper-row text-light p-3">
                    Delete Account
                    <FontAwesomeIcon icon={faAngleRight} />
                  </div>
                </div>

                {/* <SupportContainer /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
export default React.memo(NewProfile);
