import React, {useContext, useEffect, useState} from "react";
import {useLocation} from 'react-router-dom';

import Header from './header/header';
import Footer from './footer/footer';
import SideBar from './sidebar/sidebar';
import banner from '../assets/img/banner.jpg';
import CarouselLoader from './carousel/index';
import MainTabs from './header/main-tabs';
import SearchBar from './header/search-bar';
import MatchList from './matches/index';
import Right from './right/index';

import {getBetslip} from './utils/betslip' ;

import useAxios from "../hooks/axios.hook";
import {Context} from '../context/store';

const Index = (props) => {
    const [page, setPage] = useState(1);
    const [state, dispatch] = useContext(Context);
    const {response, makeRequest} = useAxios()
    const [tab, setTab] = useState('highlights');
    const location = useLocation();

    useEffect(() => {
        const abortController = new AbortController();
        let tab = location.pathname.replace("/", "") || 'highlights';
        let endpoint = "/v1/matches?page=" + (state?.page || 1) + "&tab=" + tab;

        makeRequest({url: endpoint, method: "get", data: null}).then((response) => {
            let {status, result} = response;
            dispatch({type: "SET", key: "matches", payload: result});
        });

        return () => {
            abortController.abort();
        };
    }, [state?.page]);

    useEffect(() => {
        let betslip = getBetslip();
        if (betslip) {
            dispatch({type: "SET", key: "betslip", payload: betslip});
        }
    }, []);

    return (
        <>
            <Header/>
            <div className="by amt">
                <div className="gc">
                    <SideBar/>
                    <div className="gz home">
                        <div className="homepage">
                            <CarouselLoader/>
                            <MainTabs tab={location.pathname.replace("/", "")}/>
                            <MatchList live={false}/>
                        </div>
                    </div>
                    <Right/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Index
