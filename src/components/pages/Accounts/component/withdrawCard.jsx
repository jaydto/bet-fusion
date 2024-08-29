import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getFromLocalStorage, setTrackingData } from '../../../utils/local-storage';
import { userWithdrawal } from '../../../../redux/dataSlice';

const WithdrawForm = () => {
  const dispatchRedux = useDispatch();
  const userData = useSelector((state) => state.auth.user);
  const [user, setUser] = useState(getFromLocalStorage("user"));
  const loadingWithdraw = useSelector((state) => state.data.withdraw_loading);

  useState(() => {
    setUser(userData || getFromLocalStorage("user"));
  }, [userData]);

  const formik = useFormik({
    initialValues: {
      amount: '',
      msisdn: user?.msisdn,
    },
    validationSchema: Yup.object().shape({
      amount: Yup.number()
        .required('Amount is required')
        // .min(50, 'Minimum amount is 50')
        .max(300000, 'Maximum amount is 300,000')
        .positive('Amount must be positive')
        .integer('Amount must be a whole number'),
    }),
    onSubmit: async (values, { resetForm }) => {
      const initialValues = {
        amount: values.amount || 100,
        msisdn: user?.msisdn,
      };

      try {
        // Simulate API call delay (replace with actual API call)

        setTrackingData(initialValues);
        dispatchRedux(userWithdrawal(initialValues));
        
        // Reset form after successful withdrawal
        resetForm();
      } catch (error) {
        console.error('Withdrawal error:', error);
        // Handle error
      }
    },
  });

  const handleAmountChange = (event) => {
    formik.handleChange(event);
  };

  return (
    <div className="account__section__container deposit account__section transaction">
      <div className="account__section global-card__type--block">
        <h3 className="account__section__title deposit__title t-label">Withdraw</h3>
        <p className="account__section__desc deposit__desc">Withdraw from your CrashKali account</p>
        <form onSubmit={formik.handleSubmit}>
          <div className="input__container deposit input account__section__input" style={{ marginBottom: '10px' }}>
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
              className="text-light deposit-input form-control col-md-12 input-field"
            />
            {formik.touched.amount && formik.errors.amount ? (
              <div className="input__desc text-danger">
                <small>{formik.errors.amount}</small>
              </div>
            ) : (
              <div className="input__desc">
                <small>Daily M-PESA withdrawal Limits:  Maximum KES300,000</small>
              </div>
            )}
          </div>
          <button
            type="submit"
            className={`button account__payments__submit button account__section__submit  ${formik.values.amount === ''&&'button__disabled '}button__secondary account__section__submi`}
            disabled={!formik.isValid || loadingWithdraw}
          >
            {loadingWithdraw?"loading...":""}{loadingWithdraw ? <div className="loader"></div> : `Withdraw ${formik.values.amount}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WithdrawForm;
