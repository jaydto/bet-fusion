import React, {useContext, useEffect, useState} from 'react'
import './lobby.css'
import hero from '../../assets/img/lobby/Dropsandwinshomepage.jpeg'
import fav from '../../assets/img/lobby/favorite.png'
import Header from "../header/header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import makeRequest from "../utils/fetch-request";
import {setLocalStorage} from "../utils/local-storage";
import {StoreContext } from "../../context/store";
import CasinoGames from "./CasinoGames";
import LobbyCategoriesAndFilters from "./LobbyCategoriesAndFilters";
import LobbyLoader from "./LobbyLoader";
const Index = React.memo(
    () => {

        const [categories, setCategories] = useState([])
        const [games, setGames] = useState([])

        const { state, dispatch } = useContext(StoreContext);

        const fetchGames = async () => {
            dispatch({type: "SET", key: 'filter_lobby_success', payload: true});
            let endpoint = "/v1/lobby"
            let method = "GET"
            await makeRequest({url: endpoint, method: method}).then(([status, result]) => {
                if (status === 200) {
                    dispatch({type: "SET", key: 'filter_lobby_success', payload: false});
                    // console.log("casino_games",result)
                    setCategories(result?.categories)
                    setGames(result?.games)
                    setLocalStorage('lobby_category_games', result.games)
                    setLocalStorage('lobby_categories', result.categories)
                }
            });
        }


        useEffect(() => {
            const abort = new AbortController()
            fetchGames()
            return () => {
                abort.abort(); // Cleanup function to abort the controller when the component unmounts.
            };
        }, [])

        return (<>
                <Header lobby={true}/>
                <a id="carousel" name="carousel" href="/match?id=32930570">
                    <img className="top-margin-lobby" style={{zIndex: "-1"}} id="animate" name="slide1" alt=""
                         height="100px" width="100%" src={hero}/>
                </a>

                <div className={"lobby-body-size"}>
                    <LobbyCategoriesAndFilters category_data={categories}/>

                    {/*{console.log("games", games)}*/}

                    {games&&games?.map((game)=>(
                        game?.games_data.length>0&&
                        <div className={'container-lobby w-100 d-flex flex-column'}>
                            <div className="lobby-title">
                        <span>
                            {game?.game_category}
                        </span>
                                <img style={{height: "25px", width: "25px"}} src={fav} alt=""/>
                            </div>
                            <div className="live-casino w-100" id="live-casino">
                                <CasinoGames game_display_data={game?.games_data}/>
                            </div>
                            <div className="lobby-more">
					<span>
						show more
						<FontAwesomeIcon icon={faArrowRight}/>
					</span>
                            </div>
                        </div>
                    ))
                    }


                    {/*<div className={'container-lobby w-100 d-flex flex-column'}>*/}
                    {/*    <div className="lobby-title">*/}
                    {/*        <span>*/}
                    {/*            X Games*/}
                    {/*        </span>*/}
                    {/*        <img style={{height: "25px", width: "25px"}} src={fav} alt=""/>*/}
                    {/*    </div>*/}
                    {/*    <div className="live-casino w-100" id="live-casino">*/}
                    {/*        <SmartSoftGames/>*/}
                    {/*    </div>*/}
                    {/*    <div className="lobby-more">*/}
                    {/*	<span>*/}
                    {/*		show more*/}
                    {/*		<FontAwesomeIcon icon={faArrowRight}/>*/}
                    {/*	</span>*/}
                    {/*    </div>*/}

                    {/*</div>*/}
                    {/*<div className={'container-lobby w-100 d-flex flex-column'}>*/}
                    {/*    <div className="lobby-title">*/}
                    {/*        <span>*/}
                    {/*            Nare Games*/}
                    {/*        </span>*/}
                    {/*        <img style={{height: "25px", width: "25px"}} src={fav} alt=""/>*/}
                    {/*    </div>*/}
                    {/*    <div className="live-casino w-100" id="live-casino">*/}
                    {/*       <NareGames/>*/}
                    {/*    </div>*/}
                    {/*    <div className="lobby-more">*/}
                    {/*	<span>*/}
                    {/*		show more*/}
                    {/*		<FontAwesomeIcon icon={faArrowRight}/>*/}
                    {/*	</span>*/}
                    {/*    </div>*/}

                    {/*</div>*/}
                    {/*<div className={'container-lobby w-100 d-flex flex-column'}>*/}
                    {/*    <div className="lobby-title">*/}
                    {/*        <span>*/}
                    {/*            Popular Games*/}
                    {/*        </span>*/}
                    {/*        <img style={{height: "25px", width: "25px"}} src={fav} alt=""/>*/}
                    {/*    </div>*/}
                    {/*    <div className="live-casino w-100" id="live-casino">*/}
                    {/*        <PopularCasinoGames/>*/}
                    {/*    </div>*/}
                    {/*    <div className="lobby-more">*/}
                    {/*	<span>*/}
                    {/*		show more*/}
                    {/*		<FontAwesomeIcon icon={faArrowRight}/>*/}
                    {/*	</span>*/}
                    {/*    </div>*/}

                    {/*</div>*/}
                    {/*<div className={'container-lobby w-100 d-flex flex-column'}>*/}
                    {/*    <div className="lobby-title">*/}
                    {/*        <span>*/}
                    {/*            Virtuals*/}
                    {/*        </span>*/}
                    {/*        <img style={{height: "25px", width: "25px"}} src={fav} alt=""/>*/}
                    {/*    </div>*/}

                    {/*    <div className="live-casino w-100" id="live-casino">*/}
                    {/*      <Virtuals/>*/}
                    {/*    </div>*/}
                    {/*    <div className="lobby-more">*/}
                    {/*	<span>*/}
                    {/*		show more*/}
                    {/*		<FontAwesomeIcon icon={faArrowRight}/>*/}
                    {/*	</span>*/}
                    {/*    </div>*/}

                    {/*</div>*/}
                </div>

            </>

        )
    })
export default React.memo(Index);