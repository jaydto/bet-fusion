import React, {useContext, useEffect, useRef, useState} from 'react';

import {Form, Formik} from 'formik';
import makeRequest from "../../utils/fetch-request";
import {Context} from '../../../context/store';
import {getBetslip} from '../../utils/betslip'
import {clearTrackingData, setTrackingData} from "../../utils/local-storage";
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";

const SideBar = React.lazy(() => import('../../sidebar/awesome/Sidebar'));

const Deposit = React.memo(
    (props) => {

        const [state, dispatch] = useContext(Context);
        const [success, setSuccess] = useState(false);
        const [message, setMessage] = useState(null);
        const {mobile} = props
        const gaEventTracker = useAnalyticsEventTracker('Deposit')

        const initialValues = {
            amount: state?.depositValue ? state?.depositValue : '',
            msisdn: state?.user?.msisdn
        }

        const handleSubmit = values => {
            console.log("hello here")
            let endpoint = '/stk/deposit';
            setTrackingData(values)
            makeRequest({url: endpoint, method: 'POST', data: values}).then(([status, response]) => {
                    setSuccess(status === 200 || status === 201);
                    setMessage(response);
                    clearTrackingData()
                if(status===200||status===201){
                    gaEventTracker('Deposit', values)
                }
                }
            )


        }

        const validate = values => {
            let errors = {}
            if (!values.msisdn || !values.msisdn.match(/(254|0|)?[71]\d{8}/g)) {
                errors.msisdn = 'Please enter a valid phone number'
                dispatch({
                    type: "SET", key: "depositValidateError", payload: {
                        msisdn: 'Please enter a valid phone number',
                        amount: ''
                    }
                });
            }

            if (!values.amount || values.amount < 1 || values.amount > 100000) {
                errors.msisdn = 'Please enter amount between KES 1.00 and KES 100,000.00'
                dispatch({
                    type: "SET", key: "depositValidateError", payload: {
                        msisdn: '',
                        amount: 'Please enter amount between KES 1.00 and KES 100,000.00'
                    }
                });
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
                <div className='col-md-12 primary-bg p-4 text-center'>
                    <h4 className="inline-block">
                        DEPOSIT FUNDS (MOBILE MONEY)
                    </h4>
                </div>
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


        const DepositFormFields = (props) => {
            const {values, onFieldChanged} = props;
            state?.depositValidateError?.amount && setTimeout(() => {
                dispatch({
                    type: "SET", key: "depositValidateError", payload: {
                        msisdn: '',
                        amount: ''
                    }
                });
            }, 5000)
            const prevDeposit = useRef(Number(values?.amount))
            const incementDepositValue = (value) => {

                prevDeposit.current = Number(values?.amount != '' ? values?.amount : 0)
                dispatch({type: "SET", key: "depositValue", payload: prevDeposit.current + value});
                prevDeposit.current = prevDeposit.current != 0 ? prevDeposit.current + value : values?.amount || 0

            }
            return (
                <>
                    <div className="btn-group w-50 gap-3" role="group" aria-label="Basic example">
                        <button type="button" onClick={() => incementDepositValue(100)}
                                className="deposit-buttons-value">+100
                        </button>
                        <button type="button" onClick={() => incementDepositValue(200)}
                                className="deposit-buttons-value">+200
                        </button>
                        <button type="button" onClick={() => incementDepositValue(500)}
                                className="deposit-buttons-value">+500
                        </button>
                        <button type="button" onClick={() => incementDepositValue(1000)}
                                className="deposit-buttons-value">+1000
                        </button>
                    </div>
                    <div
                        className="form-group w-100 row d-flex justify-content-center mt-3 deposit-widthdraw-input-desktop">
                        <div className="col-md-12">
                            {console.log("depositValue", state?.depositValue)}
                            <label>Amount to Deposit</label>
                            <input
                                onChange={ev => {
                                    onFieldChanged(ev);
                                }}
                                className="text-light deposit-input form-control col-md-12 input-field"
                                id="amount"
                                name="amount"
                                type="number"
                                value={(values.amount == '' ? 0 || values.amount : values.amount || Number(state?.depositValue))}
                                placeholder='Enter Amount'
                            />

                            {state?.depositValidateError?.amount &&
                                <div className='text-danger'> {state?.depositValidateError?.amount} </div>}
                            <div className=" d-flex align-items-start deposit-withdraw-button-desktop-profile  mb-3">
                                <button type={"submit"}
                                        className='btn btn-lg w-100 button-radius input-field btn-font cg login-button2 btn bold'
                                        style={{marginTop: "30px"}}>
                                    DEPOSIT
                                </button>
                            </div>
                        </div>

                    </div>

                </>
            )
        }
        const MyDepositForm = (props) => {
            const {values, setFieldValue} = props;

            const onFieldChanged = (ev) => {
                let field = ev.target.name;
                let value = ev.target.value;
                setFieldValue(field, value);
            }

            return (
                <Form className="shadow-sm rounded border-0">
                    <div className="pt-0">
                        <div className={`${mobile ? "card-title" : "d-none"}`}><h4>DEPOSIT</h4></div>

                        <div className="row">

                            <DepositFormFields onFieldChanged={onFieldChanged} values={values}/>

                            {state?.profile_deposit == 'profile_deposit' && <div>
                                <PaymentInstructions/>
                            </div>}
                        </div>
                    </div>
                </Form>
            );
        }

        const DepositForm = (props) => {
            return (
                <Formik
                    initialValues={initialValues}
                    onSubmit={
                        handleSubmit
                    }
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={validate}
                    render={(props) => <MyDepositForm {...props} />}/>
            );
        }
        message && setTimeout(() => {
            setMessage(null)
        }, 6000)

        const Alert = (props) => {
            let c = success ? 'success' : 'danger';
            return (<>{message && <div role="alert" className={`fade alert alert-${c} show`}>{message}</div>} </>);

        };

        return (
            <React.Fragment>
                <div className={`${mobile ? "" : "amt"}`}>
                    <div className="d-flex flex-row justify-content-between">
                        <div className={`${mobile ? 'd-none' : 'd-flex'}`}>
                            <SideBar loadCompetitions/>
                        </div>
                        <div className="gz home" style={{width: '100%', overflowX: 'clip'}}>
                            <div className="homepage">
                                <div className={`${mobile ? "d-none" : ""}`}>
                                    <FormTitle/>

                                </div>
                                <div
                                    className={`col-md-12 mt-2 text-white p-2 ${mobile ? "profile-bg card-radius" : ""}`}>
                                    <Alert/>
                                    <div className="modal-body pb-0" data-backdrop="static">

                                        <DepositForm/>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </React.Fragment>
        )

    })

export default React.memo(Deposit)
