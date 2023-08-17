import {Navbar, Offcanvas} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBackspace} from "@fortawesome/free-solid-svg-icons";
import {LazyLoadImage} from "react-lazy-load-image-component";
import logo from "../../assets/img/Logo.webp";
import SidebarMobile from "../sidebar/awesome/SidebarMobile";
import React, {useCallback, useEffect, useState} from "react";
import {getFromLocalStorage, setLocalStorage} from "../utils/local-storage";
import makeRequest from "../utils/fetch-request";

const Header2 = React.memo(
	() => {
		const expand = "md"
		const [settings,] = useState(getFromLocalStorage('settings'));
		const fetchAppConfigurations = useCallback(async () => {

			let cached_settings = getFromLocalStorage('settings');

			let endpoint = "/v1/bet/settings";

			if (!cached_settings) {

				const [result] = await Promise.all([
					makeRequest({url: endpoint, method: "POST", data: null}),
				]);

				let [c_status, c_result] = result


				if (c_status === 200) {
					setLocalStorage('settings', c_result?.message, 1800000);
				}

			} else {

			}
		})

		useEffect(() => {
			const cleanUpFuction = async () => {
				const abort = new AbortController();
				await fetchAppConfigurations();


				// Custom function to clear settings from localStorage
				const clearLocalStorageSettings = () => {
					localStorage.removeItem('settings');
					// Manually call fetchAppConfigurations to update the settings
					fetchAppConfigurations();
				};

				// Listen for the "storage" event to detect changes in "settings" localStorage
				const handleStorageChange = (event) => {
					if (event.key === 'settings') {
						fetchAppConfigurations();
					}
				};

				// Listen for "beforeunload" event to handle clearing localStorage in the same tab
				const handleBeforeUnload = () => {
					clearLocalStorageSettings();
				};

				window?.addEventListener('storage', handleStorageChange);
				window?.addEventListener('beforeunload', handleBeforeUnload);

				return () => {
					// Clean up the event listeners when the component unmounts
					window?.removeEventListener('storage', handleStorageChange);
					window?.removeEventListener('beforeunload', handleBeforeUnload);
					abort.abort();
				};
			}
			cleanUpFuction()
		}, [settings]);

		return (
			<div className={''}>
				<Navbar expand="md" className="mb-0 ck pc os app-navbar top-nav top-section-page" fixed="top"
						variant="dark" style={{paddingLeft: '0px', paddingBottom: '0px'}}>
					<Container fluid
							   className={'d-flex justify-content-between mobile-change top-login-background-img'}>
						<Navbar.Brand className="e logo align-self-start menu-control d-flex w-100 " title="Betnare"
									  style={{paddingLeft: '0px', paddingBottom: '0px'}}>
							<Link to={'/'} className={'betnare-text-light'}>
								<FontAwesomeIcon icon={faBackspace}/> Home
							</Link>

							<div
								className="col-md-6  d-flex  right justify-content-end align-items-center w-change3 gap-2 top-login-background-img-bg-page"
								style={{marginLeft: 'auto'}}>

								<Link to={{pathname: "/"}} className=" resize-mobile">
									<LazyLoadImage src={logo} alt="Betnare" title="Betnare" effects="blur"
												   className={"image-size "}/>
								</Link>
							</div>

						</Navbar.Brand>

						<Navbar.Offcanvas
							style={{width: "80%", height: "100%", zIndex: "9999", marginTop: "0px"}}
							className='off-canvas background-primary p-0 user-profile'
							id={`offcanvasNavbar-expand-${expand}`}
							aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
							placement="start">
							<Offcanvas.Header closeButton className='text-white' closeVariant={"white"}>
								<Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
									<div className="col-3">
										<div>
											<LazyLoadImage src={logo} alt="Betnare" title="Betnare" effects="blur"/>
										</div>
									</div>
								</Offcanvas.Title>
							</Offcanvas.Header>
							<Offcanvas.Body className={('')}>
								<SidebarMobile/>
							</Offcanvas.Body>
						</Navbar.Offcanvas>
					</Container>
				</Navbar>

			</div>
		)
	})

export default React.memo(Header2);
