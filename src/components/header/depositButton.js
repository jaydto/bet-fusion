import React from 'react';
import DepositModal from "../modals/DepositModal";

const DepositTriggerButton = ({ isOpen, setIsOpen }) => {
  const toggleDepositModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-auto d-flex text-white align-items-start">
      <div className={"profile-wrap"}>
        <button
          className={"deposit-button size-font-user-action deposit-button-header"}
          style={{ background: "linear-gradient(105deg, #FE6700 0%, #E4010D 100%)", color: "#fff", border: "none", borderRadius: 4, padding: "7px 13px" }}
          onClick={toggleDepositModal}
          title={'DEPOSIT FUNDS'}
        >
          <span>
            <strong style={{ fontSize: "15px", fontWeight: "700" }}>Deposit</strong>
          </span>
        </button>
      </div>
    </div>
  );
};

export default DepositTriggerButton;
