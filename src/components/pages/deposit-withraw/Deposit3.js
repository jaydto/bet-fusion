import React, {useCallback, useContext, useEffect, useRef, useState} from 'react'
import { Row, Col } from "antd";
import authImg from '../../../assets/img/Logo.webp'
import betNiMoto from '../../../assets/img/BetniMoto.webp'

import {Link, useNavigate} from "react-router-dom";

import useWindowDimensions from "../../header/Dimensions";
import {clearTrackingData, getFromLocalStorage, setTrackingData} from "../../utils/local-storage";
import only18 from '../../../assets/img/auth/18only.png'
import backgroundURL from '../../../assets/img/auth/img-17.webp'
import {Navbar, Offcanvas} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {LazyLoadImage} from "react-lazy-load-image-component";
import logo from "../../../assets/img/Logo.webp";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBackspace,

} from "@fortawesome/free-solid-svg-icons";
import SidebarMobile from "../../sidebar/awesome/SidebarMobile";
import makeRequest from "../../utils/fetch-request";
import {Form, Formik} from "formik";
import {Context} from "../../../context/store";
import {getBetslip} from "../../utils/betslip";
import mpesa from "../../../assets/img/mpesa.png";
const backgroundStyle = {
    backgroundImage: `url(${backgroundURL})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
}


const Deposit3= props => {
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const expand = "md"
    const {height, width} = useWindowDimensions();
    const [user, setUser] = useState(getFromLocalStorage("user"));

    const [state, dispatch] = useContext(Context);
    const [success, setSuccess] = useState(false);
    const {mobile} = props


    const initialValues = {
        amount: '',
        msisdn: state?.user?.msisdn
    }

    const handleSubmit = values => {
        let endpoint = '/stk/deposit';
        setTrackingData(values)
        makeRequest({url: endpoint, method: 'POST', data: values}).then(([status, response]) => {
            setSuccess(status === 200 || status === 201);
            setMessage(response);
            clearTrackingData()
        })
    }

    const validate = values => {

        let errors = {}

        if (!values.msisdn || !values.msisdn.match(/(254|0|)?[71]\d{8}/g)) {
            errors.msisdn = 'Please enter a valid phone number'
        }

        if (!values.amount || values.amount < 1 || values.amount > 100000) {
            errors.amount = "Please enter amount between KES 1.00 and KES 100,000.00";
        }
        return errors
    }

    useEffect(() => {
        let betslip = getBetslip();
        if (betslip) {
            dispatch({type: "SET", key: "betslip", payload: betslip});
        }
    }, [])

    const FormTitle = () => {
        return (
            <div className='col-md-12  p-4 text-center' style={{background:'transparent'}}>
                <h4 className="inline-block text-light">
                    DEPOSIT FUNDS (MOBILE MONEY)
                </h4>
            </div>
        )
    }


    const DepositFormFields = (props) => {
        const {values, errors, onFieldChanged} = props;
        state?.depositValidateError?.amount&&setTimeout(()=>{
            dispatch({type: "SET", key: "depositValidateError", payload: {
                    msisdn:'',
                    amount:''
                }});
        },5000)
        const prevDeposit=useRef(Number(values?.amount))
        const  incementDepositValue=(value)=>{

            prevDeposit.current=Number(values?.amount!=''?values?.amount:0)
            dispatch({type: "SET", key: "depositValue", payload:prevDeposit.current+value });
            prevDeposit.current=prevDeposit.current!=0?prevDeposit.current+value:values?.amount||0

        }

        return (
            <>

                <div className="form-group row d-flex justify-content-center deposit-widthdraw-input-desktop">
                    <div className={`${mobile?"d-none":"col-md-12"}`}>
                        <label className={'text-light'}>Phone Number</label>
                        <input
                            readOnly={true}
                            className="text-light deposit-input form-control input-field"
                            id="msisdn"
                            name="msisdn"
                            type="text"
                            value={values.msisdn}
                            placeholder='Enter Phone Number'
                        />
                        {errors.msisdn && <div className='text-danger'> {errors.msisdn} </div>}
                    </div>
                </div>

                <div className="form-group row d-flex justify-content-center mt-5 deposit-widthdraw-input-desktop">
                    <div className="btn-group w-100 gap-3" role="group" aria-label="Basic example">
                        <button type="button" onClick={()=>incementDepositValue(100)} className="deposit-buttons-value">+100</button>
                        <button type="button" onClick={()=>incementDepositValue(200)} className="deposit-buttons-value">+200</button>
                        <button type="button" onClick={()=>incementDepositValue(500)} className="deposit-buttons-value">+500</button>
                        <button type="button" onClick={()=>incementDepositValue(1000)} className="deposit-buttons-value">+1000</button>
                    </div>
                    <div className="col-md-12">
                        <label className={'text-light'}>Amount to Deposit</label>
                        <input
                            onChange={ev => {
                                onFieldChanged(ev);
                            }}
                            className="text-light deposit-input form-control col-md-12 input-field"
                            id="amount"
                            name="amount"
                            type="number"
                            value={(values.amount==''?0||values.amount:values.amount||Number(state?.depositValue))}
                            placeholder='Enter Amount'
                        />
                        {errors.amount && <div className='text-danger'> {errors.amount} </div>}
                    </div>
                </div>
                <div className="form-group row d-flex justify-content-left mb-4">
                    <div className=" d-flex align-items-start deposit-withdraw-button-desktop">
                        <button type={"submit"}
                                className='btn btn-lg w-100 button-radius input-field btn-font cg login-button2 btn bold' style={{marginTop:"47px"}}>
                            Deposit
                        </button>
                    </div>
                </div>
            </>
        )
    }

    const PaymentInstructions = (props) => {
        return (
            <>
                <label className='text-light'>Deposit Instructions</label>
                <div className="container">
                    <div className="row">
                        <div className="col text-light"> 1. Enter the amount you want to deposit.</div>
                    </div>
                    <div className="row">
                        <div className="col text-light"> 2. Click on the deposit button.</div>
                    </div>
                    <div className="row">
                        <div className="col text-light"> 3. Check your phone for an M-Pesa Request.</div>
                    </div>
                    <div className="row">
                        <div className="col text-light"> 4. Enter your M-Pesa Pin to confirm the transaction.</div>
                    </div>
                    <div className="row">
                        <div className="col text-light"> 5. On successful payment, you will receive an M-Pesa
                            Confirmation.
                        </div>
                    </div>
                </div>
            </>
        );
    }
    const MyDepositForm = (props) => {
        const {errors, values, setFieldValue} = props;

        const onFieldChanged = (ev) => {
            let field = ev.target.name;
            let value = ev.target.value;
            setFieldValue(field, value);
        }

        return (
            <Form className="shadow-sm rounded border-0">
                <div className="pt-0">
                    <div className={`${mobile?"card-title":"d-none"}`}><h4>DEPOSIT</h4></div>
                    <div className="row">
                        <div className='col-md-7 text-center'>
                            <div className={`${mobile?"d-none":'col-md-7 text-center'}`}>
                                <img src={mpesa} alt=""/>
                            </div>
                        </div>
                        {/*<hr className={`${mobile?"d-none":""}`}/>*/}

                        <DepositFormFields onFieldChanged={onFieldChanged} values={values} errors={errors}/>
                        {/*<hr className={`${mobile?"d-none":"mt-4"}`}/>*/}
                        <div className={`${mobile?"d-none":""}`}>
                            <PaymentInstructions />
                        </div>

                    </div>
                </div>
            </Form>
        );
    }

    const DepositForm = (props) => {


        return (
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validateOnChange={false}
                validateOnBlur={false}
                validate={validate}
                render={(props) => <MyDepositForm {...props} />}/>
        );
    }

    const Alert = (props) => {
        let c = success ? 'success' : 'danger';
        return (<>{message && <div role="alert" className={`fade alert alert-${c} show`}>{message}</div>} </>);

    };


    return (
        <div style={{height:'100vh', background:'#16202C'}}>
            <div className={''}>
                <Navbar expand="md" className="mb-0 ck pc os app-navbar top-nav" fixed="top" variant="dark" style={{paddingLeft:'0px',paddingBottom:'0px'}}>
                    <Container fluid className={'d-flex justify-content-between mobile-change top-login-background-img'}>
                        <Navbar.Brand className="e logo align-self-start menu-control d-flex w-100 " title="Betnare" style={{paddingLeft:'0px',paddingBottom:'0px'}}>
                            <Link to={'/'} className={'text-light'}>
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
            <Row justify="center" className="align-items-stretch h-100">

                <Col xs={0} sm={0} md={0} lg={8}>
                    <div className="d-flex flex-column justify-content-between h-100 px-4" style={backgroundStyle}>
                        <div className="text-right">
                            {/*<img src="/img/logo-sm.jpg" style={{height:"35px"}}alt="logo"/>*/}
                        </div>
                        <Row justify="center">
                            <Col xs={0} sm={0} md={0} lg={20}>
                                <Link to={'/'}>
                                    <img className="img-fluid mb-5" src={authImg} alt=""/>
                                </Link>

                                <h1 className="text-white text-center" style={{fontSize:"30px"}}>Deposit Cash Into Your Account</h1>
                                <p className="text-white px-3 d-flex align-items-center justify-content-center mt-3" style={{fontSize:"16px", opacity:'0.5px'}}><img src={betNiMoto}  style={{width:"150px"}} alt={'betnare'}/></p>
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

                                                        <DepositForm/>
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

export default React.memo(Deposit3)

