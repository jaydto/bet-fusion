import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import makeRequest from "../../utils/fetch-request";
import { setLocalStorage } from "../../utils/local-storage";
import { StoreContext } from "../../../context/store";
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";
import Logo from "../../../assets/img/logo.png";
import "../../../assets/css/auth.css";

const MyVerifyAccountForm = React.memo(({ errors, values, submitForm, setFieldValue }) => {
  const { state, dispatch } = useContext(StoreContext);
  const gaEventTracker = useAnalyticsEventTracker("Resend Verification Code");
  let number = String(state?.signup_msisdn).split("0")[1];
  let msisdn = number ? "254" + number : "";

  const set = (e) => {
    const { name, value } = e.target;
    setFieldValue(name, value);
    dispatch({ type: "SET", key: "isMobileNumberValid", payload: value.trim() !== "" });
  };

  const resendOTP = () => {
    makeRequest({ url: "/v1/code", method: "POST", data: { mobile: values?.mobile } }).then(
      ([status, response]) => {
        dispatch({ type: "SET", key: "verifyMessage", payload: response.success ? response.success.message : response.error.message });
        response.success
          ? dispatch({ type: "SET", key: "verifySuccess", payload: true })
          : dispatch({ type: "SET", key: "verifySuccess", payload: false });
        const data = { event: status === 200 || status === 201 ? "resend_verification" : "resend_verification_failed", msisdn: values?.msisdn };
        gaEventTracker(status === 200 || status === 201 ? "Verify Success" : "Verify Failed", data);
      }
    );
  };

  return (
    <Form>
      <div className="auth-field">
        <label className="auth-field-label">Mobile Number</label>
        <div className="auth-input-wrap">
          <input
            type="text"
            name="mobile"
            className="auth-input"
            placeholder="07XXXXXXXX"
            value={values.mobile || msisdn}
            onChange={set}
          />
        </div>
        {state?.isMobileNumberValid && errors.mobile && (
          <span style={{ color: "#ef4444", fontSize: 12 }}>{errors.mobile}</span>
        )}
      </div>

      <div className="auth-field">
        <label className="auth-field-label">OTP Code</label>
        <div className="auth-input-wrap">
          <input
            type="text"
            name="code"
            className="auth-input"
            placeholder="Enter OTP"
            value={values?.code || ""}
            onChange={set}
          />
        </div>
        {errors.code && <span style={{ color: "#ef4444", fontSize: 12 }}>{errors.code}</span>}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <button
          type="button"
          onClick={resendOTP}
          disabled={!state?.isMobileNumberValid && !msisdn}
          style={{ background: "none", border: "none", color: "#fb8603", fontSize: 12, cursor: "pointer", padding: 0 }}
        >
          Resend OTP
        </button>
      </div>

      <button
        type="submit"
        className="auth-submit-btn"
        disabled={state?.inputDisabled}
        onClick={submitForm}
      >
        Verify Account
      </button>

      <p className="auth-footer-text" style={{ marginTop: 12 }}>
        <Link to="/auth/login" className="auth-link">Back to Login</Link>
      </p>
    </Form>
  );
});

const VerifyAccountForm = React.memo(() => {
  const { state, dispatch } = useContext(StoreContext);
  const gaEventTracker = useAnalyticsEventTracker("Verify Account");
  let number = String(state?.signup_msisdn).split("0")[1];
  let msisdn = number ? "254" + number : "";
  const verifyRef = useRef();

  const validate = (values) => {
    const errors = {};
    if (!values.mobile || !values.mobile.match(/(254|0|)?[71]\d{8}/g)) errors.mobile = "Please enter a valid phone number";
    if (!values.code || values.code.length < 4) errors.code = "Please enter a valid OTP";
    return errors;
  };

  const handleSubmit = (values) => {
    makeRequest({ url: "/v1/verify", method: "POST", data: values }).then(([status, response]) => {
      dispatch({ type: "SET", key: "verifyMessage", payload: response.success ? response.success.message : response.error.message });
      if (response.success) {
        dispatch({ type: "SET", key: "verifySuccess", payload: true });
        setLocalStorage("user", response?.success?.user);
        gaEventTracker("verify_success", { event: "verify_account", msisdn: response?.success?.user?.msisdn });
        setTimeout(() => { window.location.href = "/"; }, 1000);
      } else {
        dispatch({ type: "SET", key: "verifySuccess", payload: false });
        gaEventTracker("verify_failed", { event: "verify_failure", msisdn: values?.msisdn });
      }
    }).catch(() => {});
  };

  useEffect(() => {
    const code = new URL(window.location).searchParams.get("code");
    const phoneFromURL = new URL(window.location).searchParams.get("msisdn");
    if (code && phoneFromURL) {
      dispatch({ type: "SET", key: "inputDisabled", payload: true });
      handleSubmit({ mobile: phoneFromURL, code });
    }
  }, []);

  return (
    <Formik
      innerRef={verifyRef}
      initialValues={{ mobile: msisdn, code: "" }}
      onSubmit={handleSubmit}
      validate={validate}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {(props) => <MyVerifyAccountForm {...props} />}
    </Formik>
  );
});

const VerifyAccount2 = React.memo(() => {
  const { state } = useContext(StoreContext);

  return (
    <div className="auth-page-outer">
      <div className="auth-page-center">
        <div className="auth-card" style={{ maxWidth: 440 }}>
          <div className="auth-card-body">
            <div className="auth-card-header" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <img src={Logo} alt="BetFusion" style={{ width: 100, height: "auto" }} />
              <h2 className="auth-card-title">Verify Your Account</h2>
              <p className="auth-card-desc">Enter the OTP sent to your mobile number</p>
            </div>
            <div className="auth-separator" />

            {state?.verifyMessage && (
              <div
                style={{
                  padding: "10px 12px",
                  borderRadius: 8,
                  background: state?.verifySuccess ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
                  border: `1px solid ${state?.verifySuccess ? "#22c55e" : "#ef4444"}`,
                  color: state?.verifySuccess ? "#22c55e" : "#ef4444",
                  fontSize: 13,
                  marginBottom: 8,
                }}
              >
                {state?.verifyMessage}
              </div>
            )}

            <VerifyAccountForm />
          </div>
        </div>
      </div>
    </div>
  );
});

export default React.memo(VerifyAccount2);
