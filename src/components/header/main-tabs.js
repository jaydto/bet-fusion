import Row from 'react-bootstrap/Row';
import React, {useState} from "react";
import {Link} from "react-router-dom";
import useWindowDimensions from "./Dimensions";
import {getFromLocalStorage} from "../utils/local-storage";


const MainTabs = (props) => {
    const {tab} = props;

    const u_class = tab === 'upcoming' ? "home-tabs-active" : "home-tabs";
    const h_class = (!tab || tab === 'highlights') ? "home-tabs-active" : "home-tabs";
    const t_class = tab === 'tomorrow' ? "home-tabs-active" : "home-tabs";
    const {height, width} = useWindowDimensions();
    const [user, setUser] = useState(getFromLocalStorage("user"));

    const getLink = (tab) => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const url = new URL(window.location)
        const params = Object.fromEntries(urlSearchParams.entries());
        url.pathname = `/${tab}`
        url.searchParams.set('sport_id', 79)
        Object.keys(params).forEach((param, val) => {
            url.searchParams.set(param, params[param])
        })

        window.location = url
    }

    return (
        <Row className={"full-mobile "+`${width<=767?user?"highlight-logged-in-menu":"highlight-menu":"highlight-menu"}`}>
            <Row className="top-matches d-flex flex-row ">
                <div className="col bg-black text-center">
                    <Link className={`cursor-pointer w-100 ${u_class}`} onClick={() => getLink('upcoming')}>
                        <span className="col-sm-11 main-header">Upcoming</span>
                    </Link>
                </div>
                <div className="col bg-black text-center">
                    <Link className={`cursor-pointer w-100 ${h_class}`} onClick={() => getLink('highlights')}>
                        <span className="col-sm-11 main-header">Highlights</span>
                    </Link>
                </div>
                <div className="col bg-black text-center">
                    <Link className={`cursor-pointer w-100 ${t_class}`} onClick={() => getLink('tomorrow')}>
                        <span className="col-sm-11 main-header">Tomorrow</span>
                    </Link>
                </div>
            </Row>
        </Row>
    )

}

export default MainTabs;
