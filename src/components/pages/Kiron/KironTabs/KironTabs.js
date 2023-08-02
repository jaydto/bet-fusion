    import Row from 'react-bootstrap/Row';
import React from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faReceipt} from "@fortawesome/free-solid-svg-icons";

const KironTabs = React.memo(
    (props) => {
    const {tab, user} = props;
    // console.log("tabs_main_tab", tab)


    const u_class = tab === 'results' ? "kiron-tabs-active" : "home-tabs";
    const h_class = (!tab || tab === 'nare-league') ? "kiron-tabs-active" : "home-tabs";
    const t_class = tab === 'standing' ? "kiron-tabs-active" : "home-tabs";
    const b_class = tab === 'bet-history' ? "kiron-tabs-active" : "home-tabs";



    const getLink = (tab) => {

        const urlSearchParams = new URLSearchParams(window.location.search);
        const url = new URL(window.location)
        const params = Object.fromEntries(urlSearchParams.entries());
        url.pathname = `/${tab}`

        Object.keys(params)?.forEach((param, val) => {
            url.searchParams.set(param, params[param])
        })

        return url.searchParams

    }

    return (
        <div className={"full-mobile px-2  kiron-tab-container"}>
            <div className="top-matches d-flex flex-row w-100">
                <div className="col bg-black text-center kiron-tabs-padding">
                    <Link className={`cursor-pointer w-100 ${h_class}`} to={'/nare-league?' + getLink()}>
                        <span className="col-sm-11 main-header">Matches</span>
                    </Link>
                </div>
                <div className="col bg-black text-center kiron-tabs-padding">
                    <Link className={`cursor-pointer w-100 ${u_class}`} to={'/results?' }>
                        <span className="col-sm-11 main-header">Results</span>
                    </Link>
                </div>

                <div className="col bg-black text-center kiron-tabs-padding">
                    <Link className={`cursor-pointer w-100 ${t_class}`} to={'/standing?' }>
                        <span className="col-sm-11 main-header">Standings</span>
                    </Link>
                </div>
                {user&&
                    <div className="col bg-black text-center kiron-tabs-padding mobile-remove-kiron-bet-history-tab">
                        <Link className={`cursor-pointer w-100 ${b_class}`} to={'/bet-history?' }>
                            <span className="col-sm-11 main-header"><FontAwesomeIcon icon={faReceipt}/>&nbsp; Bet History</span>
                        </Link>
                    </div>
                }
            </div>
        </div>
    )

})

export default KironTabs;
