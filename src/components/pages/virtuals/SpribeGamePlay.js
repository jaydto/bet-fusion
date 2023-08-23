import React, {useCallback, useEffect, useRef, useState} from "react";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import {useParams} from "react-router-dom";
import makeRequest from "../../utils/fetch-request";
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {getFromLocalStorage} from "../../utils/local-storage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFire} from "@fortawesome/free-solid-svg-icons";
import useWindowDimensions from "../../header/Dimensions";
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";
import FullscreenButton from "../../shared/FullScreenButton";

const GamePlay = React.memo(
    (props) => {

        const {game} = useParams()
        const pathname = window.location.pathname;
        const [gameUrl, setGameUrl] = useState('')
        const [, setUserToken] = useState('')
        const [, setUserID] = useState('')
        const [demo, setDemo] = useState(false)
        const [user,] = useState(getFromLocalStorage("user"));
        const {width} = useWindowDimensions();

        const [isLoggedIn] = useState(getFromLocalStorage('user'))

        const [gameUrlLoaded, setGameUrlLoaded] = useState(false)
        const gaEventTracker = useAnalyticsEventTracker("Spribe Games")
        const [isCustomFullscreen, setCustomFullscreen] = useState(false);


        const createToken = async () => {

            let endpoint = '/v1/spribe-game-url'

            let method = "POST"

            let user = getFromLocalStorage('user')

            let payload = {
                "profile_id": user.profile_id,
                "token": user.token,
                "game": game === undefined ? 'aviator' : game.toLowerCase()
            }

            await makeRequest({url: endpoint, method: method, data: payload}).then(([status, result]) => {
                if (status === 200) {
                    const data = {
                        user_id: user?.profile_id,
                        event: 'Spribe Game',
                        game_id: game,
                    }
                    gaEventTracker("Playing Spribe Game", data)
                    setUserToken(result.token)
                    setUserID(result.profile_id)
                    setGameUrl(result?.game_url)
                    setGameUrlLoaded(true)
                } else {
                    const data = {
                        user_id: user?.profile_id,
                        event: 'Spribe Game Launch Failed',
                        game_id: game,
                        message: "Game Launch Failed"
                    }
                    gaEventTracker("Playing Spribe Game Failed", data)
                }
            });
        }

        const configureDemoGame = () => {
            setGameUrl(`https://demo.spribe.io/launch/${game || 'aviator'}?currency=USD&lang=EN&return_url=https://betnare.com`)
            setGameUrlLoaded(true)
            setDemo(true)
        }

        const [iframeHeight, setIframeHeight] = useState(660); // Initial height

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
            console.log("called escape here entry to function")
            const handleEsc = (event) => {
                if (event.key === 'Escape') {
                    console.log("called escape here")
                    setCustomFullscreen(false);
                }
            };
            window.addEventListener('keydown', handleEsc);

            return () => {
                window.removeEventListener('keydown', handleEsc);
            };
        },[document.fullscreenElement]);


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

        useEffect(() => {
            isLoggedIn ?
                createToken() :
                configureDemoGame()

        }, [])


        return (
            <div style={{position: 'relative'}}>
                <Header/>
                <div
                    className={`virtuals-container-position ${(width <= 575 ? user ? "user_logged virtuals" : "amt-virtual" : "amt-virtual")}`}>
                    <FullscreenButton onClick={() => toggleFullscreen()} navigation={'/'}
                                      isCustomFullScreen={isCustomFullscreen}/>
                    <div className="d-flex flex-row justify-content-between">
                        <div className="col-md-12 w-100">
                            <div className="homepage mt-2">
                                <div
                                    className={`col-md-12 ${gameUrlLoaded ? 'd-none' : 'd-block'}`}>
                                    <SkeletonTheme baseColor="#0e131b" highlightColor="#3f6878">
                                        <Skeleton height={'100px'}/>
                                    </SkeletonTheme>
                                </div>
                                {gameUrlLoaded && (
                                    <div
                                        className={` ${isCustomFullscreen ? "active custom-fullscreen-wrapper" : ""}`}
                                    >
                                        {demo && (
                                            <div className="alert alert-info">
                                                This is {game} Demo. To play the real game, please Log In.
                                                &nbsp;<FontAwesomeIcon icon={faFire} style={{color: "orangered"}}/>
                                            </div>
                                        )}
                                        <iframe
                                            className="mt-3 shadow-lg"
                                            id="spribeGamePlay"
                                            src={gameUrl}
                                            allowFullScreen
                                            title="Spribe"
                                            style={{
                                                ...iframeStyle,
                                                height: `${Math.min(iframeHeight, maxIframeHeight)}px`,
                                            }}
                                        ></iframe>
                                    </div>
                                )}

                                {pathname == "aviator" || pathname.includes("aviator") &&
                                    <div className={'card rounded-3 e '} style={{
                                        color: "#999",
                                        background: "transparent",
                                        textDecoration: "none",
                                        listStyle: "none",
                                        fontSize: '14px'
                                    }}>
                                        <div className={'card-body p-3'}>
                                            <h3 className={'text-center text-warning flashy'}>
                                                WIN Upto 2,000,000/= na AVIATOR daily.
                                            </h3>
                                            <br/>
                                            <h3 className={'text-center'}>How to Play Aviator</h3>
                                            <ul>
                                                <li>
                                                    Fly Aviator to WIN Upto 2,000,000/= Daily. Choose your bet amount
                                                    and
                                                    press confirm. Use AUTO-BET function for a guaranteed WIN. Minimum
                                                    Bet –
                                                    KSH 10. Maximum Bet – KSH 10,000. Maximum Win per Bet is KSH
                                                    2,000,000.
                                                    Maximize your Winnings with the Double Bet feature by adding another
                                                    bet
                                                    anytime and set different values.
                                                </li>
                                                <li>
                                                    Once the countdown expires, the Aviator will take flight and start
                                                    collecting a growing WIN multiplier. Press the “Cashout” button at
                                                    any
                                                    point to claim your winnings.
                                                </li>
                                                <li>
                                                    When using the “AUTO CASHOUT”, money will be withdrawn when the
                                                    MULTIPLIER exceeds the chosen AUTO-CASHOUT index. Example; If you
                                                    had
                                                    chosen 1.5X Index, it will cashout automatically at 1.5X and
                                                    WINNINGS
                                                    credited in your account.
                                                </li>

                                            </ul>
                                            <br/>
                                            <h3 className={'text-center'}>How to Win Aviator</h3>
                                            <ul>
                                                <li>
                                                    Press the Cashout button before the Aviator Plane flies away.
                                                </li>
                                                <li>
                                                    Aviator features a Double Bet Feature that allows a second bet
                                                    during
                                                    play. The second bet is set and activated independently of the first
                                                    one
                                                    and can be cashed out without cashing the initial set bet.
                                                </li>
                                            </ul>
                                            <br/>
                                            <h3 className={'text-center'}>Aviator Freebets </h3>
                                            <ul>
                                                <li>
                                                    Play Aviator on BetNare & Get Freebets every time.
                                                </li>
                                                <li>
                                                    Register now on https://betnare.com/nare-games/aviator and become a
                                                    potential winner.
                                                </li>
                                                <li>
                                                    Sign Up to play Aviator here https://betnare.com/nare-games/aviator
                                                    .
                                                </li>
                                            </ul>
                                        </div>

                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"mobile-remove"}>
                    <Footer/>
                </div>

            </div>
        )
    })

export default React.memo(GamePlay)