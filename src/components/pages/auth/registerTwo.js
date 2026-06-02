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
        <div className="bfa-field">
          <label className="bfa-label"><span className="bfa-req">*</span>Phone Number</label>
          <div className="bfa-input-wrap">
            <span className="bfa-prefix">+254</span>
            <input
              type="tel"
              name="msisdn"
              className="bfa-input"
              placeholder="712 345 678"
              onChange={handleChange}
              value={values.msisdn}
            />
          </div>
          {errors.msisdn && <span className="bfa-error">{errors.msisdn}</span>}
        </div>

        <div className="bfa-field">
          <label className="bfa-label"><span className="bfa-req">*</span>Password</label>
          <div className="bfa-input-wrap">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="bfa-input"
              placeholder="Enter password"
              onChange={handleChange}
              value={values.password}
            />
            <button
              type="button"
              className="bfa-eye"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          {errors.password && <span className="bfa-error">{errors.password}</span>}
        </div>

        <div className="bfa-field">
          <label className="bfa-label"><span className="bfa-req">*</span>Confirm Password</label>
          <div className="bfa-input-wrap">
            <input
              type={showConfirm ? "text" : "password"}
              name="repeat_password"
              className="bfa-input"
              placeholder="Enter password"
              onChange={handleChange}
              value={values.repeat_password}
            />
            <button
              type="button"
              className="bfa-eye"
              onClick={() => setShowConfirm(!showConfirm)}
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              <FontAwesomeIcon icon={showConfirm ? faEyeSlash : faEye} />
            </button>
          </div>
          {errors.repeat_password && <span className="bfa-error">{errors.repeat_password}</span>}
        </div>

        <div className="bfa-agree">
          <input
            type="checkbox"
            id="agreementCheckbox"
            name="agreementCheckbox"
            checked={values.agreementCheckbox}
            onChange={handleChange}
          />
          <label htmlFor="agreementCheckbox" className="bfa-agree-text">
            By clicking Register, you confirm to have read in detail, understood and agreed to our{" "}
            <Link to="/terms-and-conditions" className="bfa-link">Terms and Conditions</Link>,{" "}
            <Link to="/privacy-policy" className="bfa-link">Privacy Policy</Link>{" "}
            and also that you are over 18 years of age.
          </label>
        </div>
        {errors.agreementCheckbox && <span className="bfa-error" style={{ marginBottom: 8 }}>{errors.agreementCheckbox}</span>}

        <button type="submit" className="bfa-submit" disabled={!values.agreementCheckbox}>
          Register
        </button>

        <p className="bfa-footer">
          Already have an account?{" "}
          <Link to="/auth/login" className="bfa-link" onClick={() => gaEventTracker("Login")}>
            Sign In
          </Link>
        </p>
      </Form>
    );
  };

  return (
    <div className="bfa-page">
      <ToastContainer />
      <div className="bfa-shell">
        <div className="bfa-topbar">
          <img src={logo} alt="BetFusion" className="bfa-logo" onClick={() => navigate("/")} />
          <div className="bfa-topbar-actions">
            <Link to="/auth/login" className="bfa-btn-login">Login</Link>
            <Link to="/auth/signup" className="bfa-btn-register">Register</Link>
          </div>
        </div>

        <div className="bfa-card">
          <h2 className="bfa-title">Register</h2>
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
  );
};

export default Register;
