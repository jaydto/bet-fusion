import React, {useEffect, useState, useContext} from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import {Link, useLocation, useParams} from "react-router-dom";
import makeRequest from "../utils/fetch-request";
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {getFromLocalStorage} from "../utils/local-storage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFire} from "@fortawesome/free-solid-svg-icons";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Button, ButtonGroup} from "react-bootstrap";
import SideBar from "../sidebar/awesome/Sidebar";
import { Context } from "../../context/store";
import LoginModal from "../modals/LoginModal";

const ShaksGames = (props) => {
    const {game_id, live} = useParams()
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const [state, dispatch] = useContext(Context);
    const [games, setGames] = useState([])
    const [location, setLocation]=useState(null)
    const locationH = useLocation();
    const [gamesLoaded, setGamesLoaded] = useState(false)

    const getShaksGames = async () => {

        let endpoint = '/v1/shacksgames'

        let method = "POST"

        await makeRequest({url: endpoint, method: method}).then(([status, result]) => {
            if (status === 200) {
                setGames(result?.games)
                setGamesLoaded(true)
            }
        });
    }
    // console.log("games", games)

    useEffect(() => {
        getShaksGames()
    }, [])

    const getFastGamesImages = (game, folder = 'shaks') => {

        let shaks_image;
        try {

            shaks_image = require(`../../assets/img/${folder}/${game.toLowerCase()}.png`);

        } catch (error) {
            // console.log("error",error)

        }
        return shaks_image
    }

    
    useEffect(()=>{
        setLocation(locationH.pathname)
    })
    
    // console.log("location", location)
    const LoginCheck = (game) => {
        

        state?.user!==null?window.location.href=`/shaks/${game}`:setShowLoadingModal(true);

      };

    return (
        <>
            {showLoadingModal && ( <LoginModal setShowLoadingModal={setShowLoadingModal} visible={showLoadingModal} location={location}/>)}
            {gamesLoaded && games?.map((game) => (
                <div className={'col cursor-pointer'}>
                    <div
                        className={'mt-1 mb-1 d-flex flex-column shadow-lg virtual-game-container'}>
                        <Link to='#'
                                className=""
                                onClick={()=>LoginCheck(game?.name)}
                                key={game.display}>
                            <p className={'text-center bold text-elipsis text-uppercase'}>
                                {game?.name}
                            </p>
                            <LazyLoadImage
                                src={getFastGamesImages(game.name)}
                                alt=""
                                // style={state?.user==null?{filter:"brightness(0.5)"}:{}}
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
                            
        </>
    )
}

export default ShaksGames