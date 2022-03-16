import React,  { useContext, useEffect, useCallback } from "react";

import Header from './header/header';
import Footer from './footer/footer';
import SideBar from './sidebar/sidebar';
import CarouselLoader from './carousel/index';
import { JackpotMatchList, JackpotHeader } from './matches/index';
import Right from './right/index';

import { getJackpotBetslip } from './utils/betslip' ;

import makeRequest from "./utils/fetch-request";
import { Context }  from '../context/store';

const Jackpot = (props) => {
    const [, dispatch] = useContext(Context);                              

    const fetchData = useCallback(async() => {
        let match_endpoint = "/v1/matches/jackpot";     
        
        console.log("Fetching data from API");
        const [match_result] =  await Promise.all([
            makeRequest({url: match_endpoint, method: "get", data: null})
        ]);
        let [m_status, m_result] = match_result;
        if(m_status === 200){
            dispatch({type: "SET", key: "jackpotmatches", payload: m_result});
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
            <SideBar loadCompetitions />
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
