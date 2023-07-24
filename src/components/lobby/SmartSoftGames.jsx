import React, {useContext, useEffect, useState} from "react";
import {StoreContext } from "../../context/store";
import makeRequest from "../utils/fetch-request";
import {Link} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Button} from "react-bootstrap";
import LobbyLoader from "./LobbyLoader";

const SmartSoftGames = React.memo(
	() => {

	// smartsoft gmes endpoint
	const [smartGames, setSmartGames] = useState([])
	const { state, dispatch } = useContext(StoreContext);
	const [smartGamesLoaded, setSmartGamesLoaded] = useState(false)

	const getSmartGames = async () => {

		let endpoint = '/v1/smartsoft-games'

		let method = "POST"
		dispatch({type: "SET", key: 'smart_lobby_success', payload: true});

		await makeRequest({url: endpoint, method: method}).then(([status, result]) => {
			if (status === 200) {
				dispatch({type: "SET", key: 'smart_lobby_success', payload: false});
				setSmartGames(result?.games)
				setSmartGamesLoaded(true)
			}
		});
	}

	useEffect(() => {
		const abort=new AbortController()
		getSmartGames()
		return () => {
                abort.abort(); // Cleanup function to abort the controller when the component unmounts.
            };;
	}, [])

	return (
		state?.smart_lobby_success===true?<LobbyLoader/>:smartGamesLoaded&&
		(state?.smartsoft_search!==undefined&&state?.smartsoft_search.length>0?state?.smartsoft_search?.map((search_game,index)=>(
				search_game?.gameName!=="TripleSeven"&&
				<div key={index} className={'col-md-3 col-sm-4 col-lg-2 col- virtual-width'}>
					<div
						className={'mt-1 mb-1 d-flex flex-column shadow-lg virtual-game-container'}>
						<Link to={{pathname:`/smart-play`, search: `game=${search_game?.gameName}&category=${search_game?.gameCategory}`}}
							  className=""
							  key={search_game.id}>
							<p className={'text-center bold text-elipsis text-uppercase'}>
								{search_game?.gameName}
							</p>
							<LazyLoadImage
								className={'virtual-game-image'}
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
			smartGames?.map((game,index) => (
				game.gameName!=="TripleSeven"&&
				<div key={index} className={'col-lg-3 col-md-6 col-sm-6 cursor-pointer smart-soft-game'}>
					<div
						className={'mt-1 mb-1 d-flex flex-column shadow-lg virtual-game-container'}>
						<Link to={{pathname:`/smart-play`, search: `game=${game?.gameName}&category=${game?.gameCategory}`}}
							  className=""
							  key={game.id}>
							<p className={'text-center bold text-elipsis text-uppercase'}>
								{smartGames?.gameName}
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
			)))
	)
})
export default React.memo(SmartSoftGames)