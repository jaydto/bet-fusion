import React, {useContext, useEffect, useState} from 'react'
import {Col, Row} from "antd";
import authImg from '../../../assets/img/Logo.webp'
import {Link} from "react-router-dom";
import { getFromLocalStorage, setLocalStorage, setTrackingData} from "../../utils/local-storage";
import only18 from '../../../assets/img/auth/18only.png'
import backgroundURL from '../../../assets/img/auth/img-17.webp'
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Form, Formik} from "formik";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import {StoreContext} from "../../../context/store"
import mpesa from "../../../assets/img/mpesa.png";
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";
import './deposit.css'
import Header2 from "../../header/Header2";
import { userDeposits, userDepositsConfirm} from "../../../redux/dataSlice";
import {userBalance} from "../../../redux/authSlice";

import {useDispatch, useSelector} from "react-redux";

const backgroundStyle = {
    backgroundImage: `url(${backgroundURL})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
}

const Deposit3 = React.memo(
    props => {
        // const [message, setMessage] = useState(null);
        const [activeTab, setActiveTab] = useState('online'); // Set the initially active tab here
        const dispatchRedux=useDispatch()
        const userData=useSelector((state)=>state.auth.user)
        const [user, setUser] = useState(getFromLocalStorage("user"));
        const appConfigs=useSelector((state)=>state.data.app_config)
        const [settings,setSettings] = useState(getFromLocalStorage('settings'));
        const successMessage=useSelector((state)=>state.data.deposits_message)
        const errorMessage=useSelector((state)=>state.data.error)
        const successMessageConfirmation=useSelector((state)=>state.data.deposits_confirm_message)
        const [message, setMessage]=useState()
        const [messageConfirmation, setMessageConfirmation]=useState()

        useEffect(()=>{
            if(successMessageConfirmation){
                setMessageConfirmation(successMessageConfirmation)
            }else if(errorMessage){
                setMessageConfirmation(errorMessage)
            }
        },[successMessageConfirmation,errorMessage ])

        useEffect(()=>{
            if(successMessage){
                setMessage(successMessage)
            }else if(errorMessage){
                setMessage(errorMessage)
            }

        },[successMessage, errorMessage])
        useEffect(()=>{
            setSettings(appConfigs||getFromLocalStorage('settings'))
        },[appConfigs ])

        useEffect(()=>{
            setUser(userData||getFromLocalStorage("user"))
        },[userData])
        const handleTabSelect = (eventKey) => {
            setActiveTab(eventKey);
        }

        const setUtmCampaign = () => {
            const utm_source = new URL(window.location).searchParams.get('utm_source')
            const utm_campaign = new URL(window.location).searchParams.get('utm_campaign')
            const btag = new URL(window.location).searchParams.get('btag')


            if (utm_source) {
                setLocalStorage("utm_source", utm_source)
            }
            if (utm_campaign) {
                setLocalStorage("utm_campaign", utm_campaign)

            }
            if (btag) {
                setLocalStorage("btag", btag)
            }
        }


        useEffect(() => {
            const abort = new AbortController();
            setUtmCampaign()
            return () => {
                abort.abort(); // Cleanup function to abort the controller when the component unmounts.
            };
        }, [settings])


        const updateUserOnHistory = () => {
            if (!user) {
                return false;
            }
            let udata = {
                token: user.token
            }
            const userValues={
                udata:udata,
                user:user
            }

            dispatchRedux(userBalance(userValues))

        };

        useEffect(() => {
            if(successMessage){
                updateUserOnHistory()
            }
        }, [successMessage])

        const FormTitle = () => {
            return (
                <div className='col-md-12  p-4 text-center' style={{background: 'transparent'}}>
                    <h4 className="inline-block betnare-text-light">
                        DEPOSIT FUNDS (MOBILE MONEY)
                    </h4>
                </div>
            )
        }


        const Alert = () => {
            let c = successMessage ? 'success' : 'danger';
           message && setTimeout(() => {
                setMessage(null)
            }, 5500)
            return (<>{message &&
                <div role="alert" className={`fade alert alert-${c} show`}>{message}</div>} </>);

        };


        const ConfirmationAlert = (props) => {
            let c =successMessageConfirmation ? 'success' : 'danger';
            messageConfirmation && setTimeout(() => {
                setMessageConfirmation(null)
            }, 5500)
            return (<>{messageConfirmation &&
                <div role="alert" className={`fade alert alert-${c} show`}>{messageConfirmation}</div>} </>);

        };


        return (
            <div style={{height: '100vh', background: '#16202C'}}>
                <div className={''}>
                    <Header2/>
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

                                    <h1 className="text-white text-center" style={{fontSize: "30px"}}>Deposit Cash Into
                                        Your Account</h1>

                                </Col>
                            </Row>
                            <div className="d-flex justify-content-end pb-4 mb-3">
                                <div className={'d-flex justify-content-center align-items-center'}>
                                    <div
                                        className="text-white mx-2 bold d-flex justify-content-center align-items-center">
                                        <LazyLoadImage src={only18} alt={'18 only'} style={{
                                            width: '30px',
                                            background: 'aliceblue',
                                            borderRadius: '16px'
                                        }}/></div>
                                    <span className="mx-2 text-white"> | </span>
                                    <a className="text-white" href="/terms-and-conditions">Term & Conditions</a>
                                    <span className="mx-2 text-white"> | </span>
                                    <a className="text-white" href="/privacy-policy">Privacy & Policy</a>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <div
                        className={'col-lg-8 col-sm-12 top-login-background-img-bg-down top-login-background-img-bg-page'}>

                        <div
                            className="w-100 d-flex flex-column justify-content-center h-100 top-login-background-img-bg-page">
                            <div className={'width-page-centric deposit-page'}>
                                <FormTitle/>
                                <Tabs
                                    variant={'tabs'}
                                    defaultActiveKey={activeTab}
                                    id=""
                                    className="background-primary mb-3 px-3"
                                    justify
                                    onSelect={handleTabSelect}>
                                    <Tab eventKey="online" title="ONLINE " className={'background-primary'}>
                                        <div className={'w-100'}>
                                            <div className={'d-flex'}>
                                                {/**/}
                                                <div className={'size-deposit'}>
                                                    <div className={"d-flex flex-row justify-content-between"}>
                                                        <div className=" w-100">
                                                            <div
                                                                className="homepage d-flex  flex-column align-items-center  login-page">

                                                                <Alert/>
                                                                <div className=" pb-0" data-backdrop="static">

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
                                        </div>
                                    </Tab>
                                    <Tab eventKey="paybill" title="PAYBILL" className={'background-primary'}>
                                        <div className={'w-100 overflow-auto'}>
                                            <div className={'d-flex'}>
                                                <div className={'size-deposit'}>
                                                    <div className={"d-flex flex-row justify-content-between"}>
                                                        <div className=" w-100">
                                                            <div
                                                                className="homepage d-flex flex-column align-items-center justify-content-center login-page">
                                                                <div className="deposit-paybill-information pb-0"
                                                                     data-backdrop="static">
                                                                    <div
                                                                        className={'paybill-component justify-content-center d-flex flex-column align-items-center'}>
                                                                        <h3 className={'header-paybill'}>
                                                                            paybill Number
                                                                        </h3>
                                                                        <LazyLoadImage
                                                                            src={'https://storage.googleapis.com/nareimages/icons/mpesa.png'}
                                                                            className={'paybill-image'} width="50px"
                                                                            alt="mpesa"/>
                                                                        <strong className={'bold paybill-number'}>
                                                                            4087777
                                                                        </strong>
                                                                    </div>
                                                                    <div className={'paybill-offers'}>
                                                                    <span className={'header-offer'}>
                                                                        💰 Exclusive Offers 💰
                                                                    </span>
                                                                        <div className={'paybill-offers-list'}>
                                                                            <ul className={'paybill-offers-list-items'}>
                                                                                {settings?.betnareDeposit && settings?.betnareDeposit?.map((deposit, index) => {
                                                                                    return (
                                                                                        <li key={index}>{index + 1}.
                                                                                            Only pay
                                                                                            KES {deposit?.deposit_amount} to {deposit?.display_text}</li>
                                                                                    )
                                                                                })}
                                                                            </ul>
                                                                            <br/>
                                                                            (Betnare will credit your Account with The
                                                                            offers above.)
                                                                        </div>

                                                                    </div>
                                                                    <div className={'paybill-instructions'}>
                                                                     <span className={'header-paybill-instructions'}>
                                                                       Step Guide
                                                                    </span>
                                                                        <ul className={'paybill-list-instructions'}>
                                                                            <li>1. Go to Mpesa menu</li>
                                                                            <li>2. Select Payment services</li>
                                                                            <li>3. Click on Paybill</li>
                                                                            <li>4. Enter business number as 4087777</li>
                                                                            <li>5. Enter the account number as phone
                                                                                number
                                                                            </li>
                                                                            <li>6. Enter the amount you want to transfer
                                                                                to Betnare account
                                                                            </li>
                                                                            <li>7. Enter your Mpesa pin and Confirm the
                                                                                request
                                                                            </li>
                                                                            <li>8. You will shortly receive an SMS from
                                                                                Mpesa to confirm the transaction
                                                                            </li>
                                                                        </ul>
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
                                        </div>
                                    </Tab>
                                    <Tab eventKey="confirmation" title="CONFIRMATION" className={'background-primary'}>
                                        <div className={'w-100'}>
                                            <div className={'d-flex'}>
                                                {/**/}
                                                <div className={'size-deposit'}>
                                                    <div className={"d-flex flex-row justify-content-between"}>
                                                        <div className=" w-100">
                                                            <div
                                                                className="homepage d-flex  flex-column align-items-center  login-page">

                                                                <ConfirmationAlert/>
                                                                <div className=" pb-0" data-backdrop="static">

                                                                    <DepositConfirmForm/>
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
                                        </div>
                                    </Tab>

                                </Tabs>

                            </div>

                        </div>
                    </div>
                </Row>
            </div>
        )
    })

const PaymentInstructions = (props) => {
    return (
        <>
            <label className='betnare-text-light'>Deposit Instructions</label>
            <div className="container d-flex flex-column">
                <div className="row">
                    <div className="col betnare-text-light"> 1. Enter the amount you want to deposit.</div>
                </div>
                <div className="row">
                    <div className="col betnare-text-light"> 2. Click on the deposit button.</div>
                </div>
                <div className="row">
                    <div className="col betnare-text-light"> 3. Check your phone for an M-Pesa Request.</div>
                </div>
                <div className="row">
                    <div className="col betnare-text-light"> 4. Enter your M-Pesa Pin to confirm the transaction.</div>
                </div>
                <div className="row">
                    <div className="col betnare-text-light"> 5. On successful payment, you will receive an M-Pesa
                        Confirmation.
                    </div>
                </div>
            </div>
        </>
    );
}

const ConfirmationInstructions = (props) => {
    return (
        <>
            <label className='betnare-text-light'>Missing Deposit?</label>
            <div className="container d-flex flex-column">
                <div className="row">
                    <div className="col betnare-text-light"> 1. Enter Mpesa Transaction code when your deposit has not
                        reflected in your account.
                    </div>
                </div>
                <div className="row">
                    <div className="col betnare-text-light"> 2. Click on confirm deposit..</div>
                </div>
                <div className="row">
                    <div className="col betnare-text-light"> 3. Your deposit will be credited to your account.</div>
                </div>
            </div>
        </>
    );
}

const DepositConfirmFormFields = (props) => {
    const {values, errors, onFieldChanged} = props;
    const loadingConfirmDeposit=useSelector((state)=>state.data.deposit_confirm_loading)
    const userData=useSelector((state)=>state.auth.user)

    const [user, setUser] = useState(getFromLocalStorage("user"));
    useEffect(()=>{
        setUser(userData||getFromLocalStorage("user"))
    },[userData])




    return (
        <>
            <div className="form-group row d-flex justify-content-center deposit-widthdraw-input-desktop">
                <div className={`col-md-12 w-100`}>
                    <div className={'d-flex justify-content-start'}>
                        <label className={'text-light deposit col-5 deposit-label'}>MPESA CODE</label>
                    </div>
                </div>
            </div>
            {user && <hr/>}
            <div className="form-group row d-flex justify-content-center mt-3 deposit-widthdraw-input-desktop">
                <div className="col-md-12">
                    <label className={'text-light deposit'}>Mpesa Transaction Code</label>
                    <input
                        onChange={ev => {
                            onFieldChanged(ev);
                        }}
                        className="text-light deposit-input form-control col-md-12 input-field"
                        id="confirmation_code"
                        name="confirmation_code"
                        type="text"
                        value={values?.confirmation_code || ''}
                        placeholder='Enter Transactional Code'
                    />
                    {errors.confirmation_code && <div className='text-danger'> {errors.confirmation_code} </div>}
                </div>
            </div>
            <div className="form-group row d-flex justify-content-left mb-4">
                <div className=" d-flex align-items-start deposit-withdraw-button-desktop">
                    <button type={"submit"}
                            className='btn btn-lg w-100 deposit-button button-radius input-field btn-font cg login-button2 btn bold d-flex justify-content-center align-items-center'
                            style={{marginTop: "30px"}} disabled={values?.amount == ''}>
                        {loadingConfirmDeposit && <div className="loader"></div>} CONFIRM DEPOSIT &nbsp;
                    </button>
                </div>
            </div>
        </>
    )
}


const DepositFormFields = (props) => {
    const {values, errors, onFieldChanged, setCurrentDepositValue, currentDepositValue} = props;
    const {state, dispatch} = useContext(StoreContext)
    const userData=useSelector((state)=>state.auth.user)
    const appConfigs=useSelector((state)=>state.data.app_config)
    const loadingDeposit=useSelector((state)=>state.data.deposit_loading)
    const [settings,setSettings] = useState(getFromLocalStorage('settings'));
    const [user, setUser] = useState(getFromLocalStorage("user"));
    useEffect(()=>{
        setSettings(appConfigs||getFromLocalStorage('settings'))
    },[appConfigs ])
    useEffect(()=>{
        setUser(userData||getFromLocalStorage("user"))
    },[userData])



    const incrementDepositValue = (value) => {
        dispatch({type: "SET", key: "depositValue", payload: value});
        setCurrentDepositValue(value); // Update the currentDepositValue state instead of values?.amount
        onFieldChanged({target: {name: "amount", value: value}});
    };


    return (
        <>
            <div className="form-group row d-flex justify-content-center deposit-widthdraw-input-desktop">
                <div className={`col-md-12 w-100`}>
                    <div className={'d-flex '}>
                        <label className={'text-light deposit col-5 deposit-label'}>Phone Number</label>
                        <div className={'text-light col-7 text-end text-msisdn'}>
                            +{values.msisdn}
                        </div>
                    </div>
                    {!user && <input
                        onChange={ev => {
                            onFieldChanged(ev);
                        }}
                        className="text-light deposit-input form-control input-field"
                        id="msisdn"
                        name="msisdn"
                        type="text"
                        value={values.msisdn}
                        placeholder='Enter Phone Number'
                    />}
                    {errors.msisdn && <div className='text-danger'> {errors.msisdn} </div>}
                </div>
            </div>
            {user && <hr/>}
            <div className="form-group row d-flex justify-content-center mt-3 deposit-widthdraw-input-desktop">
                <div className="btn-group w-100 gap-3 justify-content-around" role="group" aria-label="Basic example">
                    <div className={'d-flex flex-wrap col-12 justify-content-between'}>
                        {settings?.betnareDeposit && settings?.betnareDeposit?.map((deposit, index) => {
                            return (<div key={index} className={'col-3'}>
                                    <button type="button" onClick={() => incrementDepositValue(deposit?.deposit_amount)}
                                            className="deposit-buttons-value  m-2 gap-3 ">
                                        <div className={'deposit-values'}>+&nbsp;{deposit?.deposit_amount}</div>
                                        <div className={'deposit_text'}>{deposit?.display_text}</div>
                                    </button>
                                </div>

                            )
                        })}
                    </div>

                </div>
                <div className="col-md-12">
                    <label className={'text-light deposit'}>Amount to Deposit</label>
                    <input
                        onChange={ev => {
                            onFieldChanged(ev);
                        }}
                        className="text-light deposit-input form-control col-md-12 input-field"
                        id="amount"
                        name="amount"
                        type="number"
                        value={(values.amount == '' ? state?.depositValues || currentDepositValue : currentDepositValue || values.amount)}
                        placeholder='Enter Amount'
                    />
                    {errors.amount && <div className='text-danger'> {errors.amount} </div>}
                </div>
            </div>
            <div className="form-group row d-flex justify-content-left mb-4">
                <div className=" d-flex align-items-start deposit-withdraw-button-desktop">
                    <button type={"submit"}
                            className='btn btn-lg w-100 deposit-button button-radius input-field btn-font cg login-button2 btn bold d-flex justify-content-center align-items-center'
                            style={{marginTop: "30px"}} disabled={values?.amount == ''}>
                        {loadingDeposit && <div className="loader"></div>} PAY &nbsp;{values?.amount}
                    </button>
                </div>
            </div>
        </>
    )
}

const MyDepositForm = (props) => {
    const {errors, values, setFieldValue, setCurrentDepositValue, currentDepositValue} = props;

    const onFieldChanged = (ev) => {
        let field = ev.target.name;
        let value = ev.target.value;
        setCurrentDepositValue(ev.target.value)
        setFieldValue(field, value);

    }

    return (
        <Form className="shadow-sm rounded border-0">
            <div className="pt-0">

                <div className="row">
                    <div className='col-md-7 text-center'>
                        <div className={`col-md-7 text-center`}>
                            <LazyLoadImage src={mpesa} alt=""/>
                        </div>
                    </div>

                    <DepositFormFields onFieldChanged={onFieldChanged}
                                       values={values} errors={errors}
                                       setCurrentDepositValue={setCurrentDepositValue} // Pass setCurrentDepositValue here
                                       currentDepositValue={currentDepositValue} // Pass currentDepositValue here

                    />

                    <div className={``}>
                        <PaymentInstructions/>
                    </div>

                </div>
            </div>
        </Form>
    );
}
const MyDepositConfirmationForm = (props) => {
    const {errors, values, setFieldValue} = props;

    const onFieldChanged = (ev) => {
        let field = ev.target.name;
        let value = ev.target.value;
        setFieldValue(field, value);

    }

    return (
        <Form className="shadow-sm rounded border-0">
            <div className="pt-0">

                <div className="row">
                    <div className='col-md-7 text-center'>
                        <div className={`col-md-7 text-center`}>
                            <LazyLoadImage src={mpesa} alt=""/>
                        </div>
                    </div>

                    <DepositConfirmFormFields onFieldChanged={onFieldChanged}
                                              values={values} errors={errors}
                        // Pass confirmation code  here

                    />
                    <div className={``}>
                        <ConfirmationInstructions/>
                    </div>

                </div>
            </div>
        </Form>
    );
}
const DepositForm = (props) => {
    const {state} = useContext(StoreContext);
    const [currentDepositValue, setCurrentDepositValue] = useState(0); // New state for current deposit value
    const depositValues = state?.depositValue || ''; // Initialize depositValues as an empty array if it's not available in the state
    const dispatchRedux=useDispatch()
    const userData=useSelector((state)=>state.auth.user)

    const [user, setUser] = useState(getFromLocalStorage("user"));
    useEffect(()=>{
        setUser(userData||getFromLocalStorage("user"))
    },[userData])
    const initialValues = {
        amount: depositValues || 100,
        msisdn: user?.msisdn
    }
    // const gaEventTracker = useAnalyticsEventTracker('Deposit')

    const handleSubmit = values => {

        setTrackingData(values)
        // const data = {
        //     msisdn: state?.user?.msisdn,
        //     amount: values?.amount
        // }
        // gaEventTracker('Deposit', data)
        dispatchRedux(userDeposits(values))

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

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validate={validate}
            render={(props) => <MyDepositForm {...props} setCurrentDepositValue={setCurrentDepositValue}
                                              currentDepositValue={currentDepositValue}/>}/>
    );
}

const DepositConfirmForm = (props) => {
    const dispatchRedux=useDispatch()

    const initialValues = {
        confirmation_code: '',
    }
    const gaEventTracker = useAnalyticsEventTracker('Deposit Confirmation')

    const handleSubmit = values => {

        setTrackingData(values)
        dispatchRedux(userDepositsConfirm(values))
        // const data = {
        //     confirmation_code: values?.confirmation_code
        // }
        // gaEventTracker('Deposit Confirmation', data)
    }

    const validate = values => {

        let errors = {}

        if (!values.confirmation_code) {
            errors.confirmation_code = "Please enter Your Mpesa Deposit Transactional Code";
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
            render={(props) => <MyDepositConfirmationForm {...props}/>}/>
    );
}


export default React.memo(Deposit3)

