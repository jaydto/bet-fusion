import React, { useCallback, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./modals-custom.css";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { notification } from "antd";
import { formatNumber } from "../utils/betslip";
import { resetState, setState, userWithdrawal } from "../../redux/dataSlice";
import { getFromLocalStorage, setTrackingData } from "../utils/local-storage";

const QUICK_AMOUNTS = [100, 250, 500, 1000];

const WithdrawalModal = React.memo(() => {
  const dispatchRedux = useDispatch();

  const showWithdrawModal = useSelector((state) => state.data.show_withdraw_modal);
  const loadingWithdraw = useSelector((state) => state.data.withdraw_loading);
  const successMessage = useSelector((state) => state.data.withdrawal_message);
  const errorMessage = useSelector((state) => state.data.error);
  const userData = useSelector((state) => state.auth.user);

  const [user, setUser] = useState(getFromLocalStorage("user"));
  const [settings, setSettings] = useState(getFromLocalStorage("settings"));

  const minAmount = settings?.withdrawalLimits?.minimumAmount || 50;
  const maxAmount = settings?.withdrawalLimits?.maximumAmount || 150000;

  useEffect(() => {
    setUser(userData || getFromLocalStorage("user"));
    setSettings(getFromLocalStorage("settings"));
  }, [userData]);

  const hideModal = () => {
    dispatchRedux(setState("show_withdraw_modal", false));
    dispatchRedux(resetState("withdrawal_message"));
    dispatchRedux(resetState("error"));
  };

  const formik = useFormik({
    initialValues: { amount: "" },
    validationSchema: Yup.object().shape({
      amount: Yup.number()
        .required("Amount is required")
        .min(minAmount, `Minimum amount is KES ${minAmount}`)
        .max(maxAmount, `Maximum amount is KES ${maxAmount}`)
        .positive("Amount must be positive")
        .integer("Amount must be a whole number"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const payload = {
        amount: values.amount,
        msisdn: user?.msisdn || getFromLocalStorage("user")?.msisdn,
      };
      try {
        setTrackingData({ user: payload });
        dispatchRedux(userWithdrawal({ user: payload }));
        resetForm();
      } catch (error) {
        console.error("Withdrawal error:", error);
      }
    },
  });

  const dispatchWithdrawMessage = useCallback(() => {
    if (successMessage) {
      notification.success({
        message: "Success",
        description: successMessage,
        className: "ant-notification",
        placement: "top",
      });
      setTimeout(() => hideModal(), 1500);
    } else if (errorMessage) {
      notification.error({
        message: "Error",
        description: errorMessage,
        className: "ant-notification",
        placement: "top",
      });
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    dispatchWithdrawMessage();
    let timer;
    if (successMessage || errorMessage) {
      timer = setTimeout(() => {
        dispatchRedux(resetState("withdrawal_message"));
        dispatchRedux(resetState("error"));
      }, 7500);
    }
    return () => clearTimeout(timer);
  }, [dispatchWithdrawMessage]);

  const handleQuickAmount = (amount) => {
    formik.setFieldValue("amount", amount);
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
    fontFamily: "'Inter', sans-serif",
    boxSizing: "border-box",
  };

  const labelStyle = {
    color: "#64748b",
    fontSize: 12,
    marginBottom: 6,
    display: "block",
  };

  const balance = user?.balance || 0;

  return (
    <Modal
      show={showWithdrawModal}
      onHide={hideModal}
      className="shadow-lg"
      contentClassName="modal-dark-content"
      dialogClassName="modal-30w"
      centered
      size="md"
      backdrop="static"
      style={{ zIndex: 10000 }}
    >
      {/* Header */}
      <Modal.Header
        closeButton={false}
        style={{ borderBottom: "1px solid #1e293b", padding: "18px 20px" }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>
            Withdraw Funds
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

      <Modal.Body style={{ padding: "20px" }}>
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
            KES {formatNumber(balance)}
          </div>
        </div>

        <form onSubmit={formik.handleSubmit}>
          {/* Phone number — read-only */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>This is your primary number</label>
            <input
              style={{ ...inputStyle, color: "#64748b", cursor: "not-allowed" }}
              type="text"
              readOnly
              value={user?.msisdn || ""}
              placeholder="+254 7XX XXX XXX"
            />
          </div>

          {/* Amount */}
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Amount (KES)</label>
            <input
              style={{
                ...inputStyle,
                border: formik.touched.amount && formik.errors.amount
                  ? "1px solid #f87171"
                  : "1px solid #2a3347",
              }}
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
              <div style={{ color: "#f87171", fontSize: 11, marginTop: 4 }}>
                {formik.errors.amount}
              </div>
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
                    fontFamily: "'Inter', sans-serif",
                    transition: "all 0.15s",
                  }}
                >
                  {amt}
                </button>
              );
            })}
          </div>

          {/* Tax breakdown */}
          {formik.values.amount > 0 && (
            <div style={{
              background: "#171A26",
              borderRadius: 8,
              padding: "10px 12px",
              marginBottom: 16,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#64748b" }}>
                <span>Withholding Tax (5%)</span>
                <span>- KES {(formik.values.amount * 0.05).toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 700, color: "#fb8603" }}>
                <span>You will receive</span>
                <span>KES {(formik.values.amount * 0.95).toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Min note */}
          <div style={{ color: "#475569", fontSize: 11, marginBottom: 20 }}>
            Minimum withdrawal amount KES {minAmount}
          </div>

          {/* Withdraw button */}
          <button
            type="submit"
            disabled={!formik.isValid || !formik.dirty || loadingWithdraw}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 10,
              border: "none",
              background: !formik.isValid || !formik.dirty || loadingWithdraw
                ? "rgba(251,134,3,0.4)"
                : "linear-gradient(270.35deg, #fb8603 10.81%, #E4010D 64.67%)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
              cursor: !formik.isValid || !formik.dirty || loadingWithdraw ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              letterSpacing: 0.3,
              marginBottom: 14,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {loadingWithdraw ? <div className="loader" /> : "Withdraw"}
          </button>

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

export default WithdrawalModal;
