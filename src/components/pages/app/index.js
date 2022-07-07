import React from "react";
import 'react-accessible-accordion/dist/fancy-example.css';

const Header = React.lazy(() => import('../../header/header'));
const SideBar = React.lazy(() => import('../../sidebar/awesome/Sidebar'));
const Footer = React.lazy(() => import('../../footer/footer'));
const Right = React.lazy(() => import('../../right/index'));

const MobileApp = () => {

    return (
        <>
            <Header/>
            <div className="amt">
                <div className="d-flex flex-row justify-content-between">
                    <SideBar loadCompetitions/>
                    <div className="gz home" style={{width: '100%'}}>
                        <div className="homepage">
                            <div className='col-md-12 primary-bg p-4 text-center'>
                                <h4 className="inline-block">
                                    BETNARE APP
                                </h4>
                            </div>
                            <div className="col-md-12 mt-2 text-white p-2 ">
                                <p>
                                    Do you want to play on your phone at your convenience? Download our mobile app
                                    by clicking on the download app button below.
                                </p>
                            </div>
                            <div className="col-md-12 mt-2 text-white accordion-container text-center">
                                <a href='https://betnare.com/app/download/betnare.apk' target={"_blank"}
                                   className="btn btn-primary btn-lg mb-5">
                                    DOWNLOAD BETNARE APP
                                </a>
                            </div>
                        </div>
                    </div>
                    <Right/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default MobileApp
