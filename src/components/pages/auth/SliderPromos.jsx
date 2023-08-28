import React, {useContext, useEffect, useState} from 'react';
import "./slider.css"
import {StoreContext } from "../../../context/store"
import {useSelector} from "react-redux";

const Slider = React.memo(
    (props) => {
        const { state } = useContext(StoreContext);
        const appConfig=useSelector((state)=>state.data.app_config)
        const promosData = appConfig?.message?.accountConfiguration?.registrationPromos

        const [slideIndex, setSlideIndex] = useState(0);

        useEffect(() => {
            const interval = setInterval(() => {
                setSlideIndex((prevIndex) => (prevIndex + 1) % promosData?.length);
            }, 4000);

            return () => {
                clearInterval(interval);
            };
        }, [promosData?.length]);

        const progress=(((state?.steps||1)*100)/3)
        const progressNow=3-(state?.steps||1)

        const UserResponse=()=>{
            let response;
            if( progressNow!==0){
                if(progressNow == 1 ){
                    response =  "Awesome! You're  a step closer to unlocking your "+promosData
                }else if(progressNow == 2){
                   response= " You're " +progressNow +" steps away "+" from unlocking your " +promosData
                }

            }else{
                response=`Congratulations! Now Click complete and get Ksh ${promosData}`
                }
            return response
        }

        const showSlides = () => {
            return promosData?.map((promo, index) => (
                <a
                    key={index}
                    href="#"
                    className={`hcg-slides animated${index === slideIndex ? ' active' : ''}`}
                    style={{display: index === slideIndex ? 'flex' : 'none'}}
                >
				<span className="hcg-slide-text animated">
                    <div className="progress" style={{height: "1px"}}>
                      <div className={`progress-bar ${progressNow==0?"promo-value-color":"bg-warning"}`} role="progressbar" style={{width:`${progress}%`}} aria-valuenow={progress} aria-valuemin="0"
                           aria-valuemax="100">

                      </div>
                    </div>
                    <div className="progress" style={{height: "20px"}}>
                      <div  className={`progress-bar progress-indicator ${progressNow==0?"promo-value-color":"bg-warning"}`}  style={{width:`${progress}%`}} role="progressbar"  aria-valuenow={progress} aria-valuemin="0"
                           aria-valuemax="100">
                          <span className={"progress-color"} style={{width:"100%"}}>
                              <span className={`w-100 d-flex promo-progress ${progressNow==0&&" promo-progress-full px-2"}`} >
                                   <span className="progress-text"
                                         style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)"}}>
                                  {<UserResponse/>}</span>
                              </span>
                          </span>

                      </div>

                </div>
				</span>
                </a>
            ));
        };

        const handleDotClick = (index) => {
            setSlideIndex(index);
        };

        // const renderDots = () => {
        //     return promosData?.map((_, index) => (
        //         <a
        //             key={index}
        //             href="#"
        //             className={`hcg-slide-dot${index === slideIndex ? ' dot-active' : ''}`}
        //             onClick={() => handleDotClick(index)}
        //         />
        //     ));
        // };

        return (
            <div id="hcg-slider-1" className="hcg-slider">
                <div className="hcg-slide-container">
                    <div className="hcg-slider-body">{showSlides()}</div>
                </div>
                {/*<div className="hcg-slide-dot-control">{renderDots()}</div>*/}
            </div>
        );
    });

export default Slider;
