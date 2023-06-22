import React, {useCallback, useContext, useEffect, useState} from "react"
import makeRequest from "../../../utils/fetch-request";
import {Context} from "../../../../context/store";
const BetDetails = (props) => {
	const {bet_id}=props
	const payload={
		"bet_id":bet_id
	}
	const [state, dispatch] = useContext(Context);
	const [isLoading, setIsLoading] = useState(false);

	const fetchBetDetails = useCallback(async() => {
		if(isLoading) return;
		setIsLoading(true);
		let endpoint = "/v1/betdetails";
		makeRequest({url: endpoint, method: "POST", data: payload}).then(([status, result]) => {
			dispatch({type: "SET", key: "mybets", payload: result});
			setIsLoading(false);
		});

	}, []);

	useEffect(() => {
		const abort =new AbortController()
			fetchBetDetails();
		return abort.abort()
	}, []);
	return (
		<>
			<div className="d-flex details flex-column bet-details">
				<div className="d-flex history-details flex-column">
					<div className="id">
							id
					</div>
					<div className="date">
							date
					</div>
					<div className="status">
						status
					</div>

				</div>
				<div className="d-flex options-details-history w-100 justify-content-between">
					<div className="d-flex">
						EventsOdds
					</div>
					<div className="d-flex">
						Toggle
					</div>

				</div>
				<div className="d-flex details-history flex-column w-100 mt-3">
					<div className="d-flex w-100 justify-content-between px-2">
						<div className="team">Team</div>
						<div className="outcome">Outcome</div>
						<div className="team"></div>
					</div>
					<div className="d-flex justify-content-between w-100 px-3">
						<div className="d-flex">
							<div className="d-flex justify-content-between px-2">
								<div className="type">
									Type
								</div>
								<div className="market-h">
									Market
								</div>
							</div>
							<div className="d-flex justify-content-between px-2">
								<div className="pick-ft">
									Pick
								</div>
								<div className="pick-h">
									Pick value
								</div>
							</div>

						</div>
						<div className="d-flex">
							<div className="d-flex justify-content-between px-2">
								<div className="result-ft">
									Result
								</div>
								<div className="result-h">
									Result value
								</div>
							</div>
							<div className="d-flex justify-content-between px-2">
								<div className="outcome-t">
									Outcome
								</div>
								<div className="outcome-h">
									outcome-value
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default React.memo(BetDetails)