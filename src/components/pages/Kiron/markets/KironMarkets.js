import React, {useCallback, useEffect, useState} from 'react';
import {Link,} from "react-router-dom";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {getFromLocalStorage, setLocalStorage} from "../../../utils/local-storage";
import makeRequest from "../../../utils/fetch-request";
import useAnalyticsEventTracker from "../../../analytics/useAnalyticsEventTracker";



const KironMarkets = (props) => {
    const {playgame}=props;
    let [kiron, setKiron] = useState(getFromLocalStorage('kiron-categories'));

    const gaEventTracker = useAnalyticsEventTracker('Navigation');
    const pathname = window.location.pathname;


    const handleLinkClick=(event)=> {
        // remove highlight class from all links
        const links = document.querySelectorAll('.link');
        links.forEach((link) => link.classList.remove('highlight'));

        // add highlight class to clicked link
        event.currentTarget.classList.add('highlight');
    }

    const fetchData = useCallback(async () => {
        let cached_competitions = getFromLocalStorage('kiron-categories');
        let endpoint = "/v1/nare-league/markets";
        let method="POST"

        if (!cached_competitions) {
            const [competition_result] = await Promise.all([
                makeRequest({url: endpoint, method: method, data: null}),
            ]);
            let [c_status, c_result] = competition_result
            // console.log('kirons',c_result)
            if (c_status === 200) {
                setKiron(c_result);
                setLocalStorage('kiron-categories', c_result);
            } else {
                fetchData()
            }
        } else {
            setKiron(cached_competitions);
        }

    }, []);

    useEffect(() => {
        const abortController = new AbortController();
        fetchData();

        return () => {
            abortController.abort();
        };
    }, []);



    const default_img = 'default_sport';
    let kiron_image;

    // try {
    //     kiron_image = require(`../../assets/svg/${kiron?.kiron_name}.svg`);
    // } catch (error) {
    //     kiron_image = require(`../../assets/svg/${default_img}.svg`);
    // }
    // const getDefaultMarketsForKiron = (allkirons) => {
    //     return allkirons?.default_display_markets
    // }


    return (
        kiron&&<div className={ `${playgame?"d-none": "league-container"} ` } style={{background:" #162024"}}>
            <table  style={{width: "100%", textAlign: "center"}}>
                <tbody>
                <tr className={"d-flex league-row"}>
                    {kiron?.top_soccer.map((top_soccer, index) => (
                        <td key={index} className={` d-flex menu-t sport-check  ${pathname===top_soccer.competition_id?" active":""}`} style={{paddingLeft: "4px",textAlign: 'center',lineHeight: '1.5'}} >
                            <Link  style={{paddingRight: "4px",width:"max-content"}}  to={{pathname: `/competition`,search: `competitionid=${top_soccer.competition_id}&sub_type_id=1`}} >
                                {/*<div className="menu-img">*/}
                                {/*    */}
                                {/*</div>*/}
                                <div className="inner-div active d-flex align-items-center justify-content-center link" onClick={handleLinkClick}>
                                    <LazyLoadImage
                                        className="side-icon"
                                        src={''}
                                        alt=""
                                        style={{height: "20px"}}
                                    />
                                    {top_soccer.competition_name}
                                </div>

                            </Link>
                        </td>

                    ))}

                </tr>
                </tbody>

            </table>

        </div>
    )
};

export default React.memo(KironMarkets);


