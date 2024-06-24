import React, {useContext, useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {setState} from "../../redux/bettingSlice";
import {setState as setStateData} from "../../redux/dataSlice";
import {getFromLocalStorage, setTrackingData} from "../utils/local-storage";
import {StoreContext} from "../../context/store";
import {useFormik} from "formik";
import {userDeposits} from "../../redux/dataSlice";

const DepositModal = React.memo(
    (props) => {
        const appConfigs=useSelector((state)=>state.data.app_config)
        const [settings,setSettings] = useState(getFromLocalStorage('settings'));
        const loadingDeposit=useSelector((state)=>state.data.deposit_loading)
        const successMessage=useSelector((state)=>state.data.deposits_message)

        const {visible, payload, setShowShareModal, setMessage} = props
        const [isOpen, setIsOpen] = useState(visible)
        const dispatchRedux = useDispatch()
        const {dispatch}=useContext(StoreContext)
        const userData=useSelector((state)=>state.auth.user)

        const [user, setUser] = useState(getFromLocalStorage("user"));
        useEffect(()=>{
            setUser(userData||getFromLocalStorage("user"))
        },[userData,  getFromLocalStorage('user')])
        const hideModal = () => {
            setIsOpen(false)
            setShowShareModal(false)
            dispatchRedux(setState('insufficient_balance', false))

        }
        const initialValues = {
            msisdn: user?.msisdn,
            amount: '',
        };
        const validate = values => {

            let errors = {}

            if (!values.msisdn || !values.msisdn.match(/(254|0|)?[71]\d{8}/g)) {
                errors.msisdn = 'Please enter a valid phone number'
            }

            if (!values.amount || values.amount < 1 || values.amount > 150000) {
                errors.amount = "Please enter amount between KES 1.00 and KES 150,000.00";
            }
            return errors
        }

        const handleSubmit = (values, { setSubmitting }) => {
            setTrackingData(values);

            // Dispatch your action or perform any other necessary operations
            dispatchRedux(userDeposits(values));

            // Set submitting to false to enable the form submission button
            setSubmitting(false);
        };

        const formik = useFormik({
            initialValues,
            validate,
            onSubmit: handleSubmit, // Use your handleSubmit function here

        });

        const clearMessage=()=>{
            setMessage(null)
            dispatchRedux(setStateData('deposits_message', null))
            dispatchRedux(setState('bet_placement_message', null))

        }
        useEffect(()=>{
            setSettings(appConfigs||getFromLocalStorage('settings'))
        },[appConfigs, getFromLocalStorage('settings')])

        const incrementDepositValue = (value) => {
            // Update the "amount" field in the formik values
            formik.setFieldValue('amount', value);

            // Dispatch the value to Redux if needed
            dispatch({ type: 'SET', key: 'depositValue', payload: value });

            // Update the currentDepositValue state if necessary
        };

        const Alert = (props) => {
            let c =  successMessage?'success':'danger';
            let x_style = {
                float: "right",
                display: "block",
                fontSize: "22px",
                color: "orangered",
                cursor: "pointer",
                padding: "3px",
                position: 'absolute',
                top: '0',
                right: '0'
            }
            return (<>{(payload||successMessage)&&
                <div role="alert"
                     className={`fade alert alert-${c} deposit-modal-alert-action show alert-dismissible d-flex justify-content-between align-items-center alert-message-line-height alert-position-betslip-top`}>
                    {successMessage||payload}
                    <span aria-hidden="true" style={x_style} onClick={() => clearMessage()}>&times;</span>
                </div>
            }
            </>);

        };


        return (
            <Modal show={isOpen}
                   className={'shadow-lg filters-modal deposit-modal deposit-modal-body'}
                   dialogClassName={'modal-30w'}
                   centered={true}
                   size={"md"}
                   backdrop={"static"}
                   style={{zIndex: "9999"}}>
                <Modal.Header closeButton={false} className={"w-100"}>
                    <Modal.Title className={"w-100"}>
                        <div className={"d-flex justify-content-between align-items-start flex-column px-4"}>
                            <div className="drag-icon deposit-modal"><span></span></div>
                            <div className="close-history-filter deposit-modal">
                                <input
                                    id={"deposit"}
                                    type="submit"
                                    value="X"
                                    onClick={hideModal}
                                />
                            </div>
                            <strong style={{
                                width: "100%",
                                fontSize: "19px",
                                fontWeight: "bolder",
                                letterSpacing: "2px"
                            }} className={'deposit-modal-top-title'}>Deposit</strong>
                        </div>

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={''}>

                    <Alert/>
                    <div className={'d-flex justify-content-between align-items-center gap-2'}>
                        {settings?.CrashKaliDeposit && settings?.CrashKaliDeposit?.map((deposit, index) => {
                            return (<div key={index} className={''}>
                                    <button type="button" onClick={() => incrementDepositValue(deposit?.deposit_amount)}
                                            className="deposit-buttons-value deposit-modal  ">
                                        <div className={'deposit-values'}>+&nbsp;{deposit?.deposit_amount}</div>
                                    </button>
                                </div>

                            )
                        })}
                    </div>


                    <form onSubmit={formik.handleSubmit}>
                        <div className={'d-flex gap-3 flex-column pt-3'}>
                            <div className={'d-flex flex-column '}>
                                <input
                                    type="text"
                                    id="amount"
                                    name="amount"
                                    value={formik.values.amount}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`form-control ${formik.touched.amount && formik.errors.amount ? 'is-invalid' : ''}`}
                                    style={{ height: '40px' }}
                                    placeholder="Amount"
                                />
                                {formik.touched.amount && formik.errors.amount && (
                                    <div className="invalid-feedback">{formik.errors.amount}</div>
                                )}
                            </div>
                        </div>

                        <div className="col-12 text-center mt-4">
                            <button
                                type="submit"
                                className="btn btn-lg w-100 deposit-button button-radius input-field btn-font cg login-button2 btn bold d-flex justify-content-center align-items-center button-text-choice1"
                                disabled={loadingDeposit}
                            >
                                {loadingDeposit ? <div className="loader"></div> : `DEPOSIT ${formik.values.amount}`}
                            </button>
                        </div>
                    </form>


                </Modal.Body>
                <Modal.Footer className={'text-center modal-width deposit-modal-footer'} style={{overflowX:'hidden'}}>
                    <Button className={'cancel-filter-markets bg-deposit-modal-btn'} style={{overflowX:'hidden'}} onClick={hideModal} >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

        );
    });
export default React.memo(DepositModal);
