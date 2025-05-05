// import React, { useCallback, useContext, useEffect, useState } from "react";
// import { Col, notification, Row } from "antd";
// import authImg from "../../../assets/img/logo.png";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   getFromLocalStorage,
//   setLocalStorage,
//   setTrackingData,
// } from "../../utils/local-storage";
// import only18 from "../../../assets/img/auth/18only.png";
// import gameDay from "../../../assets/svg/game_bg.svg";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import { Form, Formik } from "formik";
// import Tab from "react-bootstrap/Tab";
// import Tabs from "react-bootstrap/Tabs";
// import { StoreContext } from "../../../context/store";
// import mpesa from "../../../assets/img/mpesa.png";
// import "./deposit.css";
// import Header2 from "../../header/Header2";
// import { userDeposits, setState, resetState } from "../../../redux/dataSlice";
// import { userBalance } from "../../../redux/authSlice";

import React, { useEffect } from "react";
import DepositModal from "../../modals/DepositModal";
import { use } from "react";
import { setState } from "../../../redux/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import { useDispatch, useSelector } from "react-redux";
// import JisortModal from "../../modals/JisortModal";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
// import { WithdrawForm } from "./Withdraw";

// const Deposit3 = React.memo((props) => {
//   const dispatchRedux = useDispatch();
//   const userData = useSelector((state) => state.auth.user);
//   const [user, setUser] = useState(getFromLocalStorage("user"));
//   const appConfigs = useSelector((state) => state.data.app_config);
//   const [settings, setSettings] = useState(getFromLocalStorage("settings"));
//   const successMessage = useSelector((state) => state.data.deposits_message);
//   const errorMessage = useSelector((state) => state.data.error);
//   const successMessageConfirmation = useSelector(
//     (state) => state.data.deposits_confirm_message
//   );
//   const navigate = useNavigate();

//   useEffect(() => {
//     setSettings(appConfigs || getFromLocalStorage("settings"));
//   }, [appConfigs]);

//   useEffect(() => {
//     setUser(userData || getFromLocalStorage("user"));
//   }, [userData]);

//   const setUtmCampaign = () => {
//     const utm_source = new URL(window.location).searchParams.get("utm_source");
//     const utm_campaign = new URL(window.location).searchParams.get(
//       "utm_campaign"
//     );
//     const btag = new URL(window.location).searchParams.get("btag");

//     if (utm_source) {
//       setLocalStorage("utm_source", utm_source);
//     }
//     if (utm_campaign) {
//       setLocalStorage("utm_campaign", utm_campaign);
//     }
//     if (btag) {
//       setLocalStorage("btag", btag);
//     }
//   };

//   useEffect(() => {
//     const abort = new AbortController();
//     setUtmCampaign();
//     return () => {
//       dispatchRedux(setState("deposits_message", null));
//       abort.abort(); // Cleanup function to abort the controller when the component unmounts.
//     };
//   }, [settings]);

//   const updateUserOnHistory = () => {
//     if (!user) {
//       return false;
//     }
//     let udata = {
//       token: user.token,
//     };
//     const userValues = {
//       udata: udata,
//       user: user,
//     };

//     dispatchRedux(userBalance(userValues));
//   };

//   useEffect(() => {
//     if (successMessage) {
//       updateUserOnHistory();
//     }
//   }, [successMessage]);

//   const FormTitle = ({tab}) => {
//     const navigate = useNavigate();

//     return (
//       <div
//         className="col-md-12 col-md-12  pt-lg-4 text-center text-light pb-3 text-center w-100 top-login-mobile"
//         style={{ margin: "0px" }}
//       >
//         <div>
//           <div
//             className={
//               " top-spacing d-flex justify-content-around m-auto px-1 align-items-center"
//             }
//             onClick={() => navigate(-1)}
//           >
//             <span
//               className="d-flex justify-content-start w-25 "
//               style={{ cursor: "pointer" }}
//             >
//               <FontAwesomeIcon
//                 icon={faAngleLeft}
//                 className={"back-navigation-icon"}
//               />{" "}
//             </span>

