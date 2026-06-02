import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getFromLocalStorage } from "../../utils/local-storage";
import logo from "../../../assets/img/logo.png";
import { ReactComponent as PromotionsIcon } from "../../../assets/img/Promotions.svg";
import "./sidebar.css";


/* ── SVG icon set (paths sourced from Figma dark-mode assets) ── */
const icons = {
  sports: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.93 6h-2.95a15.65 15.65 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.92 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.99 7.99 0 0 1 5.08 16zm2.95-8H5.08a7.99 7.99 0 0 1 4.33-3.56A15.65 15.65 0 0 0 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/>
    </svg>
  ),
  originals: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"/>
    </svg>
  ),
  popular: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M13.5 0.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5 0.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
    </svg>
  ),
  crash: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M17.168 8H13L13.806 3.165C13.83 3.02165 13.8224 2.87479 13.7839 2.73466C13.7453 2.59453 13.6766 2.46448 13.5827 2.35359C13.4887 2.24269 13.3717 2.15361 13.2399 2.09254C13.108 2.03148 12.9643 1.9999 12.819 2H7.667C7.43044 2.00007 7.20156 2.084 7.02104 2.23688C6.84051 2.38976 6.72003 2.60168 6.681 2.835L5.014 12.835C4.99003 12.9783 4.99756 13.125 5.03607 13.2651C5.07458 13.4052 5.14314 13.5352 5.23698 13.646C5.33082 13.7569 5.44769 13.846 5.57947 13.9071C5.71124 13.9683 5.85474 14 6 14H10V22L18.01 9.541C18.1072 9.38987 18.1619 9.21535 18.1683 9.03577C18.1748 8.85619 18.1327 8.6782 18.0465 8.52051C17.9604 8.36282 17.8333 8.23126 17.6787 8.13967C17.5241 8.04807 17.3477 7.99983 17.168 8Z"/>
    </svg>
  ),
  aviator: (
    <svg viewBox="0 0 26 26" fill="currentColor" width="18" height="18">
      <path d="M18.3468 6.39492L16.4596 4.50776C15.8307 3.87942 16.4596 3.25001 17.089 3.87942L22.1211 8.91151C22.75 9.53984 22.1211 10.1693 21.4923 9.53984L19.6051 7.65321C19.6051 7.65321 19.6051 8.91151 18.3468 10.1693L17.0885 11.4275L21.9841 16.3226C22.1872 16.5257 22.3013 16.8012 22.3013 17.0885C22.3013 17.3758 22.1872 17.6513 21.9841 17.8544L21.3612 18.4779C21.213 18.6262 21.0249 18.7283 20.8199 18.7719C20.6148 18.8154 20.4015 18.7985 20.2058 18.7233L12.6853 15.8308L7.65321 19.6051L8.74467 21.788C8.79988 21.8978 8.81413 22.0238 8.78486 22.1432C8.75558 22.2626 8.6847 22.3676 8.58494 22.4394C8.48517 22.5113 8.36307 22.5452 8.24055 22.5351C8.11803 22.525 8.00312 22.4716 7.91646 22.3844L3.61563 18.0835C3.52774 17.997 3.47371 17.8819 3.46331 17.7589C3.4529 17.636 3.48681 17.5134 3.55891 17.4134C3.631 17.3133 3.73652 17.2423 3.8564 17.2132C3.97628 17.1841 4.1026 17.1989 4.21254 17.2548L6.39546 18.3468L10.1693 13.3147L7.27675 5.79421C7.20158 5.59861 7.18475 5.38541 7.2283 5.18044C7.27185 4.97546 7.37392 4.78752 7.52213 4.63938L8.14504 4.01646C8.24564 3.91582 8.36509 3.83598 8.49656 3.78151C8.62802 3.72704 8.76893 3.69901 8.91123 3.69901C9.05353 3.69901 9.19444 3.72704 9.3259 3.78151C9.45737 3.83598 9.57681 3.91582 9.67742 4.01646L14.5725 8.91096L15.8308 7.65321C17.089 6.39492 18.3468 6.39492 18.3468 6.39492Z"/>
    </svg>
  ),
  jetx: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M12.6891 0.454687C12.5719 0.178125 12.3 0 12 0C11.7 0 11.4281 0.178125 11.3109 0.454687L9.24375 5.27812C9.08437 5.65312 9 6.05156 9 6.45938V10.0688L2.25 14.0062V13.125C2.25 12.5016 1.74844 12 1.125 12C0.501562 12 0 12.5016 0 13.125V18.375C0 18.9984 0.501562 19.5 1.125 19.5C1.74844 19.5 2.25 18.9984 2.25 18.375V18H9V19.5328L6.25781 21.9375C6.09375 22.0781 6 22.2844 6 22.5V23.25C6 23.6625 6.3375 24 6.75 24H11.25V21C11.25 20.5875 11.5875 20.25 12 20.25C12.4125 20.25 12.75 20.5875 12.75 21V24H17.25C17.6625 24 18 23.6625 18 23.25V22.5C18 22.2844 17.9062 22.0781 17.7422 21.9375L15 19.5328V18H21.75V18.375C21.75 18.9984 22.2516 19.5 22.875 19.5C23.4984 19.5 24 18.9984 24 18.375V13.125C24 12.5016 23.4984 12 22.875 12C22.2516 12 21.75 12.5016 21.75 13.125V14.0062L15 10.0688V6.45938C15 6.05156 14.9156 5.65312 14.7562 5.27812L12.6891 0.454687Z"/>
    </svg>
  ),
  live: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M21 6h-7.59l3.29-3.29L16 2l-4 4l-4-4l-.71.71L10.59 6H3a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8a2 2 0 0 0-2-2m0 14H3V8h18zM9 10v8l7-4z"/>
    </svg>
  ),
  gameShows: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M20 4C20.5304 4 21.0391 4.21071 21.4142 4.58579C21.7893 4.96086 22 5.46957 22 6V16C22 17.11 21.11 18 20 18H24V20H0V18H4C3.46957 18 2.96086 17.7893 2.58579 17.4142C2.21071 17.0391 2 16.5304 2 16V6C2 4.89 2.89 4 4 4H20ZM20 6H4V16H20V6ZM12 12C14.21 12 16 12.9 16 14V15H8V14C8 12.9 9.79 12 12 12ZM12 7C12.5304 7 13.0391 7.21071 13.4142 7.58579C13.7893 7.96086 14 8.46957 14 9C14 9.53043 13.7893 10.0391 13.4142 10.4142C13.0391 10.7893 12.5304 11 12 11C10.89 11 10 10.11 10 9C10 7.89 10.9 7 12 7Z"/>
    </svg>
  ),
  slots: (
    <svg viewBox="0 0 22 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <path d="M6 9H3C2.46957 9 1.96086 8.78929 1.58579 8.41421C1.21071 8.03914 1 7.53043 1 7V3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H19C19.5304 1 20.0391 1.21071 20.4142 1.58579C20.7893 1.96086 21 2.46957 21 3V7C21 7.53043 20.7893 8.03914 20.4142 8.41421C20.0391 8.78929 19.5304 9 19 9H16M5 5H17"/>
      <path d="M16 5V13.3C16 14.2 15.1 15 14 15H8C6.9 15 6 14.3 6 13.3V5M10 5V15"/>
    </svg>
  ),
  support: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
    </svg>
  ),
  gift: (
    <svg viewBox="0 0 20 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <path d="M12.676 1.66048L6.024 4.85448C5.52193 5.09917 4.9509 5.16344 4.407 5.03648C4.17752 4.97956 3.94562 4.93285 3.712 4.89648C1.887 4.68948 0.75 6.13348 0.75 7.79448V8.70648C0.75 10.3665 1.887 11.8115 3.712 11.6025C3.94587 11.5679 4.17783 11.5215 4.407 11.4635C4.95101 11.3368 5.52205 11.4014 6.024 11.6465L12.676 14.8395C14.203 15.5725 14.967 15.9395 15.818 15.6535C16.67 15.3675 16.962 14.7545 17.546 13.5285C18.3385 11.8819 18.7501 10.0779 18.7501 8.25048C18.7501 6.42306 18.3385 4.6191 17.546 2.97248C16.962 1.74648 16.67 1.13248 15.818 0.847477C14.967 0.561477 14.203 0.926477 12.676 1.66048Z"/>
      <path d="M5.24999 11.2495V5.24948M9.20799 19.5195L7.71699 20.7495C4.35499 18.0835 4.76599 16.8125 4.76599 11.7495H5.89999C6.35999 14.6095 7.44499 15.9655 8.94299 16.9465C9.86499 17.5505 10.055 18.8215 9.20799 19.5195Z"/>
    </svg>
  ),
  crown: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
    </svg>
  ),
  document: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
    </svg>
  ),
  login: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"/>
    </svg>
  ),
  logout: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
    </svg>
  ),
  profile: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
  ),
  chevronLeft: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
    </svg>
  ),
  chevronRight: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
    </svg>
  ),
};

