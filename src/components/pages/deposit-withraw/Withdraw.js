import React, {useState, useContext, useEffect} from 'react';
import mpesa from '../../../assets/img/mpesa-3.png';
import makeRequest from "../../utils/fetch-request";
import { Formik,  Form} from 'formik';
import { Context } from '../../../context/store';
import {getBetslip} from '../../utils/betslip'


const Header = React.lazy(()=>import('../../header/header'));
const SideBar = React.lazy(()=>import('../../sidebar/awesome/Sidebar'));
const Right = React.lazy(()=>import('../../right/index'));
const Footer = React.lazy(()=>import('../../footer/footer'));

const Withdrawal = (props) => {
    //todo get the phone number from logged in user ....
    const [state, dispatch] = useContext(Context);

    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState(null);
    const {mobile}=props;

    const initialValues = {
        amount: '',
        msisdn: state?.user?.msisdn
    }

    const handleSubmit = values => {
        let endpoint = '/withdraw';
        makeRequest({url: endpoint, method: 'POST', data: {user:values}, use_jwt:true}).then(([status, response]) => {
            setSuccess(status === 200 || status === 201);
            setMessage(response);
        })
    }

    const validate = values => {

        let errors = {}

        if (!values.msisdn || !values.msisdn.match(/(254|0|)?[71]\d{8}/g) ) {
            errors.msisdn = 'Please enter a valid phone number'
        }
    //Removed the  upper limit  values.amount > 70000
        if (!values.amount || values.amount < 50 ) {
            errors.amount = "Please enter amount above KES 50";
        }
        return errors
    }

    const FormTitle = () => {
        return (
            <div className='col-md-12 primary-bg p-4 text-center'>
                <h4 className="inline-block">
                    WITHDRAW FUNDS (MOBILE MONEY)
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


    const WithdrawFormFields = (props) => {
        const { values, errors, onFieldChanged } = props;

        return (
            <>
                <div className="form-group row d-flex justify-content-center deposit-widthdraw-input-desktop">
                    <div className={`${mobile?"d-none":"col-md-12"}`}>
                        <label>Phone Number</label>
                        <input
                            readOnly={true}
                            className="text-light deposit-input form-control input-field"
                            id="msisdn"
                            name="msisdn"
                            type="text"
                            value ={values.msisdn}
                            placeholder='Enter Phone Number'
                        />
                        {errors.msisdn &&  <div className='text-danger'> {errors.msisdn} </div>  }
                    </div>
                </div>
                <div className="form-group row d-flex justify-content-center mt-5 deposit-widthdraw-input-desktop">
                    <div className="col-md-12">
                        <label>Amount to Withdraw</label>
                        <input
                            onChange={ev => onFieldChanged(ev) }
                            className="text-light deposit-input form-control col-md-12 input-field"
                            id="amount"
                            name="amount"
                            type="text"
                            value ={values.amount}
                            placeholder='Enter Amount'
                        />
                        {errors.amount &&  <div className='text-danger'> {errors.amount} </div>  }
                        <div className=" d-flex align-items-start deposit-withdraw-button-desktop-profile  mb-3 ">
                            <button type={"submit"}
                                    className='btn btn-lg w-100 button-radius input-field btn-font cg login-button2 btn bold' style={{marginTop:"38px"}}>
                                WITHDRAW
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
                <label className='header text-info'>Withdrawal Instructions</label>
                <div className="container">
                    <div className="row"><div className="col"> 1. Enter the phone M-Pesa phone number to receive the funds.  </div></div>
                    <div className="row"><div className="col"> 2. Enter the amount you wish to withdraw.</div></div>
                    <div className="row"><div className="col"> 3. Click on the withdraw funds button.</div></div>
                    <div className="row"><div className="col"> 4. Check your phone for an M-Pesa Confirmation.</div></div>
                </div>
            </>
        );
    }
    const MyWithdrawalForm = (props) => {
        const {errors, values, setFieldValue } = props;

        const onFieldChanged = (ev)=>{
            let field = ev.target.name;
            let value = ev.target.value;
            setFieldValue(field, value);
        }
        return (
            <Form className="shadow-sm rounded border-0" >
                <div className="pt-0">
                    <div className={`${mobile?"card-title":"d-none"}`}><h4>WITHDRAW</h4></div>
                    <div className="row">

                            <div className={`${mobile?"d-none":'col-md-7 text-center'}`}>
                                <img src={mpesa} alt=""/>
                            </div>

                        <hr className={`${mobile?"d-none":""}`}/>
                        <WithdrawFormFields  onFieldChanged ={ onFieldChanged} values ={values } errors={errors} />
                        <hr className={`${mobile?"d-none":"mt-4"}`}/>
                        <div className={`${mobile?"d-none":""}`}>
                            <PaymentInstructions />
                        </div>
                    </div>
                </div>
            </Form>
        );
    }

    const WithdrawalForm = (props) => {
        return (
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validateOnChange={false}
                validateOnBlur={false}
                validate={validate}
                render = {(props) => <MyWithdrawalForm {...props} /> } />
        );
    }
    message&&setTimeout(()=>{
        setMessage(null)
    },6000)

    const Alert = (props) => {
        let c = success ? 'success' : 'danger';
        return (<>{ message  && <div role="alert" className={`fade alert alert-${c} show`}>{message}</div> } </>) ;

    };

    return (
        <React.Fragment>
            <div className={`${mobile?"d-none":""}`}>
                <Header/>
            </div>
            <div className={`${mobile?"":"amt"}`}>
                <div className="d-flex flex-row justify-content-between">
                    <div className={`${mobile?'d-none':'d-flex'}`}>
                        <SideBar loadCompetitions/>
                    </div>
                    <div className="gz home" style={{width: '100%',overflowX:"clip"}}>
                        <div className="homepage">
                            <div className={`${mobile?"d-none":""}`}>
                                <FormTitle/>

                            </div>
                            <div className={`col-md-12 mt-2 text-white p-2 ${mobile?"profile-bg card-radius":""}`}>
                            <Alert />
                                <div className="modal-body pb-0" data-backdrop="static">
                                    <WithdrawalForm />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<div className={`${mobile?"d-none":"mobile-top"}`}>*/}
                    {/*    <Right withdraw={true}/>*/}
                    {/*</div>*/}
                </div>
            </div>
            <div className={`${mobile?"d-none":"footer-mobile-none"}`}>
                <Footer/>
            </div>
        </React.Fragment>
    )
}

export default React.memo(Withdrawal);
