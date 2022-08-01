import React from "react";
import 'react-accessible-accordion/dist/fancy-example.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
import DownloadLink from "react-download-link";
import mobileBanner from '../../../assets/img/mobile/APPDownload.png'

const Header = React.lazy(() => import('../../header/header'));
const SideBar = React.lazy(() => import('../../sidebar/awesome/Sidebar'));
const Footer = React.lazy(() => import('../../footer/footer'));
const Right = React.lazy(() => import('../../right/index'));
const downloadAPKFile = React.lazy(() => import('../../../assets/betnare.apk'));


const MobileApp = () => {

    const getDownloadFile = () => {
        return downloadAPKFile;
    }

    return (
        <>
            <Header/>
            <div className="amt">
                <div className="d-flex flex-row justify-content-between">
                    <SideBar loadCompetitions/>
                    <div className="gz home" style={{width: '100%'}}>
                        <div className="homepage">
                            <div
                                className='col-md-12 primary-bg p-4 text-center d-flex flex-row justify-content-between sticky-top'>
                                <h4 className="inline-block">
                                    BETNARE APP
                                </h4>

                                <DownloadLink
                                    className="btn btn-primary btn-lg mb-5 text-white text-decoration-none"
                                    label="Download App"
                                    filename="betnare.apk"
                                    exportFile={() => getDownloadFile()}
                                />
                            </div>
                            <div className="col-md-12 mt-2 text-white accordion-container text-start">
                                <hr/>
                                <div className={'d-flex justify-content-center shadow-lg mb-5'}>
                                    Download the 🔥BetNare APP🔥 now!!
                                    FOR BETTER EXPERIENCE
                                    Take Control of Your Bets

                                    Download & Get 50/= Instant BONUS.
                                </div>
                                <div className={'col-md-12 justify-content-center d-flex'}>
                                    <img src={mobileBanner} style={{width: "80%"}} className={'rounded-3 shadow-lg'}/>
                                </div>
                                <div className="col p-2">
                                    <br/>✅ Only 2MB in size
                                    <br/>✅ Faster & Lighter - Uses less data with data saver mode to play LIVE games.
                                    <br/>✅ Enjoy Instant Winnings on BetNare Virtuals.
                                    <br/>✅ Enjoy Instant Deposits and Fast Payouts only on BetNare App!
                                    <br/>✅ Livescore - Stay updated with accurate and real time match results.
                                    <br/>✅ Enjoy Light & Dark Theme Mode.
                                    <br/>✅ Instant Notifications - Don’t Miss Out on BetNare Offers and News Updates.
                                </div>
                                <div className="col">
                                    <hr/>
                                    Play & Start Winning on the Fastest ⚡️ & Lightest Betting App.
                                    <hr/>
                                </div>
                                <div className="text-center mt-2 col">
                                    <DownloadLink
                                        className="btn btn-primary btn-lg mb-5 text-white btn-lg col-md-3 text-decoration-none"
                                        label="Download App Now"
                                        filename="betnare.apk"
                                        exportFile={() => getDownloadFile()}
                                    />
                                </div>
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
