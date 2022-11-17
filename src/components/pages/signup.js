import React, {useState} from 'react';
import {Formik, Form} from 'formik';
import makeRequest from "../utils/fetch-request";
import mpesa from '../../assets/img/mpesa-3.png'
import {clearTrackingData, setLocalStorage, setTrackingData} from "../utils/local-storage";
import {Input} from "@material-ui/core"

const Header = React.lazy(() => import('../header/header'));
const SideBar = React.lazy(() => import('../sidebar/awesome/Sidebar'));
const Right = React.lazy(() => import('../right/index'));
const Footer = React.lazy(() => import('../footer/footer'));

const Signup = (props) => {

    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState(null);

    const initialValues = {
        msisdn: '',
        password: ''
    }

    const handleSubmit = values => {

        let endpoint = '/v1/signup'

        setTrackingData(values)

        makeRequest({url: endpoint, method: 'POST', data: values}).then(([status, response]) => {
            setSuccess(status === 200 || status === 201);
            setMessage(response?.success?.message || "");
            if (values.utm_source !== undefined) {
                if (values.utm_source === 'eskimi') {
                    window.esk('track', 'Conversion');
                }
                if (values.utm_source === 'google') {
                    window.gtag_report_conversion(window.location)
                }
            }
            clearTrackingData()
            let timer = setInterval(() => {
                // window.location.href = "/"
                clearInterval(timer)
            }, 3000)
        })
    }

    const validate = values => {

        let errors = {}

        if (!values.msisdn || !values.msisdn.match(/(254|0|)?[71]\d{8}/g)) {
            errors.msisdn = 'Please enter a valid phone number'
        }

        if (!values.password || values.password.length < 4) {
            errors.password = "Please enter four or more characters for password";
        }

        return errors
    }

    const FormTitle = () => {
        return (
            <div className='col-md-12 primary-bg p-4 text-center'>
                <h4 className="inline-block">
                    SIGNUP | CREATE A NEW ACCOUNT
                </h4>
            </div>
        )
    }

    const MySignupForm = (props) => {
        const {errors, values, submitForm, setFieldValue} = props;

        const onFieldChanged = (ev) => {
            let field = ev.target.name;
            let value = ev.target.value;
            setFieldValue(field, value);
        }
        return (
            <Form>
                <div className="pt-0">
                    <div className="row align-items-center">
                        <div className='col-md-6 text-center w-100 border-bottom'>
                            <img src={mpesa} alt=""/>
                        </div>

                        <div className="form-group col-md-6 text-center w-100  mt-5">
                            <div className="col-md-12">
                                <label>Mobile Number</label>
                                <Input
                                    className="text-dark deposit-input form-control col-md-12 input-field"
                                    id="msisdn"
                                    name="msisdn"
                                    type="text"
                                    placeholder={errors.msisdn?errors.msisdn:'Phone enter a phone number'}
                                    onChange={ev => onFieldChanged(ev)}
                                    value={values.msisdn}
                                />
                                {errors.msisdn && <div className='text-danger'> {errors.msisdn} </div>}
                            </div>
                        </div>

                        <div className="form-group col-md-6 text-center w-100  mt-5">
                            <div className="col-md-12">
                                <label>Password</label>
                                <Input
                                    className="text-dark deposit-input form-control col-md-12 input-field"
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder='Password'
                                    onChange={ev => onFieldChanged(ev)}
                                    value={values.password}
                                />
                                {errors.password && <div className='text-danger'> {errors.password} </div>}
                            </div>
                        </div>
                        <div className="form-group col-md-6 text-center w-100  mb-4">
                            <div className="col-md-3">
                                <button type="submit "
                                        className='btn btn-lg btn-primary  mt-5 col-md-12 deposit-withdraw-button width-full'>
                                    Signup
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        );
    }

    const SignupForm = (props) => {
        return (
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validateOnChange={false}
                validateOnBlur={false}
                validate={validate}
                render={(props) => <MySignupForm {...props} />}/>
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
                    <SideBar loadCompetitions/>
                    <div className="gz home w-100">
                        <div className="homepage">
                            <FormTitle/>
                            <div className="col-md-12 mt-2 text-white p-2">
                                {message && <Alert/>}
                                <div className="modal-body pb-0" data-backdrop="static">
                                    <SignupForm/>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className={"mobile-top mobile-only"}>
                <Right/>
            </div>

            <div className={"mobile-remove"}>
            <Footer/>
            </div>
        </React.Fragment>
    );
}

export default Signup;
