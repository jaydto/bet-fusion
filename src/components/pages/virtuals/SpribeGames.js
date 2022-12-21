import React, {useEffect, useState} from "react";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import {Link, useParams} from "react-router-dom";
import makeRequest from "../../utils/fetch-request";
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {getFromLocalStorage} from "../../utils/local-storage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFire} from "@fortawesome/free-solid-svg-icons";
import {LazyLoadImage} from "react-lazy-load-image-component";

const GamePlay = (props) => {
    const {game_id, live} = useParams()


    const [games, setGames] = useState([])

    const [isLoggedIn] = useState(getFromLocalStorage('user'))

    const [gamesLoaded, setGamesLoaded] = useState(false)

    const getFastGames = async () => {

        let endpoint = '/v1/fast-games'

        let method = "POST"

        await makeRequest({url: endpoint, method: method}).then(([status, result]) => {
            if (status === 200) {
                setGames(result?.games)
                setGamesLoaded(true)
            }
        });
    }

    useEffect(() => {
        getFastGames()
    }, [])

    // const getFastGamesImages = (nare_game, folder = 'fast_games') => {
    //
    //     let default_img = 'default_sport'
    //     let nare_image;
    //     try {
    //        nare_image = require(`../../../src/assets/${folder}/${sport_name}.svg`);
    //     } catch (error) {
    //         nare_image = require(`../../../src/assets/${folder}/${default_img}.svg`);
    //     }
    //     return sport_image
    // }

    return (
        <>
            <Header/>
            <div className="amt">
                <div className="d-flex flex-row justify-content-between">
                    <div className="col-md-12">
                        <div className="homepage">
                            <div className={'row text-white p-2 shadow-sm mt-2'}>
                                {gamesLoaded && games?.map((game) => (
                                    <div className={'col-md-2 cursor-pointer'}>
                                        <div
                                            className={'mt-1 mb-1 d-flex flex-column shadow-lg virtual-game-container'}>
                                            <Link to={`/nare-games/${game?.key}`}
                                                  className=""
                                                  key={game.key}>
                                                <p className={'text-center bold text-elipsis text-uppercase'}>
                                                    {game?.name}
                                                </p>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default GamePlay