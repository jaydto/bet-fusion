import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarHeader} from "react-pro-sidebar";
import React, {useContext, useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import 'react-pro-sidebar/dist/css/styles.css';
import {
    faQuestionCircle,
    faPrint,
    faMagic,
    faMobile,
    faHandsHelping, faAddressBook, faHandPointRight, faHeartbeat
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import {Context} from "../../context/store";
import {LazyLoadImage} from "react-lazy-load-image-component";

const SidebarProfile = (props) => {
    const {profile_side} = props
    const [state, dispatch] = useContext(Context);

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
                <Link  to="/" className={'bold px-1'}><LazyLoadImage src={'https://storage.googleapis.com/nareimages/logo-white.webp'} style={{width:"120px"}}/> </Link>

            </div>
            <Menu>
                <MenuItem>
                    <Link to={"/terms-and-conditions"} className={"d-flex gap-4 align-items-center px-3"}>
                        <FontAwesomeIcon icon={faHandPointRight}/>
                        <div className={'text-profile'} >Terms and conditions</div>
                    </Link>

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
                    <Link  className={"d-flex gap-4 align-items-center px-3"} to={"/my-bets"}>
                        <FontAwesomeIcon icon={faQuestionCircle}/>
                        <div className={'text-profile'} >My Bets</div>
                    </Link>
                </MenuItem>
            </Menu>
            <Menu>
                <MenuItem className={"d-flex justify-content-between"}>
                    <Link className={"d-flex gap-4 align-items-center px-3"}
                          to={"/deposit"}
                         onClick={() => gaEventTracker('Visit Deposit Page')}>
                        <FontAwesomeIcon icon={faMobile}/>
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
                        <FontAwesomeIcon icon={faAddressBook}/>
                        <div className={'text-profile'} >Points</div>
                    </Link>

                </MenuItem>
            </Menu>
            <Menu>
                <MenuItem>
                    <div className={"d-flex gap-4 align-items-center px-3"}>
                        <FontAwesomeIcon icon={faMobile}/>
                        <Link to={"/app"} className={'text-profile'} onClick={() => {
                            gaEventTracker('Visit App Page');
                        }}>App
                        </Link>
                    </div>
                </MenuItem>
            </Menu>
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
        </SidebarHeader>

    </ProSidebar>)
}

export default React.memo(SidebarProfile);