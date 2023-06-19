import React, {useCallback, useEffect, useState} from 'react'
import { Row, Col } from "antd";
import authImg from '../../assets/img/Logo.webp'

import {Link, useNavigate} from "react-router-dom";
import HeaderLogin from "../header/top-login";
import useWindowDimensions from "../header/Dimensions";
import {getFromLocalStorage, setLocalStorage} from "../utils/local-storage";
import {toast} from "react-toastify";
import only18 from '../../assets/img/auth/18only.png'
import backgroundURL from '../../assets/img/auth/img-17.webp'
import {Navbar, Offcanvas} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {LazyLoadImage} from "react-lazy-load-image-component";
import logo from "../../assets/img/Logo.webp";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faBackspace} from "@fortawesome/free-solid-svg-icons";
import SidebarMobile from "../sidebar/awesome/SidebarMobile";
import betNiMoto from '../../assets/img/BetniMoto.webp'
const backgroundStyle = {
	backgroundImage: `url(${backgroundURL})`,
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover'
}

const LoginTwo = React.memo(
	props => {
	const [message, setMessage] = useState(null);
	// const {setUser} = props;
	const expand = "md"
	const {height, width} = useWindowDimensions();
	const [user, setUser] = useState(getFromLocalStorage("user"));

	const navigate = useNavigate();



	const Notify = (message) => {
		let options = {
			position: toast.POSITION.TOP_RIGHT,
			autoClose: 5000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			toastId: 673738 /* this is hack to prevent multiple toasts */
		}
		if (message.status === 200) {
			toast.success(`🚀 ${message.message}`, options);
		} else {
			toast.error(`🦄 ${message.message}`, options);
		}

	};

	const dispatchUser = useCallback(() => {
		if (message !== null) {
			Notify(message);

			if (message.status == 200) {
				// 1 month
				setLocalStorage('user', message.user,2629746000);
				// setUser(message.user);
			}

		}
	}, [message])

	useEffect(() => {
		dispatchUser();
	}, [dispatchUser]);


	const FormTitle = () => {
		return (<div className='col-md-12 col-md-12  pt-4 text-center text-light py-3 text-center w-100 top-login-mobile' style={{margin:'0px' }}>
			<h4 className="inline-block form-title-centric">
				Login
			</h4>
		</div>)
	}



	const LoginInstructions = () => {
		return (<p className={"text-white py-2 px-4 font-input text-center mb-4"}>
				Enter your phone number and password below to Login to your existing account.
			</p>

		);
	}


	return (
		<div style={{height:'100vh', background:'#16202C',overflowX:'hidden'}}>
			<div className={''}>
				<Navbar expand="md" className="mb-0 ck pc os app-navbar top-nav" fixed="top" variant="dark" style={{paddingLeft:'0px',paddingBottom:'0px'}}>
					<Container fluid className={'d-flex justify-content-between mobile-change top-login-background-img'}>
						<Navbar.Brand className="e logo align-self-start menu-control d-flex w-100" title="Betnare" style={{paddingLeft:'0px',paddingBottom:'0px'}}>
							<Link to={'/'} className={'text-light d-flex align-items-center'}>
								<FontAwesomeIcon icon={faBackspace}/> HOME
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
							style={{width: "80%", height: "100%",zIndex: "9999", marginTop: "0px"}}
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
							<Offcanvas.Body className={(width<=575?user?"":"":"")}>
								<SidebarMobile/>
							</Offcanvas.Body>
						</Navbar.Offcanvas>
					</Container>
				</Navbar>

			</div>
			<Row justify="center" className="align-items-stretch h-100">

				<Col xs={0} sm={0} md={0} lg={8}>
					<div className="d-flex flex-column justify-content-between h-100 px-4" style={backgroundStyle}>
						<div className="text-right">
							{/*<LazyLoadImage src="/img/logo-sm.jpg" style={{height:"35px"}}alt="logo"/>*/}
						</div>
						<Row justify="center">
							<Col xs={0} sm={0} md={0} lg={20}>
								<Link to={'/'}>
									<LazyLoadImage className="img-fluid mb-5" src={authImg} alt=""/>
								</Link>

								<h1 className="text-white text-center" style={{fontSize:"30px"}}>Welcome to betnare</h1>
								<p className="text-white px-3 d-flex align-items-center justify-content-center mt-3" style={{fontSize:"16px", opacity:'0.5px'}}><LazyLoadImage src={betNiMoto}  style={{width:"150px"}} alt={'betnare'}/></p>
							</Col>
						</Row>
						<div className="d-flex justify-content-end pb-4">
							<div className={'d-flex justify-content-center align-items-center'}>
								<div className="text-white mx-2 bold d-flex justify-content-center align-items-center"><LazyLoadImage src={only18} alt={'18 only'} style={{width:'30px', background:'aliceblue', borderRadius:'16px'}}/></div>
								<span className="mx-2 text-white"> | </span>
								<a className="text-white" href="/terms-and-conditions">Term & Conditions</a>
								<span className="mx-2 text-white"> | </span>
								<a className="text-white" href="/privacy-policy" >Privacy & Policy</a>
							</div>
						</div>
					</div>
				</Col>
				<div className={'col-lg-8 col-sm-12 top-login-background-img-bg-down top-login-background-img-bg-page'} >

					<div className="w-100 d-flex flex-column justify-content-center h-100 top-login-background-img-bg-page">
						<div className={'width-page-centric '}>
							<FormTitle/>

							<Row justify="center">
								<LoginInstructions/>

								<div className={'d-flex'}>
									{/**/}
									<div >
										{user?
											setTimeout(()=>{
													if(getFromLocalStorage('ActiveLink')==undefined||getFromLocalStorage('ActiveLink')==null){
														return navigate("/")
													}
													else
													{
														navigate(getFromLocalStorage('ActiveLink'))
														localStorage.removeItem('ActiveLink')
													}
											}
											,500):""}
										<div className={"d-flex flex-row justify-content-between"}>
											<div className=" w-100">
												<div className="homepage d-flex flex-column align-items-center justify-content-center login-page">

													<HeaderLogin setUser={setUser} login={true}/>

												</div>
											</div>
										</div>
									</div>
									{/* <p>Don't have an account yet? <a href="/auth/register-2">Sign Up</a></p> */}
									<div className="mt-4">
										{/*<LoginForm {...props}/>*/}
									</div>
								</div>
							</Row>
						</div>

					</div>
				</div>
			</Row>
		</div>
	)
})

export default React.memo(LoginTwo)
