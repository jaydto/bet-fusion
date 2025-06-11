import React, { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  getFromLocalStorage,
  setTrackingData,
} from "../../../utils/local-storage";
import { resetState, userWithdrawal } from "../../../../redux/dataSlice";
import { notification } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";
import mpesa from "../../../../assets/img/mobile/mpesa.svg";

const WithdrawForm = () => {
  const dispatchRedux = useDispatch();
  const userData = useSelector((state) => state.auth.user);
  const [user, setUser] = useState(getFromLocalStorage("user"));
  const loadingWithdraw = useSelector((state) => state.data.withdraw_loading);
  const successMessage = useSelector((state) => state.data.withdrawal_message);
  const errorMessage = useSelector((state) => state.data.error);

  useState(() => {
    setUser(userData || getFromLocalStorage("user"));
  }, [userData]);

  const formik = useFormik({
    initialValues: {
      amount: "",
      msisdn: user?.msisdn,
    },
    validationSchema: Yup.object().shape({
      amount: Yup.number()
        .required("Amount is required")
        // .min(50, 'Minimum amount is 50')
        .max(300000, "Maximum amount is 300,000")
        .positive("Amount must be positive")
        .integer("Amount must be a whole number"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const initialValues = {
        amount: values.amount || 100,
        msisdn: user?.msisdn,
      };

      const data = { user: initialValues };

      try {
        // Simulate API call delay (replace with actual API call)

        setTrackingData(data);
        dispatchRedux(userWithdrawal(data));

        // Reset form after successful withdrawal
        resetForm();
      } catch (error) {
        console.error("Withdrawal error:", error);
        // Handle error
      }
    },
  });

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

  const handleAmountChange = (event) => {
    formik.handleChange(event);
  };

  return (
    <div className="account__section__container deposit account__section transaction">
      <div className="account__section global-card__type--block">
        <h3 className="account__section__title deposit__title t-label">
          Withdrawal{" "}
        </h3>

        <p className={"text-white py-2 px-2 font-input text-start mb-4"}>
          Withdrawal method
        </p>
        <div>
          <LazyLoadImage src={mpesa} alt="Logo" />
        </div>
        <p className="account__section__desc deposit__desc">
          Withdraw from yourjazabets wallet
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div
            className="input__container deposit input account__section__input"
            style={{ marginBottom: "10px" }}
          >
            <input
              type="number"
              // min="50"
              max="300000"
              step="50"
              id="amount"
              name="amount"
              value={formik.values.amount}
              onChange={handleAmountChange}
              onBlur={formik.handleBlur}
              autoComplete="off"
              placeholder="Enter amount to withdraw"
              className=" deposit-input form-control col-md-12 input-field withdraw-input"
            />
            {formik.touched.amount && formik.errors.amount ? (
              <div className="input__desc text-danger">
                <small>{formik.errors.amount}</small>
              </div>
            ) : (
              <div className="input__desc">
                <small>
                  Daily M-PESA withdrawal Limits: Maximum KES300,000
                </small>
              </div>
            )}
          </div>
          <button
            type="submit"
            className={`button account__payments__submit button account__section__submit  ${
              formik.values.amount === "" && "button__disabled "
            }button__secondary account__section__submi`}
            disabled={!formik.isValid || loadingWithdraw}
          >
            {loadingWithdraw ? "loading..." : ""}
            {loadingWithdraw ? (
              <div className="loader"></div>
            ) : (
              `Withdraw ${formik.values.amount}`
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WithdrawForm;
