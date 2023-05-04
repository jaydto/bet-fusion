import React, {useCallback, useEffect, useState} from 'react';
import {Link,} from "react-router-dom";

import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {getFromLocalStorage, setLocalStorage} from "../utils/local-storage";
import makeRequest from "../utils/fetch-request";
// import worldCup from "../../../src/assets/img/leagues/worldcup.png"
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import {Dropdown, DropdownButton} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";


const MobileNav2 = (props) => {

    let [sport, setSport] = useState(getFromLocalStorage('categories'));

    const gaEventTracker = useAnalyticsEventTracker('Navigation');
    const pathname = window.location.pathname;

    const [activeClass, setActiveClass] = useState('');

    const activeClick = useCallback(() => {
        if (activeClass === '') {
            setActiveClass("active-1");
        } else {
            setActiveClass('');
        }
    }, [activeClass]);


    const getSportImageIcon = (sport_name, folder = 'leagues', topLeagues = false) => {

        let default_img = 'default_sport'
        let sport_image;
        try {
            sport_image = topLeagues ? require(`../../../src/assets${sport_name}`) : require(`../../../src/assets/img/${folder}/${sport_name}.svg`);
        } catch (error) {
            sport_image = require(`../../../src/assets/svg/${default_img}.svg`);
        }
        return sport_image
    }
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
    } catch (error) {
        sport_image = require(`../../assets/svg/${default_img}.svg`);
    }
    const getDefaultMarketsForSport = (allsports) => {
        return allsports?.default_display_markets
    }


    return (<div className={"league-container"}>
        {/*{sport==null?setSport(getFromLocalStorage ("categories")):""}*/}
        <table  style={{width: "100%", textAlign: "center"}}>
            <tbody>
            <tr className={"d-flex league-row-mobile"}>
                {sport?.top_soccer.map((top_league, index) => (
                    <td key={index} className={` d-flex menu-t sport-check ${pathname===top_league.competition_id?" active":""}`} style={{paddingLeft: "4px",textAlign: 'center',lineHeight: '1.5'}}>
                        <Link  style={{paddingRight: "4px",width:"max-content"}}  to={{pathname: `/competition`,search: `competitionid=${top_league.competition_id}&sub_type_id=1`}}>
                            {/*<div className="menu-img">*/}
                            {/*    */}
                            {/*</div>*/}
                            {/*`/competition/${top_league.sport_id}/${top_league.category_id}/${top_league.competition_id}?sport_id=79&sub_type_id=1`*/}
                            <div className="inner-div active d-flex align-items-center justify-content-center">
                                <LazyLoadImage
                                    className="side-icon"
                                    src={getSportImageIcon(top_league.competition_name)}
                                    alt=""
                                    style={{height: "20px"}} alt="#"
                                />
                                {top_league.competition_name}
                            </div>

                        </Link>
                    </td>

                ))}

            </tr>
            </tbody>

        </table>

    </div>)
};

export default React.memo(MobileNav2);


