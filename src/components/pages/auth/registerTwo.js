import React, { useCallback, useContext, useEffect, useState } from "react";
import { Row, Col } from "antd";
import authImg from "../../../assets/img/Logo.webp";
import "./stepper.css";
import { Link, useNavigate } from "react-router-dom";
import {
  clearTrackingData,
  getFromLocalStorage,
  setTrackingData,
} from "../../utils/local-storage";
import only18 from "../../../assets/img/auth/18only.png";
import backgroundURL from "../../../assets/img/auth/img-17.webp";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeLowVision, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Form, Formik } from "formik";
import { StoreContext } from "../../../context/store";
import SliderPromos from "./SliderPromos";
import { ToastContainer } from "react-toastify";
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../../redux/authSlice";
import { Notify } from "../../header/top-login";
import { configSettings } from "../../../redux/dataSlice";
import Header2 from "../../header/Header2";

const backgroundStyle = {
  backgroundImage: `url(${backgroundURL})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const RegisterTwo = () => {
  const successMessage = useSelector((state) => state.auth.user_sign_up);
  const appConfig = useSelector((state) => state.data.app_config);
  // const {setUser} = props;
  const expand = "md";
  const dispatchRedux = useDispatch();

  const AppConfig = useCallback(async () => {
    dispatchRedux(configSettings());
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    AppConfig();
    return abortController.abort();
  }, []);

  useEffect(() => {
    if (
      successMessage &&
      appConfig?.accountConfiguration?.verificationEnabled === "1"
    ) {
      const timeoutId = setTimeout(() => navigateToFormStep(3), 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [successMessage, appConfig]);

  return (
    <>
      <div style={{ height: "100vh", background: "#16202C" }}>
        <Row justify="center" className="align-items-stretch h-100">
          <Col xs={0} sm={0} md={0} lg={8}>
            <div
              className="d-flex flex-column justify-content-between h-100 px-4"
              style={backgroundStyle}
            >
              <div className="text-right">
                {/*<LazyLoadImage src="/img/logo-sm.jpg" style={{height:"35px"}}alt="logo"/>*/}
              </div>
              <Row justify="center">
                <Col xs={0} sm={0} md={0} lg={20}>
                  <Link to={"/"}>
                    <LazyLoadImage
                      className="img-fluid mb-5"
                      src={authImg}
                      alt=""
                    />
                  </Link>

                  <h1
                    className="text-white text-center"
                    style={{ fontSize: "30px" }}
                  >
                    Welcome to betNare
                  </h1>
                </Col>
              </Row>
              <div className="d-flex justify-content-end pb-4">
                <div
                  className={"d-flex justify-content-center align-items-center"}
                >
                  <div className="text-white mx-2 bold d-flex justify-content-center align-items-center">
                    <LazyLoadImage
                      src={only18}
                      alt={"18 only"}
                      style={{
                        width: "30px",
                        background: "aliceblue",
                        borderRadius: "16px",
                      }}
                    />
                  </div>
                  <span className="mx-2 text-white"> | </span>
                  <a className="text-white" href="/terms-and-conditions">
                    Terms & Conditions
                  </a>
                  <span className="mx-2 text-white"> | </span>
                  <a className="text-white" href="/privacy-policy">
                    Privacy & Policy
                  </a>
                </div>
              </div>
            </div>
          </Col>
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
                    {/**/}
                    <div className={"w-100"}>
                      {/*{user?setTimeout(navigate("/"),500):""}*/}
                      <div
                        className={"d-flex flex-row justify-content-between"}
                      >
                        <div className=" w-100">
                          <div className="homepage d-flex flex-column align-items-center justify-content-center login-page">
                            <div className="col-md-12 mt-2 text-white p-2 w-100">
                              <div className="pb-0" data-backdrop="static">
                                <ToastContainer />
                                <Steppers />
                              </div>
                            </div>
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

const SignupForm = () => {
  const { dispatch } = useContext(StoreContext);
  const initialValues = {
    msisdn: "",
    agreementCheckbox: false,
  };

  const handleSubmit = (values) => {
    dispatch({ type: "SET", key: "signup_msisdn", payload: values?.msisdn });
    // Call the function to navigate to the next step (step 2 in this case)
    dispatch({ type: "SET", key: "steps", payload: 2 });
    navigateToFormStep(2); // Step 6
  };

  const validate = (values) => {
    let errors = {};

    if (!values.msisdn || !values.msisdn.match(/(254|0|)?[71]\d{8}/g)) {
      errors.msisdn = "Please enter a valid phone number";
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
      render={(props) => <MySignupForm {...props} />}
    />
  );
};

const FormTitle = () => {
  return (
    <div className="col-md-12  pt-1 text-center-stepper text-light">
      <h4 className="inline-block">SIGNUP | CREATE A NEW ACCOUNT</h4>
    </div>
  );
};
const MySignupForm = (props) => {
  const { state, dispatch } = useContext(StoreContext);
  const appConfig = useSelector((state) => state.data.app_config);
  const { errors, values, setFieldValue } = props;
  const onFieldChanged = (ev) => {
    let field = ev.target.name;
    let value = ev.target.value;
    setFieldValue(field, value);
  };

  const onCheckboxChanged = (ev) => {
    const { name, checked } = ev.target;

    setFieldValue(name, checked);
  };

  const [settings, setSettings] = useState(getFromLocalStorage("settings"));

  useEffect(() => {
    if (appConfig) {
      setSettings(appConfig);
    }
  }, [appConfig]);

  const navigate = useNavigate();
  return (
    <Form>
      <div className="pt-0">
        <div className="w-100">
          <div className="form-group  w-100 d-flex justify-content-center mt-5">
            <div className="col-md-12 w-100">
              <label>Mobile Number</label>
              <input
                value={values.msisdn}
                className="text-light deposit-input form-control col-md-12 input-field input-bg-user"
                id="msisdn"
                name="msisdn"
                type="text"
                placeholder="+254712345678"
                onChange={(ev) => onFieldChanged(ev)}
              />

              {errors.msisdn && (
                <div className="text-danger"> {errors.msisdn} </div>
              )}
            </div>
          </div>
          <br />
          <div className="form-group w-100 d-flex justify-content-left mb-4">
            <div className="col">
              <button
                type={"submit"}
                disabled={values?.agreementCheckbox == false ? true : false}
                className=" btn btn-lg w-100 button-radius input-field btn-font cg login-button2 btn "
                style={{ marginTop: "28px" }}
              >
                <strong style={{ fontWeight: "800" }}>NEXT</strong>
              </button>
              {settings?.accountConfiguration?.verificationEnabled !== "0" && (
                <div
                  className={`d-flex justify-content-center w-100 mt-3 cursor-pointer`}
                  title="Verify"
                  onClick={() => {
                    navigate("/verify");
                    dispatch({ type: "SET", key: "steps", payload: 3 });
                  }}
                >
                  <span
                    className={`text-warning font-input register-label font-verify-redirect`}
                  >
                    Already have a verification code ?{" "}
                  </span>
                </div>
              )}
              <div className="d-flex align-items-start px-2 mt-2">
                <input
                  type="checkbox"
                  //   value={values.agreementCheckbox}
                  id="agreementCheckbox"
                  checked={values.agreementCheckbox}
                  name="agreementCheckbox" // Add the name attribute for Formik
                  onChange={onCheckboxChanged}
                  className="px-2 d-flex align-items-end mt-2"
                />
                <p className="mb-0">
                  By clicking Register you confirm to have read in detail,
                  understood and agreed to the{" "}
                  <Link to="/terms-and-conditions">Terms and Conditions</Link>,
                  the, <Link to="/privacy-policy">Privacy policy</Link>
                  {" and also that you are over 18 years of age."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

const PasswordForm = (props) => {
  const { dispatch } = useContext(StoreContext);
  const initialResetFormValues = {
    link_code: "",
    password: "",
    repeat_password: "",
  };
  const handleSavePassword = (values) => {
    // Call the function to navigate to the next step (step 2 in this case)
    dispatch({ type: "SET", key: "steps", payload: 3 });
    dispatch({
      type: "SET",
      key: "signup_password",
      payload: values?.password,
    });
    navigateToFormStep(3); // Step 6
  };

  const validatePassword = (password_values) => {
    let password_errors = {};

    if (password_values.password.length < 4) {
      password_errors.password =
        "Your password should be greater than 4 numbers.";
    }

    if (!password_values.password) {
      password_errors.password = "Please enter your new password";
    }

    if (!password_values.repeat_password) {
      password_errors.repeat_password =
        "Please enter your password confirmation";
    }

    if (password_values.password !== password_values.repeat_password) {
      password_errors.repeat_password =
        "The passwords do not match. Please enter the password you entered above.";
    }

    return password_errors;
  };
  return (
    <Formik
      initialValues={initialResetFormValues}
      onSubmit={handleSavePassword}
      validateOnChange={false}
      validateOnBlur={false}
      validate={validatePassword}
    >
      {(props) => <MyPasswordForm {...props} />}
    </Formik>
  );
};

const MyPasswordForm = (props) => {
  const { errors, values, setFieldValue } = props;
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }; 

  const [showPassword2, setShowPassword2] = useState(false);
  const toggleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };
  const [showInput, setShowInput] = useState(false);

  const show_input = () => {
    setShowInput(!showInput);
  };

  const onFieldChanged = (ev) => {
    let field = ev.target.name;
    let value = ev.target.value;
    setFieldValue(field, value);
  };
  return (
    <Form className={`d-block`}>
      <div className="pt-0">
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-12 px-2">
              <h2 className={"text-center mt-3"}>Enter Passwords</h2>
            </div>
          </div>
          <div className="form-group w-100 d-flex justify-content-center mt-2">
            <div className="col-md-12 w-100">
              <label>Password</label>
              <div
                className="input-group input-color-icon w-100"
                style={{ display: "flex", background: "white" }}
              >
                <input
                  value={values.password}
                  className=" w-75 text-light deposit-input form-control col-md-12 input-field"
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
                          icon={faEye}
                          style={{ color: "var(--light)", fontSize: "20px" }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faEyeSlash}
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
                  className="w-75 text-light deposit-input form-control col-md-12 input-field"
                  id="confirm_password"
                  name="repeat_password"
                  autoComplete={"on"}
                  type={showPassword2 ? "text" : "password"}
                  placeholder="Password"
                  onChange={(ev) => onFieldChanged(ev)}
                />
                <div className=" col-2 input-group-append">
                  <div className="input-group-text  border-0 input-color-icon">
                    <button
                      style={{ height: "parent" }}
                      type="button"
                      className="btn btn-link text-decoration-none input-color-icon"
                      onClick={toggleShowPassword2}
                    >
                      {showPassword2 ? (
                        <FontAwesomeIcon
                          icon={faEyeLowVision}
                          style={{ color: "var(--light)", fontSize: "20px" }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faEyeSlash}
                          style={{ color: "var(--light)", fontSize: "20px" }}
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
              NEXT
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
};

const ReferalForm = React.memo((props) => {
  const gaEventTracker = useAnalyticsEventTracker("SignUp");
  const { state } = useContext(StoreContext);
  const dispatchRedux = useDispatch();
  const initialValues = {
    promo_code: "",
  };
  const navigate = useNavigate();
  const successMessage = useSelector((state) => state.auth.user_sign_up);
  const appConfig = useSelector((state) => state.data.app_config);
  const errorMessage = useSelector((state) => state.data.error);

  const [settings, setSettings] = useState(getFromLocalStorage("settings"));

  useEffect(() => {
    if (appConfig) {
      setSettings(appConfig);
    }
  }, [appConfig]);

  const handleSubmit = (values) => {
    setTrackingData(values);

    const payload = {
      promo_code: values.promo_code,
      msisdn: state?.signup_msisdn,
      password: state?.signup_password,
    };
    setTrackingData(payload);

    dispatchRedux(signupUser(payload))
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

        const data = {
          msisdn: state?.signup_msisdn,
          promo_code:
            values?.promo_code.length === 0
              ? "no promo code"
              : values?.promo_code,
        };
        gaEventTracker("Sign Up", data);

        // Redirect the user as needed
      })
      .catch((error) => {
        console.error("Error in handleSubmit:", error);
      });
  };

  console.log("appconfig", settings?.accountConfiguration?.verificationEnabled);

  useEffect(() => {
    let message = "";
    if (successMessage?.success?.status === 201) {
      const timeoutId = setTimeout(() => {
        if (settings?.accountConfiguration?.verificationEnabled !== "0") {
          navigate("/verify");
        } else {
          navigate("/login");
        }
      }, 1650);
      return () => clearTimeout(timeoutId);
    } else if (errorMessage) {
      message = {
        status: 400,
        message: errorMessage || "Error attempting to Register",
      };

      const data = {
        msisdn: state?.signup_msisdn,
        event: "sign_up_failed",
        message: "sign up failed",
      };
      gaEventTracker("Sign Up Failed", data);
      // Add a notification for  registration
      Notify(message);
    }
  }, [successMessage, errorMessage]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      render={(props) => <MyReferalCodeForm {...props} />}
    />
  );
});
const MyReferalCodeForm = (props) => {
  const { errors, values, setFieldValue } = props;
  const loading = useSelector((state) => state.auth.loading);
  const onFieldChanged = (ev) => {
    let field = ev.target.name;
    let value = ev.target.value;
    setFieldValue(field, value);
  };
  return (
    <Form className={`d-block`}>
      <div className="pt-0">
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-12 ">
              <div className="form-group W-100 d-flex justify-content-center mt-1">
                <>
                  <input
                    value={values.promo_code || ""}
                    className="text-light deposit-input form-control col-md-12 input-field"
                    id="promo_code"
                    name="promo_code"
                    type="text"
                    placeholder="Referal Code"
                    onChange={(ev) => onFieldChanged(ev)}
                  />
                  {errors.promo_code && (
                    <div className="text-danger">{errors.promo_code}</div>
                  )}
                </>
              </div>
            </div>
          </div>

          <div className="form-group w-100 d-flex justify-content-left mb-4">
            <div className="col">
              <button
                type="submit"
                style={{ position: "relative" }}
                disabled={loading}
                className="w-100 btn btn-lg btn-primary mt-5 col-md-12 deposit-withdraw-button button-page"
              >
                {loading ? (
                  <div className="loader  position-top-buttons"></div>
                ) : (
                  "COMPLETE"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

const navigateToFormStep = (stepNumber) => {
  // Hide all form steps
  document.querySelectorAll(".form-step").forEach((formStepElement) => {
    formStepElement.classList.add("d-none");
  });

  // Mark all form steps as unfinished
  document.querySelectorAll(".form-stepper-list").forEach((formStepHeader) => {
    formStepHeader.classList.add("form-stepper-unfinished");
    formStepHeader.classList.remove(
      "form-stepper-active",
      "form-stepper-completed"
    );
  });

  // Show the current form step (as passed to the function)
  document.querySelector(`#step-${stepNumber}`).classList.remove("d-none");

  // Select the form step circle (progress bar)
  const formStepCircle = document.querySelector(`li[step="${stepNumber}"]`);

  // Mark the current form step as active
  formStepCircle.classList.remove(
    "form-stepper-unfinished",
    "form-stepper-completed"
  );
  formStepCircle.classList.add("form-stepper-active");

  // Loop through each form step circles
  // This loop will continue up to the current step number
  for (let index = 0; index < stepNumber; index++) {
    // Select the form step circle (progress bar)
    const formStepCircle = document.querySelector(`li[step="${index}"]`);

    // Check if the element exists. If yes, then proceed
    if (formStepCircle) {
      // Mark the form step as completed
      formStepCircle.classList.remove(
        "form-stepper-unfinished",
        "form-stepper-active"
      );
      formStepCircle.classList.add("form-stepper-completed");
    }
  }
};

