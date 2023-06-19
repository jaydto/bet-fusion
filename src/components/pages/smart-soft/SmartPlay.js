import React, {useEffect, useState} from "react";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import makeRequest from "../../utils/fetch-request";
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {getFromLocalStorage} from "../../utils/local-storage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFire} from "@fortawesome/free-solid-svg-icons";

const SmartPlay = React.memo(
    (props) => {

    const url = new URL(window.location)
    const game = url.searchParams.get('game')
    const category = url.searchParams.get('category')
    const [gameUrl, setGameUrl] = useState('')
    const [token, setUserToken] = useState('')
    const [user_id, setUserID] = useState('')
    const [demo, setDemo] = useState(false)
    const pathname = window.location.search

    const [games] = useState(getFromLocalStorage('category_games'))

    const [isLoggedIn] = useState(getFromLocalStorage('user'))

    const [gameUrlLoaded, setGameUrlLoaded] = useState(false)

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
                setUserToken(result.token)
                setUserID(result.profile_id)
                setGameUrl(result?.game_url)
                setGameUrlLoaded(true)
            }
        });
    }

    const configureDemoGame = () => {
        setGameUrl(`https://www.smartsoftgaming.com/GameDemo/${game || 'JetX'}?currency=USD&lang=EN&return_url=https://betnare.com`)
        setGameUrlLoaded(true)
        setDemo(true)
    }


    useEffect(() => {
        isLoggedIn ?
            createToken() :
            configureDemoGame()

    }, [])
    return (
        <>
            <Header/>
            <div className="amt">
                <div className="d-flex flex-row justify-content-between">
                    <div className="col-md-12 w-100">
                        <div className="homepage">
                            <div
                                className={`col-md-12 w-100 ${gameUrlLoaded ? 'd-none' : 'd-block'}`}>
                                <SkeletonTheme baseColor="#0e131b" highlightColor="#3f6878">
                                    <Skeleton height={'100px'}/>
                                </SkeletonTheme>
                            </div>
                            {gameUrlLoaded && <>
                                {demo && (
                                    <>
                                        <div className="alert alert-info">
                                            This is {game} demo. To play the real game, please Log In.
                                            &nbsp;<FontAwesomeIcon icon={faFire} style={{color: "orangered"}}/>
                                        </div>
                                    </>
                                )}{

                            }
                                <iframe className={'mt-3 shadow-lg'} allowFullScreen
                                        src={gameUrl} title="Gadme" width={'100%'} height={'700px'}></iframe>
                            </>}
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
                                            WIN Upto 2,500,000/= with JetX the Money Multiplier daily
                                        </h3>
                                        <ul>
                                            <li>
                                                Minimum Bet – KSH10, Maximum Stake per Bet is KES12,000. Maximum Win per
                                                Bet is KES 2,500,000.
                                            </li>
                                            <li>
                                                Game on real-time events, Fast Plays for High and instant Pay-outs on
                                                every successful cashout.
                                            </li>
                                            <li>
                                                The Auto-Bet feature allows players to automatically place the bets
                                                based on their preferred betting strategy as the Auto-Cashout feature
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
                                                flies, the higher the multiplier. Attain high multipliers and win Big by
                                                cashing out before the Jet goes up in flames.
                                            </li>
                                            <li>
                                                Play JetX only on BetNare. Click here to play
                                                https://betnare.com/smart-play?game=JetX&category=JetX
                                            </li>
                                            <li>
                                                Cashing out on JetX is Easy. You can Cash-Out by clicking the cashout
                                                button or by using the auto-withdraw option. With the Auto-CashOut
                                                option, you are able to set the Multiplier to Auto-Collect your winnings
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