import React, {useCallback, useContext, useEffect, useRef, useState} from 'react'
import { Row, Col } from "antd";
import authImg from '../../../assets/img/Logo.webp'
import "./stepper.css"
import {Link, useNavigate} from "react-router-dom";
import {clearTrackingData, setLocalStorage, setTrackingData} from "../../utils/local-storage";
import only18 from '../../../assets/img/auth/18only.png'
import backgroundURL from '../../../assets/img/auth/img-17.webp'
import {Navbar, Offcanvas} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {LazyLoadImage} from "react-lazy-load-image-component";
import logo from "../../../assets/img/Logo.webp";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
	faBackspace,
	faEye, faEyeSlash, faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import SidebarMobile from "../../sidebar/awesome/SidebarMobile";
import makeRequest from "../../utils/fetch-request";
import betNiMoto from '../../../assets/img/BetniMoto.webp'
import {Form, Formik} from "formik";
import {Context} from "../../../context/store";
import SliderPromos from "./SliderPromos";
import {Notify} from "../../header/top-login";
import {ToastContainer} from "react-toastify";

const backgroundStyle = {
	backgroundImage: `url(${backgroundURL})`,
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover'
}

const RegisterTwo = props => {

	const [state,dispatch]=useContext(Context)
	// const {setUser} = props;
	const expand = "md"

	const AppConfig = useCallback(async () => {
		let endpoint ="/v1/bet/settings"

		await makeRequest({ url: endpoint, method: "POST", data: null }).then(
			([status, result]) => {
				if(status===200){
					dispatch({type: "SET", key: "app_config", payload: result?.data||result});
				}

			}
		);

	}, []);


	useEffect(()=>{
		const abortController=new AbortController()
		AppConfig()
		return abortController.abort()
	},[])

	{(state?.registerSuccess&&state?.app_config?.message?.accountConfiguration?.verificationEnabled=="1")&&setTimeout(navigateToFormStep(3),1500)}
	return (<>

			<div style={{height:'100vh', background:'#16202C'}}>
				<div className={''}>
					<Navbar expand="md" className="mb-0 ck pc os app-navbar top-nav top-register-page" fixed="top" variant="dark" style={{paddingLeft:'0px',paddingBottom:'0px'}}>
						<Container fluid className={'d-flex justify-content-between mobile-change top-login-background-img'}>
							<Navbar.Brand className="e logo align-self-start menu-control d-flex w-100" title="Betnare" style={{paddingLeft:'0px',paddingBottom:'0px'}}>
								<Link to={'/'} className={'text-light'}>
									<FontAwesomeIcon icon={faBackspace}/> HOME
								</Link>
								<div
									className="col-md-6  d-flex  right justify-content-end align-items-center w-change3 gap-2 top-login-background-img-bg-page"
									style={{marginLeft: 'auto', background:"var(--betnare-header-bg"}}>
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
								<Offcanvas.Body >
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
							<div className={'width-page-centric register-page'}>
								<Row justify="center" className={"full-width-registration-page"}>

									<div className={'d-flex w-100'}>
										{/**/}
										<div className={'w-100'} >
											{/*{user?setTimeout(navigate("/"),500):""}*/}
											<div className={"d-flex flex-row justify-content-between"}>
												<div className=" w-100">
													<div className="homepage d-flex flex-column align-items-center justify-content-center login-page">
														<div className="col-md-12 mt-2 text-white p-2 w-100">

															<div className="pb-0" data-backdrop="static">
																<ToastContainer/>
																<Steppers/>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</Row>
							</div>

						</div>
					</div>
				</Row>
			</div>
			</>

	)
}

