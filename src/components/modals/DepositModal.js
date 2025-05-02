import React, { useEffect, useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setState, userDeposits } from "../../redux/dataSlice";
import { getFromLocalStorage, setTrackingData } from "../utils/local-storage";
import { StoreContext } from "../../context/store";
import { useFormik } from "formik";
import { LazyLoadImage } from "react-lazy-load-image-component";
import mpesa from "../../assets/img/mobile/mpesa.svg";
import DepositCards from "../pages/deposit-withraw/depositCards";

const DepositInstructions = ({ handleFavoriteSelect, handleCardSelect }) => {
  return (
    <>
      <p className={"text-white py-2 px-4 font-input text-center mb-4"}>
        Send money into your BetDonjo Account
      </p>
      <p className={"text-white py-2 px-2 font-input text-start mb-4"}>
        Payment method
      </p>
      <div>
        <LazyLoadImage src={mpesa} alt="Logo" />
        <p className={"text-white py-2 px-2 font-input text-start mb-1"}>
          Amount
        </p>

        <DepositCards
          onFavoriteSelect={handleFavoriteSelect}
          onCardSelect={handleCardSelect}
        />
      </div>
    </>
  );
};

const DepositModal = React.memo(() => {
  const appConfigs = useSelector((state) => state.data.app_config);
  const [settings, setSettings] = useState(getFromLocalStorage("settings"));
  const loadingDeposit = useSelector((state) => state.data.deposit_loading);
  const successMessage = useSelector((state) => state.data.deposits_message);
  const showDepositModal = useSelector(
    (state) => state.data.show_deposit_modal
  );

  const dispatchRedux = useDispatch();
  const { dispatch } = useContext(StoreContext);
  const userData = useSelector((state) => state.auth.user);

  const [user, setUser] = useState(getFromLocalStorage("user"));
  useEffect(() => {
    setUser(userData || getFromLocalStorage("user"));
  }, [userData]);

  const hideModal = () => {
    dispatchRedux(setState("show_deposit_modal", false));
    dispatchRedux(setState("insufficient_balance", false));
  };

  const initialValues = {
    msisdn: user?.msisdn,
    amount: 100,
  };

  const validate = (values) => {
    let errors = {};

    if (!values.msisdn || !values.msisdn.match(/(254|0|)?[71]\d{8}/g)) {
      errors.msisdn = "Please enter a valid phone number";
    }

    if (!values.amount || values.amount < 1 || values.amount > 150000) {
      errors.amount = "Please enter amount between KES 1.00 and KES 150,000.00";
    }

    return errors;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setTrackingData(values);
    dispatchRedux(userDeposits(values));
    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: handleSubmit,
  });

  const clearMessage = () => {
    dispatchRedux(setState({ key: "deposits_message", value: null }));
    dispatchRedux(setState({ key: "bet_placement_message", value: null }));
  };

  useEffect(() => {
    setSettings(appConfigs || getFromLocalStorage("settings"));
  }, [appConfigs]);

  const incrementDepositValue = (value) => {
    formik.setFieldValue("amount", value);
    dispatch({ type: "SET", key: "depositValue", payload: value });
  };

  const Alert = () => {
    let c = successMessage ? "success" : "danger";
    let x_style = {
      float: "right",
      display: "block",
      fontSize: "22px",
      color: "orangered",
      cursor: "pointer",
      padding: "3px",
      position: "absolute",
      top: "0",
      right: "0",
    };

    return (
      <>
        {successMessage && (
          <div
            role="alert"
            className={`fade alert alert-${c} deposit-modal-alert-action show alert-dismissible d-flex justify-content-between align-items-center alert-message-line-height alert-position-betslip-top`}
          >
            {successMessage}
            <span aria-hidden="true" style={x_style} onClick={clearMessage}>
              &times;
            </span>
          </div>
        )}
      </>
    );
  };

  const handleFavoriteSelect = (value) => {
    console.log("Favorited:", value);
  };

  const handleCardSelect = (amount) => {
    console.log("Card clicked for amount: KES", amount);
    formik.setFieldValue("amount", amount); // Set Formik form value
  };

  console.log("showSuccessMessage", successMessage);

  return (
    <Modal
      show={showDepositModal}
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
            className={"d-flex justify-content-between align-items-end px-4"}
          >
            <strong
              style={{
                fontSize: "19px",
                fontWeight: "bolder",
                letterSpacing: "2px",
                color: "var(--login-btn-cl)",
              }}
              className={"deposit-modal-top-title"}
            >
              Deposit
            </strong>

            <Button
              className={" bg-deposit-modal-btn"}
              style={{
                overflowX: "hidden",
                backgroundColor: "transparent",
                border: "none",
                color: "var(--login-btn-cl)",
              }}
              onClick={hideModal}
            >
              back
            </Button>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={""}>
        <DepositInstructions
          handleCardSelect={handleCardSelect}
          handleFavoriteSelect={handleFavoriteSelect}
        />
        <Alert />

        <div
          className={"d-flex justify-content-between align-items-center gap-2"}
        >
          {settings?.BetDonjoDeposit &&
            settings?.BetDonjoDeposit?.map((deposit, index) => (
              <div key={index} className={""}>
                <button
                  type="button"
                  onClick={() => incrementDepositValue(deposit?.deposit_amount)}
                  className="deposit-buttons-value deposit-modal"
                >
                  <div className={"deposit-values"}>
                    +&nbsp;{deposit?.deposit_amount}
                  </div>
                </button>
              </div>
            ))}
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className={"d-flex gap-3 flex-column pt-3"}>
            <div className={"d-flex flex-column "}>
              <div
                className="form-control d-flex justify-content-between align-items-center"
                style={{ height: "40px", backgroundColor: "var(--input-bg)" }}
              >
                <span style={{color:"var(--light)"}}>Deposit</span>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  value={`KES ${formik.values.amount || ""}`}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/[^\d]/g, ""); // strip non-digits
                    formik.setFieldValue("amount", rawValue);
                  }}
                  onBlur={formik.handleBlur}
                  className="border-0 text-end w-75 bg-transparent pr-input"
                  style={{ outline: "none" }}
                  placeholder="KES 0"
                />
              </div>

              {formik.touched.amount && formik.errors.amount && (
                <div className="invalid-feedback">{formik.errors.amount}</div>
              )}
            </div>
          </div>
          <div className="col-12 text-center mt-4">
            <button
              type="submit"
              className="btn btn-lg w-100 deposit-button button-radius input-field btn-font  login-button2 btn bold d-flex justify-content-center align-items-center button-text-choice1"
              disabled={loadingDeposit}
            >
              {loadingDeposit ? (
                <div className="loader"></div>
              ) : (
                `DEPOSIT ${formik.values.amount}`
              )}
            </button>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer
        className={
          "text-center modal-width deposit-modal-footer position-relative"
        }
        style={{ overflowX: "hidden" }}
      >
        <Button
          className={"cancel-filter-markets bg-deposit-modal-btn"}
          style={{ overflowX: "hidden" }}
          onClick={hideModal}
        >
          <input id={"deposit"} type="submit" value="X" onClick={hideModal}  />
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default React.memo(DepositModal);
