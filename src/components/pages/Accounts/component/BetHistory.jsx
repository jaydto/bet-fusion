import "./bethistory.css"
import React, {useCallback, useContext, useEffect, useState} from "react";
import {Context} from "../../../../context/store";
import useWindowDimensions from "../../../header/Dimensions";
import makeRequest from "../../../utils/fetch-request";
import Header from "../../../header/header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import BetDetails from "./BetDetails";
import {getFromLocalStorage, setLocalStorage} from "../../../utils/local-storage";

const BetHistory = () => {
	const {width}=useWindowDimensions()
	const [state, dispatch] = useContext(Context);
	const [isLoading, setIsLoading] = useState(false);

	const fetchData = useCallback(async() => {
		if(isLoading) return;
		setIsLoading(true);
		let endpoint = "/v1/full/betdetails";
		makeRequest({url: endpoint, method: "POST", data: null}).then(([status, result]) => {
			// dispatch({type: "SET", key: "mybets", payload: result});
			setLocalStorage("mybets", result)
			setIsLoading(false);
		});

	}, []);

	useEffect(() => {
		fetchData();
	}, []);

	const PageTitle = () => {
		return (
			<div className='col-md-12 background-profile p-4 text-center'>
				<h4 className="inline-block text-light">
					MY BETS
				</h4>
			</div>
		)
	}

	const PageBody=()=>{
		const [state,dispatch]=useContext(Context)
		const swap=(bet_id)=>{
			dispatch({type: "SET", key: "bet_history_details", payload:bet_id });
		}
		const mybets=getFromLocalStorage("mybets")
		return (
			<>
				{mybets && mybets.map((bet,index) => (
					<div className="my-bets-bet-history" key={index} onClick={()=>{
						swap(bet?.bet_id)
					}}>
						<div className={"d-flex justify-content-between w-100 px-3"}>
							<div className={"bet-history-items id"}>
								#{bet?.bet_id}
							</div>
							<div className={"bet-history-items amount"}>
								KES {bet?.bet_amount}
							</div>

						</div>
						<div className={"d-flex justify-content-between w-100 px-3"}>
						<div className={"bet-history-items date"}>
							{bet?.created}
						</div>
						<div className={"bet-history-items status"}>
							{bet?.status_desc}
						</div>

					</div>
					</div>
				))}
			</>

		)
	}

	const navigateBack=()=>{
		if(state?.bet_history_details){
			dispatch({type: "SET", key: "bet_history_details", payload:false });
		}else if(state?.bet_history_details===false||state?.bet_history_details===null||state?.bet_history_details===undefined){
			window.history.back()
		}

	}


	return (
		<>
			<>
				<div >
					<Header/>
					<div className={'back-navigation original-button top-spacing'}  onClick={()=>navigateBack()}>
					    <FontAwesomeIcon icon={faArrowLeft} className={'back-navigation-icon'} /> Back
					</div>
					<div className="container top-spacing">
						<div className="iphone background-profile">

							<div className="d-flex flex-row justify-content-between">

								<div className="gz home" style={{width: '100%'}}>

									<PageTitle />
									{state?.bet_history_details?<BetDetails bet_id={state?.bet_history_details}/>:
										<PageBody/>
									}


								</div>
							</div>
						</div>


					</div>

				</div>


			</></>
	)

}
export default BetHistory;