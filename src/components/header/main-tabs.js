import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import MarketFilter from "../filters/MarketFilter";
import React from "react";
import {forEach} from "react-bootstrap/ElementChildren";

const MainTabs = (props) => {
    const {tab} = props;

    const u_class = tab === 'upcoming' ? "home-tabs-active" : "home-tabs";
    const h_class = (!tab || tab === 'highlights') ? "home-tabs-active" : "home-tabs";
    const t_class = tab === 'tomorrow' ? "home-tabs-active" : "home-tabs";

    const getLink = (tab) => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const url = new URL(window.location)
        const params = Object.fromEntries(urlSearchParams.entries());
        url.pathname = `/${tab}`
        Object.keys(params).forEach((param, val) => {
            url.searchParams.set(param, params[param])
        })

        window.location = url
    }

    return (
        <Row className="full-mobile">
            <Row className="top-matches d-flex flex-row ">
                <div className="col bg-black">
                    <a className={`cursor-pointer w-100 ${u_class}`} onClick={() => getLink('upcoming')}>
                        <span className="col-sm-11 main-header">Upcoming</span>
                    </a>
                </div>
                <div className="col bg-black">
                    <a className={`cursor-pointer w-100 ${h_class}`} onClick={() => getLink('highlights')}>
                        <span className="col-sm-11 main-header">Highlights</span>
                    </a>
                </div>
                <div className="col bg-black">
                    <a className={`cursor-pointer w-100 ${t_class}`} onClick={() => getLink('tomorrow')}>
                        <span className="col-sm-11 main-header">Tomorrow</span>
                    </a>
                </div>
                <div className="col p-0 bg-dark">
                    <a className={' d-flex justify-content-center h-100'}>
                        <MarketFilter/>
                    </a>
                </div>
            </Row>
        </Row>
    )

}

export default MainTabs;
