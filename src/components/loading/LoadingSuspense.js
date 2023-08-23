// import logo from "../../assets/img/Logo.webp";
import React from "react";
import "./Loading.css"; // Create a CSS file for Loading styles

function Loading(props) {
    return (
        <div className="loading-container">
            {/* <div className="logo-container">
                <img src={logo} alt="Betnare" title="Betnare" />
            </div> */}
            <div className="progress-bar-container">
                <div className="progress-bar suspense"></div>
            </div>
        </div>
    );
}

export default Loading;
