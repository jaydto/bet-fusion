import React, {useContext, useEffect, useState} from 'react';

import {Form, Formik} from 'formik';
import makeRequest from "../../utils/fetch-request";

import {StoreContext } from "../../../context/store"
import {getBetslip} from '../../utils/betslip'
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";


const Header = React.lazy(() => import('../../header/header'));


const Points = React.memo(
    (props) => {

        const { state, dispatch } = useContext(StoreContext);
        const [success, setSuccess] = useState(false);
        const [message, setMessage] = useState(null);
        const {mobile} = props

        const initialValues = {
            points: ''
        }
        const gaEventTracker = useAnalyticsEventTracker("Redeem Points")


        const handleSubmit = values => {
            let endpoint = '/redeem-points';
            makeRequest({url: endpoint, method: 'POST', data: values}).then(([status, response]) => {
                if (status === 200 || status === 201) {
                    const data = {
                        user_id: state?.user?.profile_id,
                        event: "Redeem Points",
                        amount:values?.amount
                    }
                    gaEventTracker("Redeem Points", data)
                    setSuccess(true);
                    setMessage(response?.message);
                } else {
                    const data = {
                        user_id: state?.user?.profile_id,
                        event: "Redeem Points Failed",
                        message:response?.error
                    }
                    gaEventTracker("Redeem Points Failed", data)
                    setSuccess(false);
                    setMessage(response?.error);
                }
            })
        }


        const validate = values => {

            let errors = {}

            if (!values.points || values.points < 1) {
                errors.points = "Please enter 1 or more points to redeem";
            }
            return errors
        }

        const FormTitle = () => {
            return (
                <div className='col-md-12 primary-bg p-4 text-center'>
                    <h4 className="inline-block">
                        REDEEM NARE POINTS
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

        const RedeemFormFields = (props) => {
            const {values, errors, onFieldChanged} = props;

            return (
                <>

                    <div className="form-group row d-flex justify-content-center mt-5 deposit-widthdraw-input-desktop">
                        <div className="col-md-12">
                            <label>Amount to Redeem</label>
                            <input
                                onChange={ev => onFieldChanged(ev)}
                                className="text-dark deposit-input form-control col-md-12 input-field"
                                id="points_profile"
                                name="points"
                                type="number"
                                value={values.points}
                                placeholder='Enter Points To Redeem'
                            />
                            {errors.points && <div className='text-danger'> {errors.points} </div>}
                            <div className=" d-flex align-items-start deposit-withdraw-button-desktop-profile mb-3">
                                <button type={"submit"}
                                        className='btn btn-lg w-100 button-radius input-field btn-font cg login-button2 btn bold'
                                        style={{marginTop: "38px"}}>
                                    REDEEM POINTS
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
                    <label className='header text-info'>Redeem Points Instructions</label>
                    <div className="container">
                        <div className="row">
                            <div className="col  text-light"> 1. Enter the number of points to redeem.</div>
                        </div>
                        <div className="row">
                            <div className="col text-light"> 2. Click on Redeem Points Button.</div>
                        </div>
                        <div className="row">
                            <div className="col text-light"> 3. Points will be credited to your bonus wallet.</div>
                        </div>
                        <div className="row">
                            <div className="col text-light"> 4. You accumulate Nare Points by placing cash bets.</div>
                        </div>
                    </div>
                </>
            );
        }
        const MyRedeemForm = (props) => {
            const {errors, values, setFieldValue} = props;

            const onFieldChanged = (ev) => {
                let field = ev.target.name;
                let value = ev.target.value;
                setFieldValue(field, value);
            }

            return (
                <Form className="shadow-sm rounded border-0">
                    <div className="pt-0">
                        <div className={`${mobile ? "card-title" : "d-none"}`}>
                            <h4>REDEEM POINTS</h4>
                        </div>

                        <div className="row">
                            <RedeemFormFields onFieldChanged={onFieldChanged} values={values} errors={errors}/>
                            <hr className={`${mobile ? "d-none" : "mt-4"}`}/>


                        </div>
                    </div>
                </Form>
            );
        }

        const RedeemForm = (props) => {
            return (
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={validate}
                    render={(props) => <MyRedeemForm {...props} />}/>
            );
        }

        const Alert = (props) => {
            let c = success ? 'success' : 'danger';
            return (<>{message && <div role="alert" className={`fade alert alert-${c} show`}>{message}</div>} </>);

        };

        return (
            <React.Fragment>
                <div className={`${mobile ? "" : "amt"}`}>
                    <div className="d-flex flex-row justify-content-between">

                        <div className="gz home" style={{width: '100%', overflowX: 'clip'}}>
                            <div className="homepage">
                                <div className={`${mobile ? "d-none" : ""}`}>
                                    <FormTitle/>

                                </div>
                                <div
                                    className={`col-md-12 mt-2 text-white p-2 ${mobile ? "profile-bg card-radius" : ""}`}>
                                    <Alert/>
                                    <div className="modal-body pb-0" data-backdrop="static">
                                        <RedeemForm/>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </React.Fragment>
        )

    })

export default React.memo(Points)
