import React, { useEffect, useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setState, userDeposits } from "../../redux/dataSlice";
import { getFromLocalStorage, setTrackingData } from "../utils/local-storage";
import { StoreContext } from "../../context/store";
import { useFormik } from "formik";
import { CloseOutlined } from "@ant-design/icons";
import { formatNumber } from "../utils/betslip";

const QUICK_AMOUNTS = [100, 250, 500, 1000];

const DepositModal = React.memo(() => {
  const appConfigs = useSelector((state) => state.data.app_config);
  const [settings, setSettings] = useState(getFromLocalStorage("settings"));
  const loadingDeposit = useSelector((state) => state.data.deposit_loading);
  const successMessage = useSelector((state) => state.data.deposits_message);
  const showDepositModal = useSelector((state) => state.data.show_deposit_modal);
  const dispatchRedux = useDispatch();
  const { dispatch } = useContext(StoreContext);
  const userData = useSelector((state) => state.auth.user);
  const [user, setUser] = useState(getFromLocalStorage("user"));

  useEffect(() => {
    setUser(userData || getFromLocalStorage("user"));
  }, [userData]);

  useEffect(() => {
    setSettings(appConfigs || getFromLocalStorage("settings"));
  }, [appConfigs]);

  const hideModal = () => {
    dispatchRedux(setState("show_deposit_modal", false));
    dispatchRedux(setState("deposits_message", null));
    dispatchRedux(setState("insufficient_balance", false));
  };

  const initialValues = {
    msisdn: user?.msisdn || "",
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

  const formik = useFormik({ initialValues, validate, onSubmit: handleSubmit });

  const clearMessage = () => {
    dispatchRedux(setState({ key: "deposits_message", value: null }));
  };

  const handleQuickAmount = (amount) => {
    formik.setFieldValue("amount", amount);
    dispatch({ type: "SET", key: "depositValue", payload: amount });
  };

  const balance = user?.balance || 0;

  return (
    <Modal
      show={showDepositModal}
      className="shadow-lg deposit-modal deposit-modal-body"
      dialogClassName="modal-30w"
      size="md"
      backdrop="static"
      style={{ zIndex: 10000 }}
    >
      {/* Header */}
      <Modal.Header
        closeButton={false}
        style={{
          backgroundColor: "var(--bet-fusion-primary)",
          borderBottom: "1px solid #334155",
          padding: "16px 20px",
        }}
      >
        <div className="d-flex justify-content-between align-items-center w-100">
          <span style={{ fontSize: "18px", fontWeight: "700", color: "#fff" }}>
            Deposit Funds
          </span>
          <button
            onClick={hideModal}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#fff",
              fontSize: "18px",
              padding: "4px",
              lineHeight: 1,
            }}
          >
            <CloseOutlined />
          </button>
        </div>
      </Modal.Header>

      <Modal.Body
        style={{ backgroundColor: "var(--bet-fusion-primary)", padding: "20px" }}
      >
        {/* Alert */}
        {successMessage && (
          <div
            className="alert alert-success d-flex justify-content-between align-items-center mb-3"
            role="alert"
          >
            <span>{successMessage}</span>
            <span
              style={{ cursor: "pointer", fontSize: "18px" }}
              onClick={clearMessage}
            >
              &times;
            </span>
          </div>
        )}

        {/* Available Balance */}
        <div
          style={{
            backgroundColor: "var(--bet-fusion-secondary)",
            borderRadius: "12px",
            padding: "16px 20px",
            marginBottom: "20px",
          }}
        >
          <div style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "4px" }}>
            Available Balance
          </div>
          <div style={{ color: "#fff", fontSize: "24px", fontWeight: "700" }}>
            KES {formatNumber(balance)}
          </div>
        </div>

        <form onSubmit={formik.handleSubmit}>
          {/* Phone number */}
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                color: "#94a3b8",
                fontSize: "13px",
                marginBottom: "8px",
                display: "block",
              }}
            >
              This is your primary number
            </label>
            <input
              type="text"
              name="msisdn"
              value={formik.values.msisdn}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="+254 7XX XXX XXX"
              style={{
                width: "100%",
                background: "var(--bet-fusion-secondary)",
                border: "1px solid #334155",
                borderRadius: "10px",
                padding: "12px 16px",
                color: "#fff",
                fontSize: "15px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            {formik.touched.msisdn && formik.errors.msisdn && (
              <div style={{ color: "#f87171", fontSize: "12px", marginTop: "4px" }}>
                {formik.errors.msisdn}
              </div>
            )}
          </div>

          {/* Amount */}
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                color: "#94a3b8",
                fontSize: "13px",
                marginBottom: "8px",
                display: "block",
              }}
            >
              Amount (KES)
            </label>
            <input
              type="text"
              id="amount"
              name="amount"
              value={formik.values.amount || ""}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^\d]/g, "");
                formik.setFieldValue("amount", raw ? parseInt(raw) : "");
              }}
              onBlur={formik.handleBlur}
              placeholder="Enter amount"
              style={{
                width: "100%",
                background: "var(--bet-fusion-secondary)",
                border: "1px solid #334155",
                borderRadius: "10px",
                padding: "12px 16px",
                color: "#fff",
                fontSize: "15px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            {formik.touched.amount && formik.errors.amount && (
              <div style={{ color: "#f87171", fontSize: "12px", marginTop: "4px" }}>
                {formik.errors.amount}
              </div>
            )}
          </div>

          {/* Quick amount buttons */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            {QUICK_AMOUNTS.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => handleQuickAmount(amt)}
                style={{
                  background:
                    formik.values.amount === amt
                      ? "rgba(251,134,3,0.15)"
                      : "var(--bet-fusion-secondary)",
                  border: `1px solid ${
                    formik.values.amount === amt ? "#fb8603" : "#334155"
                  }`,
                  borderRadius: "8px",
                  color:
                    formik.values.amount === amt ? "#fb8603" : "#e2e8f0",
                  padding: "10px 0",
                  fontWeight: "700",
                  fontSize: "13px",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {amt}
              </button>
            ))}
          </div>

          {/* Max deposit caption */}
          <div style={{ color: "#64748b", fontSize: "11px", marginBottom: "20px" }}>
            Maximum deposit amount KES 150,000.00
          </div>

          {/* Deposit button */}
          <button
            type="submit"
            disabled={loadingDeposit}
            style={{
              width: "100%",
              background: loadingDeposit ? "rgba(255,255,255,0.5)" : "#ffffff",
              border: "none",
              borderRadius: "12px",
              color: "#0f172a",
              fontWeight: "700",
              fontSize: "16px",
              padding: "14px",
              cursor: loadingDeposit ? "not-allowed" : "pointer",
              marginBottom: "16px",
            }}
          >
            {loadingDeposit ? (
              <div className="loader" style={{ display: "inline-block" }} />
            ) : (
              "Deposit"
            )}
          </button>

          {/* Terms */}
          <p
            style={{
              color: "#64748b",
              fontSize: "11px",
              textAlign: "center",
              margin: 0,
            }}
          >
            By continuing, you agree to our{" "}
            <a href="/terms-and-conditions" style={{ color: "#fb8603" }}>
              Terms &amp; Conditions
            </a>
          </p>
        </form>
      </Modal.Body>
    </Modal>
  );
});

export default React.memo(DepositModal);
