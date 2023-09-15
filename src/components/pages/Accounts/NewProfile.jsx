import React, {useEffect, useState} from 'react';
import './component/newProfile.css'
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faCoins, faDownload, faPowerOff, faUpload} from "@fortawesome/free-solid-svg-icons";
import {formatNumber} from "../../utils/betslip";
import {getFromLocalStorage, setLocalStorage} from "../../utils/local-storage";
import SidebarProfile from "../../sidebar/sidebarProfile";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useSelector} from "react-redux";
const Header=React.lazy(()=>import('../../header/header'))

const NewProfile = React.memo(
    () => {
        const userData=useSelector((state)=>state.auth.user)
        const [user, setUser]=useState(getFromLocalStorage("user"))

        useEffect(()=>{
            if(userData){
                setUser(userData||getFromLocalStorage("user"))
            }
        }, [userData])
        const clearHistory = () => {
            setLocalStorage("user", null)
            return window.location.href = "/logout"
        }

        const navigate = useNavigate()
        return (
            <>
                <Header profile={true}/>
                <div>
                    <div className="profile-container-desktop d-flex">
                        <div className={' mobile-ipad-remove-profile stats-desktop'}>
                            <SidebarProfile/>
                        </div>

                        <div className="col mobile-full-width">
                            <div className="iphone">
                                <div className="content mb-4">
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
                                                        <FontAwesomeIcon icon={faUpload}/>
                                                    </div>
                                                </div>
                                                <div className="t-details">
                                                    <div className="t-title">Deposit</div>
                                                </div>
                                                <div className="t-amount">
                                                    <LazyLoadImage
                                                        effects={"blur"}
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
                                                    effect={"blur"}
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
                                    <Link to={"#"} style={{textDecoration: "none", color: "black"}}
                                          onClick={() => clearHistory()} className={'mb-5'}>
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


            </>
        )
    })
export default React.memo(NewProfile)