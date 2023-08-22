import React, {useContext} from "react";

import {getFromLocalStorage} from "../utils/local-storage";
import {Button} from "react-bootstrap";
import LobbySearchField from "./lobbySearchField";

const LobbyCategoriesAndFilters = React.memo(
	(props) => {
		const {category_data}=props
		// const data=getFromLocalStorage('lobby_categories')
		const categories=category_data
		// console.log("category_data_for_filters",categories)
		// const getCategoryGames=(category)=>{
			// console.log("category",category)
		// }

	return (
		<div className="col-md-12 casino-scroll" >
			<div
				className="shadow-sm p-2 shadow-sm casino-category-container mt-2">
				<LobbySearchField/>
				{categories?.map((category,index) => (
					 <Button bg="warning"
							   key={index}
							   style={{marginRight: '2px'}}
							   className={`cursor-pointer text-center casino-category casino-category-button`}
							   onClick={() => getCategoryGames(category?.game_category)}>
						{(category?.game_category)}
					</Button>
				))}
			</div>
		</div>
	)
})
export default React.memo(LobbyCategoriesAndFilters)