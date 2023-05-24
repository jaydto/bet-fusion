import React, {useState, useContext, useEffect} from 'react';

import {Formik, Form} from 'formik';
import makeRequest from "../../utils/fetch-request";
import mpesa from '../../../assets/img/mpesa.png'
import {Context} from '../../../context/store';
import {formatNumber, getBetslip} from '../../utils/betslip'
import {clearTrackingData, getFromLocalStorage, setTrackingData} from "../../utils/local-storage";

const Header = React.lazy(() => import('../../header/header'));


const Points = (props) => {

    const [state, dispatch] = useContext(Context);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState(null);
    const {mobile} = props
    const [user, ] = useState(getFromLocalStorage("user"));



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
            <div className='col-md-12 primary-bg p-4 text-center'>
                <h4 className="inline-block">
                    Redeem Points
                </h4>
            </div>
        )
    }


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
                            Redeeem
                        </button>
                    </div>
                </div>
            </>
        )
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
                    <div className={`${mobile?"card-title":"d-none"}`}>
                        <h4>REDEEM POINTS</h4>
                        </div>

                    <div className="row">
                        <div className='col-md-7 text-center'>
                            <div className={`${mobile?"d-none":'col-md-7 text-center'}`}>
                                <img src={mpesa} alt=""/>
                            </div>
                        </div>
                        <hr className={`${mobile?"d-none":""}`}/>

                        <RedeemFormFields onFieldChanged={onFieldChanged} values={values} errors={errors}/>
                        <hr className={`${mobile?"d-none":"mt-4"}`}/>


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
            <div className={`${mobile?"d-none":""}`}>
            <Header/>
            </div>

            <div className={`${mobile?"":"amt"}`}>
                <div className="d-flex flex-row justify-content-between">

                    <div className="gz home" style={{width: '100%',overflowX:'clip'}}>
                        <div className="homepage">
                            <div className={`${mobile?"d-none":""}`}>
                                <FormTitle/>

                            </div>
                            <div className={`col-md-12 mt-2 text-white p-2 ${mobile?"profile-bg card-radius":""}`}>
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

}

export default React.memo(Points)
