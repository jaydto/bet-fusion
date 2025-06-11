import React, { useEffect, useState } from "react";
import { Row, Typography, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";

import {
  faAngleLeft,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { Form, Formik } from "formik";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../../redux/authSlice";
import { configSettings } from "../../../redux/dataSlice";
import {
  clearTrackingData,
  getFromLocalStorage,
  setTrackingData,
} from "../../utils/local-storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";
import FormTitle from "../formTitle";
// import Logo from "../../../assets/img/logo.png"

const { Title } = Typography;

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const successMessage = useSelector((state) => state.auth.user_sign_up);
  const appConfig = useSelector((state) => state.data.app_config);
  const errorMessage = useSelector((state) => state.auth.error);
  const gaEventTracker = useAnalyticsEventTracker("SignUp");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [settings, setSettings] = useState(getFromLocalStorage("settings"));

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  useEffect(() => {
    dispatch(configSettings());
  }, [dispatch]);

  useEffect(() => {
    if (appConfig) {
      setSettings(appConfig);
    }
  }, [appConfig]);

  useEffect(() => {
    console.log("errorMessage", errorMessage);
    if (successMessage?.success?.status === 201) {
      console.log("successMessage", successMessage);

      notification.success({
        message: "Registration Successful",
        description:
          successMessage?.success.message ??
          "You have successfully registered!",
        className: "ant-notification",
        placement: "top",
      });
      const timeoutId = setTimeout(() => {
        if (settings?.accountConfiguration?.verificationEnabled !== "0") {
          navigate("/auth/verify");
        } else {
          navigate("/auth/login");
        }
      }, 100);
      return () => clearTimeout(timeoutId);
    } else if (successMessage?.success?.status === 400) {
      const data = {
        event: "sign_up_failed",
        message: "sign up failed",
      };
      gaEventTracker("Sign Up Failed", data);
      notification.error({
        message: "Registration Failed",
        description:
          successMessage?.success?.message ?? "Something went wrong!",
        className: "ant-notification",
        placement: "top",
      });
      navigate("/login");
    } else if (errorMessage) {
      const data = {
        event: "sign_up_failed",
        message: "sign up failed",
      };
      gaEventTracker("Sign Up Failed", data);
      notification.error({
        message: "Registration Failed",
        description: errorMessage ?? "Something went wrong!",
        className: "ant-notification",
        placement: "top",
      });
    }
  }, [successMessage, errorMessage, navigate, settings, gaEventTracker]);

  const initialValues = {
    countryCode: "254",
    msisdn: "",
    agreementCheckbox: false,
    password: "",
    repeat_password: "",
    promo_code: "",
  };

  const handleSubmit = (values) => {
    const formattedMsisdn = values.msisdn.replace(/^(?:\+254|254|0)/, "");
    const msisdn = values.countryCode + formattedMsisdn;
    const payload = {
      promo_code: values.promo_code,
      msisdn: msisdn,
      password: values.password,
    };

    setTrackingData(payload);
    dispatch(signupUser(payload))
      .then(() => {
        if (values.utm_source !== undefined) {
          if (values.utm_source === "eskimi") {
            window.esk("track", "Conversion");
          }
          if (values.utm_source === "google") {
            window.gtag_report_conversion(window.location);
          }
        }
        clearTrackingData();
        gaEventTracker("Sign Up", {
          msisdn,
          promo_code: values.promo_code || "no promo code",
        });
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

  const validate = (values) => {
    const errors = {};
    const formattedMsisdn = values.msisdn.replace(/^(?:\+254|254|0)/, "");
    const phoneNumber = values.countryCode + formattedMsisdn;

    if (
      !phoneNumber ||
      phoneNumber.length > 12 ||
      !phoneNumber.match(/(254|0|)?[71]\d{8}/g)
    ) {
      errors.msisdn = "Please enter a valid Kenyan phone number";
    }
    if (values.password.length < 4) {
      errors.password = "Your password should be greater than 4 characters.";
    }
    if (values.password !== values.repeat_password) {
      errors.repeat_password = "The passwords do not match.";
    }
    if (!values.agreementCheckbox) {
      errors.agreementCheckbox = "You must agree to the terms and conditions.";
    }
    return errors;
  };

  return (
    <>
      <div style={{ height: "100vh" }}>
        <Row
          justify="center"
          className="align-items-stretch h-100"
          // style={{ backgroundColor: "var(--jaza-bets-header-bg)" }}
        >
          <div
            className={
              "col-lg-8 col-sm-12 top-login-background-img-bg-down top-login-background-img-bg-page"
            }
          >
            <div className="w-100 d-flex flex-column justify-content-center h-100 top-login-background-img-bg-page">
              <div className={"width-page-centric register-page"}>
                <Row
                  justify="center"
                  className={"full-width-registration-page"}
                >
                  <div className={"d-flex w-100"}>
                    <div className={"w-100"}>
                      <div className="homepage d-flex flex-column align-items-center justify-content-center login-page user-page">
                        <div className="col-md-12 mt-lg-2 text-white p-lg-2 px-2 pb-2 w-100">
                          <div className="pb-0" data-backdrop="static">
                            <FormTitle />
                            <div className="d-flex justify-content-center position-logo-user-pages">
                              <Title
                                level={2}
                                style={{ color: "var(--light)" }}
                              >
                                Welcome
                              </Title>{" "}
                            </div>
                            <ToastContainer />
                            <Formik
                              initialValues={initialValues}
                              onSubmit={(values) => {
                                handleSubmit(values);
                              }}
                              validate={validate}
                              validateOnChange={false}
                              validateOnBlur={false}
                            >
                              {({
                                values,
                                errors,
                                handleChange,
                                handleSubmit,
                              }) => (
                                <Form
                                  onSubmit={handleSubmit}
                                  style={{ maxWidth: "767px", margin: "auto" }}
                                >
                                  <div className="form-group w-100 d-flex justify-content-center mt-2">
                                    <div className="col-md-12 w-100">
                                      <label
                                        style={{ color: "var(--light" }}
                                        className="px-2"
                                      >
                                        Mobile Number
                                      </label>
                                      <div
                                        className="input-group input-color-icon w-100"
                                        style={{ display: "flex" }}
                                      >
                                        {/* <div
                                          className="col-5 input-group-append align-items-center justify-content-start"
                                          style={{ display: "contents" }}
                                        >
                                          <div className="input-group-text border-0 input-color-icon codecCountry">
                                            <CountryButton
                                              onFieldChanged={handleChange}
                                            />
                                          </div>
                                        </div> */}
                                        <input
                                          type="text"
                                          name="msisdn"
                                          className={`w-50 input-field button-radius text-light deposit-input form-control col input-field-login ${
                                            errors.msisdn && "text-danger"
                                          }`}
                                          placeholder={"e.g 11234567"}
                                          onChange={handleChange}
                                          value={values.msisdn}
                                        />
                                      </div>
                                      {errors.msisdn && (
                                        <div className="text-danger">
                                          {errors.msisdn}
                                        </div>
                                      )}
                                      <label
                                        className="mb-5 px-2 pb-3"
                                        style={{ color: "#FFFFFFB2" }}
                                      >
                                        Enter your phone number
                                      </label>
                                    </div>
                                  </div>

                                  <div className="form-group w-100 d-flex justify-content-center mb-4">
                                    <div className="col-md-12 w-100">
                                      <label className="px-2">Password</label>
                                      <div
                                        className="input-group input-color-icon w-100"
                                        style={{ display: "flex" }}
                                      >
                                        <input
                                          type={
                                            showPassword ? "text" : "password"
                                          }
                                          name="password"
                                          className={`w-75 input-field button-radius text-light deposit-input form-control col input-field-login ${
                                            errors.password && "text-danger"
                                          }`}
                                          placeholder={""}
                                          onChange={handleChange}
                                          value={values.password}
                                        />
                                        <span
                                          className="input-group-text border-0 input-color-icon"
                                          onClick={toggleShowPassword}
                                          style={{ cursor: "pointer" }}
                                        >
                                          <FontAwesomeIcon
                                            style={{
                                              color: "var(--dark)",
                                              fontSize: "20px",
                                              padding: "0px 5px 0px 5px",
                                            }}
                                            icon={
                                              showPassword ? faEyeSlash : faEye
                                            }
                                          />
                                        </span>
                                      </div>
                                      {errors.password && (
                                        <div className="text-danger">
                                          {errors.password}
                                        </div>
                                      )}
                                      <label
                                        className="mb-4 px-2 pb-2"
                                        style={{ color: "#FFFFFFB2" }}
                                      >
                                        Enter your password
                                      </label>
                                    </div>
                                  </div>

                                  <div className="form-group w-100 d-flex justify-content-center mb-4">
                                    <div className="col-md-12 w-100">
                                      <label className="px-2">
                                        Confirm Password
                                      </label>
                                      <div
                                        className="input-group input-color-icon w-100"
                                        style={{ display: "flex" }}
                                      >
                                        <input
                                          type={
                                            showConfirmPassword
                                              ? "text"
                                              : "password"
                                          }
                                          name="repeat_password"
                                          className={` w-75 input-field button-radius text-light deposit-input form-control col input-field-login ${
                                            errors.repeat_password &&
                                            "text-danger"
                                          }`}
                                          placeholder={""}
                                          onChange={handleChange}
                                          value={values.repeat_password}
                                        />
                                        <span
                                          className="input-group-text border-0 input-color-icon"
                                          onClick={toggleShowConfirmPassword}
                                          style={{ cursor: "pointer" }}
                                        >
                                          <FontAwesomeIcon
                                            style={{
                                              color: "var(--light)",
                                              fontSize: "20px",
                                              padding: "0px 5px 0px 5px",
                                            }}
                                            icon={
                                              showConfirmPassword
                                                ? faEyeSlash
                                                : faEye
                                            }
                                          />
                                        </span>
                                      </div>
                                      {errors.repeat_password && (
                                        <div className="text-danger">
                                          {errors.repeat_password}
                                        </div>
                                      )}
                                      <label
                                        className="mb-4 px-2 pb-3"
                                        style={{ color: "#FFFFFFB2" }}
                                      >
                                        Confirm your password
                                      </label>
                                    </div>
                                  </div>

                                  <div className="form-group w-100 d-flex justify-content-center">
                                    <div className="col-md-12 w-100">
                                      <label className="px-2">
                                        Referral Code{" "}
                                      </label>
                                      <input
                                        type="text"
                                        name="promo_code"
                                        className="input-field button-radius text-light deposit-input form-control col input-field-login"
                                        placeholder={""}
                                        onChange={handleChange}
                                        value={values.promo_code}
                                      />
                                      <label
                                        className="mb-4 px-2 pb-3"
                                        style={{ color: "#FFFFFFB2" }}
                                      >
                                        Optional
                                      </label>
                                    </div>
                                  </div>

                                  <div className="form-group w-100 d-flex justify-content-center mb-3">
                                    <div className="col-md-12 w-100">
                                      <div className="checkbox p-2 d-flex align-items-center justify-content-center">
                                        <label className="checkbox-container">
                                          <input
                                            type="checkbox"
                                            id="agreementCheckbox"
                                            name="agreementCheckbox"
                                            onChange={handleChange}
                                            className={`form-check-input ${
                                              errors.agreementCheckbox &&
                                              "text-danger"
                                            }`}
                                          />{" "}
                                          &nbsp;
                                          <span className="custom-checkbox"></span>
                                          <span className="pl-2">
                                            <a
                                              href="/terms-and-conditions"
                                              style={{ color: "#FFFFFFB2" }}
                                            >
                                              By clicking Register you confirm
                                              to have read in detail, understood
                                              and agreed to the Terms and
                                              Conditions , the Privacy policy
                                              and also that you are over 18
                                              years of age.
                                            </a>
                                          </span>
                                        </label>
                                      </div>
                                      {errors.agreementCheckbox && (
                                        <div className="text-danger">
                                          {errors.agreementCheckbox}
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  <div className="form-group w-100 d-flex justify-content-center mb-3">
                                    <div className="col-md-12 w-100">
                                      <button
                                        type="submit"
                                        className="w-100 btn btn-lg btn-primary mt-5 col-md-12 deposit-withdraw-button button-page"
                                        disabled={!values.agreementCheckbox}
                                      >
                                        Register
                                      </button>
                                    </div>
                                  </div>

                                  <div className="col-12 d-flex justify-content-center">
                                    <Link
                                      to={"/auth/login"}
                                      title="Login"
                                      onClick={() => gaEventTracker("Login")}
                                    >
                                      <span
                                        className={`faded-color font-input } register-label my-3`}
                                        style={{
                                          textTransform: "uppercase",
                                          color: "#FFAA00",
                                        }}
                                      >
                                        Log In here
                                      </span>
                                    </Link>
                                  </div>
                                </Form>
                              )}
                            </Formik>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Row>
              </div>
            </div>
          </div>
        </Row>
      </div>
    </>
  );
};

export default Register;


