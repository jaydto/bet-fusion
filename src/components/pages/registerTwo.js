import React, {useCallback, useEffect, useState} from 'react'
import { Row, Col } from "antd";
import authImg from '../../assets/img/Logo.webp'
import fire from '../../assets/img/fire.webp'

import {Link, useNavigate} from "react-router-dom";
import HeaderLogin from "../header/top-login";
import Right from "../right";
import useWindowDimensions from "../header/Dimensions";
import {clearTrackingData, getFromLocalStorage, setLocalStorage, setTrackingData} from "../utils/local-storage";
import {toast} from "react-toastify";
import only18 from '../../assets/img/auth/18only.png'
import backgroundURL from '../../assets/img/auth/img-17.webp'
import {Navbar, Offcanvas} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {LazyLoadImage} from "react-lazy-load-image-component";
import logo from "../../assets/img/Logo.webp";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faBackspace, faBackward, faHome, faLessThan, faPowerOff} from "@fortawesome/free-solid-svg-icons";
import SidebarMobile from "../sidebar/awesome/SidebarMobile";
import makeRequest from "../utils/fetch-request";
import {Form, Formik} from "formik";
const backgroundStyle = {
	backgroundImage: `url(${backgroundURL})`,
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover'
}

const RegisterTwo = props => {
	const [message, setMessage] = useState(null);
	// const {setUser} = props;
	const expand = "md"
	const {height, width} = useWindowDimensions();
	const [user, setUser] = useState(getFromLocalStorage("user"));

	const [success, setSuccess] = useState(false);
	const navigate = useNavigate();


	const initialValues = {
		msisdn: '',
		password: ''
	}

	const handleSubmit = values => {

		let endpoint = '/v1/signup'

		setTrackingData(values)

		makeRequest({url: endpoint, method: 'POST', data: values}).then(([status, response]) => {
			setSuccess(status === 200 || status === 201);
			setMessage(response?.success?.message || "");
			if (values.utm_source !== undefined) {
				if (values.utm_source === 'eskimi') {
					window.esk('track', 'Conversion');
				}
				if (values.utm_source === 'google') {
					window.gtag_report_conversion(window.location)
				}
			}
			clearTrackingData()
			let timer = setInterval(() => {
				// window.location.href = "/"
				clearInterval(timer)
			}, 3000)
		})
	}

	const validate = values => {

		let errors = {}

		if (!values.msisdn || !values.msisdn.match(/(254|0|)?[71]\d{8}/g)) {
			errors.msisdn = 'Please enter a valid phone number'
		}

		if (!values.password || values.password.length < 4) {
			errors.password = "Please enter four or more characters for password";
		}

		return errors
	}

	const FormTitle = () => {
		return (
			<div className='col-md-12  pt-4 text-center text-light' >
				<h4 className="inline-block">
					SIGNUP | CREATE A NEW ACCOUNT
				</h4>
			</div>
		)
	}

	const MySignupForm = (props) => {
		const {errors, values, submitForm, setFieldValue} = props;

		const onFieldChanged = (ev) => {
			let field = ev.target.name;
			let value = ev.target.value;
			setFieldValue(field, value);
		}
		return (
			<Form>
				<div className="pt-0">
					<div className="row">
						{/*<div className='row'>*/}
						{/*    <img src={ karibu} alt="" className={''}/>*/}
						{/*</div>*/}
						{/*<hr/>*/}
						<div className="form-group container-lg row d-flex justify-content-center mt-5">
							<div className="col-md-12">
								<label>Mobile Number</label>
								<input
									value={values.msisdn}
									className="text-light deposit-input form-control col-md-12 input-field input-bg-user"
									id="msisdn"
									name="msisdn"
									type="text"
									placeholder='Phone number'
									onChange={ev => onFieldChanged(ev)}
								/>
								{errors.msisdn && <div className='text-danger'> {errors.msisdn} </div>}
							</div>
						</div>

						<div className="form-group container-lg row d-flex justify-content-center mt-5">
							<div className="col-md-12">
								<label>Password</label>
								<input
									value={values.password}
									className="text-light deposit-input form-control col-md-12 input-field input-bg-user"
									id="password"
									name="password"
									type="password"
									placeholder='Password'
									onChange={ev => onFieldChanged(ev)}
								/>
								{errors.password && <div className='text-danger'> {errors.password} </div>}
							</div>
						</div>
						<div className="form-group container-lg row d-flex justify-content-left mb-4">
							<div className="col">
								<button type={"submit"}
										className='btn btn-lg w-100 button-radius input-field btn-font cg login-button2 btn ' style={{marginTop:"47px"}}>
									<strong>SIGNUP</strong>
								</button>
								<Link className={`d-flex justify-content-center w-100 mt-3`} to={"/verify"} title="Verify" >
									<span className={`text-warning font-input register-label`} style={{fontSize:'18px'}}>Already have a verification code ?  </span>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</Form>
		);
	}

	const SignupForm = (props) => {
		return (
			<Formik
				initialValues={initialValues}
				onSubmit={handleSubmit}
				validateOnChange={false}
				validateOnBlur={false}
				validate={validate}
				render={(props) => <MySignupForm {...props} />}/>
		);
	}

	const Alert = (props) => {
		let c = success ? 'success' : 'danger';
		return (<div role="alert" className={`fade alert alert-${c} show`}>{message}</div>);

	};
	return (
		<div style={{height:'100vh', background:'#16202C'}}>
			<div className={''}>
				<Navbar expand="md" className="mb-0 ck pc os app-navbar top-nav" fixed="top" variant="dark" style={{paddingLeft:'0px',paddingBottom:'0px'}}>
					<Container fluid className={'d-flex justify-content-between mobile-change top-login-background-img'}>
						<Navbar.Brand className="e logo align-self-start menu-control d-flex w-100" title="Betnare" style={{paddingLeft:'0px',paddingBottom:'0px'}}>
							<Link to={'/'}>
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
							{/*<img src="/img/logo-sm.jpg" style={{height:"35px"}}alt="logo"/>*/}
						</div>
						<Row justify="center">
							<Col xs={0} sm={0} md={0} lg={20}>
								<h1 className="text-white text-center" style={{fontSize:"40px", marginBottom:'14px'}}>Welcome to</h1>

								<Link to={'/'}>
									<img className="img-fluid mb-5" src={authImg} alt=""/>
								</Link>

								<p className="text-white px-3 d-flex align-items-center justify-content-center mt-3" style={{fontSize:"16px", opacity:'0.5px'}}>Bet ni Moto<img src={fire}  style={{width:"20px"}} alt={'betnare'}/></p>
							</Col>
						</Row>
						<div className="d-flex justify-content-end pb-4">
							<div className={'d-flex justify-content-center align-items-center'}>
								<div className="text-white mx-2 bold d-flex justify-content-center align-items-center"><img src={only18} alt={'18 only'} style={{width:'30px', background:'aliceblue', borderRadius:'16px'}}/></div>
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
						<div className={'width-page-centric'}>
							<FormTitle/>

							<Row justify="center">

								<div className={'d-flex'}>
									{/**/}
									<div >
										{user?setTimeout(navigate("/"),500):""}
										<div className={"d-flex flex-row justify-content-between"}>
											<div className=" w-100">
												<div className="homepage d-flex flex-column align-items-center justify-content-center login-page">
													<div className="col-md-12 mt-2 text-white p-2">
													{message && <Alert/>}
													{success?setTimeout(window.location.href="/verify",1500):""}
													<div className="modal-body pb-0" data-backdrop="static">
														<SignupForm/>
													</div>
												</div>


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
}

export default RegisterTwo
