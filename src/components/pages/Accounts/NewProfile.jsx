import React, {useContext, useEffect, useState} from 'react';
import './component/newProfile.css'
import {Link, useNavigate} from "react-router-dom";
import accounts from '../../../assets/img/mobile/user.png'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faCoins, faDownload, faHome, faPowerOff, faUpload} from "@fortawesome/free-solid-svg-icons";
import {formatNumber} from "../../utils/betslip";
import {getFromLocalStorage, setLocalStorage} from "../../utils/local-storage";
import Right from "../../right";
import SidebarProfile from "../../sidebar/sidebarProfile";
import makeRequest from "../../utils/fetch-request";
import {StoreContext } from "../../../context/store"
import {LazyLoadImage} from "react-lazy-load-image-component";

const NewProfile = React.memo(
    () => {
        const [user, setUser] = useState(getFromLocalStorage("user"));
        const { state, dispatch } = useContext(StoreContext);

        const clearHistory = () => {
            setLocalStorage("user", null)
            return window.location.href = "/logout"
        }
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
                }
            });

        };

        useEffect(() => {
            updateUserOnHistory()
        }, [updateUserOnHistory])

        const navigate = useNavigate()
        return (
            <>
                {/*todo else clause */}
                <div>
                    <div className="profile-container-desktop d-flex">
                        <div className={' mobile-ipad-remove-profile stats-desktop'}>
                            <SidebarProfile/>
                        </div>

                        <div className="col mobile-full-width">
                            <div className="iphone">
                                <div className="header-profile">
                                    <div className="user-profile d-flex align-items-center">
                                        <LazyLoadImage src={accounts} className="user-photo "/>

                                    </div>
                                    <div className="header-profile-summary">
                                        <div className="summary-text d-flex gap-3">
                                            {/*	session information*/}
                                            <>
                                                My Account (<span
                                                className={"text-warning"}>+{state?.user?.msisdn?state?.user?.msisdn:""}</span>)
                                            </>
                                            <Link
                                                to={{pathname: "/"}}
                                                className={" text-profile-link"} title={'HOME'}
                                            >
                                      <span className="text-profile-link">
                                       <span className=" text-profile-link"> <FontAwesomeIcon
                                           icon={faHome}/></span>&nbsp;
                                          HOME
                                      </span>
                                            </Link>

                                        </div>
                                    </div>

                                </div>
                                <div className="content mt-3 mb-4">
                                    <div className="card">
                                        <div className="upper-row">
                                            <div className="card-item">
                                                {/*todo balance*/}
                                                <span>Cash Balance</span>
                                                <span>
											<span className="dollar">Ksh {formatNumber(user?.balance) || 0}</span>
										</span>
                                            </div>
                                            <div className="card-item">
                                                {/*todo bonus*/}
                                                <span>Bonus Balance</span>
                                                <span>
											<span className="dollar">Ksh {formatNumber(user?.bonus) || 0}</span>
										</span>
                                            </div>
                                        </div>
                                        <div className="upper-row">
                                            <div className="card-item">
                                                {/*todo gift*/}
                                                <span>Gift Balance</span>
                                                <span>
											<span className="dollar">Ksh {formatNumber(user?.gift_balance) || 0}</span>
										</span>
                                            </div>
                                            <div className="card-item">
                                                {/*/todo nare poinsts*/}
                                                <span>Nare Points</span>
                                                <span>
											<span
                                                className="dollar"> Pts {formatNumber(user?.points_balance) || 0}</span>
										</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Link to="/deposit" style={{textDecoration: "none", color: "black"}}>
                                        <div className="transactions">
                                            <div className="transaction">
                                                <div className="t-icon-container">
                                                    <div className="icon">
                                                        {/*<i className="fas fa-upload"></i>*/}
                                                        <FontAwesomeIcon icon={faUpload}/>
                                                    </div>
                                                </div>
                                                <div className="t-details">
                                                    <div className="t-title">Deposit</div>
                                                </div>
                                                <div className="t-amount">
                                                    <LazyLoadImage
                                                        src="https://storage.googleapis.com/nareimages/affiliate/mpesa.svg"
                                                        width="50px" alt=""/>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                    <div onClick={() => navigate("/withdraw")}
                                         style={{textDecoration: "none", color: "black"}}>
                                        <div className="transaction">
                                            <div className="t-icon-container">
                                                <div className="icon">
                                                    {/*<i className="fas fa-download"></i>*/}
                                                    <FontAwesomeIcon icon={faDownload}/>
                                                </div>
                                            </div>
                                            <div className="t-details">
                                                <div className="t-title">Withdraw</div>
                                            </div>
                                            <div className="t-amount">
                                                <LazyLoadImage
                                                    src="https://storage.googleapis.com/nareimages/affiliate/mpesa.svg"
                                                    width="50px" alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                    <Link to="/redeem-points" style={{textDecoration: "none", color: "black"}}>
                                        <div className="transaction">
                                            <div className="t-details">
                                                <div className="t-title">Redeem Points</div>
                                            </div>
                                            <div className="t-amount">
                                                {/*<i className="fas fa-coins" style={{fontSize: "24px"}}></i>*/}
                                                <FontAwesomeIcon icon={faCoins} style={{fontSize: "24px"}}/>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to="/my-bets" style={{textDecoration: "none", color: "black"}}>
                                        <div className="transaction">
                                            <div className="t-details">
                                                <div className="t-title">My Bets</div>
                                            </div>
                                            <div className="t-amount">
                                                {/*<i className="fas fa-bars" style={{fontSize: "24px"}}></i>*/}
                                                <FontAwesomeIcon icon={faBars} style={{fontSize: "24px"}}/>
                                            </div>
                                        </div>
                                    </Link>
                                    {/*<Link to="/affiliate" style={{textDecoration: "none", color: "black"}}>*/}
                                    {/*	<div className="transaction">*/}
                                    {/*		<div className="t-details">*/}
                                    {/*			<div className="t-title">Become An Affiliate </div>*/}
                                    {/*		</div>*/}
                                    {/*		<div className="t-amount">*/}
                                    {/*			/!*<i className="fas fa-fire" style={{fontSize: "24px"}}></i>*!/*/}
                                    {/*			<FontAwesomeIcon  icon={faFire} style={{fontSize: "24px"}}/>*/}
                                    {/*		</div>*/}
                                    {/*	</div>*/}
                                    {/*</Link>*/}
                                    <Link to={"#"} style={{textDecoration: "none", color: "black"}}
                                          onClick={() => clearHistory()}>
                                        <div className="transaction">
                                            <div className="t-details">
                                                <div className="t-title">Log Out</div>
                                            </div>
                                            <div className="t-amount">
                                                {/*<i className="fas fa-power-off" style={{fontSize: "24px"}}></i>*/}
                                                <FontAwesomeIcon icon={faPowerOff} style={{fontSize: "24px"}}/>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'ipad-show'}>
                    <Right/>
                </div>


            </>
        )
    })
export default React.memo(NewProfile)