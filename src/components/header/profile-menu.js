import React, {useContext, useEffect, useState} from "react";
import {
    faCloudDownloadAlt,
    faCoins,
    faReceipt,
    faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {formatNumber} from "../utils/betslip";
import {Link} from "react-router-dom";
import {Navbar} from "react-bootstrap";
import {getFromLocalStorage} from "../utils/local-storage";
import {useDispatch, useSelector} from "react-redux";
import {setState} from "../../redux/dataSlice";

const ProfileMenu = React.memo(
    (props) => {
        const {profile} = props;
        const [themeLight, setThemeLight] = useState(false)
        const userData = useSelector((state) => state.auth.user)
        const show=useSelector((state)=>state.data.show_menu)
        const dispatchRedux=useDispatch()

        const handleShow = () => {
            dispatchRedux(setState('show_menu', true))
        };
        const handleClose = () => {
            dispatchRedux(setState('show_menu', false))
        };
        const toggle = () => {
            show?handleClose():handleShow()
        };

        const [user, setUser] = useState(getFromLocalStorage("user"))

        useEffect(()=>{
            if(userData){
                setUser(userData||getFromLocalStorage("user"))

            }
        }, [userData])



        const urlPath = window.location.pathname
        const showBalance = (!urlPath.includes("nare-games") && !urlPath.includes("gameplay") && !urlPath.includes("smart-play"))



        return (
            <>
                {user && (
                    <>
                        <div className="row w-100 d-flex align-items-center justify-content-end px-3 ">

                            {showBalance && !profile &&
                                <div className="w-auto d-flex  text-white align-items-end" title={'CASH'}>
                                    <div className={"profile-wrap"} style={{color: "#FFB200"}}>
                                        <FontAwesomeIcon
                                            icon={faCoins}/>
                                        <strong style={{color: "#FFB200"}}> KSH {formatNumber(user?.balance) || 0.0}</strong>
                                    </div>


                                </div>}

                            <div className="w-auto d-flex text-white align-items-start">
                                <div className={"profile-wrap"}>
                                    <Link
                                        to={{pathname: "/deposit"}}
                                        className={"deposit-button"}
                                        title={'DEPOSIT FUNDS'}>
                                      <span className="">
                                       <span className=" "> <FontAwesomeIcon
                                           icon={faCloudDownloadAlt}/></span>
                                          <strong style={{fontSize: "15px", fontWeight: "700"}}> Deposit</strong>
                                      </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="w-auto d-flex text-white align-items-start">
                                <div className={"profile-wrap"} style={{color: "#FFB200"}}>
                                    <Link
                                        to={ "/bet-history?competition_id=2"}
                                        style={{color: "#FFB200", fontSize: "14px"}}
                                        title={'MY BETS'}>
                                      <span className="">
                                       <span className=" "> <FontAwesomeIcon
                                           icon={faReceipt}/></span>
                                          <strong> My Bets</strong>
                                      </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="w-auto d-flex  text-white align-items-end " title={'PROFILE'}>
                                {!profile && <Link className={"profile-wrap"} to={'/profile'}>
                                    <div className="font-btn text-light">
                                        <div className="space-icons text-light">
                                            <FontAwesomeIcon icon={faUserAlt}/>
                                        </div>
                                        <strong>Profile</strong>
                                    </div>
                                </Link>}

                                <div className="col-1 button-toggle space-button">
                                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"md"}`}
                                                   className="px-3 py-3" onClick={toggle}/>
                                </div>
                            </div>
                            {/*<div className="w-auto d-flex  text-white align-items-end"  title={'Theme'}>*/}
                            {/*    <div className="cg " onClick={()=>handleThemeChange()}>*/}
                            {/*        {!themeLight?<FontAwesomeIcon icon={faAdjust} style={{fontSize:'20px'}} className={'text-light'}/>:<FontAwesomeIcon icon={faSun} className={'text-warning'} style={{fontSize:'20px'}}/>}*/}
                            {/*    </div>*/}

                            {/*</div>*/}
                        </div>
                    </>

                )}
            </>
        );
    });

export default React.memo(ProfileMenu);
