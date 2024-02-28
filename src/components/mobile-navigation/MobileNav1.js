import React, { useContext, useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

//Images
// import aviator from "../../../src/assets/img/mobile/Aviator.svg"
import league from "../../../src/assets/img/mobile/League.svg"

//SVGs
import soccer from "../../assets/svg/sports/Soccer.svg"
import casino1 from "../../assets/img/mobile/Casino.svg"
import jackpot from "../../assets/img/mobile/Jackpot.svg"
import promo from "../../assets/svg/fire.svg"
import aviator from "../../../src/assets/img/aviator.webp"
import jetX from "../../../src/assets/img/mobile/jet.svg";


import {getFromLocalStorage} from "../utils/local-storage";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import {StoreContext} from "../../context/store";

import {LazyLoadImage} from "react-lazy-load-image-component";
import {useDispatch, useSelector} from "react-redux";
import {setState} from "../../redux/dataSlice";

const MobileNav1 = React.memo(
    () => {

        const {state} = useContext(StoreContext);

        const scrollContainerRef = useRef(null);

        const gaEventTracker = useAnalyticsEventTracker('Navigation');

        const dispatchRedux=useDispatch()

        const pathname = window.location.pathname;

        const availableCategories = useSelector((state) => state.matchesData.sport_categories)

        const active_link=useSelector((state)=>state.data.active_link)

        const [competitions, setCompetitions] = useState(getFromLocalStorage("sport_categories"));

        const userData = useSelector((state) => state.auth.user)
        const [user, setUser] = useState(getFromLocalStorage("user"))

        useEffect(() => {
            if (userData) {
                setUser(userData || getFromLocalStorage("user"))
            }
        }, [userData])

        const setActiveLink=(link)=>{
            dispatchRedux(setState('active_link',link ))
        }

        useEffect(() => {
            setCompetitions(availableCategories||getFromLocalStorage("sport_categories"))

        }, [availableCategories])

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
        let url = new URL(window.location.href)
        let sport_id = url.searchParams.get('sport_id')

        useEffect(()=>{
            setActiveLink(sport_id||pathname||79)

        },[])

        const launchAviator=(status)=>{
            if(status==="demo"){
                navigate("/nare-games/aviator?status=demo")
            }else{
                navigate("/nare-games/aviator?status=live")
            }
            
        }

        const launchJetX = () => {
            navigate("/smart-play?game=JetX&category=JetX");
          };


        return (<div className="menu-wrapper mobile-nav-remove ">

            <table className="menu-table" style={{width: "100%", textAlign: "center", marginLeft: "-9px"}}>
                <tbody>
                <tr className={"tr-style mobile-nav-top"} ref={scrollContainerRef}>
                    <td className={`menu-t m-auto   sport-check  ${pathname === "/" || Number(active_link) === 79 ? "active_link" : "link-inactive"}`}>
                        <div
                            className={`inner-div more-sports  cg  ox anl url-link d-flex flex-column align-items-center  `}
                            onClick={() => {
                                gaEventTracker('Visit Home Page');
                                setActiveLink(79);
                                navigate('/')
                            }}>
                            <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center`}>

                                <div className="menu-img ">
                                    <LazyLoadImage
                                        className="side-icon"
                                        src={soccer}
                                        alt=""
                                        effect='blur'
                                        style={{height: "23px", marginTop: "-1px"}}
                                    />
                                </div>
                                <p style={{textAlign: "center", marginBottom: "unset"}}>
                                    Soccer
                                </p>
                            </div>
                        </div>
                    </td>

                    <td className={`menu-t m-auto sport-check ${'/nare-games/aviator'===active_link ? " active_link" : "link-inactive"}`}>
                        <div 
                              className={`inner-div more-sports cg  ox anl url-link d-flex flex-column align-items-center `}
                              onClick={() => {
                                  gaEventTracker('Visit Aviator Page');
                                  launchAviator(user?'live':'demo');
                                  setActiveLink('/nare-games/aviator')
                              }}>
                            <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center `}>

                                <div className="menu-img ">
                                    <LazyLoadImage
                                        className="side-icon "
                                        src={aviator}
                                        alt=""
                                        style={{height: "26px", marginTop: "-1px", width:'41px'}}
                                    />
                                </div>
                                <p style={{textAlign: "center", marginBottom: "unset"}}>
                                    Aviator
                                </p>
                            </div>
                        </div>

                    </td>
                    <td
              className={`menu-t m-auto sport-check ${
                "/smart-play?game=JetX&category=JetX" === active_link
                  ? " active_link"
                  : "link-inactive"
              }`}
            >
              <div
                className={`inner-div more-sports cg  ox anl url-link d-flex flex-column align-items-center `}
                onClick={() => {
                  gaEventTracker("Visit JetX Page");
                  launchJetX();
                  setActiveLink("/smart-play?game=JetX&category=JetX");
                }}
              >
                <div
                  className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center `}
                >
                  <div className="menu-img ">
                    <LazyLoadImage
                      className="side-icon "
                      src={jetX}
                      alt=""
                      style={{
                        height: "26px",
                        marginTop: "-4px",
                        width: "41px",
                      }}
                    />
                  </div>
                  <p style={{ textAlign: "center", marginBottom: "unset" }}>
                    JetX
                  </p>
                </div>
              </div>
            </td>
                    
                    <td className={`menu-t m-auto sport-check nare-league ${'/nare-league'===active_link ? "active_link" : "link-inactive"}`}>
                        <div
                            className={`inner-div more-sports cg  ox anl url-link d-flex flex-column align-items-center `}
                            onClick={() => {
                                gaEventTracker('Visit Nare League Page');
                                setActiveLink('/nare-league');
                                navigate('/nare-league')
                            }} 
                            >
                            <div className={`inner-div  cg hot-alert ox anl url-link d-flex flex-column align-items-center  `}>

                                <div className="menu-img  ">
                                    <LazyLoadImage
                                        className="side-icon"
                                        src={league}
                                        alt=""
                                        effect='blur'
                                        style={{height: "25px", marginTop: "0px"}}
                                    />
                                    <span className=" hot-alert-badge">HOT</span>

                                </div>
                                <p style={{textAlign: "center", marginBottom: "unset"}}>
                                    League
                                </p>
                            </div>
                        </div>
                    </td>
                    <td className={`menu-t m-auto sport-check ${'/jackpot'===active_link ? "active_link" : "link-inactive"} `}>
                        <div
                            className={`inner-div more-sports  cg  ox anl url-link d-flex flex-column align-items-center  `}
                            onClick={() => {
                                navigate('/jackpot')
                                gaEventTracker('Visit Jackpot Page');
                                setActiveLink('/jackpot')
                            }}>
                            <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center`}>

                                <div className="menu-img ">
                                    <LazyLoadImage
                                        className="side-icon "
                                        src={jackpot}
                                        alt=""
                                        effect='blur'
                                        style={{height: "32px", marginTop: "-3px"}}
                                    />
                                </div>
                                <p style={{textAlign: "center", marginBottom: "unset"}}>
                                    Jackpot
                                </p>
                            </div>
                        </div>

                    </td>

                    <td className={`menu-t m-auto sport-check ${'/casino' ===active_link ? " active_link" : "link-inactive"} `}>
                        <div
                            className={`inner-div more-sports  cg  ox anl url-link d-flex flex-column align-items-center `}
                            onClick={() => {
                                gaEventTracker('Visit Casino Page')
                                navigate('/casino');
                                setActiveLink('/casino')
                            }}>
                            <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center `}>

                                <div className="menu-img ">
                                    <LazyLoadImage
                                        className="side-icon"
                                        src={casino1}
                                        alt=""
                                        effect='blur'
                                        style={{height: "29px", marginTop: "-2px"}}
                                    />
                                </div>
                                <p style={{textAlign: "center", marginBottom: "unset"}}>
                                    Casino
                                </p>
                            </div>
                        </div>

                    </td>

                    
                    

                    

                    {competitions?.all_sports.map((allsports, index) => {

                        return allsports?.sport_id !== 79 && (
                            <td key={index}
                                className={`menu-t m-auto sport-check ${Number(active_link) === Number(allsports?.sport_id) ? 'active_link' : "link-inactive"}`}>
                                <div
                                    className={`inner-div more-sports cg ox anl url-link d-flex flex-column align-items-center `}
                                    onClick={() => {
                                        gaEventTracker(`Visit ${state?.active_sport}/${state?.active_sport_name}  Page`);
                                        setActiveLink(allsports?.sport_id);
                                        navigate(`/highlights?sport_id=${allsports.sport_id}&sub_type_id=${getDefaultMarketsForSport(allsports)}&sport_name=${allsports.sport_name}`)
                                    }}
                                    >
                                    <div className="inner-div cg ox anl url-link d-flex flex-column align-items-center">
                                        <div className="menu-img">
                                            <LazyLoadImage
                                                className="side-icon"
                                                src={getSportImageIcon(allsports?.sport_name)}
                                                alt=""
                                                effect='blur'
                                                style={{height: "23px", marginTop: "-1px"}}
                                            />
                                        </div>
                                        <p style={{textAlign: "center", marginBottom: "unset"}}>
                                            {allsports?.sport_name}
                                        </p>
                                    </div>
                                </div>
                            </td>
                        );
                    })}
                    <td className={`menu-t m-auto sport-check ${'/promotions' === active_link ? "active_link" : "link-inactive"} `}>
                        <div
                            className={`inner-div more-sports cg  ox anl url-link d-flex flex-column align-items-center `}
                            onClick={() => {
                                gaEventTracker('Visit Promotion Page');
                                setActiveLink('/promotions');
                                navigate(`/promotions`)
                            }} >
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
                                <p style={{textAlign: "center", marginBottom: "unset"}}>
                                    Promo
                                </p>
                            </div>
                        </div>

                    </td>
                </tr>
                </tbody>
            </table>


        </div>)
    });

export default React.memo(MobileNav1);

