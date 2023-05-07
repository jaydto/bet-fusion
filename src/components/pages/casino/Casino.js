import React, {useEffect, useState} from 'react';
import Header from "../../header/header";
import Footer from "../../footer/footer";
import makeRequest from "../../utils/fetch-request";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import SideBar from "../../sidebar/awesome/Sidebar";
import {getFromLocalStorage, setLocalStorage} from "../../utils/local-storage";
import Notify from "../../utils/Notify";
import {Button, ButtonGroup} from "react-bootstrap";

const Casino = (props) => {

    const [user] = useState(getFromLocalStorage("user"));

    const [categories, setCategories] = useState([])
    const [checkGame, setCheckGame]=useState('')

    const [games, setGames] = useState([])

    const fetchGames = async (category = 'vs') => {
        let endpoint = "/v1/casino-games?game-type-id=" + category
        let method = "GET"
        await makeRequest({url: endpoint, method: method}).then(([status, result]) => {
            if (status === 200) {
                setCategories(result.types)
                setGames(result.data)
                setLocalStorage('category_games', result.data)
            }
        });
    }

    const getCategoryGames = (category) => {
        setGames([])
        setCheckGame(category?.game_type_id)
        fetchGames(category?.game_type_id)
    }

    const showLoginNotification = () => {
        let message = {
            status: 500,
            message: "Please Log In to continue."
        }
        Notify(message)
    }

    const launchGame = (game_id, live = true) => {

        const userState = (getFromLocalStorage("user"));

        if (userState?.token) {
            return window.location.href = `/gameplay/${game_id}/${live ? '1' : '0'}`
        }

        return showLoginNotification()
    }

    useEffect(() => {
        fetchGames()
    }, [])

    return (
        <>
            <Header/>
            <div className="amt">
                <div className="d-flex flex-row">
                    <SideBar loadCompetitions/>
                    <div className="gz home" style={{width: '100%'}}>
                        <div className="homepage">
                            <div className="col-md-12 d-flex flex-column">
                                <div className="col-md-12 d-flex casino-scroll" >
                                    <div
                                        className="shadow-sm p-2 shadow-sm casino-category-container mt-2 w-100">

                                        {categories?.map((category) => (
                                            category?.game_type_id !== "rgs-vsb"
                                            && <Button bg="warning"
                                                       style={{marginRight: '2px'}}
                                                       className={`cursor-pointer text-center casino-category casino-category-button`}
                                                       onClick={() => getCategoryGames(category)}>
                                                {(category?.game_type_description)}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                                <div className="col">
                                    <div className={'row text-white p-2 shadow-sm'}>
                                        {games?.map((game) => (
                                                <div className={'col-md-2'}>
                                                    <div
                                                        className={'mt-1 mb-1 d-flex flex-column shadow-lg virtual-game-container'}>
                                                        <div onClick={() => launchGame(game?.game_id, true)}
                                                             className=""
                                                             key={game.game_id}>
                                                            <p className={'text-center bold text-elipsis text-uppercase'}>
                                                                {game?.game_name}
                                                            </p>
                                                            {/* {console.log("categories",checkGame)} */}
                                                            <LazyLoadImage src={`${checkGame=="drops-n-wins"?game?.drops_and_wins_image_url:game?.game_icon}`}
                                                                           className={'virtual-game-image'}/>
                                                        </div>
                                                        <div className="overlay shadow-sm row">
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
                                        )}
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


export default Casino;