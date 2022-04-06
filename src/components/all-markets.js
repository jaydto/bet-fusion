import React,  { 
    useContext, 
    useEffect, 
    useLayoutEffect, 
    useState,
    useCallback,
} from "react";
import { useParams } from 'react-router-dom';


import makeRequest from "./utils/fetch-request";
import useInterval from "../hooks/set-interval.hook";
import { Context }  from '../context/store';
import { getBetslip } from './utils/betslip' ;

import { 
    getFromLocalStorage,
    setLocalStorage
} from './utils/local-storage';
import { MarketList } from './matches/index';
import banner from '../assets/img/banner.jpg';

const Header = React.lazy(()=>import('./header/header'));
const Footer = React.lazy(()=>import('./footer/footer'));
const SideBar = React.lazy(()=>import('./sidebar/sidebar'));
const CarouselLoader = React.lazy(()=>import('./carousel/index'));
const MainTabs = React.lazy(()=>import('./header/main-tabs'));
const SearchBar = React.lazy(()=>import('./header/search-bar'));
const Right = React.lazy(()=>import('./right/index'));

const MatchAllMarkets = (props) => {
    const [page, setPage] = useState(1);
    const { live } = props;
    const [state, dispatch] = useContext(Context);                              
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);

    useInterval(() => {
		let endpoint = live 
			? "/v1/matches/live?id="+params.id
			: "/v1/matches?id="+params.id;

		makeRequest({url:endpoint, method:"get", data:null }).then(([_status, response]) => {
			let {status, result} = response;                      
			dispatch({type:"SET", key:"matchwithmarkets", payload:result});
		});                                                                     
    }, (live ? 2000: null));


    const fetchPagedData =useCallback(() => {
        if(!isLoading && !isNaN(+params.id)) {
            setIsLoading(true);
            let endpoint = live 
                ? "/v1/matches/live?id="+params.id
                : "/v1/matches?id="+params.id;

            makeRequest({url: endpoint, method: "get", data: null}).then(([status, result]) => {
                dispatch({type: "SET", key: "matchwithmarkets", payload: result});
                setIsLoading(false);
            });
        }
    }, [isLoading]);

    useLayoutEffect(() => {
        const abortController = new AbortController();                          
        fetchPagedData();
        return () => {                                                          
            abortController.abort();                                            
        };                                                                      
    }, [fetchPagedData]);

   return (
       <>
        <Header />        
        <div className="by amt">
          <div className="gc">
            <SideBar loadCompetitions />
            <div className="gz home">
                <div className="homepage">
                    <MarketList live={live} />
                </div> 
            </div>  
            <Right />
          </div>
        </div>
       <Footer />
       </>
   )
}

export default MatchAllMarkets;
