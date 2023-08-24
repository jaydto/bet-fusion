import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

//Images
import aviator from "../../../src/assets/svg/sports/aviator.svg"
import league from "../../../src/assets/img/kiron/nare-league.webp"

//SVGs
import soccer from "../../assets/svg/sports/Soccer.svg"
import casino1 from "../../assets/svg/casino.svg"
import jackpot from "../../assets/svg/jackpot.svg"
import promo from "../../assets/svg/fire.svg"

import {getFromLocalStorage, setLocalStorage} from "../utils/local-storage";
import makeRequest from "../utils/fetch-request";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import {StoreContext} from "../../context/store";

import {LazyLoadImage} from "react-lazy-load-image-component";

const MobileNav1 = React.memo(
    () => {

        const {state, dispatch} = useContext(StoreContext);

        const scrollContainerRef = useRef(null);

        const gaEventTracker = useAnalyticsEventTracker('Navigation');

        const pathname = window.location.pathname;

        const fetchData = useCallback(async () => {
            let cached_competitions = getFromLocalStorage('sport_categories');
            let endpoint = "/v1/categories";

            if (!cached_competitions) {
                const [competition_result] = await Promise.all([
                    makeRequest({url: endpoint, method: "get", data: null}),
                ]);
                let [c_status, c_result] = competition_result

                if (c_status === 200) {
                    // setSport(c_result);
                    dispatch({type: "SET", key: "sport", payload: c_result})

                    setLocalStorage('sport_categories', c_result);

                } else {
                    fetchData()
                }
            } else {
                dispatch({type: "SET", key: "sport", payload: cached_competitions})

            }


        }, []);

        useEffect(() => {
            const abortController = new AbortController();
            fetchData();

            return () => {
                abortController.abort();
            };
        }, []);

        const getDefaultMarketsForSport = (allsports) => {
            return allsports?.default_display_markets
        }

        const getSportImageIcon = (sport_name, folder = 'sports', topLeagues = false) => {

            let default_img = 'default_sport'
            let sport_image;
            try {
                sport_image = topLeagues ? require(`../../../src/assets/${sport_name}`) : require(`../../../src/assets/svg/${folder}/${sport_name}.svg`);
            } catch (error) {
                sport_image = require(`../../../src/assets/svg/${folder}/${default_img}.svg`);
            }
            return sport_image
        }
        const navigate = useNavigate()

        return (<div className="menu-wrapper mobile-nav-remove ">

            <table className="menu-table" style={{width: "100%", textAlign: "center", marginLeft: "-9px"}}>
                <tbody>
                <tr className={"tr-style mobile-nav-top"} ref={scrollContainerRef}>
                    <td className={`menu-t m-auto   sport-check  ${pathname === "/" || Number(state?.active_sport) === 79 ? "active_link" : ""}`}>
                        <Link
                            className={`inner-div more-sports  cg  ox anl url-link d-flex flex-column align-items-center  `}
                            onClick={() => gaEventTracker('Visit Home Page')} to={`/`}>
                            <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center`}>

                                <div className="menu-img ">
                                    <LazyLoadImage
                                        className="side-icon"
                                        src={soccer}
                                        alt=""
                                        effect='blur'
                                        style={{height: "23px", marginTop: "-6px"}}
                                    />
                                </div>
                                <p style={{textAlign: "center", marginBottom: "unset"}}>
                                    Soccer
                                </p>
                            </div>
                        </Link>

                    </td>
                    <td className={`menu-t m-auto sport-check nare-league ${pathname.includes('/nare-league') ? "active_link" : ""}`}>
                        <Link
                            className={`inner-div more-sports cg  ox anl url-link d-flex flex-column align-items-center `}
                            onClick={() => gaEventTracker('Visit Nare League Page')} to={`/nare-league`}>
                            <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center  `}>

                                <div className="menu-img  ">
                                    <LazyLoadImage
                                        className="side-icon"
                                        src={league}
                                        alt=""
                                        effect='blur'
                                        style={{height: "39px", marginTop: "-11px"}}
                                    />
                                    <span className=" hot-alert-badge">HOT</span>

                                </div>
                                <p style={{textAlign: "center", marginBottom: "unset"}}>
                                    League
                                </p>
                            </div>
                        </Link>
                    </td>

                    <td className={`menu-t m-auto sport-check  ${pathname.includes('aviator') ? "active_link" : ""}`}>
                        <Link to={"/nare-games/aviator"}
                              className={`inner-div more-sports cg  ox anl url-link d-flex flex-column align-items-center `}
                              onClick={() => {
                                  gaEventTracker('Visit Aviator Page')
                              }}>
                            <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center `}>

                                <div className="menu-img ">
                                    <LazyLoadImage
                                        className="side-icon aviator"
                                        src={aviator}
                                        alt=""
                                        effect='blur'
                                        style={{height: "23px", marginTop: "-6px", width: '30px'}}
                                    />
                                </div>
                                <p style={{textAlign: "center", marginBottom: "unset"}}>
                                    Aviator
                                </p>
                            </div>
                        </Link>

                    </td>
                    <td className={`menu-t m-auto sport-check ${window.location.search.includes('FootballX') ? "active_link" : ""} `}>
                        <div
                            className={`inner-div more-sports  cg  ox anl url-link d-flex flex-column align-items-center  `}
                            onClick={() => {
                                navigate('/jackpot')
                                gaEventTracker('Visit Jackpot Page')
                            }}>
                            <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center`}>

                                <div className="menu-img ">
                                    <LazyLoadImage
                                        className="side-icon football-x"
                                        src={jackpot}
                                        alt=""
                                        effect='blur'
                                        style={{height: "23px", marginTop: "-6px"}}
                                    />
                                </div>
                                <p style={{textAlign: "center", marginBottom: "unset"}}>
                                    Jackpot
                                </p>
                            </div>
                        </div>

                    </td>


                    <td className={`menu-t m-auto sport-check ${pathname === `/casino` ? " active_link" : ""} `}>
                        <div
                            className={`inner-div more-sports  cg  ox anl url-link d-flex flex-column align-items-center `}
                            onClick={() => {
                                gaEventTracker('Visit Casino Page')
                                navigate('casino');
                            }}>
                            <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center `}>

                                <div className="menu-img ">
                                    <LazyLoadImage
                                        className="side-icon"
                                        src={casino1}
                                        alt=""
                                        effect='blur'
                                        style={{height: "23px", marginTop: "-6px"}}
                                    />
                                </div>
                                <p style={{textAlign: "center", marginBottom: "unset"}}>
                                    Casino
                                </p>
                            </div>
                        </div>

                    </td>


                    {state.sport?.all_sports.map((allsports, index) => {

                        return allsports?.sport_id !== 79 && (
                            <td key={index}
                                className={`menu-t m-auto sport-check ${Number(state?.active_sport) === Number(allsports?.sport_id) ? 'active_link' : ''}`}>
                                <Link
                                    className={`inner-div more-sports cg ox anl url-link d-flex flex-column align-items-center `}
                                    onClick={() => gaEventTracker(`Visit ${state?.active_sport}/${state?.active_sport_name}  Page`)}
                                    to={`/highlights?sport_id=${allsports.sport_id}&sub_type_id=${getDefaultMarketsForSport(allsports)}&sport_name=${allsports.sport_name}`}>
                                    <div className="inner-div cg ox anl url-link d-flex flex-column align-items-center">
                                        <div className="menu-img">
                                            <LazyLoadImage
                                                className="side-icon"
                                                src={getSportImageIcon(allsports?.sport_name)}
                                                alt=""
                                                effect='blur'
                                                style={{height: "23px", marginTop: "-6px"}}
                                            />
                                        </div>
                                        <p style={{textAlign: "center", marginBottom: "unset"}}>
                                            {allsports?.sport_name}
                                        </p>
                                    </div>
                                </Link>
                            </td>
                        );
                    })}

                    <td className={`menu-t m-auto sport-check ${pathname === `/promotions` ? "active_link" : ""} `}>
                        <Link
                            className={`inner-div more-sports cg  ox anl url-link d-flex flex-column align-items-center `}
                            onClick={() => gaEventTracker('Visit Promotion Page')} to={`/promotions`}>
                            <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center `}>
                                <div className="menu-img ">
                                    <LazyLoadImage
                                        className="side-icon"
                                        src={promo}
                                        alt=""
                                        effect='blur'
                                        style={{height: "23px", marginTop: "-6px"}}
                                    />
                                    <span className="badge rounded-pill bg-warning text-dark promo-count ">
                                        7
                                </span>
                                </div>
                                <p style={{textAlign: "center"}}>
                                    Promo
                                </p>
                            </div>
                        </Link>

                    </td>
                </tr>
                </tbody>
            </table>


        </div>)
    });

export default React.memo(MobileNav1);


