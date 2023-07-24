import makeRequest from "../utils/fetch-request";
import React, {useContext, useEffect, useState} from "react";
import {StoreContext } from "../../context/store";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Button} from "react-bootstrap";
import {getFromLocalStorage} from "../utils/local-storage";
import {Link, useNavigate} from "react-router-dom";
import LobbyLoader from "./LobbyLoader";
export const NareGames = () => {
	const { state, dispatch } = useContext(StoreContext);
	const [games, setGames] = useState([])
	const [isOnline, setIsOnline]=useState(true)
	const [user] = useState(getFromLocalStorage("user"));

	const [gamesLoaded, setGamesLoaded] = useState(false)
	const getFastGames = async () => {
		dispatch({type: "SET", key: 'nare_lobby_success', payload: true});

		let endpoint = '/v1/fast-games'

		let method = "POST"

		await makeRequest({url: endpoint, method: method}).then(([status, result]) => {
			 if (status === 200) {
				dispatch({type: "SET", key: 'nare_lobby_success', payload: false});
				setGames(result?.games)
				setIsOnline(true)
				setGamesLoaded(true)
			}
		});
	}
	const navigate=useNavigate()
	const launchGame = (game_id, live = true) => {
		user?.token?navigate(`/gameplay/${game_id}/${live ? '1' : '0'}`):navigate("/login")
	}

	useEffect(() => {
		const abort=new AbortController()
		getFastGames()
		return () => {
                abort.abort(); // Cleanup function to abort the controller when the component unmounts.
            };;
	}, [])

	const getFastGamesImages = (nare_games, folder = 'fast-games') => {
		const nareimage=String(nare_games)?.toLowerCase()
		let nare_image;
		try {

			nare_image = `https://storage.googleapis.com/nareimages/spribe/${nareimage}.webp`;

		} catch (error) {
			console.log("error",error)

		}
		return nare_image
	}
	return (
		state?.nare_lobby_success===true?<LobbyLoader/>: games?.map((game,index) => (
			<div key={index} className={'col-md-3 col-sm-4 col-lg-2 col- virtual-width'}>
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
							className={"virtual-game-image"}
						/>
						<div className="overlay shadow-sm w-100">
							<Button variant="warning w-100">
								Play Game
							</Button>
						</div>
					</Link>
				</div>
			</div>
		)))
}