import React, {useContext, useEffect, useState} from "react";
import Header from "../../header/header";
import {Link} from "react-router-dom";
import makeRequest from "../../utils/fetch-request";
import 'react-loading-skeleton/dist/skeleton.css'
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Button} from "react-bootstrap";
import useWindowDimensions from "../../header/Dimensions";
import {Context} from "../../../context/store";
import SearchComponent from "./searchField";
import SideBar from "../../sidebar/awesome/Sidebar";

const SpribeGame = React.memo(
    () => {

    const [games, setGames] = useState([])
    const [isOnline, setIsOnline]=useState(true)
    const [state,]=useContext(Context)

    const [gamesLoaded, setGamesLoaded] = useState(false)
    const {height, width} = useWindowDimensions();

    const getFastGames = async () => {

        let endpoint = '/v1/fast-games'

        let method = "POST"

        await makeRequest({url: endpoint, method: method}).then(([status, result]) => {
            if(status==undefined){
                setIsOnline(false)
            }
            else if (status === 200) {
                setGames(result?.games)
                setIsOnline(true)
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

            nare_image = require(`../../../../src/assets/img/${folder}/${nare_games.toLowerCase()}.webp`);

        } catch (error) {
            console.log("error",error)

        }
        return nare_image
    }
    let playgame=true;
    return (
        <>
            <Header playgame={playgame}/>
            {/* <OnlineCheck setIsOnline={setIsOnline} isOnline={isOnline}/> */}
            <div>
                <div className="d-flex flex-row ">
                    <div className="stats-desktop top-nare-games">
                        <SideBar loadCompetitions/>
                    </div>
                    <div className="gz home " style={{width: '100%'}}>
                        <div className="col-md-12 d-flex flex-column">
                            <div className="col-md-12">
                                <div className="homepage top-nare-games">
                                    <div className={`  row ${width<767?"row-cols-2":"row-cols-4 "}  text-white p-2 shadow-sm mt-2`}>
                                        {/* <ShaksGames/> */}
                                        <div className={'d-flex w-100 flex-column justify-content-between nare-header-container'}>
                                            <span className={'col-12 justify-content-center d-flex'}  id={'nare-games-header'}> NARE-GAMES</span>
                                            <div className={'d-flex align-items-end w-100'}>
                                                <SearchComponent data={games}/>
                                            </div>


                                        </div>
                                        {gamesLoaded &&
                                            (state?.naregames_search!==undefined&&state?.naregames_search.length>0?state?.naregames_search?.map((search_game,index)=>(
                                                    <div className={'col cursor-pointer'} key={index}>
                                                        <div
                                                            className={'mt-1 mb-1 d-flex flex-column shadow-lg virtual-game-container'}>
                                                            <Link to={{pathname:`/nare-game`, search: `game=${search_game?.key}`}}
                                                                  className=""
                                                                  key={search_game.key}>
                                                                <p className={'text-center bold text-elipsis text-uppercase'}>
                                                                    {search_game?.name}
                                                                </p>
                                                                <LazyLoadImage
                                                                    src={getFastGamesImages(search_game.name)}
                                                                    alt=""
                                                                    alt="#"
                                                                />
                                                                <div className="overlay shadow-sm w-100">
                                                                    <Button variant="warning w-100">
                                                                        Play Game
                                                                    </Button>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                )):
                                                games?.map((game,index) => (
                                                    <div key={index} className={'col cursor-pointer'}>
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
                                                                <div className="overlay shadow-sm w-100">
                                                                    <Button variant="warning w-100">
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

export default React.memo(SpribeGame)