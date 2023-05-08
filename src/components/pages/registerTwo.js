import React, {useCallback, useEffect, useState} from 'react'
import { Row, Col } from "antd";
import authImg from '../../assets/img/Logo.webp'

import {Link, useNavigate} from "react-router-dom";
import HeaderLogin from "../header/top-login";
import Right from "../right";
import useWindowDimensions from "../header/Dimensions";
import {getFromLocalStorage, setLocalStorage} from "../utils/local-storage";
import {toast} from "react-toastify";
import backgroundURL from '../../assets/img/auth/img-17.webp'
const backgroundStyle = {
	backgroundImage: `url(${backgroundURL})`,
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover'
}

const LoginTwo = props => {
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
				setLocalStorage('user', message.user);
				// setUser(message.user);
			}

		}
	}, [message])

	useEffect(() => {
		dispatchUser();
	}, [dispatchUser]);


	const FormTitle = () => {
		return (<div className='col-md-12 col-md-12  pt-4 text-center text-light py-3 text-center w-100 top-login-mobile' style={{margin:'0px' }}>
			<h4 className="inline-block" style={{fontSize:'30px'}}>
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
		<div style={{height:'100vh', background:'#16202C'}}>
			<Row justify="center" className="align-items-stretch h-100">

				<Col xs={0} sm={0} md={0} lg={8}>
					<div className="d-flex flex-column justify-content-between h-100 px-4" style={backgroundStyle}>
						<div className="text-right">
							{/*<img src="/img/logo-sm.jpg" style={{height:"35px"}}alt="logo"/>*/}
						</div>
						<Row justify="center">
							<Col xs={0} sm={0} md={0} lg={20}>
								<img className="img-fluid mb-5" src={authImg} alt=""/>
								<h1 className="text-white">Welcome to Betnare</h1>
								<p className="text-white">Bet ni Nare</p>
							</Col>
						</Row>
						<div className="d-flex justify-content-end pb-4">
							<div>
								<a className="text-white" href="/terms-and-conditions" onClick={e => e.preventDefault()}>Term & Conditions</a>
								<span className="mx-2 text-white"> | </span>
								<a className="text-white" href="/privacy-policy" onClick={e => e.preventDefault()}>Privacy & Policy</a>
							</div>
						</div>
					</div>
				</Col>
				<Col xs={20} sm={20} md={24} lg={16} >

					<div className="container d-flex flex-column justify-content-center h-100">
						<div  style={{boxShadow:'inset 0 0 6px #2c3c44', width:'60%', margin:'auto'}}>
							<FormTitle/>

							<Row justify="center">
								<LoginInstructions/>

								<div className={'d-flex'}>
									{/**/}
									<div >
										{user?setTimeout(navigate("/"),500):""}
										<div className={"d-flex flex-row justify-content-between"}>
											<div className=" w-100">
												<div className="homepage d-flex flex-column align-items-center justify-content-center login-page">

													<HeaderLogin setUser={setUser} login={true}/>


												</div>
												<div className={"mobile-only mobile-top"}>
													<Right/>
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
				</Col>
			</Row>
		</div>
	)
}

export default LoginTwo
