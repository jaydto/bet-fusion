import React, { useState } from "react";
import './promo.css'
import { Link, useNavigate } from "react-router-dom";
import PromoCards from "./PromoCards";
import { getFromLocalStorage } from "../../utils/local-storage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import {ToastContainer} from "react-toastify";

const Header = React.lazy(() => import('../../header/header'));
const Promotions = () => {
    const [user] = useState(getFromLocalStorage("user"));
    const navigate=useNavigate()
    return (
        <>
            <Header/>
            <ToastContainer/>
            <div >
                <div className="d-flex flex-row">
                    <div className="gz home promotions-app-top" style={{width: '100%'}}>
                        <div className="homepage">
                            <div className="col-md-12 d-flex flex-column">
                                <div className="col-md-12 d-flex align-items-center my-3">
                                    <span className={'px-3 col-2'} onClick={() => navigate(-1)}>
                                             <FontAwesomeIcon icon={faAngleLeft} style={{
                                                 fontSize: "24px",
                                                 color: 'var(--light)',
                                                 fontWeight: '700',
                                                 opacity: '0.7'
                                             }}/>
                                            </span>
                                    <div
                                        className=" shadow-sm d-flex justify-content-center col-10 p-2 shadow-sm promotion-header text-white">
                                        BETNARE PROMOTIONS
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
