import React, {useState, useContext, useEffect} from 'react';
import mpesa from '../../../assets/img/mpesa-3.png';
import makeRequest from "../../utils/fetch-request";
import {Formik, Form} from 'formik';
import {Context} from '../../../context/store';
import {getBetslip} from '../../utils/betslip'


const Header = React.lazy(() => import('../../header/header'));
const SideBar = React.lazy(() => import('../../sidebar/awesome/Sidebar'));
const Right = React.lazy(() => import('../../right/index'));
const Footer = React.lazy(() => import('../../footer/footer'));

const RedeemPoints = (props) => {
    //todo get the phone number from logged in user ....
    const [state, dispatch] = useContext(Context);

    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState(null);

    const initialValues = {
        points: ''
    }

    const handleSubmit = values => {
        let endpoint = '/redeem-points';
        makeRequest({url: endpoint, method: 'POST', data: values}).then(([status, response]) => {
            console.log("Status", status)
            if (status === 200 || status === 201) {
                setSuccess(true);
                setMessage(response?.message);
            } else {
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


    const RedeemPointsFormFields = (props) => {
        const {values, errors, onFieldChanged} = props;

        return (
            <>
                <div className="form-group row d-flex justify-content-center mt-5">
                    <div className="col-md-12">
                        <label>Amount to RedeemPoints</label>
                        <input
                            onChange={ev => onFieldChanged(ev)}
                            className="text-dark deposit-input form-control col-md-12 input-field"
                            id="points"
                            name="points"
                            type="number"
                            value={values.points}
                            placeholder='Enter Points To Redeem'
                        />
                        {errors.points && <div className='text-danger'> {errors.points} </div>}
                    </div>
                </div>
                <div className="form-group row d-flex justify-content-left mb-4">
                    <div className="col-md-3">
                        <button
                            className='btn btn-lg btn-primary mt-5 col-md-12 deposit-withdraw-button'>
                            Redeem Points
                        </button>
                    </div>
                </div>
            </>
        )
    }


    const PaymentInstructions = (props) => {
        return (
            <>
                <label className='header text-info'>RedeemPoints Instructions</label>
                <div className="container">
                    <div className="row">
                        <div className="col"> 1. Enter the number of points to redeem.</div>
                    </div>
                    <div className="row">
                        <div className="col"> 2. Click on Redeem Points Button.</div>
                    </div>
                    <div className="row">
                        <div className="col"> 3. Points will be credited to your bonus wallet.</div>
                    </div>
                    <div className="row">
                        <div className="col"> 4. You accumulate Nare Points by placing cash bets.</div>
                    </div>
                </div>
            </>
        );
    }
    const MyRedeemPointsForm = (props) => {
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
                            <img src={mpesa} alt=""/>
                        </div>
                        <hr/>
                        <RedeemPointsFormFields onFieldChanged={onFieldChanged} values={values} errors={errors}/>
                        <hr/>
                        <PaymentInstructions/>
                    </div>
                </div>
            </Form>
        );
    }

    const RedeemPointsForm = (props) => {
        return (
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validateOnChange={false}
                validateOnBlur={false}
                validate={validate}
                render={(props) => <MyRedeemPointsForm {...props} />}/>
        );
    }

    const Alert = (props) => {
        let c = success ? 'success' : 'danger';
        return (<>{message && <div role="alert" className={`fade alert alert-${c} show`}>{message}</div>} </>);

    };

    return (
        <React.Fragment>
            <Header/>
            <div className="amt">
                <div className="d-flex flex-row justify-content-between">
                    <SideBar loadCompetitions/>
                    <div className="gz home" style={{width: '100%', overflowX: "clip"}}>
                        <div className="homepage">
                            <FormTitle/>
                            <div className="col-md-12 mt-2 text-white p-2">
                                <Alert/>
                                <div className="modal-body pb-0" data-backdrop="static">
                                    <RedeemPointsForm/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Right/>
                </div>
            </div>
            <Footer/>
        </React.Fragment>
    )
}

export default RedeemPoints;
