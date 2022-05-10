import React, {useContext, useEffect,  useCallback, useState} from "react";
import {useLocation} from 'react-router-dom';
import {Context} from '../context/store';
import makeRequest from './utils/fetch-request';
import { getBetslip } from './utils/betslip' ;

const Header = React.lazy(()=>import('./header/header'));
const Footer = React.lazy(()=>import('./footer/footer'));
const SideBar = React.lazy(()=>import('./sidebar/sidebar'));
const CarouselLoader = React.lazy(()=>import('./carousel/index'));
const MainTabs = React.lazy(()=>import('./header/main-tabs'));
const MatchList = React.lazy(()=>import('./matches/index'));
const Right = React.lazy(()=>import('./right/index'));


const Index = (props) => {
    const location = useLocation();
    const [matches, setMatches] = useState(null);
    const [producerDown, setProducerDown] = useState(false);
    const [page, setPage] = useState(1);
    const [userSlipsValidation, setUserSlipsValidation] = useState();
    const [state, dispatch] = useContext(Context);

    const findPostableSlip = () => {
        let betslips = getBetslip() || {};
        var values = Object.keys(betslips).map(function(key){
            return betslips[key];
        });
        return values;
    };

    const fetchData = useCallback(async() => {
        if(matches) return;
        let tab = location.pathname.replace("/", "") || 'highlights';
        let betslip = findPostableSlip(); 
        let endpoint = "/v1/matches?page=" 
            + (page || 1) + "&limit=100&tab=" + tab;

		await makeRequest({url:endpoint, method:"POST", data:betslip}).then(([status, result]) => {
            if(status == 200) {
                setMatches(result?.data||result)
                if(result?.slip_data) {
                    setUserSlipsValidation(result?.slip_data)
                }
               setProducerDown(result?.producer_status === 1);
            }
		});                                                

    }, []);

    useEffect(()=>{                                                             
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
                    <SideBar loadCompetitions />
                    <div className="gz home">
                        <div className="homepage">
                            <CarouselLoader/>
                            <MainTabs tab={location.pathname.replace("/", "")}/>
                            <MatchList 
                                live={false}  
                                matches ={matches}
                                pdown ={producerDown}
                                /> 
                        </div>
                    </div>
                    <Right betslipValidationData={userSlipsValidation} />
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Index
