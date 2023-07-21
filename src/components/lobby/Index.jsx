import React, {useContext, useEffect, useState} from 'react'
import './lobby.css'
import hero from '../../assets/img/lobby/Dropsandwinshomepage.jpeg'
import jetx from '../../assets/img/lobby/jetx.png'
import aviator from '../../assets/img/lobby/aviator.webp'
import fav from '../../assets/img/lobby/favorite.png'
import popular from '../../assets/img/lobby/popular.png'
import butterfly from '../../assets/img/lobby/jadebutterfly.png'
import footbalX from '../../assets/img/lobby/footballx.jpeg'
import league from '../../assets/img/lobby/nare-league.webp'
import spaceman from '../../assets/img/lobby/spacemanposter.png'
import Header from "../header/header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import makeRequest from "../utils/fetch-request";
import {setLocalStorage} from "../utils/local-storage";
import {Context} from "../../context/store";
import CasinoGames from "./CasinoGames";
import SmartSoftGames from "./SmartSoftGames";
import Virtuals from "./Virtuals";
import PopularCasinoGames from "./PopularCasinoGames";
import LobbyCategoriesAndFilters from "./LobbyCategoriesAndFilters";
import LobbyLoader from "./LobbyLoader"
import {NareGames} from "./NareGames";

const Index = React.memo(
    () => {
    const [state,]=useContext(Context)

    return (<>
            <Header lobby={true}/>
            <a id="carousel" name="carousel" href="/match?id=32930570">
                <img className="top-margin-lobby" style={{zIndex: "-1"}} id="animate" name="slide1" alt=""
                     height="100px" width="100%" src={hero}/>
            </a>

            <div className={"lobby-body-size"}>
             <LobbyCategoriesAndFilters/>
                <div className={'container-lobby w-100 d-flex flex-column'}>
                    <div className="lobby-title">
                        <span>
                            Favorite Games
                        </span>
                        <img style={{height: "25px", width: "25px"}} src={fav} alt=""/>
                    </div>
                    <div className="live-casino w-100" id="live-casino">
                        <CasinoGames/>
                    </div>
                    <div className="lobby-more">
					<span>
						show more
						<FontAwesomeIcon icon={faArrowRight}/>
					</span>
                    </div>
                </div>
                <div className={'container-lobby w-100 d-flex flex-column'}>
                    <div className="lobby-title">
                        <span>
                            X Games
                        </span>
                        <img style={{height: "25px", width: "25px"}} src={fav} alt=""/>
                    </div>
                    <div className="live-casino w-100" id="live-casino">
                        <SmartSoftGames/>
                    </div>
                    <div className="lobby-more">
					<span>
						show more
						<FontAwesomeIcon icon={faArrowRight}/>
					</span>
                    </div>

                </div>
                <div className={'container-lobby w-100 d-flex flex-column'}>
                    <div className="lobby-title">
                        <span>
                            Nare Games
                        </span>
                        <img style={{height: "25px", width: "25px"}} src={fav} alt=""/>
                    </div>
                    <div className="live-casino w-100" id="live-casino">
                       <NareGames/>
                    </div>
                    <div className="lobby-more">
					<span>
						show more
						<FontAwesomeIcon icon={faArrowRight}/>
					</span>
                    </div>

                </div>
                <div className={'container-lobby w-100 d-flex flex-column'}>
                    <div className="lobby-title">
                        <span>
                            Popular Games
                        </span>
                        <img style={{height: "25px", width: "25px"}} src={fav} alt=""/>
                    </div>
                    <div className="live-casino w-100" id="live-casino">
                        <PopularCasinoGames/>
                    </div>
                    <div className="lobby-more">
					<span>
						show more
						<FontAwesomeIcon icon={faArrowRight}/>
					</span>
                    </div>

                </div>
                <div className={'container-lobby w-100 d-flex flex-column'}>
                    <div className="lobby-title">
                        <span>
                            Virtuals
                        </span>
                        <img style={{height: "25px", width: "25px"}} src={fav} alt=""/>
                    </div>

                    <div className="live-casino w-100" id="live-casino">
                      <Virtuals/>
                    </div>
                    <div className="lobby-more">
					<span>
						show more
						<FontAwesomeIcon icon={faArrowRight}/>
					</span>
                    </div>

                </div>
            </div>

        </>

    )
})
export default React.memo(Index);