import React, {useCallback, useEffect, useState} from "react";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import makeRequest from "../../utils/fetch-request";
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {getFromLocalStorage} from "../../utils/local-storage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFire} from "@fortawesome/free-solid-svg-icons";
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";
import useWindowDimensions from "../../header/Dimensions";
import FullscreenButton from "../../shared/FullScreenButton";

const SmartPlay = React.memo(
    (props) => {
        const url = new URL(window.location)
        const game = url.searchParams.get('game')
        const status = url.searchParams.get('status')
        const category = url.searchParams.get('category')
        const [gameUrl, setGameUrl] = useState('')
        const [, setUserToken] = useState('')
        const [, setUserID] = useState('')
        const [demo, setDemo] = useState(false)
        const pathname = window.location.search
        const [isLoggedIn] = useState(getFromLocalStorage('user'))
        const [gameUrlLoaded, setGameUrlLoaded] = useState(false)
        const gaEventTracker = useAnalyticsEventTracker("Smart Soft Game")

        const createToken = async () => {

            let endpoint = '/v1/smartsoft-game-url'

            let method = "POST"

            let user = getFromLocalStorage('user')

            let payload = {
                "profile_id": user.profile_id,
                "token": user.token,
                "game": game,
                "gameCategory": category
            }

            await makeRequest({url: endpoint, method: method, data: payload}).then(([status, result]) => {
                if (status === 200) {
                    const data = {
                        user_id: user?.profile_id,
                        event: 'Smart-Soft Game',
                        game_id: game,
                    }
                    gaEventTracker("Playing Smart Soft Game", data)
                    setUserToken(result.token)
                    setUserID(result.profile_id)
                    setGameUrl(result?.game_url)
                    setGameUrlLoaded(true)
                } else {
                    const data = {
                        user_id: user?.profile_id,
                        event: 'Smart-Soft Game Launch Fail',
                        game_id: game,
                        message: "Game Launch Failed"
                    }
                    gaEventTracker("Playing Smart Soft Game Failed", data)
                }
            });
        }
        const {width} = useWindowDimensions();
        const [isCustomFullscreen, setCustomFullscreen] = useState(false);

        const [iframeHeight, setIframeHeight] = useState(700); // Initial height

        // Define the CSS style for the iframe
        const iframeStyle = {
            maxWidth: "100%",
            width: "100%",
            height: `${iframeHeight}vh`, // Set the height dynamically
        };
        const maxIframeHeight =
            width > 991 ?
                isCustomFullscreen ?
                    window.innerHeight * 2 :
                    window.innerHeight * 0.82 :
                window.innerHeight * 0.92; // Maximum height is 77% desktop  and 92% mobile of the screen height

        // // Function to update the iframe height
        const updateIframeHeight = useCallback(() => {
            // console.log("this was called to resize", maxIframeHeight)
            setIframeHeight(isCustomFullscreen ? 660 : 800); // Set the fixed height here
        }, []);


        useEffect(() => {
            // Initial iframe height calculation
            updateIframeHeight();

            // Update iframe height when the window is resized
            window.addEventListener("resize", updateIframeHeight);

            // Clean up the event listener when the component is unmounted
            return () => {
                window.removeEventListener("resize", updateIframeHeight);
            };
        }, [updateIframeHeight, isCustomFullscreen]);

        useEffect(() => {
            const handleEsc = (event) => {
                if (event.key === 'Escape') {
                    setCustomFullscreen(false);
                }
            };

            window.addEventListener('keydown', handleEsc);

            return () => {
                window.removeEventListener('keydown', handleEsc);
            };
        }, []); // Empty dependency array to run the effect only on mount and unmount





        const toggleFullscreen = () => {
            const element = document.documentElement; // Fullscreen the whole document
            // console.log("Element fullscreen is now ... ",element)

            if (!isCustomFullscreen) {
                try {
                    if (element?.requestFullscreen) {
                        element?.requestFullscreen();
                    } else if (element?.mozRequestFullScreen) {
                        element?.mozRequestFullScreen();
                    } else if (element?.webkitRequestFullscreen) {
                        element?.webkitRequestFullscreen();
                    } else if (element?.msRequestFullscreen) {
                        element?.msRequestFullscreen();
                    }
                } catch (err) {
                    //there was an error encountered
                    console.error("error_message", err)
                }

                setCustomFullscreen(true);

            } else {
                try {
                    if(!document.fullscreenEnabled){
                        setCustomFullscreen(false);
                    }
                    if(document.fullscreenElement){

                        if (document.exitFullscreen) {
                            document.exitFullscreen();
                        } else if (document.mozCancelFullScreen) {
                            document.mozCancelFullScreen();
                        } else if (document.webkitExitFullscreen) {
                            document.webkitExitFullscreen();
                        } else if (document.msExitFullscreen) {
                            document.msExitFullscreen();
                        }
                    }

                } catch (err) {
                    console.error("error_encountered", err)
                }

                setCustomFullscreen(false);
            }
        };
        const configureDemoGame = () => {
            setGameUrl(`https://www.smartsoftgaming.com/GameDemo/${game || 'JetX'}?currency=USD&lang=EN&return_url=https://betnare.com`)
            setGameUrlLoaded(true)
            setDemo(true)
        }


        useEffect(() => {
            status==='demo'?
            configureDemoGame():
            isLoggedIn ?
                createToken() :
                configureDemoGame()

        }, [status])

        

        return (
            <>
                <Header/>
                <div className="amt top-smartsoft gameplay">
                    <FullscreenButton onClick={() => toggleFullscreen()} navigation={'/casino'}
                                      isCustomFullScreen={isCustomFullscreen}/>
                    <div className="d-flex flex-row justify-content-between">
                        <div className="col-md-12 w-100">
                            <div className="homepage">
                                <div
                                    className={`col-md-12 w-100 ${gameUrlLoaded ? 'd-none' : 'd-block'}`}>
                                    <SkeletonTheme baseColor="#0e131b" highlightColor="#3f6878">
                                        <Skeleton height={'100px'}/>
                                    </SkeletonTheme>
                                </div>
                                {gameUrlLoaded &&
                                    <div className={` ${isCustomFullscreen ? "active custom-fullscreen-wrapper" : ""}`}>
                                        {demo && (
                                            <div>
                                                <div className="alert alert-info">
                                                    This is {game} demo. To play the real game, please Log In.
                                                    &nbsp;<FontAwesomeIcon icon={faFire} style={{color: "orangered"}}/>
                                                </div>
                                            </div>
                                        )}{

                                    }
                                        <iframe className={'mt-3 shadow-lg'} id={'smartPlayGames'}
                                                src={gameUrl} title="Gadme"
                                                style={{
                                                    ...iframeStyle,
                                                    height: `${Math.min(iframeHeight, maxIframeHeight)}px`,
                                                }}
                                        ></iframe>
                                    </div>}
                                {pathname.includes("JetX") &&
                                    <div className={'card rounded-3 e '} style={{
                                        color: "#999",
                                        background: "transparent",
                                        textDecoration: "none",
                                        listStyle: "none",
                                        fontSize: '14px'
                                    }}>
                                        <div className={'card-body p-3'}>
                                            <h3 className={'text-center text-warning flashy'}>
                                                WIN Upto 4,000,000/= with JetX the Money Multiplier per Round
                                            </h3>
                                            <ul>
                                                <li>
                                                    Minimum Bet – KSH10, Maximum Stake per Bet is KES20,000. Maximum Win
                                                    per
                                                    Round is KES 4,000,000.
                                                </li>
                                                <li>
                                                    Game on real-time events, Fast Plays for High and instant Pay-outs
                                                    on
                                                    every successful cashout.
                                                </li>
                                                <li>
                                                    The Auto-Bet feature allows players to automatically place the bets
                                                    based on their preferred betting strategy as the Auto-Cashout
                                                    feature
                                                    automatically Pays Out your Winnings when you reach the predefined
                                                    multiplier.
                                                </li>
                                                <li>
                                                    JetX offers live statistics on running live bets in the statistics
                                                    section.
                                                </li>
                                            </ul>
                                            <br/>
                                            <h3 className={'text-center'}>How to Play JetX on BetNare</h3>
                                            <ul>
                                                <li>
                                                    When playing JetX, you can put more than one bet on each round to
                                                    predict which multiplier the plane will crash. The longer the plane
                                                    flies, the higher the multiplier. Attain high multipliers and win
                                                    Big by
                                                    cashing out before the Jet goes up in flames.
                                                </li>
                                                <li>
                                                    Play JetX only on BetNare. Click here to play
                                                    https://betnare.com/smart-play?game=JetX&category=JetX
                                                </li>
                                                <li>
                                                    Cashing out on JetX is Easy. You can Cash-Out by clicking the
                                                    cashout
                                                    button or by using the auto-withdraw option. With the Auto-CashOut
                                                    option, you are able to set the Multiplier to Auto-Collect your
                                                    winnings
                                                </li>
                                                <li>
                                                    CashOut has never been easier as it is possible to withdraw manually
                                                    while using the auto-withdraw feature.
                                                    Maximize your Winnings and Minimize loses by using the auto-withdraw
                                                    feature on JetX.
                                                </li>
                                            </ul>
                                            <br/>

                                        </div>

                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        )
    })

export default React.memo(SmartPlay)