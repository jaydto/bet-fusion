import React, { useCallback, useEffect, useState } from "react";
import { Col, notification, Row } from "antd";

import { useNavigate } from "react-router-dom";

import {
  getFromLocalStorage,
  setTrackingData,
} from "../../utils/local-storage";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { Form, Formik } from "formik";
import mpesa from "../../../assets/img/mpesa.png";
import "./deposit.css";

import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { resetState, userWithdrawal } from "../../../redux/dataSlice";
import { userBalance } from "../../../redux/authSlice";
import { formatNumber } from "../../utils/betslip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const Withdraw = React.memo((props) => {
  const navigate = useNavigate();
  const successMessage = useSelector((state) => state.data.withdrawal_message);
  const errorMessage = useSelector((state) => state.data.error);
  const dispatchRedux = useDispatch();
  const userData = useSelector((state) => state.auth.user);

  const [user, setUser] = useState(getFromLocalStorage("user"));
  useEffect(() => {
    setUser(userData || getFromLocalStorage("user"));
  }, [userData]);

  const updateUserOnHistory = () => {
    if (!user) {
      return false;
    }
    let udata = {
      token: user.token,
    };
    const userValues = {
      udata: udata,
      user: user,
    };

    dispatchRedux(userBalance(userValues));
  };

  useEffect(() => {
    updateUserOnHistory();
  }, [successMessage]);

  const FormTitle = () => {
    const navigate = useNavigate();
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        padding: "14px 20px",
        borderBottom: "1px solid #1e293b",
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "transparent",
            border: "none",
            color: "#e2e8f0",
            cursor: "pointer",
            padding: "4px 8px 4px 0",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 16,
          }}
        >
          <FontAwesomeIcon icon={faAngleLeft} style={{ color: "#fb8603" }} />
        </button>
        <span style={{ color: "#e2e8f0", fontSize: "17px", fontWeight: "600" }}>
          Withdraw Funds
        </span>
      </div>
    );
  };

  const dispatchWithdrawtMessage = useCallback(() => {
    if (successMessage !== null) {
      // display the success message
      notification.success({
        message: "Success",
        description: successMessage,
        className: "ant-notification",
        placement: "top", // Set placement to top
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
      navigate("/");
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    dispatchWithdrawtMessage();
    setTimeout(() => {
      dispatchRedux(resetState("deposits_message"));
      dispatchRedux(resetState("deposits_confirm_message"));
      dispatchRedux(resetState("error"));
    }, 7500);
  }, [dispatchWithdrawtMessage]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <ToastContainer />
      <div style={{ maxWidth: "480px", margin: "0 auto" }}>
        <FormTitle />
        {!user ? setTimeout(navigate("/"), 500) : null}
        <WithdrawForm />
      </div>
    </div>
  );
});

const PaymentInstructions = () => {
  const steps = [
    "Enter the amount you wish to withdraw.",
    "Click the withdraw button to initiate.",
    "Check your phone for an M-PESA confirmation.",
  ];
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      borderRadius: 10,
      padding: "12px 16px",
    }}>
      <div style={{ color: "#64748b", fontSize: 12, fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.6 }}>
        How to Withdraw
      </div>
      {steps.map((step, i) => (
        <div key={i} style={{ display: "flex", gap: 10, marginBottom: 6, alignItems: "flex-start" }}>
          <span style={{
            width: 20, height: 20, borderRadius: "50%",
            background: "rgba(251,134,3,0.15)", border: "1px solid rgba(251,134,3,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 700, color: "#fb8603", flexShrink: 0,
          }}>{i + 1}</span>
          <span style={{ color: "#94a3b8", fontSize: 13 }}>{step}</span>
        </div>
      ))}
    </div>
  );
};

