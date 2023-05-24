import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader, SubMenu} from "react-pro-sidebar";
import {getFromLocalStorage, setLocalStorage} from "../utils/local-storage";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import Footer from "../footer/footer";
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
    faMobile,
    faCloudDownloadAlt
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";

const SidebarProfile = (props) => {
    const {profile_side}=props
    const gaEventTracker = useAnalyticsEventTracker('Navigation');
    return (<ProSidebar
        className={` ${profile_side&&' profile-width-side'}`}
        style={{width: "100%"}}
        image={false}>
        <SidebarHeader className={""}>
            <h2 className={'bold px-1'}>Profile</h2>
             <Menu>
                <MenuItem>
                    <div className={"d-flex gap-4 align-items-center px-3"}>
                        <FontAwesomeIcon icon={faUser}/>
                        <a className={'text-profile'} href={'/profile#cash'}>Cash</a>
                    </div>

                </MenuItem>
            </Menu>

             <Menu>
                <MenuItem>
                    <div className={"d-flex gap-4 align-items-center px-3"}>
                        <FontAwesomeIcon icon={faCloudDownloadAlt}/>
                        <a  className={'text-profile'} href={'/profile#gift'} >Gift</a>
                    </div>

                </MenuItem>
            </Menu>
            <Menu>
                <MenuItem className={"d-flex justify-content-between"}>
                    <div className={"d-flex gap-4 align-items-center px-3"}>
                        <FontAwesomeIcon icon={faQuestionCircle}/>
                        <a className={'text-profile'} href={'/profile#mybets'} >Mybets</a>
                    </div>
                </MenuItem>
            </Menu>
            <Menu>
                <MenuItem className={"d-flex justify-content-between"}>
                    <div className={"d-flex gap-4 align-items-center px-3"} onClick={() => gaEventTracker('Visit App Page')}>
                        <FontAwesomeIcon icon={faMobile}/>
                        <a className={'text-profile'} href="/profile#deposit">Deposit</a>
                    </div>
                </MenuItem>
            </Menu>


            <Menu>
                <MenuItem className={"d-flex justify-content-between"}>
                    <div className={"d-flex gap-4 align-items-center px-3"}>
                        <FontAwesomeIcon icon={faPrint}/>
                        <a className={'text-profile'} href="/profile#withdraw">Withdraw</a>
                    </div>
                </MenuItem>
            </Menu>
            <Menu>
                <MenuItem className={"d-flex justify-content-between"}>
                    <div className={"d-flex gap-4 align-items-center px-3"}>
                        <FontAwesomeIcon icon={faPrint}/>
                        <a className={'text-profile'} href={'/profile#support'} >Support</a>
                    </div>
                </MenuItem>
            </Menu>
        </SidebarHeader>
        <SidebarContent className={""}>

            <Menu>
                <MenuItem>
                    <div className={"d-flex gap-4 align-items-center px-3"}>
                        <FontAwesomeIcon icon={faHome}/>
                        <Link to={"/"} className={'text-profile'}>Home</Link>
                    </div>
                </MenuItem>

            </Menu>
            <Menu>

                <MenuItem>
                    <div className={"d-flex gap-4 align-items-center px-3"}>
                        <FontAwesomeIcon icon={faMobile}/>
                        <Link className={'text-profile'} to={"/app"} title="App"
                              onClick={() => gaEventTracker('Visit App Page')}>
                            App
                        </Link>

                    </div>
                </MenuItem>
            </Menu>

            <Menu>

                <MenuItem>
                    <div className={"d-flex gap-4 align-items-center text-profile px-3"}>
                        <FontAwesomeIcon icon={faStream}/>
                        <Link to={"/live"}>Live</Link>
                    </div>
                </MenuItem>
            </Menu>

            <Menu>

                <MenuItem>
                    <div className={"d-flex gap-4 align-items-center text-profile px-3"}>
                        <FontAwesomeIcon icon={faLaptop}/>
                        <Link to={"/virtuals"}>Virtuals</Link>
                    </div>
                </MenuItem>
            </Menu>
            <Menu>

                <MenuItem>
                    <div className={"d-flex gap-4 align-items-center text-profile px-3"}>
                        <FontAwesomeIcon icon={faMagic}/>
                        <Link to={"/promotions"}>Promotions</Link>
                    </div>
                </MenuItem>
            </Menu>
            <Menu>

                <MenuItem>
                    <div className={"d-flex gap-4 align-items-center text-profile px-3"}>
                        <FontAwesomeIcon icon={faInfo}/>
                        <Link to={"/livescore"}>Livescore</Link>
                    </div>
                </MenuItem>
            </Menu>


        </SidebarContent>
    </ProSidebar>)
}

export default React.memo(SidebarProfile);