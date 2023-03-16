import React, {useEffect, useState} from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import {useParams} from "react-router-dom";
import makeRequest from "../utils/fetch-request";
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {getFromLocalStorage} from "../utils/local-storage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFire} from "@fortawesome/free-solid-svg-icons";

const ShaksGamePlay = (props) => {

    const {game} = useParams()
    const [gameUrl, setGameUrl] = useState('')
    const [token, setUserToken] = useState('')
    const [user_id, setUserID] = useState('')
    const [demo, setDemo] = useState(false)
    // console.log("game_name", game)

    const [games] = useState(getFromLocalStorage('category_games'))

    const [isLoggedIn] = useState(getFromLocalStorage('user'))

    const [gameUrlLoaded, setGameUrlLoaded] = useState(false)

    const createToken = async () => {

        let endpoint = '/v1/shacks-game-url'

        let method = "POST"

        let user = getFromLocalStorage('user')

        let payload = {
            "token": user.token,
            "profile_id": user.profile_id,
            "game": game === undefined ? 'Crashlite' : game.trim()
        }

        await makeRequest({url: endpoint, method: method, data: payload}).then(([status, result]) => {
            if (status === 200) {
               
                setUserID(result.profile_id)
                setGameUrl(result?.game_url)
                setGameUrlLoaded(true)
            }
        });
    }

    // console.log("game_url", game.trim())
    // const configureDemoGame = () => {
    //     setGameUrl(`https://staging.shacksevo.co/${game||'penaldo'}?`)
    //     setGameUrlLoaded(true)
    //     setDemo(true)
    // }


    useEffect(() => {
        isLoggedIn &&
            createToken() 
            // configureDemoGame()

    }, [])
    return (
        <>
            <Header/>
            <div className="amt">
                <div className="d-flex flex-row justify-content-between">
                    <div className="col-md-12">
                        <div className="homepage">
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
                                            This is {game} demo. To play the real game, please Log In.
                                            &nbsp;<FontAwesomeIcon icon={faFire} style={{color: "orangered"}}/>
                                        </div>
                                    </>
                                )}
                                <iframe className={'mt-3 shadow-lg'} allowFullScreen webkitallowfullscreen
                                        mozallowfullscreen
                                        src={gameUrl} title="Gadme" width={'100%'} height={'600px'}></iframe>
                            </>}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default ShaksGamePlay