import React, {useEffect, useState} from "react";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import {Link, useParams} from "react-router-dom";
import makeRequest from "../../utils/fetch-request";
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {getFromLocalStorage} from "../../utils/local-storage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFire} from "@fortawesome/free-solid-svg-icons";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Button, ButtonGroup} from "react-bootstrap";
import SideBar from "../../sidebar/awesome/Sidebar";


const SmartSoft = (props) => {
    const {game_id, live} = useParams()

    const [categories, setCategories] = useState([])

    const [games, setGames] = useState([])

    const [isLoggedIn] = useState(getFromLocalStorage('user'))

    const [gamesLoaded, setGamesLoaded] = useState(false)

    const getSmartGames = async () => {

        let endpoint = '/v1/smartsoft-games'

        let method = "POST"

        await makeRequest({url: endpoint, method: method}).then(([status, result]) => {
            if (status === 200) {
                setGames(result?.games)
                setCategories(result?.gameCategory)
                console.log("results", result)
                setGamesLoaded(true)
            }
        });
    }

    useEffect(() => {
        getSmartGames()
    }, [])

    const getSmartGamesImages = (smart_images, folder = 'smart-soft') => {

        let smart_image;
        // console.log("smart", smart_images)
        let default_img = 'default_sport'
        try {

            smart_image = require(`../../../assets/img/${folder}/${smart_images}.png`);

        } catch (error) {
            // console.log("error",error) 
            smart_image = require(`../../../assets/img/${default_img}.svg`);

        }
        return smart_image
        
    }
    // const getCategoryGames = (category) => {
    //     setGames([])
    //     getSmartGames(category)
    // }
    

    


    return (
        <>
            <Header/>
            <div className="amt">
                <div className="d-flex flex-row ">
                    <SideBar loadCompetitions/>
                    <div className="gz home" style={{width: '100%'}}>
                        <div className="col-md-12 d-flex flex-column">
                    <div className="col-md-12">
                    
                        <div className="homepage smart-images">
                            <div className={'row row-cols-4 text-white p-2 shadow-sm mt-2'}>
                                {console.log("games",games )}
                                {gamesLoaded && games?.map((game) => (
                                    game.gameName!=="TripleSeven"&&
                                    <div className={'col cursor-pointer'}>
                                        <div
                                            className={'mt-1 mb-1 d-flex flex-column shadow-lg virtual-game-container'}>
                                            <Link to={{pathname:`/smart-play`, search: `game=${game?.gameName}&category=${game?.gameCategory}`}}
                                                  className=""
                                                  key={game.id}>
                                                <p className={'text-center bold text-elipsis text-uppercase'}>
                                                    {game?.gameName}
                                                </p>
                                                <LazyLoadImage
                                                    src={ getSmartGamesImages(game?.gameName.toLowerCase())}
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
                                ))}
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

export default SmartSoft