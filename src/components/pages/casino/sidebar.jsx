import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Logo from "../../../assets/img/logo.png";
import { getFromLocalStorage } from "../../utils/local-storage";
import "./sidebar.css";

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

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname + location.search;
  const [user, setUser] = useState(getFromLocalStorage("user"));

  useEffect(() => {
    setUser(getFromLocalStorage("user"));
  }, [location.pathname]);

  const isActive = (route) =>
    route === "/"
      ? location.pathname === "/"
      : path.startsWith(route);

  return (
    <aside className="sidebar-root">
      {/* Logo */}
      <div className="sidebar-logo-wrap" onClick={() => navigate("/")}>
        <LazyLoadImage
          src={Logo}
          alt="Betfusion"
          title="Betfusion"
          className="sidebar-logo-img"
        />
      </div>

      <div className="sidebar-divider" />

      <nav className="sidebar-nav">
        <NavItem
          to="/"
          active={isActive("/")}
          label="Originals"
          icon={
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.6-6.2-4.5-6.2 4.5 2.4-7.6-6.2-4.5h7.6z" />
            </svg>
          }
        />
        <NavItem
          to="/?section=popular"
          active={path === "/?section=popular"}
          label="Popular"
          icon={
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M13.5 0.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" />
            </svg>
          }
        />
        <NavItem
          to="/casino?categoryId=crash"
          active={path.includes("categoryId=crash")}
          label="Crash Games"
          icon={
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M7 2v11h3v9l7-12h-4l4-8z" />
            </svg>
          }
        />
        <NavItem
          to="/casino?categoryId=live"
          active={path.includes("categoryId=live")}
          label="Live Casino"
          icon={
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7.5 18c-.83 0-1.5-.67-1.5-1.5S6.67 15 7.5 15s1.5.67 1.5 1.5S8.33 18 7.5 18zm0-9C6.67 9 6 8.33 6 7.5S6.67 6 7.5 6 9 6.67 9 7.5 8.33 9 7.5 9zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-9c-.83 0-1.5-.67-1.5-1.5S15.67 6 16.5 6s1.5.67 1.5 1.5S17.33 9 16.5 9z" />
            </svg>
          }
        />
        <NavItem
          to="/casino?categoryId=game-shows"
          active={path.includes("categoryId=game-shows")}
          label="Game Shows"
          icon={
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" />
            </svg>
          }
        />

        <div className="sidebar-divider" />

        <a href="tel:0711156430" className="sidebar-nav-item sidebar-support">
          <span className="sidebar-nav-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
            </svg>
          </span>
          <span className="sidebar-nav-label">Live Support · 0711 156 430</span>
        </a>

        <NavItem
          to="/promotions"
          active={isActive("/promotions")}
          label="Refer & Earn"
          icon={
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
          }
        />

        <NavItem
          to="/profile"
          active={isActive("/profile")}
          label="VIP Club"
          badge="NEW"
          icon={
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
            </svg>
          }
        />

        <div className="sidebar-divider" />

        <NavItem
          to="/terms-and-conditions"
          active={isActive("/terms-and-conditions")}
          label="Terms & Conditions"
          icon={
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
            </svg>
          }
        />
        <NavItem
          to="/privacy-policy"
          active={isActive("/privacy-policy")}
          label="Privacy Policy"
          icon={
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
            </svg>
          }
        />
        <NavItem
          to="/responsible-gambling"
          active={isActive("/responsible-gambling")}
          label="Responsible Gaming"
          icon={
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
          }
        />

        <div className="sidebar-divider" />

        {!user && (
          <NavItem
            to="/auth/login"
            active={isActive("/auth/login")}
            label="Login"
            icon={
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z" />
              </svg>
            }
          />
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
