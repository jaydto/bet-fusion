import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloudDownloadAlt, faCoins, faList, faSearch} from "@fortawesome/free-solid-svg-icons";
import {formatNumber} from "../utils/betslip";
import {Navbar} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {getFromLocalStorage} from "../utils/local-storage";
import {StoreContext} from "../../context/store";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import {useDispatch, useSelector} from "react-redux";
import {setState} from "../../redux/dataSlice";
import { shouldShowSearch } from "../../redux/navigationAction";

export const UserInfo = React.memo(
    (props) => {
        const {profile} = props
        const pathname = window.location.pathname;
        const {state, dispatch} = useContext(StoreContext);
        const gaEventTracker = useAnalyticsEventTracker('Navigation');
        const userData = useSelector((state) => state.auth.user)

        const [user, setUser] = useState(getFromLocalStorage("user"))


        useEffect(()=>{
            if(userData){
                setUser(userData||getFromLocalStorage("user"))

            }
        }, [userData])

        const dispatchRedux=useDispatch()
        const notShowSearch = dispatchRedux(shouldShowSearch(pathname));

        const show=useSelector((state)=>state.data.show_menu)

        const handleShow = () => {
            dispatchRedux(setState('show_menu', true))
        };
        const handleClose = () => {
            dispatchRedux(setState('show_menu', false))
        };
        const toggle = () => {
            show?handleClose():handleShow()
        };
        const urlPath = window.location.pathname
        const showBalance = (!urlPath.includes("nare-games") && !urlPath.includes("gameplay") && !urlPath.includes("smart-play"))

      

        return (
            <>
                {user &&
                    <div
                        className="col-md-6  d-flex  right justify-content-end align-items-center w-change2 gap-2 ipad-show"
                        style={{marginLeft: 'auto'}}>

                        <div>
                            <Link
                                to={{pathname: "/deposit"}}
                                className={"deposit-button size-font-user-action deposit-button-header bg-warning"}>
                                          <span className="">
                                              DEPOSIT
                                          </span>
                            </Link>
                        </div>
                        {showBalance && <div>
                            <div
                                className={"deposit-button size-font-user-action d-flex align-items-center"}
                                style={{marginRight: "12px"}}>
                                          <span className="text-muted-1">
                                           &nbsp;
                                              {/*todo here user balance*/}
                                              KSH {formatNumber(user?.balance) || 0.0}
                                          </span>
                            </div>
                        </div>}
                        <div className={'mybets-remove-on-mobile px-2'}>
                            <Link
                                to={ "/bet-history?competition_id=2"}
                                className={"deposit-button size-font-user-action"}>
                                          <span className={"text-success"}>
                                           <span className=" "> <FontAwesomeIcon
                                               icon={faList}/></span>&nbsp;
                                              MY BETS
                                          </span>
                            </Link>
                        </div>
                       
                        {/* <div className="col-1 button-toggle space-button"
                             style={{width: "4.1rem", overflowY: "auto", marginLeft: '20px'}}>
                            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"lg"}`}
                                           className="px-3 py-3" onClick={toggle}
                            />
                        </div> */}
                    </div>}
                <>
                    {!user && <div className="col-sm-2 mobile-profile1 align-items-center gap-3 ipad-show px-2"
                                   style={{marginLeft: 'auto'}}>
                        {/* {pathname !== '/signup' && <div className="remove-verify">
                            <Link className="cg  login-color login-size btn bg-success text-light"
                                  to={"/verify"} title="Verify Account"
                                  onClick={() => gaEventTracker('Verify')}>
                                <span className="register-label text-light">Verify</span>
                            </Link>
                        </div>} */}
                        {pathname !== '/signup' && <div className="">
                            <Link className="cg  login-color login-size btn btn-button-bg text-light"
                                  to={"/signup"} title="Join now"
                                  onClick={() => gaEventTracker('Register')}>
                                <span className="button-text-color-on-yellow text-weight-md">Register</span>
                            </Link>
                        </div>}

                        {pathname !== '/signup' &&
                            <Link to={"/login"} className="cg  login-color login-size btn" type="submit">
                                <span>Login</span>
                            </Link>}
                      
                        {/* <div className="col-1 button-toggle space-button"
                             style={{width: "4.1rem", overflowY: "auto", marginLeft: '20px'}}>
                            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"lg"}`} className="px-3 py-3"
                                           onClick={toggle}/>
                        </div> */}

                    </div>}
                </>
            </>
        )
    })