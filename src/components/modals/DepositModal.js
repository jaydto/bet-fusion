import React, { useEffect, useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import "./modals-custom.css";
import { useDispatch, useSelector } from "react-redux";
import { setState, userDeposits } from "../../redux/dataSlice";
import { getFromLocalStorage, setTrackingData } from "../utils/local-storage";
import { StoreContext } from "../../context/store";
import { useFormik } from "formik";
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
    amount: 1000,
  };

  const validate = (values) => {
    let errors = {};
    if (!values.msisdn || !values.msisdn.match(/(254|0|)?[71]\d{8}/g)) {
      errors.msisdn = "Please enter a valid phone number";
    }
    if (!values.amount || values.amount < 1 || values.amount > 150000) {
      errors.amount = "Please enter amount between KES 1 and KES 150,000";
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
    dispatchRedux(setState("deposits_message", null));
  };

  const handleQuickAmount = (amount) => {
    formik.setFieldValue("amount", amount);
    dispatch({ type: "SET", key: "depositValue", payload: amount });
  };

  const inputStyle = {
    width: "100%",
    background: "#171A26",
    border: "1px solid #2a3347",
    borderRadius: 10,
    padding: "13px 16px",
    color: "#e2e8f0",
    fontSize: 15,
    outline: "none",
    fontFamily: "'Outfit', sans-serif",
    boxSizing: "border-box",
  };

  const labelStyle = {
    color: "#64748b",
    fontSize: 12,
    marginBottom: 6,
    display: "block",
  };

  return (
    <Modal
      show={showDepositModal}
      className="shadow-lg"
      contentClassName="modal-dark-content"
      dialogClassName="modal-30w"
      centered
      size="md"
      backdrop
      onHide={hideModal}
      style={{ zIndex: 10000 }}
    >
      {/* Header */}
      <Modal.Header
        closeButton={false}
        style={{
          background: "#0F111A",
          borderBottom: "1px solid #1e293b",
          padding: "18px 20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>
            Deposit Funds
          </span>
          <button
            onClick={hideModal}
            style={{
              width: 30, height: 30,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              border: "none",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#94a3b8", fontSize: 14,
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
          >✕</button>
        </div>
      </Modal.Header>

      <Modal.Body
        style={{
          background: "#0F111A",
          padding: "20px",
        }}
      >
        {/* Success alert */}
        {successMessage && (
          <div
            className="alert alert-success d-flex justify-content-between align-items-center mb-3"
            role="alert"
            style={{ fontSize: 13 }}
          >
            <span>{successMessage}</span>
            <span style={{ cursor: "pointer", fontSize: 18 }} onClick={clearMessage}>&times;</span>
          </div>
        )}

        {/* Available Balance */}
        <div style={{
          border: "1px solid #1e293b",
          borderRadius: 10,
          padding: "14px 16px",
          marginBottom: 20,
          background: "#171A26",
        }}>
          <div style={{ color: "#64748b", fontSize: 12, marginBottom: 4 }}>Available Balance</div>
          <div style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>
            KES {formatNumber(user?.balance || 0)}
          </div>
        </div>

        <form onSubmit={formik.handleSubmit}>
          {/* Phone number */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>This is your primary number</label>
            <input
              style={{ ...inputStyle, color: "#64748b", cursor: "not-allowed" }}
              type="text"
              name="msisdn"
              value={formik.values.msisdn}
              readOnly
              placeholder="+254 7XX XXX XXX"
            />
            {formik.touched.msisdn && formik.errors.msisdn && (
              <div style={{ color: "#f87171", fontSize: 11, marginTop: 4 }}>{formik.errors.msisdn}</div>
            )}
          </div>

          {/* Amount */}
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Amount (KES)</label>
            <input
              style={inputStyle}
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
            />
            {formik.touched.amount && formik.errors.amount && (
              <div style={{ color: "#f87171", fontSize: 11, marginTop: 4 }}>{formik.errors.amount}</div>
            )}
          </div>

          {/* Quick amounts */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 10 }}>
            {QUICK_AMOUNTS.map((amt) => {
              const isActive = formik.values.amount === amt;
              return (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handleQuickAmount(amt)}
                  style={{
                    padding: "9px 0",
                    borderRadius: 8,
                    border: `1px solid ${isActive ? "#3b82f6" : "#2a3347"}`,
                    background: isActive ? "#1e3a5f" : "#171A26",
                    color: isActive ? "#60a5fa" : "#94a3b8",
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: "pointer",
                    fontFamily: "'Outfit', sans-serif",
                    transition: "all 0.15s",
                  }}
                >
                  {amt}
                </button>
              );
            })}
          </div>

          {/* Max note */}
          <div style={{ color: "#475569", fontSize: 11, marginBottom: 20 }}>
            Maximum deposit amount KES 150,000.00
          </div>

          {/* Deposit button */}
          <button
            type="submit"
            disabled={loadingDeposit}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 10,
              border: "none",
              background: loadingDeposit ? "rgba(251,134,3,0.4)" : "linear-gradient(270.35deg, #fb8603 10.81%, #E4010D 64.67%)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
              cursor: loadingDeposit ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              letterSpacing: 0.3,
              marginBottom: 14,
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            {loadingDeposit ? <div className="loader" /> : "Deposit"}
          </button>

          {/* Terms */}
          <p style={{ color: "#475569", fontSize: 11, textAlign: "center", margin: 0 }}>
            By continuing, you agree to our{" "}
            <a href="/terms-and-conditions" style={{ color: "#60a5fa" }}>
              Terms &amp; Conditions
            </a>
          </p>
        </form>
      </Modal.Body>
    </Modal>
  );
});

export default React.memo(DepositModal);
