import Row from 'react-bootstrap/Row';
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {getFromLocalStorage} from "../utils/local-storage";
import useWindowDimensions from './Dimensions';


const MainTabs = (props) => {
    const {tab} = props;

    const u_class = tab === 'upcoming' ? "home-tabs-active" : "home-tabs";
    const h_class = (!tab || tab === 'highlights') ? "home-tabs-active" : "home-tabs";
    const t_class = tab === 'tomorrow' ? "home-tabs-active" : "home-tabs";
    const [user, setUser] = useState(getFromLocalStorage("user"));
    const {height, width} = useWindowDimensions();

    const getLink = (tab) => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const url = new URL(window.location)
        const params = Object.fromEntries(urlSearchParams.entries());
        url.pathname = `/${tab}`
        url.searchParams.set('sport_id', 79)
        Object.keys(params).forEach((param, val) => {
            url.searchParams.set(param, params[param])
        })
        return url.searchParams

    }

    return (
        <Row className={"full-mobile " + `${user ? "highlight-logged-in-menu" : "highlight-menu"}`}>
            <Row className="top-matches d-flex flex-row ">
            {width<=767&&<div className="col bg-black text-center">
                    <Link className={`cursor-pointer w-100 ${u_class}`} to={'/countries' }>
                        <span className="col-sm-11 main-header">Countries</span>
                    </Link>
                </div>}
                <div className="col bg-black text-center">
                    <Link className={`cursor-pointer w-100 ${u_class}`} to={'/upcoming?' + getLink()}>
                        <span className="col-sm-11 main-header">Upcoming</span>
                    </Link>
                </div>
                <div className="col bg-black text-center">
                    <Link className={`cursor-pointer w-100 ${h_class}`} to={'/highlights?' + getLink()}>
                        <span className="col-sm-11 main-header">Highlights</span>
                    </Link>
                </div>
                <div className="col bg-black text-center">
                    <Link className={`cursor-pointer w-100 ${t_class}`} to={'/tomorrow?' + getLink()}>
                        <span className="col-sm-11 main-header">Tomorrow</span>
                    </Link>
                </div>
            </Row>
        </Row>
    )

}

export default MainTabs;
