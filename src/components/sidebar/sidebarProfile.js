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
                        <Link  className={"d-flex gap-4 align-items-center px-3"} to={"/my-bets"}>
                            <FontAwesomeIcon icon={faQuestionCircle} style={{fontSize:'24px'}}/>
                            <div className={'text-profile'} >My Bets</div>
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
                        <Link className={"d-flex gap-4 align-items-center px-3"} to={"/redeem-points"}>
                            <FontAwesomeIcon icon={faAddressBook} style={{fontSize:'24px'}}/>
                            <div className={'text-profile'} >Points</div>
                        </Link>

                    </MenuItem>
                </Menu>
                <Menu>
                    <MenuItem>
                        <div className={"d-flex gap-4 align-items-center px-3"}>
                            <FontAwesomeIcon icon={faMobile} style={{fontSize:'24px'}}/>
                            <Link to={"/app"} className={'text-profile'} onClick={() => {
                                gaEventTracker('Visit App Page');
                            }}>App
                            </Link>
                        </div>
                    </MenuItem>
                </Menu>
                <Menu>
                    <MenuItem className={"d-flex justify-content-between"}>
                        <Link className={"d-flex gap-4 align-items-center px-3"} to={'/responsible-gambling'}>
                            <FontAwesomeIcon icon={faHeartbeat} style={{fontSize:'24px'}}/>
                            <div className={'text-profile'}>Self Exclusion</div>
                        </Link>
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
                        <div className={"d-flex gap-4 align-items-center text-profile px-3"}>
                            <FontAwesomeIcon icon={faMagic} style={{fontSize:'24px'}}/>
                            <Link to={"/promotions"} className={'text-profile'}>Promotions</Link>
                        </div>
                    </MenuItem>
                </Menu>
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
                            <a href={"https://api.whatsapp.com/send?phone=+254701087777"} target={"_blank"} className={'text-profile'}>Whatsapp Us</a>
                        </div>
                    </MenuItem>
                </Menu>
                <Menu>
                    <MenuItem>
                        <div className={"d-flex gap-4 align-items-center px-3"}>
                            <FontAwesomeIcon icon={faPhoneFlip} style={{fontSize:'24px'}}/>
                            <a href={'javascript:void(0)'} className={'text-profile'}>0701087777</a>
                        </div>
                    </MenuItem>
                </Menu>
            </SidebarFooter>

        </ProSidebar>)
    })

export default React.memo(SidebarProfile);