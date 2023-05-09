import React, { useState, useEffect, useContext, useCallback } from "react";

import { Context } from "../../context/store";
import {
    removeFromSlip,
    removeFromJackpotSlip,
    getBetslip,
    getJackpotBetslip,
} from "../utils/betslip";
import useWindowDimensions from "../header/Dimensions";
import { Link } from "react-router-dom";
import { getFromLocalStorage } from "../utils/local-storage";
import BetHistoryDetails from "./BetHistoryDetails";
import makeRequest from "../utils/fetch-request";

const clean_rep = (str) => {
    str = str.replace(/[^A-Za-z0-9\-]/g, "");
    return str.replace(/-+/g, "-");
};

const BetHistory = (props) => {

    const [state, dispatch] = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);
    const {height, width} = useWindowDimensions();
    const [showDetails, setshowDetails]=useState(null)

    const fetchData = useCallback(async() => {
        if(isLoading) return;
        setIsLoading(true);
        let endpoint = "/v1/full/betdetails";
        makeRequest({url: endpoint, method: "POST", data: null}).then(([status, result]) => {
            dispatch({type: "SET", key: "mybets", payload: result});
            setIsLoading(false);
        });

    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);



    const handledRemoveSlip = (match) => {

    };

    const handleShowBetDetails=(bet)=>{
        setshowDetails(bet)
    }


    return (
        <div className="bet-body text-white">

            <div className={`flow slip-height slip-log-max overflow-auto`}  >
                <ul className={"slip-top"}>
                    { (
                        Object.entries(state?.mybets || {}).map(([match_id, slip]) => {
                            let odd = slip.odd_value;
                            let no_odd_bg = odd === 1 ? "#f29f7a" : "";
                            // console.log(slip)
                            return (
                                <li
                                    className={`bet-option hide-on-affix mybets-slip ${
                                        slip?.disable ? "warn" : ""
                                    }`}
                                    key={match_id}
                                    style={{ background: no_odd_bg }}
                                >
                                    {/*<div className="bet-cancel">*/}
                                    {/*    <input*/}
                                    {/*        id={slip.match_id}*/}
                                    {/*        type="submit"*/}
                                    {/*        value="X"*/}
                                    {/*        onClick={() => handledRemoveSlip(slip)}*/}
                                    {/*    />*/}
                                    {/*</div>*/}
                                    <div
                                        onClick={()=>{
                                            handleShowBetDetails(slip?.betslip)

                                        }}
                                        style={{ color: "inherit", fontStyle: "inherit" }}

                                    >
                                        <div className="bet-value">
                                            <b>
                                                {
                                                    <span
                                                        style={{
                                                            float: "left",
                                                            width: "auto",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                           {/*{slip?.sport_name==undefined?"Soccer":slip?.sport_name},&nbsp;*/}
                                                        Placed:
                          </span>
                                                }
                                                {slip?.created}
                                                {/*{slip.bet_type === 1 && " Live"}*/}
                                            </b>
                                        </div>
                                        {/*<div className="row">*/}
                                        {/*    <div className="bet-value">*/}
                                        {/*        {`${slip.home_team} - ${slip.away_team}`}*/}
                                        {/*        <br />*/}
                                        {/*        <span className="sp_sport"></span>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        <div className="row">
                                            <div className="bet-value">Total Matches - {slip?.total_matches}</div>
                                        </div>
                                        <div className="bet-pick">
                                            <b>
                                                Id - {slip.bet_id}
                                                <span className="bet-odd">
                          {slip.status_desc}
                                                    {slip.status === 4 && (
                                                        <span
                                                            style={{
                                                                color: "#cc0000",
                                                                fontSize: "11px",
                                                                display: "block",
                                                            }}
                                                        >
                              can Cancel
                            </span>
                                                    )}
                        </span>
                                            </b>
                                        </div>
                                        <div className="row">
                                            <div className="warn">{slip?.comment} </div>
                                        </div>
                                    </div>
                                </li>
                            );
                        })
                    )}
                </ul>
            </div>{console.log("bet_details",showDetails)}
            {showDetails !== null &&
                <div className="bottom">
                <BetHistoryDetails bet={showDetails}/>
            </div>
            }
        </div>
    );
};
export default React.memo(BetHistory);
