import React, {useCallback, useContext, useEffect, useState} from 'react';
import './component/newProfile.css'
import {Link} from "react-router-dom";
import accounts from '../../../assets/img/mobile/user.png'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faCoins, faDownload, faFire, faHome, faPowerOff, faUpload} from "@fortawesome/free-solid-svg-icons";
import {formatNumber} from "../../utils/betslip";
import {getFromLocalStorage, setLocalStorage} from "../../utils/local-storage";
import Right from "../../right";
import SidebarProfile from "../../sidebar/sidebarProfile";
import makeRequest from "../../utils/fetch-request";
import {Context} from "../../../context/store";

const NewProfile = () => {
	const [user, ] = useState(getFromLocalStorage("user"));
	const [utmSource,] = useState('')
	const [state,dispatch]=useContext(Context)

	const configureCampaignCookie = () => {

		let url = new URL(window.location)

		let utm_source = url.searchParams.get('utm_source')

		let utm_campaign = url.searchParams.get('utm_campaign')

		if (utm_source !== null) {
			setLocalStorage('utm_source', utm_source)
		}

		if (utm_campaign !== null) {
			setLocalStorage('utm_campaign', utm_campaign)
		}
	}

	useEffect(() => {
		configureCampaignCookie()
	}, [utmSource])

	const fetchAppConfigurations = useCallback(async () => {

		let cached_settings = getFromLocalStorage('settings');

		let endpoint = "/v1/bet/settings";

		if (!cached_settings) {

			const [result] = await Promise.all([
				makeRequest({url: endpoint, method: "POST", data: null}),
			]);

			let [c_status, c_result] = result


			if (c_status === 200) {

				setLocalStorage('settings', c_result?.message);
			}

		} else {

		}
	})

	useEffect(() => {

		const abortController = new AbortController();

		fetchAppConfigurations();

		return () => {
			abortController.abort();
		};
	}, []);

	const updateUserOnHistory = useCallback(() => {
		if (!user) {
			return false;
		}
		let endpoint = "/v1/balance";
		let udata = {
			token: user.token
		}
		makeRequest({url: endpoint, method: "post", data: udata}).then(([_status, response]) => {
			if (_status == 200) {
				let u = {...user, ...response.user};
				setLocalStorage('user', u);

				dispatch({type: "SET", key: "user", payload: u});
			}
		});

	}, []);


	const updateUserOnLogin = useCallback(() => {
		dispatch({type: "SET", key: "user", payload: user});
	}, [user?.msisdn, user?.balance]);


	useEffect(() => {
		updateUserOnHistory()
	}, [updateUserOnHistory])


	useEffect(() => {
		updateUserOnLogin()
	}, [updateUserOnLogin])
	return (
		<>
			{/*todo else clause */}
			<div>
			<div className="profile-container-desktop d-flex">
				<div className={' mobile-ipad-remove-profile stats-desktop'}>
					<SidebarProfile/>
				</div>

				<div className="col mobile-full-width">
					<div className="iphone">
						<div className="header-profile">
							<div className="user-profile d-flex align-items-center">
								<img src={accounts} className="user-photo "/>

							</div>
							<div className="header-profile-summary">
								<div className="summary-text d-flex gap-3">
									{/*	session information*/}
									<>
										My Account
									</>
									<Link
										to={{pathname: "/"}}
										className={" text-profile-link"} title={'HOME'}
										>
                                      <span className="text-profile-link">
                                       <span className=" text-profile-link"> <FontAwesomeIcon
										   icon={faHome}/></span>&nbsp;
										  HOME
                                      </span>
									</Link>

								</div>
							</div>

						</div>
						<div className="content mt-3 mb-4">
							<div className="card">
								<div className="upper-row">
									<div className="card-item">
										{/*todo balance*/}
										<span>Cash Balance</span>
										<span>
											<span className="dollar">Ksh {formatNumber(user?.balance) || 0}</span>
										</span>
									</div>
									<div className="card-item">
										{/*todo bonus*/}
										<span>Bonus Balance</span>
										<span>
											<span className="dollar">Ksh {formatNumber(user?.bonus) || 0}</span>
										</span>
									</div>
								</div>
								<div className="upper-row">
									<div className="card-item">
										{/*todo gift*/}
										<span>Gift Balance</span>
										<span>
											<span className="dollar">Ksh {formatNumber(user?.gift_balance) || 0}</span>
										</span>
									</div>
									<div className="card-item">
										{/*/todo nare poinsts*/}
										<span>Nare Points</span>
										<span>
											<span className="dollar"> Pts {formatNumber(user?.points_balance) || 0}</span>
										</span>
									</div>
								</div>
							</div>
							<Link to="/deposit" style={{textDecoration: "none", color: "black"}}>
								<div className="transactions">
									<div className="transaction">
										<div className="t-icon-container">
											<div className="icon">
												{/*<i className="fas fa-upload"></i>*/}
												<FontAwesomeIcon  icon={faUpload} />
											</div>
										</div>
										<div className="t-details">
											<div className="t-title">Deposit</div>
										</div>
										<div className="t-amount">
											<img src="https://storage.googleapis.com/nareimages/affiliate/mpesa.svg" width="50px" alt=""/>
										</div>
									</div>
								</div>
							</Link>
							<Link to="/withdraw" style={{textDecoration: "none", color: "black"}}>
								<div className="transaction">
									<div className="t-icon-container">
										<div className="icon">
											{/*<i className="fas fa-download"></i>*/}
											<FontAwesomeIcon  icon={faDownload} />
										</div></div>
									<div className="t-details">
										<div className="t-title">Withdraw </div>
									</div>
									<div className="t-amount">
										<img src="https://storage.googleapis.com/nareimages/affiliate/mpesa.svg" width="50px" alt=""/>
									</div>
								</div>
							</Link>
							<Link to="/redeem-points" style={{textDecoration: "none", color: "black"}}>
								<div className="transaction">
									<div className="t-details">
										<div className="t-title">Redeem Points </div>
									</div>
									<div className="t-amount">
										{/*<i className="fas fa-coins" style={{fontSize: "24px"}}></i>*/}
										<FontAwesomeIcon  icon={faCoins} style={{fontSize: "24px"}}/>
									</div>
								</div>
							</Link>
							<Link to="/my-bets" style={{textDecoration: "none", color: "black"}}>
								<div className="transaction">
									<div className="t-details">
										<div className="t-title">My Bets </div>
									</div>
									<div className="t-amount">
										{/*<i className="fas fa-bars" style={{fontSize: "24px"}}></i>*/}
										<FontAwesomeIcon  icon={faBars} style={{fontSize: "24px"}}/>
									</div>
								</div>
							</Link>
							<Link to="/affiliate" style={{textDecoration: "none", color: "black"}}>
								<div className="transaction">
									<div className="t-details">
										<div className="t-title">Become An Affiliate </div>
									</div>
									<div className="t-amount">
										{/*<i className="fas fa-fire" style={{fontSize: "24px"}}></i>*/}
										<FontAwesomeIcon  icon={faFire} style={{fontSize: "24px"}}/>
									</div>
								</div>
							</Link>
							<Link to="/logout" style={{textDecoration: "none", color: "black"}}>
								<div className="transaction">
									<div className="t-details">
										<div className="t-title">Log Out </div>
									</div>
									<div className="t-amount">
										{/*<i className="fas fa-power-off" style={{fontSize: "24px"}}></i>*/}
										<FontAwesomeIcon  icon={faPowerOff} style={{fontSize: "24px"}}/>
									</div>
								</div>
							</Link>
						</div>
					</div>
				</div>
			</div>
			</div>
			<div className={'ipad-show'}>
				<Right/>
			</div>


		</>
	)
}
export default React.memo(NewProfile)