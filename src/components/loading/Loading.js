
import logo from "../../assets/img/Logo.webp";
import {ProgressBar} from "loading-animations-react";
import React from "react";


function Loading(props) {
    return (
            <div className={"d-flex align-items-center flex-column justify-content-center"} style={{height:"70vh"}}>
                <div className={"d-flex justify-content-start flex-column"}>
                    <img src={logo} alt="Betnare" title="Betnare" effects="blur" style={{height:"53px"}}/>
                    <span className={"text-light "}>
                    <ProgressBar
                        borderColor=""
                        sliderColor="#242e3a"
                        sliderBackground="rgb(0,0,0)"
                    />
                </span>


                </div>


            </div>

    );
}

export default React.memo(Loading);