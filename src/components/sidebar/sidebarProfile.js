import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarHeader} from "react-pro-sidebar";
import React, {useContext, useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import 'react-pro-sidebar/dist/css/styles.css';
import {
    faUser,
    faQuestionCircle,
    faPrint,
    faHome,
    faStream,
    faMagic,
    faMobile,
    faCloudDownloadAlt, faPowerOff, faHandsHelping, faAddressBook, faHandPointRight, faHeartbeat
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import {Context} from "../../context/store";

const SidebarProfile = (props) => {
    const {profile_side} = props
    const [state, dispatch] = useContext(Context);

    const prevChoice = useRef('')
    const showCentricPage = (userChoice) => {

        if (prevChoice.current == '') {

            dispatch({type: "SET", key: `profile_${userChoice}`, payload: `profile_${userChoice}`});
            prevChoice.current = `profile_${userChoice}`
        } else {

            dispatch({type: "SET", key: prevChoice.current, payload: null});
            dispatch({type: "SET", key: `profile_${userChoice}`, payload: `profile_${userChoice}`});
            prevChoice.current = `profile_${userChoice}`
        }

    }
    useEffect(() => {
        const abort = new AbortController()
        dispatch({type: "SET", key: `profile_all`, payload: `profile_all`});
        return abort.abort
    }, [])

    const gaEventTracker = useAnalyticsEventTracker('Navigation');
    return (<ProSidebar
        className={` ${profile_side && ' profile-width-side'}`}
        style={{width: "100%"}}
        image={false}>
        <SidebarHeader className={""}>
            <div className={'d-flex gap-4 align-items-center justify-content-start'}>
                <h2 className={'bold px-1'}>Profile </h2>
                <h5 className={'text-warning'}>+{state?.user?.msisdn}</h5>
            </div>
            <Menu>
                <MenuItem>
                    <div className={"d-flex gap-4 align-items-center px-3"}>
                        <FontAwesomeIcon icon={faHandPointRight}/>
                        <div className={'text-profile'} onClick={() => showCentricPage('all')}>Balance</div>
                    </div>

                </MenuItem>
            </Menu>
            {/*<Menu>*/}
            {/*    <MenuItem>*/}
            {/*        <div className={"d-flex gap-4 align-items-center px-3"}>*/}
            {/*            <FontAwesomeIcon icon={faUser}/>*/}
            {/*            <div className={'text-profile'} onClick={() => showCentricPage('cash')}>Cash</div>*/}
            {/*        </div>*/}

            {/*    </MenuItem>*/}
            {/*</Menu>*/}

            {/*<Menu>*/}
            {/*    <MenuItem>*/}
            {/*        <div className={"d-flex gap-4 align-items-center px-3"}>*/}
            {/*            <FontAwesomeIcon icon={faCloudDownloadAlt}/>*/}
            {/*            <div className={'text-profile'} onClick={() => showCentricPage('gift')}>Gift</div>*/}
            {/*        </div>*/}

            {/*    </MenuItem>*/}
            {/*</Menu>*/}
            <Menu>
                <MenuItem className={"d-flex justify-content-between"}>
                    <div className={"d-flex gap-4 align-items-center px-3"}>
                        <FontAwesomeIcon icon={faQuestionCircle}/>
                        <div className={'text-profile'} onClick={() => showCentricPage('mybets')}>Mybets</div>
                    </div>
                </MenuItem>
            </Menu>
            <Menu>
                <MenuItem className={"d-flex justify-content-between"}>
                    <div className={"d-flex gap-4 align-items-center px-3"}
                         onClick={() => gaEventTracker('Visit App Page')}>
                        <FontAwesomeIcon icon={faMobile}/>
                        <div className={'text-profile'} onClick={() => showCentricPage('deposit')}>Deposit</div>
                    </div>
                </MenuItem>
            </Menu>
            <Menu>
                <MenuItem className={"d-flex justify-content-between"}>
                    <div className={"d-flex gap-4 align-items-center px-3"}>
                        <FontAwesomeIcon icon={faPrint}/>
                        <div className={'text-profile'} onClick={() => showCentricPage('withdraw')}>Withdraw</div>
                    </div>
                </MenuItem>
            </Menu>
            <Menu>
                <MenuItem>
                    <div className={"d-flex gap-4 align-items-center px-3"}>
                        <FontAwesomeIcon icon={faAddressBook}/>
                        <div className={'text-profile'} onClick={() => showCentricPage('points')}>Points</div>
                    </div>

                </MenuItem>
            </Menu>
            <Menu>
                <MenuItem>
                    <div className={"d-flex gap-4 align-items-center px-3"}>
                        <FontAwesomeIcon icon={faMobile}/>
                        <div className={'text-profile'} onClick={() => {
                            gaEventTracker('Visit App Page');
                            showCentricPage('app')
                        }}>App
                        </div>
                    </div>
                </MenuItem>
            </Menu>
        </SidebarHeader>
        <SidebarContent className={""}>
            <Menu>
                <MenuItem className={"d-flex justify-content-between"}>
                    <Link className={"d-flex gap-4 align-items-center px-3"} to={'/affiliate'}>
                        <FontAwesomeIcon icon={faHeartbeat}/>
                        <div className={'text-profile'}>Affiliate</div>
                    </Link>
                </MenuItem>
            </Menu>
            <Menu>
                <MenuItem>
                    <div className={"d-flex gap-4 align-items-center text-profile px-3"}>
                        <FontAwesomeIcon icon={faMagic}/>
                        <Link to={"/promotions"} className={'text-profile'}>Promotions</Link>
                    </div>
                </MenuItem>
            </Menu>
            <Menu>
                <MenuItem>
                    <div className={"d-flex gap-4 align-items-center px-3"}>
                        <FontAwesomeIcon icon={faHandsHelping}/>
                        <Link to={"/how-to-play"} className={'text-profile'}>How to Play</Link>
                    </div>
                </MenuItem>

            </Menu>


        </SidebarContent>
    </ProSidebar>)
}

export default React.memo(SidebarProfile);