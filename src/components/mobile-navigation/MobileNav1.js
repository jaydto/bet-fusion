import React, { useContext, useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

//Images
// import aviator from "../../../src/assets/img/mobile/Aviator.svg"
import league from "../../../src/assets/svg/game.svg"

//SVGs
import soccer from "../../assets/svg/sports/Soccer.svg"
import casino1 from "../../assets/svg/casino.svg"


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


        const active_link=useSelector((state)=>state.data.active_link)


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
                    {/* <td className={`menu-t m-auto   sport-check  ${pathname === "/" || Number(active_link) === 79 ? "active_link" : "link-inactive"}`}>
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
                    </td> */}
                    <td className={`menu-t m-auto sport-check ${'/c' ===active_link ? " active_link" : "link-inactive"} `}>
                        <div
                            className={`inner-div more-sports  cg  ox anl url-link d-flex flex-column align-items-center `}
                            onClick={() => {
                                gaEventTracker('Visit Casino Page')
                                navigate('/');
                                setActiveLink('/')
                            }}>
                            <div className={`inner-div  cg  ox anl url-link d-flex flex-column align-items-center `}>

                                <div className="menu-img ">
                                    <LazyLoadImage
                                        className="side-icon"
                                        src={casino1}
                                        alt=""
                                        effect='blur'
                                        style={{height: "25px", marginTop: "-2px", filter:"invert(1)"}}
                                    />
                                </div>
                                <p style={{textAlign: "center", marginBottom: "unset"}}>
                                  Home
                                </p>
                            </div>
                        </div>

                    </td>

                    <td className={`menu-t m-auto sport-check nare-league ${pathname === "/"===active_link ? "active_link" : "link-inactive"}`}>
                        <div
                            className={`inner-div more-sports cg  ox anl url-link d-flex flex-column align-items-center `}
                            onClick={() => {
                                gaEventTracker('Visit Big League Page');
                                setActiveLink('/');
                                navigate('/')
                            }} 
                            >
                            <div className={`inner-div  cg hot-alert ox anl url-link d-flex flex-column align-items-center  `}>

                                <div className="menu-img  ">
                                    <LazyLoadImage
                                        className="side-icon"
                                        src={league}
                                        alt=""
                                        effect='blur'
                                        style={{height: "26px", marginTop: "0px", width:"45px", filter:"invert(1)"}}
                                    />
                                    <span className=" hot-alert-badge">HOT</span>

                                </div>
                                <p style={{textAlign: "center", marginBottom: "unset"}}>
                                    League
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

