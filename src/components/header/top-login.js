import React, { useCallback, useContext, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Form, Formik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fire from "../../assets/svg/fire.svg";
import { setLocalStorage } from "../utils/local-storage";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import { Link } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetState } from "../../redux/authSlice";
import { StoreContext } from "../../context/store";
import kenyan from "../../assets/svg/kenya.svg";
import { Dropdown, Image } from "react-bootstrap";
import { notification } from "antd";

export const CountryButton = ({ onFieldChanged }) => {
  const handleClick = () => {
    // Simulating selecting Kenya (254 is the country code for Kenya)
    onFieldChanged({
      target: {
        name: "countryCode",
        value: "254",
      },
    });
  };

  return (
    <button
      type="button"
      className="btn counrtryCodec"
      onClick={handleClick}
      style={{ color: "var(--light)", display: "flex", alignItems: "center" }}
    >
      Kenya &nbsp;
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
    </button>
  );
};

const HeaderLogin = React.memo((props) => {
  const { setUser, login } = props;
  const dispatchRedux = useDispatch();
  const successMessage = useSelector((state) => state.auth.user);
  const errorMessage = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);
  const { dispatch } = useContext(StoreContext);
  //const [api, contextHolder] = notification.useNotification();

  const initialValues = {
    msisdn: "",
    password: "",
    countryCode: "254",
  };

  const dispatchUser = useCallback(() => {
    if (successMessage !== null) {
      // Use Ant Design notification to display the success message
      notification.success({
        message: "Success",
        description: successMessage.message, // assuming `successMessage` has a `message` field
        className: "ant-notification",
        placement: "top", // Set placement to top-left
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });

      if (successMessage.status === 200) {
        setLocalStorage("user", successMessage.user);
        setUser(successMessage.user);
      }
    }
  }, [successMessage]);

  useEffect(() => {
    dispatchRedux(resetState("user_sign_up"));
    dispatch({ type: "SET", key: "steps", payload: 0 });
    dispatchUser();
  }, [dispatchUser]);

  useEffect(() => {
    if (errorMessage) {
      notification.error({
        message: "Login Error",
        description: errorMessage, // assuming `successMessage` has a `message` field
        className: "ant-notification",
        placement: "top", // Set placement to top-left
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    }
  }, [errorMessage]);

  // //const [api, contextHolder] = notification.useNotification();
  // const [notificationMessage, setNotificationMessage] = useState(null);
  const gaEventTracker = useAnalyticsEventTracker("Login");

  const handleSubmit = (values) => {
    const formattedMsisdn = values.msisdn.replace(/^(?:\+254|254|0)/, "");

    const initialValues = {
      msisdn: values?.countryCode + formattedMsisdn,
      password: values?.password,
    };

    dispatchRedux(loginUser(initialValues));
  };

  const validate = (values) => {
    let errors = {};

    const formattedMsisdn = values.msisdn.replace(/^(?:\+254|254|0)/, "");
    const phoneNumber = values?.countryCode + formattedMsisdn;

    if (
      !phoneNumber ||
      phoneNumber.length > 12 ||
      !phoneNumber.match(/(254|0|)?[71]\d{8}/g)
    ) {
      errors.msisdn = "Please enter a valid kenyan phone number";
    }

    if (!values.password || values.password.length < 4) {
      errors.password = "Invalid password";
    }

    return errors;
  };

  const MyLoginForm = (props) => {
    const { errors, values, setFieldValue } = props;
    const [showPassword, setShowPassword] = useState(false);

    const onFieldChanged = (ev) => {
      let field = ev.target.name;
      let value = ev.target.value;
      setFieldValue(field, value);
    };
    const label = {
      inputProps: {
        "aria-label": "remember me",
        value: "Remember me",
      },
    };

    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <>
        <Form
          className={`ow right i web-element top-login-paddings   width-centric-page login-page top-login-background-img`}
        >
          <Row className={`d-flex flex-column`}>
            <div className={`w-100 `}>
              <div
                className="input-group input-color-icon w-100 "
                style={{ display: "flex" }}
              >
                <input
                  type="text"
                  name="msisdn"
                  className={`w-50 input-field button-radius text-light deposit-input form-control col input-field-login  ${
                    errors.msisdn && "text-danger"
                  }`}
                  placeholder={"712345678"}
                  onChange={(ev) => onFieldChanged(ev)}
                  value={values.msisdn}
                />
              </div>

              {errors.msisdn && (
                <div className="text-danger"> {errors.msisdn} </div>
              )}
              <label className="mb-5 px-2 pb-3"  style={{color:"#FFFFFFB2"}}>
                Enter your phone number
              </label>

              <br />

              {/* <span
                className={`sticky-hidden text-warning faded-color d-flex justify-content-end font-input my-2`}
              >
                <div className={`text-warning faded-color`}>
                  <Switch
                    id={"remember-me"}
                    {...label}
                    className="odds-change-box"
                    name={"accept_all_odds_change"}
                    defaultChecked
                    color="primary"
                  />{" "}
                  Remember Me
                </div>
              </span> */}
            </div>

            <div className={`w-100 `}>
              <div
                className="input-group input-color-icon w-100"
                style={{ display: "flex" }}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className={`w-75 input-field button-radius text-light deposit-input form-control col input-field-login  ${
                    errors.password && "text-danger"
                  } `}
                  autoComplete="on"
                  placeholder="Password"
                  onChange={(ev) => onFieldChanged(ev)}
                  value={values.password}
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
                <div className="text-danger"> {errors.password} </div>
              )}
                              <label className="mb-5 px-2 pb-3" style={{color:"#FFFFFFB2"}}>Enter your password</label>

              <br />
              <input type="hidden" name="ref" value="{props.refURL}" />

              <div className="d-flex justify-content-between align-items-center">
                <Link
                  to={"/reset-password"}
                  title="Reset password"
                  onClick={() => gaEventTracker("Reset Password")}
                >
                  <span
                    className={`sticky-hidden text-warning faded-color px-2 d-flex justify-content-end"`}
                  >
                    Forgot Password?
                  </span>
                </Link>
                {/* <span className="d-flex align-items-center">
                  <span className="text-warning faded-color h4 m-0">
                    You are using BetDonjo
                  </span>
                  <CountryButton onFieldChanged={onFieldChanged} />
                </span> */}
              </div>
            </div>

            <div className={`w-100`}>
              <button
                className={`w-100 button-radius input-field btn-font login-button2 mt-4 btn bold`}
                style={{ position: "relative" }}
                disabled={loading}
                type="submit"
              >
                {loading ? (
                  <div className="loader  position-top-buttons"></div>
                ) : (
                  <span>LOGIN</span>
                )}
              </button>
              <Link
                className="cg register-button btn btn-warning"
                to={"/signup"}
                title="Join now"
                onClick={() => gaEventTracker("Register")}
                style={login && { display: "none" }}
              >
                <span className="register-label bold">REGISTER </span>
              </Link>
            </div>
            <Row
              className={`${login ? "d-flex" : "d-none"}`}
              style={{ float: "right" }}
            >
              <div className="col-12">
                <Link
                  className={`${
                    login ? "d-flex justify-content-center w-100" : ""
                  }`}
                  to={"/signup"}
                  title="Join now"
                  onClick={() => gaEventTracker("Register")}
                >
                  <span
                    className={`faded-color font-input } register-label my-3`}
                    style={{ textTransform: "uppercase", color: "#FFAA00" }}
                  >
                    Create a New Account
                  </span>
                </Link>
                <Link
                  className="m-lg-2 badge bg-success d-none"
                  to={"/verify-account"}
                  title="Verify Account"
                  onClick={() => gaEventTracker("Visit Verify Page")}
                >
                  <span className="register-label">VERIFY ACCOUNT</span>
                </Link>
              </div>
            </Row>
          </Row>
        </Form>
      </>
    );
  };

  const LoginForm = (props) => {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
        validate={validate}
      >
        {(props) => <MyLoginForm {...props} />}
      </Formik>
    );
  };

  return (
    <Container className={`d-flex flex-column mx-2`}>
      <div className={`d-none`} style={{ float: "right" }}>
        <div className="col-12">
          <Link
            className="m-lg-2 badge bg-success d-none"
            to={"/verify-account"}
            title="Verify Account"
            onClick={() => gaEventTracker("Verify")}
          >
            <span className="register-label">VERIFY ACCOUNT</span>
          </Link>
        </div>
      </div>
      <div
        style={{ float: "right" }}
        className={` d-flex justify-content-center align-items-center flex-column w-100 container-fluid`}
      >
        <ToastContainer />
        <LoginForm />
      </div>
    </Container>
  );
});
export default React.memo(HeaderLogin);
