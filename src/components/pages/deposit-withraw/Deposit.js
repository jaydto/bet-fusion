import React, {useState} from 'react';
import Header from '../../header/header'
import SideBar from '../../sidebar/sidebar'
import Right from '../../right/index'
import Footer from '../../footer/footer'
import {useFormik, Formik, Field, Form} from 'formik';
import useAxios from "../../../hooks/axios.hook";
import mpesa from '../../../assets/img/mpesa.png'

const Deposit = (props) => {
    //todo get the phone number from logged in user ....

    const {response, makeRequest} = useAxios()

    console.log("Props are ", props)

    const initialValues = {
        amount: '',
        msisdn: '254726738394'
    }

    const onSubmit = values => {
        console.log("Form Data : ", values)
        // call api here to initiate STK Push to logged in user...
        let endpoint = '/stk/depost'
        makeRequest({url: endpoint, method: 'POST', data: values}).then((response) => {
            console.log(response)
        })
    }

    const validate = values => {

        let errors = {}

        if (!values.amount || (values.amount < 10 || values.amount > 50000)) {
            errors.amount = 'Please enter a valid amount between Ksh. 10.00 and Ksh. 50,000.00'
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
                                    DEPOSIT FUNDS
                                </h4>
                            </div>
                            <div className="col-md-12 mt-2 text-white p-2">
                                <div className="modal-body pb-0" data-backdrop="static">
                                    <form className="shadow-sm rounded border-0" onSubmit={formik.handleSubmit}>
                                        <div className="pt-0">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className='col-md-2'>
                                                        <img src={mpesa} alt=""/>
                                                    </div>
                                                    <hr/>
                                                    <div>
                                                        <label>Enter amount to deposit:</label>
                                                    </div>
                                                    <div className="d-flex flex-row">
                                                        <input
                                                            onChange={formik.handleChange}
                                                            value={formik.values.amount}
                                                            onBlur={formik.handleBlur}
                                                            className="text-dark deposit-input"
                                                            id="amount"
                                                            name="amount"
                                                            type="number"
                                                            placeholder='Enter Amount'
                                                        />
                                                        <button type="submit"
                                                                className='btn btn-primary btn-lg btn-square'>
                                                            DEPOSIT
                                                        </button>
                                                    </div>
                                                    {formik.errors.amount ?
                                                        <div
                                                            className='text-danger'>
                                                            {formik.touched.amount && formik.errors.amount}
                                                        </div> : ''
                                                    }
                                                    <label className='text-info'>
                                                        Minimum amount Ksh. 10.00, Maximum amount Ksh. 50,000.00
                                                    </label>
                                                </div>
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
