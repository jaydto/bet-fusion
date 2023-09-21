import {Navbar, Offcanvas} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBackspace} from "@fortawesome/free-solid-svg-icons";
import {LazyLoadImage} from "react-lazy-load-image-component";
import SidebarMobile from "../sidebar/awesome/SidebarMobile";
import React from "react";

const Header2 = React.memo(
	() => {
		const expand = "md"

		return (
			<div className={''}>
				<Navbar expand="md" className="mb-0 ck pc os app-navbar top-nav specific-nav top-section-page" fixed="top"
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
									<LazyLoadImage src={'https://cdn.betnare.com/logo-white.webp'} alt="Betnare" title="Betnare" effects="blur"
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
											<LazyLoadImage src={'https://cdn.betnare.com/logo-white.webp'} alt="Betnare" title="Betnare" effects="blur"/>
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
