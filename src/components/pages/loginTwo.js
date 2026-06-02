import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import { Form, Formik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetState } from "../../redux/authSlice";
import { StoreContext } from "../../context/store";
import { getFromLocalStorage, setLocalStorage } from "../utils/local-storage";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import "../../assets/css/auth.css";

const LoginTwo = React.memo(() => {
  const navigate = useNavigate();
  const dispatchRedux = useDispatch();
  const { state, dispatch } = useContext(StoreContext);
  const successMessage = useSelector((s) => s.auth.user);
  const errorMessage = useSelector((s) => s.auth.error);
  const loading = useSelector((s) => s.auth.loading);
  const [user, setUser] = useState(getFromLocalStorage("user"));
  const gaEventTracker = useAnalyticsEventTracker("Login");

  useEffect(() => {
    dispatchRedux(resetState("user_sign_up"));
    dispatch({ type: "SET", key: "steps", payload: 0 });
  }, []);

  useEffect(() => {
    if (successMessage?.status === 200) {
      notification.success({
        message: "Success",
        description: successMessage?.message,
        className: "ant-notification",
        placement: "top",
      });
      setLocalStorage("user", successMessage.user);
      setUser(successMessage.user);
      const activeLink = getFromLocalStorage("ActiveLink");
      const dest =
        activeLink && activeLink !== "/auth/signup"
          ? activeLink
          : state?.page_view && state.page_view !== "/auth/signup"
          ? state.page_view
          : "/";
      localStorage.removeItem("ActiveLink");
      setTimeout(() => navigate(dest), 300);
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage) {
      notification.error({
        message: "Login Error",
        description: errorMessage,
        className: "ant-notification",
        placement: "top",
      });
    }
  }, [errorMessage]);

  // Redirect already-logged-in users on mount
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const initialValues = { msisdn: "", password: "", countryCode: "254", remember: true };

  const validate = (values) => {
    const errors = {};
    const formatted = values.msisdn.replace(/^(?:\+254|254|0)/, "");
    const phone = values.countryCode + formatted;
    if (!phone || phone.length > 12 || !phone.match(/(254|0|)?[71]\d{8}/g)) {
      errors.msisdn = "Please enter a valid Kenyan phone number";
    }
    if (!values.password || values.password.length < 4) {
      errors.password = "Invalid password";
    }
    return errors;
  };

  const handleSubmit = (values) => {
    const formatted = values.msisdn.replace(/^(?:\+254|254|0)/, "");
    dispatchRedux(loginUser({ msisdn: values.countryCode + formatted, password: values.password }));
    gaEventTracker("Login");
  };

  const LoginForm = ({ errors, values, setFieldValue }) => {
    const [showPassword, setShowPassword] = useState(false);
    const set = (e) => setFieldValue(e.target.name, e.target.value);

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
              onChange={set}
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
              autoComplete="current-password"
              onChange={set}
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

        <div className="bfa-row-between">
          <label className="bfa-check">
            <input
              type="checkbox"
              name="remember"
              checked={values.remember}
              onChange={(e) => setFieldValue("remember", e.target.checked)}
            />
            Remember for 30 days
          </label>
          <Link
            to="/auth/reset-password"
            className="bfa-link"
            onClick={() => gaEventTracker("Reset Password")}
          >
            Forgot password
          </Link>
        </div>

        <button type="submit" className="bfa-submit" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </button>

        <p className="bfa-footer">
          Don't have an account?{" "}
          <Link to="/auth/signup" className="bfa-link" onClick={() => gaEventTracker("Register")}>
            Register
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
          <h2 className="bfa-title">Login</h2>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validate={validate}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {(props) => <LoginForm {...props} />}
          </Formik>
        </div>
      </div>
    </div>
  );
});

export default LoginTwo;
