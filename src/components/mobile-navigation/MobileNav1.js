import React, { useEffect, useState, useCallback} from 'react';
import {
    Link,
    useParams,
} from "react-router-dom";

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import promo from "../../../src/assets/img/mobile/fire.png";
import jackpot from "../../../src/assets/img/mobile/jackpot.png";
import {getFromLocalStorage,setLocalStorage} from "../utils/local-storage";
import makeRequest from "../utils/fetch-request";
import worldCup from "../../../src/assets/img/flags-1-1/worldcup.png"
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";


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
    }, [fetchData]);
    console.log('sports',sport)


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
        {/*{sport==null?setSport(getFromLocalStorage("categories")):""}*/}
        <table className="menu-table" style={{width: "100%", textAlign: "center"}}>
            <tbody>
            <tr className={"tr-style"}>
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
                <td style={{paddingLeft: "4px"}} className={window.location.search.includes('worldcup') ? 'active  ' : 'menu-t'}
                    onClick={() => gaEventTracker('World Cup')}>
                    <Link className="cg fm ox anl url-link d-flex flex-column"
                       to={"/competition/79/8085/18585?sport_id=79&sub_type_id=1,18,29&limit=500&c=worldcup"}
                       title="Fifa World Cup">
                        <span className={"menu-img"}>
                            <LazyLoadImage src={worldCup} className={'world-cup '} style={{height: "25px",borderRadius:"0 !important"}}></LazyLoadImage>
                        </span>
                        <span>
                            <strong>Fifa World Cup</strong>
                        </span>

                    </Link>
                </td>
                {sport?.all_sports.map((allsports, index) => (
                <td className={`menu-t sport-check ${pathname===allsports.sport_id?"active":""}`} style={{paddingLeft: "4px"}}>
                    <Link to={`/highlights?sport_id=${allsports.sport_id}&sub_type_id=${getDefaultMarketsForSport(allsports)}`} >
                        <div className="inner-div active">
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

            </tr>
            </tbody>
        </table>


    </div>)};

export default React.memo(MobileNav1);


