import React, { useEffect, useState, useCallback} from 'react';
import {
    Link,
    useParams,
} from "react-router-dom";

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import promo from "../../../src/assets/img/mobile/fire.png";
import jackpot from "../../../src/assets/img/mobile/jackpot.png";
import home from "../../../src/assets/img/mobile/home.png"
import kanyonde from "../../../src/assets/img/mobile/kanyonde.png"
import {getFromLocalStorage,setLocalStorage} from "../utils/local-storage";
import makeRequest from "../utils/fetch-request";
// import worldCup from "../../../src/assets/img/leagues/worldcup.png"
import Premier_League from "../../../src/assets/img/leagues/Premier League.svg"
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
// import {App} from "@capacitor/app";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFireAlt, faPlaneDeparture} from "@fortawesome/free-solid-svg-icons";


const MobileNav1 = (props) => {

    let [sport,setSport] =useState( getFromLocalStorage('categories'));

    const gaEventTracker = useAnalyticsEventTracker('Navigation');
    const pathname = window.location.pathname;

    const [activeClass, setActiveClass] = useState('');

    const activeClick = useCallback(() => {
        if(activeClass === ''){
            setActiveClass("active-1");
        } else {
            setActiveClass('');
        }
    }, [activeClass]);

    // App.addListener("appUrlOpen",data=>{
    //     if(data.url.includes("worldcup")){
    //         data.url.replace("/competition/79/8085","");
    //
    //     }
    // })
    // App.addListener('backButton', (data) => {
    //     console.log('back button click:', JSON.stringify(data));
    //     if (data.canGoBack) {
    //         window.history.back();
    //     } else {
    //         // Maybe show alert before closing app?
    //         App.exitApp();
    //     }


    const fetchData = useCallback(async () => {
        let cached_competitions = getFromLocalStorage('categories');
        let endpoint = "/v1/categories";

        if (!cached_competitions) {
            const [competition_result] = await Promise.all([
                makeRequest({url: endpoint, method: "get", data: null}),
            ]);
            let [c_status, c_result] = competition_result

            if (c_status === 200) {
                setSport(c_result);
                setLocalStorage('categories', c_result);
            } else {
                fetchData()
            }
        } else {
            setSport(cached_competitions);
        }

    }, []);

    useEffect(() => {
        const abortController = new AbortController();
        fetchData();

        return () => {
            abortController.abort();
        };
    }, []);
    // console.log('sports',sport)


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

    const getSportImageIcon = (sport_name, folder = 'sports', topLeagues = false) => {

        let default_img = 'default_sport'
        let sport_image;
        try {
            sport_image = topLeagues ? require(`../../../src/assets${sport_name}`) : require(`../../../src/assets/svg/${folder}/${sport_name}.png`);
        } catch (error) {
            sport_image = require(`../../../src/assets/${folder}/${default_img}.svg`);
        }
        return sport_image
    }
    return (<div className="menu-wrapper">
        {/*{sport==null?setSport(getFromLocalStorage("categories")):""}*/}
        <table className="menu-table" style={{width: "100%", textAlign: "center"}}>
            <tbody>
            <tr className={"tr-style"}>
                <td className={`menu-t ${pathname==="/"?"active":""}`}  style={{paddingLeft: "4px"}}>
                    <Link to="/">
                        <div className="inner-div active">
                            <div className="menu-img">
                                <LazyLoadImage src={home} style={{width: "20px" }}/>
                            </div>
                            <div style={{textAalign: "center"}}>
                                Home
                            </div>
                        </div>
                    </Link>
                </td>
                <td  className={ window.location.search.includes('aviator') ? 'active' : 'menu-t'}
                     onClick={() => gaEventTracker('Aviator')} style={{paddingLeft: "4px"}}>
                    <Link className="cg fm ox anl url-link d-flex flex-column align-items-center"
                          to="/nare-games/aviator"
                          title="Kanyonde">
                        <div className="menu-img">
                            <LazyLoadImage src={kanyonde} style={{height: "25px" }}/>
                            <span className=" badge" style={{color:"white",background:"red"
                                ,marginTop:"-5px", borderRadius: "10px 0 15px 0", marginLeft:"-10px"}}>NEW</span>
                        </div>   <strong> Kanyonde</strong>
                    </Link>

                </td>
                <td className={window.location.search.includes('nare-games') ? 'active' : 'menu-t'}
                    onClick={() => gaEventTracker('Nare Games')} style={{paddingLeft: "4px"}}>
                    <Link className="cg fm ox anl url-link d-flex flex-column align-items-center"
                          to="/nare-games"
                          title="Nare Games">
                        <div className="menu-img d-flex justify-content-center">
                        <FontAwesomeIcon icon={faFireAlt} style={{color: "orange",height:"27px"}}/>
                        <span className=" badge" style={{color:"white",background:"red"
                            ,marginTop:"3px", borderRadius: "10px 0 15px 0", marginLeft:"2x"}}>NEW</span>
                        </div><strong> Nare Games</strong>
                    </Link>

                </td>
                <td className={`menu-t ${pathname==="/jackpot"?"active":""}`}  style={{paddingLeft: "4px"}}>
                    <Link to="/jackpot">
                        <div className="inner-div active">
                            <div className="menu-img">
                                <LazyLoadImage src={jackpot} style={{width: "20px" }}/>
                            </div>
                            <div style={{textAalign: "center"}}>
                                Jackpot
                            </div>
                        </div>
                    </Link>
                </td>


                {/*<td style={{paddingLeft: "4px"}} className={window.location.search.includes('Premier League') ? 'active  ' : 'menu-t'}*/}
                {/*    onClick={() => gaEventTracker('Premier League')}>*/}
                {/*    <Link className="cg fm ox anl url-link d-flex flex-column align-items-center"*/}
                {/*          to={{pathname: `/competition`,search: `competitionid=16805&sub_type_id=1`}}>*/}
                {/*          title="Fifa World Cup"*/}
                {/*    >*/}
                {/*        <img src={Premier_League} className={'world-cup'}*/}
                {/*             style={{height: "25px", borderRadius: "0 !important"}}></img>*/}
                {/*        <strong>Premier League</strong>*/}
                {/*    </Link>*/}
                {/*</td>*/}

                {sport?.all_sports.map((allsports, index) => (
                <td key={index} className={`menu-t sport-check ${pathname===allsports.sport_id?"active":""}`} style={{paddingLeft: "4px"}}>
                    <Link to={`/highlights?sport_id=${allsports.sport_id}&sub_type_id=${getDefaultMarketsForSport(allsports)}`} >
                        <div className="inner-div active">
                            {/*{console.log('all sports',allsports)}*/}
                            <div className="menu-img">
                                <LazyLoadImage
                                  className="side-icon"
                                  src={getSportImageIcon(allsports.sport_name)}
                                  alt=""
                                  style={{height: "20px"}} alt="#"
                              />
                            </div>
                            <div style={{textAlign: "center", fontWeight:"300"}}>
                         { allsports.sport_name }
                            </div>
                        </div>
                    </Link>

                </td>
                ))}

                <td className={`menu-t ${pathname==="/promotions"?"active":""}`} style={{paddingLeft: "4px"}}>
                    <Link to="/promotions">
                        <div className="inner-div active">
                            <div className="menu-img">
                                <LazyLoadImage src={promo} style={{width: "20px"}}/>
                            </div>
                            <div style={{textAlign: "center"}}>
                                Promos
                            </div>
                        </div>
                    </Link>
                </td>
            </tr>
            </tbody>
        </table>


    </div>)};

export default React.memo(MobileNav1);


