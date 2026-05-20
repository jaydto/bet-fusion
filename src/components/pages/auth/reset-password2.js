import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, resetSubmitForm, setState } from "../../../redux/authSlice";
import Logo from "../../../assets/img/logo.png";
import "../../../assets/css/auth.css";

// ── Step 1: Request OTP ──────────────────────────────────────────────────────
const OtpRequestForm = React.memo(({ errors, values, setFieldValue }) => {
  const dispatchRedux = useDispatch();
  const otpSentFromState = useSelector((s) => s.auth.otp_sent);
  const code = new URL(window.location).searchParams.get("code");
  const otpSent = code ? true : otpSentFromState;

  const set = (e) => setFieldValue(e.target.name, e.target.value);

  if (otpSent) return null;

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
            value={values.mobile}
            onChange={set}
          />
        </div>
        {errors.mobile && <span style={{ color: "#ef4444", fontSize: 12 }}>{errors.mobile}</span>}
      </div>

      <button type="submit" className="auth-submit-btn" disabled={!values.mobile}>
        Send OTP
      </button>

      <button
        type="button"
        onClick={() => dispatchRedux(setState("otp_sent", true))}
        style={{ background: "none", border: "none", color: "#3BAAED", fontSize: 13, cursor: "pointer", width: "100%", marginTop: 12 }}
      >
        Already have an OTP?
      </button>

      <p className="auth-footer-text" style={{ marginTop: 12 }}>
        <Link to="/auth/login" className="auth-link">Back to Login</Link>
      </p>
    </Form>
  );
});

const OtpRequestFormikWrapper = React.memo(() => {
  const dispatchRedux = useDispatch();
  const validate = (values) => {
    const errors = {};
    if (!values.mobile || !values.mobile.match(/(254|0|)?[71]\d{8}/g)) {
      errors.mobile = "Please enter a valid phone number";
    }
    return errors;
  };
  const handleSubmit = (values) => {
    try { dispatchRedux(resetSubmitForm(values)); } catch (e) { console.error(e); }
  };
  return (
    <Formik initialValues={{ mobile: "" }} onSubmit={handleSubmit} validate={validate} validateOnChange={false} validateOnBlur={false}>
      {(props) => <OtpRequestForm {...props} />}
    </Formik>
  );
});

// ── Step 2: Set new password ─────────────────────────────────────────────────
const PasswordResetInnerForm = React.memo(({ errors, values, setFieldValue }) => {
  const dispatchRedux = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const set = (e) => setFieldValue(e.target.name, e.target.value);

  const clearActions = () => {
    dispatchRedux(setState("otp_sent", false));
    dispatchRedux(setState("reset_message", null));
    dispatchRedux(setState("reset_password_message", null));
    dispatchRedux(setState("reset_success", null));
    dispatchRedux(setState("reset_success_password", null));
    dispatchRedux(setState("reset_id", null));
  };

  return (
    <Form>
      <div className="auth-field">
        <label className="auth-field-label">OTP Code</label>
        <div className="auth-input-wrap">
          <input type="text" name="code" className="auth-input" placeholder="Enter OTP" value={values.code} onChange={set} />
        </div>
        {errors.code && <span style={{ color: "#ef4444", fontSize: 12 }}>{errors.code}</span>}
      </div>

      <div style={{ height: 1, background: "#3d4354", margin: "8px 0" }} />

      <div className="auth-field">
        <label className="auth-field-label">New Password</label>
        <div className="auth-input-wrap">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="auth-input"
            placeholder="New password"
            value={values.password}
            onChange={set}
            style={{ paddingRight: 40 }}
          />
          <button type="button" className="auth-input-icon" onClick={() => setShowPassword(!showPassword)}>
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>
        {errors.password && <span style={{ color: "#ef4444", fontSize: 12 }}>{errors.password}</span>}
      </div>

      <div className="auth-field">
        <label className="auth-field-label">Confirm Password</label>
        <div className="auth-input-wrap">
          <input
            type={showPassword ? "text" : "password"}
            name="repeat_password"
            className="auth-input"
            placeholder="Confirm new password"
            value={values.repeat_password}
            onChange={set}
          />
        </div>
        {errors.repeat_password && <span style={{ color: "#ef4444", fontSize: 12 }}>{errors.repeat_password}</span>}
      </div>

      <button type="submit" className="auth-submit-btn">Reset Password</button>

      <button
        type="button"
        onClick={clearActions}
        style={{ background: "none", border: "none", color: "#94a3b8", fontSize: 13, cursor: "pointer", width: "100%", marginTop: 12 }}
      >
        ← Back
      </button>
    </Form>
  );
});

