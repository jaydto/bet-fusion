import React, {useCallback, useContext, useEffect, useState} from "react"
import makeRequest from "../../../utils/fetch-request";
import {StoreContext } from "../../../../context/store"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
	faCaretDown,
	faCaretRight,
	faChartLine,
	faCheckCircle,
	faQuestionCircle,
	 faXmarkCircle
} from "@fortawesome/free-solid-svg-icons";
import Skeleton1 from "../../../skeleton/skeleton";
import moment from "moment/moment";
import {Button, ButtonGroup} from "react-bootstrap";
import Notify from "../../../utils/Notify";
import BetslipShareModal from "../../../modals/BetslipShareModal";
import {getFromLocalStorage, setLocalStorage} from "../../../utils/local-storage";
import {addToSlip} from "../../../utils/betslip";
import {useNavigate} from "react-router-dom";

const BetDetails = (props) => {
	const {bet_id}=props
	const { state, dispatch } = useContext(StoreContext);
	const [isLoading, setIsLoading] = useState(false);
	const payload={
		"bet_id":bet_id
	}

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
		return () => {
                abort.abort(); // Cleanup function to abort the controller when the component unmounts.
            };
	}, []);


	const FormatDate = (props) => {
		const { date } = props;

		// Extract the date and time components
		const [dateString, timeString] = date.split(' ');
		const [year, month, day] = dateString.split('-');
		const [hour, minute] = timeString.split('-');

		// Create a new Date object
		const dateTime = new Date(year, month - 1, day, hour, minute);

		// Format the date and time
		const formattedDateTime = dateTime.toLocaleString('en-US', {
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			hour12: true
		});

		return "Placed bet on "+formattedDateTime;
	};

	const [collapsed, setCollapsed] = useState([]);
	const [collapsedAll, setCollapsedAll] = useState(true);
	const [activeParentMatchId, setActiveParentMatchId] = useState(null);
	let match=state?.mybets?.data;
	let sport;
	let parent_match_id;
	match?.map((bet)=>{
		sport=bet?.sport_id
		parent_match_id=bet?.parent_match_id
	})

	let lmtIncludes = [79, 85, 82, 80, 107];

	const [switches, setSwitches]=useState("scoreboard")


	const switchLmt=(value)=>{
		setSwitches(value)
	}
	const handleLinkClick = (event) => {
		if (event) {

			// remove highlight class from all links
			const links = document.querySelectorAll('.link');
			links?.forEach((link) => link.classList.remove('highlight'));

			// add highlight class to clicked link
			event.currentTarget.classList.add('highlight');
		}
	}


	useEffect(() => {
		if(activeParentMatchId){
			window?.SIR("addWidget", "#sr-widget-"+ activeParentMatchId, "match.lmtPlus", {
				branding: { tabs: { option: "icon", variant: "fullWidth" } },
				goalBannerImage:
					"https://storage.googleapis.com/nareimages/logo-white.webp",
				logo: ["https://storage.googleapis.com/nareimages/logo-dark.webp"],
				momentum: "disable",
				matchId: activeParentMatchId,
				collapseTo: switches,
				layout: "single",
				scoreboard: "extended",
				detailedScoreboard: "disable",
			});
		}

	},[activeParentMatchId,switches]);

	const toggleCollapse = (index,parent_match_id) => {
		setActiveParentMatchId(parent_match_id)
		const updatedCollapsed = [...collapsed];
		if (updatedCollapsed.includes(index)) {
			updatedCollapsed.splice(updatedCollapsed.indexOf(index), 1);
		} else {
			updatedCollapsed.push(index);
		}
		setCollapsed(updatedCollapsed);
	};

	function toggleCollapseAll(items) {
		if (!collapsedAll) {
			setCollapsed(Array.from({ length: items.length }, (_, index) => index));
		} else {
			setCollapsed([]);
		}
		setCollapsedAll(!collapsedAll);
	}

	const WinLostTotal=()=>{
		const data=state?.mybets?.data
		const filteredData = data?.filter(bet => bet.win === 1 || bet.win === 0);
		const won = filteredData?.filter(bet => bet.win === 1)?.length;
		const lost = filteredData?.filter(bet =>
			bet?.win === 0 && bet?.status===3
		 )?.length;
		const total = filteredData?.length;

		const result = `${won}/${lost}/${total}`;
		return result
	}

	const [canCancel, setCanCancel] = useState(true);
	const [betStatus, setBetStatus] = useState(getFromLocalStorage("bet_history_status")||null);
	const [cancelEndTime, setCancelEndTime] = useState(null);



	const cancelBet = (bet_id) => {
		let endpoint = '/bet-cancel';
		let data = {
			bet_id: bet_id,
			cancel_code: 101,
		}
		makeRequest({url: endpoint, method: "POST", data: data, use_jwt: true}).then(([status, result]) => {
			if (status === 201) {
				setBetStatus(bet_id+"cancel_rq");
				setLocalStorage("bet_history_status",bet_id+"cancel_rq")
				setCanCancel(false);
				setCancelEndTime(null);
			}
		});
	};

	const CancelBetMarkup = (props) => {
		const { bet_id, can_cancel, created } = props;
		const [countdown, setCountdown] = useState(null);
		const [progress, setProgress] = useState(100);
		let cancelEndTime;
		let interval;

		useEffect(() => {
			let storedEndTime = localStorage.getItem('cancelEndTime');
			if (can_cancel && created) {
				cancelEndTime = moment(created).add(5, 'minutes');
				setLocalStorage('cancelEndTime', cancelEndTime);
				startCountdown(cancelEndTime);
			} else {
				resetCountdown();
			}
		}, [can_cancel, created]);

		const startCountdown = (endTime) => {
			document.addEventListener('visibilitychange', handleVisibilityChange);
			updateCountdown(endTime);
		};

		const updateCountdown = () => {
			interval = setInterval(() => {
				const now = moment();
				const diff = moment.duration(cancelEndTime.diff(now));

				if (diff.asSeconds() <= 0) {
					resetCountdown();
					clearInterval(interval);
				} else {
					setCountdown(getCountdownText(diff));
					setProgress((diff.asSeconds() / 300) * 100); // Calculate the progress based on remaining seconds (5 minutes)
				}
			}, 1000);
		};

		const handleVisibilityChange = () => {
			if (document.visibilityState === 'visible') {
				updateCountdown();
			} else {
				clearInterval(interval);
			}
		};

		const resetCountdown = () => {
			setCountdown(null);
			setProgress(100); // Reset the progress to 100%
			localStorage.removeItem('cancelEndTime');
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		};

		const getCountdownText = (diff) => {
			const minutes = Math.floor(diff.asMinutes());
			const seconds = Math.floor(diff.asSeconds() % 60);
			return `${minutes}m ${seconds}s`;
		};

		if (can_cancel && countdown && betStatus!==bet_id+"cancel_rq" ) {
			return (
					<div className="progress  bet-history-options" style={{ height: '25px' }} onClick={()=>cancelBet(bet_id)}>
						<div
							className="progress-bar"
							role="progressbar"
							style={{ width: `${progress}%` }}
							aria-valuenow={progress}
							aria-valuemin={0}
							aria-valuemax={100}
						>
							<span className="progress-text"
								  style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)"}}>
								{countdown} &nbsp;Cancel</span>

						</div>

					</div>
			);
		} else if(betStatus===bet_id+"cancel_rq" && countdown){
			return (
				<div className="progress  bet-history-options" style={{textAlign:"center"}}>
					CANCEL RQ
				</div>
			)
		}
		else {
			return (
				<div className="">
				</div>
			);
		}
	};



	const navigate=useNavigate()
	const rebetRequest= async (bet_id)=>{
		let endpoint="/v1/rebet"
		let method="POST"
		let data={
			"bet_id":bet_id
		}
		let message = {
			status: 200,
			message: "Rebet successful"
		}
		await makeRequest({url: endpoint, method: method, data: data}).then(([status,result])=>{

			if(status==200){
				Notify(message)
				Object.entries(result?.success).map(([match_id, match]) => {
					match.live = Number(match?.live) !== 0
					match.bet_type = String(match?.bet_type)
					addToSlip(match)
				})

				return window.location.href="/betslip-slip"
			}
		})
	}
	const [showShareModal, setShowShareModal] = useState(false);
	const [betSharePayload, setBetSharePayload] = useState({});
	const shareRequest = (bet_id) => {


		let endpoint = "/v1/bs-encode";
		let data={
			"bet_id":bet_id
		}
		makeRequest({url: endpoint, method: "POST", data: data}).then(
			([status, response]) => {
				if (status === 200) {
					setShowShareModal(true);
					setBetSharePayload(response);

				} else {

				}
			}
		);
	};

	return (
		<> {showShareModal && (
			<BetslipShareModal
				visible={showShareModal}
				payload={betSharePayload}
				setShowShareModal={setShowShareModal}
			/>
		)}
			{!isLoading?
				<div className="d-flex details flex-column bet-details">
					{state?.mybets?.data?.map((item,index) => (
						<div key={index}>
							{index===0&&<div className="d-flex history-details flex-column bet-summary-info">
								<div className="id">
									#{item?.bet_id}
								</div>
								<div className="date">
									<FormatDate date={item?.created}/>
								</div>
								<div className="status d-flex justify-content-between px-2 mb-3">
								<span
									className={` badge  ${state?.mybets?.meta.bet_info?.status == 3 ? "bg-dark text-warning" : state?.mybets?.meta.bet_info?.status == 5 ? "bg-success" : state?.mybets?.meta.bet_info?.status == 1 ? "bg-dark " : ""}`}
									style={{
										color: "white",
										marginTop: "10px",
										borderRadius: "7px",
										marginLeft: "1px",
										padding: "2.9px 9px "
									}}>{state?.mybets?.meta.bet_info?.status === 3 ? "NOT WON" : state?.mybets?.meta.bet_info?.status === 5 ? "WON" : "PENDING"}
								</span>
								</div>
								{index === 0 &&  (<div className="d-flex history-details-padding gap-3 ">
									<div className="col-8 d-flex details-history-main-container">
										<div className="d-flex col-4 flex-column details-history-main" >
											<div className={"main-details-info-title"}>
												Amount
											</div>
											<div className="amount-value">{item?.bet_amount}</div>
										</div>
										<div className="d-flex col-8 flex-column details-history-main">
											<div className={"main-details-info-title"}>
												Possible Winnings
											</div>
											<div className="amount-value">{item?.possible_win}</div>
										</div>

									</div>
									<div className="col-4 details-history-main-container d-flex justify-content-center flex-column">
										<div className="won-total main-details-info-title">
											W/L/T
										</div>
										<div className="won-total-value">
											<WinLostTotal />
										</div>

									</div>
								</div>)}
								{item?.status==1&&<div className="d-flex w-100 justify-content-around">
									{state?.mybets?.meta.bet_info.can_cancel !== true &&
										<CancelBetMarkup bet_id={item?.bet_id}
														 can_cancel={!state?.mybets?.meta.bet_info.can_cancel}
														 created={state?.mybets?.meta.bet_info?.created}/>
									}
									<div className={"bet-history-options"} onClick={() => rebetRequest(item?.bet_id)}>
										Rebet
									</div>
									<div className={"bet-history-options"} onClick={() => shareRequest(item?.bet_id)}>
										Share
									</div>
								</div>}
								<div className="d-flex options-details-history w-100 justify-content-between">
									<div className="d-flex">
										Events (Odds {state?.mybets?.meta?.bet_info?.total_odd})
									</div>
									{index === 0 && (
										<div className="d-flex text-warning bold d-flex gap-2 align-items-center"
											 onClick={()=>toggleCollapseAll(state?.mybets?.data)}>
											Toggle collapse all {!collapsedAll ? <FontAwesomeIcon icon={faCaretRight}/> :
											<FontAwesomeIcon icon={faCaretDown}/>}
										</div>
									)}

								</div>
							</div>
							}
							<div className="d-flex details-history flex-column w-100 mt-3">
								<div className="d-flex w-100 justify-content-between px-2 details-items">
									<div className="team">
										{item?.win===1?<FontAwesomeIcon icon={faCheckCircle}
														  className={"text-success"}/>:item?.status===1?<FontAwesomeIcon icon={faQuestionCircle}
																														className={"text-warning"}/>:<FontAwesomeIcon icon={faXmarkCircle}
																										className={"text-danger"}/> }&nbsp;<span className={"team-info"}>{item?.home_team}</span></div>
									<div className="outcome">vs</div>
									<div className="team" onClick={()=>toggleCollapse(index, item?.parent_match_id)}><span className={"team-info text-end"}>{item?.away_team}</span>&nbsp;{!collapsed.includes(index)?<FontAwesomeIcon icon={faCaretRight}/>:<FontAwesomeIcon icon={faCaretDown}/>}</div>
								</div>
								<div className={`${!collapsed.includes(index)?"d-none ":"d-flex justify-content-between gap-4 "} w-100 px-3 bethistory-items flex-column`}>
									<div className="d-flex">
										<div className="d-flex  flex-column col">
											<div className="d-flex justify-content-between px-2 details-info">
												<div className="type">
													Type
												</div>
												<div className="market-h">
													{item?.market}
												</div>
											</div>
											<div className="d-flex justify-content-between px-2">
												<div className="pick-ft">
													Pick
												</div>
												<div className="pick-h">
													{item?.bet_pick}
												</div>
											</div>
										</div>
										<div className="d-flex flex-column col">
											<div className="d-flex justify-content-between px-2">
												<div className="result-ft">
													Result
												</div>
												<div className="result-h">
													{item?.results}
												</div>
											</div>
											<div className="d-flex justify-content-between px-2">
												<div className="outcome-t">
													Outcome
												</div>
												<div className="outcome-h">
													{item?.winning_outcome}
												</div>
											</div>
										</div>
									</div>
									{lmtIncludes.includes(sport) &&< div className="d-flex flex-column col">
										<div id={`sr-widget-${item?.parent_match_id}`}></div>
										<ButtonGroup aria-label="stats button actions" className='w-100 d-flex justify-content-start'>
											{item?.winning_outcome?<Button className="place-bet-btn w-25 btn link" title="Status of match when bet was placed"
													 type="button"
													 style={{background: "transparent", fontSize: "14px",color:item?.live === 1?"var(--red)":"var(--light)"}}>
												{item?.live === 1? "'LIVE":"'Not Live"}
											</Button>:""}
										<Button  className="place-bet-btn w-25 btn link" title="Scoreboard" type="button" style={{background:"transparent",fontSize:"14px"}}
												 onClick={(event) => {switchLmt("scoreboard");handleLinkClick(event)}}>{item?.result && item?.result}&nbsp;scoreboard
								</Button>
											<Button
												id="lmt_matches_bet_history"
												onClick={(event) => {switchLmt("disable"); handleLinkClick(event)}}
												style={{padding: "5px", backgroundColor: "transparent",fontSize:"14px"}}
												type={"button"}

												className="btn border-0 d-flex justify-content-center w-25 d-flex align-items-center link"
												title="Statistics">
												statistics&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
												<FontAwesomeIcon icon={faChartLine}/>

											</Button>
							</ButtonGroup>
						</div>}
								</div>
							</div>
						</div>
					))}
				</div>	:
				<div className={`text-center mt-2 text-white d-block`}>
					<Skeleton1/>
				</div>
			}

		</>
	)
}
export default React.memo(BetDetails)