import React, {useState, useContext, useEffect} from 'react';

import {Formik, Form} from 'formik';
import makeRequest from "../../utils/fetch-request";
import mpesa from '../../../assets/img/mpesa.png'
import {Context} from '../../../context/store';
import {getBetslip} from '../../utils/betslip'
import {clearTrackingData, getFromLocalStorage, setTrackingData} from "../../utils/local-storage";
import {Navbar, Offcanvas} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";
import logo from "../../../assets/img/Logo.webp";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faPowerOff} from "@fortawesome/free-solid-svg-icons";
import SidebarMobile from "../../sidebar/awesome/SidebarMobile";
import HeaderNav from "../../header/header-nav";
import useWindowDimensions from "../../header/Dimensions";
import '../Accounts/card.css'
const Header = React.lazy(() => import('../../header/header'));
const Footer = React.lazy(() => import('../../footer/footer'));


const Deposit2 = (props) => {

    const [state, dispatch] = useContext(Context);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState(null);
    const {mobile} = props
    const expand = "md"
    const {height, width} = useWindowDimensions();
    const [user, setUser] = useState(getFromLocalStorage("user"));

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

        if (!values.amount || values.amount < 1 || values.amount > 70000) {
            errors.amount = "Please enter amount between KES 1.00 and KES 70,000.00";
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
                <h4 className="inline-block">
                    DEPOSIT FUNDS (MOBILE MONEY)
                </h4>
            </div>
        )
    }


    const DepositFormFields = (props) => {
        const {values, errors, onFieldChanged} = props;

        return (
            <>
                <div className="form-group row d-flex justify-content-center deposit-widthdraw-input-desktop">
                    <div className={`${mobile?"d-none":"col-md-12"}`}>
                        <label>Phone Number</label>
                        <input
                            readOnly={true}
                            className="text-dark deposit-input form-control input-field"
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
                    <div className="col-md-12">
                        <label>Amount to Deposit</label>
                        <input
                            onChange={ev => onFieldChanged(ev)}
                            className="text-dark deposit-input form-control col-md-12 input-field"
                            id="amount"
                            name="amount"
                            type="text"
                            value={values.amount}
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
                <label className='text-info'>Deposit Instructions</label>
                <div className="container">
                    <div className="row">
                        <div className="col"> 1. Enter the amount you want to deposit.</div>
                    </div>
                    <div className="row">
                        <div className="col"> 2. Click on the deposit button.</div>
                    </div>
                    <div className="row">
                        <div className="col"> 3. Check your phone for an M-Pesa Request.</div>
                    </div>
                    <div className="row">
                        <div className="col"> 4. Enter your M-Pesa Pin to confirm the transaction.</div>
                    </div>
                    <div className="row">
                        <div className="col"> 5. On successful payment, you will receive an M-Pesa
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
        <React.Fragment>
            <Navbar expand="md" className="mb-0 ck pc os app-navbar top-nav" fixed="top" variant="dark" style={{paddingLeft:'0px',paddingBottom:'0px'}}>
                <Container fluid className={'d-flex justify-content-between mobile-change'}>
                    <Navbar.Brand className="e logo align-self-start menu-control d-flex w-100" title="Betnare" style={{paddingLeft:'0px',paddingBottom:'0px'}}>
                        <Link to={{pathname: "/"}} className="col-4 resize-mobile">
                            <LazyLoadImage src={logo} alt="Betnare" title="Betnare" effects="blur"
                                           className={"image-size "}/>
                        </Link>
                        <div
                            className="col-md-6  d-flex  right justify-content-end align-items-center w-change2 gap-2 "
                            style={{marginLeft: 'auto'}}>
                            <div>
                                <Link
                                    to={{pathname: "/"}}
                                    className={"deposit-button size-font-user-action"} title={'HOME'} style={{fontSize:'14px'}}>
                                      <span className="">
                                       <span className=" "> <FontAwesomeIcon
                                           icon={faHome}/></span>&nbsp;
                                          HOME
                                      </span>
                                </Link>
                            </div>
                            {user&&<div>
                                <Link
                                    to={{pathname: "/logout"}}
                                    className={"deposit-button size-font-user-action"}
                                    style={{marginRight: "12px", fontSize: '14px'}} title={'LOGOUT'}>
                                      <span className="text-warning">
                                       <span className=" "><FontAwesomeIcon icon={faPowerOff}
                                                                            className={"text-warning"}/>
                                           </span>&nbsp;
                                          LOGOUT
                                      </span>
                                </Link>
                            </div>}
                            <div className="col-1 button-toggle mx-2" style={{width: "3.1rem"}}>
                                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"md"}`} className="px-3 py-3 user-profile" />
                            </div>
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
            <div className={'desk-top profile-desktop-style' } >
                <HeaderNav profile={true}/>
            </div>


            <div className={``}>
                <div className="d-flex flex-column justify-content-between">
                    <div className="gz home" style={{width: '100%',overflowX:'clip', border:'none'}}>
                        <div className="homepage ">

                            <div className={`col-md-12 my-4 text-white p-2  card-radius`}  style={{margin:'auto',maxWidth:'991px',marginTop:'20px',background:'transparent'}}>
                                <div className={`my-4`}>
                                    <FormTitle/>

                                </div>
                                <Alert/>
                                <div className="modal-body pb-0" data-backdrop="static">

                                    <DepositForm/>
                                </div>
                            </div>
                        </div>
                        <div className={`card-radius`} style={{maxWidth:'991px', margin:'auto'}}>
                            <Footer deposit2={true}/>
                        </div>
                    </div>

                </div>
                {/*<div className={`${mobile?"d-none":"mobile-top"}`}>*/}
                {/*    <Right deposit={true}/>*/}
                {/*</div>*/}
            </div>


        </React.Fragment>
    )

}

export default Deposit2
