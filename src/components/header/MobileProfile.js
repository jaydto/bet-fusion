import React from 'react';
import {formatNumber} from "../utils/betslip";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoins, faLock, faUser} from "@fortawesome/free-solid-svg-icons";
import {Navbar} from "react-bootstrap";

const MobileProfile = (props) => {
    const {user} = props;
    return (<>
        {user && (
            <div className={"d-flex"}>
            <div className="ale ss profile d-flex flex-row row  tablet-design  ">
            <div className="col-md-3  d-flex flex-column right justify-content-end w-change2">
                <div>
                    <Link
                        to={{pathname: "/deposit"}}
                        className={"btn text-white btn-outline-warning"}>
              <span className="font-btn overflow-hidden justify-content-center btn-outline-warning rescale">
               <span className=" space-icons"> <FontAwesomeIcon icon={faCoins}/></span> Deposit
              </span>
                    </Link>
                </div>
            </div>
                <div className="col-md-3 d-flex flex-column right justify-content-center w-change1">
                    <div>
                        <span className="font-btn d-flex flex-column">
                            <span>
                                Balance
                            </span>
                            <span>
                               {formatNumber(user.balance) || 0}
                            </span>
                        </span>
                    </div>

                </div>
                <div className="col-md-3  d-flex flex-column right justify-content-center w-change1">
                <div>
                    <a href="/redeem-points" className={'link-info text-info w-change2'} title={'Click to Redeem'}>
                            <span
                                className="font-btn rounded btn-sm outline-info d-flex flex-column">
                                <span className={"to-none"}>Nare</span> Points &nbsp;
                                {formatNumber(user?.points_balance) || 0}
                            </span>
                    </a>
                </div>
            </div>
                <div className="col-md-3  d-flex flex-column right justify-content-center w-change1">
                <div>
                    <span className="font-btn py-2 px-2 d-flex flex-column">Bonus {formatNumber(user.bonus) || 0} </span>
                </div>
            </div>

        </div>

            </div>)}

    </>);
};

export default MobileProfile;