//             <span className={"w-50 d-flex justify-content-center"}>
//               <h4 className="inline-blockjazabets-text-light" style={{textTransform:"uppercase"}}>
//                 {tab} FUNDS (MOBILE MONEY)
//               </h4>{" "}
//             </span>
//             <span className="w-25"></span>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const Offer = React.memo(() => {
//     return (
//       <ul className={"paybill-offers-list-items"}>
//         {settings?.JazabetsDeposit?.map((deposit, index) => {
//           return (
//             <li key={index}>
//               {index + 1}. Only pay KES {deposit?.deposit_amount} to{" "}
//               {deposit?.display_text}
//             </li>
//           );
//         })}
//       </ul>
//     );
//   });

//   const dispatchDepositMessage = useCallback(() => {
//     if (successMessage !== null || successMessageConfirmation !== null) {
//       // Use Ant Design notification to display the success message
//       notification.success({
//         message: "Success",
//         description: successMessage ?? successMessageConfirmation,
//         className: "ant-notification",
//         placement: "top", // Set placement to top
//         onClick: () => {
//           console.log("Notification Clicked!");
//         },
//       });
//       navigate("/")
//     } else if (errorMessage !== null) {
//       notification.error({
//         message: "Error",
//         description: errorMessage,
//         className: "ant-notification",
//         placement: "top", // Set placement to top
//         onClick: () => {
//           console.log("Notification Clicked!");
//         },
//       });
//     }
//   }, [successMessage, successMessageConfirmation, errorMessage]);

//   useEffect(() => {
//     dispatchDepositMessage();
//     setTimeout(() => {
//       dispatchRedux(resetState("deposits_message"));
//       dispatchRedux(resetState("deposits_confirm_message"));
//       dispatchRedux(resetState("error"));
//     }, 7500);
//   }, [dispatchDepositMessage]);

//   const [activeTab, setActiveTab] = useState("deposit");
//   const handleTabSelect = (eventKey) => {
//     setActiveTab(eventKey);
//   };

//   return (
//     <div style={{ height: "100vh" }}>
//       <Row justify="center" className="align-items-stretch h-100">
//         <div
//           className={
//             "col-lg-8 col-sm-12 top-login-background-img-bg-down top-login-background-img-bg-page"
//           }
//         >
//           <div className="w-100 d-flex flex-column justify-content-center h-100 top-login-background-img-bg-page">
//             <div className={"width-page-centric deposit-page"}>
//               <FormTitle tab={activeTab}/>
//               {/*  */}
//               <div className={"w-100"}>
//                 <div className={"d-flex"}>
//                   {/**/}
//                   <div className={"size-deposit"}>
//                     <div className={"d-flex flex-row justify-content-between"}>
//                       <div className=" w-100">
//                         <div className="homepage d-flex  flex-column align-items-center  login-page user-page">
//                           <div className=" pb-0" data-backdrop="static">
//                             <Tabs
//                               variant={"tabs"}
//                               defaultActiveKey={activeTab}
//                               id=""
//                               className=" mb-3 px-3 mx-5"
//                               justify
//                               onSelect={handleTabSelect}
//                             >
//                               <Tab
//                                 eventKey="deposit"
//                                 title="Deposit"
//                                 className={""}
//                               >
//                                 <DepositForm />
//                               </Tab>
//                               <Tab
//                               eventKey="withdraw"
//                               title="Withdraw"
//                               className={""}>
//                                 <WithdrawForm/>
//                               </Tab>
//                             </Tabs>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>{" "}
//                   <div className="mt-4">{/*<LoginForm {...props}/>*/}</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Row>
//     </div>
//   );
// });

// const PaymentInstructions = (props) => {
//   return (
//     <>
//       <label className="Jazabets-text-light">Deposit Instructions</label>
//       <div className="container d-flex flex-column">
//         <div className="row">
//           <div className="coljazabets-text-light">
//             {" "}
//             1. Enter the amount you want to deposit.
//           </div>
//         </div>
//         <div className="row">
//           <div className="coljazabets-text-light">
//             {" "}
//             2. Click on the deposit button.
//           </div>
//         </div>
//         <div className="row">
//           <div className="coljazabets-text-light">
//             {" "}
//             3. Check your phone for an M-Pesa Request.
//           </div>
//         </div>
//         <div className="row">
//           <div className="coljazabets-text-light">
//             {" "}
//             4. Enter your M-Pesa Pin to confirm the transaction.
//           </div>
//         </div>
//         <div className="row">
//           <div className="coljazabets-text-light">
//             {" "}
//             5. On successful payment, you will receive an M-Pesa Confirmation.
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// const DepositFormFields = (props) => {
//   const {
//     values,
//     errors,
//     onFieldChanged,
//     setCurrentDepositValue,
//     currentDepositValue,
//   } = props;
//   const { state, dispatch } = useContext(StoreContext);
//   const userData = useSelector((state) => state.auth.user);
//   const appConfigs = useSelector((state) => state.data.app_config);
//   const loadingDeposit = useSelector((state) => state.data.deposit_loading);
//   const [settings, setSettings] = useState(getFromLocalStorage("settings"));
//   const [user, setUser] = useState(getFromLocalStorage("user"));

