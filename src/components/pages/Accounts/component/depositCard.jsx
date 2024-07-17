import React, { useEffect, useState } from 'react';
import { getFromLocalStorage, setTrackingData } from '../../../utils/local-storage';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { userDeposits } from '../../../../redux/dataSlice';

const DepositForm = () => {
  const dispatchRedux = useDispatch();
  const userData = useSelector((state) => state.auth.user);
  const [user, setUser] = useState(getFromLocalStorage("user"));
  const loadingDeposit = useSelector((state) => state.data.deposit_loading);

  useEffect(() => {
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
        .min(10, 'Minimum amount is 10')
        .positive('Amount must be positive')
        .integer('Amount must be a whole number'),
    }),
    onSubmit: (values, { resetForm }) => {
      handleDeposit(values);
      resetForm();
    },
  });

  const handleAmountChange = (event) => {
    formik.handleChange(event);
  };

  const handleDeposit = async (values) => {
    const initialValues = {
      amount: values.amount || 100,
      msisdn: user?.msisdn,
    };

    try {

      setTrackingData(initialValues);
      dispatchRedux(userDeposits(initialValues));
    } catch (error) {
      console.error('Deposit error:', error);
      // Handle error
    }
  };

  return (
    <div className="account__section__container deposit account__section transaction ">
      <div className="account__section global-card__type--block">
        <h3 className="account__section__title deposit__title t-label">Deposit</h3>
        <p className="account__section__desc deposit__desc">Send money into your CrashKali account</p>
        <div className="button__group account__section__button-group" style={{ marginBottom: '10px', marginTop: '15px' }}>
          <button className="button rounded account__section__button deposit-buttons-value" onClick={() => formik.setFieldValue('amount', '100')}>
            +100
          </button>
          <button className="button rounded account__section__button deposit-buttons-value" onClick={() => formik.setFieldValue('amount', '200')}>
            +200
          </button>
          <button className="button rounded account__section__button deposit-buttons-value" onClick={() => formik.setFieldValue('amount', '500')}>
            +500
          </button>
          <button className="button rounded account__section__button deposit-buttons-value" onClick={() => formik.setFieldValue('amount', '1000')}>
            +1000
          </button>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="input__container deposit input account__section__input" style={{ marginBottom: '10px' }}>
            <input
              type="number"
              min="50"
              step="50"
              id="amount"
              name="amount"
              value={formik.values.amount}
              onChange={handleAmountChange}
              onBlur={formik.handleBlur}
              autoComplete="off"
              placeholder="Enter amount to deposit"
              className="text-light deposit-input form-control col-md-12 input-field"
            />
            {formik.touched.amount && formik.errors.amount ? (
              <div className="input__desc text-danger">
                <small>{formik.errors.amount}</small>
              </div>
            ) : (
              <div className="input__desc">
                <small>Minimum KES10</small>
              </div>
            )}
          </div>
          <button
            type="submit"
            className={`button account__payments__submit button account__section__submit  ${formik.values.amount === ''&&'button__disabled '}button__secondary account__section__submi`}
            disabled={formik.values.amount === '' || loadingDeposit}
          >
           {loadingDeposit?"loading...":""} {loadingDeposit ? <div className="loader"></div> : `DEPOSIT ${formik.values.amount}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DepositForm;
