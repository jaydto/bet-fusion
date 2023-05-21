import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import '../../test.css'
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";
import {Link, useLocation} from "react-router-dom";
import mobileBanner from "../../../assets/img/mobile/APPDownload.png";

const Header = React.lazy(() => import('../../header/header'));
const Footer = React.lazy(() => import('../../footer/footer'));
const Right = React.lazy(() => import('../../right'));
const SideBar = React.lazy(() => import('../../sidebar/awesome/Sidebar'))
const downloadAPKFile = React.lazy(() => import('../../../assets/betnare.apk'));
const  Index= () => {
    const gaEventTracker = useAnalyticsEventTracker('App');

    useEffect(() => {
        gaEventTracker('App Page')
    })

    const getDownloadFile = () => {
        return downloadAPKFile;
    }


    return (
        <div className={'flex-item'}>
            <div className="item4"><Header/></div>
            <div className="flex-container">
                <div className="item1"> <SideBar loadCompetitions/></div>
                <div className="item2" style={{width:'100%'}}>
                    <div className="gz home" style={{width: '100%',overflowX: 'clip'}}>
                        <div className="homepage">
                            <div
                                className='col-md-12 primary-bg p-4 text-center d-flex flex-row justify-content-between align-items-center sticky-top'>
                                <h4 className="inline-block">
                                    BETNARE APP
                                </h4>


                                <Link to={'/betnare.apk'}
                                      target={"_blank"}
                                      title={'Download App'}
                                      download={'betnare.apk'}
                                      className="btn btn-primary btn-lg  text-white text-decoration-none"
                                      label="Download App"
                                      filename="betnare.apk"
                                      onClick={()=>gaEventTracker('Downloaded App')}
                                      exportFile={() => getDownloadFile()}>Download Betnare App</Link>


                            </div>
                            <div className="col-md-12 mt-2 text-white accordion-container text-start">
                                <hr/>
                                <div className={'d-flex justify-content-center shadow-lg mb-5'}>
                                    Download the 🔥BetNare APP🔥 now!!
                                    FOR BETTER EXPERIENCE
                                    Take Control of Your Bets
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
                                    <Link to={'/betnare.apk'}
                                          target={"_blank"}
                                          title={'Download App'}
                                          download={'betnare.apk'}
                                          className="btn btn-primary btn-lg mb-5 text-white text-decoration-none"
                                          label="Download App"
                                          filename="betnare.apk"
                                          onClick={()=>gaEventTracker('Downloaded App')}
                                          exportFile={() => getDownloadFile()}>Download App Now</Link>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="item3">
                    <Right app={true} test={true}/>
                </div>

            </div>
            <div className="item6"><div className={"footer-mobile-none"}>
                <Footer/>
            </div></div>
        </div>

    );
};

export default React.memo(Index);
