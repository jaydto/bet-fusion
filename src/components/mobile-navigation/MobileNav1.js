import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

import 'react-lazy-load-image-component/src/effects/blur.css';
import promo from "../../../src/assets/img/mobile/fire.png";
import jackpot from "../../../src/assets/img/mobile/jackpot.png";
import soccer from "../../../src/assets/svg/sports/Soccer.png"
import jetX from "../../assets/img/mobile/jetx.webp"
import FootballX from "../../assets/img/mobile/footballX.webp"
import casino1 from "../../assets/img/casino/casino.png"
import aviator from "../../../src/assets/img/aviator.webp"
import spaceman from "../../../src/assets/img/spaceman.webp"
import league from "../../../src/assets/img/kiron/nare-league.webp"
import fire from '../../assets/img/fire.webp'
import {getFromLocalStorage, setLocalStorage} from "../utils/local-storage";
import makeRequest from "../utils/fetch-request";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import xgame from "../../assets/img/mobile/xgames.png"

import {StoreContext } from "../../context/store";
import LoginModal from '../modals/LoginModal';
import VirtualSvg from "../../assets/img/mobile/virtual.png";
import {LazyLoadImage} from "react-lazy-load-image-component";

const MobileNav1 = React.memo(
    () => {
        const [showLoadingModal, setShowLoadingModal] = useState(false);

        const { state, dispatch } = useContext(StoreContext);

        const scrollContainerRef = useRef(null);

        const gaEventTracker = useAnalyticsEventTracker('Navigation');

        const pathname = window.location.pathname;

        const fetchData = useCallback(async () => {
            let cached_competitions = getFromLocalStorage('categories');
            let endpoint = "/v1/categories";

            if (!cached_competitions) {
                const [competition_result] = await Promise.all([
                    makeRequest({url: endpoint, method: "get", data: null}),
                ]);
                let [c_status, c_result] = competition_result

                if (c_status === 200) {
                    // setSport(c_result);
                    dispatch({type: "SET", key: "sport", payload: c_result})

                    setLocalStorage('categories', c_result);

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
                sport_image = topLeagues ? require(`../../../src/assets/${sport_name}`) : require(`../../../src/assets/svg/${folder}/${sport_name}.png`);
            } catch (error) {
                sport_image = require(`../../../src/assets/svg/${folder}/${default_img}.svg`);
            }
            return sport_image
        }
        const navigate = useNavigate()
        const LoginCheck = (game) => {
            if (game == "JetX") {
                if (state?.user !== null) {
                    navigate("/smart-play?game=JetX&category=JetX")
                } else {
                    setLocalStorage("ActiveLink", '/smart-play?game=JetX&category=JetX')
                    navigate('/login')
                }
            } else if (game == "FootballX") {
                if (state?.user !== null) {
                    navigate("/smart-play?game=FootballX&category=Games")
                } else {
                    setLocalStorage("ActiveLink", '/smart-play?game=FootballX&category=Games')
                    navigate('/login')
                }
            }else if (game == 'spaceman') {
                if (state?.user !== null) {
                    navigate("/gameplay/1301/1")
                } else {
                    setLocalStorage("ActiveLink", '/gameplay/1301/1')
                    navigate('/login')
                }
            } else if (game == 'smart-soft') {
                if (state?.user !== null) {
                    navigate("/smart-soft")
                } else {
                    setLocalStorage("ActiveLink", '/smart-soft')
                    navigate('/login')
                }

            } else {
                if (state?.user !== null) {
                    navigate("/casino")
                } else {
                    setLocalStorage("ActiveLink", '/casino')
                    navigate('/login')

                }
            }

        };
        return (<div className="menu-wrapper mobile-nav-remove ">
            {showLoadingModal && (<LoginModal setShowLoadingModal={setShowLoadingModal} visible={showLoadingModal}/>)}
            <table className="menu-table" style={{width: "100%", textAlign: "center", marginLeft: "-9px"}}>
                <tbody>
                <tr className={"tr-style mobile-nav-top"} ref={scrollContainerRef}>
                    <td className={`menu-t m-auto   sport-check  ${pathname==="/" || Number(state?.active_sport)===79 ? "active_link" : ""}`}>
                        <Link
                            className={`inner-div more-sports  cg  ox anl url-link d-flex flex-column align-items-center  `}
                            onClick={() => gaEventTracker('Visit Home Page')} to={`/`}>
                            <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center`}>

                                <div className="menu-img ">
                                    <LazyLoadImage
                                        className="side-icon"
                                        src={soccer}
                                        alt=""
                                        style={{height: "23px", marginTop: "-6px"}}
                                    />
                                </div>
                                <p style={{textAlign: "center"}}>
                                    Soccer
                                </p>
                            </div>
                        </Link>

                    </td>
                    <td  className={`menu-t m-auto sport-check nare-league ${pathname.includes('/nare-league')?"active_link":""}`}  >
                        <Link className={`inner-div more-sports cg  ox anl url-link d-flex flex-column align-items-center `} onClick={() => gaEventTracker('Visit Nare League Page')}  to={`/nare-league`}   >
                            <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center  `}>

                                <div className="menu-img  ">
                                    <LazyLoadImage
                                        className="side-icon"
                                        src={league}
                                        alt=""
                                        style={{height: "23px", marginTop:"-6px"}}
                                    />

                                </div>
                                <p style={{textAlign: "center"}}>
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
                                        style={{height: "23px", marginTop: "-6px", width:'30px'}}
                                    />
                                    <span className=" hot-alert-badge">HOT</span>
                                </div>
                                <p style={{textAlign: "center"}}>
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
                                        style={{height: "23px", marginTop: "-6px"}}
                                    />
                                </div>
                                <p style={{textAlign: "center"}}>
                                    Jackpot
                                </p>
                            </div>
                        </div>

                    </td>


                    <td className={`menu-t m-auto sport-check ${pathname === `/casino` ? " active_link" : ""} `}>
                        <div
                            className={`inner-div more-sports  cg  ox anl url-link d-flex flex-column align-items-center `}
                            onClick={() => {
                                LoginCheck('casino');
                                gaEventTracker('Visit Casino Page')
                            }}>
                            <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center `}>

                                <div className="menu-img ">
                                    <LazyLoadImage
                                        className="side-icon"
                                        src={casino1}
                                        alt=""
                                        style={{height: "23px", marginTop: "-6px"}}
                                    />
                                </div>
                                <p style={{textAlign: "center"}}>
                                    Casino
                                </p>
                            </div>
                        </div>

                    </td>

                  <td className={`menu-t m-auto sport-check ${window.location.search.includes('JetX') ? "active_link" : ""} `}>
                        <div
                            className={`inner-div more-sports  cg  ox anl url-link d-flex flex-column align-items-center  `}
                            onClick={() => {
                                LoginCheck('JetX');
                                gaEventTracker('Visit Jetx Page')
                            }}>
                            <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center`}>

                                <div className="menu-img ">
                                    <LazyLoadImage
                                        className="side-icon"
                                        src={jetX}
                                        alt=""
                                        style={{height: "23px", marginTop: "-6px"}}
                                    />

                                </div>
                                <p style={{textAlign: "center"}}>
                                    JetX
                                </p>
                            </div>
                        </div>

                    </td>
                    <td className={`menu-t m-auto sport-check ${window.location.search.includes('FootballX') ? "active_link" : ""} `}>
                        <div
                            className={`inner-div more-sports  cg  ox anl url-link d-flex flex-column align-items-center  `}
                            onClick={() => {
                                LoginCheck('FootballX');
                                gaEventTracker('Visit FootballX Page')
                            }}>
                            <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center`}>

                                <div className="menu-img ">
                                    <LazyLoadImage
                                        className="side-icon football-x"
                                        src={FootballX}
                                        alt=""
                                        style={{height: "23px", marginTop: "-6px"}}
                                    />
                                    {/*<span className=" new-alert-badge">NEW</span>*/}
                                </div>
                                <p style={{textAlign: "center"}}>
                                    FootballX
                                </p>
                            </div>
                        </div>

                    </td>
                    <td className={`menu-t m-auto sport-check ${window.location.search.includes('smart-soft') ? "active_link" : ""} `}>
                        <div
                            className={`inner-div more-sports  cg  ox anl url-link d-flex flex-column align-items-center  `}
                            to={`#`} onClick={() => {
                            LoginCheck('smart-soft');
                            gaEventTracker('Visit Jetx Page')
                        }}>
                            <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center`}>

                                <div className="menu-img ">
                                    <LazyLoadImage
                                        className="side-icon"
                                        src={xgame}
                                        alt=""
                                        style={{height: "23px", marginTop: "-6px"}}
                                    />

                                </div>
                                <p style={{textAlign: "center"}}>
                                    Xgames
                                </p>
                            </div>
                        </div>

                    </td>
                    <td className={`menu-t m-auto sport-check  ${pathname.includes('1301') ? "active_link" : ""}`}
                        onClick={() => gaEventTracker('Visit SpaceMan Page')}>
                        <div
                            className={`inner-div more-sports cg  ox anl url-link d-flex flex-column align-items-center `}
                            onClick={() => {
                                LoginCheck('spaceman');
                                gaEventTracker('Visit SpaceMan Page')
                            }}>
                            <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center `}>

                                <div className="menu-img ">
                                    <LazyLoadImage
                                        className="side-icon"
                                        src={spaceman}
                                        alt=""
                                        style={{height: "23px", marginTop: "-6px", width: '30px'}}
                                    />

                                </div>
                                <p style={{textAlign: "center"}}>
                                    Spaceman
                                </p>
                            </div>
                        </div>
                    </td>
                    <td className={`menu-t m-auto sport-check  ${window.location.pathname.includes('nare-games') ? "active_link" : ""} `}>
                        <Link
                            className={`inner-div more-sports  cg  ox anl url-link d-flex flex-column align-items-center `}
                            onClick={() => gaEventTracker('Visit Nare Games Page')} to={`/nare-games`}>
                            <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center`}>

                                <div className="menu-img ">
                                    <LazyLoadImage
                                        className="side-icon"
                                        src={fire}
                                        alt=""
                                        style={{height: "23px", marginTop: "-6px"}}
                                    />
                                </div>
                                <p style={{textAlign: "center"}}>
                                    Nare Games
                                </p>
                            </div>
                        </Link>

                    </td>
                    <td className={`menu-t m-auto sport-check  ${pathname.includes('/virtuals') ? "active_link" : ""}`}>
                        <Link
                            className={`inner-div more-sports cg  ox anl url-link d-flex flex-column align-items-center `}
                            onClick={() => gaEventTracker('Visit Virtuals Page')} to={`/virtuals`}>
                            <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center  `}>

                                <div className="menu-img  ">
                                    <LazyLoadImage
                                        className="side-icon virtuals-icon"
                                        src={VirtualSvg}
                                        alt=""
                                        style={{height: "23px", marginTop: "-6px"}}
                                    />

                                </div>
                                <p style={{textAlign: "center"}}>
                                    Virtuals
                                </p>
                            </div>
                        </Link>

                    </td>

                    {/* <td  className={ window.location.search.includes('gameplay') ? 'active_link' : 'menu-t m-auto'}
                    style={{paddingLeft: "10px"}}>
                    <Link className="cg fm ox anl url-link d-flex flex-column align-items-center"
                          to={{pathname:"/live-casino"}}
                          title="Live Casino">
                        <div className="menu-img">
                            <LazyLoadImage src={casino} style={{height: "23px", marginTop:"-6px" }}/>
                            <span className=" new-alert-badge" style={{color:"white",background:"red"
                                ,marginTop:"-5px", borderRadius: "10px 0 15px 0", marginLeft:"1px", padding:"0.3px 3px ", fontSize:"5.5px"}}>NEW</span>
                       </div>
                         <p className={"text-light"}>Live Casino</p>
                    </Link>

                </td> */}
                    {/* <td  className={ window.location.search.includes('Crashlite') ? 'active_link' : 'menu-t'}
                        onClick={() => gaEventTracker('Crashlite')} >
                        <Link className="cg fm ox anl url-link d-flex flex-column align-items-center pb-3"
                            to={"#"}
                            title="Crashlite" style={{width:"60px"}}
                            onClick={()=>LoginCheck("crashlite")}>
                        <div className="menu-img d-flex justify-content-center ">
                        <span className=" new-alert-badge crash" style={{color:"white",background:"red"
                                ,marginTop:"1px", borderRadius: "10px 0 15px 0", marginLeft:"1px", padding:"0.6px 3px ",height:"7px", fontSize:"5.5px"}}>NEW</span>
                            </div>
                                    <LazyLoadImage src={crash} style={{height: "32px", marginTop:"-13px" }}/>
                        </Link>

                    </td> */}

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
                                                style={{height: "23px", marginTop: "-6px"}}
                                            />
                                        </div>
                                        <p style={{textAlign: "center"}}>
                                            {allsports?.sport_name}
                                        </p>
                                    </div>
                                </Link>
                            </td>
                        );
                    })}

                    {/*<td  className={`menu-t m-auto sport-check  ${pathname===`/affiliate`?"active_link":""}`}  >*/}
                    {/*    <Link className={`inner-div more-sports  cg  ox anl url-link d-flex flex-column align-items-center `} onClick={() => gaEventTracker('Visit Affiliate Page')}  to={`/affiliate`}   >*/}
                    {/*        <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center `}>*/}
                    {/*            <div className="menu-img ">*/}
                    {/*                <LazyLoadImage*/}
                    {/*                    className="side-icon"*/}
                    {/*                    src={Affiliate}*/}
                    {/*                    alt=""*/}
                    {/*                    style={{height: "23px", marginTop:"-6px"}}*/}
                    {/*                />*/}
                    {/*            </div>*/}
                    {/*            <p style={{textAlign: "center"}}>*/}
                    {/*                Affiliate*/}
                    {/*            </p>*/}
                    {/*        </div>*/}
                    {/*    </Link>*/}

                    {/*</td>*/}

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


