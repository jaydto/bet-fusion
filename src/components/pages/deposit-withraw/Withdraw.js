import React, {useState} from 'react';
import Header from '../../header/header'
import SideBar from '../../sidebar/sidebar'
import Right from '../../right/index'
import Footer from '../../footer/footer'
import {useFormik, Formik, Field, Form} from 'formik';
import useAxios from "../../../hooks/axios.hook";
import mpesa from '../../../assets/img/mpesa-3.png'

const Deposit = (props) => {
    //todo get the phone number from logged in user ....

    const {response, makeRequest} = useAxios()

    console.log("Props are ", props)

    const initialValues = {
        amount: '',
        phone_number: ''
    }

    const onSubmit = values => {
        console.log("Form Data : ", values)
        // call api here to initiate STK Push to logged in user...
        let endpoint = '/withdraw'
        makeRequest({url: endpoint, method: 'POST', data: values}).then((response) => {
            console.log(response)
        })
    }

    const validate = values => {

        let errors = {}

        if (!values.amount || (values.amount < 10 || values.amount > 50000)) {
            errors.amount = 'Please enter a valid amount between Ksh. 10.00 and Ksh. 50,000.00'
        }

        if (!values.phone_number) {
            errors.phone_number = "Please enter a valid phone number.";
        }

        return errors
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    })


    return (
        <>
            <Header/>
            <div className="by amt">
                <div className="gc">
                    <SideBar/>
                    <div className="gz home">
                        <div className="homepage">
                            <div className='col-md-12 primary-bg p-4 text-center'>
                                <h4 className="inline-block">
                                    WITHDRAW FUNDS (MOBILE MONEY)
                                </h4>
                            </div>
                            <div className="col-md-12 mt-2 text-white p-2">
                                <div className="modal-body pb-0" data-backdrop="static">
                                    <form className="shadow-sm rounded border-0" onSubmit={formik.handleSubmit}>
                                        <div className="pt-0">
                                            <div className="row">
                                                <div className='col-md-6 text-center'>
                                                    <img src={mpesa} alt=""/>
                                                </div>
                                                <hr/>
                                                <div className="form-group row d-flex justify-content-center">
                                                    <div className="col-md-5">
                                                        <label>Phone Number</label>
                                                        <input
                                                            onChange={formik.handleChange}
                                                            value={formik.values.phone_number}
                                                            onBlur={formik.handleBlur}
                                                            className="text-dark deposit-input form-control input-field"
                                                            id="phone_number"
                                                            name="phone_number"
                                                            type="number"
                                                            placeholder='Enter Phone Number'
                                                        />
                                                        {formik.errors.phone_number ?
                                                            <div
                                                                className='text-danger'>
                                                                {formik.touched.phone_number && formik.errors.phone_number}
                                                            </div> : ''
                                                        }
                                                    </div>
                                                </div>
                                                <div className="form-group row d-flex justify-content-center mt-5">
                                                    <div className="col-md-5">
                                                        <label>Amount to Withdraw</label>
                                                        <input
                                                            onChange={formik.handleChange}
                                                            value={formik.values.amount}
                                                            onBlur={formik.handleBlur}
                                                            className="text-dark deposit-input form-control col-md-12 input-field"
                                                            id="amount"
                                                            name="amount"
                                                            type="number"
                                                            placeholder='Enter Amount to Withdraw'
                                                        />
                                                        {formik.errors.amount ?
                                                            <div
                                                                className='text-danger'>
                                                                {formik.touched.amount && formik.errors.amount}
                                                            </div> : ''
                                                        }
                                                    </div>
                                                </div>
                                                <div className="form-group row d-flex justify-content-center mb-4">
                                                    <div className="col-md-5">
                                                        <button
                                                            className='btn btn-lg btn-primary mt-5 col-md-12 deposit-withdraw-button'>
                                                            Withdraw Funds
                                                        </button>
                                                    </div>
                                                </div>
                                                <hr/>
                                                <label className='text-info'>Withdrawal Instructions</label>
                                                <ul>
                                                    <li>1. Enter the phone M-Pesa phone number to receive the funds.
                                                    </li>
                                                    <li>2. Enter the amount you wish to withdraw.</li>
                                                    <li>3. Click on the withdraw funds button.</li>
                                                    <li>4. Check your phone for an M-Pesa Confirmation.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Right/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Deposit
