import React, { useEffect, useState, useCallback} from 'react';
import {
  useParams,
} from "react-router-dom";

import downArrow from '../../assets/img/down-arrow.svg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


export const SportItem = (props) => {
    const {
        sport, 
        sport_id, 
    } = props;

    const {spid} = useParams('sp');
    const [activeClass, setActiveClass] = useState('');


    const handleMenuToggle = useCallback(() => {
        if(activeClass === ''){
            setActiveClass("active");
        } else {
            setActiveClass('');
        }
    }, [activeClass]);

    const inintActiveClass = useCallback(() => {
        if (sport_id === spid) {
            setActiveClass('active');
        }
    }, [sport_id, spid]);

    useEffect(() => {
        inintActiveClass();
    }, [inintActiveClass]);

    const default_img = 'default_sport';
    let sport_image = null;

    try { 
        sport_image = require(`../../assets/svg/${sport?.sport_name}.svg`);
    } catch(error){
        sport_image = require(`../../assets/svg/${default_img}.svg`);
    }
    
    return (
        <li className={`treeview ${activeClass}`} >
            <a href="#" onClick={handleMenuToggle}>
                <span style={{"padding":0}}>
                  <img  
                       className="side-icon" 
                       src={sport_image} 
                       alt=""
                        /> 
                </span>
                <span className="topl"> { sport.sport_name } </span>
                <img className="down-arrow pull-right" alt="" src={downArrow} />
            </a>
            <ul className="treeview-menu">
              {
                  sport?.categories && sport.categories.map(
                      category => (
                          <CategoryItem 
                              category={category} 
                              key={category.category_id} 
                              active_class={activeClass}
                              category_id={category.category_id} 
                               />
                      )
                  )
              }
            </ul>
        </li>
    )
}

export const CategoryItem = (props) => {
    const {category, category_id } = props;
    const {ctid} = useParams('id');
    const [activeClass, setActiveClass] = useState('');
    const [active, setActive] = useState('');

    const handleMenuToggle = useCallback(() => {
        if(activeClass === ''){
            setActiveClass('menu-open');
            setActive('active');

        } else {
            setActiveClass('');
            setActive('');
        }
    }, [activeClass]);
    
    const initActiveMenuClass = useCallback(() => {
        if(ctid === category_id){
            setActive('active');
            setActiveClass('menu-open');
        }
    }, [ctid, category_id]);

    useEffect(() => {
        initActiveMenuClass();
    }, [initActiveMenuClass])

    return (
        <li className={`treeview ${active}`} >
           <a href="#" onClick={handleMenuToggle}>
                { category?.cat_flag && 
                    <LazyLoadImage 
                         className="side-icon" 
                        src={require(`../../assets/img/flags-1-1/${category.cat_flag}.svg`)} 
                        effect="blur"
                    />
                }
                <span className="topl"> {category.category_name} </span>
            </a>
            <ul className={`treeview-menu second-child ${activeClass}`}>
                { 
                    category.competitions && 
                       category.competitions.map(
                        competition => (
                            <CompetitionItem 
                                competition={competition} 
                                competition_id={competition.competition_id} 
                                key={competition.competition_id} />
                        )
                    )
                }
            </ul>
        </li>
    )
}

export const CompetitionItem = (props) => {
    const { competition, competition_id } = props;
    const [active, setActive] = useState('');
    
    const {cmid} = useParams('cmid');
    const {spid} = useParams('sp');

    const updateActiveStatus = useCallback(() => {
        setActive(cmid === competition_id ? 'selected': '');
    }, [competition_id, cmid]);

    useEffect(() => {
        updateActiveStatus();
    }, [updateActiveStatus])

    return (
        <li className={active}>
            <a href={`/competition/${competition.competition_id}?sp=${spid || ''}`}>
              <span className="topl"> {competition.competition_name } </span>
              <span style={{float:"right", color:"#fff"}}>{competition.games_count }</span>
            </a>
        </li>
    )
}

const AllSportCompetitions = (props) => {

    const { competitions } =  props;

    return (
        <ul className="sidebar-menu aoi nav base-bg">
            {
               competitions.map(
                          sport => ( 
                               <SportItem 
                                  sport={sport} 
                                  sport_id={sport.sport_id} 
                                  key={sport.sport_id} />
                          )
                          
                      )
            }

        </ul>
    )
}
export default React.memo(AllSportCompetitions);
