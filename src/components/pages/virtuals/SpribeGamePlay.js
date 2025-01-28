import React, {useCallback, useEffect, useRef, useState} from "react";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import {useNavigate, useParams} from "react-router-dom";
import makeRequest from "../../utils/fetch-request";
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {getFromLocalStorage} from "../../utils/local-storage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFire} from "@fortawesome/free-solid-svg-icons";
import useWindowDimensions from "../../header/Dimensions";
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";
import FullscreenButton from "../../shared/FullScreenButton";
import {useSelector} from "react-redux";
import FullscreenButtonSpribe from "../../shared/FullScreenSpribe";

const GamePlay = React.memo(
    (props) => {

        const {game} = useParams()
        let url = new URL(window.location.href)
        const searchparam=url.searchParams.get('status')
        const pathname = window.location.pathname;
        const [gameUrl, setGameUrl] = useState('')
        const [, setUserToken] = useState('')
        const [, setUserID] = useState('')
        const [demo, setDemo] = useState(false)
        const {width} = useWindowDimensions();

        const [isLoggedIn] = useState(getFromLocalStorage('user'))

        const [gameUrlLoaded, setGameUrlLoaded] = useState(false)
        const gaEventTracker = useAnalyticsEventTracker("Spribe Games")
        const [isCustomFullscreen, setCustomFullscreen] = useState(false);
        const userData=useSelector((state)=>state.auth.user)
        const [user, setUser]=useState(getFromLocalStorage("user"))

        useEffect(()=>{
            if(userData){
                setUser(userData||getFromLocalStorage("user"))
            }
        }, [userData])

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
            setGameUrl(`https://demo.spribe.io/launch/${game || 'aviator'}?currency=USD&lang=EN&return_url=https://BetTena.com`)
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
            setIframeHeight(isCustomFullscreen ? 660 : 800); // Set the fixed height here
        }, []);

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
            isLoggedIn && searchparam==="live" ?
                createToken() :
                configureDemoGame()

        }, [])

        const navigate=useNavigate()

        

        const navigateChecker=()=>{
            if(user){
                navigate("/nare-games/aviator?status=live")
                window.location.reload()
            }else{
                navigate('/login');
            }

        }


        return (
            <div style={{position: 'relative'}}>
                <Header/>
                <div
                    className={`virtuals-container-position ${(width <= 575 ? user ? "user_logged virtuals" : "amt-virtual" : "amt-virtual")}`}>
                    <FullscreenButton onClick={() => toggleFullscreen()} navigation={'/casino'}
                                      isCustomFullScreen={isCustomFullscreen}/>
                                      {/* <FullscreenButton onClick={() => toggleFullscreen()} navigation={'/casino'}
                                      isCustomFullScreen={isCustomFullscreen}/> */}
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
                                            <div className="alert alert-info" onClick={()=>navigateChecker()}>
                                                This is {game} Demo. To play the real game, please {user?'Click here':'Log In'}.
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