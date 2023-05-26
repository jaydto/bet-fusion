import React, { useEffect, useState, useCallback, useContext} from 'react';
import {
    Link,
} from "react-router-dom";

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import promo from "../../../src/assets/img/mobile/fire.png";
import jackpot from "../../../src/assets/img/mobile/jackpot.png";
import soccer from "../../../src/assets/svg/sports/Soccer.png"
import jetX from "../../assets/img/mobile/jetx.webp"
import casino1 from "../../assets/img/casino/casino.png"
import aviator from "../../../src/assets/img/aviator.webp"
import spaceman from "../../../src/assets/img/spaceman.webp"
import kiron from "../../../src/assets/img/kiron/nare-league.webp"
import Affiliate from "../../../src/assets/img/mobile/affiliate-marketing.png"
import fire from '../../assets/img/fire.webp'
import {getFromLocalStorage,setLocalStorage} from "../utils/local-storage";
import makeRequest from "../utils/fetch-request";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";

import { Context } from '../../context/store';
import LoginModal from '../modals/LoginModal';

const MobileNav1 = (props) => {
    const [showLoadingModal, setShowLoadingModal] = useState(false);

    // console.log("allsports_from_local",sport)
    const [state, dispatch] =useContext(Context)

    const searchTerm=window.location.search

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
                // setSport(c_result);
                dispatch({type:"SET", key: "sport", payload: c_result})


                setLocalStorage('categories', c_result);

            } else {
                fetchData()
            }
        } else {
            dispatch({type:"SET", key: "sport", payload: cached_competitions})

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
    //click functionality
    const handleLinkClick=(event)=> {
        // remove highlight class from all links
        const links = document.querySelectorAll('.link');
        links.forEach((link) => link.classList.remove('highlight'));

        // add highlight class to clicked link
        event.currentTarget.classList.add('highlight');
    }
    const LoginCheck = (game) => {
        if(game == "JetX"){
            state?.user !== null ? window.location.href = "/smart-play?game=JetX&category=JetX" : setShowLoadingModal(true);
        }else {
            state?.user !== null ? window.location.href = "/gameplay/1301/1" : setShowLoadingModal(true);
        }

    };

    return (<div className="menu-wrapper mobile-nav-remove ">
        {showLoadingModal && ( <LoginModal setShowLoadingModal={setShowLoadingModal} visible={showLoadingModal}/>)}
        <table className="menu-table" style={{width: "100%", textAlign: "center", marginLeft:"-9px"}}>
            <tbody>
            <tr className={"tr-style mobile-nav-top"}>
                <td  className={`menu-t m-auto sport-check  `} style={{paddingLeft: "4px"}} >
                    <Link className="inner-div more-sports active cg  ox anl url-link d-flex flex-column align-items-center" to={`/`}   >
                        <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center ${pathname===`/`?"active":""}`}>
                            {/* {console.log('all sports',allsports.sport_name)} */}
                            <div className="menu-img ">
                                <img
                                    className="side-icon"
                                    src={soccer}
                                    alt=""
                                    style={{height: "23px", marginTop:"-6px"}}
                                />
                            </div>
                            <strong style={{textAlign: "center"}}>
                                Soccer
                            </strong>
                        </div>
                    </Link>

                </td>
                <td  className={`menu-t m-auto sport-check  `} style={{paddingLeft: "4px"}} >
                    <Link className="inner-div more-sports active cg  ox anl url-link d-flex flex-column align-items-center" to={`/jackpot`}   >
                        <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center ${pathname===`/jackpot`?"active":""}`}>

                            <div className="menu-img ">
                                <img
                                    className="side-icon"
                                    src={jackpot}
                                    alt=""
                                    style={{height: "23px", marginTop:"-6px"}}
                                />
                            </div>
                            <strong style={{textAlign: "center"}}>
                                Jackpot
                            </strong>
                        </div>
                    </Link>

                </td>
                <td  className={`menu-t m-auto sport-check  `} style={{paddingLeft: "4px"}} >
                    <Link className="inner-div more-sports active cg  ox anl url-link d-flex flex-column align-items-center" to={`/nare-games/Aviator`}   >
                        <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center ${window.location.search.includes('Aviator')?"active":""}`}>

                            <div className="menu-img ">
                                <img
                                    className="side-icon"
                                    src={aviator}
                                    alt=""
                                    style={{height: "23px", marginTop:"-6px"}}
                                />
                                <span className=" badge" style={{color:"white",background:"red"
                                    ,marginTop:"-5px", borderRadius: "10px 0 15px 0", marginLeft:"1px", padding:"0.3px 3px ", fontSize:"5.5px",position:'absolute',top:'5px', left:'32px'}}>NEW</span>
                            </div>
                            <strong style={{textAlign: "center"}}>
                                Aviator
                            </strong>
                        </div>
                    </Link>

                </td>
                <td  className={`menu-t m-auto sport-check  `} style={{paddingLeft: "4px"}} >
                    <Link className="inner-div more-sports active cg  ox anl url-link d-flex flex-column align-items-center" to={`#`} onClick={()=>LoginCheck('casino')}   >
                        <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center ${pathname===`/casino`?"active":""}`}>

                            <div className="menu-img ">
                                <img
                                    className="side-icon"
                                    src={casino1}
                                    alt=""
                                    style={{height: "23px", marginTop:"-6px"}}
                                />
                                <span className=" badge" style={{color:"white",background:"red"
                                    ,marginTop:"-5px", borderRadius: "10px 0 15px 0", marginLeft:"1px", padding:"0.3px 3px ", fontSize:"5.5px",position:'absolute',top:'5px', left:'32px'}}>NEW</span>
                            </div>
                            <strong style={{textAlign: "center"}}>
                                Casino
                            </strong>
                        </div>
                    </Link>

                </td>

                <td  className={`menu-t m-auto sport-check  `} style={{paddingLeft: "4px"}} >
                    <Link className="inner-div more-sports active cg  ox anl url-link d-flex flex-column align-items-center" to={`#`}   onClick={()=>LoginCheck('Jetx')}>
                        <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center ${window.location.search.includes('Jetx')?"active":""}`}>
                            <div className="menu-img ">
                                <img
                                    className="side-icon"
                                    src={jetX}
                                    alt=""
                                    style={{height: "23px", marginTop:"-6px"}}
                                />
                                <span className=" badge" style={{color:"white",background:"red"
                                    ,marginTop:"-5px", borderRadius: "10px 0 15px 0", marginLeft:"1px", padding:"0.3px 3px ", fontSize:"5.5px",position:'absolute',top:'5px', left:'30px'}}>NEW</span>
                            </div>
                            <strong style={{textAlign: "center"}}>
                                Jetx
                            </strong>
                        </div>
                    </Link>

                </td>
                {/* <td  className={ window.location.search.includes('gameplay') ? 'active' : 'menu-t m-auto'}
                    style={{paddingLeft: "10px"}}>
                    <Link className="cg fm ox anl url-link d-flex flex-column align-items-center"
                          to={{pathname:"/live-casino"}}
                          title="Live Casino">
                        <div className="menu-img">
                            <LazyLoadImage src={casino} style={{height: "23px", marginTop:"-6px" }}/>
                            <span className=" badge" style={{color:"white",background:"red"
                                ,marginTop:"-5px", borderRadius: "10px 0 15px 0", marginLeft:"1px", padding:"0.3px 3px ", fontSize:"5.5px"}}>NEW</span>
                       </div>
                         <strong className={"text-light"}>Live Casino</strong>
                    </Link>

                </td> */}
                {/* <td  className={ window.location.search.includes('Crashlite') ? 'active' : 'menu-t'}
                        onClick={() => gaEventTracker('Crashlite')} style={{paddingLeft: "4px"}}>
                        <Link className="cg fm ox anl url-link d-flex flex-column align-items-center pb-3"
                            to={"#"}
                            title="Crashlite" style={{width:"60px"}}
                            onClick={()=>LoginCheck("crashlite")}>
                        <div className="menu-img d-flex justify-content-center ">
                        <span className=" badge crash" style={{color:"white",background:"red"
                                ,marginTop:"1px", borderRadius: "10px 0 15px 0", marginLeft:"1px", padding:"0.6px 3px ",height:"7px", fontSize:"5.5px"}}>NEW</span>
                            </div>
                                    <LazyLoadImage src={crash} style={{height: "32px", marginTop:"-13px" }}/>
                        </Link>

                    </td> */}

                <td  className={ pathname=="/nare-league"||pathname.includes('kiron') ? 'active' : 'nare-league menu-t m-auto'}
                     onClick={() => gaEventTracker('gameplay')} style={{paddingLeft: "4px"}}>
                    <Link className="inner-div active cg  ox anl url-link d-flex flex-column align-items-center"
                          to={"/nare-league"}
                          title=" League"
                    >
                        <div className="menu-img">
                            <img src={kiron} style={{height: "40px", marginTop:"-10px", width:"46px" }}/>
                            <span className=" badge" style={{color:"white",background:"red"
                                ,marginTop:"-5px", borderRadius: "10px 0 15px 0", marginLeft:"1px", padding:"0.3px 3px ", fontSize:"5.5px",position:'absolute',top:'5px',left:'32px'}}>NEW</span>
                        </div>
                        <strong className={"text-light m-auto"}> League</strong>
                    </Link>

                </td>

                <td  className={ window.location.search.includes('gameplay') ? 'active' : 'menu-t m-auto'}
                     onClick={() => gaEventTracker('gameplay')} style={{paddingLeft: "4px"}}>
                    <Link className="inner-div active cg  ox anl url-link d-flex flex-column align-items-center"
                          to={"#"}
                          title="SpaceMan"
                          onClick={()=>LoginCheck("spaceman")}>
                        <div className="menu-img">
                            <img src={spaceman} style={{height: "24px", marginTop:"-6px", width:"32px" }}/>
                            <span className=" badge" style={{color:"white",background:"red"
                                ,marginTop:"-5px", borderRadius: "10px 0 15px 0", marginLeft:"1px", padding:"0.3px 3px ", fontSize:"5.5px",position:'absolute',top:'5px', left:'50px'}}>NEW</span>
                        </div>
                        <strong className={"text-light m-auto"}> spaceman</strong>
                    </Link>

                </td>



                <td className={window.location.href.includes('nare-games') ? 'menu-t m-auto active ' : ' menu-t m-auto nare-games'}
                    onClick={() => gaEventTracker('Nare Games')} style={{paddingLeft: "0px"}}>
                    <Link className="inner-div active cg  ox anl url-link d-flex flex-column align-items-center"
                          to="/nare-games"
                          title="Nare Games">
                        <div className="menu-img d-flex justify-content-center ">
                            <img src={fire} style={{height: "29px", marginTop:"-7px"}}/>
                            <span className=" badge" style={{color:"white",background:"red"
                                ,marginTop:"10px", borderRadius: "10px 0 15px 0", marginLeft:"1px", padding:"0.9px 3px ",height:"8px", fontSize:"5.5px",position:'absolute',top:'-9px', left:'50px'}}>NEW</span>
                        </div><strong className={"text-light"}> Nare Games</strong>
                    </Link>

                </td>

                {state.sport?.all_sports.map((allsports, index) => (
                        allsports.sport_id!==79&&(
                            <td key={index} className={`menu-t m-auto sport-check  `} style={{paddingLeft: "4px"}} onClick={handleLinkClick}>
                                <Link className="inner-div more-sports active cg  ox anl url-link d-flex flex-column align-items-center" to={`/highlights?sport_id=${allsports.sport_id}&sub_type_id=${getDefaultMarketsForSport(allsports)}`}   >
                                    <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center ${pathname===`/highlights?sport_id=${allsports.sport_id}`?"active":""}`}>
                                        <div className="menu-img ">
                                            <img
                                                className="side-icon"
                                                src={getSportImageIcon(allsports?.sport_name)}
                                                alt=""
                                                style={{height: "23px", marginTop:"-6px"}}
                                            />
                                        </div>
                                        <strong style={{textAlign: "center"}}>
                                            { allsports?.sport_name }
                                        </strong>
                                    </div>
                                </Link>

                            </td>)
                    )
                )}
                <td  className={`menu-t m-auto sport-check  `} style={{paddingLeft: "4px"}} >
                    <Link className="inner-div more-sports active cg  ox anl url-link d-flex flex-column align-items-center" to={`/affiliate`}   >
                        <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center ${pathname===`/affiliate`?"active":""}`}>
                            <div className="menu-img ">
                                <img
                                    className="side-icon"
                                    src={Affiliate}
                                    alt=""
                                    style={{height: "23px", marginTop:"-6px"}}
                                />
                            </div>
                            <strong style={{textAlign: "center"}}>
                                Affiliate
                            </strong>
                        </div>
                    </Link>

                </td>

                <td  className={`menu-t m-auto sport-check  `} style={{paddingLeft: "4px"}} >
                    <Link className="inner-div more-sports active cg  ox anl url-link d-flex flex-column align-items-center" to={`/promotions`}   >
                        <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center ${pathname===`/promotions`?"active":""}`}>
                            <div className="menu-img ">
                                <img
                                    className="side-icon"
                                    src={promo}
                                    alt=""
                                    style={{height: "23px", marginTop:"-6px"}}
                                />
                            </div>
                            <strong style={{textAlign: "center"}}>
                                Promo
                            </strong>
                        </div>
                    </Link>

                </td>
            </tr>
            </tbody>
        </table>


    </div>)};

export default React.memo(MobileNav1);


