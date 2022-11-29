import React, {useCallback, useEffect, useState} from 'react';
import {Link,} from "react-router-dom";

import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {getFromLocalStorage, setLocalStorage} from "../utils/local-storage";
import makeRequest from "../utils/fetch-request";
import worldCup from "../../../src/assets/img/flags-1-1/worldcup.png"
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
    return (<div>
        {/*{sport==null?setSport(getFromLocalStorage ("categories")):""}*/}
        <DropdownButton id="dropdown-league-button" variant="secondary" title="Top League" >
                {sport?.top_soccer.map((top_soccer, index) => (
                    <Dropdown.Item key={index} as={Link} className={"bg-light"} style={{paddingLeft: "4px"}} to={{pathname:`/${top_soccer.competition_id}`,search:`?sport_id=79&sub_type_id=1`}}>
                                <div style={{textAlign: "center", fontWeight: "300"}}>
                                    {top_soccer.competition_name}
                                </div>
                    </Dropdown.Item>
                ))}

        </DropdownButton>

    </div>)
};

export default React.memo(MobileNav2);


