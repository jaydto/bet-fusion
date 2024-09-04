import React, {useCallback, useEffect, useState} from "react";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import {useNavigate, useParams} from "react-router-dom";
import makeRequest from "../../utils/fetch-request";
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {getFromLocalStorage} from "../../utils/local-storage";
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";
import FullscreenButton from "../../shared/FullScreenButton";
import useWindowDimensions from "../../header/Dimensions";
import {useDispatch, useSelector} from "react-redux";
import {casinoCreatePlayer, casinoGamePlay} from "../../../redux/virtualsSlice";


const GamePlay = React.memo(
    (props) => {
        const gaEventTracker = useAnalyticsEventTracker("Casino Game")

        const {game_id, live} = useParams()

        const [user, ] = useState(getFromLocalStorage("user"));


        const [isLoggedIn] = useState(getFromLocalStorage('user'))


        const pathname = window.location.pathname
        const dispatchRedux=useDispatch()
        // const loading=useSelector((state)=>state.virtuals.loading)
        const gameUrlLoaded=useSelector((state)=>state.virtuals.fetching)
        const gameUrl=useSelector((state)=>state.virtuals.casino_game_url)

        const createPlayer = async () => {
            dispatchRedux(casinoCreatePlayer())

        }

        const { width} = useWindowDimensions();
        const [isCustomFullscreen, setCustomFullscreen] = useState(false);

        const [iframeHeight, setIframeHeight] = useState(750); // Initial height

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
        const startGame = async (game_id) => {

            let endpoint = live === '0' ? `/v1/casino/game/demo-url?game-id=${game_id}` : `/v1/casino/game/url?game-id=${game_id}`

            let method = "GET"
            const data={
                endpoint:endpoint,
                method:method
            }
            dispatchRedux(casinoGamePlay(data))
            // const data = {
            //     user_id: user?.profile_id,
            //     event:'Casino Game',
            //     game_id: game_id,
            // }
            // gaEventTracker("Playing Casino Game", data)
        }

        useEffect(() => {
            isLoggedIn ?
                createPlayer().then(() => {
                    startGame(game_id)
                }) :
                window.location.href = "/casino"

        }, [])
        return (
            <>
                <Header/>
                <div className={(user ? "user_logged casino" : "amt-casino")}>
                    <FullscreenButton onClick={()=>toggleFullscreen()} navigation={'/casino'} isCustomFullScreen={isCustomFullscreen}/>
                    <div className="d-flex flex-row justify-content-between">
                        <div className="col-md-12 virtual-width-mobile">
                            <div className="homepage mt-2">
                                <div
                                    className={`col-md-12 ${gameUrlLoaded ? 'd-none' : 'd-block'}`}>
                                    <SkeletonTheme baseColor="#0e131b" highlightColor="#3f6878">
                                        <Skeleton height={'100px'}/>
                                    </SkeletonTheme>
                                </div>
                                {gameUrlLoaded && <div className={` ${isCustomFullscreen ? "active custom-fullscreen-wrapper" : ""}`}>
                                    <iframe className={'mt-3 shadow-lg'}  id={'casinoGamePlay'}
                                            src={gameUrl} title="Gadme"
                                            style={{
                                                ...iframeStyle,
                                                height: `${Math.min(iframeHeight, maxIframeHeight)}px`,
                                            }}></iframe>
                                </div>}
                               

                            </div>
                        </div>

                    </div>
                </div>

                <div className={"footer-mobile-none"}>
                    <Footer/>
                </div>
            </>
        )
    })

export default React.memo(GamePlay)