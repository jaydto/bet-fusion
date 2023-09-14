import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader} from "react-pro-sidebar";
import {getFromLocalStorage,} from "../../utils/local-storage";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import whatsapp from "../../../assets/img/mobile/whatsapp.svg"
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
    faUser
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useSelector} from "react-redux";

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
        const gaEventTracker = useAnalyticsEventTracker('Navigation');
        return (<ProSidebar
            className={'background-primary'}
            style={{width: "100%"}}
            image={false}>
            <SidebarHeader className={"background-primary"}>

                {user ? <Menu>
                    <MenuItem>
                        <div className={"d-flex gap-4 align-items-center"}>
                            <FontAwesomeIcon icon={faUser}/>
                            <Link to={"/profile"}>User Profile</Link>
                        </div>

                    </MenuItem>
                </Menu> : ""}

                {user ? <Menu>
                    <MenuItem>
                        <div className={"d-flex gap-4 align-items-center"}>
                            <FontAwesomeIcon icon={faCloudDownloadAlt}/>
                            <Link to={"/deposit"} className={""}>Deposit</Link>
                        </div>

                    </MenuItem>
                </Menu> : ""}


                <Menu>
                    <MenuItem className={"d-flex justify-content-between"}>
                        <div className={"d-flex gap-4 align-items-center"}>
                            <FontAwesomeIcon icon={faQuestionCircle}/>
                            <Link to={"/how-to-play"}>How to play</Link>
                        </div>
                    </MenuItem>
                </Menu>
                <Menu>
                    <MenuItem className={"d-flex justify-content-between"}>
                        <div className={"d-flex gap-4 align-items-center"}>
                            <FontAwesomeIcon icon={faPrint}/>
                            <Link to={"/print-matches"}>Print</Link>
                        </div>
                    </MenuItem>
                </Menu>
                <Menu>
                    <MenuItem className={"d-flex justify-content-between"}>
                        <div className={"d-flex gap-4 align-items-center"}>
                            <FontAwesomeIcon icon={faMobilePhone}/>
                            <a href={"tel:0701087777"}>Call Customer Care</a>
                        </div>
                    </MenuItem>
                </Menu>
                <Menu>
                    <MenuItem className={"d-flex justify-content-between"}>
                        <a className={"d-flex gap-4 align-items-center"} href={"https://wa.me/+254701087777"} target={"_blank"} rel="noreferrer">
                            <LazyLoadImage src={whatsapp} effect={"blur"} style={{width:'15px'}}/>
                            Whatsapp Us
                        </a>
                    </MenuItem>
                </Menu>
            </SidebarHeader>
            <SidebarContent className={"background-primary"}>

                <Menu>
                    <MenuItem className={"d-flex justify-content-between"}>
                        <div className={"d-flex gap-4 align-items-center"}>
                            <FontAwesomeIcon icon={faHome}/>
                            <Link to={"/"}>Home</Link>
                        </div>
                    </MenuItem>

                </Menu>

                <Menu>

                    <MenuItem className={"d-flex justify-content-between"}>
                        <div className={"d-flex gap-4 align-items-center"}>
                            <FontAwesomeIcon icon={faStream}/>
                            <Link to={"/live"}>Live</Link>
                        </div>
                    </MenuItem>
                </Menu>
                <Menu>

                    <MenuItem className={"d-flex justify-content-between"}>
                        <div className={"d-flex gap-4 align-items-center"}>
                            <FontAwesomeIcon icon={faPlay}/>
                            <Link to={"/virtuals"}>Virtuals</Link>
                        </div>
                    </MenuItem>
                </Menu>

                <Menu>

                    <MenuItem className={"d-flex justify-content-between"}>
                        <div className={"d-flex gap-4 align-items-center"}>
                            <FontAwesomeIcon icon={faMagic}/>
                            <Link to={"/promotions"}>Promotions</Link>
                        </div>
                    </MenuItem>
                </Menu>
                <Menu>

                    <MenuItem className={"d-flex justify-content-between"}>
                        <div className={"d-flex gap-4 align-items-center"}>
                            <FontAwesomeIcon icon={faInfo}/>
                            <Link to={"/livescore"}>Livescore</Link>
                        </div>
                    </MenuItem>
                </Menu>


            </SidebarContent>
            <SidebarFooter className={"background-primary"}>
                {user ? <Menu className={"w-100 "}>
                    <MenuItem className={"w-100 sidebar-mobile"}> <a className={"logout-btn mt-2"} href={"/logout"}>Logout</a> </MenuItem>
                </Menu> : ""}
                <Footer/>
            </SidebarFooter>
        </ProSidebar>)
    })

export default React.memo(SidebarMobile);