import React, {useEffect, useState} from 'react';
import './component/newProfile.css'
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faCoins, faDownload, faPowerOff, faUpload} from "@fortawesome/free-solid-svg-icons";
import {formatNumber} from "../../utils/betslip";
import {getFromLocalStorage, setLocalStorage} from "../../utils/local-storage";
import SidebarProfile from "../../sidebar/sidebarProfile";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useDispatch, useSelector} from "react-redux";
import useWindowDimensions from "../../header/Dimensions";
import { userPromoPoints } from '../../../redux/authSlice';

const NewProfile = React.memo(
    () => {
        const userData=useSelector((state)=>state.auth.user)
        const [user, setUser]=useState(getFromLocalStorage("user"))
        const {width}=useWindowDimensions()
        const dispatchRedux = useDispatch()

        useEffect(()=>{
            if(userData){
                setUser(userData||getFromLocalStorage("user"))
            }
        }, [userData])

        const updateUserOnHistory = () => {
            if (!user) {
                return false;
            }
            let udata = {
                token: user.token
            }
            const userValues = {
                udata: udata,
                user: user
            }

            dispatchRedux(userPromoPoints(userValues))

        };
        useEffect(() => {
            const abort = new AbortController()
            updateUserOnHistory()
            return () => {
                abort.abort()
            }
        }, [])
        const clearHistory = () => {
            setLocalStorage("user", null)
            return window.location.href = "/logout"
        }

        const navigate = useNavigate()
        return (
            <>
                <div>
                    <div className="profile-container-desktop d-flex">
                        <div className={' mobile-ipad-remove-profile stats-desktop'}>
                            <SidebarProfile/>
                        </div>

                        <div className="col mobile-full-width">
                            <div className="iphone">
                                <div className="content mb-4 px-4">
                                    <div className="card">
                                        <div className="upper-row">
                                            <div className="card-item">
                                                {/*todo balance*/}
                                                <span className='t-label'>Cash Balance</span>
                                                <span>
											<span className="dollar">Ksh {formatNumber(user?.balance) || 0}</span>
										</span>
                                            </div>
                                            <div className="card-item">
                                                {/*todo bonus*/}
                                                <span className='t-label'>Bonus Balance</span>
                                                <span>
											<span className="dollar">Ksh {formatNumber(user?.bonus) || 0}</span>
										</span>
                                            </div>
                                        </div>
                                       
                                    </div>
                                  
                                    {
  user?.promo_points?.end_date && new Date(user.promo_points.end_date) > new Date() && (
    <Link to={`/promo?id=15`} style={{ textDecoration: "none", color: "black" }}>
      <div className="transaction d-flex align-items-center justify-content-between mb-0">
        <div className="">
          <div className="t-title gap-2 d-flex flex-column w-100">
            <div className={'promo-text-size text-center title-promo'}>{user?.promo_points?.title}</div>
            <div className={'d-flex justify-content-between points-promo-card px-3 mb-2'}>
              <div className="">
                <div className="t-title d-flex flex-column justify-content-between  align-content-between">
                  <div className={'promo-text-size'}>End Date:</div>
                  <div style={{ color: 'var(--faded-color)' }} className={'promo-text-actual'}>{user?.promo_points?.end_date}</div>
                </div>
              </div>
              <div className="">
                <div className="t-title d-flex flex-column justify-content-between   align-content-between">
                  <div className={'promo-text-size'}>Promo Entry Points:</div>
                  <div className={'promo-text-actual dollar'}>Pts {user?.promo_points?.points}</div>
                </div>
              </div>
            </div>
            <LazyLoadImage src={width > 991 ? user?.promo_points?.promo_image : user?.promo_points?.promo_image} effect={'blur'} className={'promo-active-profile-img'} />
          </div>
        </div>
      </div>
    </Link>
  )
}


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
