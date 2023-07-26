import React, {useContext, useEffect, useState} from "react";
import makeRequest from "../utils/fetch-request";
import {setLocalStorage} from "../utils/local-storage";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Button, ButtonGroup} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {StoreContext } from "../../context/store";
import LobbyLoader from "./LobbyLoader";

const CasinoGames = React.memo(
    (props) => {
        const {game_display_data}=props
        // casino games fetchgames
        // const [casinoCategories, setCasinoCategories] = useState([])
        const { state, dispatch } = useContext(StoreContext);

        // const [casinoGames, setCasinoGames] = useState([])
        //
        // const fetchCasinoGames = async (category = 'vs') => {
        //     dispatch({type: "SET", key: 'casino_lobby_success', payload: true});
        //     let endpoint = "/v1/casino-games?game-type-id=" + category
        //     let method = "GET"
        //     await makeRequest({url: endpoint, method: method}).then(([status, result]) => {
        //         if (status === 200) {
        //             dispatch({type: "SET", key: 'casino_lobby_success', payload: false});
        //             setCasinoGames(result.data)
        //         }
        //     });
        // }
        // useEffect(() => {
        //     const abort=new AbortController()
        //     fetchCasinoGames()
        //     return () => {

        // }, [])

        const navigate = useNavigate()
        const launchGame = (game_id, live = true) => {
            return navigate(`/gameplay/${game_id}/${live ? '1' : '0'}`)
        }

        return (
            game_display_data&&game_display_data?.map((game, index) => (
                        <div key={index} className={'col-md-3 col-sm-4 col-lg-2 col- virtual-width'}>
                            <div
                                className={'mt-1 mb-1 d-flex flex-column shadow-lg virtual-game-container'}>
                                <div onClick={() => launchGame(game?.game_id, true)}
                                     className=""
                                     key={game.game_id}>
                                    <p className={'text-center bold text-elipsis text-uppercase'}>
                                        {game?.game_name}
                                    </p>
                                    <LazyLoadImage src={`${game?.image_url}`} className={'virtual-game-image'}/>
                                </div>
                                <div className="overlay shadow-sm ">
                                    <ButtonGroup aria-label="Basic example">
                                        <Button variant="warning"
                                                onClick={() => launchGame(game?.game_id, false)}>
                                            Play Demo
                                        </Button>
                                        <Button variant="danger"
                                                onClick={() => launchGame(game?.game_id, true)}>
                                            Play Game
                                        </Button>
                                    </ButtonGroup>
                                </div>
                            </div>
                        </div>
                )
            )
        )
    })
export default React.memo(CasinoGames)