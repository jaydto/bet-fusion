import React, {useEffect, useCallback, useState} from "react";

import Header from './header/header';
import Footer from './footer/footer';
import SideBar from './sidebar/awesome/Sidebar';
import CarouselLoader from './carousel/index';
import {JackpotMatchList, JackpotHeader} from './matches/index';
import makeRequest from "./utils/fetch-request";

const Right = React.lazy(() => import('./right/index'));

const Jackpot = (props) => {
    const [matches, setMatches] = useState(null);

    const fetchData = useCallback(async () => {
        let match_endpoint = "/v1/matches/jackpot";

        const [match_result] = await Promise.all([
            makeRequest({url: match_endpoint, method: "get", data: null})
        ]);
        let [m_status, m_result] = match_result;
        if (m_status === 200) {
            setMatches(m_result);
        }

    }, []);

    useEffect(() => {

        const abortController = new AbortController();
        fetchData();

        return () => {
            abortController.abort();
        };
    }, [fetchData]);

    return (
        <>
            <Header/>
            <div className="amt">
                <div className="d-flex flex-row justify-content-between">
                    <SideBar loadCompetitions />
                    <div className="gz home">
                        <div className="homepage">
                            <CarouselLoader/>
                            <JackpotHeader jackpot={matches?.meta}/>
                            <JackpotMatchList matches={matches}/>
                        </div>
                    </div>
                    <Right jackpot={true}/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Jackpot
