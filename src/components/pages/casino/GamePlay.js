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
import {useSelector} from "react-redux";


const GamePlay = React.memo(
    (props) => {
        const gaEventTracker = useAnalyticsEventTracker("Casino Game")

        const {game_id, live} = useParams()

        const userData=useSelector((state)=>state.data.user)
        const [user, setUser]=useState(getFromLocalStorage("user"))

        useEffect(()=>{
            if(userData){
                setUser(userData||getFromLocalStorage("user"))
            }
        }, userData)

        const [gameUrl, setGameUrl] = useState('')

        const [isLoggedIn] = useState(getFromLocalStorage('user'))

        const [gameUrlLoaded, setGameUrlLoaded] = useState(false)

        const pathname = window.location.pathname

        const createPlayer = async () => {

            let endpoint = '/v1/casino/create/player'

            let method = "GET"

            await makeRequest({url: endpoint, method: method}).then(([status, result]) => {
            });
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

            await makeRequest({url: endpoint, method: method}).then(([status, result]) => {
                if (status === 200) {
                    const data = {
                        user_id: user?.profile_id,
                        event:'Casino Game',
                        game_id: game_id,
                    }
                    gaEventTracker("Playing Casino Game", data)
                    setGameUrl(result?.result.gameURL)
                    setGameUrlLoaded(true)

                }else{
                    const data={
                        user_id:user?.profile_id,
                        event:'Casino Game Launch Failed',
                        game_id:game_id,
                        message:"Game Launch Failed"
                    }
                    gaEventTracker("Playing Casino Game Failed",data)

                }
            });
        }

        useEffect(() => {
            isLoggedIn ?
                createPlayer().then(() => {
                    startGame(game_id)
                }) :
                window.location.href = "/casino"

        }, [])
        const navigate=useNavigate()
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
                                {!gameUrlLoaded && (pathname == "1301" || pathname.includes("1301")) &&
                                    <div className={'card rounded-3 e '} style={{
                                        color: "#999",
                                        background: "transparent",
                                        textDecoration: "none",
                                        listStyle: "none",
                                        fontSize: '14px'
                                    }}>
                                        <div className={'card-body p-3'}>
                                            <h3 className={'text-center text-warning flashy'}>
                                                WIN Upto 2,500,000/= with Spaceman
                                            </h3>
                                            <br/>
                                            <ul>
                                                <li>
                                                    Playing Spaceman is very thrilling and fun.
                                                </li>
                                                <li>
                                                    Win big cash prizes when you hit the top spot and collect UPTO
                                                    x5000.
                                                    The multiplier always starts from 1X and goes UPTO a maximum of
                                                    5,000X.
                                                </li>
                                                <li>
                                                    Minimum Bet – KSH10,
                                                    Maximum Bet – KSH5000,
                                                    Maximum Win Per Spaceman Bet is KES 2,500,000.
                                                </li>
                                                <li>
                                                    CashOut before the spaceman crashes. Get high profits the longer
                                                    Spaceman flies.
                                                </li>
                                                <li>
                                                    You can also cashout 50% of your bet and leaving the remaining 50%
                                                    in
                                                    play as long as you desire. The Auto CashOut and the 50% Auto
                                                    Cashout as
                                                    additional options. The Auto Cash-out feature finishes the game
                                                    completely crediting you with the current level of winnings. The 50%
                                                    Auto Cashout feature cashes out half of your stake, allowing you to
                                                    continue with the remaining half to try and win a bigger prize.
                                                    Get speedy outcomes whenever you play SpaceMan. Utilize the
                                                    individual
                                                    betting strategies using Auto
                                                </li>
                                            </ul>
                                            <br/>
                                            <h3 className={'text-center'}>CashOut and Auto Play. </h3>
                                            <ul>
                                                <li>
                                                    Interact with a detailed bet history, statistics with a leader board
                                                    showing actual Stakes and Wins. The Live chat indicates real time
                                                    conversation amongst all the SpaceMan players. See up to 500 last
                                                    results with each round details.
                                                </li>
                                                <li>Play Spaceman only on BetNare. Click here to play
                                                    https://betnare.com/gameplay/1301/1
                                                </li>
                                                <li>
                                                    SpaceMan is available to NEW and EXISTING customers on the platform
                                                </li>
                                            </ul>

                                        </div>

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