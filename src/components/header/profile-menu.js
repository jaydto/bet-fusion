import React from "react";
import {
    faLock,
    faCloudUploadAlt,
    faCloudDownloadAlt, faGifts, faDollarSign, faListOl, faSmile, faUserAlt, faList, faMoneyBillWave, faCoins
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {formatNumber} from "../utils/betslip";
import {Link} from "react-router-dom";
import {Navbar} from "react-bootstrap";

const ProfileMenu = (props) => {
    const {user} = props;
    return (
        <>
            {user && (
                <>
                    <div className="row w-100 d-flex align-items-center justify-content-end px-3 ">

                        <div className="col d-flex flex-column text-white align-items-end"  title={'CASH'}>
                            <div className={"profile-wrap"} style={{color: "#FFB200"}}>
                                <FontAwesomeIcon
                                    icon={faCoins}/>
                                <strong style={{color: "#FFB200"}}> KSH {formatNumber(user.balance) || 0}</strong>
                            </div>
                            {/*<div className={"profile-wrap"}><FontAwesomeIcon*/}
                            {/*    icon={faGifts}/> Gift <strong>*/}
                            {/*    KSH {formatNumber(user.gift_balance) || 0} </strong></div>*/}

                        </div>
                        {/*<div className="col d-flex flex-column text-white align-items-start">*/}
                        {/*    <div className={"profile-wrap"}>*/}
                        {/*        <FontAwesomeIcon*/}
                        {/*            icon={faSmile}/> Bonus*/}
                        {/*        <strong>KSH {formatNumber(user.bonus) || 0}</strong>*/}
                        {/*    </div>*/}
                        {/*    <div className={"profile-wrap"}>*/}
                        {/*        <Link to={{pathname: "/redeem-points"}}*/}
                        {/*              className={'link-info text-info'} title={'Click to Redeem'}>*/}
                        {/*            <FontAwesomeIcon*/}
                        {/*                icon={faListOl}/> Points <strong> {formatNumber(user.points_balance) || 0}</strong>*/}
                        {/*        </Link>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="col-3 d-flex flex-column text-white align-items-start">
                            <div className={"profile-wrap"}>
                                <Link
                                    to={{pathname: "/deposit"}}
                                    className={"deposit-button"}
                                    title={'DEPOSIT FUNDS'}>
                                      <span className="">
                                       <span className=" "> <FontAwesomeIcon
                                           icon={faCloudDownloadAlt}/></span>
                                          <strong> DEPOSIT FUNDS</strong>
                                      </span>
                                </Link>
                            </div>

                            {/*<div className={"profile-wrap"}>*/}
                            {/*    <Link to={{pathname: "/withdraw"}} className={"withdraw-button text-white"}>*/}
                            {/*        <span className="">*/}
                            {/*        <span className=" space-icons"><FontAwesomeIcon icon={faCloudUploadAlt}/> </span>*/}
                            {/*            Withdraw*/}
                            {/*        </span>*/}
                            {/*    </Link>*/}
                            {/*</div>*/}

                        </div>
                        <div className="col-3 d-flex flex-column text-white align-items-end " title={'PROFILE'} >
                            <Link className={"profile-wrap btn profile-btn"} to={'/profile'}>
                              <div className="font-btn text-light" >
                              <div className="space-icons text-light" >
                                  <FontAwesomeIcon icon={faUserAlt}/> </div>
                                  {/*{user?.msisdn}*/}
                                  <strong>PROFILE</strong>
                              </div>
                            </Link>
                            {/*<div className={'d-flex flex-row justify-content-around'}>*/}
                            {/*    <div className={"profile-wrap"}>*/}
                            {/*        <Link to={{pathname: "/my-bets"}} title={"My Bets"} className={'text-white'}>*/}
                            {/*            <strong> <FontAwesomeIcon icon={faList}/> My Bets | </strong>*/}
                            {/*        </Link>*/}
                            {/*    </div>*/}
                            {/*    <div className={"profile-wrap"}>*/}
                            {/*        <a href="/logout">*/}
                            {/*            <span className=""> <FontAwesomeIcon icon={faLock}/></span> Logout*/}
                            {/*        </a>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className="col-1 button-toggle space-button">
                                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"md"}`} className="px-3 py-3"/>
                            </div>
                        </div>
                    </div>
                </>

            )}
        </>
    );
};

export default ProfileMenu;