import React, {useEffect, useState} from "react";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import {useNavigate, useParams} from "react-router-dom";
import makeRequest from "../../utils/fetch-request";
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {getFromLocalStorage} from "../../utils/local-storage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faFire} from "@fortawesome/free-solid-svg-icons";
import useWindowDimensions from "../../header/Dimensions";
import Right from "../../right";
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";

const GamePlay = React.memo(
    (props) => {

        const {game} = useParams()
        const pathname = window.location.pathname;
        const [gameUrl, setGameUrl] = useState('')
        const [, setUserToken] = useState('')
        const [, setUserID] = useState('')
        const [demo, setDemo] = useState(false)
        const [user, ] = useState(getFromLocalStorage("user"));
        const { width} = useWindowDimensions();

        const [isLoggedIn] = useState(getFromLocalStorage('user'))

        const [gameUrlLoaded, setGameUrlLoaded] = useState(false)
        const gaEventTracker = useAnalyticsEventTracker("Spribe Games")

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
                        event:'Spribe Game',
                        game_id: game,
                    }
                    gaEventTracker("Playing Spribe Game", data)
                    setUserToken(result.token)
                    setUserID(result.profile_id)
                    setGameUrl(result?.game_url)
                    setGameUrlLoaded(true)
                }else{
                    const data={
                        user_id:user?.profile_id,
                        event:'Spribe Game Launch Failed',
                        game_id:game,
                        message:"Game Launch Failed"
                    }
                    gaEventTracker("Playing Spribe Game Failed",data)
                }
            });
        }

        const configureDemoGame = () => {
            setGameUrl(`https://demo.spribe.io/launch/${game || 'aviator'}?currency=USD&lang=EN&return_url=https://betnare.com`)
            setGameUrlLoaded(true)
            setDemo(true)
        }


        useEffect(() => {
            isLoggedIn ?
                createToken() :
                configureDemoGame()

        }, [])
        const navigate=useNavigate()
        return (
            <>
                <Header/>
                <div className={(width <= 575 ? user ? "user_logged virtuals" : "amt" : "amt")}>
                    <div className={'d-flex align-items-center'}>
                                            <span className={'px-3 remove-backbutton-on-desktop'} onClick={() => navigate('/nare-games')}>
                                             <FontAwesomeIcon icon={faAngleLeft} style={{
                                                 fontSize: "22px",
                                                 color: 'var(--light)',
                                                 fontWeight: '700',
                                                 opacity: '0.7'
                                             }}/>
                                                <FontAwesomeIcon icon={faAngleLeft} style={{
                                                    fontSize: "22px",
                                                    color: 'var(--light)',
                                                    fontWeight: '700',
                                                    opacity: '0.7'
                                                }}/>
                                               <span style={{fontSize: "20px",
                                                   color: 'var(--light)',
                                                   fontWeight: '700',
                                                   opacity: '0.7',
                                                   paddingLeft:'11px'}}> Back</span>
                                            </span>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                        <div className="col-md-12 w-100">
                            <div className="homepage mt-2">
                                <div
                                    className={`col-md-12 ${gameUrlLoaded ? 'd-none' : 'd-block'}`}>
                                    <SkeletonTheme baseColor="#0e131b" highlightColor="#3f6878">
                                        <Skeleton height={'100px'}/>
                                    </SkeletonTheme>
                                </div>
                                {gameUrlLoaded && <>
                                    {demo && (
                                        <>
                                            <div className="alert alert-info">
                                                This is {game} Demo. To play the real game, please Log In.
                                                &nbsp;<FontAwesomeIcon icon={faFire} style={{color: "orangered"}}/>
                                            </div>
                                        </>
                                    )}
                                    <iframe className={'mt-3 shadow-lg'} allowFullScreen
                                            src={gameUrl} title="Gadme" width={'100%'} height={'700px'}></iframe>
                                </>}
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
                <div className="d-lg-none mobile-top stats-desktop">
                    <Right/>
                </div>
                <div className={"mobile-remove"}>
                    <Footer/>
                </div>

            </>
        )
    })

export default React.memo(GamePlay)