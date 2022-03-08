import React, {useState, useCallback, useContext, useEffect} from 'react';
import {useFormik, Formik, Field, Form} from 'formik';
import makeRequest from "../../utils/fetch-request";
import mpesa from '../../../assets/img/mpesa.png'

import { 
    getFromLocalStorage,
    setLocalStorage
} from '../../utils/local-storage';

import banner from '../../../assets/img/banner.jpg';
import { getBetslip } from '../../utils/betslip' ;
import { Context }  from '../../../context/store';

const Header = React.lazy(()=>import('../../header/header'));
const Footer = React.lazy(()=>import('../../footer/footer'));
const SideBar = React.lazy(()=>import('../../sidebar/sidebar'));
const CarouselLoader = React.lazy(()=>import('../../carousel/index'));
const SearchBar = React.lazy(()=>import('../../header/search-bar'));
const Right = React.lazy(()=>import('../../right/index'));


const Deposit = (props) => {
    
    const [state, dispatch] = useContext(Context);                              
    const [competitions, setCompetitions] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = useCallback(async() => {
        let cached_categories = getFromLocalStorage('categories');
        let endpoint = "/v1/categories";     
        
        if(!cached_categories) {
            console.log("Fetching data from API");
            const [competition_result] =  await Promise.all([
                makeRequest({url:endpoint, method:"get", data:null }),
            ]);
            let [c_status, c_result] = competition_result

            if(c_status == 200){
                setCompetitions(c_result);
            }
            setLocalStorage('categories', c_result);
        } else {
            console.log("Fetching data from cached localstorage");
            setCompetitions(cached_categories);
        }

    }, []);

    useEffect(() => {

       const abortController = new AbortController();                          
       fetchData();

       return () => {                                                          
            abortController.abort();                                            
        };                                                                      
    }, [fetchData]);

    useEffect(() => {
        let betslip = getBetslip();
        if (betslip) {
            dispatch({type: "SET", key: "betslip", payload: betslip});
        }
    }, []);

    const initialValues = {
        amount: "",
        msisdn: ""
    }

    const onSubmit = values => {
        console.log("Form Data : ", values)
        // call api here to initiate STK Push to logged in user...
        let endpoint = '/stk/depost'
        makeRequest({url: endpoint, method: 'POST', data: values}).then(([status, response]) => {
            console.log("Status", status, "response", response);
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
                    <SideBar competitions={competitions}/>
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
                                                    <div className='col-md-6 text-center'>
                                                        <img src={mpesa} alt="" className='deposit-funds-icon'/>
                                                    </div>
                                                    <hr/>
                                                    <div className="form-group row d-flex justify-content-center">
                                                        <div className="col-md-6">
                                                            <label>Enter amount to deposit:</label>
                                                            <div className="d-flex flex-row">
                                                                <input
                                                                    onChange={formik.handleChange}
                                                                    value={formik.values.amount}
                                                                    onBlur={formik.handleBlur}
                                                                    className="text-dark deposit-input input-field form-control input-square"
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
                                                    <hr/>
                                                    <label className='text-info'>Deposit Instructions</label>
                                                    <ul>
                                                        <li>1. Enter the amount you want to deposit.</li>
                                                        <li>2. Click on the deposit button.</li>
                                                        <li>3. Check your phone for an M-Pesa Request.</li>
                                                        <li>4. Enter your M-Pesa Pin to confirm the transaction.</li>
                                                        <li>5. On successful payment, you will receive an M-Pesa
                                                            Confirmation.
                                                        </li>
                                                    </ul>
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