const WithdrawFormFields = (props) => {
  const { values, errors, onFieldChanged } = props;
  const loading = useSelector((state) => state.data.withdraw_loading);
  const user = useSelector((state) => state.auth.user) || getFromLocalStorage("user");

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid #334155",
    borderRadius: 10,
    padding: "12px 16px",
    color: "#e2e8f0",
    fontSize: 15,
    outline: "none",
    fontFamily: "'Inter', sans-serif",
  };

  const labelStyle = {
    color: "#94a3b8",
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 8,
    display: "block",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  };

  return (
    <>
      {/* Balance */}
      <div style={{
        background: "rgba(251,134,3,0.08)",
        border: "1px solid rgba(251,134,3,0.2)",
        borderRadius: 10,
        padding: "12px 16px",
        marginBottom: 20,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>Available Balance</span>
        <span style={{ color: "#fb8603", fontWeight: 800, fontSize: 16 }}>
          KES {formatNumber(user?.balance || 0)}
        </span>
      </div>

      {/* Phone number */}
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Phone Number</label>
        <input
          style={{ ...inputStyle, color: "#64748b", cursor: "not-allowed" }}
          id="msisdn"
          name="msisdn"
          type="text"
          readOnly
          value={values.msisdn}
          placeholder="Phone Number"
        />
        {errors.msisdn && (
          <div style={{ color: "#f87171", fontSize: 12, marginTop: 4 }}>{errors.msisdn}</div>
        )}
      </div>

      {/* Amount */}
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Amount to Withdraw</label>
        {/* Quick amounts */}
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          {[100, 200, 500, 1000].map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => onFieldChanged({ target: { name: "amount", value: String(amt) } })}
              style={{
                flex: 1,
                padding: "7px 0",
                borderRadius: 8,
                border: `1px solid ${values.amount == amt ? "#fb8603" : "#334155"}`,
                background: values.amount == amt ? "rgba(251,134,3,0.12)" : "transparent",
                color: values.amount == amt ? "#fb8603" : "#94a3b8",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                transition: "all 0.15s",
              }}
            >
              {amt}
            </button>
          ))}
        </div>
        <input
          onChange={onFieldChanged}
          style={inputStyle}
          id="amount"
          name="amount"
          type="number"
          value={values.amount}
          placeholder="Enter amount"
        />
        {errors.amount && (
          <div style={{ color: "#f87171", fontSize: 12, marginTop: 4 }}>{errors.amount}</div>
        )}

        {values.amount > 0 && (
          <div style={{
            background: "rgba(255,255,255,0.03)",
            borderRadius: 8,
            padding: "10px 12px",
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#64748b" }}>
              <span>Withholding Tax (5%)</span>
              <span>- KES {(values.amount * 0.05).toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 700, color: "#fb8603" }}>
              <span>You will receive</span>
              <span>KES {(values.amount * 0.95).toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!values.amount || loading}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: 10,
          border: "none",
          background: !values.amount || loading
            ? "rgba(251,134,3,0.3)"
            : "linear-gradient(135deg, #fb8603, #cc3366)",
          color: "#fff",
          fontWeight: 700,
          fontSize: 15,
          cursor: !values.amount || loading ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          fontFamily: "'Inter', sans-serif",
          marginTop: 8,
          marginBottom: 16,
        }}
      >
        {loading ? (
          <div className="loader" />
        ) : (
          `WITHDRAW KES ${values.amount || 0}`
        )}
      </button>
    </>
  );
};