const MyVerifyAccountForm = (props) => {
	const {errors, values, submitForm, setFieldValue} = props;
	const [state,dispatch]=useContext(Context)
	const resendOTP = () => {
		console.log("here is the value")

		let endpoint = '/v1/code';

		let payload = {
			mobile: values?.mobile
		}

		makeRequest({url: endpoint, method: 'POST', data: payload}).then(([status, response]) => {

			// setMessage(response.success ? response.success.message : response.error.message);
			dispatch({type: "SET", key: "verifyMessage", payload: response.success ? response.success.message : response.error.message})
			// response.success?dispatch({type: "SET", key: "verifySuccess", payload: true}):dispatch({type: "SET", key: "verifySuccess", payload: false})

			let timer = setInterval(() => {
				// setIsMobileNumberValid(false)
				dispatch({type: "SET", key: "isMobileNumberValid", payload: false})
				clearInterval(timer)
			}, 3000)
			response?.success&&timer()
			// response.error ? setSuccess(false) : setSuccess(false)
			response.success?dispatch({type: "SET", key: "verifySuccess", payload: true}):dispatch({type: "SET", key: "verifySuccess", payload: false})

		})
	}

	const onFieldChanged = (ev) => {
		let field = ev.target.name;
		let value = ev.target.value;
		setFieldValue(field, value);
		// setIsMobileNumberValid(value.trim() !== '');
		dispatch({type: "SET", key: "isMobileNumberValid", payload: value.trim() !== ''})
	}
	return (
		<Form>
			<div className="pt-0">
				<div className="w-100">

					<div className="form-group row d-flex justify-content-center mt-3">
						<div className="col-md-12">
							<label>Mobile Number</label>
							<div className="row">
								<div className="col-md-12 mb-3">
									<input
										value={values.mobile}
										className="h-100 text-light deposit-input form-control col-md-12 input-field"
										id="mobile"
										name="mobile"
										type="text"
										placeholder='Phone number'
										onChange={ev => onFieldChanged(ev)}
									/>
									{state?.isMobileNumberValid && errors.mobile && (
										<div className='text-danger'>{errors.mobile}</div>
									)}
								</div>
								<div className="col-md-4 d-flex justify-content-between">
                                        <span className='' style={{
											marginLeft: 'auto',
											whiteSpace: 'nowrap',
											gap: '10px',
											width: 'auto',
										}}>
                                            Didn't receive code? Resend Code
                                        </span>
									&nbsp;
									<button onClick={() => resendOTP()} type={"button"}
											className='btn py-1 px-2 text-light btn-sm bg-success rounded-3 border-0 ' style={{fontSize:"12px",whiteSpace:'nowrap'}} disabled={!state?.isMobileNumberValid}>Resend OTP
									</button>
								</div>
							</div>

						</div>
					</div>

					<div className="form-group row d-flex  mt-4">
						<div className="col-md-12">
							<label>Code (OTP)</label>
							<input
								value={values?.code||''}
								className="text-light deposit-input form-control col-md-12 input-field"
								id="code"
								name="code"
								type="code"
								placeholder='Code'
								onChange={ev => onFieldChanged(ev)}
							/>
							{errors.code && <div className='text-danger'> {errors.code} </div>}
						</div>
					</div>
					<div className="form-group row d-flex justify-content-left mb-4">
						<div className="col">
							<button type="submit"
									disabled={state?.inputDisabled}
									onClick={submitForm}
									className=' btn btn-lg w-100 button-radius input-field btn-font cg login-button btn button-page' style={{marginTop:"47px"}}>
								VERIFY ACCOUNT
							</button>
						</div>
					</div>
				</div>
			</div>
		</Form>
	);
}

const VerifyAccountForm = (props) => {
	const [state,dispatch]=useContext(Context)

	const initialValues = {
		mobile: '',
		code: ''
	}
	const verifyAccount = () => {
		let code = new URL(window.location).searchParams.get('code')
		let msisdn = new URL(window.location).searchParams.get('msisdn')
		if (code !== null && msisdn !== null) {
			dispatch({type: "SET", key: "inputDisabled", payload: true})

			handleSubmit({
				mobile: msisdn,
				code: code
			})
		}
	}

	useEffect(() => {
		verifyAccount()
	}, [])
	const handleSubmit = values => {
		let endpoint = '/v1/verify';
		makeRequest({url: endpoint, method: 'POST', data: values}).then(([status, response]) => {
			// setMessage(response.success ? response.success.message : response.error.message);
			// response.success ? setSuccess(true) : setSuccess(false)
			dispatch({type: "SET", key: "verifyMessage", payload: response.success ? response.success.message : response.error.message})
			response.success?dispatch({type: "SET", key: "verifySuccess", payload: true}):dispatch({type: "SET", key: "verifySuccess", payload: false})
			dispatch({type:"SET",key:"signup_msisdn",payload:null})

			if (response?.success) {
				setLocalStorage('user', response?.success?.user);
				let timer = setInterval(() => {
					clearInterval(timer)
					window.location.href = "/"
				}, 1000)
			}

		}).catch((err) => {

		})
	}

	const validate = values => {

		let errors = {}

		if (!values.mobile || !values.mobile.match(/(254|0|)?[71]\d{8}/g)) {
			errors.mobile = 'Please enter a valid phone number'
		}

		if (!values.code || values.code.length < 4) {
			errors.code = "Please enter four or more characters for code";
		}

		return errors
	}

	const verifyRef = useRef()

	return (
		<Formik
			innerRef={verifyRef}
			initialValues={initialValues}
			onSubmit={handleSubmit}
			validateOnChange={false}
			validateOnBlur={false}
			validate={validate}
			render={(props) => <    MyVerifyAccountForm {...props} />}/>
	);
}

