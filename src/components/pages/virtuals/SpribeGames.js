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
import {Button, ButtonGroup} from "react-bootstrap";
import SideBar from "../../sidebar/awesome/Sidebar";


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

    const getFastGamesImages = (nare_games, folder = 'fast-games') => {

        let nare_image;
        try {

            nare_image = require(`../../../../src/assets/img/${folder}/${nare_games.toLowerCase()}.png`);

        } catch (error) {
            console.log("error",error)

        }
        return nare_image
    }

    return (
        <>
            <Header/>
            <div className="amt">
                <div className="d-flex flex-row ">
                    <SideBar loadCompetitions/>
                    <div className="gz home" style={{width: '100%'}}>
                        <div className="col-md-12 d-flex flex-column">
                    <div className="col-md-12">
                        <div className="homepage">
                            <div className={'row row-cols-4 text-white p-2 shadow-sm mt-2'}>
                                {gamesLoaded && games?.map((game) => (
                                    <div className={'col cursor-pointer'}>
                                        <div
                                            className={'mt-1 mb-1 d-flex flex-column shadow-lg virtual-game-container'}>
                                            <Link to={`/nare-games/${game?.key}`}
                                                  className=""
                                                  key={game.key}>
                                                <p className={'text-center bold text-elipsis text-uppercase'}>
                                                    {game?.name}
                                                </p>
                                                <LazyLoadImage
                                                    src={getFastGamesImages(game.name)}
                                                    alt=""
                                                     alt="#"
                                                />
                                                <div className="overlay shadow-sm row">
                                                        <Button variant="warning">
                                                            Play Game
                                                        </Button>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
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