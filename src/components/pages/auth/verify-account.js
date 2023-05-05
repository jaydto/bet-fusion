import React, {useRef, useState, useEffect} from 'react';
import {Formik, Form} from 'formik';
import makeRequest from "../../utils/fetch-request";
import { getFromLocalStorage, setLocalStorage } from '../../utils/local-storage';
import Footer from "../../footer/footer";
import SideBar from "../../sidebar/awesome/Sidebar";

const Header = React.lazy(() => import('../../header/header'));
const Right = React.lazy(() => import('../../right/index'));

const VerifyAccount = (props) => {
    const [inputDisabled, setInputDisabled] = useState(false)
    const [code, setCode] = useState(null);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState(null);
    const verifyRef = useRef()
    const [user] = useState(getFromLocalStorage("user"));

    const initialValues = {
        mobile: '',
        code: ''
    }

    const verifyAccount = () => {
        let code = new URL(window.location).searchParams.get('code')
        let msisdn = new URL(window.location).searchParams.get('msisdn')
        if (code !== null && msisdn !== null) {
            setInputDisabled(true)
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
            setSuccess(status === 200 || status === 201)
            setMessage(response.success ? response.success.message : response.error.message);
            response.success ? setSuccess(true) : setSuccess(false)

            if (status === 200 || status === 201) {
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

    const resendOTP = () => {

        let endpoint = '/v1/code';

        let values = {
            mobile: verifyRef.current.values.mobile
        }

        makeRequest({url: endpoint, method: 'POST', data: values}).then(([status, response]) => {
            setSuccess(status === 200 || status === 201);
            setMessage(response.success ? response.success.message : response.error.message);
            response.error ? setSuccess(false) : setSuccess(true)
        })
    }

    const FormTitle = () => {
        return (
            <div className='col-md-12 primary-bg p-4 text-center'>
                <h4 className="inline-block">
                    VERIFY YOUR PHONE NUMBER
                </h4>
            </div>
        )
    }


    const MyVerifyAccountForm = (props) => {
        const {errors, values, submitForm, setFieldValue} = props;
        const [isMobileNumberValid, setIsMobileNumberValid] = useState(false);

        const onFieldChanged = (ev) => {
            let field = ev.target.name;
            let value = ev.target.value;
            setFieldValue(field, value);
            setIsMobileNumberValid(value.trim() !== '');
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
                                            className="h-100 text-dark deposit-input form-control col-md-12 input-field"
                                            id="mobile"
                                            name="mobile"
                                            type="text"
                                            placeholder='Phone number'
                                            onChange={ev => onFieldChanged(ev)}
                                        />
                                        {isMobileNumberValid && errors.mobile && (
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
                                                className='btn py-1 px-2 text-light btn-sm bg-success rounded-3 border-0 ' style={{fontSize:"12px"}} disabled={!isMobileNumberValid}>Resend OTP
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="form-group row d-flex  mt-4">
                            <div className="col-md-12">
                                <label>Code (OTP)</label>
                                <input
                                    value={code !== null ? code : values.code}
                                    className="text-dark deposit-input form-control col-md-12 input-field"
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
                                        disabled={inputDisabled}
                                        onClick={submitForm}
                                        className=' btn btn-lg w-100 button-radius input-field btn-font cg login-button btn' style={{marginTop:"47px"}}>
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
        return (
            <Formik
                innerRef={verifyRef}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validateOnChange={false}
                validateOnBlur={false}
                validate={validate}
                render={(props) => <MyVerifyAccountForm {...props} />}/>
        );
    }

    const Alert = (props) => {
        let c = success ? 'success' : 'danger';
        return (<div role="alert" className={`fade alert alert-${c} show`}>{message}</div>);

    };

    return (
        <React.Fragment>
            <Header/>
            <div className="amt">
                <div className="d-flex flex-row justify-content-between">
                    <SideBar loadCompetitions />
                    <div className="gz home"  style={{width:'100%'}}>
                        <div className="homepage">
                            <FormTitle/>
                            <div className="col-md-12 mt-2 text-white px-2">
                                {message && <Alert/>}
                                {success?setTimeout(window.location.href="/deposit",1000):""}
                                <div className="pb-0" data-backdrop="static">
                                    <VerifyAccountForm/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Right/>
                </div>
            </div>
            <div className={"footer-mobile-none"}>
            <Footer/>
        </div>
        </React.Fragment>
    );
}

export default VerifyAccount;
