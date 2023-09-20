import React, {useEffect, useState} from 'react';
import football from '../../assets/svg/football.svg'
import Competitions from './competitions';
import AllSportCompetitions from './all-sport-competition';

import {getFromLocalStorage} from '../utils/local-storage';
import PerfectScrollbar from 'react-perfect-scrollbar';


import 'react-perfect-scrollbar/dist/css/styles.css';
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useSelector} from "react-redux";

const SideBar = React.memo(
    (props) => {

        const [imageLoaded, setImageLoaded] = useState(false);

        const [show] = useState(props?.override_display)
        const availableCategories = useSelector((state) => state.matchesData.sport_categories)

        const [competitions, setCompetitions] = useState(getFromLocalStorage("sport_categories"));

        useEffect(() => {
            setCompetitions(availableCategories||getFromLocalStorage("sport_categories"))

        }, [availableCategories])


        return (
            <div className={`gn d-md-block ${show ? 'd-block' : 'd-none'}`}>

                <PerfectScrollbar>
                    <div className="qv rc aog alu web-element block-shadow bottom-std-margin-spacing">
                        <header>
                            <div className="header-holder">
                                <span className="col-sm-10">FOOTBAL</span>
                                <span className="col-sm-2 header-icon">
                        <LazyLoadImage
                            height="14px"
                            style={{display: imageLoaded ? 'inline' : 'none'}}
                            src={football}
                            alt="-"
                        />
                        </span>
                            </div>
                        </header>
                        <Competitions competitions={competitions?.top_soccer || []}/>
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
    })
export default React.memo(SideBar);
