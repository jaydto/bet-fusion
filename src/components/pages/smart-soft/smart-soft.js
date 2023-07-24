import React, {useContext, useEffect, useState} from "react";
import Header from "../../header/header";
import {Link, useNavigate} from "react-router-dom";
import makeRequest from "../../utils/fetch-request";
import 'react-loading-skeleton/dist/skeleton.css'
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Button} from "react-bootstrap";
import SearchComponent from "./searchField";
import {StoreContext } from "../../../context/store"
import SideBar from "../../sidebar/awesome/Sidebar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";

const SmartSoft = React.memo(
    () => {

    const [games, setGames] = useState([])
    const [state,]=useContext(StoreContext )
    const [gamesLoaded, setGamesLoaded] = useState(false)

    const getSmartGames = async () => {

        let endpoint = '/v1/smartsoft-games'

        let method = "POST"

        await makeRequest({url: endpoint, method: method}).then(([status, result]) => {
            if (status === 200) {
                setGames(result?.games)
                setGamesLoaded(true)
            }
        });
    }

    useEffect(() => {
        getSmartGames()
    }, [])

const navigate=useNavigate()

    return (
        <>
            <Header/>
            <div className="amt top-smartsoft">
                <div className="d-flex flex-row ">
                    <div className="gz home z" style={{width: '100%'}}>
                        <div className="col-md-12 d-flex flex-column">
                            <div className="col-md-12 d-flex">
                                <div className="stats-desktop"><SideBar loadCompetitions/></div>

                                <div className="homepage smart-images">
                                    <div className={'d-flex w-100 flex-column justify-content-between xgames-container'}>
                                        <div className={'d-flex'}>
                                            <span className={'px-3 remove-backbutton-on-desktop'} onClick={()=>navigate('/')}>
                                             <FontAwesomeIcon icon={faAngleLeft} style={{fontSize:"24px",color:'var(--light)', fontWeight:'700', opacity:'0.7'}}/>
                                            </span>
                                            <span className={'col-12 justify-content-center d-flex mb-4'}  id={'xgames-header'}>
                                            X-GAMES
                                            </span>
                                        </div>

                                        <div className={'d-flex align-items-end w-100'}>
                                            <SearchComponent data={games}/>
                                        </div>


                                    </div>
                                    <div className={'row row-cols-4 text-white p-2 shadow-sm mt-2 smart-soft-games-container'}>

                                        {gamesLoaded &&
                                            (state?.smartsoft_search!==undefined&&state?.smartsoft_search.length>0?state?.smartsoft_search?.map((search_game,index)=>(
                                                    search_game?.gameName!=="TripleSeven"&&
                                                    <div key={index} className={'col-6 cursor-pointer smart-soft-game'}>
                                                        <div
                                                            className={'mt-1 mb-1 d-flex flex-column shadow-lg virtual-game-container'}>
                                                            <Link to={{pathname:`/smart-play`, search: `game=${search_game?.gameName}&category=${search_game?.gameCategory}`}}
                                                                  className=""
                                                                  key={search_game.id}>
                                                                <p className={'text-center bold text-elipsis text-uppercase'}>
                                                                    {search_game?.gameName}
                                                                </p>
                                                                <LazyLoadImage
                                                                    className={'smart-soft-image-size'}
                                                                    src={ (search_game?.image_url)}
                                                                    alt="smart-soft"

                                                                />
                                                                <div className="overlay shadow-sm w-100 mt-1">
                                                                    <Button variant="warning" className={"w-100"}>
                                                                        Play Game
                                                                    </Button>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>)):
                                                games?.map((game,index) => (
                                                    game.gameName!=="TripleSeven"&&
                                                    <div key={index} className={'col-lg-3 col-md-6 col-sm-6 cursor-pointer smart-soft-game'}>
                                                        <div
                                                            className={'mt-1 mb-1 d-flex flex-column shadow-lg virtual-game-container'}>
                                                            <Link to={{pathname:`/smart-play`, search: `game=${game?.gameName}&category=${game?.gameCategory}`}}
                                                                  className=""
                                                                  key={game.id}>
                                                                <p className={'text-center bold text-elipsis text-uppercase'}>
                                                                    {game?.gameName}
                                                                </p>
                                                                <LazyLoadImage
                                                                    className={'smart-soft-image-size'}
                                                                    src={ (game?.image_url)}
                                                                    alt="smart-soft"

                                                                />
                                                                <div className="overlay shadow-sm w-100 mt-1">
                                                                    <Button variant="warning" className={"w-100"}>
                                                                        Play Game
                                                                    </Button>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                )))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

export default React.memo(SmartSoft)