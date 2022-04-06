import React,  { useContext, useLayoutEffect, useEffect, useCallback, useState } from "react";
import { useLocation } from 'react-router-dom';
import makeRequest from './utils/fetch-request';
import { getJackpotBetslip, getBetslip } from './utils/betslip' ;

import matches from "./utils/fetch-request";
import useInterval from "../hooks/set-interval.hook";
import { Context }  from '../context/store';
import banner from '../assets/img/banner.jpg';

const Header = React.lazy(()=>import('./header/header'));
const Footer = React.lazy(()=>import('./footer/footer'));
const SideBar = React.lazy(()=>import('./sidebar/sidebar'));
const CarouselLoader = React.lazy(()=>import('./carousel/index'));
const SearchBar = React.lazy(()=>import('./header/search-bar'));
const MatchList = React.lazy(()=>import('./matches/index'));
const Right = React.lazy(()=>import('./right/index'));


const Live = (props) => {
    const [page, setPage] = useState(1);
    const [state, dispatch] = useContext(Context);                              
    const location = useLocation();
	useInterval(() => {
        let endpoint = "/v1/matches/live";     
		makeRequest({url:endpoint, method:"get", data:null }).then(([status, result]) => {
            console.log(result);
            dispatch({type:"SET", key:"matches", payload:result});
		});                                                                     
    }, 2000);

    useEffect(() => {
        let betslip = getBetslip();
        if (betslip) {
            dispatch({type: "SET", key: "betslip", payload: betslip});
        }
    }, []);


    const fetchData = useCallback(async() => {
        let endpoint = "/v1/matches/live";     
        const [match_result] =  await Promise.all([
            makeRequest({url:endpoint, method:"get", data:null })
        ]);
        let [m_status, m_result] = match_result;
        if(m_status == 200){
            dispatch({type: "SET", key: "matches", payload: m_result});
        }

    }, []);


    useLayoutEffect(()=>{                                                             
        const abortController = new AbortController();                          
        fetchData();
        return () => {                                                          
            abortController.abort();                                            
        };                                                                      
    }, [fetchData]);


   return (
       <>
        <Header />        
        <div className="by amt">
          <div className="gc">
            <SideBar  loadCompetitions />
            <div className="gz home">
                <div className="homepage">
                    <CarouselLoader />
                    <MatchList live />
                </div> 
            </div>  
            <Right />
          </div>
        </div>
       <Footer />
       </>
   )
}

export default Live
