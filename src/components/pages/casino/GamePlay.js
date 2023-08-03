import React, {useEffect, useState} from "react";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import {useNavigate, useParams} from "react-router-dom";
import makeRequest from "../../utils/fetch-request";
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {getFromLocalStorage} from "../../utils/local-storage";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Stack} from "react-bootstrap";
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";


const GamePlay = React.memo(
    (props) => {
        const gaEventTracker = useAnalyticsEventTracker("Casino Game")

        const {game_id, live} = useParams()

        const [user, ] = useState(getFromLocalStorage("user"));

        const [gameUrl, setGameUrl] = useState('')

        const [games] = useState(getFromLocalStorage('category_games'))

        const [isLoggedIn] = useState(getFromLocalStorage('user'))

        const [gameUrlLoaded, setGameUrlLoaded] = useState(false)

        const pathname = window.location.pathname

        const createPlayer = async () => {

            let endpoint = '/v1/casino/create/player'

            let method = "GET"

            await makeRequest({url: endpoint, method: method}).then(([status, result]) => {
            });
        }

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
                <div className={'d-flex align-items-center'}>
                                            <span className={'px-3 remove-backbutton-on-desktop'} onClick={() => navigate('/casino')}>
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
                <div className={(user ? "user_logged virtuals" : "amt")}>
                    <div className="d-flex flex-row justify-content-between">
                        <div className="col-md-12 virtual-width-mobile">
                            <div className="homepage mt-2">
                                <div
                                    className={`col-md-12 ${gameUrlLoaded ? 'd-none' : 'd-block'}`}>
                                    <SkeletonTheme baseColor="#0e131b" highlightColor="#3f6878">
                                        <Skeleton height={'100px'}/>
                                    </SkeletonTheme>
                                </div>
                                {gameUrlLoaded && <>
                                    <iframe className={'mt-3 shadow-lg'} allowFullScreen
                                            src={gameUrl} title="Gadme" width={'100%'} height={'700px'}></iframe>
                                </>}
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