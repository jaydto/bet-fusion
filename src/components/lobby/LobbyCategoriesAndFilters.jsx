import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../context/store";
import makeRequest from "../utils/fetch-request";
import {setLocalStorage} from "../utils/local-storage";
import {Button} from "react-bootstrap";
import LobbySearchField from "./lobbySearchField";

const LobbyCategoriesAndFilters = React.memo(
	() => {

	const [categories, setCategories] = useState([])

	const [state,dispatch]=useContext(Context)

	const fetchGames = async (category = 'vs') => {
		dispatch({type: "SET", key: 'filter_lobby_success', payload: true});
		let endpoint = "/v1/casino-games?game-type-id=" + category
		let method = "GET"
		await makeRequest({url: endpoint, method: method}).then(([status, result]) => {
			if (status === 200) {
				dispatch({type: "SET", key: 'filter_lobby_success', payload: false});
				setCategories(result.types)
				setLocalStorage('category_games', result.data)
			}
		});
	}

	const getCategoryGames = (category) => {
		fetchGames(category?.game_type_id)
	}


	useEffect(() => {
		const abort=new AbortController()
		fetchGames()
		return abort.abort();
	}, [])
	return (
		<div className="col-md-12 casino-scroll" >
			<div
				className="shadow-sm p-2 shadow-sm casino-category-container mt-2">
				<LobbySearchField/>
				{categories?.map((category,index) => (
					category?.game_type_id !== "rgs-vsb"
					&& <Button bg="warning"
							   key={index}
							   style={{marginRight: '2px'}}
							   className={`cursor-pointer text-center casino-category casino-category-button`}
							   onClick={() => getCategoryGames(category)}>
						{(category?.game_type_description)}
					</Button>
				))}
			</div>
		</div>
	)
})
export default React.memo(LobbyCategoriesAndFilters)