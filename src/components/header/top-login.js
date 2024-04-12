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

export const Notify = (message) => {
  let options = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    toastId: 673738 /* this is hack to prevent multiple toasts */,
  };
  if (message.status === 200 || message.status === 201) {
    toast.success(`🚀 ${message.message}`, options);
  } else {
    toast(
      <div className={"d-flex"}>
        <LazyLoadImage
          src={fire}
          alt=""
          style={{ height: "20px", width: "26px" }}
        />
        <span>{message.message}</span>
      </div>,
      options
    );
  }
};

const HeaderLogin = React.memo((props) => {
  const { setUser, login } = props;
  const dispatchRedux = useDispatch();
  const successMessage = useSelector((state) => state.auth.user);
  const errorMessage = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);
  const { dispatch } = useContext(StoreContext);

  const initialValues = {
    msisdn: "",
    password: "",
    countryCode: "254",
  };

  const dispatchUser = useCallback(() => {
    if (successMessage !== null) {
      Notify(successMessage);

      if (successMessage.status == 200) {
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

  const gaEventTracker = useAnalyticsEventTracker("Login");

  const handleSubmit = (values) => {
    const formattedMsisdn = values.msisdn.replace(/^(?:\+254|254|0)/, "");

    const initialValues = {
      msisdn: values?.countryCode + formattedMsisdn,
      password: values?.password,
    };
    let message = "";
    dispatchRedux(loginUser(initialValues))
      .then((response) => {
        if (loginUser.rejected.match(response)) {
          message = {
            status: 401,
            message: response.error.message || "Error attempting to login",
          };
        }
        if (successMessage) {
          message = {
            status: successMessage.status,
            message: successMessage?.message || "",
          };
        }
        // const
        Notify(message);
      })
      .catch((error) => {
        console.error("Error in handleSubmit:", error);
      });
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
                <div
                  className=" col-5 input-group-append  align-items-center justify-content-start"
                  style={{ display: "contents" }}
                >
                  <div className="input-group-text  border-0 input-color-icon codecCountry">
                    {/* <select
                style={{color:"var(--light)"}}
                name="countryCode"
                className="form-control btn btn-link text-decoration-none input-color-icon"
                onChange={onFieldChanged}
                value={values.countryCode}
              >
                <option value="254" style={{color:"var(--light)"}}>+254&nbsp; <img 
                        className="image-kenya"
                         src={kenyan}
                         style={{
                          width:'17px',
                          height:'11px', marginTop:'2px'
                         }}
                         alt="Kenya"
                         title="Kenya"
                         effects="blur"
                        /></option>
              </select> */}
                    <Dropdown
                      onSelect={(selectedOption) =>
                        onFieldChanged({
                          target: {
                            name: "countryCode",
                            value: selectedOption,
                          },
                        })
                      }
                      className="counrtryCodec"
                    >
                      <Dropdown.Toggle
                        variant="link"
                        id="countryCode"
                        style={{ color: "var(--light)" }}
                      >
                        +{values.countryCode}
                        &nbsp;{" "}
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
                          effects="blur"
                        />
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="countryCode">
                        <Dropdown.Item eventKey="254" id="254">
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
                            effects="blur"
                          />
                        </Dropdown.Item>
                        {/* Add more country codes as needed */}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
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
              <br />
              <span
                className={`sticky-hidden text-warning d-flex justify-content-end font-input my-2`}
              >
                <div className={`text-warning`}>
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
              </span>
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
                  // data-action="grow"
                  autoComplete={"on"}
                  placeholder={"Password"}
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
              <br />
              <input type="hidden" name="ref" value="{props.refURL}" />
              <Link
                to={"/reset-password"}
                title="Reset password"
                onClick={() => gaEventTracker("Reset Password")}
              >
                <span
                  className={`sticky-hidden text-warning px-2 d-flex justify-content-end"`}
                >
                  Forgot Password?
                </span>
              </Link>
            </div>

            <div className={`w-100`}>
              <button
                className={`w-100 button-radius input-field btn-font cg  login-button2 mt-4 btn bold`}
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
                    className={`text-warning font-input } register-label my-3`}
                  >
                    Dont have an account! Register now{" "}
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