const SignupForm = (props) => {
	const [state,dispatch]=useContext(Context)
	const initialValues = {
		msisdn: '',
	}

	const handleSubmit = values => {
		dispatch({type: "SET", key: "signup_msisdn", payload: values?.msisdn});
		// Call the function to navigate to the next step (step 2 in this case)
		dispatch({type: "SET", key: "steps", payload: 2});
		navigateToFormStep(2); // Step 6

	}

	const validate = values => {

		let errors = {}

		if (!values.msisdn || !values.msisdn.match(/(254|0|)?[71]\d{8}/g)) {
			errors.msisdn = 'Please enter a valid phone number'
		}

		return errors
	}
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

const FormTitle = () => {
	return (
		<div className='col-md-12  pt-1 text-center-stepper text-light' >
			<h4 className="inline-block">
				SIGNUP | CREATE A NEW ACCOUNT
			</h4>
		</div>
	)
}
const MySignupForm = (props) => {
	const [state,dispatch]=useContext(Context)
	const {errors, values, submitForm, setFieldValue} = props;
	const onFieldChanged = (ev) => {
		let field = ev.target.name;
		let value = ev.target.value;
		setFieldValue(field, value);
	}

	const navigate=useNavigate()
	return (
		<Form>
			<div className="pt-0">
				<div className="w-100">
					<div className="form-group  w-100 d-flex justify-content-center mt-5">
						<div className="col-md-12 w-100">
							<label>Mobile Number</label>
							<input
								value={values.msisdn}
								className="text-light deposit-input form-control col-md-12 input-field input-bg-user"
								id="msisdn"
								name="msisdn"
								type="text"
								placeholder='+254712345678'
								onChange={ev => onFieldChanged(ev)}
							/>

							{errors.msisdn && <div className='text-danger'> {errors.msisdn} </div>}
						</div>
					</div>
					<br/>
					<div className="form-group w-100 d-flex justify-content-left mb-4">
						<div className="col">
							<button type={"submit"}
									className=' btn btn-lg w-100 button-radius input-field btn-font cg login-button2 btn ' style={{marginTop:"28px"}}>
								<strong style={{fontWeight:"800"}}>NEXT</strong>
							</button>
							{state?.app_config?.message?.accountConfiguration?.verificationEnabled!=="0"&&<div className={`d-flex justify-content-center w-100 mt-3 cursor-pointer`}  title="Verify" onClick={()=> {
								navigate("/verify");
								dispatch({type: "SET", key: "steps", payload: 3});
							}}>
								<span className={`text-warning font-input register-label font-verify-redirect`}>Already have a verification code ?  </span>
							</div>}
						</div>
					</div>
				</div>
			</div>
		</Form>
	);
}

const PasswordForm = (props) => {
	const [state,dispatch]=useContext(Context)
	const navigate = useNavigate();
	const initialResetFormValues = {
		link_code:'',
		password: '',
		repeat_password: ''
	}
	const handleSavePassword= values => {

		// Call the function to navigate to the next step (step 2 in this case)
		dispatch({type: "SET", key: "steps", payload: 3});
		dispatch({type: "SET", key: "signup_password", payload:values?.password });
		navigateToFormStep(3); // Step 6

	}


	const validatePassword = password_values => {

		let password_errors = {}

		if (password_values.password.length < 4) {
			password_errors.password = "Your password should be greater than 4 numbers."
		}

		if (!password_values.password) {
			password_errors.password = "Please enter your new password"
		}

		if (!password_values.repeat_password) {
			password_errors.repeat_password = "Please enter your password confirmation"
		}

		if (password_values.password !== password_values.repeat_password) {
			password_errors.repeat_password = "The passwords do not match. Please enter the password you entered above."
		}

		return password_errors
	}
	return (
		<Formik
			initialValues={initialResetFormValues}
			onSubmit={handleSavePassword}
			validateOnChange={false}
			validateOnBlur={false}
			validate={validatePassword}
		>{(props) => <MyPasswordForm {...props} />}</Formik>
	);
}

const MyPasswordForm = (props) => {
	const {errors, values, submitForm, setFieldValue} = props;
	const [showPassword, setShowPassword] = useState(false);
	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};
	const [showInput,setShowInput]=useState(false)

	const show_input=()=>{
		setShowInput(!showInput);
	}

	const onFieldChanged = (ev) => {
		let field = ev.target.name;
		let value = ev.target.value;
		setFieldValue(field, value);
	}
	return (
		<Form className={`d-block`}>
			<div className="pt-0">
				<div className="row">
					<div className="col-md-12">
						<div className="col-md-12 px-2">
								<h2 className={'text-center mt-3'}>
									Enter  Passwords
								</h2>
							</div>
						</div>
						<div className="form-group w-100 d-flex justify-content-center mt-2">
							<div className="col-md-12 w-100">
								<label>Password</label>
								<div className="input-group input-color-icon w-100" style={{ display: 'flex' , background:'white'}}>
									<input
										value={values.password}
										className=" w-75 text-light deposit-input form-control col-md-12 input-field"
										id="password_reset"
										name="password"
										type={showPassword ? 'text' : 'password'}
										autoComplete={'on'}
										placeholder='Password'
										onChange={ev => onFieldChanged(ev)}
									/>
									<div className=" col-2 input-group-append">
										<div className="input-group-text  border-0 input-color-icon">
											<button
												style={{  height: 'parent'}}
												type="button"
												className="btn btn-link text-decoration-none input-color-icon"
												onClick={toggleShowPassword}
											>
												{showPassword ? (
													<FontAwesomeIcon icon={faEyeSlash} style={{ color: 'var(--light)', fontSize: '20px' }} />
												) : (
													<FontAwesomeIcon icon={faEye} style={{ color: 'var(--light)', fontSize: '20px' }} />
												)}
											</button>
										</div>
									</div>
								</div>
								{errors.password && <div className='text-danger'>
									{errors.password}
								</div>}
							</div>
						</div>
						<div className="form-group w-100 d-flex justify-content-center mt-5">
							<div className="col-md-12 w-100">
								<label>Confirm Password</label>
								<div className="input-group input-color-icon w-100" style={{ display: 'flex' }}>
									<input
										value={values.repeat_password}
										className="w-75 text-light deposit-input form-control col-md-12 input-field"
										id="confirm_password"
										name="repeat_password"
										type={showPassword ? 'text' : 'password'}
										placeholder='Password'
										onChange={ev => onFieldChanged(ev)}
									/>
									<div className=" col-2 input-group-append">
										<div className="input-group-text  border-0 input-color-icon">
											<button
												style={{  height: 'parent'}}
												type="button"
												className="btn btn-link text-decoration-none input-color-icon"
												onClick={toggleShowPassword}
											>
												{showPassword ? (
													<FontAwesomeIcon icon={faEyeSlash} style={{ color: 'var(--light)', fontSize: '20px' }} />
												) : (
													<FontAwesomeIcon icon={faEye} style={{ color: 'var(--light)', fontSize: '20px' }} />
												)}
											</button>
										</div>
									</div>
								</div>
								{errors.repeat_password &&
									<div className='text-danger'>
										{errors.repeat_password}
									</div>}
							</div>
						</div>
					</div>

					<div className="form-group w-100 d-flex justify-content-left mb-4">
						<div className="col">
							<button type="submit"
									onClick={submitForm}
									className='w-100 btn btn-lg btn-primary mt-5 col-md-12 deposit-withdraw-button button-page'>
								NEXT
							</button>
						</div>
					</div>
				</div>
		</Form>
	);
}


