import React,  { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from 'react-router-dom';
import banner from '../assets/img/banner.jpg';
import makeRequest from "./utils/fetch-request";
import { Context }  from '../context/store';
import { 
    getFromLocalStorage,
    setLocalStorage
} from './utils/local-storage';
import { getBetslip } from './utils/betslip' ;

const Header = React.lazy(()=>import('./header/header'));
const Footer = React.lazy(()=>import('./footer/footer'));
const SideBar = React.lazy(()=>import('./sidebar/sidebar'));
const CarouselLoader = React.lazy(()=>import('./carousel/index'));
const MainTabs = React.lazy(()=>import('./header/main-tabs'));
const SearchBar = React.lazy(()=>import('./header/search-bar'));
const MatchList = React.lazy(()=>import('./matches/index'));
const Right = React.lazy(()=>import('./right/index'));


const CompetitionMatches = (props) => {
    const [page, setPage] = useState(1);
    const [state, dispatch] = useContext(Context);                              
    const params = useParams();
    const [competitions, setCompetitions] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const fetchPagedData =useCallback(() => {
        if(!isLoading) {
            setIsLoading(true);
            let endpoint = "/v1/sports/competition?id="+params.id+"&page="+ (state?.page|| 1); 
            makeRequest({url: endpoint, method: "get", data: null}).then(([status, result]) => {
                dispatch({type: "SET", key: "matches", payload: result});
                setIsLoading(false);
            });
        }
    }, []);


    useEffect(() => {

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
                    <CarouselLoader />
                    <MatchList live={false}/>
                </div> 
            </div>  
            <Right />
          </div>
        </div>
       <Footer />
       </>
   )
}

export default CompetitionMatches;
