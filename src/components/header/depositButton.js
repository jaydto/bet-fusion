import React from 'react';
import DepositModal from "../modals/DepositModal";

const DepositTriggerButton = ({ isOpen, setIsOpen }) => {
  // Function to toggle modal visibility
  const toggleDepositModal = () => {
    console.log("isOpen", isOpen)
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-auto d-flex text-white align-items-start">
      <div className={"profile-wrap"}>
        {/* Button to trigger DepositModal */}
        <button
          className={"deposit-button size-font-user-action deposit-button-header bg-warning"}
          onClick={toggleDepositModal} // Toggle modal visibility on click
          title={'DEPOSIT FUNDS'}
        >
          <span>
            <strong style={{ fontSize: "15px", fontWeight: "700" }}>Deposit</strong>
          </span>
        </button>
      </div>
      
      {/* Render DepositModal based on isOpen prop */}
      
    </div>
  );
};

export default DepositTriggerButton;