const MyWithdrawForm = (props) => {
  const { errors, values, setFieldValue } = props;
  const appConfigs = useSelector((state) => state.data.app_config);
  const [settings, setSettings] = useState(getFromLocalStorage("settings"));

  useEffect(() => {
    setSettings(appConfigs || getFromLocalStorage("settings"));
  }, [appConfigs]);

  const withdrawalLimits = settings?.withdrawalLimits;

  const onFieldChanged = (ev) => {
    let field = ev.target.name;
    let value = ev.target.value;
    setFieldValue(field, value);

    if (field === "amount") {
      value = value.replace(/[^\d]/g, "");
      const minWithdrawal = withdrawalLimits?.minimumAmount;
      const maxWithdrawal = withdrawalLimits?.maximumAmount;
      let newValue = value;

      if (Number(value) < Number(minWithdrawal)) {
        notification.open({
          message: "Warning",
          description: `Minimum withdrawal amount is ${minWithdrawal} KES`,
          className: "ant-notification",
          placement: "top",
        });
        newValue = value;
      } else if (Number(value) > Number(maxWithdrawal)) {
        notification.open({
          message: "Warning",
          className: "ant-notification",
          description: `Maximum withdrawal amount is ${maxWithdrawal} KES`,
          placement: "top",
        });
        newValue = maxWithdrawal;
      }
      setFieldValue(field, newValue);
    }
  };

  return (
    <Form>
      {/* M-PESA header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px 20px 8px",
      }}>
        <LazyLoadImage src={mpesa} alt="M-PESA" style={{ height: 40, objectFit: "contain" }} />
      </div>

      <div style={{ padding: "0 20px 24px" }}>
        <WithdrawFormFields
          onFieldChanged={onFieldChanged}
          values={values}
          errors={errors}
        />
        <PaymentInstructions />
      </div>
    </Form>
  );
};
export const WithdrawForm = (props) => {
  const dispatchRedux = useDispatch();
  const app_config = useSelector((state) => state.data.app_config);
  const [settings, setSettings] = useState(getFromLocalStorage("settings"));
  const [currentWithdrawValue, setCurrentWithdrawValue] = useState(0); // New state for current deposit value
  const withdrawalLimits = settings?.withdrawalLimits;
  const userData = useSelector((state) => state.auth.user);
  const [user, setUser] = useState(getFromLocalStorage("user"));
  const successMessage = useSelector((state) => state.data.withdrawal_message);
  const errorMessage = useSelector((state) => state.data.error);

  useEffect(() => {
    if (userData) {
      setUser(userData || getFromLocalStorage("user"));
    }
  }, [userData]);
  useEffect(() => {
    if (app_config) {
      setSettings(app_config || getFromLocalStorage("settings"));
    }
  }, [app_config]);

  const initialValues = {
    amount: 100,
    msisdn: user?.msisdn,
  };

  const handleSubmit = (values) => {
    setTrackingData(values);
    const data = { user: values };

    dispatchRedux(userWithdrawal(data));
  };

  const dispatchWithdrawMessage = useCallback(() => {
    if (successMessage !== null) {
      // Use Ant Design notification to display the success message
      notification.success({
        message: "Success",
        description: successMessage,
        className: "ant-notification",
        placement: "top", // Set placement to top
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    dispatchWithdrawMessage();
    setTimeout(() => {
      dispatchRedux(resetState("withdrawal_message"));
      dispatchRedux(resetState("error"));
    }, 7500);

    return () => {
      dispatchRedux(resetState("withdrawal_message"));
      dispatchRedux(resetState("error"));
    };
  }, [dispatchWithdrawMessage]);

  const validate = (values) => {
    let errors = {};

    if (!values.msisdn || !values.msisdn.match(/(254|0|)?[71]\d{8}/g)) {
      errors.msisdn = "Please enter a valid phone number";
    }
    if (
      !values.amount ||
      values.amount < Number(withdrawalLimits?.minimumAmount)
    ) {
      errors.amount =
        "Please enter an amount above KES " + withdrawalLimits?.minimumAmount;
    } else if (values.amount > Number(withdrawalLimits?.maximumAmount)) {
      errors.amount =
        "Please enter an amount less than or equal to KES " +
        withdrawalLimits?.maximumAmount;
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
      render={(props) => (
        <MyWithdrawForm
          {...props}
          setCurrentWithdrawValue={setCurrentWithdrawValue}
          currentWithdrawValue={currentWithdrawValue}
        />
      )}
    />
  );
};

export default React.memo(Withdraw);
