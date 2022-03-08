import React,  { useContext, useLayoutEffect, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

import Header from './header/header';
import Footer from './footer/footer';
import SideBar from './sidebar/sidebar';
import banner from '../assets/img/banner.jpg';
import CarouselLoader from './carousel/index';
import SearchBar from './header/search-bar';
import MatchList from './matches/index';
import Right from './right/index';
import makeRequest from './utils/fetch-request';
import { getJackpotBetslip, getBetslip } from './utils/betslip' ;

import matches from "./utils/fetch-request";
import useInterval from "../hooks/set-interval.hook";
import { Context }  from '../context/store';

const Live = (props) => {
    const [page, setPage] = useState(1);
    const [state, dispatch] = useContext(Context);                              
    const location = useLocation();
	useInterval(() => {
        let endpoint = "/v1/matches/live";     
		makeRequest({url:endpoint, method:"get", data:null }).then(([_status, response]) => {
			let {status, result} = response;                      
            dispatch({type:"SET", key:"matches", payload:result});
		});                                                                     
    }, 2000);

    useEffect(() => {
        let betslip = getBetslip();
        if (betslip) {
            dispatch({type: "SET", key: "betslip", payload: betslip});
        }
    }, []);

    useLayoutEffect(()=>{                                                             
        const abortController = new AbortController();                          
        let endpoint = "/v1/matches/live";     
                                                                                
        makeRequest({url:endpoint, method:"get", data:null }).then(([_status, response]) => {
            let {status, result} = response;                      
            dispatch({type:"SET", key:"matches", payload:result});
        });                                                                     
                                                                                
        return () => {                                                          
            abortController.abort();                                            
        };                                                                      
    }, [state?.page]);


   return (
       <>
        <Header />        
        <div className="by amt">
          <div className="gc">
            <SideBar />
            <div className="gz home">
                <div className="homepage">
                    <CarouselLoader />
                    <MatchList live />
                </div> 
            </div>  
            <Right />
          </div>
        </div>
       </>
   )
}

export default Live
