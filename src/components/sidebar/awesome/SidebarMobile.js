import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader, SubMenu} from "react-pro-sidebar";
import {getFromLocalStorage, setLocalStorage} from "../../utils/local-storage";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import Footer from "../../footer/footer";
import 'react-pro-sidebar/dist/css/styles.css';
import {
    faUser,
    faQuestionCircle,
    faPrint,
    faHome,
    faStream,
    faInfo,
    faLaptop,
    faMagic,
    faCoins,
    faMobile,
    faCloud,
    faCloudDownloadAlt
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";

const SidebarMobile = (props) => {
    // const [competitions, setCompetitions] = useState(getFromLocalStorage('categories'));
    const [user, setUser] = useState(getFromLocalStorage("user"));
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
                        <div className={"d-flex gap-4 align-items-center"} onClick={() => gaEventTracker('Visit App Page')}>
                            <FontAwesomeIcon icon={faMobile}/>
                            <Link className="" to="/app" title="App">
                                App
                        </Link>
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
            </SidebarHeader>
            <SidebarContent className={"background-primary"}>

                <Menu>
                    <MenuItem>
                        <div className={"d-flex gap-4 align-items-center"}>
                            <FontAwesomeIcon icon={faHome}/>
                            <Link to={"/"}>Home</Link>
                        </div>
                    </MenuItem>

                </Menu>
                <Menu>

                    <MenuItem>
                        <div className={"d-flex gap-4 align-items-center"}>
                            <FontAwesomeIcon icon={faMobile}/>
                            <Link className="" to={"/app"} title="App"
                                  onClick={() => gaEventTracker('Visit App Page')}>
                                App
                            </Link>

                        </div>
                    </MenuItem>
                </Menu>

                <Menu>

                    <MenuItem>
                        <div className={"d-flex gap-4 align-items-center"}>
                            <FontAwesomeIcon icon={faStream}/>
                            <Link to={"/live"}>Live</Link>
                        </div>
                    </MenuItem>
                </Menu>

                <Menu>

                    <MenuItem>
                        <div className={"d-flex gap-4 align-items-center"}>
                            <FontAwesomeIcon icon={faLaptop}/>
                            <Link to={"/virtuals"}>Virtuals</Link>
                        </div>
                    </MenuItem>
                </Menu>
                <Menu>

                    <MenuItem>
                        <div className={"d-flex gap-4 align-items-center"}>
                            <FontAwesomeIcon icon={faMagic}/>
                            <Link to={"/promotions"}>Promotions</Link>
                        </div>
                    </MenuItem>
                </Menu>
                <Menu>

                    <MenuItem>
                        <div className={"d-flex gap-4 align-items-center"}>
                            <FontAwesomeIcon icon={faInfo}/>
                            <Link to={"/livescore"}>Livescore</Link>
                        </div>
                    </MenuItem>
                </Menu>


            </SidebarContent>
            <SidebarFooter className={"background-primary"}>
                {user ? <Menu className={"w-100 "}>
                    <MenuItem className={"w-100 sidebar-mobile"}> <Link className={"logout-btn"} to={"/logout"}>Logout</Link> </MenuItem>
                </Menu> : ""}
                <Footer/>
            </SidebarFooter>
        </ProSidebar>)
}

export default SidebarMobile