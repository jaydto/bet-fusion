import React,  { useContext, useLayoutEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

import Header from './header/header';
import Footer from './footer/footer';
import SideBar from './sidebar/sidebar';
import banner from '../assets/img/banner.jpg';
import CarouselLoader from './carousel/index';
import SearchBar from './header/search-bar';
import MatchList from './matches/index';
import Right from './right/index';

import { getJackpotBetslip } from './utils/betslip' ;

import useAxios from "../hooks/axios.hook";
import useInterval from "../hooks/set-interval.hook";
import { Context }  from '../context/store';

const Live = (props) => {
    const [page, setPage] = useState(1);
    const [state, dispatch] = useContext(Context);                              
    const {response, makeRequest} = useAxios()
    const location = useLocation();
	useInterval(() => {
        let endpoint = "/v1/matches/live";     
		makeRequest({url:endpoint, method:"get", data:null }).then((response) => {
			let {status, result} = response;                      
            dispatch({type:"SET", key:"matches", payload:result});
		});                                                                     
    }, 2000);

    useLayoutEffect(()=>{                                                             
        const abortController = new AbortController();                          
        let endpoint = "/v1/matches/live";     
                                                                                
        makeRequest({url:endpoint, method:"get", data:null }).then((response) => {
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
