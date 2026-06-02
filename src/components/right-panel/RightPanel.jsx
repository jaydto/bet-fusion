import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getFromLocalStorage } from "../utils/local-storage";
import promoData from "../pages/promotions/promo.json";
import { MdKeyboardArrowDown, MdHeadsetMic } from "react-icons/md";

const RightPanel = () => {
  const reduxUser = useSelector((state) => state.auth.user);
  const user = reduxUser || getFromLocalStorage("user");
  const promosRef = useRef(null);

  const activePromos = promoData.filter((p) => p.show).slice(0, 4);

  const scrollDown = () => {
    if (promosRef.current) {
      promosRef.current.scrollBy({ top: 180, behavior: "smooth" });
    }
  };

  return (
    <aside className="right-panel">
      {/* Profile row — links to /profile */}
      <Link to="/profile" className="rp-profile-row" style={{ textDecoration: "none" }}>
        <div className="rp-avatar-wrap">
          <svg viewBox="0 0 36 36" width="36" height="36" fill="none">
            <circle cx="18" cy="18" r="18" fill="#1e2235" />
            <circle cx="18" cy="14" r="6" fill="#fb8603" />
            <ellipse cx="18" cy="30" rx="11" ry="7" fill="#fb8603" />
          </svg>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, color: "#64748b", fontFamily: "'Inter', sans-serif" }}>My Account</div>
          <div className="rp-profile-label" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {user ? (user.msisdn || user.email || "Profile") : "Sign In"}
          </div>
        </div>
        <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" style={{ color: "#334155", flexShrink: 0 }}>
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
      </Link>

      {/* Logged-in actions */}
      {user && (
        <div className="rp-actions">
          <Link to="/withdraw" className="rp-btn rp-btn-secondary">Withdraw</Link>
          <Link
            to="/deposit"
            className="rp-btn rp-btn-primary"
            onClick={(e) => {
              e.preventDefault();
              document.dispatchEvent(new CustomEvent("openDepositModal"));
            }}
          >
            Deposit
          </Link>
        </div>
      )}

      {/* Promotions */}
      <div className="rp-section">
        <div className="rp-section-title">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 12 20 22 4 22 4 12" />
            <rect x="2" y="7" width="20" height="5" />
            <line x1="12" y1="22" x2="12" y2="7" />
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
          </svg>
          PROMOTIONS
        </div>
        <div className="rp-promos" ref={promosRef}>
          {activePromos.map((promo) => (
            <Link
              key={promo.id}
              to={`/promotions/promo?id=${promo.id}`}
              className="rp-promo-img-card"
            >
              {promo.src && (
                <img src={promo.src} alt={promo.name} className="rp-promo-img" />
              )}
            </Link>
          ))}
        </div>
        <button className="rp-scroll-btn" onClick={scrollDown} aria-label="Scroll promos">
          <MdKeyboardArrowDown size={18} />
        </button>
      </div>

      {/* Support */}
      <div className="rp-support-bar">
        <MdHeadsetMic size={16} />
        <span>Support</span>
      </div>
    </aside>
  );
};

export default RightPanel;
