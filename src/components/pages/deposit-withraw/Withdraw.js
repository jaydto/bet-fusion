import React, {useState, useContext, useEffect} from 'react';
import mpesa from '../../../assets/img/mpesa-3.png';
import makeRequest from "../../utils/fetch-request";
import { Formik,  Form} from 'formik';
import { Context } from '../../../context/store';
import {getBetslip} from '../../utils/betslip'
import {Navbar, Offcanvas} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBackspace} from "@fortawesome/free-solid-svg-icons";
import {LazyLoadImage} from "react-lazy-load-image-component";
import logo from "../../../assets/img/Logo.webp";
import SidebarMobile from "../../sidebar/awesome/SidebarMobile";
import {Col, Row} from "antd";
import authImg from "../../../assets/img/Logo.webp";
import betNiMoto from "../../../assets/img/BetniMoto.webp";
import only18 from "../../../assets/img/auth/18only.png";
import {getFromLocalStorage, setLocalStorage} from "../../utils/local-storage";
import backgroundURL from "../../../assets/img/auth/img-17.webp";
const backgroundStyle = {
    backgroundImage: `url(${backgroundURL})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
}
const Withdrawal = (props) => {
    //todo get the phone number from logged in user ....
    const [state, dispatch] = useContext(Context);
    const navigate = useNavigate();

    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState(null);
    const {mobile}=props;

    const [user, setUser] = useState(getFromLocalStorage("user"));
    const updateUserOnHistory = () => {
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
                setUser(u)
                dispatch({type: "SET", key: "user", payload: u});
            }
        });

    };



    useEffect(() => {
        updateUserOnHistory()
    }, [message])

    const initialValues = {
        amount: '',
        msisdn: state?.user?.msisdn
    }

    const handleSubmit = values => {
        let endpoint = '/withdraw';
        makeRequest({url: endpoint, method: 'POST', data: {user:values}, use_jwt:true}).then(([status, response]) => {
            setSuccess(status === 200 || status === 201);
            setMessage(response);
        })
    }

    const validate = values => {

        let errors = {}

        if (!values.msisdn || !values.msisdn.match(/(254|0|)?[71]\d{8}/g) ) {
            errors.msisdn = 'Please enter a valid phone number'
        }
        //Removed the  upper limit  values.amount > 70000
        if (!values.amount || values.amount < 100 ) {
            errors.amount = "Please enter amount above KES 100";
        }
        return errors
    }

    const FormTitle = () => {
        return (
            <div className='col-md-12 primary-bg p-4 text-center'>
                <h4 className="inline-block">
                    WITHDRAW FUNDS (MOBILE MONEY)
                </h4>
            </div>
        )
    }
    useEffect(() => {
        let betslip = getBetslip();
        if (betslip) {
            dispatch({type: "SET", key: "betslip", payload: betslip});
        }
    }, [])


    const WithdrawFormFields = (props) => {
        const { values, errors, onFieldChanged } = props;

        return (
            <>
                <div className="form-group row d-flex justify-content-center deposit-widthdraw-input-desktop">
                    <div className={`${mobile?"d-none":"col-md-12"}`}>
                        <label className={'betnare-text-light'}>Phone Number</label>
                        <input
                            // readOnly={true}
                            className="betnare-text-light deposit-input form-control input-field"
                            id="msisdn"
                            name="msisdn"
                            type="text"
                            value ={values.msisdn}
                            placeholder='Enter Phone Number'
                        />
                        {errors.msisdn &&  <div className='text-danger'> {errors.msisdn} </div>  }
                    </div>
                </div>
                <div className="form-group row d-flex justify-content-center mt-5 deposit-widthdraw-input-desktop">
                    <div className="col-md-12">
                        <label className={'betnare-text-light'}>Amount to Withdraw</label>
                        <input
                            onChange={ev => onFieldChanged(ev) }
                            className="betnare-betnare-text-light deposit-input form-control col-md-12 input-field"
                            id="amount"
                            name="amount"
                            type="number"
                            value ={values.amount}
                            placeholder='Enter Amount'
                        />
                        {errors.amount &&  <div className='text-danger'> {errors.amount} </div>  }
                        <div className=" d-flex align-items-start deposit-withdraw-button-desktop-profile  mb-3 ">
                            <button type={"submit"}
                                    className='btn btn-lg w-100 button-radius input-field btn-font cg login-button2 btn bold' style={{marginTop:"38px"}}>
                                WITHDRAW
                            </button>
                        </div>
                    </div>
                </div>

            </>
        )
    }


    const PaymentInstructions = (props) => {
        return (
            <>
                <label className='header text-info'>Withdrawal Instructions</label>
                <div className="container d-flex flex-column">
                    <div className="row"><div className="col betnare-text-light"> 1. Enter the phone M-Pesa phone number to receive the funds.  </div></div>
                    <div className="row"><div className="col betnare-text-light"> 2. Enter the amount you wish to withdraw.</div></div>
                    <div className="row"><div className="col betnare-text-light"> 3. Click on the withdraw funds button.</div></div>
                    <div className="row"><div className="col betnare-text-light"> 4. Check your phone for an M-Pesa Confirmation.</div></div>
                </div>
            </>
        );
    }
    const MyWithdrawalForm = (props) => {
        const {errors, values, setFieldValue } = props;

        const onFieldChanged = (ev)=>{
            let field = ev.target.name;
            let value = ev.target.value;
            setFieldValue(field, value);
        }
        return (
            <Form className="shadow-sm rounded border-0" >
                <div className="pt-0">
                    <div className={`${mobile?"card-title":"d-none"}`}><h4>WITHDRAW</h4></div>
                    <div className="row">

                        <div className={`${mobile?"d-none":'col-md-7 text-center'}`}>
                            <LazyLoadImage src={mpesa} alt=""/>
                        </div>

                        <hr className={`${mobile?"d-none":""}`}/>
                        <WithdrawFormFields  onFieldChanged ={ onFieldChanged} values ={values } errors={errors} />
                        <hr className={`${mobile?"d-none":"mt-4"}`}/>
                        <div className={`${mobile?"d-none":""}`}>
                            <PaymentInstructions />
                        </div>
                    </div>
                </div>
            </Form>
        );
    }

    const WithdrawalForm = (props) => {
        return (
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validateOnChange={false}
                validateOnBlur={false}
                validate={validate}
                render = {(props) => <MyWithdrawalForm {...props} /> } />
        );
    }
    message&&setTimeout(()=>{
        setMessage(null)
    },6000)

    const Alert = (props) => {
        let c = success ? 'success' : 'danger';
        return (<>{ message  && <div role="alert" className={`fade alert alert-${c} show`}>{message}</div> } </>) ;

    };
    const expand = "md"

    return (
        <React.Fragment>
            {/*<div className={`${mobile?"d-none":""}`}>*/}
            {/*    <Header/>*/}
            {/*</div>*/}
            <div style={{height:'100vh', background:'#16202C'}}  >
                <div className={`${mobile?"d-none":""}`}>
                    <Navbar expand="md" className="mb-0 ck pc os app-navbar top-nav top-nav-centric" fixed="top" variant="dark" style={{paddingLeft:'0px',paddingBottom:'0px'}}>
                        <Container fluid className={'d-flex justify-content-between mobile-change top-login-background-img'}>
                            <Navbar.Brand className="e logo align-self-start menu-control d-flex w-100 " title="Betnare" style={{paddingLeft:'0px',paddingBottom:'0px'}}>
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
                                <Offcanvas.Body className={('')}>
                                    <SidebarMobile/>
                                </Offcanvas.Body>
                            </Navbar.Offcanvas>
                        </Container>
                    </Navbar>

                </div>
                {/*<div className={`${mobile?"":"top-spacing"}`}>*/}
                {/*    <div className="d-flex flex-row justify-content-between">*/}
                {/*        <div className="gz home " style={{width: '100%',overflowX:"clip"}}>*/}
                {/*            <div className="homepage">*/}
                {/*                <div className={`${mobile?"d-none":""}`}>*/}
                {/*                    <FormTitle/>*/}

                {/*                </div>*/}
                {/*                <div className={`col-md-12 mt-2 text-white p-2 ${mobile?"profile-bg card-radius":""}`}>*/}
                {/*                    <Alert />*/}
                {/*                    <div className="modal-body pb-0" data-backdrop="static">*/}
                {/*                        <WithdrawalForm />*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}

                {/*    </div>*/}
                {/*</div>*/}
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

                                    <h1 className="text-white text-center" style={{fontSize:"30px"}}>Withdraw Cash From Your Account</h1>
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
                            <div className={'width-page-centric deposit-page'}>
                                <FormTitle/>

                                <Row justify="center">

                                    <div className={'d-flex'}>
                                        {/**/}
                                        <div >
                                            {!user?setTimeout(navigate("/"),500):""}
                                            <div className={"d-flex flex-row justify-content-between"}>
                                                <div className=" w-100">
                                                    <div className="homepage d-flex flex-column align-items-center justify-content-center login-page">

                                                        <Alert/>
                                                        <div className="modal-body pb-0" data-backdrop="static">

                                                            <WithdrawalForm/>
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

        </React.Fragment>
    )
}

export default React.memo(Withdrawal);