const ReferalForm = React.memo(
	(props) => {
		const [state,dispatch]=useContext(Context)
		const initialValues = {
			promo_code:'',
		}
		const navigate=useNavigate()
		const handleSubmit = values => {

			let endpoint = '/v1/signup'

			setTrackingData(values)
			console.log("payload_values", values)
			const payload={
				promo_code:values.promo_code,
				msisdn: state?.signup_msisdn,
				password: state?.signup_password
			}
			console.log("payload", payload)
			setTrackingData(payload)

			makeRequest({url: endpoint, method: 'POST', data: payload}).then(([status, response]) => {
				// setSuccess(status === 200 || status === 201);
				// setMessage(response?.success?.message || "");
				dispatch({type: "SET", key: "registerSuccess", payload: status === 200 || status === 201})
				dispatch({type: "SET", key: "registerMessage", payload: response?.success?.message})

				if (values.utm_source !== undefined) {
					if (values.utm_source === 'eskimi') {
						window.esk('track', 'Conversion');
					}
					if (values.utm_source === 'google') {
						window.gtag_report_conversion(window.location)
					}
				}
				clearTrackingData()
				let timer = setTimeout(() => {
					if(status===200){
						return state?.app_config?.message?.accountConfiguration?.verificationEnabled!=="0"?navigate("/verify"):navigate("/login")
					}
					clearTimeout(timer)
				}, 3000)

			})

		}

		const AlertUser = async () => {
			console.log("user_state",state?.registerMessage)
			if (state?.registerMessage !== undefined&&state?.registerMessage !== null) {
				let message = {
					status: 200,
					message: state?.registerMessage || "Error attempting to Register"
				};

				Notify(message);
				dispatch({type: "SET", key: "registerMessage", payload: null});

			}
		}

		return (
			<Formik
				initialValues={initialValues}
				onSubmit={handleSubmit}
				render={(props) => <MyReferalCodeForm {...props} />}/>
		);
	})
