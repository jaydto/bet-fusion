import React from "react";
import {
    faLock,
    faCloudUploadAlt,
    faCloudDownloadAlt, faGifts, faDollarSign, faListOl, faSmile, faUserAlt, faList
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
                    <div className="row">
                        <div className="col d-flex flex-column text-white">
                            <div>
                                <Link
                                    to={{pathname: "/deposit"}}
                                    className={"deposit-button"}>
                                      <span className="">
                                       <span className=" space-icons"> <FontAwesomeIcon
                                           icon={faCloudDownloadAlt}/></span>
                                          <strong>DEPOSIT FUNDS</strong>
                                      </span>
                                </Link>
                            </div>
                            <div>
                                <Link to={{pathname: "/withdraw"}} className={"withdraw-button text-white"}>
                                    <span className="">
                                    <span className=" space-icons"><FontAwesomeIcon icon={faCloudUploadAlt}/> </span>
                                        Withdraw
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <div className="col d-flex flex-column text-white">
                            <div>
                                <FontAwesomeIcon
                                    icon={faDollarSign}/> Cash
                                <strong style={{color: "#FFB200"}}> KSH {formatNumber(user.balance) || 0}</strong>
                            </div>
                            <div><FontAwesomeIcon
                                icon={faGifts}/> Nare Boost<strong>
                                KSH {formatNumber(user.gift_balance) || 0}</strong></div>
                        </div>
                        <div className="col d-flex flex-column text-white">
                            <div>
                                <FontAwesomeIcon
                                    icon={faSmile}/> Bonus
                                <strong>KSH {formatNumber(user.bonus) || 0}</strong>
                            </div>
                            <div>
                                <Link to={{pathname: "/redeem-points"}}
                                      className={'link-info text-info'} title={'Click to Redeem'}>
                                    <FontAwesomeIcon
                                        icon={faListOl}/> Points <strong> {formatNumber(user.points_balance) || 0}</strong>
                                </Link>
                            </div>
                        </div>
                        <div className="col d-flex flex-column text-white">
                            <div>
                              <span className="font-tbt ">
                              <span className=" space-icons">
                                  <FontAwesomeIcon icon={faUserAlt}/> </span>
                                  {user?.msisdn}
                              </span>
                            </div>
                            <div className={'d-flex flex-row justify-content-around'}>
                                <div>
                                    <Link to={{pathname: "/my-bets"}} title={"My Bets"} className={'text-white'}>
                                        <strong> <FontAwesomeIcon icon={faList}/> My Bets | </strong>
                                    </Link>
                                </div>
                                <div>
                                    <a href="/logout">
                                        <span className=""> <FontAwesomeIcon icon={faLock}/></span> Logout
                                    </a>
                                </div>
                            </div>
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
