

import React, { useEffect } from "react";
import { setState } from "../../../redux/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Deposit3 = () => {
  const dispatch = useDispatch();
  const pathname = window.location.pathname;
  const navigate = useNavigate();

  const showDepositModal = useSelector(
    (state) => state.data.show_deposit_modal
  );

  useEffect(() => {
    dispatch(setState("show_deposit_modal", true));
  }, [pathname]);

  useEffect(() => {
    if (!showDepositModal) {
      navigate("/");
    }
  }, [showDepositModal]);

  return null;
};

export default React.memo(Deposit3);