const NavItem = ({ to, icon, label, badge, active, onClick }) => (
  <Link
    to={to || "#"}
    onClick={onClick}
    className={`sidebar-nav-item${active ? " sidebar-nav-item--active" : ""}`}
  >
    <span className="sidebar-nav-icon">{icon}</span>
    <span className="sidebar-nav-label">{label}</span>
    {badge && <span className="sidebar-nav-badge">{badge}</span>}
  </Link>
);

const Sidebar = ({ mobileOpen = false, onMobileClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname + location.search;
  const [user, setUser] = useState(getFromLocalStorage("user"));
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setUser(getFromLocalStorage("user"));
  }, [location.pathname]);

  // Close mobile drawer on route change
  useEffect(() => {
    if (onMobileClose) onMobileClose();
  }, [location.pathname]);

  const isActive = (route) =>
    route === "/"
      ? location.pathname === "/"
      : path.startsWith(route);

  const rootClass = [
    "sidebar-root",
    collapsed ? "sidebar-root--collapsed" : "",
    mobileOpen ? "sidebar-root--mobile-open" : "",
  ].filter(Boolean).join(" ");

  return (
    <>
      {mobileOpen && (
        <div className="sidebar-backdrop" onClick={onMobileClose} />
      )}
      <aside className={rootClass}>
        {/* Logo area — mirrors header logo zone */}
        <div className="sidebar-logo-wrap" onClick={() => navigate("/")}>
          <img src={logo} alt="BetFusion" className="sidebar-logo-img" />
          <span
            className="sidebar-collapse-arrow"
            onClick={(e) => { e.stopPropagation(); setCollapsed(v => !v); }}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? icons.chevronRight : icons.chevronLeft}
          </span>
        </div>

        <div className="sidebar-divider" />

        <nav className="sidebar-nav">
          <div className="sidebar-section-title">CASINO</div>

          <NavItem to="/sports" active={path.startsWith("/sports")} label="Sports" icon={icons.sports} />
          <NavItem to="/" active={isActive("/")} label="Originals" icon={icons.originals} />
          <NavItem to="/?section=popular" active={path === "/?section=popular"} label="Popular" icon={icons.popular} />
          <NavItem to="/casino?categoryId=crash" active={path.includes("categoryId=crash")} label="Crash Games" icon={icons.crash} />
          <NavItem to="/casino/game-play?game=58630&status=0&game_name=AVIATOR" active={path.includes("game_name=AVIATOR")} label="Aviator" icon={icons.aviator} />
          <NavItem to="/casino/game-play?game=58059&status=0&game_name=JetX" active={path.includes("game_name=JetX")} label="JetX" icon={icons.jetx} />
          <NavItem
            to="/casino?categoryId=live"
            active={path.includes("categoryId=live")}
            label="Live Casino"
            icon={icons.live}
            badge={<span className="sidebar-live-dot" />}
          />
          <NavItem to="/casino?categoryId=slots" active={path.includes("categoryId=slots")} label="Slots" icon={icons.slots} />
          <NavItem to="/casino?categoryId=game-shows" active={path.includes("categoryId=game-shows")} label="Game Shows" icon={icons.gameShows} />

          <div className="sidebar-divider" />

          <a href="tel:0711156430" className="sidebar-nav-item sidebar-support-item">
            <span className="sidebar-nav-icon">{icons.support}</span>
            <span className="sidebar-nav-label">Live Support · 0711 156 430</span>
          </a>

          <NavItem to="/promotions" active={isActive("/promotions")} label="Promotions" icon={<PromotionsIcon width={18} height={18} />} />
          <NavItem to="/profile" active={isActive("/profile")} label="My Profile" icon={icons.profile} />

          <div className="sidebar-divider" />

          <NavItem to="/terms-and-conditions" active={isActive("/terms-and-conditions")} label="Terms & Conditions" icon={icons.document} />
          <NavItem to="/privacy-policy" active={isActive("/privacy-policy")} label="Privacy Policy" icon={icons.lock} />
          <NavItem to="/responsible-gambling" active={isActive("/responsible-gambling")} label="Responsible Gaming" icon={icons.shield} />

          <div className="sidebar-divider" />

          {!user ? (
            <NavItem to="/auth/login" active={isActive("/auth/login")} label="Login" icon={icons.login} />
          ) : (
            <NavItem to="/auth/logout" active={false} label="Logout" icon={icons.logout} />
          )}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
