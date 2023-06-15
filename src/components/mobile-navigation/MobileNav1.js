import React, {useEffect, useState, useCallback, useContext, useRef} from 'react';
import {
    Link
} from "react-router-dom";

import 'react-lazy-load-image-component/src/effects/blur.css';
import promo from "../../../src/assets/img/mobile/fire.png";
import jackpot from "../../../src/assets/img/mobile/jackpot.png";
import soccer from "../../../src/assets/svg/sports/Soccer.png"
import jetX from "../../assets/img/mobile/jetx.webp"
import casino1 from "../../assets/img/casino/casino.png"
import aviator from "../../../src/assets/img/aviator.webp"
import spaceman from "../../../src/assets/img/spaceman.webp"
import Affiliate from "../../../src/assets/img/mobile/affiliate-marketing.png"
import fire from '../../assets/img/fire.webp'
import {getFromLocalStorage,setLocalStorage} from "../utils/local-storage";
import makeRequest from "../utils/fetch-request";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import xgame from "../../assets/img/mobile/xgames.png"

import { Context } from '../../context/store';
import LoginModal from '../modals/LoginModal';
import VirtualSvg from "../../assets/img/mobile/virtual.png";
const MobileNav1 = () => {
    const [showLoadingModal, setShowLoadingModal] = useState(false);

    const [state, dispatch] =useContext(Context)

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

    const LoginCheck = (game) => {
        if(game === "JetX"){
            if(state?.user !== null){
             window.location.href = "/smart-play?game=JetX&category=JetX" }
            else {
                setLocalStorage("ActiveLink",'/smart-play?game=JetX&category=JetX')
                window.location.href='/login'
            }
        }else if(game === "aviator"){
            if(state?.user !== null){
                window.location.href = "/nare-games/Aviator" }
            else {
                setLocalStorage("ActiveLink",'/nare-games/Aviator')
                window.location.href='/login'
            }

        }else if(game === "smart-soft"){
            if(state?.user !== null){
                window.location.href = "/smart-soft" }
            else {
                setLocalStorage("ActiveLink",'/smart-soft')
                window.location.href='/login'
            }

        }else if(game==='spaceman'){
            if(state?.user !== null){
                window.location.href = "/gameplay/1301/1"
            } else{
                setLocalStorage("ActiveLink",'/gameplay/1301/1')
                window.location.href='/login'
            }
        }else {
         if(state?.user !== null){
             window.location.href = "/casino"
         } else{
             setLocalStorage("ActiveLink",'/casino')
             window.location.href='/login'

         }
    }

    };

    return (<div className="menu-wrapper mobile-nav-remove ">
        {showLoadingModal && ( <LoginModal setShowLoadingModal={setShowLoadingModal} visible={showLoadingModal}/>)}
        <table className="menu-table" style={{width: "100%", textAlign: "center", marginLeft:"-9px"}}>
            <tbody>
            <tr className={"tr-style mobile-nav-top"} ref={scrollContainerRef}>
                <td  className={`menu-t m-auto   sport-check  ${pathname===`/`||pathname==='/highlights'||pathname==='/tomorrow'||pathname==='/countries'||pathname==='/upcoming'?"active_link":""}`}  >
                    <Link className={`inner-div more-sports  cg  ox anl url-link d-flex flex-column align-items-center  `} onClick={() => gaEventTracker('Visit Home Page')}  to={`/`}   >
                        <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center`}>
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

                <td  className={`menu-t m-auto sport-check  ${pathname.includes('Aviator')?"active_link":""}`}  >
                    <Link className={`inner-div more-sports cg  ox anl url-link d-flex flex-column align-items-center `} onClick={() => {
                            LoginCheck('aviator');
                            gaEventTracker('Visit Aviator Page')
                    }}  to={`#`}   >
                        <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center `}>

                            <div className="menu-img ">
                                <img
                                    className="side-icon"
                                    src={aviator}
                                    alt=""
                                    style={{height: "23px", marginTop:"-6px"}}
                                />
                                <span className=" new-alert-badge hot" >HOT</span>
                            </div>
                            <strong style={{textAlign: "center"}}>
                                Aviator
                            </strong>
                        </div>
                    </Link>

                </td>
                {/*<td  className={`menu-t m-auto sport-check nare-league ${pathname.includes('/nare-league')?"active_link":""}`}  >*/}
                {/*    <Link className={`inner-div more-sports cg  ox anl url-link d-flex flex-column align-items-center `} onClick={() => gaEventTracker('Visit Nare League Page')}  to={`/nare-league`}   >*/}
                {/*        <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center  `}>*/}

                {/*            <div className="menu-img  ">*/}
                {/*                <img*/}
                {/*                    className="side-icon"*/}
                {/*                    src={kiron}*/}
                {/*                    alt=""*/}
                {/*                    style={{height: "23px", marginTop:"-6px"}}*/}
                {/*                />*/}
                {/*                <span className=" new-alert-badge" >NEW</span>*/}
                {/*            </div>*/}
                {/*            <strong style={{textAlign: "center"}}>*/}
                {/*                League*/}
                {/*            </strong>*/}
                {/*        </div>*/}
                {/*    </Link>*/}

                {/*</td>*/}

                <td  className={`menu-t m-auto sport-check ${pathname===`/casino`? " active_link":""} `}  >
                    <Link className={`inner-div more-sports  cg  ox anl url-link d-flex flex-column align-items-center `}  to={`#`}  onClick={()=>{LoginCheck('casino');gaEventTracker('Visit Casino Page')}}>
                        <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center `}>

                            <div className="menu-img ">
                                <img
                                    className="side-icon"
                                    src={casino1}
                                    alt=""
                                    style={{height: "23px", marginTop:"-6px"}}
                                />
                                <span className="new-alert-badge hot" >HOT</span>
                            </div>
                            <strong style={{textAlign: "center"}}>
                                Casino
                            </strong>
                        </div>
                    </Link>

                </td>
                <td  className={`menu-t m-auto sport-check  ${pathname===`/jackpot`?"active_link":""}`}  >
                    <Link className={`inner-div more-sports  cg  ox anl url-link d-flex flex-column align-items-center `} onClick={() => gaEventTracker('Visit Jackpot Page')} to={`/jackpot`}   >
                        <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center `}>

                            <div className="menu-img ">
                                <img
                                    className="side-icon"
                                    src={jackpot}
                                    alt=""
                                    style={{height: "23px", marginTop:"-6px"}}
                                />
                                <span className="new-alert-badge hot" >HOT</span>
                            </div>
                            <strong style={{textAlign: "center"}}>
                                Jackpot
                            </strong>
                        </div>
                    </Link>

                </td>
                <td  className={`menu-t m-auto sport-check ${window.location.search.includes('JetX')?"active_link":""} `}  >
                    <Link className={`inner-div more-sports  cg  ox anl url-link d-flex flex-column align-items-center  `}  to={`#`}  onClick={()=>{LoginCheck('JetX');gaEventTracker('Visit Jetx Page')}} >
                        <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center`}>

                            <div className="menu-img ">
                                <img
                                    className="side-icon"
                                    src={jetX}
                                    alt=""
                                    style={{height: "23px", marginTop:"-6px"}}
                                />
                                <span className=" new-alert-badge hot" >HOT</span>
                            </div>
                            <strong style={{textAlign: "center"}}>
                               JetX
                            </strong>
                        </div>
                    </Link>

                </td>
                <td  className={`menu-t m-auto sport-check ${window.location.search.includes('smart-soft')?"active_link":""} `}  >
                    <Link className={`inner-div more-sports  cg  ox anl url-link d-flex flex-column align-items-center  `}  to={`#`}  onClick={()=>{LoginCheck('smart-soft');gaEventTracker('Visit Jetx Page')}} >
                        <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center`}>

                            <div className="menu-img ">
                                <img
                                    className="side-icon"
                                    src={xgame}
                                    alt=""
                                    style={{height: "23px", marginTop:"-6px"}}
                                />
                                <span className=" new-alert-badge hot" >HOT</span>
                            </div>
                            <strong style={{textAlign: "center"}}>
                               Xgames
                            </strong>
                        </div>
                    </Link>

                </td>
                <td  className={`menu-t m-auto sport-check  ${pathname.includes('1301')?"active_link":""}`}  onClick={() => gaEventTracker('Visit SpaceMan Page')}>
                    <Link className={`inner-div more-sports cg  ox anl url-link d-flex flex-column align-items-center `}  to={`#`}  onClick={()=>{LoginCheck('spaceman');gaEventTracker('Visit SpaceMan Page')}} >
                        <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center `}>

                            <div className="menu-img ">
                                <img
                                    className="side-icon"
                                    src={spaceman}
                                    alt=""
                                    style={{height: "23px", marginTop:"-6px", width:'30px'}}
                                />
                                <span className=" new-alert-badge hot" >HOT</span>
                            </div>
                            <strong style={{textAlign: "center"}}>
                                Spaceman
                            </strong>
                        </div>
                    </Link>
                </td>
                <td  className={`menu-t m-auto sport-check  ${window.location.pathname.includes('nare-games')?"active_link":""} `}  >
                    <Link className={`inner-div more-sports  cg  ox anl url-link d-flex flex-column align-items-center `} onClick={() => gaEventTracker('Visit Nare Games Page')} to={`/nare-games`}   >
                        <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center`}>

                            <div className="menu-img ">
                                <img
                                    className="side-icon"
                                    src={fire}
                                    alt=""
                                    style={{height: "23px", marginTop:"-6px"}}
                                />
                                <span className=" new-alert-badge" >NEW</span>
                            </div>
                            <strong style={{textAlign: "center"}}>
                                Nare Games
                            </strong>
                        </div>
                    </Link>

                </td>
               <td  className={`menu-t m-auto sport-check  ${pathname.includes('/virtuals')?"active_link":""}`}  >
                    <Link className={`inner-div more-sports cg  ox anl url-link d-flex flex-column align-items-center `} onClick={() => gaEventTracker('Visit Virtuals Page')}  to={`/virtuals`}   >
                        <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center  `}>

                            <div className="menu-img  ">
                                <img
                                    className="side-icon virtuals-icon"
                                    src={VirtualSvg}
                                    alt=""
                                    style={{height: "23px", marginTop:"-6px"}}
                                />

                            </div>
                            <strong style={{textAlign: "center"}}>
                                Virtuals
                            </strong>
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
                         <strong className={"text-light"}>Live Casino</strong>
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


                    return allsports.sport_id !== 79 && (
                        <td key={index} className={`menu-t m-auto sport-check ${state?.active_sport===allsports.sport_id ? 'active_link' : ''}`} >
                            <Link className={`inner-div more-sports cg ox anl url-link d-flex flex-column align-items-center `} onClick={() => gaEventTracker(`Visit ${state?.active_sport}/${state?.active_sport_name}  Page`)} to={`/highlights?sport_id=${allsports.sport_id}&sub_type_id=${getDefaultMarketsForSport(allsports)}&sport_name=${allsports.sport_name}`}>
                                <div className="inner-div cg ox anl url-link d-flex flex-column align-items-center">
                                    <div className="menu-img">
                                        <img
                                            className="side-icon"
                                            src={getSportImageIcon(allsports?.sport_name)}
                                            alt=""
                                            style={{ height: "23px", marginTop: "-6px" }}
                                        />
                                    </div>
                                    <strong style={{ textAlign: "center" }}>
                                        {allsports?.sport_name}
                                    </strong>
                                </div>
                            </Link>
                        </td>
                    );
                })}

                <td  className={`menu-t m-auto sport-check  ${pathname===`/affiliate`?"active_link":""}`}  >
                    <Link className={`inner-div more-sports  cg  ox anl url-link d-flex flex-column align-items-center `} onClick={() => gaEventTracker('Visit Affiliate Page')}  to={`/affiliate`}   >
                        <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center `}>
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

                <td  className={`menu-t m-auto sport-check ${pathname===`/promotions`?"active_link":""} `}  >
                    <Link className={`inner-div more-sports cg  ox anl url-link d-flex flex-column align-items-center `} onClick={() => gaEventTracker('Visit Promotion Page')}  to={`/promotions`}   >
                        <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center `}>
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


