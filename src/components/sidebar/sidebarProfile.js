import {Menu, MenuItem, ProSidebar, SidebarFooter, SidebarHeader} from "react-pro-sidebar";
import React, {useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import 'react-pro-sidebar/dist/css/styles.css';
import {
    faAddressBook,
    faHandPointRight,
    faHandsHelping,
    faHeartbeat,
    faMagic,
    faMobile,
    faPrint,
    faQuestionCircle,
    faPhoneFlip
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import {StoreContext } from "../../context/store";
import {faWhatsapp} from "@fortawesome/free-brands-svg-icons";
import {LazyLoadImage} from "react-lazy-load-image-component";

const SidebarProfile = React.memo(
    (props) => {
        const {profile_side} = props
        const { state, dispatch } = useContext(StoreContext);

        useEffect(() => {
            const abort = new AbortController();
            dispatch({ type: "SET", key: `profile_all`, payload: `profile_all` });

            return () => {
                abort.abort(); // Cleanup function to abort the controller when the component unmounts.
            };
        }, []);


        const gaEventTracker = useAnalyticsEventTracker('Navigation');
        return (<ProSidebar
            className={` ${profile_side && ' profile-width-side'}`}
            style={{width: "100%",marginTop:'6rem'}}
            image={false}>
            <SidebarHeader className={""}>
                <Menu>
                    <MenuItem>
                        <Link to={"/terms-and-conditions"} className={"d-flex gap-4 align-items-center px-3"}>
                            <FontAwesomeIcon icon={faHandPointRight} style={{fontSize:'24px'}}/>
                            <div className={'text-profile'} >Terms and conditions</div>
                        </Link>

                    </MenuItem>
                </Menu>

                
                
                <Menu>
                    <MenuItem className={"d-flex justify-content-between"}>
                        <Link className={"d-flex gap-4 align-items-center px-3"}
                              to={"/deposit"}
                              onClick={() => gaEventTracker('Visit Deposit Page')}>
                            <FontAwesomeIcon icon={faMobile} style={{fontSize:'24px'}}/>
                            <div className={'text-profile'} >Deposit</div>
                        </Link>
                    </MenuItem>
                </Menu>
                <Menu>
                    <MenuItem className={"d-flex justify-content-between"}>
                        <Link className={"d-flex gap-4 align-items-center px-3"} to={"/withdraw"}>
                            <FontAwesomeIcon icon={faPrint}/>
                            <div className={'text-profile'} >Withdraw</div>
                        </Link>
                    </MenuItem>
                </Menu>
                
                <Menu>
                    <MenuItem>
                        <div className={"d-flex gap-4 align-items-center px-3"}>
                            <FontAwesomeIcon icon={faMobile} style={{fontSize:'24px'}}/>
                            <a href={"/https://cdn.BetTena.com/BetTenaapp.apk"} className={'text-profile'} onClick={() => {
                                gaEventTracker('Visit App Page');
                            }}>App
                            </a>
                        </div>
                    </MenuItem>
                </Menu>
                
                {/*<Menu>*/}
                {/*    <MenuItem className={"d-flex justify-content-between"}>*/}
                {/*        <Link className={"d-flex gap-4 align-items-center px-3"} to={'/affiliate'}>*/}
                {/*            <FontAwesomeIcon icon={faHeartbeat}/>*/}
                {/*            <div className={'text-profile'}>Affiliate</div>*/}
                {/*        </Link>*/}
                {/*    </MenuItem>*/}
                {/*</Menu>*/}
                
                <Menu>
                    <MenuItem>
                        <div className={"d-flex gap-4 align-items-center px-3"}>
                            <FontAwesomeIcon icon={faHandsHelping} style={{fontSize:'24px'}}/>
                            <Link to={"/how-to-play"} className={'text-profile'}>How to Play</Link>
                        </div>
                    </MenuItem>

                </Menu>
            </SidebarHeader>
            <SidebarFooter>
                <Menu>
                    <MenuItem>
                        <div className={"d-flex gap-4 align-items-center px-3"}>
                            <FontAwesomeIcon icon={faWhatsapp} style={{fontSize:'24px'}}/>
                            <a href={"https://wa.me/+254791888222"} target={"_blank"} className={'text-profile'}>Whatsapp Us</a>
                        </div>
                    </MenuItem>
                </Menu>
                <Menu>
                    <MenuItem>
                        <div className={"d-flex gap-4 align-items-center px-3"}>
                            <FontAwesomeIcon icon={faPhoneFlip} style={{fontSize:'24px'}}/>
                            <a href={'javascript:void(0)'} className={'text-profile'}>0791888222</a>
                        </div>
                    </MenuItem>
                </Menu>
            </SidebarFooter>

        </ProSidebar>)
    })

export default React.memo(SidebarProfile);
