import React, {useEffect, useState} from "react";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import {useParams} from "react-router-dom";
import makeRequest from "../../utils/fetch-request";
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {getFromLocalStorage} from "../../utils/local-storage";
import {LazyLoadImage} from "react-lazy-load-image-component";

const GamePlay = (props) => {
    const {game_id} = useParams()

    const [gameUrl, setGameUrl] = useState('')

    const [games, setGames] = useState(getFromLocalStorage('category_games'))

    const [isLoggedIn] = useState(getFromLocalStorage('user'))

    const [gameUrlLoaded, setGameUrlLoaded] = useState(false)

    const createPlayer = async () => {

        let endpoint = '/v1/casino/create/player'

        let method = "GET"

        await makeRequest({url: endpoint, method: method}).then(([status, result]) => {
            if (status === 200) {
                console.log(result)
            }
        });
    }

    const startGame = async (game_id) => {

        let endpoint = `/v1/casino/start/game?game-id=${game_id}`

        let method = "GET"

        await makeRequest({url: endpoint, method: method}).then(([status, result]) => {
            if (status === 200) {
                console.log(result?.result.gameURL)
                setGameUrl(result?.result.gameURL)
                setGameUrlLoaded(true)

            }
        });
    }

    const CategoryGames = () => (
        <div className="col-md-12">
            <div className={'col-md-12 overflow-scroll d-flex'}>
                <div className="container-fluid">
                    <div className="row flex-row flex-nowrap text-white shadow-lg justify-content-around">
                        {games?.map((game) => (
                                <div className="" style={{width: "60px"}}
                                     onClick={() => startGame(game.game_id)}>
                                    <LazyLoadImage
                                        style={{height: "50px", width: "60px", float: "left"}}
                                        src={`${game.game_icon}`}
                                        className={'virtual-game-image'}/>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )

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
            <div className="amt">
                <div className="d-flex flex-row justify-content-between">
                    <div className="col-md-12">
                        <div className="homepage">
                            <CategoryGames/>
                            <div
                                className={`col-md-12 ${gameUrlLoaded ? 'd-none' : 'd-block'}`}>
                                <SkeletonTheme baseColor="#0e131b" highlightColor="#3f6878">
                                    <Skeleton height={'100px'}/>
                                </SkeletonTheme>
                            </div>
                            {gameUrlLoaded && <>
                                <iframe className={'mt-3 shadow-lg'}
                                        src={gameUrl} title="Gadme" width={'100%'} height={'500px'}></iframe>
                            </>}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default GamePlay