import React, {  useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector} from "react-redux";
import { setState } from "../../redux/bettingSlice";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import { getFromLocalStorage, setTrackingData } from "../utils/local-storage";
import { userDepositsConfirm } from "../../redux/dataSlice";
import { Form, Formik } from "formik";
import mpesa from "../../assets/img/mpesa.png";
import { LazyLoadImage } from "react-lazy-load-image-component";


const JisortModal = React.memo((props) => {


  const { visible, payload, setShowJisortModal } = props;

  const [isOpen, setIsOpen] = useState(visible);
  const dispatchRedux = useDispatch();


  const hideModal = () => {
    setIsOpen(false);
    setShowJisortModal(false);
   
  };


 

  return (
    <Modal
      show={isOpen}
      className={"shadow-lg filters-modal deposit-modal deposit-modal-body"}
      dialogClassName={"modal-30w"}
      centered={true}
      size={"md"}
      backdrop={"static"}
      style={{ zIndex: "9999" }}
    >
      <Modal.Header closeButton={false} className={"w-100"}>
        <Modal.Title className={"w-100"}>
          <div
            className={
              "d-flex justify-content-between align-items-start flex-column px-4"
            }
          >
            <div className="drag-icon deposit-modal">
              <span></span>
            </div>
            <div className="close-history-filter deposit-modal">
              <input
                className="cashout-close"
                id={"cashout"}
                type="submit"
                value="X"
                onClick={hideModal}
              />
            </div>
            <strong
              style={{
                width: "100%",
                fontSize: "19px",
                fontWeight: "bolder",
                letterSpacing: "2px",
              }}
              className={"deposit-modal-top-title"}
            >
              Jisort
            </strong>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={""}>
        <ConfirmationAlert />
        <div className="col-12 text-center ">
          <div className=" pb-0" data-backdrop="static">
            <DepositConfirmForm />
          </div>
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
  const gaEventTracker = useAnalyticsEventTracker("Deposit Confirmation");

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
                        // Pass confirmation code  here

                    />
                    <div className={``}>
                        <ConfirmationInstructions/>
                    </div>

                </div>
            </div>
        </Form>
    );
}

const ConfirmationInstructions = (props) => {
    return (
      <>
        <label className="CrashKali-text-light">Missing Deposit?</label>
        <div className="container d-flex flex-column">
          <div className="row">
            <div className="col CrashKali-text-light">
              {" "}
              1. Enter Mpesa Transaction code when your deposit has not reflected
              in your account.
            </div>
          </div>
          <div className="row">
            <div className="col CrashKali-text-light">
              {" "}
              2. Click on confirm deposit..
            </div>
          </div>
          <div className="row">
            <div className="col CrashKali-text-light">
              {" "}
              3. Your deposit will be credited to your account.
            </div>
          </div>
        </div>
      </>
    );
  };

const DepositConfirmFormFields = (props) => {
    const {values, errors, onFieldChanged} = props;
    const loadingConfirmDeposit=useSelector((state)=>state.data.deposit_confirm_loading)
    const userData=useSelector((state)=>state.auth.user)

    const [user, setUser] = useState(getFromLocalStorage("user"));
    useEffect(()=>{
        setUser(userData||getFromLocalStorage("user"))
    },[userData])




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
            <div className="form-group w-100 d-flex flex-column justify-content-center mt-3 deposit-widthdraw-input-desktop">
                <div className="col-md-12 px-2 w-100">
                    <label className={'text-light deposit'}>Mpesa Transaction Code</label>
                    <input
                        onChange={ev => {
                            onFieldChanged(ev);
                        }}
                        className="text-light deposit-input form-control col-md-12 input-field"
                        id="confirmation_code"
                        name="confirmation_code"
                        type="text"
                        value={values?.confirmation_code || ''}
                        placeholder='Enter Transactional Code'
                    />
                    {errors?.confirmation_code && <div className='text-danger'> {errors?.confirmation_code} </div>}
                </div>
            </div>
            <div className="form-group w-100 d-flex justify-content-left mb-4 ">
                <div className=" d-flex align-items-start deposit-withdraw-button-desktop w-100 px-2">
                    <button type={"submit"}
                            className='btn btn-lg w-100 deposit-button button-radius input-field btn-font cg login-button2 btn bold d-flex justify-content-center align-items-center'
                            style={{marginTop: "30px"}} disabled={values?.amount == ''||loadingConfirmDeposit}>
                        {loadingConfirmDeposit ? <div className="loader"></div>:'CONFIRM DEPOSIT ' }
                    </button>
                </div>
            </div>
        </>
    )
}