//   useEffect(() => {
//     setSettings(appConfigs?.message || getFromLocalStorage("settings"));
//   }, [appConfigs]);

//   useEffect(() => {
//     setUser(userData || getFromLocalStorage("user"));
//   }, [userData]);

//   const incrementDepositValue = (value) => {
//     dispatch({ type: "SET", key: "depositValue", payload: value });
//     setCurrentDepositValue(value); // Update the currentDepositValue state instead of values?.amount
//     onFieldChanged({ target: { name: "amount", value: value } });
//   };

//   return (
//     <>
//       <div className="form-group row d-flex justify-content-center deposit-widthdraw-input-desktop">
//         <div className={`col-md-12 w-100`}>
//           <div className={"d-flex "}>
//             <label className={"text-light deposit col-5 deposit-label"}>
//               Phone Number
//             </label>
//             <div className={"text-light col-7 text-end text-msisdn"}>
//               +{values.msisdn}
//             </div>
//           </div>
//           {!user && (
//             <input
//               onChange={(ev) => {
//                 onFieldChanged(ev);
//               }}
//               className="text-light deposit-input form-control input-field"
//               id="msisdn"
//               name="msisdn"
//               type="text"
//               value={values.msisdn}
//               placeholder="Enter Phone Number"
//             />
//           )}
//           {errors?.msisdn && (
//             <div className="text-danger"> {errors?.msisdn} </div>
//           )}
//         </div>
//       </div>
//       {user && <hr />}
//       <div className="form-group  d-flex flex-column justify-content-center mt-3 deposit-widthdraw-input-desktop">
//         <div
//           className="btn-group w-100 gap-3 justify-content-around"
//           role="group"
//           aria-label="Basic example"
//         >
//           <div className={"d-flex flex-wrap col-12 justify-content-between"}>
//             {settings?.JazabetsDeposit &&
//               settings?.JazabetsDeposit?.map((deposit, index) => {
//                 return (
//                   <div key={index} className={"col-3"}>
//                     <button
//                       type="button"
//                       onClick={() =>
//                         incrementDepositValue(deposit?.deposit_amount)
//                       }
//                       className="deposit-buttons-value  m-2 gap-3 "
//                     >
//                       <div className={"deposit-values"}>
//                         +&nbsp;{deposit?.deposit_amount}
//                       </div>
//                       <div className={"deposit_text"}>
//                         {deposit?.display_text}
//                       </div>
//                     </button>
//                   </div>
//                 );
//               })}
//           </div>
//         </div>
//         <div className="col-md-12 w-100 px-2">
//           <label className={"text-light deposit"}>Amount to Deposit</label>
//           <input
//             onChange={(ev) => {
//               onFieldChanged(ev);
//             }}
//             className="text-light deposit-input form-control col-md-12 input-field"
//             id="amount"
//             name="amount"
//             type="number"
//             value={
//               values.amount == ""
//                 ? state?.depositValues || currentDepositValue
//                 : currentDepositValue || values.amount
//             }
//             placeholder="Enter Amount"
//           />
//           {errors?.amount && (
//             <div className="text-danger"> {errors.amount} </div>
//           )}
//         </div>
//       </div>
//       <div className="form-group W-100 d-flex justify-content-left mb-4">
//         <div className=" d-flex align-items-start deposit-withdraw-button-desktop w-100 px-2">
//           <button
//             type={"submit"}
//             className="btn btn-lg w-100 deposit-button button-radius input-field btn-font  login-button2 btn bold d-flex justify-content-center align-items-center"
//             style={{ marginTop: "30px" }}
//             disabled={values?.amount == "" || loadingDeposit}
//           >
//             {loadingDeposit ? (
//               <div className="loader"></div>
//             ) : (
//               `DEPOSIT ${values?.amount}`
//             )}
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// const MyDepositForm = (props) => {
//   const {
//     errors,
//     values,
//     setFieldValue,
//     setCurrentDepositValue,
//     currentDepositValue,
//   } = props;

