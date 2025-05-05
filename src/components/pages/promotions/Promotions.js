import React from "react";
import './promo.css'
import {  useNavigate } from "react-router-dom";
import PromoCards from "./PromoCards";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import {ToastContainer} from "react-toastify";

const Header = React.lazy(() => import('../../header/header'));
const Promotions = () => {
    const navigate=useNavigate()
    return (
        <>
            <Header/>
            <ToastContainer/>
            <div >
                <div className="d-flex flex-row">
                    <div className="home promotions-app-top" >
                        <div className="homepage">
                            <h1>Promotions</h1>
                            <div className="col-md-12 d-flex flex-column">
                                <div className="col-md-12 d-flex align-items-center my-3">
                                    <span className={'px-5 col-2'} onClick={() => navigate(-1)}>
                                             <FontAwesomeIcon icon={faAngleLeft} style={{
                                                 fontSize: "24px",
                                                 color: 'var(--light)',
                                                 fontWeight: '700',
                                                 opacity: '0.7'
                                             }}/>
                                            </span>
                                    <div
                                        className=" shadow-sm d-flex justify-content-center col-8 p-2 shadow-sm promotion-header text-white">
                                         PROMOTIONS
                                    </div>
                                </div>
                                <PromoCards/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>

    )
}

export default Promotions