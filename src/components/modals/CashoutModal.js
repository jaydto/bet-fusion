import React, {useContext, useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {setState} from "../../redux/bettingSlice";
import {setState as setStateData, betCashoutConfirmation} from "../../redux/matchesSlice";
import {getFromLocalStorage, setTrackingData} from "../utils/local-storage";
import {StoreContext} from "../../context/store";
import {useFormik} from "formik";
import {userDeposits} from "../../redux/dataSlice";
import { error } from "logrocket";

const CashoutModal = React.memo(
    (props) => {
        const cashout=useSelector((state)=>state.matchesData.cashout_response)
        const loadingCashout=useSelector((state)=>state.matchesData.loading_cashout_confirmation)
        const cashout_error=useSelector((state)=>state.matchesData.error)
        const cashout_confirmation=useSelector((state)=>state.matchesData.cashout_confirmation)

        const {visible, payload, setShowCashoutModal} = props
        
        const [isOpen, setIsOpen] = useState(visible)
        const dispatchRedux = useDispatch()

       
        const hideModal = () => {
            setIsOpen(false)
            setShowCashoutModal(false)
            dispatchRedux(setState('cashout_response', null))

        }


        const handleSubmit = (values) => {
            console.log('called_submit')
            const cashout_data={
                bet_id:payload?.bet_id,
                cashout_value:cashout?.cashout_value
            }
            
            dispatchRedux(betCashoutConfirmation(cashout_data));

        };



        function clearMessage() {
            console.log('clearmessage')
        }

        const Alert = (props) => {
            let c = cashout_confirmation?.status==200?'success':'danger';
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
            return (<>{(cashout_confirmation?.status==200||cashout_error)&&
                <div role="alert"
                     className={`fade alert alert-${c} deposit-modal-alert-action show alert-dismissible d-flex justify-content-between align-items-center alert-message-line-height alert-position-betslip-top`}>
                    {cashout_confirmation?.message||cashout_error}
                    {/* <span aria-hidden="true" style={x_style} onClick={() => clearMessage()}>&times;</span> */}
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
                                <input className="cashout-close"
                                    id={"cashout"}
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
                            }} className={'deposit-modal-top-title'}>Cashout</strong>
                        </div>

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={''}>

                    <Alert/>

                        <div className="col-12 text-center ">
                            {cashout&&<div className={'d-flex justify-content-around'}>
                                <div className={'d-flex flex-column'}>
                                        <span className={'type'}>Stake</span>
                                        <span className={'market-h'} style={{fontSize:'medium'}}>KES {payload?.bet_amount}</span>
                                </div>
                                <div className={'d-flex flex-column'}>
                                    <span className={'type'}>To Win</span>
                                    <span className={'market-h'} style={{fontSize:'medium'}}>KES {cashout?.cashout_value}</span>
                                </div>

                            </div>
}
                            <button
                                type="submit"
                                className="btn btn-lg mt-4 w-100 deposit-button button-radius input-field btn-font cg login-button2 btn bold d-flex justify-content-center align-items-center button-text-choice1"
                                disabled={loadingCashout||cashout_error}
                             onClick={()=>handleSubmit()}>
                                {loadingCashout ? <div className="loader"></div> : `Request Cashout`}
                            </button>

                            {/* <div className="market-h mt-2 justify-content-center d-flex" >
                                {cashout_error}
                            </div> */}
                        </div>



                </Modal.Body>
                {/* <Modal.Footer className={'text-center modal-width deposit-modal-footer'}>
                    <Button className={'cancel-filter-markets bg-deposit-modal-btn'} onClick={hideModal} >
                        Cancel
                    </Button>
                </Modal.Footer> */}
            </Modal>

        );
    });
export default React.memo(CashoutModal);