//   const onFieldChanged = (ev) => {
//     let field = ev.target.name;
//     let value = ev.target.value;
//     setCurrentDepositValue(ev.target.value);
//     setFieldValue(field, value);
//   };

//   const [showJisortModal, setShowJisortModal] = useState(false);
//   const [JisortData, setJisortData] = useState({});

//   return (
//     <>
//       {showJisortModal && (
//         <JisortModal
//           visible={showJisortModal}
//           payload={JisortData}
//           setShowJisortModal={setShowJisortModal}
//         />
//       )}
//       <Form className="shadow-sm rounded border-0 p-5">
//         <div className="pt-0">
//           <div className="row">
//             <div className="col-md-7 text-center">
//               <div className={`col-md-7 text-center`}>
//                 <LazyLoadImage src={mpesa} alt="" />
//               </div>
//             </div>

//             <DepositFormFields
//               onFieldChanged={onFieldChanged}
//               values={values}
//               errors={errors}
//               setCurrentDepositValue={setCurrentDepositValue} // Pass setCurrentDepositValue here
//               currentDepositValue={currentDepositValue} // Pass currentDepositValue here
//             />
//             <div
//               className={
//                 "d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"
//               }
//             >
//               <span
//                 style={{
//                   color: "#ea5d0b",
//                   fontSize: "15px",
//                   fontWeight: "600",
//                   boxshadow: "0 10px 20px rgba(0, 0, 0, 0.03)",
//                   padding: "7px 27px",
//                   border: " 1px solid",
//                   borderRadius: "10px",
//                 }}
//                 onClick={() => {
//                   setShowJisortModal(true);
//                 }}
//               >
//                 Jisort
//               </span>
//             </div>

//             <div className={``}>
//               <PaymentInstructions />
//             </div>
//           </div>
//         </div>
//       </Form>
//     </>
//   );
// };

// const DepositForm = (props) => {
//   const { state } = useContext(StoreContext);
//   const [currentDepositValue, setCurrentDepositValue] = useState(0); // New state for current deposit value
//   const depositValues = state?.depositValue || ""; // Initialize depositValues as an empty array if it's not available in the state
//   const dispatchRedux = useDispatch();
//   const userData = useSelector((state) => state.auth.user);

//   const [user, setUser] = useState(getFromLocalStorage("user"));

//   useEffect(() => {
//     setUser(userData || getFromLocalStorage("user"));
//   }, [userData]);

//   const initialValues = {
//     amount: depositValues || 100,
//     msisdn: user?.msisdn,
//   };
//   // const gaEventTracker = useAnalyticsEventTracker('Deposit')

//   const handleSubmit = (values) => {
//     setTrackingData(values);

//     dispatchRedux(userDeposits(values));
//   };

//   const validate = (values) => {
//     let errors = {};

//     if (!values.msisdn || !values.msisdn.match(/(254|0|)?[71]\d{8}/g)) {
//       errors.msisdn = "Please enter a valid phone number";
//     }

//     if (!values.amount || values.amount < 1 || values.amount > 150000) {
//       errors.amount = "Please enter amount between KES 1.00 and KES 150,000.00";
//     }
//     return errors;
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       onSubmit={handleSubmit}
//       validateOnChange={false}
//       validateOnBlur={false}
//       validate={validate}
//       render={(props) => (
//         <MyDepositForm
//           {...props}
//           setCurrentDepositValue={setCurrentDepositValue}
//           currentDepositValue={currentDepositValue}
//         />
//       )}
//     />
//   );
// };

// export default React.memo(Deposit3);

const Deposit3 = () => {
  const dispatch = useDispatch();
  const pathname = window.location.pathname;
  const navigate = useNavigate();

  const showDepositModal = useSelector(
    (state) => state.data.show_deposit_modal
  );

  useEffect(() => {
    console.log("pathname", pathname);
    dispatch(setState("show_deposit_modal", true)); // trigger modal
  }, [pathname]);

  useEffect(() => {
    if (!showDepositModal) {
      navigate("/");
    }
  }, [showDepositModal]);

  return <div>{showDepositModal && <DepositModal />}</div>;
};

export default React.memo(Deposit3);
