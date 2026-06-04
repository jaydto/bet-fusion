import React, { useEffect, useState } from "react";
import "./component/newProfile.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faReply, faUser } from "@fortawesome/free-solid-svg-icons";
import { formatNumber } from "../../utils/betslip";
import { getFromLocalStorage, setLocalStorage } from "../../utils/local-storage";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "antd";
import { userBalance, userPromoPoints } from "../../../redux/authSlice";
import WithdrawalModal from "../../modals/WithdrawModal";
import { setState } from "../../../redux/dataSlice";
import JisortModal from "../../modals/JisortModal";
import SearchModal from "../../modals/SearchModal";

const { useBreakpoint } = Grid;

const NewProfile = React.memo(() => {
  const userData = useSelector((state) => state.auth.user);
  const [user, setUser] = useState(getFromLocalStorage("user"));
  const dispatchRedux = useDispatch();
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const casinoSearchModal = useSelector((state) => state.virtuals.casino_search_modal);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) setUser(userData || getFromLocalStorage("user"));
  }, [userData]);

  useEffect(() => {
    const abort = new AbortController();
    if (user) {
      const udata = { token: user.token };
      const userValues = { udata, user };
      dispatchRedux(userPromoPoints(userValues));
      dispatchRedux(userBalance(userValues));
    }
    return () => abort.abort();
  }, []);

    const hideJisortModal = () =>
        dispatchRedux(setState("show_jisort_modal", false));

    const showJisortModal = useSelector(
        (state) => state.data.show_jisort_modal
    );

    {showJisortModal && (
        <JisortModal
            visible={showJisortModal}
            setShowJisortModal={hideJisortModal}
        />
    )}

  const showDepModal = () => dispatchRedux(setState("show_deposit_modal", true));
  const handleWithdrawClick = () => dispatchRedux(setState("show_withdraw_modal", true));

  const balance = user?.balance || 0;

  // Format msisdn to display as +254 7XX XXX XXX
  const formatPhone = (msisdn) => {
    if (!msisdn) return "";
    const str = String(msisdn);
    if (str.startsWith("254") && str.length === 12) {
      return `+${str.slice(0, 3)} ${str.slice(3, 4)}${str.slice(4, 6)} ${str.slice(6, 9)} ${str.slice(9)}`;
    }
    return str;
  };

  return (
    <>
      {casinoSearchModal && <SearchModal />}
      <WithdrawalModal />
      {showJisortModal && (
        <JisortModal visible={showJisortModal} setShowJisortModal={hideJisortModal} />
      )}

      <div style={{ maxWidth: "500px", margin: "0 auto", padding: isMobile ? "0" : "24px 0" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "16px 20px",
            borderBottom: "1px solid #1e293b",
          }}
        >
          <button
            onClick={() => navigate(-1)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              padding: "4px 8px 4px 0",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#e2e8f0",
            }}
          >
            <FontAwesomeIcon icon={faReply} style={{ color: "#fb8603", transform: "scaleX(-1)" }} />
            <span style={{ fontSize: "17px", fontWeight: "600" }}>Profile</span>
          </button>
        </div>

        <div style={{ padding: "16px 20px" }}>
          {/* Avatar + phone + balance */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "16px" }}>
            {/* Avatar circle */}
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                backgroundColor: "#334155",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "10px",
              }}
            >
              <FontAwesomeIcon icon={faUser} style={{ fontSize: "32px", color: "#94a3b8" }} />
            </div>

            {/* Phone */}
            <div style={{ color: "#e2e8f0", fontSize: "17px", fontWeight: "600", marginBottom: "4px" }}>
              {formatPhone(user?.msisdn)}
            </div>

            {/* User ID */}
            {user?.profile_id && (
              <div style={{ color: "#64748b", fontSize: "13px", marginBottom: "10px" }}>
                ID: {user.profile_id}
              </div>
            )}

            {/* Wallet Balance label */}
            <div style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "6px" }}>
              Wallet Balance
            </div>

            {/* Balance box with gradient border */}
            <div
              style={{
                background: "linear-gradient(135deg, #e53e3e, #fb8603)",
                borderRadius: "10px",
                padding: "2px",
                display: "inline-block",
              }}
            >
              <div
                style={{
                  backgroundColor: "#0f172a",
                  borderRadius: "8px",
                  padding: "10px 32px",
                  textAlign: "center",
                }}
              >
                <div style={{ color: "#fff", fontSize: "22px", fontWeight: "700" }}>
                  KES {formatNumber(balance)}
                </div>
              </div>
            </div>
          </div>

          {/* Withdraw + Deposit buttons */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
            <button
              onClick={handleWithdrawClick}
              disabled={!user}
              style={{
                flex: 1,
                background: "var(--bet-fusion-btn-gradient)",
                border: "none",
                borderRadius: "10px",
                color: "#fff",
                fontWeight: "700",
                fontSize: "15px",
                padding: "13px",
                cursor: user ? "pointer" : "not-allowed",
                opacity: user ? 1 : 0.6,
              }}
            >
              Withdraw
            </button>
            <button
              onClick={showDepModal}
              disabled={!user}
              style={{
                flex: 1,
                background: "#fff",
                border: "none",
                borderRadius: "10px",
                color: "#000",
                fontWeight: "700",
                fontSize: "15px",
                padding: "13px",
                cursor: user ? "pointer" : "not-allowed",
                opacity: user ? 1 : 0.6,
              }}
            >
              Deposit
            </button>
          </div>

          {/* Menu items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "16px" }}>
              <MenuItem
                  label="Sort missing Deposit"
                  onClick={() =>
                      dispatchRedux(setState("show_jisort_modal", true))
                  }
              />
            <MenuItem
              label="Responsible Gaming"
              onClick={() => navigate("/responsible-gambling")}
            />
          </div>

          {/* Deactivate Account + Logout side by side */}
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => navigate("/responsible-gambling", { state: { activeTab: "self_exclusion" } })}
              style={{
                flex: 1,
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "10px",
                color: "#e2e8f0",
                fontWeight: "600",
                fontSize: "14px",
                padding: "13px",
                cursor: "pointer",
              }}
            >
              Deactivate Account
            </button>
            <button
              onClick={() => navigate("/auth/logout")}
              style={{
                flex: 1,
                background: "var(--bet-fusion-btn-gradient)",
                border: "none",
                borderRadius: "10px",
                color: "#fff",
                fontWeight: "700",
                fontSize: "14px",
                padding: "13px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
});

const MenuItem = ({ label, onClick }) => (
  <div
    onClick={onClick}
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#1e293b",
      borderRadius: "10px",
      padding: "14px 16px",
      cursor: "pointer",
      marginBottom: "8px",
    }}
  >
    <span style={{ color: "#e2e8f0", fontSize: "15px" }}>{label}</span>
    <FontAwesomeIcon icon={faAngleRight} style={{ color: "#64748b" }} />
  </div>
);

export default React.memo(NewProfile);
