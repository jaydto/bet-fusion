import React, { useEffect, useState } from "react";
import "./component/newProfile.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleRight,
  faBars,
  faCoins,
  faDownload,
  faPowerOff,
  faUpload,
  faUserCircle,
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

  const navigate = useNavigate();
  return (
    <>
      <div>
        <div className="profile-container-desktop d-flex">
          <div className="col mobile-full-width" style={{background:"var(--CrashKali-header-bg)"}}>
            <div className="iphone">
              <div className="content mb-4 px-4">
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <FontAwesomeIcon 
                  style={{fontSize:"35px", marginTop:"2rem"}}
                    icon={faUserCircle}
                    size="lg"
                    className="bars h2 text-success"
                  />
                  <span className="h4 text-warning">{user?.msisdn}</span>
                </div>
                <div className="card">
                  <div className="upper-row">
                    <div className="card-item">
                      {/*todo balance*/}
                      <span className="t-label">Cash Balance</span>
                      <span>
                        <span className="dollar">
                          Ksh {formatNumber(user?.balance) || 0}
                        </span>
                      </span>
                    </div>
                    <div className="card-item">
                      {/*todo bonus*/}
                      <span className="t-label">Bonus Balance</span>
                      <span>
                        <span className="dollar">
                          Ksh {formatNumber(user?.bonus) || 0}
                        </span>
                      </span>
                    </div>
                  </div>
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

                <Link
                className="mt-4"
                  to="/bet-history?competition_id=2"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div className="transaction ">
                    <div className="t-details">
                      <div className="t-title">My Bets</div>
                    </div>
                    <div className="t-amount">
                      {/*<i className="fas fa-bars" style={{fontSize: "24px"}}></i>*/}
                      <FontAwesomeIcon
                        icon={faBars}
                        style={{ fontSize: "24px" }}
                      />
                    </div>
                  </div>
                </Link>


               
                <DepositForm/>

                <WithdrawForm/>
                
               

                <SupportContainer/>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
export default React.memo(NewProfile);
