import React, { useState, useEffect, useCallback, useContext} from 'react';
import football from '../../assets/svg/football.svg'
import Competitions from './competitions';
import AllSportCompetitions from './all-sport-competition';
import { Context }  from '../../context/store';

import { 
    getFromLocalStorage, 
    setLocalStorage 
} from '../utils/local-storage';
import PerfectScrollbar from 'react-perfect-scrollbar';
import makeRequest from "../utils/fetch-request";


import 'react-perfect-scrollbar/dist/css/styles.css';

const SideBar = (props) => {

    const [state, dispatch] = useContext(Context);                              
    const [imageLoaded, setImageLoaded] = useState(false);
    const [competitions, setCompetitions ] = useState();
    const { loadCompetitions } = props;


    const onImageLoaded = () => {
        setImageLoaded(true);
    }

    const fetchData = useCallback(async() => {
        let cached_categories = getFromLocalStorage('categories');
        let endpoint = "/v1/categories";     
        
        if(!cached_categories) {
            console.log("Fetching data from API");
            const [competition_result] =  await Promise.all([
                makeRequest({url:endpoint, method:"get", data:null }),
            ]);
            let [c_status, c_result] = competition_result

            if(c_status == 200){
                setCompetitions(c_result);
            }
            setLocalStorage('categories', c_result);
        } else {
            console.log("Fetching data from cached localstorage");
            setCompetitions(cached_categories);
        }

    }, []);

    useEffect(() => {

       const abortController = new AbortController();                          
        if(loadCompetitions) {
            fetchData();
        } else {
            setCompetitions(props?.competitions);
        }

       return () => {                                                          
            abortController.abort();                                            
        };                                                                      
    }, [fetchData]);


    return (
        <div className="gn">

          <PerfectScrollbar style={{ height: "100vh" }}>
            <div className="qv rc aog alu web-element block-shadow bottom-std-margin-spacing">
                <header>
                    <div className="header-holder">
                        <span className="col-sm-10">FOOTBAL</span>
                        <span className="col-sm-2 header-icon">
                        <img 
                          height="14px" 
                          style={{display: imageLoaded ? 'inline' : 'none'}}
                          src={football} 
                          alt="-"
                          onLoad={onImageLoaded}
                          />
                        </span>
                    </div>
                </header>
                <Competitions  competitions={competitions?.top_soccer || []} /> }
            </div>
            <div className="web-element block-shadow bottom-std-margin-spacing">
                <header>
                    <div className="header-holder">
                        <span className="col-sm-10">Other Sports (A-Z)</span>
                        <span className="col-sm-2 header-icon">
                            <i className="icon-football fa fa-gamepad" aria-hidden="true"></i>
                        </span>
                    </div>
                </header>
                <AllSportCompetitions competitions={competitions?.all_sports || []}/>
            </div>
          </PerfectScrollbar>
        </div>
    )
}
export default SideBar;
