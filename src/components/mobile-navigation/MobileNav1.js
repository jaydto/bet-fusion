import React, { useEffect, useState, useCallback} from 'react';
import {
    useParams,
} from "react-router-dom";

import downArrow from '../../assets/img/down-arrow.svg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import promo from "../../../src/assets/img/mobile/fire.png";
import jackpot from "../../../src/assets/img/mobile/jackpot.png";
import {getFromLocalStorage} from "../utils/local-storage";



const MobileNav1 = (props) => {

    let sport = getFromLocalStorage('categories')
    console.log(sport)
    let {sportid, categoryid, competitionid} = useParams();
    const [activeClass, setActiveClass] = useState('');

    // const handleMenuToggle = useCallback(() => {
    //     if(activeClass === ''){
    //         setActiveClass("active");
    //     } else {
    //         setActiveClass('');
    //     }
    // }, [activeClass]);

    // const initActiveClass = () => {
    //     sportid = sportid ?? 79;
    //     if (sport_id == sportid) {
    //         setActiveClass('active');
    //     }
    // };

    // useEffect(() => {
    //     initActiveClass();
    // }, [initActiveClass]);

    const default_img = 'default_sport';
    let sport_image;

    try {
        sport_image = require(`../../assets/svg/${sport?.sport_name}.svg`);
    } catch(error){
        sport_image = require(`../../assets/svg/${default_img}.svg`);
    }
    const getDefaultMarketsForSport = (allsports) => {
        return allsports?.default_display_markets
    }

    const getSportImageIcon = (sport_name, folder = 'svg', topLeagues = false) => {

        let default_img = 'default_sport'
        let sport_image;
        try {
            sport_image = topLeagues ? require(`../../../src/assets${sport_name}`) : require(`../../../src/assets/${folder}/${sport_name}.svg`);
        } catch (error) {
            sport_image = require(`../../../src/assets/${folder}/${default_img}.svg`);
        }
        return sport_image
    }
    return (<div className="menu-wrapper">


        <table className="menu-table" style={{width: "100%", textAlign: "center"}}>
            <tbody>
            <tr className={"tr-style"}>
                <td className="menu-t"  style={{paddingLeft: "4px"}}>
                    <a href="/jackpot">
                        <div className="inner-div active">
                            <div className="menu-img">
                                <LazyLoadImage src={jackpot} style={{width: "25px" }}/>
                            </div>
                            <div style={{textAalign: "center"}}>
                                Jackpot
                            </div>
                        </div>
                    </a>
                </td>
                <td className="menu-t" style={{paddingLeft: "4px"}}>
                    <a href="/promotions">
                        <div className="inner-div active">
                            <div className="menu-img">
                                <LazyLoadImage src={promo} style={{width: "25px"}}/>
                            </div>
                            <div style={{textAlign: "center"}}>
                                Promos
                        </div>
                        </div>
                    </a>
                </td>
                {sport?.all_sports.map((allsports, index) => (
                <td className="menu-t" style={{paddingLeft: "4px"}}>
                    <a href={`/highlights?sport_id=${allsports.sport_id}&sub_type_id=${getDefaultMarketsForSport(allsports)}`} >
                        <div className="inner-div active">
                            <div className="menu-img">
                                <LazyLoadImage
                                  className="side-icon"
                                  src={getSportImageIcon(allsports.sport_name)}
                                  alt=""
                                  style={{height: "25px"}} alt="#"
                              />
                            </div>
                            <div style={{textAlign: "center", fontWeight:"300"}}>
                         { allsports.sport_name }
                            </div>
                        </div>
                    </a>

                </td>
                ))}

            </tr>
            </tbody>
        </table>


    </div>)};

export default React.memo(MobileNav1);


