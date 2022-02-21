import React,  { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import Header from './header/header';
import Footer from './footer/footer';
import SideBar from './sidebar/sidebar';
import banner from '../assets/img/banner.jpg';
import CarouselLoader from './carousel/index';
import MainTabs from './header/main-tabs';
import SearchBar from './header/search-bar';
import { MarketList } from './matches/index';
import Right from './right/index';

import useAxios from "../hooks/axios.hook";
import useInterval from "../hooks/set-interval.hook";
import { Context }  from '../context/store';
import { getBetslip } from './utils/betslip' ;

const MatchAllMarkets = (props) => {
    const [page, setPage] = useState(1);
    const { live } = props;
    const [state, dispatch] = useContext(Context);                              
    const {response, makeRequest} = useAxios();
    const params = useParams();

    useInterval(() => {
		let endpoint = live 
			? "/v1/matches/live?id="+params.id
			: "/v1/matches?id="+params.id;

		makeRequest({url:endpoint, method:"get", data:null }).then((response) => {
			let {status, result} = response;                      
			dispatch({type:"SET", key:"matchwithmarkets", payload:result});
		});                                                                     
    }, (live ? 2000: null));

    useLayoutEffect(()=>{                                                             
        const abortController = new AbortController();                          
        if(!isNaN(+params.id)) {
            let endpoint = live 
                ? "/v1/matches/live?id="+params.id
                : "/v1/matches?id="+params.id;
                                                                                    
            makeRequest({url:endpoint, method:"get", data:null }).then((response) => {
                let {status, result} = response;                      
                dispatch({type:"SET", key:"matchwithmarkets", payload:result});
            });                                                                     
        }
        return () => {                                                          
            abortController.abort();                                            
        };                                                                      
    }, []);


    useEffect(() => {
        let betslip = getBetslip();
        if (betslip) {
            dispatch({type: "SET", key: "betslip", payload: betslip});
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
                    <MarketList live={live} />
                </div> 
            </div>  
            <Right />
          </div>
        </div>
       </>
   )
}

export default MatchAllMarkets;
