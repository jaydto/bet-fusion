import logo from "../../assets/img/Logo-fire.webp";
import React from "react";
import "./Loading.css"; // Create a CSS file for Loading styles

function Loading(props) {
    return (
        <div className="loading-container">
            <div className="logo-container d-flex flex-column align-items-center">
                <img src={logo} alt="Betnare" title="Betnare"/>
                <span className={'bold'} style={{fontSize: "3.5rem"}}>
                     <span style={{color: "var(--hot)"}}><strong>Bet</strong></span> <span
                    className={'text-light'}>Nare</span>
                 </span>
            </div>
        </div>
    );
}

export default Loading;
