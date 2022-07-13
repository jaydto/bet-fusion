import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import MarketFilter from "../filters/MarketFilter";
import React from "react";

const MainTabs = (props) => {
    const {tab} = props;

    const u_class = tab === 'upcoming' ? "home-tabs-active" : "home-tabs";
    const h_class = (!tab || tab === 'highlights') ? "home-tabs-active" : "home-tabs";
    const t_class = tab === 'tomorrow' ? "home-tabs-active" : "home-tabs";

    return (
        <Container className="full-mobile">
            <Row className="top-matches d-flex flex-row ">
                <div className="col bg-black">
                    <a href="/upcoming" className={`w-100 ${u_class}`}>
                        <span className="col-sm-11 main-header">Upcoming</span>
                    </a>
                </div>
                <div className="col bg-black">
                    <a href="/highlights" className={`w-100 ${h_class}`}>
                        <span className="col-sm-11 main-header">Highlights</span>
                    </a>
                </div>
                <div className="col bg-black">
                    <a href="/tomorrow" className={`w-100 ${t_class}`}>
                        <span className="col-sm-11 main-header">Tomorrow</span>
                    </a>
                </div>
                <div className="col p-0 bg-dark">
                    <a className={' d-flex justify-content-center h-100'}>
                        <MarketFilter/>
                    </a>
                </div>
            </Row>
        </Container>
    )

}

export default MainTabs;
