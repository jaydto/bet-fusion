import React, {useState} from 'react';
import {Formik, Form} from 'formik';
import makeRequest from "../../utils/fetch-request";

const Header = React.lazy(() => import('../../header/header'));
const SideBar = React.lazy(() => import('../../sidebar/sidebar'));
const Right = React.lazy(() => import('../../right/index'));
const Footer = React.lazy(() => import('../../footer/footer'));

const ResetPassword = (props) => {

    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState(null);
    const [otp_sent, setOtpSent] = useState(false)

    const initialValues = {
        msisdn: '',
    }

    const initialResetFormValues = {
        otp: '',
        password: '',
        password_confirmation: ''
    }

    const handleSubmit = values => {
        setOtpSent(true)
        let endpoint = '/v1/password-otp';
        // makeRequest({url: endpoint, method: 'POST', data: values}).then(([status, response]) => {
        //     setSuccess(status === 200 || status === 201);
        //     setMessage(response.message);
        //     setOtpSent(true)
        // })
    }
    const handleSubmitPasswordReset = values => {
        let endpoint = '/v1/reset-password';
        // makeRequest({url: endpoint, method: 'POST', data: values}).then(([status, response]) => {
        //     setSuccess(status === 200 || status === 201);
        //     setMessage(response.message);
        //     setOtpSent(true)
        // })
    }

    const validate = values => {

        let errors = {}

        if (!values.msisdn || !values.msisdn.match(/(254|0|)?[71]\d{8}/g)) {
            errors.msisdn = 'Please enter a valid phone number'
        }

        return errors
    }

    const validatePasswordReset = password_reset_values => {

        let password_reset_errors = {}

        if (!password_reset_values.otp) {
            password_reset_errors.otp = "Please enter your One Time Pin (OTP)"
        }

        if (!password_reset_values.password) {
            password_reset_errors.password = "Please enter your new password"
        }

        if (!password_reset_values.password_confirmation) {
            password_reset_errors.password_confirmation = "Please enter your password confirmation"
        }

        if (password_reset_values.password !== password_reset_values.password_confirmation) {
            password_reset_errors.password_confirmation = "The passwords do not match. Please enter the password you entered above."
        }

        return password_reset_errors
    }

    const FormTitle = () => {
        return (
            <div className='col-md-12 primary-bg p-4 text-center'>
                <h4 className="inline-block">
                    RECOVER YOUR ACCOUNT
                </h4>
            </div>
        )
    }

    const MyOtpForm = (props) => {
        const {errors, values, submitForm, setFieldValue} = props;

        const onFieldChanged = (ev) => {
            let field = ev.target.name;
            let value = ev.target.value;
            setFieldValue(field, value);
        }
        return (
            <Form className={`${otp_sent ? 'd-none' : 'd-block'}`}>
                <div className="pt-0">
                    <div className="row">
                        <hr/>
                        <div className="form-group row d-flex justify-content-center mt-5">
                            <div className="col-md-12">
                                <label>Mobile Number</label>
                                <input
                                    value={values.msisdn}
                                    className="text-dark deposit-input form-control col-md-12 input-field"
                                    id="msisdn"
                                    name="msisdn"
                                    type="text"
                                    placeholder='Phone number'
                                    onChange={ev => onFieldChanged(ev)}
                                />
                                {errors.msisdn && <div className='text-danger'> {errors.msisdn} </div>}
                            </div>
                        </div>

                        <div className="form-group row d-flex justify-content-left mb-4">
                            <div className="col-md-3">
                                <button type="submit"
                                        onClick={submitForm}
                                        className='btn btn-lg btn-primary mt-5 col-md-12 deposit-withdraw-button'>
                                    Send Reset Code
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        );
    }

    const MyPasswordResetForm = (props) => {

        const {errors, values, submitPasswordResetForm, setFieldValue} = props;

        const onFieldChanged = (ev) => {
            let field = ev.target.name;
            let value = ev.target.value;
            setFieldValue(field, value);
        }
        return (
            <Form className={`${otp_sent ? 'd-block' : 'd-none'}`}>
                <div className="pt-0">
                    <div className="row">
                        <hr/>
                        <div className="col-md-12">
                            <div className="alert alert-info">
                                We have sent a One Time Pin (OTP) to your phone. Please enter it below with your new
                                password.
                            </div>
                            <div className="col-md-12">
                                <div className="form-group row d-flex justify-content-center mt-5">
                                    <label>OTP</label>
                                    <input
                                        value={values.otp}
                                        className="text-dark deposit-input form-control col-md-12 input-field"
                                        id="otp"
                                        name="otp"
                                        type="text"
                                        placeholder='OTP'
                                        onChange={ev => onFieldChanged(ev)}
                                    />
                                    {errors.otp && <div className='text-danger'>
                                        {errors.otp}
                                    </div>}
                                </div>
                            </div>
                            <div className="form-group row d-flex justify-content-center mt-5">
                                <div className="col-md-12">
                                    <label>Password</label>
                                    <input
                                        value={values.password}
                                        className="text-dark deposit-input form-control col-md-12 input-field"
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder='Password'
                                        onChange={ev => onFieldChanged(ev)}
                                    />
                                    {errors.password && <div className='text-danger'>
                                        {errors.password}
                                    </div>}
                                </div>
                            </div>
                            <div className="form-group row d-flex justify-content-center mt-5">
                                <div className="col-md-12">
                                    <label>Confirm Password</label>
                                    <input
                                        value={values.password_confirmation}
                                        className="text-dark deposit-input form-control col-md-12 input-field"
                                        id="confirm_password"
                                        name="password_confirmation"
                                        type="password"
                                        placeholder='Password'
                                        onChange={ev => onFieldChanged(ev)}
                                    />
                                    {errors.password_confirmation &&
                                        <div className='text-danger'>
                                            {errors.password_confirmation}
                                        </div>}
                                </div>
                            </div>
                        </div>

                        <div className="form-group row d-flex justify-content-left mb-4">
                            <div className="col-md-3">
                                <button type="submit"
                                        onClick={submitPasswordResetForm}
                                        className='btn btn-lg btn-primary mt-5 col-md-12 deposit-withdraw-button'>
                                    Reset Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        );
    }

    const OptForm = (props) => {
        return (
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validateOnChange={false}
                validateOnBlur={false}
                validate={validate}
                render={(props) => <MyOtpForm {...props} />}/>
        );
    }
    const PasswordResetForm = (props) => {
        return (
            <Formik
                initialValues={initialResetFormValues}
                onSubmit={handleSubmitPasswordReset}
                validateOnChange={false}
                validateOnBlur={false}
                validate={validatePasswordReset}
            >{(props) => <MyPasswordResetForm {...props} />}</Formik>
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
                                    <OptForm/>
                                    <PasswordResetForm/>
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

export default ResetPassword;
