import React, {useCallback, useContext, useEffect, useState} from "react";
import {StoreContext } from "../../context/store";
import BetHistoryDetails from "./BetHistoryDetails";
import makeRequest from "../utils/fetch-request";

const clean_rep = (str) => {
    str = str.replace(/[^A-Za-z0-9\-]/g, "");
    return str.replace(/-+/g, "-");
};

const BetHistory = React.memo(
    (props) => {

    const { state, dispatch } = useContext(StoreContext);
    const [isLoading, setIsLoading] = useState(false);
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
                        Object.entries(state?.mybets || {}).map(([match_id, slip],index) => {
                            let odd = slip.odd_value;
                            let no_odd_bg = odd === 1 ? "#f29f7a" : "";
                            // console.log(slip)
                            return (
                                <li
                                    className={`bet-option hide-on-affix mybets-slip ${
                                        slip?.disable ? "warn" : ""
                                    }`}
                                    key={index}
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
            </div>
            {showDetails !== null &&
                <div className="bottom">
                <BetHistoryDetails bet={showDetails}/>
            </div>
            }
        </div>
    );
});
export default React.memo(BetHistory);
