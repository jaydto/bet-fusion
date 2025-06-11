import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { Form, Formik } from "formik";

import {
  resetPassword,
  resetSubmitForm,
  setState,
} from "../../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import FormTitle from "../formTitle";

const { Title } = Typography;

const ResetPassword2 = React.memo((props) => {
  const resetSuccess = useSelector((state) => state.auth.reset_success);
  const resetSuccessPassword = useSelector(
    (state) => state.auth.reset_success_password
  );
  const resetMessage = useSelector((state) => state.auth.reset_message);
  const resetPasswordMessage = useSelector(
    (state) => state.auth.reset_password_message
  );
  const code = new URL(window.location).searchParams.get("code");
  const otpSentFromState = useSelector((state) => state.auth.otp_sent);
  const otpSent = code ? true : otpSentFromState;

  const expand = "md";
  const navigate = useNavigate();

  const dispatchRedux = useDispatch();

  useEffect(() => {
    // Set the initial state to false on first render
    dispatchRedux(setState("otp_sent", false));
    dispatchRedux(setState("resetPasswordMessage", null));
    dispatchRedux(setState("resetMessage", null));
  }, []);

  const Alert = (props) => {
    let c = resetSuccessPassword ?? resetSuccess ? "success" : "danger";
    return (
      <div role="alert" className={`fade alert alert-${c} show`}>
        {resetPasswordMessage ?? resetMessage}
      </div>
    );
  };

  return (
    <div style={{ height: "100vh" }}>
      <Row justify="center" className="align-items-stretch h-100">
        <div
          className={
            "col-lg-8 col-sm-12 top-login-background-img-bg-down top-login-background-img-bg-page"
          }
        >
          <div className="w-100 d-flex flex-column justify-content-center h-100 top-login-background-img-bg-page">
            <div
              className={`width-page-centric reset-pass ${
                otpSent && "pass-reset-page"
              }`}
            >
              <FormTitle />

              <div className="d-flex justify-content-center position-logo-user-pages">
                <Title level={2} style={{ color: "var(--light)" }}>
                  Welcome
                </Title>{" "}
              </div>

              <Row justify="center">
                <div className={"d-flex w-100"}>
                  {/**/}
                  <div className={"w-100"}>
                    <div className={"d-flex flex-row justify-content-between"}>
                      <div className=" w-100">
                        <div
                          className="homepage d-flex flex-column align-items-center justify-content-center login-page"
                          style={{ margin: "auto", maxWidth: "767px" }}
                        >
                          <div className="col-md-12 mt-2 text-white px-2 w-100">
                            {(resetPasswordMessage ?? resetMessage) && (
                              <Alert />
                            )}
                            <div
                              className="modal-body pb-0 "
                              data-backdrop="static"
                            >
                              <OptForm />
                              <PasswordResetForm />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <p>Don't have an account yet? <a href="/auth/register-2">Sign Up</a></p> */}
                  <div className="mt-4">{/*<LoginForm {...props}/>*/}</div>
                </div>
              </Row>
            </div>
          </div>
        </div>
      </Row>
    </div>
  );
});
const MyOtpForm = React.memo((props) => {
  const { errors, values, submitForm, setFieldValue } = props;
  const code = new URL(window.location).searchParams.get("code");
  const otpSentFromState = useSelector((state) => state.auth.otp_sent);
  const otpSent = code ? true : otpSentFromState;

  const dispatchRedux = useDispatch();

  const onFieldChanged = (ev) => {
    let field = ev.target.name;
    let value = ev.target.value;
    setFieldValue(field, value);
  };

  const handleAlreadyHaveOtp = () => {
    dispatchRedux(setState("otp_sent", true));
  };

  return (
    <Form className={`${otpSent ? "d-none" : ""}`}>
      <div className="pt-0">
        <div className="w-100">
          <div className="form-group row d-flex justify-content-center mt-3">
            <div className="col-md-12">
              <label>Mobile Number</label>
              <div className="row">
                <div className="col-md-12 mb-3">
                  <input
                    value={values.mobile}
                    className=" deposit-input form-control col-md-12 input-field input-bg-user"
                    id="mobile"
                    name="mobile"
                    type="text"
                    placeholder="Phone number"
                    onChange={(ev) => onFieldChanged(ev)}
                  />
                  {errors.mobile && (
                    <div className="text-danger"> {errors.mobile} </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="form-group row d-flex justify-content-left mb-4">
            <div className="col">
              <button
                disabled={otpSent || !values.mobile}
                type="submit"
                className=" btn btn-lg w-100 button-radius input-field btn-font  login-button btn button-page reset-text"
                style={{
                  whiteSpace: "nowrap",
                  fontSize: "12px",
                  marginTop: "20px",
                }}
              >
                Send OTP
              </button>
            </div>
          </div>
          <div className="form-group row d-flex justify-content-left mb-4">
            <div className="col">
              <button
                type="button"
                className="btn btn-lg w-100 button-radius input-field"
                style={{
                  color: "white",
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                }}
                onClick={handleAlreadyHaveOtp}
              >
                Already have an OTP ?
              </button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
});

const MyPasswordResetForm = React.memo((props) => {
  const code = new URL(window.location).searchParams.get("code");
  const otpSentFromState = useSelector((state) => state.auth.otp_sent);
  const otpSent = code ? true : otpSentFromState;

  const dispatchRedux = useDispatch();
  const { errors, values, submitForm, setFieldValue } = props;
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const clearActions = () => {
    dispatchRedux(setState("otp_sent", false));
    dispatchRedux(setState("reset_message", null));
    dispatchRedux(setState("reset_password_message", null));
    dispatchRedux(setState("reset_success", null));
    dispatchRedux(setState("reset_success_password", null));
    dispatchRedux(setState("reset_id", null));
  };

  const verifyAccount = () => {
    let code = new URL(window.location).searchParams.get("code");
    let msisdn = new URL(window.location).searchParams.get("msisdn");

    if (code) {
      setFieldValue("code", code);
      dispatchRedux(setState("otp_sent", true));
    }
    if (msisdn) {
      setFieldValue("mobile", msisdn);
      dispatchRedux(setState("reset_mobile", msisdn));
    }
  };

  useEffect(() => {
    verifyAccount();
  }, []);

  const onFieldChanged = (ev) => {
    let field = ev.target.name;
    let value = ev.target.value;
    setFieldValue(field, value);
  };
  return (
    <Form className={`${otpSent ? "d-block" : "d-none"}`}>
      <div className="pt-0">
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-12">
              <div className="form-group row d-flex justify-content-center mt-1">
                <label className={"text-center"}>Enter OTP</label>
                <input
                  value={values.code}
                  className=" deposit-input form-control col-md-12 input-field"
                  id="otp"
                  name="code"
                  type="text"
                  placeholder="OTP"
                  onChange={(ev) => onFieldChanged(ev)}
                />
                {errors.code && (
                  <div className="text-danger">{errors.code}</div>
                )}
              </div>
              <hr />
              <div>
                <h2 className={"text-center"}>Enter New Passwords</h2>
              </div>
            </div>
            <div className="form-group w-100 d-flex justify-content-center mt-5">
              <div className="col-md-12 w-100">
                <label>Password</label>
                <div
                  className="input-group input-color-icon w-100"
                  style={{ display: "flex", background: "white" }}
                >
                  <input
                    value={values.password}
                    className=" w-75  deposit-input form-control col-md-12 input-field"
                    id="password_reset"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={"on"}
                    placeholder="Password"
                    onChange={(ev) => onFieldChanged(ev)}
                  />
                  <div className=" col-2 input-group-append">
                    <div className="input-group-text  border-0 input-color-icon">
                      <button
                        style={{ height: "parent" }}
                        type="button"
                        className="btn btn-link text-decoration-none input-color-icon"
                        onClick={toggleShowPassword}
                      >
                        {showPassword ? (
                          <FontAwesomeIcon
                            icon={faEyeSlash}
                            style={{ color: "var(--light)", fontSize: "20px" }}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faEye}
                            style={{ color: "var(--light)", fontSize: "20px" }}
                          />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                {errors.password && (
                  <div className="text-danger">{errors.password}</div>
                )}
              </div>
            </div>
            <div className="form-group w-100 d-flex justify-content-center mt-5">
              <div className="col-md-12 w-100">
                <label>Confirm Password</label>
                <div
                  className="input-group input-color-icon w-100"
                  style={{ display: "flex" }}
                >
                  <input
                    value={values.repeat_password}
                    className="w-75  deposit-input form-control col-md-12 input-field"
                    id="confirm_password"
                    name="repeat_password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(ev) => onFieldChanged(ev)}
                  />
                  <div className=" col-2 input-group-append">
                    <div className="input-group-text  border-0 input-color-icon">
                      <button
                        style={{ height: "parent" }}
                        type="button"
                        className="btn btn-link text-decoration-none input-color-icon"
                        onClick={toggleShowPassword}
                      >
                        {showPassword ? (
                          <FontAwesomeIcon
                            icon={faEyeSlash}
                            style={{ color: "var(--dark)", fontSize: "20px" }}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faEye}
                            style={{ color: "var(--dark)", fontSize: "20px" }}
                          />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                {errors.repeat_password && (
                  <div className="text-danger">{errors.repeat_password}</div>
                )}
              </div>
            </div>
          </div>

          <div className="form-group w-100 d-flex justify-content-left mb-4">
            <div className="col">
              <button
                type="submit"
                className="w-100 btn btn-lg btn-primary mt-5 col-md-12 deposit-withdraw-button button-page"
              >
                Reset Password
              </button>
            </div>
          </div>

          <div className="mt-3 d-flex justify-content-between">
            <button
              className="button btn-prev"
              type="button"
              onClick={clearActions}
            >
              <FontAwesomeIcon icon={faAngleLeft} />
              &nbsp; Previous
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
});

const PasswordResetForm = React.memo((props) => {
  const mobile = useSelector((state) => state.auth.reset_mobile);

  const resetID = useSelector((state) => state.auth.reset_id);
  const dispatchRedux = useDispatch();
  const navigate = useNavigate();
  const resetSuccessPassword = useSelector(
    (state) => state.auth.reset_success_password
  );
  const initialResetFormValues = {
    id: "",
    code: "",
    password: "",
    repeat_password: "",
  };

  useEffect(() => {
    if (resetSuccessPassword) {
      setTimeout(() => {
        navigate("/auth/login");
      }, 3000);
    }
  }, [resetSuccessPassword]);

  const handleSubmitPasswordReset = (values) => {
    console.log("Before modification:", values);
    console.log("Current mobile:", mobile);
    console.log("Current resetID:", resetID);

    values.mobile = mobile;
    values.id = resetID;

    console.log("After modification:", values);

    try {
      dispatchRedux(resetPassword(values));
    } catch (error) {
      console.error("Password reset failed:", error.message);
    }
  };

  const validatePasswordReset = (password_reset_values) => {
    let password_reset_errors = {};

    if (!password_reset_values.code) {
      password_reset_errors.code = "Please enter your One Time Pin (OTP)";
    }

    if (password_reset_values.code.length < 4) {
      password_reset_errors.code = "Your OTP should be greater than 4 numbers.";
    }

    if (!password_reset_values.password) {
      password_reset_errors.password = "Please enter your new password";
    }

    if (!password_reset_values.repeat_password) {
      password_reset_errors.repeat_password =
        "Please enter your password confirmation";
    }

    if (
      password_reset_values.password !== password_reset_values.repeat_password
    ) {
      password_reset_errors.repeat_password =
        "The passwords do not match. Please enter the password you entered above.";
    }

    return password_reset_errors;
  };
  return (
    <Formik
      initialValues={initialResetFormValues}
      onSubmit={handleSubmitPasswordReset}
      validateOnChange={false}
      validateOnBlur={false}
      validate={validatePasswordReset}
    >
      {(props) => <MyPasswordResetForm {...props} />}
    </Formik>
  );
});

const OptForm = React.memo((props) => {
  const dispatchRedux = useDispatch();
  const initialValues = {
    mobile: "",
  };
  const validate = (values) => {
    let errors = {};

    if (!values.mobile || !values.mobile.match(/(254|0|)?[71]\d{8}/g)) {
      errors.mobile = "Please enter a valid phone number";
    }

    return errors;
  };

  const handleSubmit = (values) => {
    try {
      dispatchRedux(resetSubmitForm(values));
    } catch (error) {
      console.error("Form submission failed:", error.message);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
      validate={validate}
    >
      {(props) => <MyOtpForm {...props} />}
    </Formik>
  );
});
export default ResetPassword2;
