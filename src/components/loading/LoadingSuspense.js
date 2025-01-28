import React from "react";
import "./Loading.css"; // Create a CSS file for Loading styles

function Loading(props) {
    return (
        <div className="loading-container">
            <div className="logo-container d-flex flex-column align-items-center">
                <span className={'bold'} style={{fontSize: "3.5rem", fontWeight:"800"}}>
                     <span style={{color: "var(--purple)"}}>BET</span><span
                    style={{color: "var(--crimson)"}}>tena</span>
                 </span>
            </div>
        </div>
    );
}

export default Loading;
