import React, { useCallback, useEffect, useState } from "react";
import { Col, notification, Row } from "antd";

import { useNavigate } from "react-router-dom";

import {
  getFromLocalStorage,
  setTrackingData,
} from "../../utils/local-storage";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { Form, Formik } from "formik";
import mpesa from "../../../assets/img/mpesa.png";
import "./deposit.css";

import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { resetState, userWithdrawal } from "../../../redux/dataSlice";
import { userBalance } from "../../../redux/authSlice";
import { formatNumber } from "../../utils/betslip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const Withdraw = React.memo((props) => {
  const navigate = useNavigate();
  const successMessage = useSelector((state) => state.data.withdrawal_message);
  const errorMessage = useSelector((state) => state.data.error);
  const dispatchRedux = useDispatch();
  const userData = useSelector((state) => state.auth.user);

  const [user, setUser] = useState(getFromLocalStorage("user"));
  useEffect(() => {
    setUser(userData || getFromLocalStorage("user"));
  }, [userData]);

  const updateUserOnHistory = () => {
    if (!user) {
      return false;
    }
    let udata = {
      token: user.token,
    };
    const userValues = {
      udata: udata,
      user: user,
    };

    dispatchRedux(userBalance(userValues));
  };

  useEffect(() => {
    updateUserOnHistory();
  }, [successMessage]);

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
              <h4 className="inline-blockbetfusion-text-light">
                WITHDRAW FUNDS (MOBILE MONEY)
              </h4>{" "}
            </span>
            <span className="w-25"></span>
          </div>
        </div>
      </div>
    );
  };

  const dispatchWithdrawtMessage = useCallback(() => {
    if (successMessage !== null) {
      // display the success message
      notification.success({
        message: "Success",
        description: successMessage,
        className: "ant-notification",
        placement: "top", // Set placement to top
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
      navigate("/");
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    dispatchWithdrawtMessage();
    setTimeout(() => {
      dispatchRedux(resetState("deposits_message"));
      dispatchRedux(resetState("deposits_confirm_message"));
      dispatchRedux(resetState("error"));
    }, 7500);
  }, [dispatchWithdrawtMessage]);

  return (
    <div style={{ height: "100vh" }}>
      <ToastContainer />
      <Row justify="center" className="align-items-stretch h-100">
        <div
          className={
            "col-lg-8 col-sm-12 top-login-background-img-bg-down top-login-background-img-bg-page"
          }
        >
          <div className="w-100 d-flex flex-column justify-content-center h-100 top-login-background-img-bg-page">
            <div className={"width-page-centric deposit-page"}>
              <FormTitle />
              <div className={"w-100"}>
                <div className={"d-flex"}>
                  {/**/}
                  <div className={"size-deposit"}>
                    {!user ? setTimeout(navigate("/"), 500) : ""}
                    <div className={"d-flex flex-row justify-content-between"}>
                      <div className=" w-100">
                        <div className="homepage d-flex  flex-column align-items-center  login-page user-page">
                          {/* <Alert /> */}
                          <div className=" pb-0" data-backdrop="static">
                            <WithdrawForm />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <p>Don't have an account yet? <a href="/auth/register-2">Sign Up</a></p> */}
                  <div className="mt-4">{/*<LoginForm {...props}/>*/}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Row>
    </div>
  );
});

const PaymentInstructions = (props) => {
  return (
    <>
      <label className="header text-info">Withdrawal Instructions</label>
      <div className="container d-flex flex-column">
        <div className="row">
          <div className="colbetfusion-text-light">
            {" "}
            1. Enter the amount you wish to withdraw.
          </div>
        </div>
        <div className="row">
          <div className="colbetfusion-text-light">
            {" "}
            2. Click on the withdraw funds button.
          </div>
        </div>
        <div className="row">
          <div className="colbetfusion-text-light">
            {" "}
            3. Check your phone for an M-Pesa Confirmation.
          </div>
        </div>
      </div>
    </>
  );
};

const WithdrawFormFields = (props) => {
  const { values, errors, onFieldChanged } = props;
  const loading = useSelector((state) => state.data.withdraw_loading);
  const user = useSelector((state) => state.auth.user) || getFromLocalStorage("user");

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4 px-1 w-100">
        <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>Available Balance:</span>
        <span style={{ color: "#3BAAED", fontWeight: 800, fontSize: "16px" }}>
          KES {formatNumber(user?.balance || 0)}
        </span>
      </div>
      <div className="form-group row d-flex justify-content-center deposit-widthdraw-input-desktop">
        <div className={`col-md-12 w-100`}>
          <div className={"d-flex "}>
            <label className={"text-light deposit col-5 deposit-label"}>
              Phone Number
            </label>
          </div>
          <input
            className="text-light deposit-input form-control input-field"
            id="msisdn"
            name="msisdn"
            type="text"
            readOnly={true}
            value={values.msisdn}
            placeholder="Enter Phone Number"
          />
          {errors.msisdn && (
            <div className="text-danger"> {errors.msisdn} </div>
          )}
        </div>
      </div>

      <div className="form-group row d-flex justify-content-center mt-3 deposit-widthdraw-input-desktop">
        <div className="col-md-12">
          <label className={"text-light deposit"}>Amount to Withdraw</label>
          <input
            onChange={(ev) => {
              onFieldChanged(ev);
            }}
            className="text-light deposit-input form-control col-md-12 input-field"
            id="amount"
            name="amount"
            type="number"
            value={values.amount}
            placeholder="Enter Amount"
          />
          {errors.amount && (
            <div className="text-danger"> {errors.amount} </div>
          )}

          {values.amount > 0 && (
            <div className="px-1 mt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "8px" }}>
              <div className="d-flex justify-content-between" style={{ fontSize: "12px", color: "#a3a3a3" }}>
                <span>Withholding Tax (5%):</span>
                <span>- KES {(values.amount * 0.05).toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mt-1" style={{ fontSize: "14px", fontWeight: 700, color: "#3BAAED" }}>
                <span>Net Amount to Receive:</span>
                <span>KES {(values.amount * 0.95).toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="form-group row d-flex justify-content-left mb-4">
        <div className=" d-flex align-items-start deposit-withdraw-button-desktop px-3">
          <button
            type={"submit"}
            className="btn btn-lg w-100 deposit-button button-radius input-field btn-font cg login-button2 btn bold d-flex justify-content-center align-items-center"
            style={{ marginTop: "30px" }}
            disabled={values?.amount == ""}
          >
            {loading ? (
              <div className="loader"></div>
            ) : (
              `WITHDRAW ${values?.amount}`
            )}
          </button>
        </div>
      </div>
    </>
  );
};

const MyWithdrawForm = (props) => {
  const { errors, values, setFieldValue } = props;
  const appConfigs = useSelector((state) => state.data.app_config);
  const [settings, setSettings] = useState(getFromLocalStorage("settings"));

  useEffect(() => {
    setSettings(appConfigs || getFromLocalStorage("settings"));
  }, [appConfigs]);

  const withdrawalLimits = settings?.withdrawalLimits;

  const onFieldChanged = (ev) => {
    let field = ev.target.name;
    let value = ev.target.value;
    setFieldValue(field, value);

    if (field === "amount") {
      value = value.replace(/[^\d]/g, "");
      let newValue = value;
      let minWithdrawalAmount = {
        message: `Minimum allowed withdrawal amount is ${withdrawalLimits?.minimumAmount} KSH`,
      };
      let maxWithdrawalAmount = {
        message: `Maximum allowed withdrawal amount is ${withdrawalLimits?.maximumAmount} KSH`,
      };

      const minWithdrawal = withdrawalLimits?.minimumAmount;
      const maxWithdrawal = withdrawalLimits?.maximumAmount;
      if (Number(value) < Number(minWithdrawal)) {
        // Notify(minWithdrawalAmount);
        notification.open({
          message: "Warning",
          description: minWithdrawalAmount.message,
          className: "ant-notification",
          placement: "top", // Set the placement
        });
        newValue = value;
      } else if (Number(value) > Number(maxWithdrawal)) {
        notification.open({
          message: "Warning",
          className: "ant-notification",
          description: maxWithdrawalAmount.message,
          placement: "top", // Set the placement
        });
        newValue = maxWithdrawal;
      } else {
        newValue = value;
      }
      setFieldValue(field, newValue);
    }
  };

  return (
    <Form className="shadow-sm rounded border-0">
      <div className="pt-0">
        <div className="row d-flex align-items-center justify-content-center px-4">
          <div className="col-md-7 text-center">
            <div className={`col-md-7 text-center`}>
              <LazyLoadImage src={mpesa} alt="" />
            </div>
          </div>

          <WithdrawFormFields
            onFieldChanged={onFieldChanged}
            values={values}
            errors={errors}
          />

          <div className={``}>
            <PaymentInstructions />
          </div>
        </div>
      </div>
    </Form>
  );
};
export const WithdrawForm = (props) => {
  const dispatchRedux = useDispatch();
  const app_config = useSelector((state) => state.data.app_config);
  const [settings, setSettings] = useState(getFromLocalStorage("settings"));
  const [currentWithdrawValue, setCurrentWithdrawValue] = useState(0); // New state for current deposit value
  const withdrawalLimits = settings?.withdrawalLimits;
  const userData = useSelector((state) => state.auth.user);
  const [user, setUser] = useState(getFromLocalStorage("user"));
  const successMessage = useSelector((state) => state.data.withdrawal_message);
  const errorMessage = useSelector((state) => state.data.error);

  useEffect(() => {
    if (userData) {
      setUser(userData || getFromLocalStorage("user"));
    }
  }, [userData]);
  useEffect(() => {
    if (app_config) {
      setSettings(app_config || getFromLocalStorage("settings"));
    }
  }, [app_config]);

  const initialValues = {
    amount: 100,
    msisdn: user?.msisdn,
  };

  const handleSubmit = (values) => {
    setTrackingData(values);
    const data = { user: values };

    dispatchRedux(userWithdrawal(data));
  };

  const dispatchWithdrawMessage = useCallback(() => {
    if (successMessage !== null) {
      // Use Ant Design notification to display the success message
      notification.success({
        message: "Success",
        description: successMessage,
        className: "ant-notification",
        placement: "top", // Set placement to top
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    dispatchWithdrawMessage();
    setTimeout(() => {
      dispatchRedux(resetState("withdrawal_message"));
      dispatchRedux(resetState("error"));
    }, 7500);

    return () => {
      dispatchRedux(resetState("withdrawal_message"));
      dispatchRedux(resetState("error"));
    };
  }, [dispatchWithdrawMessage]);

  const validate = (values) => {
    let errors = {};

    if (!values.msisdn || !values.msisdn.match(/(254|0|)?[71]\d{8}/g)) {
      errors.msisdn = "Please enter a valid phone number";
    }
    if (
      !values.amount ||
      values.amount < Number(withdrawalLimits?.minimumAmount)
    ) {
      errors.amount =
        "Please enter an amount above KES " + withdrawalLimits?.minimumAmount;
    } else if (values.amount > Number(withdrawalLimits?.maximumAmount)) {
      errors.amount =
        "Please enter an amount less than or equal to KES " +
        withdrawalLimits?.maximumAmount;
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
      render={(props) => (
        <MyWithdrawForm
          {...props}
          setCurrentWithdrawValue={setCurrentWithdrawValue}
          currentWithdrawValue={currentWithdrawValue}
        />
      )}
    />
  );
};

export default React.memo(Withdraw);
