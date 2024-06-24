import React from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faReceipt} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";

const KironTabs = React.memo(
    (props) => {
        const {tab, user} = props;
        // console.log("tabs_main_tab", tab)
        const active_competition = useSelector((state) => state.nareLeague.competition_id)


        const u_class = tab === 'results' ? "kiron-tabs-active" : "home-tabs";
        const h_class = (!tab || tab === 'nare-league') ? "kiron-tabs-active" : "home-tabs";
        const t_class = tab === 'standing' ? "kiron-tabs-active" : "home-tabs";
        const b_class = tab === 'bet-history' ? "kiron-tabs-active" : "home-tabs";


        const getLink = (tab) => {
            const urlSearchParams = new URLSearchParams(window.location.search);
            const url = new URL(window.location)
            const params = Object.fromEntries(urlSearchParams.entries());
            url.pathname = `/${tab}`
            const param_length=Object.keys(params).length
            if(param_length===0){
                url.searchParams.set('competition_id',active_competition )

            }else{
                Object.keys(params)?.forEach((param, val) => {
                    url.searchParams.set(param,params[param])
                })
            }



            return url.searchParams

        }

        return (
            <div className={"full-mobile   kiron-tab-container"}>
                <div className="top-matches d-flex flex-row w-100">
                    <div className="col  text-center kiron-tabs-padding ">
                        <Link className={`cursor-pointer w-100 ${h_class}`} to={'/?' + getLink()}>
                            <span className="col-sm-11 main-header kiron-tabs-link">Matches</span>
                        </Link>
                    </div>
                    <div className="col  text-center kiron-tabs-padding ">
                        <Link className={`cursor-pointer w-100 ${u_class}`} to={'/results?' + getLink()}>
                            <span className="col-sm-11 main-header kiron-tabs-link">Results</span>
                        </Link>
                    </div>

                    <div className="col  text-center kiron-tabs-padding  ">
                        <Link className={`cursor-pointer w-100 ${t_class}`} to={'/standing?' + getLink()}>
                            <span className="col-sm-11 main-header kiron-tabs-link">Standings</span>
                        </Link>
                    </div>
                    {user &&
                        <div
                            className="col  text-center kiron-tabs-padding  mobile-remove-kiron-bet-history-tab">
                            <Link className={`cursor-pointer w-100 ${b_class}`} to={'/bet-history?' + getLink()}>
                                <span className="col-sm-11 main-header kiron-tabs-link"><FontAwesomeIcon icon={faReceipt}/>&nbsp; Bet History</span>
                            </Link>
                        </div>
                    }
                </div>
            </div>
        )

    })

export default KironTabs;
