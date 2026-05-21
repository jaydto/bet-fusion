import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getFromLocalStorage } from "../utils/local-storage";
import { formatNumber } from "../utils/betslip";
import promoData from "../pages/promotions/promo.json";

const RightPanel = () => {
  const reduxUser = useSelector((state) => state.auth.user);
  const user = reduxUser || getFromLocalStorage("user");

  const activePromos = promoData.filter((p) => p.show).slice(0, 2);

  return (
    <aside className="right-panel">
      {/* Auth / Balance */}
      {user ? (
        <div className="rp-profile">
          <div className="rp-avatar">
            <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
              <circle cx="20" cy="20" r="20" fill="#1e293b" />
              <circle cx="20" cy="16" r="7" fill="#334155" />
              <ellipse cx="20" cy="34" rx="12" ry="7" fill="#334155" />
            </svg>
          </div>
          <div className="rp-msisdn">{user.msisdn}</div>
          <div className="rp-balance">KES {formatNumber(user.balance || 0)}</div>
          <div className="rp-actions">
            <Link to="/withdraw" className="rp-btn rp-btn-secondary">Withdraw</Link>
            <Link to="/deposit" className="rp-btn rp-btn-primary" onClick={(e) => { e.preventDefault(); document.dispatchEvent(new CustomEvent("openDepositModal")); }}>Deposit</Link>
          </div>
        </div>
      ) : (
        <div className="rp-auth">
          <Link to="/auth/login" className="rp-btn rp-btn-secondary">Login</Link>
          <Link to="/auth/signup" className="rp-btn rp-btn-primary">Register</Link>
        </div>
      )}

      {/* Promotions */}
      <div className="rp-section">
        <div className="rp-section-title">PROMOTIONS</div>
        <div className="rp-promos">
          {activePromos.map((promo) => (
            <Link key={promo.id} to={`/promotions/promo?id=${promo.id}`} className="rp-promo-card">
              {promo.src && (
                <img src={promo.src} alt={promo.name} className="rp-promo-img" />
              )}
              <div className="rp-promo-name">{promo.name}</div>
              <div className="rp-promo-summary">{promo.summary}</div>
              <span className="rp-promo-cta">Read More</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Support */}
      <div className="rp-section">
        <div className="rp-section-title">
          <span className="rp-dot" /> Support
        </div>
        <a href="https://betfusion.ke" target="_blank" rel="noopener noreferrer" className="rp-support-link">
          betfusion.ke
        </a>
        <div className="rp-app-badges">
          <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="rp-badge">
            Google Play
          </a>
          <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="rp-badge">
            App Store
          </a>
        </div>
      </div>
    </aside>
  );
};

export default RightPanel;