const PasswordResetFormikWrapper = React.memo(() => {
  const dispatchRedux = useDispatch();
  const navigate = useNavigate();
  const mobile = useSelector((s) => s.auth.reset_mobile);
  const resetID = useSelector((s) => s.auth.reset_id);
  const resetSuccessPassword = useSelector((s) => s.auth.reset_success_password);

  useEffect(() => {
    if (resetSuccessPassword) {
      setTimeout(() => navigate("/auth/login"), 3000);
    }
  }, [resetSuccessPassword]);

  const validate = (values) => {
    const errors = {};
    if (!values.code) errors.code = "Please enter your OTP";
    if (values.code.length < 4) errors.code = "OTP must be at least 4 characters";
    if (!values.password) errors.password = "Please enter a new password";
    if (!values.repeat_password) errors.repeat_password = "Please confirm your password";
    if (values.password !== values.repeat_password) errors.repeat_password = "Passwords do not match";
    return errors;
  };

  const handleSubmit = (values) => {
    try {
      dispatchRedux(resetPassword({ ...values, mobile, id: resetID }));
    } catch (e) { console.error(e); }
  };

  return (
    <Formik
      initialValues={{ id: "", code: "", password: "", repeat_password: "" }}
      onSubmit={handleSubmit}
      validate={validate}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {(props) => <PasswordResetInnerForm {...props} />}
    </Formik>
  );
});

// ── Main component ────────────────────────────────────────────────────────────
const ResetPassword2 = React.memo(() => {
  const dispatchRedux = useDispatch();
  const code = new URL(window.location).searchParams.get("code");
  const otpSentFromState = useSelector((s) => s.auth.otp_sent);
  const otpSent = code ? true : otpSentFromState;
  const resetMessage = useSelector((s) => s.auth.reset_message);
  const resetPasswordMessage = useSelector((s) => s.auth.reset_password_message);
  const resetSuccess = useSelector((s) => s.auth.reset_success);
  const resetSuccessPassword = useSelector((s) => s.auth.reset_success_password);

  useEffect(() => {
    dispatchRedux(setState("otp_sent", false));
    dispatchRedux(setState("resetPasswordMessage", null));
    dispatchRedux(setState("resetMessage", null));
  }, []);

  return (
    <div className="auth-page-outer">
      <div className="auth-page-center">
        <div className="auth-card" style={{ maxWidth: 440 }}>
          <div className="auth-card-body">
            <div className="auth-card-header" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <img src={Logo} alt="BetFusion" style={{ width: 100, height: "auto" }} />
              <h2 className="auth-card-title">{otpSent ? "Set New Password" : "Forgot Password?"}</h2>
              <p className="auth-card-desc">
                {otpSent ? "Enter the OTP sent to your phone and choose a new password" : "Enter your mobile number to receive an OTP"}
              </p>
            </div>
            <div className="auth-separator" />

            {(resetPasswordMessage ?? resetMessage) && (
              <div
                style={{
                  padding: "10px 12px",
                  borderRadius: 8,
                  background: resetSuccessPassword ?? resetSuccess ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
                  border: `1px solid ${resetSuccessPassword ?? resetSuccess ? "#22c55e" : "#ef4444"}`,
                  color: resetSuccessPassword ?? resetSuccess ? "#22c55e" : "#ef4444",
                  fontSize: 13,
                  marginBottom: 8,
                }}
              >
                {resetPasswordMessage ?? resetMessage}
              </div>
            )}

            {!otpSent ? <OtpRequestFormikWrapper /> : <PasswordResetFormikWrapper />}
          </div>
        </div>
      </div>
    </div>
  );
});

export default ResetPassword2;
