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
      {/* Balance / actions — only shown when logged in */}
      {user && (
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
          <span className="rp-dot rp-dot--green" /> Support
        </div>
        <a href="https://betfusion.ke" target="_blank" rel="noopener noreferrer" className="rp-support-link">
          betfusion.ke
        </a>
        <div className="rp-app-badges">
          <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="rp-badge">
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" style={{ marginRight: 4, flexShrink: 0 }}>
              <path d="M3.18 23.76c.3.17.64.24.99.19l.12-.04 11.05-11.05-2.85-2.85L3.18 23.76zm15.38-13.34L15.9 8.86 13.07 11.7l2.83 2.83 2.7-1.57c.77-.45.77-1.5-.04-1.94zM2.86.3A1.05 1.05 0 002.5 1.1v21.8c0 .33.13.62.36.83l.04.04 12.22-12.22v-.29L2.86.3zm9.76 9.47L3.18.23l.12-.04c.35-.05.69.02.99.19l11.3 6.5-2.97 2.89z"/>
            </svg>
            Google Play
          </a>
          <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="rp-badge">
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" style={{ marginRight: 4, flexShrink: 0 }}>
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            App Store
          </a>
        </div>
      </div>
    </aside>
  );
};

export default RightPanel;
