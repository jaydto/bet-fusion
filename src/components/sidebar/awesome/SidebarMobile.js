import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader} from "react-pro-sidebar";
import {getFromLocalStorage,} from "../../utils/local-storage";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import whatsapp from "../../../assets/img/mobile/whatsapp.svg"
import fpl from "../../../assets/img/mobile/fpl.png"
import Footer from "../../footer/footer";
import 'react-pro-sidebar/dist/css/styles.css';
import {
    faCloudDownloadAlt,
    faHome,
    faInfo,
    faMobilePhone,
    faMagic,
    faPlay,
    faPrint,
    faQuestionCircle,
    faStream,
    faUser,
    faMobileAndroid,
    faHeartBroken
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useDispatch, useSelector} from "react-redux";
import {setState} from "../../../redux/dataSlice";

const SidebarMobile = React.memo(
    (props) => {
        // const [competitions, setCompetitions] = useState(getFromLocalStorage('sport_categories'));
        const userData=useSelector((state)=>state.auth.user)
        const [user, setUser]=useState(getFromLocalStorage("user"))

        useEffect(()=>{
            if(userData){
                setUser(userData||getFromLocalStorage("user"))
            }
        }, [userData])
        const dispatchRedux=useDispatch()


        // const gaEventTracker = useAnalyticsEventTracker('Navigation');
        const handleClose = () => {
            dispatchRedux(setState('show_menu', false))
        };

        return (<ProSidebar
            className={'background-primary'}
            style={{width: "100%"}}
            image={false}>
            <SidebarHeader className={"background-primary"}>
                {user ? <Menu>
                    <MenuItem>
                        <div className={"d-flex gap-4 align-items-center"}>
                            <FontAwesomeIcon icon={faUser} className={'svg-mobile'} />
                            <Link to={"/profile"} onClick={handleClose}>User Profile</Link>
                        </div>

                    </MenuItem>
                </Menu> : ""}

                {user ? <Menu>
                    <MenuItem>
                        <div className={"d-flex gap-4 align-items-center"}>
                            <FontAwesomeIcon icon={faCloudDownloadAlt} className={'svg-mobile'} />
                            <Link to={"/deposit"} className={""} onClick={handleClose}>Deposit</Link>
                        </div>

                    </MenuItem>
                </Menu> : ""}


                <Menu>
                    <MenuItem className={"d-flex justify-content-between"}>
                        <div className={"d-flex gap-4 align-items-center"}>
                            <FontAwesomeIcon icon={faQuestionCircle} className={'svg-mobile'} />
                            <Link to={"/how-to-play"} onClick={handleClose}>How to play</Link>
                        </div>
                    </MenuItem>
                </Menu>
               
                
                <Menu>
                    <MenuItem className={"d-flex justify-content-between"}>
                        <div className={"d-flex gap-4 align-items-center"}>
                            <FontAwesomeIcon icon={faMobilePhone} className={'svg-mobile'} />
                            <a href={"tel:0701087777"} onClick={handleClose}>Call Customer Care</a>
                        </div>
                    </MenuItem>
                </Menu>
                <Menu>
                    <MenuItem className={"d-flex justify-content-between"}>
                        <div className={"d-flex gap-4 align-items-center"}>
                            <FontAwesomeIcon icon={faHeartBroken} className={'svg-mobile'} />
                            <Link to={"/responsible-gambling"} onClick={handleClose}>Self Exclusion</Link>
                        </div>
                    </MenuItem>
                </Menu>
                <Menu>
                    <MenuItem className={"d-flex justify-content-between"}>
                        <div className={"d-flex gap-4 align-items-center"}>
                            <FontAwesomeIcon icon={faMobileAndroid} className={'svg-mobile'} />
                            <a href={"https://cdn.CrashKali.com/CrashKaliapp.apk"} onClick={handleClose}>Download App </a>
                        </div>
                    </MenuItem>
                </Menu>
                <Menu>
                    <MenuItem className={"d-flex justify-content-between"}>
                        <a className={"d-flex gap-4 align-items-center"} href={"https://wa.me/+254701234567"} target={"_blank"} rel="noreferrer" onClick={handleClose}>
                            <LazyLoadImage src={whatsapp} effect={"blur"} style={{width:'15px'}} className={'svg-mobile'} />
                            Whatsapp Us
                        </a>
                    </MenuItem>
                </Menu>
            </SidebarHeader>
            <SidebarContent className={"background-primary"}>

                <Menu>
                    <MenuItem className={"d-flex justify-content-between"}>
                        <div className={"d-flex gap-4 align-items-center"}>
                            <FontAwesomeIcon icon={faHome} className={'svg-mobile'} />
                            <Link to={"/"} onClick={handleClose}>Home</Link>
                        </div>
                    </MenuItem>

                </Menu>


            </SidebarContent>
            <SidebarFooter className={"background-primary"}>
            <Footer sidebar={true}/>
                       
            </SidebarFooter>
        </ProSidebar>)
    })

export default React.memo(SidebarMobile);
