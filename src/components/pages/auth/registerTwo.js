import React, { useEffect, useState } from "react";
import { Row, Col, notification } from "antd";
import authImg from "../../../assets/img/logo.png";
import "./stepper.css";
import { Link, useNavigate } from "react-router-dom";
import only18 from "../../../assets/img/auth/18only.png";
import gameDay from "../../../assets/svg/game_bg.svg";
import kenyan from "../../../assets/svg/kenya.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import { Dropdown } from "react-bootstrap";
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";
import {
  clearTrackingData,
  getFromLocalStorage,
  setTrackingData,
} from "../../utils/local-storage";

const FormTitle = () => {
  const navigate = useNavigate();

  return (
    <div
      className="col-md-12 col-md-12  pt-lg-4 text-center text-light pb-3 text-center w-100 top-login-mobile"
      style={{ margin: "0px" }}
    >
      <div>
        <div
          className={
            " top-spacing d-flex justify-content-around m-auto px-1 align-items-center"
          }
          onClick={() => navigate(-1)}
        >
          <span
            className="d-flex justify-content-start w-25 "
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon
              icon={faAngleLeft}
              className={"back-navigation-icon"}
            />{" "}
          </span>

          <span className={"w-50 d-flex justify-content-center"}>
            <h4 className="inline-block">SIGNUP | CREATE A NEW ACCOUNT</h4>
          </span>
          <span className="w-25"></span>
        </div>
      </div>
    </div>
  );
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const successMessage = useSelector((state) => state.auth.user_sign_up);
  const appConfig = useSelector((state) => state.data.app_config);
  const errorMessage = useSelector((state) => state.data.error);
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
    if (successMessage?.success?.status === 201) {
      console.log("successMessage", successMessage);
      
      notification.success({
        message: "Registration Successful",
        description:successMessage?.success.message?? "You have successfully registered!",
        placement: "topLeft",
      });
      const timeoutId = setTimeout(() => {
        if (settings?.accountConfiguration?.verificationEnabled !== "0") {
          navigate("/verify");
        } else {
          navigate("/login");
        }
      }, 100);
      return () => clearTimeout(timeoutId);
    } else if (errorMessage) {
    
      const data = {
        event: "sign_up_failed",
        message: "sign up failed",
      };
      gaEventTracker("Sign Up Failed", data);
      // Notify(message);
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
          placement: "topLeft",
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
          style={{ backgroundColor: "var(--CrashKali-header-bg)" }}
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
                            <ToastContainer />
                            <Formik
                              initialValues={initialValues}
                              onSubmit={(values) => {
                                handleSubmit(values);
                                // // if (
                                // //   successMessage &&
                                // //   appConfig?.accountConfiguration
                                // //     ?.verificationEnabled === "1"
                                // // ) {
                                // //   const timeoutId = setTimeout(() => {
                                // //     if (
                                // //       settings?.accountConfiguration
                                // //         ?.verificationEnabled !== "0"
                                // //     ) {
                                // //       navigate("/verify");
                                // //     } else {
                                // //       navigate("/login");
                                // //     }
                                // //   }, 1500);
                                // //   return () => clearTimeout(timeoutId);
                                // // } else if (errorMessage) {
                                // //   notification.error({
                                // //     message: "Registration Failed",
                                // //     description:
                                // //       errorMessage ||
                                // //       "Error attempting to Register",
                                // //     placement: "topLeft",
                                // //   });

                                //   gaEventTracker("Sign Up Failed", {
                                //     msisdn: values.msisdn,
                                //     event: "sign_up_failed",
                                //     message: "sign up failed",
                                //   });
                                // }
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
                                <Form onSubmit={handleSubmit}>
                                  <div className="form-group w-100 d-flex justify-content-center mt-5">
                                    <div className="col-md-12 w-100">
                                      <label>Mobile Number</label>
                                      <div
                                        className="input-group input-color-icon w-100"
                                        style={{ display: "flex" }}
                                      >
                                        <div
                                          className="col-5 input-group-append align-items-center justify-content-start"
                                          style={{ display: "contents" }}
                                        >
                                          <div className="input-group-text border-0 input-color-icon codecCountry">
                                            <Dropdown
                                              onSelect={(selectedOption) =>
                                                handleChange({
                                                  target: {
                                                    name: "countryCode",
                                                    value: selectedOption,
                                                  },
                                                })
                                              }
                                            >
                                              <Dropdown.Toggle
                                                variant="link"
                                                id="countryCode"
                                                style={{
                                                  color: "var(--light)",
                                                }}
                                              >
                                                +{values.countryCode}&nbsp;
                                                <img
                                                  className="image-kenya"
                                                  src={kenyan}
                                                  style={{
                                                    width: "17px",
                                                    height: "11px",
                                                    marginTop: "2px",
                                                  }}
                                                  alt="Kenya"
                                                  title="Kenya"
                                                />
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu>
                                                <Dropdown.Item
                                                  eventKey="254"
                                                  id="254"
                                                >
                                                  +254&nbsp;
                                                  <img
                                                    className="image-kenya"
                                                    src={kenyan}
                                                    style={{
                                                      width: "17px",
                                                      height: "11px",
                                                      marginTop: "2px",
                                                    }}
                                                    alt="Kenya"
                                                    title="Kenya"
                                                  />
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                        <input
                                          type="text"
                                          name="msisdn"
                                          className={`w-50 input-field button-radius text-light deposit-input form-control col input-field-login ${
                                            errors.msisdn && "text-danger"
                                          }`}
                                          placeholder={"712345678"}
                                          onChange={handleChange}
                                          value={values.msisdn}
                                        />
                                      </div>
                                      {errors.msisdn && (
                                        <div className="text-danger">
                                          {errors.msisdn}
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  <div className="form-group w-100 d-flex justify-content-center">
                                    <div className="col-md-12 w-100">
                                      <label>Password</label>
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
                                          placeholder={"Password"}
                                          onChange={handleChange}
                                          value={values.password}
                                        />
                                        <span
                                          className="input-group-text border-0 input-color-icon"
                                          onClick={toggleShowPassword}
                                          style={{ cursor: "pointer" }}
                                        >
                                          <FontAwesomeIcon
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
                                    </div>
                                  </div>

                                  <div className="form-group w-100 d-flex justify-content-center">
                                    <div className="col-md-12 w-100">
                                      <label>Confirm Password</label>
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
                                          placeholder={"Confirm Password"}
                                          onChange={handleChange}
                                          value={values.repeat_password}
                                        />
                                        <span
                                          className="input-group-text border-0 input-color-icon"
                                          onClick={toggleShowConfirmPassword}
                                          style={{ cursor: "pointer" }}
                                        >
                                          <FontAwesomeIcon
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
                                    </div>
                                  </div>

                                  <div className="form-group w-100 d-flex justify-content-center">
                                    <div className="col-md-12 w-100">
                                      <label>Promo Code (optional)</label>
                                      <input
                                        type="text"
                                        name="promo_code"
                                        className="input-field button-radius text-light deposit-input form-control col input-field-login"
                                        placeholder={"Promo Code"}
                                        onChange={handleChange}
                                        value={values.promo_code}
                                      />
                                    </div>
                                  </div>

                                  <div className="form-group w-100 d-flex justify-content-center">
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
                                            I agree to the{" "}
                                            <a
                                              href="/terms-and-conditions"
                                              className="text-warning"
                                            >
                                              Terms & Conditions
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

                                  <div className="form-group w-100 d-flex justify-content-center">
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
