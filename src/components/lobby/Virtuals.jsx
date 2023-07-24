import makeRequest from "../utils/fetch-request";
import {getFromLocalStorage, setLocalStorage} from "../utils/local-storage";
import React, {useContext, useEffect, useState} from "react";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {StoreContext } from "../../context/store";
import LobbyLoader from "./LobbyLoader";

const Virtuals = React.memo(
    () => {
        const [categories, setCategories] = useState([])
        const [isOnline, setIsOnline] = useState(true)
        const { state, dispatch } = useContext(StoreContext);
        const [games, setGames] = useState([])
        const [user] = useState(getFromLocalStorage("user"));
        const fetchGames = async (category = 'rgs-vsb') => {
            let endpoint = "/v1/casino-games?game-type-id=" + category
            dispatch({type: "SET", key: 'virtuals_lobby_success', payload: true});
            let method = "GET"
            await makeRequest({url: endpoint, method: method}).then(([status, result]) => {
                if (status == undefined) {
                    setIsOnline(false)
                } else if (status === 200) {
                    dispatch({type: "SET", key: 'virtuals_lobby_success', payload: false});
                    setCategories(result.types)
                    setIsOnline(true)
                    setGames(result.data)
                    setLocalStorage('category_games', result.data)
                }
            });
        }

        const navigate = useNavigate()
        const launchGame = (game_id, live = true) => {

            user?.token ? navigate(`/gameplay/${game_id}/${live ? '1' : '0'}`) : navigate("/login");

        }

        useEffect(() => {
            const abort=new AbortController()
            fetchGames()
            return abort.abort();
        }, [])

        return (
            state?.virtuals_lobby_success===true?<LobbyLoader/>:games?.map((game, index) => (
                    <div className={'col-lg-2 col-md-4 col-sm-12 virtual-width'} key={index}>
                        <div
                            className={'mt-1 mb-1 d-flex flex-column shadow-lg virtual-game-container'}>
                            <div onClick={() => launchGame(game?.game_id, true)}
                                 className=""
                                 key={game.game_id}>
                                <p className={'text-center bold text-elipsis text-uppercase'}>
                                    {game?.game_name}
                                </p>
                                <LazyLoadImage src={`${game.game_icon}`}
                                               className={'virtual-game-image'}/>
                            </div>
                            <div className="overlay shadow-sm row">


                                <Button variant="overlay shadow-sm w-100 mt-1"
                                        onClick={() => launchGame(game?.game_id, true)}>
                                    Play Game
                                </Button>


                            </div>
                        </div>
                    </div>
                )
            )
        )
    })
export default React.memo(Virtuals)