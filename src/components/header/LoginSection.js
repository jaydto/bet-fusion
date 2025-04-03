import React, {useState} from 'react'

import 'react-toastify/dist/ReactToastify.css';
import './settings.css'
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import {Link} from "react-router-dom";

// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faAdjust, faGear, faMoon, faSun, faWrench} from "@fortawesome/free-solid-svg-icons";
//



const LoginSection= React.memo(
    (props) => {
    const gaEventTracker = useAnalyticsEventTracker('Navigation');
    const [isLoading, setIsLoading] = useState(null);
    const [themeLight, setThemeLight]=useState(false)


    const handleThemeChange=()=>{
        setThemeLight(!themeLight)
        document.body.classList.toggle('light-theme');

    }


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
          

        </div>
    )
})
export default React.memo(LoginSection);

