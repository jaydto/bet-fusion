import React, {useContext, useEffect, useState} from "react";
import {faCloudDownloadAlt, faCoins, faUserAlt,} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {formatNumber} from "../utils/betslip";
import {Link} from "react-router-dom";
import {Navbar} from "react-bootstrap";
import {Context} from "../../context/store";

const ProfileMenu = React.memo(
    (props) => {
    const {user} = props;
    const [state,dispatch]=useContext(Context)
    const [themeLight, setThemeLight]=useState(false)
    const handleThemeChange=()=>{
        setThemeLight(!themeLight)
        document.body.classList.toggle('light-theme');

    }
    const [balance,setBalance]=useState(state?.user?.balance||user?.balance)

    const urlPath=window.location.pathname
    const searchParam=window.location.search
    const showBalance=(!urlPath.includes("nare-games")&&!urlPath.includes("gameplay")&&!urlPath.includes("smart-play"))


    useEffect(()=>{
        setBalance(state?.user?.balance||user?.balance)
        dispatch({type: "SET", key: "placebet", payload: false})
    }, [user?.balance, state?.placebet])

    return (
        <>
            {user && (
                <>
                    <div className="row w-100 d-flex align-items-center justify-content-end px-3 ">

                        {showBalance&&<div className="w-auto d-flex  text-white align-items-end" title={'CASH'}>
                            <div className={"profile-wrap"} style={{color: "#FFB200"}}>
                                <FontAwesomeIcon
                                    icon={faCoins}/>
                                <strong style={{color: "#FFB200"}}> KSH {formatNumber(balance) || 0.0}</strong>
                            </div>


                        </div>}

                        <div className="w-auto d-flex text-white align-items-start">
                            <div className={"profile-wrap"}>
                                <Link
                                    to={{pathname: "/deposit"}}
                                    className={"deposit-button"}
                                    title={'DEPOSIT FUNDS'}>
                                      <span className="">
                                       <span className=" "> <FontAwesomeIcon
                                           icon={faCloudDownloadAlt}/></span>
                                          <strong> DEPOSIT FUNDS</strong>
                                      </span>
                                </Link>
                            </div>


                        </div>
                        <div className="w-auto d-flex  text-white align-items-end " title={'PROFILE'} >
                            <Link className={"profile-wrap"} to={'/profile'}>
                              <div className="font-btn text-light" >
                              <div className="space-icons text-light" >
                                  <FontAwesomeIcon icon={faUserAlt}/> </div>

                                  <strong>PROFILE</strong>
                              </div>
                            </Link>

                            <div className="col-1 button-toggle space-button">
                                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"md"}`} className="px-3 py-3"/>
                            </div>
                        </div>
                        {/*<div className="w-auto d-flex  text-white align-items-end"  title={'Theme'}>*/}
                        {/*    <div className="cg " onClick={()=>handleThemeChange()}>*/}
                        {/*        {!themeLight?<FontAwesomeIcon icon={faAdjust} style={{fontSize:'20px'}} className={'text-light'}/>:<FontAwesomeIcon icon={faSun} className={'text-warning'} style={{fontSize:'20px'}}/>}*/}
                        {/*    </div>*/}

                        {/*</div>*/}
                    </div>
                </>

            )}
        </>
    );
});

export default React.memo(ProfileMenu);