const MyReferalCodeForm = (props) => {
	const {errors, values, submitForm, setFieldValue} = props;
	const onFieldChanged = (ev) => {
		let field = ev.target.name;
		let value = ev.target.value;
		setFieldValue(field, value);
	}
	return (
		<Form className={`d-block`}>
			<div className="pt-0">
				<div className="row">
					<div className="col-md-12">
						<div className="col-md-12 px-2">
							<div className="form-group row d-flex justify-content-center mt-1">
									<>
										<input
											value={values.promo_code||""}
											className="text-light deposit-input form-control col-md-12 input-field"
											id="promo_code"
											name="promo_code"
											type="text"
											placeholder='Referal Code'
											onChange={ev => onFieldChanged(ev)}
										/>
										{errors.promo_code &&
											<div className='text-danger'>
												{errors.promo_code}
											</div>
										}
									</>
							</div>

						</div>
					</div>

					<div className="form-group w-100 d-flex justify-content-left mb-4">
						<div className="col">
							<button type="submit"
									onClick={submitForm}
									className='w-100 btn btn-lg btn-primary mt-5 col-md-12 deposit-withdraw-button button-page'>
								COMPLETE
							</button>
						</div>
					</div>
				</div>
			</div>
		</Form>
	);
}

const navigateToFormStep = (stepNumber) => {

	// Hide all form steps
	document.querySelectorAll(".form-step").forEach((formStepElement) => {
		formStepElement.classList.add("d-none");
	});

	// Mark all form steps as unfinished
	document.querySelectorAll(".form-stepper-list").forEach((formStepHeader) => {
		formStepHeader.classList.add("form-stepper-unfinished");
		formStepHeader.classList.remove("form-stepper-active", "form-stepper-completed");
	});

	// Show the current form step (as passed to the function)
	document.querySelector(`#step-${stepNumber}`).classList.remove("d-none");

	// Select the form step circle (progress bar)
	const formStepCircle = document.querySelector(`li[step="${stepNumber}"]`);

	// Mark the current form step as active
	formStepCircle.classList.remove("form-stepper-unfinished", "form-stepper-completed");
	formStepCircle.classList.add("form-stepper-active");

	// Loop through each form step circles
	// This loop will continue up to the current step number
	for (let index = 0; index < stepNumber; index++) {
		// Select the form step circle (progress bar)
		const formStepCircle = document.querySelector(`li[step="${index}"]`);

		// Check if the element exists. If yes, then proceed
		if (formStepCircle) {
			// Mark the form step as completed
			formStepCircle.classList.remove("form-stepper-unfinished", "form-stepper-active");
			formStepCircle.classList.add("form-stepper-completed");
		}
	}
};

