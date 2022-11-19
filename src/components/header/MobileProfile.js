import React from 'react';
import {formatNumber} from "../utils/betslip";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoins, faDollarSign, faListOl, faLock, faSmile, faUser} from "@fortawesome/free-solid-svg-icons";
import {Navbar} from "react-bootstrap";

const MobileProfile = (props) => {
    const {user} = props;
    return (<>
        {user && (
            <div className={"d-flex justify-content-between mobile-width"}>
            <div className="ale ss profile d-flex flex-row row  tablet-design justify-content-between ">
                <div className="col d-flex flex-column right justify-content-center w-change1">
                    <div>
                        <span className="font-btn d-flex flex-column">
                            <div className={"d-flex align-items-center"}>
                                <FontAwesomeIcon
                                    icon={faDollarSign}/> Cash
                            </div>
                        <div>
                             <strong style={{color: "#FFB200"}}>  {formatNumber(user.balance) || 0}</strong>
                        </div>

                            </span>
                    </div>

                </div>
                <div className="col  d-flex flex-column right justify-content-center w-change1">
                <div>

                        <Link to={{pathname: "/redeem-points"}} className={'link-info text-info w-change2'} title={'Click to Redeem'}>
                           <span className="font-btn rounded btn-sm outline-info d-flex flex-column">
                              <span className={"d-flex align-items-center px-1"}>
                                   <FontAwesomeIcon
                                       icon={faListOl}/> Points
                               </span>
                               <span>
                                   <strong> {formatNumber(user.points_balance) || 0}</strong>
                               </span>
                           </span>

                        </Link>

                </div>

            </div>
                <div className="col  d-flex flex-column right justify-content-center w-change1">
                    <div>
                        <span className="font-btn py-2 px-2 d-flex flex-column">
                        <span className={"d-flex align-items-center px-1"}>
                            <FontAwesomeIcon
                            icon={faSmile}/> Bonus
                        </span>
                            <span>
                                <strong>{formatNumber(user.bonus) || 0}</strong>
                            </span>
                        </span>
                    </div>
            </div>

        </div>

            </div>)}

    </>);
};

export default MobileProfile;
