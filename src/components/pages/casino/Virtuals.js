import React, {useEffect, useState,useContext} from 'react';
import Header from "../../header/header";
import makeRequest from "../../utils/fetch-request";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {getFromLocalStorage, setLocalStorage} from "../../utils/local-storage";
import {Button} from "react-bootstrap";
import {toast, ToastContainer} from "react-toastify";
import { useLocation } from 'react-router-dom';
import SearchComponent from "./searchField";
import {Context} from "../../../context/store";
import SideBar from "../../sidebar/awesome/Sidebar";

const Virtuals = (props) => {

    const [user] = useState(getFromLocalStorage("user"));

    const [categories, setCategories] = useState([])

    const [state]=useContext(Context)

    const [games, setGames] = useState([])
    const [isOnline, setIsOnline]=useState(true)

    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const [location, setLocation]=useState(null)

    const locationH = useLocation();

    useEffect(()=>{
        setLocation(locationH.pathname)
    })

    const fetchGames = async (category = 'rgs-vsb') => {
        let endpoint = "/v1/casino-games?game-type-id=" + category
        let method = "GET"
        await makeRequest({url: endpoint, method: method}).then(([status, result]) => {
            if(status==undefined){
                setIsOnline(false)
            }
            else if (status === 200) {
                setCategories(result.types)
                setIsOnline(true)
                setGames(result.data)
                setLocalStorage('category_games', result.data)
            }
        });
    }

    const launchGame = (game_id, live = true) => {

        user?.token?window.location.href= `/gameplay/${game_id}/${live ? '1' : '0'}`:setShowLoadingModal(true);

    }

    useEffect(() => {
        fetchGames()
    }, [])

    return (
        <>
            <Header/>
            {/* <OnlineCheck setIsOnline={setIsOnline} isOnline={isOnline}/> */}
            {/*{showLoadingModal && ( <LoginModal setShowLoadingModal={setShowLoadingModal} visible={showLoadingModal} location={location}/>)}*/}
            <ToastContainer/>
            <div className={'d-flex'}>
                <div className="stats-desktop top-spacing"><SideBar loadCompetitions/></div>
                <div className="d-flex flex-row">
                    <div className="gz home top-spacing" style={{width: '100%'}}>
                        <div className="homepage">
                            <div className="col-md-12 d-flex flex-column">
                                <div className="col-md-12">

                                    <div className={'cursor-pointer shadow-sm d-flex flex-column w-100 justify-content-between nare-header-container' } >
                                        <span className={'col-12 justify-content-center d-flex'}  id={'nare-games-header'} > VIRTUALS</span>
                                        <div className={'d-flex align-items-end w-100'}>
                                            <SearchComponent data={games}/>
                                        </div>

                                    </div>
                                </div>
                                <div className="col">
                                    <div className={'row text-white p-2 shadow-sm virtual-size'}>
                                        {state?.casino_search!==undefined&&state?.casino_search.length>0?state?.casino_search?.map((search_game)=>(
                                                <div className={'col-md-2 virtual-width'}>
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


                                                            <Button variant="warning" style={{background:"#EC5B0B", color:"#fff"}}
                                                                    onClick={() => launchGame(search_game?.game_id, true)}>
                                                                Play Game
                                                            </Button>


                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                            :
                                            games?.map((game) => (
                                                    <div className={'col-md-2 virtual-width'}>
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


                                                                <Button variant="warning" style={{background:"#EC5B0B", color:"#fff"}}
                                                                        onClick={() => launchGame(game?.game_id, true)}>
                                                                    Play Game
                                                                </Button>


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


export default Virtuals;