const Steppers = () => {

	const [state,dispatch]=useContext(Context)

	const Alert = (props) => {
		let c = state?.registerSuccess ? 'success' : 'danger';
		return (<div role="alert" className={`fade alert alert-${c} show`}>{state?.registerMessage}</div>);

	};
	useEffect(() => {
		// Select all form navigation buttons and add event listeners
		const formNavigationButtons = document.querySelectorAll(".btn-navigate-form-step");

		formNavigationButtons.forEach((formNavigationBtn) => {
			// Add a click event listener to the button
			formNavigationBtn.addEventListener("click", () => {
				// Get the value of the step
				const stepNumber = parseInt(formNavigationBtn.getAttribute("step_number"));

				// Call the function to navigate to the target form step
				dispatch({type: "SET", key: "steps", payload: stepNumber});
				navigateToFormStep(stepNumber);
			});
		});

		// Cleanup the event listeners on component unmount
		return () => {
			formNavigationButtons.forEach((formNavigationBtn) => {
				formNavigationBtn.removeEventListener("click", () => {});
			});
		};
	}, []);

	return (
		<>
			<div className={"stepper"}>
				<FormTitle/>
				{state?.registerMessage && <Alert/>}
				<div id="multi-step-form-container">
					{/*//Form Steps / Progress Bar*/}
					<ul className="form-stepper form-stepper-horizontal text-center-stepper mx-auto pl-0">
						{/*//  Step 1 */}
						<li className="form-stepper-active text-center-stepper form-stepper-list" step="1">
							<a className="mx-2">
                    <span className="form-stepper-circle">
                        <span>1</span>
                    </span>
								<div className="label stepper-text-label">Phone Number</div>
							</a>
						</li>
						{/* Step 2 */}
						<li className="form-stepper-unfinished text-center-stepper form-stepper-list" step="2">
							<a className="mx-2">
                    <span className="form-stepper-circle text-muted">
                        <span>2</span>
                    </span>
								<div className="label text-muted stepper-text-label">Passwords</div>
							</a>
						</li>
						{/*// Step 3 */}
						<li className="form-stepper-unfinished text-center-stepper form-stepper-list" step="3">
							<a className="mx-2">
                    <span className="form-stepper-circle text-muted">
                        <span>3</span>
                    </span>
								<div className="label text-muted stepper-text-label">Finish</div>
							</a>
						</li>
					</ul>

					{/*// <!-- Step Wise Form Content -->*/}
					<div id="userAccountSetupForm" name="userAccountSetupForm">
						{/*progrees bar  for promotions on Registration promos*/}
						<SliderPromos />
						{/*// <!-- Step 1 Content -->*/}
						<section id="step-1" className="form-step">
							<h2 className="font-normal">Account Basic Details</h2>
							{/*// <!-- Step 1 input fields -->*/}
							<SignupForm/>

						</section>
						{/*// <!-- Step 2 Content, default hidden on page load. -->*/}
						<section id="step-2" className="form-step d-none">
							<PasswordForm/>
							<div className="mt-3 d-flex justify-content-between">
								<button className="button btn-navigate-form-step" type="button" step_number="1">Previous
								</button>

							</div>
						</section>
						{/*// <!-- Step 3 Content, default hidden on page load. -->*/}
						<section id="step-3" className="form-step d-none">
							<h2 className="font-normal align-header-referal">Do you have a referral code? Enter Here or Click Complete</h2>
							{/*<VerifyAccountForm/>*/}
							<ReferalForm/>
							<div className="mt-3 d-flex justify-content-between">
								<button className="button btn-navigate-form-step" type="button" step_number="2">Previous
								</button>
								{/*<button className="button submit-btn" type="submit">Finish</button>*/}
							</div>
						</section>
					</div>
				</div>
			</div>
		</>
	)
}
export default React.memo(RegisterTwo)
