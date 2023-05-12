import React, {useState, useEffect, useContext, useCallback} from 'react'

import 'react-toastify/dist/ReactToastify.css';
import './settings.css'
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import {Link} from "react-router-dom";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear, faMoon, faSun, faWrench} from "@fortawesome/free-solid-svg-icons";




const LoginSection= (props) => {
    const gaEventTracker = useAnalyticsEventTracker('Navigation');
    const [isLoading, setIsLoading] = useState(null);
    const [themeLight, setThemeLight]=useState(false)

    const changeTheme=()=>{
        // Query for the toggle that is used to change between themes
        const toggle = document.querySelector('#theme');

// Listen for the toggle check/click to toggle the light class on the <body>
        toggle.addEventListener('themeChange', (ev) => {
            document.body.classList.toggle('light', ev.detail.checked);
        });

        const prefersLight = window.matchMedia('(prefers-color-scheme: light)');

// Listen for changes to the prefers-color-scheme media query
        prefersLight.addListener((e) => checkToggle(e.matches));

// Called when the app loads
        function loadApp() {
            checkToggle(prefersLight.matches);
        }

// Called by the media query to check/uncheck the toggle
        function checkToggle(shouldCheck) {
            toggle.checked = shouldCheck;
        }

    }

    const handleThemeChange=()=>{
        setThemeLight(!themeLight)

    }

    useEffect(()=>{
        console.log("themeChange", themeLight)
        changeTheme(themeLight)
    },[themeLight])

    return (
        <div className={`d-flex flex-column mx-1 right`}>
            <div className={`d-none`} style={{float: "right"}}>
                <div className="col-12">
                    {/*<Link className="" to={"/signup"} title="Join now" onClick={() => gaEventTracker('Register')}>*/}
                    {/*    <span className="register-label">Register now!</span>*/}
                    {/*</Link>*/}
                    <Link className="m-lg-2 badge bg-success d-none" to={"/verify-account"} title="Verify Account"
                          onClick={() => gaEventTracker('Verify')}>
                        <span className="register-label">VERIFY ACCOUNT</span>
                    </Link>
                </div>
            </div>
            <div style={{float: "right"}} className={` d-flex justify-content-center align-items-center flex-column w-100 container-fluid login-top`}>
                <div className={`w-100`}>
                    <Link to={'/login'} className={`cg text-light border-0`} type="submit">
                        <span style={{color:'aqua'}}>LOGIN</span>
                    </Link>
                    <Link className="cg register-button btn btn-warning" to={"/signup"} title="Join now" onClick={() => gaEventTracker('Register')} >
                        <span className="register-label bold">REGISTER </span>
                    </Link>

                    {/*<div className="cg " onClick={()=>handleThemeChange()}>*/}
                    {/*    <input type="hidden" name="alarm" value="False" className={'themeChange'}/>*/}
                    {/*    <input className="custom-checkbox-input" name="theme" value={themeLight} type="checkbox"/>*/}
                    {/*    {!themeLight?<FontAwesomeIcon icon={faMoon} style={{fontSize:'20px'}} className={'text-light'}/>:<FontAwesomeIcon icon={faSun} className={'text-warning'} style={{fontSize:'20px'}}/>}*/}
                    {/*</div>*/}
                </div>

            </div>

        </div>
    )
}
export default React.memo(LoginSection);

