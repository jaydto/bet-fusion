import React, {useContext, useEffect, useState} from 'react';
import Header from "../../header/header";
import makeRequest from "../../utils/fetch-request";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import { setLocalStorage} from "../../utils/local-storage";
import { Button, ButtonGroup} from "react-bootstrap";
import SearchComponent from "./searchField";
import {Context} from "../../../context/store";
import SideBar from "../../sidebar/awesome/Sidebar";

const Casino = () => {

    const [categories, setCategories] = useState([])

    const [games, setGames] = useState([])

    const [state,dispatch]=useContext(Context)

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
        fetchGames(category?.game_type_id)
    }


    const launchGame = (game_id, live = true) => {
        return  window.location.href= `/gameplay/${game_id}/${live ? '1' : '0'}`;
    }

    useEffect(() => {
        fetchGames()
    }, [])
    return (

        <>
            <Header />
<div>
    <div className={"d-flex"}>
        <div className="stats-desktop"><SideBar loadCompetitions/></div>
        <div className="gz home top-spacing " style={{width: '100%'}}>
            <div className="homepage ">
                <div className="col-md-12 d-flex flex-column mt-2">
                    <div className={'d-flex w-100 flex-column justify-content-between nare-header-container'}>
                        <span className={'col-12 justify-content-center d-flex'}  id={'nare-games-header'}> CASINO</span>

                    </div>
                    <div className="col-md-12 casino-scroll" >
                        <div
                            className="shadow-sm p-2 shadow-sm casino-category-container mt-2">
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
                    <div className={'d-flex align-items-end '}>
                        <SearchComponent data={games}/>
                    </div>
                    <div className="col">
                        <div className={'row text-white p-2 shadow-sm'}>
                            {state?.casino_search!==undefined&&state?.casino_search.length>0?state?.casino_search?.map((search_game)=>(
                                    search_game?.game_id=="rgs-vsv"?"":
                                        <div className={'col-md-4 col-lg-3 col-sm-4 virtual-width'}>
                                            <div
                                                className={'mt-1 mb-1 d-flex flex-column shadow-lg virtual-game-container'}>
                                                <div onClick={() => launchGame(search_game?.game_id, true)}
                                                     className=""
                                                     key={search_game.game_id}>
                                                    <p className={'text-center bold text-elipsis text-uppercase'}>
                                                        {search_game?.game_name}
                                                    </p>
                                                    <LazyLoadImage src={`${search_game.game_icon}`}
                                                                   className={'virtual-game-image'}/>
                                                </div>
                                                <div className="overlay shadow-sm row">
                                                    <ButtonGroup aria-label="Basic example">
                                                        <Button variant="warning"
                                                                onClick={() => launchGame(search_game?.game_id, false)}>
                                                            Play Demo
                                                        </Button>
                                                        <Button variant="danger"
                                                                onClick={() => launchGame(search_game?.game_id, true)}>
                                                            Play Game
                                                        </Button>
                                                    </ButtonGroup>
                                                </div>
                                            </div>
                                        </div>
                                ))
                                : games?.map((game) => (
                                        game?.game_id=="rgs-vsv"?"":
                                            <div className={'col-md-3 col-sm-4 col-lg-2 col- virtual-width'}>
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


        </>
    )

}


export default Casino;