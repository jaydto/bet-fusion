import React, {useContext, useEffect, useState} from 'react';
import Header from "../../header/header";
import makeRequest from "../../utils/fetch-request";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {getFromLocalStorage, setLocalStorage} from "../../utils/local-storage";
import {Button} from "react-bootstrap";
import {ToastContainer} from "react-toastify";
import {useLocation, useNavigate} from 'react-router-dom';
import SearchComponent from "./searchField";
import {StoreContext } from "../../../context/store"
import SideBar from "../../sidebar/awesome/Sidebar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";

const Virtuals = React.memo(
    (props) => {


        const [categories, setCategories] = useState([])

        const {state} = useContext(StoreContext )

        const [games, setGames] = useState([])
        const [isOnline, setIsOnline] = useState(true)

        const [showLoadingModal, setShowLoadingModal] = useState(false);
        const [location, setLocation] = useState(null)

        const locationH = useLocation();
        const userData=useSelector((state)=>state.data.user)
        const [user, setUser]=useState(getFromLocalStorage("user"))

        useEffect(()=>{
            if(userData){
                setUser(userData||getFromLocalStorage("user"))
            }
        }, [userData])

        useEffect(() => {
            setLocation(locationH.pathname)
        })

        const fetchGames = async (category = 'rgs-vsb') => {
            let endpoint = "/v1/casino-games?game-type-id=" + category
            let method = "GET"
            await makeRequest({url: endpoint, method: method}).then(([status, result]) => {
                if (status == undefined) {
                    setIsOnline(false)
                } else if (status === 200) {
                    setCategories(result.types)
                    setIsOnline(true)
                    setGames(result.data)
                    setLocalStorage('category_games', result.data)
                }
            });
        }

        const launchGame = (game_id, live = true) => {

            user?.token ? window.location.href = `/gameplay/${game_id}/${live ? '1' : '0'}` : setShowLoadingModal(true);

        }

        useEffect(() => {
            fetchGames()
        }, [])

        const navigate=useNavigate()
        return (
            <>
                <Header/>
                <ToastContainer/>
                <div className={'d-flex'}>
                    <div className="d-flex flex-row">
                        <div className="gz home top-spacing-virtuals d-flex" style={{width: '100%'}}>
                            <div className="stats-desktop "><SideBar loadCompetitions/></div>
                            <div className="homepage">
                                <div className="col-md-12 d-flex flex-column">
                                    <div className="col-md-12">

                                        <div
                                            className={'cursor-pointer shadow-sm d-flex flex-column w-100 justify-content-between nare-header-container'}>
                                            <div className={'d-flex align-items-center mb-4'}>
                                            <span className={'px-3 remove-backbutton-on-desktop'} onClick={() => navigate('/')}>
                                             <FontAwesomeIcon icon={faAngleLeft} style={{
                                                 fontSize: "24px",
                                                 color: 'var(--light)',
                                                 fontWeight: '700',
                                                 opacity: '0.7'
                                             }}/>
                                            </span>
                                                <span className={'col-12 justify-content-center d-flex'}
                                                      id={'nare-games-header'}> VIRTUALS</span>
                                            </div>
                                            <div className={'d-flex align-items-end w-100'}>
                                                <SearchComponent data={games}/>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className={'row text-white p-2 shadow-sm virtual-size'}>
                                            {state?.casino_search !== undefined && state?.casino_search.length > 0 ? state?.casino_search?.map((search_game, index) => (
                                                    <div className={'col-lg-2 col-md-6 col-sm-6 virtual-width'} key={index}>
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


                                                                <Button variant="warning"
                                                                        style={{background: "#EC5B0B", color: "#fff"}}
                                                                        onClick={() => launchGame(search_game?.game_id, true)}>
                                                                    Play Game
                                                                </Button>


                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                                :
                                                games?.map((game, index) => (
                                                        <div className={'col-lg-2 col-md-4 col-sm-12 virtual-width'}
                                                             key={index}>
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


                                                                    <Button variant="warning"
                                                                            style={{background: "#EC5B0B", color: "#fff"}}
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

    })


export default React.memo(Virtuals);