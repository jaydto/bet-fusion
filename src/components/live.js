import React,  { useContext, useLayoutEffect, useEffect, useCallback, useState, useMemo } from "react";
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
    const [matches, setMatches] = useState(null); 
    const [state, dispatch] = useContext(Context);

    const location = useLocation();
    const [userSlipsValidation, setUserSlipsValidation] = useState();

    const findPostableSlip = () => {
        let betslips = getBetslip() || {};
        var values = Object.keys(betslips).map(function(key){
            return betslips[key];
        });
        return values;
    };
	useInterval(() => {
        let endpoint = "/v1/matches/live";     
        let betslip = findPostableSlip();
        let method = betslip ? "POST" : "GET";
		makeRequest({url:endpoint, method:method, data:betslip}).then(([status, result]) => {
            if(status == 200) {
                setMatches(result?.data||result)
                if(result?.slip_data) {
                    setUserSlipsValidation(result?.slip_data)
                }
            }
		});                                                
    }, 2000);

    const fetchData = useCallback(async() => {
        let endpoint = "/v1/matches/live";     
        let betslip = findPostableSlip();
        let method = betslip ? "POST" : "GET";
        const [match_result] =  await Promise.all([
            makeRequest({url:endpoint, method:method, data:betslip })
        ]);
        let [m_status, m_result] = match_result;
        if(m_status == 200){
            setMatches(m_result?.data||m_result)
            if(m_result?.slip_data) {
                setUserSlipsValidation(m_result?.slip_data);
            }
        }

    }, []);


    useMemo(()=>{                                                             
        fetchData();
        let cachedSlips = getBetslip("betslip");
        if(cachedSlips){
            dispatch({type:"SET", key:"betslip", payload:cachedSlips}); 
        }
        return () => {                                                          
            setMatches(null); 
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
                    <MatchList live  matches={matches} />
                </div> 
            </div>  
            <Right betslipValidationData={userSlipsValidation} />
          </div>
        </div>
       <Footer />
       </>
   )
}

export default Live
