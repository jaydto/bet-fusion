import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarHeader} from "react-pro-sidebar";
import React, {useContext, useRef} from "react";
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
    faCloudDownloadAlt
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import {Context} from "../../context/store";

const SidebarProfile = (props) => {
    const {profile_side}=props
    const [state, dispatch] = useContext(Context);

    const prevChoice=useRef('')
    const showCentricPage=(userChoice)=>{
        if(prevChoice.current==''){
            dispatch({ type: "SET", key: `profile_${userChoice}`, payload: `profile_${userChoice}` });
            prevChoice.current=state?.[`profile_${userChoice}`]
        }else{
            dispatch({ type: "SET", key: prevChoice.current, payload: null });
            dispatch({ type: "SET", key: `profile_${userChoice}`, payload: `profile_${userChoice}` });
            prevChoice.current=state?.[`profile_${userChoice}`]
        }


    }
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
                        <div className={'text-profile'} onClick={()=>showCentricPage('cash')}>Cash</div>
                    </div>

                </MenuItem>
            </Menu>

             <Menu>
                <MenuItem>
                    <div className={"d-flex gap-4 align-items-center px-3"}>
                        <FontAwesomeIcon icon={faCloudDownloadAlt}/>
                        <div  className={'text-profile'} onClick={()=>showCentricPage('gift')} >Gift</div>
                    </div>

                </MenuItem>
            </Menu>
            <Menu>
                <MenuItem className={"d-flex justify-content-between"}>
                    <div className={"d-flex gap-4 align-items-center px-3"}>
                        <FontAwesomeIcon icon={faQuestionCircle}/>
                        <div className={'text-profile'} onClick={()=>showCentricPage('mybets')} >Mybets</div>
                    </div>
                </MenuItem>
            </Menu>
            <Menu>
                <MenuItem className={"d-flex justify-content-between"}>
                    <div className={"d-flex gap-4 align-items-center px-3"} onClick={() => gaEventTracker('Visit App Page')}>
                        <FontAwesomeIcon icon={faMobile}/>
                        <div className={'text-profile'} onClick={()=>showCentricPage('deposit')}>Deposit</div>
                    </div>
                </MenuItem>
            </Menu>


            <Menu>
                <MenuItem className={"d-flex justify-content-between"}>
                    <div className={"d-flex gap-4 align-items-center px-3"}>
                        <FontAwesomeIcon icon={faPrint}/>
                        <div className={'text-profile'} onClick={()=>showCentricPage('withdraw')}>Withdraw</div>
                    </div>
                </MenuItem>
            </Menu>
            <Menu>
                <MenuItem className={"d-flex justify-content-between"}>
                    <div className={"d-flex gap-4 align-items-center px-3"}>
                        <FontAwesomeIcon icon={faPrint}/>
                        <div className={'text-profile'} onClick={()=>showCentricPage('support')} >Support</div>
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
                        <Link to={"/live"} className={'text-profile'}>Live</Link>
                    </div>
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


        </SidebarContent>
    </ProSidebar>)
}

export default React.memo(SidebarProfile);