import React,  { useContext, useEffect, useState, useCallback } from "react";
import { useLocation } from 'react-router-dom';

import Header from './header/header';
import Footer from './footer/footer';
import SideBar from './sidebar/sidebar';
import banner from '../assets/img/banner.jpg';
import CarouselLoader from './carousel/index';
import SearchBar from './header/search-bar';
import { JackpotMatchList, JackpotHeader } from './matches/index';
import Right from './right/index';

import { getJackpotBetslip } from './utils/betslip' ;

import makeRequest from "./utils/fetch-request";
import { Context }  from '../context/store';
import { 
    getFromLocalStorage,
    setLocalStorage
} from './utils/local-storage';

const Jackpot = (props) => {
    const [page, setPage] = useState(1);
    const [state, dispatch] = useContext(Context);                              
    const location = useLocation();
    const [competitions, setCompetitions] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const fetchPagedData =useCallback(() => {
        if(!isLoading) {
            setIsLoading(true);
            let endpoint = "/v1/matches/jackpot";     
            makeRequest({url: endpoint, method: "get", data: null}).then(([status, result]) => {
                dispatch({type: "SET", key: "jackpotmatches", payload: result});
                setIsLoading(false);
            });
        }
    }, []);

    const fetchData = useCallback(async() => {
        let cached_categories = getFromLocalStorage('categories');
        let endpoint = "/v1/categories";     
        let match_endpoint = "/v1/matches/jackpot";     
        
        if(!cached_categories) {
            console.log("Fetching data from API");
            const [competition_result, match_result] =  await Promise.all([
                makeRequest({url:endpoint, method:"get", data:null }),
                makeRequest({url: match_endpoint, method: "get", data: null})
            ]);
            let [c_status, c_result] = competition_result

            if(c_status == 200){
                setCompetitions(c_result);
            }
            let [m_status, m_result] = match_result;
            if(m_status == 200){
                dispatch({type: "SET", key: "jackpotmatches", payload: m_result});
            }
            setLocalStorage('categories', c_result);
        } else {
            console.log("Fetching data from cached localstorage");
            fetchPagedData();
            setCompetitions(cached_categories);
        }

    }, []);

    useEffect(() => {

       const abortController = new AbortController();                          
       fetchData();

       return () => {                                                          
            abortController.abort();                                            
        };                                                                      
    }, [fetchData]);

    useEffect(() => {
       fetchPagedData();
    }, [state?.page]);

    useEffect(() => {
        let jackpotbetslip = getJackpotBetslip();
        if(jackpotbetslip){
            dispatch({type:"SET", key:"jackpotbetslip", payload:jackpotbetslip});
        }
    }, []);

   return (
       <>
        <Header />        
        <div className="by amt">
          <div className="gc">
            <SideBar  competitions={competitions}/>
            <div className="gz home">
                <div className="homepage">
                    <CarouselLoader />
                    <JackpotHeader />
                    <JackpotMatchList />
                </div> 
            </div>  
            <Right jackpot={true} />
          </div>
        </div>
        <Footer/>
       </>
   )
}

export default Jackpot
