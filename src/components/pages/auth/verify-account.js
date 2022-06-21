import React, {useRef, useState} from 'react';
import {Formik, Form} from 'formik';
import makeRequest from "../../utils/fetch-request";

const Header = React.lazy(() => import('../../header/header'));
const SideBar = React.lazy(() => import('../../sidebar/sidebar'));
const Right = React.lazy(() => import('../../right/index'));
const Footer = React.lazy(() => import('../../footer/footer'));

const VerifyAccount = (props) => {

    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState(null);
    const verifyRef = useRef()

    const initialValues = {
        mobile: '',
        code: ''
    }

    const handleSubmit = values => {
        let endpoint = '/v1/verify';
        makeRequest({url: endpoint, method: 'POST', data: values}).then(([status, response]) => {
            setSuccess(status === 200 || status === 201)
            setMessage(response.success ? response.success.message : response.error.message);
            response.success ? setSuccess(true) : setSuccess(false)

            let timer = setInterval(() => {
                clearInterval(timer)
                window.location.href = "/"
            }, 3000)
        }).catch((err) => {
            console.log(err)
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

        const onFieldChanged = (ev) => {
            let field = ev.target.name;
            let value = ev.target.value;
            setFieldValue(field, value);
        }
        return (
            <Form>
                <div className="pt-0">
                    <div className="row">
                        <hr/>
                        <div className="form-group row d-flex justify-content-center mt-5">
                            <div className="col-md-12">
                                <label>Mobile Number</label>
                                <div className="row">
                                    <div className="col-md-8">
                                        <input
                                            value={values.mobile}
                                            className="h-100 text-dark deposit-input form-control col-md-12 input-field"
                                            id="mobile"
                                            name="mobile"
                                            type="text"
                                            placeholder='Phone number'
                                            onChange={ev => onFieldChanged(ev)}
                                        />
                                        {errors.mobile && <div className='text-danger'> {errors.mobile} </div>}
                                    </div>
                                    <div className="col-md-4">
                                        <span className=''>
                                            Didn't receive code? Resend Code
                                        </span>
                                        <button onClick={() => resendOTP()} type={"button"}
                                                className='btn btn-primary btn-sm'>Resend OTP
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="form-group row d-flex  mt-5">
                            <div className="col-md-8">
                                <label>Code (OTP)</label>
                                <input
                                    value={values.code}
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
                            <div className="col-md-3">
                                <button type="submit"
                                        onClick={submitForm}
                                        className='btn btn-lg btn-primary mt-5 col-md-12 deposit-withdraw-button'>
                                    Verify Account
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
            <div className="by amt">
                <div className="gc">
                    <SideBar loadCompetitions/>
                    <div className="gz home">
                        <div className="homepage">
                            <FormTitle/>
                            <div className="col-md-12 mt-2 text-white p-2">
                                {message && <Alert/>}
                                <div className="modal-body pb-0" data-backdrop="static">
                                    <VerifyAccountForm/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Right/>
                </div>
            </div>
            <Footer/>
        </React.Fragment>
    );
}

export default VerifyAccount;
