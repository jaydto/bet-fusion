import React,  { useContext, useEffect, useState } from "react";
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

import useAxios from "../hooks/axios.hook";
import { Context }  from '../context/store';

const Jackpot = (props) => {
    const [page, setPage] = useState(1);
    const [state, dispatch] = useContext(Context);                              
    const {response, makeRequest} = useAxios()
    const [tab, setTab] = useState('highlights');
    const location = useLocation();

    useEffect(()=>{                                                             
        const abortController = new AbortController();                          
        let endpoint = "/v1/matches/jackpot";     
                                                                                
        makeRequest({url:endpoint, method:"get", data:null }).then((response) => {
            let {status, result} = response;                      
            dispatch({type:"SET", key:"jackpotmatches", payload:result});
        });                                                                     
                                                                                
        return () => {                                                          
            abortController.abort();                                            
        };                                                                      
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
            <SideBar />
            <div className="gz home">
                <div className="homepage">
                    <CarouselLoader />
                    <JackpotHeader />
                    <JackpotMatchList />
                </div> 
            </div>  
            <Right />
          </div>
        </div>
       </>
   )
}

export default Jackpot
