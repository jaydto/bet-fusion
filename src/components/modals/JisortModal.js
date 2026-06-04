import React, {useState, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import {useDispatch, useSelector} from "react-redux";
import {setState} from "../../redux/bettingSlice";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import {getFromLocalStorage, setTrackingData} from "../utils/local-storage";
import {userDepositsConfirm} from "../../redux/dataSlice";
import {Form, Formik} from "formik";
import mpesa from "../../assets/img/mpesa.png";
import {LazyLoadImage} from "react-lazy-load-image-component";


const JisortModal = React.memo((props) => {
    const {visible, setShowJisortModal} = props;

    const [isOpen, setIsOpen] = useState(visible);

    useEffect(() => {
        setIsOpen(visible);
    }, [visible]);

    const hideModal = () => {
        setIsOpen(false);
        setShowJisortModal(false);
    };

    return (
        <Modal
            show={isOpen}
            centered
            backdrop="static"
            size="md"
            style={{zIndex: 9999}}
        >
            <div
                style={{
                    background: 'var(--bet-fusion-primary)',
                    border: "1px solid #1e293b",
                    borderRadius: "16px",
                    overflow: "hidden",
                }}
            >
                <Modal.Header
                    style={{
                        background: 'var(--bet-fusion-primary)',
                        borderBottom: "1px solid #1e293b",
                        padding: "20px",
                    }}
                >
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <div>
                            <h5
                                style={{
                                    color: "#fff",
                                    margin: 0,
                                    fontWeight: 700,
                                }}
                            >
                                Missing Deposit
                            </h5>

                            <small
                                style={{
                                    color: "#94a3b8",
                                    fontSize: "13px",
                                }}
                            >
                                Confirm your M-Pesa transaction code
                            </small>
                        </div>

                        <button
                            onClick={hideModal}
                            style={{
                                border: "none",
                                background: "transparent",
                                color: "#94a3b8",
                                fontSize: "24px",
                                cursor: "pointer",
                                lineHeight: 1,
                            }}
                        >
                            ×
                        </button>
                    </div>
                </Modal.Header>

                <Modal.Body
                    style={{
                        background: 'var(--bet-fusion-primary)',
                        padding: "24px",
                    }}
                >
                    <ConfirmationAlert/>

                    <div style={{overflowX: "hidden"}}>
                        <DepositConfirmForm/>
                    </div>
                </Modal.Body>
            </div>
        </Modal>
    );
});

const ConfirmationAlert = (props) => {
    const successMessageConfirmation = useSelector(
        (state) => state.data.deposits_confirm_message
    );
    const [message, setMessage] = useState();
    const errorMessage = useSelector((state) => state.data.error);

    const [messageConfirmation, setMessageConfirmation] = useState();

    useEffect(() => {
        if (successMessageConfirmation) {
            setMessageConfirmation(successMessageConfirmation);
        } else if (errorMessage) {
            setMessageConfirmation(errorMessage);
        }
    }, [successMessageConfirmation, errorMessage]);
    let c = successMessageConfirmation ? "success" : "danger";
    messageConfirmation &&
    setTimeout(() => {
        setMessageConfirmation(null);
    }, 5500);
    return (
        <>
            {messageConfirmation && (
                <div role="alert" className={`fade alert alert-${c} show`}>
                    {messageConfirmation}
                </div>
            )}{" "}
        </>
    );
};

const DepositConfirmForm = (props) => {
    const dispatchRedux = useDispatch();

    const initialValues = {
        confirmation_code: "",
    };
    // const gaEventTracker = useAnalyticsEventTracker("Deposit Confirmation");

    const handleSubmit = (values) => {
        setTrackingData(values);
        dispatchRedux(userDepositsConfirm(values));
        // const data = {
        //     confirmation_code: values?.confirmation_code
        // }
        // gaEventTracker('Deposit Confirmation', data)
    };

    const validate = (values) => {
        let errors = {};

        if (!values.confirmation_code) {
            errors.confirmation_code =
                "Please enter Your Mpesa Deposit Transactional Code";
        }
        return errors;
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validate={validate}
            render={(props) => <MyDepositConfirmationForm {...props} />}
        />
    );
};

export default React.memo(JisortModal);
const MyDepositConfirmationForm = (props) => {
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
                        <div className={`col-md-7 text-center`}>
                            <LazyLoadImage src={mpesa} alt=""/>
                        </div>
                    </div>

                    <DepositConfirmFormFields onFieldChanged={onFieldChanged}
                                              values={values} errors={errors}

                    />


                </div>
            </div>
        </Form>
    );
}

const DepositConfirmFormFields = (props) => {
    const {values, errors, onFieldChanged} = props;
    const loadingConfirmDeposit = useSelector((state) => state.data.deposit_confirm_loading)
    const userData = useSelector((state) => state.auth.user)

    const [user, setUser] = useState(getFromLocalStorage("user"));
    useEffect(() => {
        setUser(userData || getFromLocalStorage("user"))
    }, [userData])


    return (
        <>
            <div className="form-group row d-flex justify-content-center deposit-widthdraw-input-desktop">
                <div className={`col-md-12 w-100`}>
                    <div className={'d-flex justify-content-start'}>
                        <label className={'text-light deposit col-5 deposit-label'}>MPESA CODE</label>
                    </div>
                </div>
            </div>
            {user && <hr/>}
            <div
                className="form-group w-100 d-flex flex-column justify-content-center mt-3 deposit-widthdraw-input-desktop">
                <div className="col-md-12 px-2 w-100">
                    <label className={'text-light deposit'}>Mpesa Transaction Code</label>
                    <input
                        onChange={ev => {
                            onFieldChanged(ev);
                        }}
                        className=" deposit-input form-control col-md-12 input-field"
                        id="confirmation_code"
                        name="confirmation_code"
                        type="text"
                        value={values?.confirmation_code || ''}
                        placeholder='Enter Transactional Code'
                        style={{border: "1px solid var(--betfusion-grey) !important", borderRadius: "12px !important"}}
                    />
                    {errors?.confirmation_code && <div className='text-danger'> {errors?.confirmation_code} </div>}
                </div>
            </div>
            <div className="form-group w-100 d-flex justify-content-left mb-4 ">
                <div className=" d-flex align-items-start deposit-withdraw-button-desktop w-100 px-2">
                    <button type={"submit"}
                            className='btn btn-lg w-100 deposit-button button-radius input-field btn-font login-button2 btn bold d-flex justify-content-center align-items-center'
                            style={{
                                marginTop: "30px",
                                borderRadius: '12px',
                            }} disabled={values?.amount == '' || loadingConfirmDeposit}>
                        {loadingConfirmDeposit ? <div className="loader"></div> : 'CONFIRM DEPOSIT '}
                    </button>
                </div>
            </div>
        </>
    )
}
