import "./lobbyLoader.css"
import React from "react"
const LobbyLoader = React.memo(
	() => {
	return (
		<div className={"ripple-width"}>
			<div className="lds-ripple">
				<div></div>
				<div></div>
			</div>
		</div>

	)
})
export default React.memo(LobbyLoader)