import Row from 'react-bootstrap/Row';
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {getFromLocalStorage} from "../../../utils/local-storage";


const SlipTabs = (props) => {
    const {tab} = props;
    const url = new URL(window.location)

    const [user, setUser] = useState(getFromLocalStorage("user"));


    function replaceQueryParam(param, newval, search) {
        var regex = new RegExp("([?;&])" + param + "[^&;]*[;&]?");
        var query = search.replace(regex, "$1").replace(/&$/, '');

        return (query.length > 2 ? query + "&" : "?") + (newval ? param + "=" + newval : '');
    }


    const getLink = () => {

        url.pathname = `/${tab}` + replaceQueryParam("jackpot", tab == "betslip-jackpot" ? true : false, window.location.search)
        url.pathname = `/${tab}` + replaceQueryParam("nare-league", tab == "betslip-nare" ? true : false, window.location.search)
        tab == "betslip-jackpot" ? new URL(window.location).searchParams.set('jackpot', true) : new URL(window.location).searchParams.set('jackpot', false)
        tab == 'betslip-nare' ? new URL(window.location).searchParams.set('nare-league', true) : new URL(window.location).searchParams.set('nare-league', false)
        // Object.keys(params).forEach((param, val) => {
        url.searchParams.set("jackpot", tab == "betslip-jackpot" ? true : false)
        url.searchParams.set("nare-league", tab == "betslip-nare" ? true : false)
        // })

        return url.searchParams

    }
    const jackpot = url.searchParams.get("jackpot")
    const nare_league = url.searchParams.get("nare-league")
    const pathname = window.location.pathname;
    return (
        <div className={"full-mobile mb-1 "}>
            <Row className="top-matches d-flex flex-row ">
                {pathname === "/betslip-jackpot" &&
                    <div className="col  text-center">
                        <Link className={`cursor-pointer rounded border-0 w-100 bold home-tabs header-slips`}
                              to={'/betslip-jackpot?' + getLink()}>
                            <span className="col-sm-11 main-header">JACKPOT</span>
                        </Link>
                    </div>}
                {pathname === '/betslip-nare' && <div className="col text-center">
                    <Link className={`cursor-pointer rounded border-0  w-100 bold home-tabs header-slips`}
                          to={'/betslip-nare?' + getLink()}>
                        <span className="col-sm-11 main-header">NARESLIP</span>
                    </Link>
                </div>}
                {pathname === '/betslip-slip' &&
                    <div className="col text-center">
                        <Link className={`cursor-pointer rounded border-0  w-100 bold home-tabs header-slips`}
                              to={'/betslip-slip?' + getLink()}>
                            <span className="col-sm-11 main-header">BETSLIP</span>
                        </Link>
                    </div>
                }


            </Row>
        </div>
    )

}

export default SlipTabs;
