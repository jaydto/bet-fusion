import React, {useContext, useEffect, useState} from 'react'
import {Col, Row} from "antd";
import authImg from '../../../assets/img/Logo.webp'
import betNiMoto from '../../../assets/img/BetniMoto.webp'

import {Link, useNavigate} from "react-router-dom";

import {clearTrackingData, getFromLocalStorage, setLocalStorage, setTrackingData} from "../../utils/local-storage";
import only18 from '../../../assets/img/auth/18only.png'
import backgroundURL from '../../../assets/img/auth/img-17.webp'
import {LazyLoadImage} from "react-lazy-load-image-component";
import makeRequest from "../../utils/fetch-request";
import {Form, Formik} from "formik";
import {StoreContext} from "../../../context/store"
import mpesa from "../../../assets/img/mpesa.png";
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";
import './deposit.css'
import Header2 from "../../header/Header2";
import Notify from "../../utils/Notify";
import {ToastContainer} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {userBalance, userWithdrawal} from "../../../redux/dataSlice";

const backgroundStyle = {
    backgroundImage: `url(${backgroundURL})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
}


const Withdraw = React.memo(
    props => {
        const navigate = useNavigate();
        const successMessage=useSelector((state)=>state.data.withdrawal_message)
        const errorMessage=useSelector((state)=>state.data.error)
        const dispatchRedux=useDispatch()
        const userData=useSelector((state)=>state.data.user)

        const [user, setUser] = useState(getFromLocalStorage("user"));
        useEffect(()=>{
            setUser(userData||getFromLocalStorage("user"))
        },[userData])

        const [message, setMessage]=useState()

        useEffect(()=>{
            if(successMessage){
                setMessage(successMessage)
            }else if(errorMessage){
                setMessage(errorMessage)
            }

        },[successMessage, errorMessage])


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
            updateUserOnHistory()
        }, [successMessage])


        const FormTitle = () => {
            return (
                <div className='col-md-12  p-4 text-center' style={{background: 'transparent'}}>
                    <h4 className="inline-block betnare-text-light">
                        WITHDRAW FUNDS (MOBILE MONEY)
                    </h4>
                </div>
            )
        }


        const Alert = (props) => {
            let c = successMessage ? 'success' : 'danger';
            message && setTimeout(() => {
                setMessage(null)
            }, 5500)
            return (<>{message &&
                <div role="alert" className={`fade alert alert-${c} show`}>{message}</div>} </>);

        };


        return (
            <div style={{height: '100vh', background: '#16202C'}}>
                <Header2/>
                <ToastContainer/>
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

                                    <h1 className="text-white text-center" style={{fontSize: "30px"}}>Withdraw Cash From
                                        Your Account</h1>
                                    <p className="text-white px-3 d-flex align-items-center justify-content-center mt-3"
                                       style={{fontSize: "16px", opacity: '0.5px'}}><LazyLoadImage src={betNiMoto}
                                                                                                   style={{width: "150px"}}
                                                                                                   alt={'betnare'}/></p>
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
                                <div className={'w-100'}>
                                    <div className={'d-flex'}>
                                        {/**/}
                                        <div className={'size-deposit'}>
                                            {!user ? setTimeout(navigate("/"), 500) : ""}
                                            <div className={"d-flex flex-row justify-content-between"}>
                                                <div className=" w-100">
                                                    <div
                                                        className="homepage d-flex  flex-column align-items-center  login-page">

                                                        <Alert/>
                                                        <div className=" pb-0" data-backdrop="static">

                                                            <WithdrawForm/>
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
            <label className='header text-info'>Withdrawal Instructions</label>
            <div className="container d-flex flex-column">
                <div className="row">
                    <div className="col betnare-text-light"> 1. Enter the phone M-Pesa phone number to receive
                        the funds.
                    </div>
                </div>
                <div className="row">
                    <div className="col betnare-text-light"> 2. Enter the amount you wish to withdraw.</div>
                </div>
                <div className="row">
                    <div className="col betnare-text-light"> 3. Click on the withdraw funds button.</div>
                </div>
                <div className="row">
                    <div className="col betnare-text-light"> 4. Check your phone for an M-Pesa Confirmation.
                    </div>
                </div>
            </div>
        </>
    );
}

const WithdrawFormFields = (props) => {
    const {values, errors, onFieldChanged} = props;
    const {state, dispatch} = useContext(StoreContext)
    const loading=useSelector((state)=>state.data.withdraw_loading)


    return (
        <>
            <div className="form-group row d-flex justify-content-center deposit-widthdraw-input-desktop">
                <div className={`col-md-12 w-100`}>
                    <div className={'d-flex '}>
                        <label className={'text-light deposit col-5 deposit-label'}>Phone Number</label>
                    </div>
                    <input
                        className="text-light deposit-input form-control input-field"
                        id="msisdn"
                        name="msisdn"
                        type="text"
                        readOnly={true}
                        value={values.msisdn}
                        placeholder='Enter Phone Number'
                    />
                    {errors.msisdn && <div className='text-danger'> {errors.msisdn} </div>}
                </div>
            </div>

            <div className="form-group row d-flex justify-content-center mt-3 deposit-widthdraw-input-desktop">
                <div className="col-md-12">
                    <label className={'text-light deposit'}>Amount to Withdraw</label>
                    <input
                        onChange={ev => {
                            onFieldChanged(ev);
                        }}
                        className="text-light deposit-input form-control col-md-12 input-field"
                        id="amount"
                        name="amount"
                        type="number"
                        value={(values.amount)}
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
                        {loading &&
                            <div className="custom-loader"></div>} WITHDRAW &nbsp;{values?.amount}
                    </button>
                </div>
            </div>
        </>
    )
}

const MyWithdrawForm = (props) => {
    const {errors, values, setFieldValue} = props;
    const appConfigs=useSelector((state)=>state.data.app_config)
    const [settings,setSettings] = useState(getFromLocalStorage('settings'));

    useEffect(()=>{
        setSettings(appConfigs||getFromLocalStorage('settings'))
    },[appConfigs ])

    const withdrawalLimits = settings?.withdrawalLimits


    const onFieldChanged = (ev) => {
        let field = ev.target.name;
        let value = ev.target.value;
        setFieldValue(field, value);

        if (field=== "amount"){
            value = value.replace(/[^\d]/g, "");
            let newValue = value;
            let minWithdrawalAmount = {  message: `Minimum allowed withdrawal amount is ${withdrawalLimits?.minimumAmount} KSH` };
            let maxWithdrawalAmount = {  message: `Maximum allowed withdrawal amount is ${withdrawalLimits?.maximumAmount} KSH` };

            const minWithdrawal = withdrawalLimits?.minimumAmount ;
            const maxWithdrawal = withdrawalLimits?.maximumAmount ;
            if (Number(value) < Number(minWithdrawal)) {
                Notify(minWithdrawalAmount);
                newValue = value;
            }else if(Number(value) > Number(maxWithdrawal)) {
                Notify(maxWithdrawalAmount);
                newValue = maxWithdrawal;
            }else{
                newValue=value
            }
            setFieldValue(field, newValue);
        }


    }

    return (
        <Form className="shadow-sm rounded border-0">
            <div className="pt-0">

                <div className="row d-flex align-items-center justify-content-center">
                    <div className='col-md-7 text-center'>
                        <div className={`col-md-7 text-center`}>
                            <LazyLoadImage src={mpesa} alt=""/>
                        </div>
                    </div>

                    <WithdrawFormFields onFieldChanged={onFieldChanged}
                                        values={values} errors={errors}

                    />

                    <div className={``}>
                        <PaymentInstructions/>
                    </div>

                </div>
            </div>
        </Form>
    );
}
const WithdrawForm = (props) => {
    const dispatchRedux=useDispatch()
    const app_config=useSelector((state)=>state.data.app_config)
    const [settings, setSettings] = useState(getFromLocalStorage('settings'))
    const [currentWithdrawValue, setCurrentWithdrawValue] = useState(0); // New state for current deposit value
    const withdrawalLimits = settings?.withdrawalLimits
    const userData=useSelector((state)=>state.data.user)
    const [user, setUser]=useState(getFromLocalStorage("user"))

    useEffect(()=>{
        if(userData){
            setUser(userData||getFromLocalStorage("user"))
        }
    }, [userData])
    useEffect(()=>{
        if(app_config){
            setSettings(app_config||getFromLocalStorage('settings'))
        }
    },[app_config])


    const initialValues = {
        amount: 100,
        msisdn:  user?.msisdn
    }
    // const gaEventTracker = useAnalyticsEventTracker('Withdraw')

    const handleSubmit = values => {
        setTrackingData(values)
        const data={user: values}
        dispatchRedux(userWithdrawal(data))
        // const data = {
        //     msisdn: state?.user?.msisdn,
        //     amount: values?.amount
        // }
        // gaEventTracker('Withdraw', data)

    }

    const validate = values => {

        let errors = {}

        if (!values.msisdn || !values.msisdn.match(/(254|0|)?[71]\d{8}/g)) {
            errors.msisdn = 'Please enter a valid phone number'
        }
        if (!values.amount || values.amount < Number(withdrawalLimits?.minimumAmount)) {
            errors.amount = "Please enter an amount above KES " + withdrawalLimits?.minimumAmount;
        } else if (values.amount > Number(withdrawalLimits?.maximumAmount)) {
            errors.amount = "Please enter an amount less than or equal to KES " + withdrawalLimits?.maximumAmount;
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
            render={(props) => <MyWithdrawForm {...props} setCurrentWithdrawValue={setCurrentWithdrawValue}
                                               currentWithdrawValue={currentWithdrawValue}/>}/>
    );
}

export default React.memo(Withdraw)