const Steppers = () => {
  const { dispatch } = useContext(StoreContext);
  const successMessage = useSelector((state) => state.auth.user_sign_up);

  const Alert = (props) => {
    let c = successMessage ? "success" : "danger";
    return (
      <div role="alert" className={`fade alert alert-${c} show`}>
        {successMessage?.success?.message}
      </div>
    );
  };
  useEffect(() => {
    // Select all form navigation buttons and add event listeners
    const formNavigationButtons = document.querySelectorAll(
      ".btn-navigate-form-step"
    );

    formNavigationButtons?.forEach((formNavigationBtn) => {
      // Add a click event listener to the button
      formNavigationBtn.addEventListener("click", () => {
        // Get the value of the step
        const stepNumber = parseInt(
          formNavigationBtn.getAttribute("step_number")
        );

        // Call the function to navigate to the target form step
        dispatch({ type: "SET", key: "steps", payload: stepNumber });
        navigateToFormStep(stepNumber);
      });
    });

    // Cleanup the event listeners on component unmount
    return () => {
      formNavigationButtons?.forEach((formNavigationBtn) => {
        formNavigationBtn.removeEventListener("click", () => {});
      });
    };
  }, []);

  return (
    <>
      <div className={"stepper"}>
        <FormTitle />
        {successMessage && <Alert />}
        <div id="multi-step-form-container">
          {/*//Form Steps / Progress Bar*/}
          <ul className="form-stepper form-stepper-horizontal text-center-stepper mx-auto pl-0">
            {/*//  Step 1 */}
            <li
              className="form-stepper-active text-center-stepper form-stepper-list"
              step="1"
            >
              <a className="mx-2">
                <span className="form-stepper-circle">
                  <span>1</span>
                </span>
                <div className="label stepper-text-label">Phone Number</div>
              </a>
            </li>
            {/* Step 2 */}
            <li
              className="form-stepper-unfinished text-center-stepper form-stepper-list"
              step="2"
            >
              <a className="mx-2">
                <span className="form-stepper-circle text-muted">
                  <span>2</span>
                </span>
                <div className="label text-muted stepper-text-label">
                  Passwords
                </div>
              </a>
            </li>
            {/*// Step 3 */}
            <li
              className="form-stepper-unfinished text-center-stepper form-stepper-list"
              step="3"
            >
              <a className="mx-2">
                <span className="form-stepper-circle text-muted">
                  <span>3</span>
                </span>
                <div className="label text-muted stepper-text-label">
                  Finish
                </div>
              </a>
            </li>
          </ul>

          {/*// <!-- Step Wise Form Content -->*/}
          <div id="userAccountSetupForm" name="userAccountSetupForm">
            {/*progrees bar  for promotions on Registration promos*/}
            <SliderPromos />
            {/*// <!-- Step 1 Content -->*/}
            <section id="step-1" className="form-step">
              <h2 className="font-normal">Basic Details</h2>
              {/*// <!-- Step 1 input fields -->*/}
              <SignupForm />
            </section>
            {/*// <!-- Step 2 Content, default hidden on page load. -->*/}
            <section id="step-2" className="form-step d-none">
              <PasswordForm />
              <div className="mt-3 d-flex justify-content-between">
                <button
                  className="button btn-navigate-form-step"
                  type="button"
                  step_number="1"
                >
                  Previous
                </button>
              </div>
            </section>
            {/*// <!-- Step 3 Content, default hidden on page load. -->*/}
            <section id="step-3" className="form-step d-none">
              <h2 className="font-normal align-header-referal">
                Do you have a referral code? Enter Here or Click Complete
              </h2>
              {/*<VerifyAccountForm/>*/}
              <ReferalForm />
              <div className="mt-3 d-flex justify-content-between">
                <button
                  className="button btn-navigate-form-step"
                  type="button"
                  step_number="2"
                >
                  Previous
                </button>
                {/*<button className="button submit-btn" type="submit">Finish</button>*/}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
export default React.memo(RegisterTwo);
