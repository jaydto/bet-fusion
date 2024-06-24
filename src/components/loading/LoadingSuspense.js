import React from "react";
import "./Loading.css"; // Create a CSS file for Loading styles

function Loading(props) {
    return (
        <div className="loading-container">
            <div className="logo-container d-flex flex-column align-items-center">
                <span className={'bold'} style={{fontSize: "3.5rem", fontWeight:"800"}}>
                     <span style={{color: "var(--hot)"}}>Crash</span> <span
                    className={'text-light'}>Kali</span>
                 </span>
            </div>
        </div>
    );
}

export default Loading;
