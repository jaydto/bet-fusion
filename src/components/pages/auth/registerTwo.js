import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/img/logo.png";
import { Form, Formik } from "formik";
import { ToastContainer } from "react-toastify";
import { notification } from "antd";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../../redux/authSlice";
import { configSettings } from "../../../redux/dataSlice";
import { clearTrackingData, getFromLocalStorage, setTrackingData } from "../../utils/local-storage";
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";
import "../../../assets/css/auth.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const successMessage = useSelector((s) => s.auth.user_sign_up);
  const appConfig = useSelector((s) => s.data.app_config);
  const errorMessage = useSelector((s) => s.auth.error);
  const gaEventTracker = useAnalyticsEventTracker("SignUp");
  const [settings, setSettings] = useState(getFromLocalStorage("settings"));

  useEffect(() => {
    dispatch(configSettings());
  }, [dispatch]);

  useEffect(() => {
    if (appConfig) setSettings(appConfig);
  }, [appConfig]);

  useEffect(() => {
    if (successMessage?.success?.status === 201) {
      notification.success({
        message: "Registration Successful",
        description: successMessage?.success.message ?? "You have successfully registered!",
        className: "ant-notification",
        placement: "top",
      });
      setTimeout(() => {
        if (settings?.accountConfiguration?.verificationEnabled !== "0") {
          navigate("/auth/verify");
        } else {
          navigate("/auth/login");
        }
      }, 100);
    } else if (successMessage?.success?.status === 400 || errorMessage) {
      notification.error({
        message: "Registration Failed",
        description: successMessage?.success?.message ?? errorMessage ?? "Something went wrong!",
        className: "ant-notification",
        placement: "top",
      });
    }
  }, [successMessage, errorMessage]);

  const initialValues = {
    countryCode: "254",
    msisdn: "",
    agreementCheckbox: false,
    password: "",
    repeat_password: "",
    promo_code: "",
  };

  const validate = (values) => {
    const errors = {};
    const formatted = values.msisdn.replace(/^(?:\+254|254|0)/, "");
    const phone = values.countryCode + formatted;
    if (!phone || phone.length > 12 || !phone.match(/(254|0|)?[71]\d{8}/g)) {
      errors.msisdn = "Please enter a valid Kenyan phone number";
    }
    if (values.password.length < 4) {
      errors.password = "Password must be at least 4 characters";
    }
    if (values.password !== values.repeat_password) {
      errors.repeat_password = "Passwords do not match";
    }
    if (!values.agreementCheckbox) {
      errors.agreementCheckbox = "You must agree to the terms and conditions";
    }
    return errors;
  };

  const handleSubmit = (values) => {
    const formatted = values.msisdn.replace(/^(?:\+254|254|0)/, "");
    const msisdn = values.countryCode + formatted;
    const payload = { promo_code: values.promo_code, msisdn, password: values.password };
    setTrackingData(payload);
    dispatch(signupUser(payload))
      .then(() => {
        clearTrackingData();
        gaEventTracker("Sign Up", { msisdn, promo_code: values.promo_code || "no promo code" });
      })
      .catch((error) => {
        notification.error({
          message: "Registration Failed",
          description: error?.message || "Error attempting to Register",
          className: "ant-notification",
          placement: "top",
        });
      });
  };

  const RegisterForm = ({ errors, values, handleChange }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
      <Form>
        <div className="auth-field">
          <label className="auth-field-label">Mobile Number</label>
          <div className="auth-input-wrap">
            <input
              type="text"
              name="msisdn"
              className="auth-input"
              placeholder="07XXXXXXXX"
              onChange={handleChange}
              value={values.msisdn}
            />
          </div>
          {errors.msisdn && <span style={{ color: "#ef4444", fontSize: 12 }}>{errors.msisdn}</span>}
        </div>

        <div className="auth-field">
          <label className="auth-field-label">Password</label>
          <div className="auth-input-wrap">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="auth-input"
              placeholder="Enter your password"
              onChange={handleChange}
              value={values.password}
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
              type={showConfirm ? "text" : "password"}
              name="repeat_password"
              className="auth-input"
              placeholder="Confirm your password"
              onChange={handleChange}
              value={values.repeat_password}
              style={{ paddingRight: 40 }}
            />
            <button type="button" className="auth-input-icon" onClick={() => setShowConfirm(!showConfirm)}>
              <FontAwesomeIcon icon={showConfirm ? faEyeSlash : faEye} />
            </button>
          </div>
          {errors.repeat_password && <span style={{ color: "#ef4444", fontSize: 12 }}>{errors.repeat_password}</span>}
        </div>

        <div className="auth-field">
          <label className="auth-field-label">Referral Code <span style={{ color: "#64748b", fontWeight: 400 }}>(Optional)</span></label>
          <div className="auth-input-wrap">
            <input
              type="text"
              name="promo_code"
              className="auth-input"
              placeholder="Enter referral code"
              onChange={handleChange}
              value={values.promo_code}
            />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 16 }}>
          <input
            type="checkbox"
            id="agreementCheckbox"
            name="agreementCheckbox"
            onChange={handleChange}
            style={{ marginTop: 2, accentColor: "#fb8603", width: 16, height: 16, flexShrink: 0 }}
          />
          <label htmlFor="agreementCheckbox" style={{ fontSize: 12, color: "#94a3b8", cursor: "pointer", lineHeight: 1.5 }}>
            Accept{" "}
            <Link to="/terms-and-conditions" className="auth-link">Terms &amp; Conditions</Link>
          </label>
        </div>
        {errors.agreementCheckbox && <span style={{ color: "#ef4444", fontSize: 12, display: "block", marginBottom: 8 }}>{errors.agreementCheckbox}</span>}

        <button type="submit" className="auth-submit-btn" disabled={!values.agreementCheckbox}>
          Register
        </button>

        <p className="auth-footer-text" style={{ marginTop: 16 }}>
          Already have an account?{" "}
          <Link to="/auth/login" className="auth-link" onClick={() => gaEventTracker("Login")}>
            Log In
          </Link>
        </p>
      </Form>
    );
  };

  return (
    <div className="auth-page-outer">
      <ToastContainer />
      <div className="auth-page-center">
        <div className="auth-card">
          <div className="auth-card-grid">
            {/* Left branding panel */}
            <div className="auth-card-image">
              <div
                style={{
                  background: "linear-gradient(135deg, #020617 0%, #0f172a 60%, #1e293b 100%)",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 32,
                  gap: 16,
                }}
              >
                <img src={logo} alt="BetFusion" style={{ height: "40px", width: "auto" }} />
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 24, fontWeight: 800, margin: "0 0 4px", lineHeight: 1.2 }}>
                    <span style={{ color: "#f8fafc" }}>JOIN </span>
                    <span style={{ color: "#fb8603" }}>TODAY</span>
                  </p>
                  <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>
                    Create your account and start winning
                  </p>
                </div>
              </div>
            </div>

            {/* Right form panel */}
            <div className="auth-card-body">
              <div className="auth-card-header">
                <h2 className="auth-card-title">Create an account</h2>
                <p className="auth-card-desc">Register to start playing on the best online casino</p>
              </div>
              <div className="auth-separator" />
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validate={validate}
                validateOnChange={false}
                validateOnBlur={false}
              >
                {(props) => <RegisterForm {...props} />}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
