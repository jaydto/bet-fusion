import React, {useContext, useEffect, useState} from 'react'
import {Col, Row} from "antd";
import authImg from '../../../assets/img/Logo.webp'
import logo from '../../../assets/img/Logo.webp'
import fire from '../../../assets/svg/fire.svg'
import {Link, useNavigate} from "react-router-dom";
import {getFromLocalStorage} from "../../utils/local-storage";
import only18 from '../../../assets/img/auth/18only.png'
import backgroundURL from '../../../assets/img/auth/img-17.webp'
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Form, Formik} from "formik";
import {StoreContext} from "../../../context/store"
import {getBetslip} from "../../utils/betslip";
import {useDispatch, useSelector} from "react-redux";
import {userPoints} from "../../../redux/dataSlice";
import Header2 from "../../header/Header2";

const backgroundStyle = {
    backgroundImage: `url(${backgroundURL})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
}


const RedeemPoints = React.memo(
    props => {
        const dispatchRedux = useDispatch()
        const successMessage = useSelector((state) => state.data.points_message)
        const errorMessage = useSelector((state) => state.data.error)
        const [message, setMessage] = useState()
        const navigate = useNavigate();
        const expand = "md"
        const [user] = useState(getFromLocalStorage("user"));

        const {dispatch} = useContext(StoreContext);
        useEffect(()=>{
            if(successMessage){
                setMessage(successMessage)
            }else if(errorMessage){
                setMessage(errorMessage)
            }

        },[successMessage, errorMessage])

        const initialValues = {
            points: ''
        }

        const handleSubmit = values => {
            dispatchRedux(userPoints(values))
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
                <div
                    className='col-md-12 col-md-12  pt-4 text-center text-light py-3 text-center w-100 top-login-mobile'
                    style={{margin: '0px'}}>
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
                            <label className={'text-light'}>Points to Redeem</label>
                            <input
                                onChange={ev => onFieldChanged(ev)}
                                className="text-light deposit-input form-control col-md-12 input-field"
                                id="points"
                                name="points"
                                type="number"
                                value={values.points}
                                placeholder='Enter Points To Redeem'
                            />
                            {errors.points && <div className='text-danger'> {errors.points} </div>}
                        </div>
                    </div>
                    <div className="form-group row d-flex justify-content-left my-5">
                        <div className="col">
                            <button type={'submit'}
                                className='btn btn-lg w-100 deposit-button button-radius input-field btn-font cg login-button2 btn bold d-flex justify-content-center align-items-center'>
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
                    <label className='header text-info'>Redeem Points Instructions</label>
                    <div className="container d-flex flex-column">
                        <div className="row">
                            <div className="col  text-light"> 1. Enter the number of points to redeem.</div>
                        </div>
                        <div className="row">
                            <div className="col text-light"> 2. Click on Redeem Points Button.</div>
                        </div>
                        <div className="row">
                            <div className="col text-light"> 3. Points will be credited to your bonus wallet.</div>
                        </div>
                        <div className="row">
                            <div className="col text-light"> 4. You accumulate Nare Points by placing cash bets.</div>
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

        message && setTimeout(() => {
            setMessage(null)
        }, 6000)

        const Alert = () => {
            let c = successMessage ? 'success' : 'danger';

            return (<>{message &&
                <div role="alert" className={`fade alert alert-${c} show`}>{message}</div>} </>);

        };

        return (
            <div style={{height: '100vh', background: '#16202C'}}>
                <div className={''}>
                   <Header2/>
                </div>
                <Row justify="center" className="align-items-stretch h-100">

                    <Col xs={0} sm={0} md={0} lg={8}>
                        <div className="d-flex flex-column justify-content-between h-100 px-4" style={backgroundStyle}>
                            <div className="text-right">
                                {/*<LazyLoadImage src="/img/logo-sm.jpg" style={{height:"35px"}}alt="logo"/>*/}
                            </div>
                            <Row justify="center">
                                <Col xs={0} sm={0} md={0} lg={20}>
                                    <Link to={'/'}>
                                        <LazyLoadImage className="img-fluid mb-5" src={authImg} alt=""/>
                                    </Link>

                                    <h1 className="text-white text-center" style={{fontSize: "30px"}}>Redeem Your Nare
                                        Points</h1>
                                    <p className="text-white px-3 d-flex align-items-center justify-content-center mt-3"
                                       style={{fontSize: "16px", opacity: '0.5px'}}>Bet ni Moto<LazyLoadImage src={fire}
                                                                                                              style={{width: "20px"}}
                                                                                                              alt={'betnare'}/>
                                    </p>
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-end pb-4">
                                <div className={'d-flex justify-content-center align-items-center'}>
                                    <div
                                        className="text-white mx-2 bold d-flex justify-content-center align-items-center">
                                        <LazyLoadImage src={only18} alt={'18 only'} style={{
                                            width: '30px',
                                            background: 'aliceblue',
                                            borderRadius: '16px'
                                        }}/></div>
                                    <span className="mx-2 text-white"> | </span>
                                    <a className="text-white" href="/terms-and-conditions">Term & Conditions</a>
                                    <span className="mx-2 text-white"> | </span>
                                    <a className="text-white" href="/privacy-policy">Privacy & Policy</a>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <div
                        className={'col-lg-8 col-sm-12 top-login-background-img-bg-down top-login-background-img-bg-page'}>

                        <div
                            className="w-100 d-flex flex-column justify-content-center h-100 top-login-background-img-bg-page">
                            <div className={'width-page-centric redeem-points-page'}>
                                <FormTitle/>

                                <Row justify="center">

                                    <div className={'d-flex'}>
                                        {/**/}
                                        <div>
                                            {!user ? setTimeout(navigate("/"), 500) : ""}
                                            <div className={"d-flex flex-row justify-content-between"}>
                                                <div className=" w-100">
                                                    <div
                                                        className="homepage d-flex flex-column align-items-center justify-content-center login-page">

                                                        <Alert/>
                                                        <div className="modal-body pb-0" data-backdrop="static">

                                                            <RedeemPointsForm/>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4"></div>
                                    </div>
                                </Row>
                            </div>

                        </div>
                    </div>
                </Row>
            </div>
        )
    })

export default React.memo(RedeemPoints)

