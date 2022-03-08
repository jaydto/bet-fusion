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
    const [competitions, setCompetitions] = useState([]);

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
    }, []);

    const fetchData = useCallback(async() => {
        let cached_categories = getFromLocalStorage('categories');
        let endpoint = "/v1/categories";     

        let games_endpoint = live 
            ? "/v1/matches/live?id="+params.id
            : "/v1/matches?id="+params.id;

        if(!cached_categories && !isNaN(+params.id)) {
            console.log("Fetching data from API");
            const [competition_result, match_result] =  await Promise.all([
                makeRequest({url:endpoint, method:"get", data:null }),
                makeRequest({url: games_endpoint, method: "get", data: null})
            ]);
            let [c_status, c_result] = competition_result

            if(c_status == 200){
                setCompetitions(c_result);
            }
            let [m_status, m_result] = match_result;

            if(m_status == 200){
                dispatch({type: "SET", key: "matchwithmarkets", payload: m_result});
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
            <SideBar competitions={competitions} />
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
