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
    const [matches, setMatches] = useState(null);
    const [state, dispatch] = useContext(Context);                              
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [producerDown, setProducerDown] = useState(false);
    const [userSlipsValidation, setUserSlipsValidation] = useState();

    const findPostableSlip = () => {
        let betslips = getBetslip() || {};
        var values = Object.keys(betslips).map(function(key){
            return betslips[key];
        });
        return values;
    };
    const fetchPagedData =useCallback(() => {
        if(!isLoading) {
            setIsLoading(true);
            let betslip = findPostableSlip(); 
            let endpoint = "/v1/sports/competition?id="+params.id+"&page="+ (page|| 1); 
            makeRequest({url: endpoint, method: "post", data: betslip}).then(([status, result]) => {
                setMatches(result?.data || result);
                if(result?.slip_data) {
                    setUserSlipsValidation(result?.slip_data)
                }
               setProducerDown(result?.producer_status === 1);
                setIsLoading(false);
            });
        }
    }, []);


    useEffect(()=>{                                                             
        fetchPagedData();
        let cachedSlips = getBetslip("betslip");
        if(cachedSlips){
            dispatch({type:"SET", key:"betslip", payload:cachedSlips}); 
        }
        return () => {                                                          
            setMatches(null); 
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
                    { matches && <MatchList 
                        live={false} 
                        matches={matches} 
                        pdown={producerDown}
                        /> }
                </div> 
            </div>  
            <Right betslipValidationData={userSlipsValidation} />
          </div>
        </div>
       <Footer />
       </>
   )
}

export default CompetitionMatches;
