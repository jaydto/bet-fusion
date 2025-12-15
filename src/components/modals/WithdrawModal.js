import React, { useCallback, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { notification } from "antd";
import { CloseCircleFilled, LeftOutlined } from "@ant-design/icons";
import Wallet from "../../assets/img/Wallet1.svg";
import { formatNumber } from "../utils/betslip";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Typography } from "antd";

import { 
  resetState, 
  setState, 
  userWithdrawal 
} from "../../redux/dataSlice"

import {
  getFromLocalStorage,
  setTrackingData,
} from "../utils/local-storage";

const WithdrawalModal = React.memo(() => {
  const dispatchRedux = useDispatch();
  const { Title } = Typography;
  
  // -- REDUX STATE --
  const showWithdrawModal = useSelector((state) => state.data.show_withdraw_modal);
  const loadingWithdraw = useSelector((state) => state.data.withdraw_loading);
  const successMessage = useSelector((state) => state.data.withdrawal_message);
  const errorMessage = useSelector((state) => state.data.error);
  
  const userData = useSelector((state) => state.auth.user);

  // -- LOCAL STATE --
  const [user, setUser] = useState(getFromLocalStorage("user"));
  const [settings, setSettings] = useState(getFromLocalStorage("settings"));
  
  // Limits from settings
  const minAmount = settings?.withdrawalLimits?.minimumAmount || 50;
  const maxAmount = settings?.withdrawalLimits?.maximumAmount || 300000;

  useEffect(() => {
    setUser(userData || getFromLocalStorage("user"));
    setSettings(getFromLocalStorage("settings"));
  }, [userData]);

  // -- CLOSE MODAL HANDLER --
  const hideModal = () => {
    dispatchRedux(setState("show_withdraw_modal", false));
    dispatchRedux(resetState("withdrawal_message"));
    dispatchRedux(resetState("error"));
  };

  // -- FORMIK SETUP --
  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    validationSchema: Yup.object().shape({
      amount: Yup.number()
        .required("Amount is required")
        .min(minAmount, `Minimum amount is KES ${minAmount}`)
        .max(maxAmount, `Maximum amount is KES ${maxAmount}`)
        .positive("Amount must be positive")
        .integer("Amount must be a whole number"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const payload = {
        amount: values.amount,
        msisdn: user?.msisdn || getFromLocalStorage("user")?.msisdn,
      };

      const data = { user: payload };

      try {
        setTrackingData(data);
        // Dispatching the thunk defined in your matchesSlice/dataSlice
        dispatchRedux(userWithdrawal(data));
        resetForm();
      } catch (error) {
        console.error("Withdrawal error:", error);
      }
    },
  });

  // -- NOTIFICATIONS (Ant Design) --
  const dispatchWithdrawMessage = useCallback(() => {
    if (successMessage) {
      notification.success({
        message: "Success",
        description: successMessage,
        className: "ant-notification",
        placement: "top",
        onClose: hideModal, // Close modal when notification is closed
      });
      // Automatically close modal after 1.5s on success
      setTimeout(() => hideModal(), 1500); 
    } else if (errorMessage) {
      notification.error({
        message: "Error",
        description: errorMessage,
        className: "ant-notification",
        placement: "top",
      });
    }
  }, [successMessage, errorMessage]);

  // Watch for success/error messages
  useEffect(() => {
    dispatchWithdrawMessage();
    
    // Auto-clear messages from Redux after 7.5s (matching your original logic)
    let timer;
    if (successMessage || errorMessage) {
         timer = setTimeout(() => {
            dispatchRedux(resetState("withdrawal_message"));
            dispatchRedux(resetState("error"));
        }, 7500);
    }

    return () => clearTimeout(timer);
  }, [dispatchWithdrawMessage, successMessage, errorMessage, dispatchRedux]);

  const balance = user?.balance || 0;

  return (
    <Modal
      show={showWithdrawModal}
      onHide={hideModal}
      className={"shadow-lg filters-modal deposit-modal deposit-modal-body"}
      dialogClassName={"modal-30w"}
      centered={true}
      size={"md"}
      backdrop={"static"}
      style={{ zIndex: "10000" }}
    >
      {/* --- HEADER --- */}
      <Modal.Header closeButton={false} className={"w-100"}>
        <Modal.Title
          className={"w-100"}
          style={{ backgroundColor: "var(--bet-fusion-primary !important)" }}
        >
          <div
            className={"d-flex justify-content-between align-items-end px-4"}
            style={{ backgroundColor: "var(--bet-fusion-primary !important)" }}
          >
            <div onClick={hideModal} style={{ cursor: "pointer" }}>
              <LeftOutlined className="gradient-icon" />
            </div>
            <strong
              style={{
                fontSize: "19px",
                fontWeight: "bolder",
                // letterSpacing: "2px",
                color: "var(--login-btn-cl)",
              }}
              className={"deposit-modal-top-title"}
            >
              Withdraw Funds
            </strong>

            <Button
              className={" bg-deposit-modal-btn"}
              style={{
                overflowX: "hidden",
                backgroundColor: "transparent",
                border: "none",
                color: "var(--login-btn-cl)",
              }}
              onClick={hideModal}
            >
              <CloseCircleFilled style={{ fontSize: "22px" }} />
            </Button>
          </div>
        </Modal.Title>
      </Modal.Header>

      {/* --- BODY --- */}
      <Modal.Body className={"deposit-modal-body"}>
        
        {/* <p className="text-white py-2 px-2 font-input text-start mb-2">
           Withdraw to M-PESA
        </p>
        <div className="input__desc mb-4 px-2">
            <small style={{color: 'var(--bet-fusion-grey)'}}>
               Daily M-PESA withdrawal Limits: Maximum KES {maxAmount.toLocaleString()}
            </small>
        </div> */}

        <div className="w-100" 
          style={{ 
            display: "flex", 
            flexDirection: "row", 
            justifyContent: "space-around",
            background: "linear-gradient(var(--bet-fusion-secondary) 0 0) padding-box, var(--bet-fusion-button-login) border-box",
            border: "2px solid transparent",
            borderRadius: "4px",
            padding: "20px"
          }}>
          {/* Cash Balance */}
          <div className="d-flex align-items-center px-2">
            <LazyLoadImage
              src={Wallet}
              className="mb-2 icon-large icon-white bg-none "
            />
          </div>
          <span> Available Balance: </span>
          <Title level={5} style={{ margin: 0, color: "var(--white)" }}>
            Ksh {formatNumber(balance)}
          </Title>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className={"d-flex gap-3 flex-column pt-3"}>
            <div className={"d-flex flex-column "}>
              
              <div
                className="form-control d-flex justify-content-start align-items-center"
                style={{ 
                    height: "50px", 
                    backgroundColor: "transparent",
                    border: formik.touched.amount && formik.errors.amount ? "1px solid red" : "" 
                }}
              >
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  autoComplete="off"
                  // Value logic ensures "KES " prefix only appears when user types
                  value={formik.values.amount ? `KES ${formik.values.amount}` : ""}
                  onChange={(e) => {
                    // Remove non-digits so we only store numbers in state
                    const rawValue = e.target.value.replace(/[^\d]/g, "");
                    formik.setFieldValue("amount", rawValue);
                  }}
                  onBlur={formik.handleBlur}
                  className="text-start w-100 pr-input p-2"
                  style={{ outline: "none", background: "var(--bet-fusion-secondary)", color: "var(--white)" }}
                  placeholder="Enter amount to withdraw (KES)"
                />
              </div>
              <label>Minimal withdraw amount 100kes</label>

              {formik.touched.amount && formik.errors.amount && (
                <div className="text-danger mt-1 px-1">
                    <small>{formik.errors.amount}</small>
                </div>
              )}
            </div>
          </div>

          <div className="col-12 text-center mt-4">
            <button
              type="submit"
              className="btn btn-lg w-100 deposit-button button-radius input-field btn-font deposit-modal btn bold d-flex justify-content-center align-items-center button-text-choice1"
              disabled={!formik.isValid || !formik.dirty || loadingWithdraw}
            >
              {loadingWithdraw ? (
                <div className="loader"></div>
              ) : (
                `Withdraw`
              )}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
});

export default WithdrawalModal;