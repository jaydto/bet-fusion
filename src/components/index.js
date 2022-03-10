import React, {useContext, useEffect, useState, useCallback} from "react";
import {useLocation} from 'react-router-dom';
import {Context} from '../context/store';
import makeRequest from './utils/fetch-request';
import {getBetslip} from './utils/betslip' ;
import { 
    getFromLocalStorage,
    setLocalStorage
} from './utils/local-storage';

const Header = React.lazy(()=>import('./header/header'));
const Footer = React.lazy(()=>import('./footer/footer'));
const SideBar = React.lazy(()=>import('./sidebar/sidebar'));
const banner = React.lazy(()=>import('../assets/img/banner.jpg'));
const CarouselLoader = React.lazy(()=>import('./carousel/index'));
const MainTabs = React.lazy(()=>import('./header/main-tabs'));
const SearchBar = React.lazy(()=>import('./header/search-bar'));
const MatchList = React.lazy(()=>import('./matches/index'));
const Right = React.lazy(()=>import('./right/index'));


const Index = (props) => {
    const [page, setPage] = useState(1);
    const [state, dispatch] = useContext(Context);
    const [tab, setTab] = useState('highlights');
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);


    const fetchData = useCallback(async() => {
        let cached_categories = getFromLocalStorage('categories');
        let tab = location.pathname.replace("/", "") || 'highlights';
        
        let match_endpoint = "/v1/matches?page=" 
            + (state?.page || 1) + "&limit=15&tab=" + tab;
        console.log("Fetching data from API");
        const [match_result] =  await Promise.all([
            makeRequest({url: match_endpoint, method: "get", data: null})
        ]);
        let [m_status, m_result] = match_result;
        if(m_status == 200){
            dispatch({type: "SET", key: "matches", payload: m_result});
        }

    }, []);

    useEffect(() => {
       fetchData();
    }, [fetchData]);


    return (
        <>
            <Header user={state.user}/>
            <div className="by amt">
                <div className="gc">
                    <SideBar loadCompetitions />
                    <div className="gz home">
                        <div className="homepage">
                            <CarouselLoader/>
                            <MainTabs tab={location.pathname.replace("/", "")}/>
                            <MatchList live={false} />
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
