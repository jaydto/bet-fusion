import React, { useState, useEffect, useContext} from 'react';
import football from '../../assets/svg/football.svg'
import Competitions from './competitions';
import AllSportCompetitions from './all-sport-competition';
import Skeleton from 'react-loading-skeleton'
import { Context }  from '../../context/store';

import useAxios from "../../hooks/axios.hook";
import { 
    getFromLocalStorage, 
    setLocalStorage 
} from '../utils/local-storage';
import PerfectScrollbar from 'react-perfect-scrollbar';


import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-loading-skeleton/dist/skeleton.css';

const SideBar = (props) => {

    const [state, dispatch] = useContext(Context);                              
    const {response, makeRequest} = useAxios();

    const [imageLoaded, setImageLoaded] = useState(false);
    const onImageLoaded = () => {
        setImageLoaded(true);
    }

    useEffect(() => {

        let result = getFromLocalStorage('categories');
        if(result){
             dispatch({type:"SET", key:"categories", payload:result});
        } else { 
            let endpoint = "/v1/categories";     
            makeRequest({url:endpoint, method:"get", data:null }).then((response) => {
                let {status, result} = response;                     
                if(status = 200) {
                    dispatch({type:"SET", key:"categories", payload:result});
                    setLocalStorage('categories', result, 5*60*1000);
                } 
            });                                                                    
        }
    }, []);

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
                <Competitions />
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
                <AllSportCompetitions />
            </div>
          </PerfectScrollbar>
        </div>
    )
}
export default SideBar;
