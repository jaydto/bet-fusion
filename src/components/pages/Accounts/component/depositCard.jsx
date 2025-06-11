import React, { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  getFromLocalStorage,
  setTrackingData,
} from "../../../utils/local-storage";
import { resetState, userDeposits } from "../../../../redux/dataSlice";
import { Card, InputNumber, Button, Typography, Space, notification } from "antd";
import { DollarCircleOutlined, LoadingOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const DepositForm = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.user);
  const loadingDeposit = useSelector((state) => state.data.deposit_loading);
  const successMessage = useSelector((state) => state.data.deposits_message);
  const errorMessage = useSelector((state) => state.data.error);

  const [user, setUser] = useState(getFromLocalStorage("user"));

  useEffect(() => {
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
        .positive("Amount must be positive")
        .integer("Must be a whole number")
        .min(50, "Minimum is KES 50"),
    }),
    onSubmit: (values, { resetForm }) => {
      const data = {
        amount: values.amount,
        msisdn: user?.msisdn,
      };
      setTrackingData(data);
      dispatch(userDeposits(data));
      resetForm();
    },
  });

  const dispatchDepositMessage = useCallback(() => {
    if (successMessage) {
      notification.success({
        message: "Success",
        description: successMessage,
        placement: "topRight",
      });
    } else if (errorMessage) {
      notification.error({
        message: "Error",
        description: errorMessage,
        placement: "topRight",
      });
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    dispatchDepositMessage();
    const timer = setTimeout(() => {
      dispatch(resetState("deposits_message"));
      dispatch(resetState("error"));
    }, 7000);
    return () => clearTimeout(timer);
  }, [dispatchDepositMessage]);

  const quickAmounts = [100, 200, 500];

  return (
    <Card
      title={<Title level={4}><DollarCircleOutlined /> Deposit to Wallet</Title>}
      bordered={false}
      style={{ maxWidth: 500, margin: "auto", marginTop: 24 }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Text>Enter Amount (KES):</Text>
        <InputNumber
          name="amount"
          min={50}
          max={300000}
          step={50}
          style={{ width: "100%", marginBottom: 8 }}
          value={formik.values.amount}
          onChange={(value) => formik.setFieldValue("amount", value)}
          onBlur={formik.handleBlur}
          placeholder="e.g. 500"
        />
        {formik.touched.amount && formik.errors.amount && (
          <Text type="danger" style={{ fontSize: 12 }}>{formik.errors.amount}</Text>
        )}

        <div style={{ margin: "12px 0" }}>
          <Text type="secondary">Quick Amounts:</Text>
          <Space style={{ marginTop: 6 }}>
            {quickAmounts.map((amt) => (
              <Button
                key={amt}
                onClick={() => formik.setFieldValue("amount", amt)}
              >
                +{amt}
              </Button>
            ))}
          </Space>
        </div>

        <Button
          type="primary"
          htmlType="submit"
          block
          disabled={!formik.isValid || !formik.values.amount || loadingDeposit}
        >
          {loadingDeposit ? (
            <span><LoadingOutlined /> Processing...</span>
          ) : (
            `Deposit KES ${formik.values.amount || ""}`
          )}
        </Button>
      </form>
    </Card>
  );
};

export default DepositForm;
