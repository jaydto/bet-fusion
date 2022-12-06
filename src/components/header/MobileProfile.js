import React from 'react';
import {formatNumber} from "../utils/betslip";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDollarSign, faGifts, faListOl, faSmile} from "@fortawesome/free-solid-svg-icons";
import useWindowDimensions from "./Dimensions";

const MobileProfile = (props) => {
    const {user} = props;
    const {height, width} = useWindowDimensions();
    return (<>
        {user && (
            <div className={"d-flex justify-content-between mobile-width"}>
                <div className={`${width<=514?"mobile-wrap":""} ale ss profile d-flex flex-row row  tablet-design justify-content-between align-items-center `}>
                    <div className={`${width<=514?"col":"col-3"} d-flex  right justify-content-center px-1`}>

                        <span className=" d-flex ">
                            <div className={"d-flex align-items-center gap-1 px-1"}>
                                <FontAwesomeIcon
                                    icon={faDollarSign}/> Cash
                            </div>
                        <div>
                             <strong style={{color: "#FFB200"}}>  {formatNumber(user.balance) || 0}</strong>
                        </div>

                            </span>


                    </div>

                    <div className={`${width<=514?"col":"col-3"}  d-flex  right justify-content-center px-1 `}>
                        <div>

                            <Link to={{pathname: "/redeem-points"}} className={'link-info text-info '}
                                  title={'Click to Redeem'}>
                           <span className=" rounded  outline-info d-flex ">
                              <span className={"d-flex align-items-center px-1 gap-1"}>
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

                    <div className={`${width<=514?"col":"col-3"} d-flex justify-content-center text-white`}>
                        <div>
                        <span className=" py-2 px-2 d-flex ">
                        <span className={"d-flex align-items-center px-1 gap-1"}>
                            <FontAwesomeIcon
                                icon={faGifts}/> Gifts
                        </span>
                            <span>
                                <strong>{formatNumber(user.gift_balance) || 0}</strong>
                            </span>
                        </span>
                        </div>
                    </div>
                    <div className={`${width<=514?"col":"col-3"}  d-flex  right justify-content-center px-1  align-items-center  `}>
                        <div>
                        <span className=" py-2 px-2 d-flex ">
                        <span className={"d-flex align-items-center px-1 gap-1"}>
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
