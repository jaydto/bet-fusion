import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getFromLocalStorage } from "../../utils/local-storage";
import "./sidebar.css";

/* ── SVG icon set ── */
const icons = {
  football: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 3.3l1.35-.95c1.82.56 3.37 1.76 4.38 3.34l-.39 1.34-1.35.46L13 6.7V5.3zm-3.35-.95L11 5.3v1.4L7.01 9.49l-1.35-.46-.39-1.34c1.01-1.58 2.56-2.78 4.38-3.34zM7.08 17.11l-1.14.1A7.938 7.938 0 014 12c0-.73.11-1.43.3-2.1l1.07-.36 1.28.73L7.08 15l-.01 2.11zm5.42 2.81c-1.04.1-2.11-.04-3.12-.41l-.63-1.2.72-1.06h4.89l.78 1.06-.63 1.2c-1.01.37-2.08.51-3.01.41zm4.43-2.91l-1.14-.1v-2.11l.43-4.73 1.28-.73 1.07.36c.19.67.3 1.37.3 2.1a7.94 7.94 0 01-1.94 5.21z"/>
    </svg>
  ),
  basketball: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4.08 13H7c.14 1.46.67 2.8 1.46 3.93L6.29 19.1A8.017 8.017 0 014.08 13zM7 11H4.08A8.017 8.017 0 016.29 4.9l2.17 2.17C7.67 8.2 7.14 9.54 7 11zm3.5 8.88V16.5c.97.31 1.99.48 3 .5l-.05.03c-1.02-.01-2.02-.15-2.95-.15zM13 16.5v3.38c-.93 0-1.93.14-2.95.15L10 19.99c1.01-.02 2.03-.19 3-.49zm2.5 3.38V16.5c.97.31 1.99.48 3 .5A8.009 8.009 0 0115.5 19.88zm4.42-6.88H17c-.14-1.46-.67-2.8-1.46-3.93l2.17-2.17A8.017 8.017 0 0119.92 13zm-4.42-9.88V6.5c-.97-.31-1.99-.48-3-.5l.05-.03c1.02.01 2.02.15 2.95.15zM11 7.5V4.12C11.97 4.43 12.99 4.6 14 4.62l-.05.03c-1.01.01-2.02.15-2.95.15zM11 9h2v6h-2V9z"/>
    </svg>
  ),
  tennis: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M19.07 4.93A9.978 9.978 0 0012 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10c0-2.76-1.12-5.26-2.93-7.07zm-3.53 1.18c.78.85 1.37 1.86 1.71 2.96-1.1.34-2.11.93-2.96 1.71L12.7 9.19l2.84-3.08zM12 4c1 0 1.96.2 2.84.53L12 7.41 9.16 4.53C10.04 4.2 11 4 12 4zM4 12c0-1.87.64-3.59 1.71-4.96l3.37 3.37-3.37 3.37A7.94 7.94 0 014 12zm3.93 6.07c-.78-.85-1.37-1.86-1.71-2.96 1.1-.34 2.11-.93 2.96-1.71l1.59 1.59-2.84 3.08zM12 20c-1 0-1.96-.2-2.84-.53L12 16.59l2.84 2.88C14.04 19.8 13 20 12 20zm5.66-2.34a7.886 7.886 0 01-1.42 1.27l-1.41-1.41 3.37-3.37.37.37c-.3.67-.67 1.3-1.12 1.84l.21.3zm-1.34-6.95l-3.37 3.37-1.59-1.59c.85-.78 1.44-1.79 1.78-2.89 1.1.34 2.11.93 2.96 1.71l.22.4z"/>
    </svg>
  ),
  rugby: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M19.87 4.13C18.08 2.34 15.41 1.5 12 1.5S5.92 2.34 4.13 4.13C2.34 5.92 1.5 8.59 1.5 12s.84 6.08 2.63 7.87C5.92 21.66 8.59 22.5 12 22.5s6.08-.84 7.87-2.63C21.66 18.08 22.5 15.41 22.5 12s-.84-6.08-2.63-7.87zm-1.41 14.13C17.1 19.62 14.76 20.5 12 20.5s-5.1-.88-6.46-2.24C4.18 16.9 3.5 14.76 3.5 12c0-2.76.68-4.9 2.04-6.26C6.9 4.38 9.24 3.5 12 3.5s5.1.88 6.46 2.24C19.82 7.1 20.5 9.24 20.5 12c0 2.76-.68 4.9-2.04 6.26zM12 7l-5 5 5 5 5-5-5-5z"/>
    </svg>
  ),
  sports: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
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
      <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z"/>
    </svg>
  ),
  live: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
    </svg>
  ),
  gameShows: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5S14.67 12 15.5 12s1.5.67 1.5 1.5S16.33 15 15.5 15zm3-3c-.83 0-1.5-.67-1.5-1.5S17.67 9 18.5 9s1.5.67 1.5 1.5S19.33 12 18.5 12z"/>
    </svg>
  ),
  support: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
    </svg>
  ),
  gift: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 12 7.4l3.38 4.6L17 10.83 14.92 8H20v6z"/>
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
  chevronLeft: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
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
      {/* Logo area — mirrors header logo zone */}
      <div className="sidebar-logo-wrap" onClick={() => navigate("/")}>
        <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "20px", letterSpacing: "-0.5px", lineHeight: 1 }}>
          <span style={{ color: "#E55F32" }}>bet</span><span style={{ color: "#fff" }}>fusion</span>
        </span>
        <span className="sidebar-collapse-arrow">{icons.chevronLeft}</span>
      </div>

      <div className="sidebar-divider" />

      <nav className="sidebar-nav">
        <div className="sidebar-section-title">TOP EVENTS</div>
        <NavItem to="/sports?sport=football" active={path.includes("sport=football")} label="Football" icon={icons.football} />
        <NavItem to="/sports?sport=basketball" active={path.includes("sport=basketball")} label="Basketball" icon={icons.basketball} />
        <NavItem to="/sports?sport=tennis" active={path.includes("sport=tennis")} label="Tennis" icon={icons.tennis} />
        <NavItem to="/sports?sport=rugby" active={path.includes("sport=rugby")} label="Rugby" icon={icons.rugby} />
        <NavItem to="/sports" active={path === "/sports"} label="All Sports" icon={icons.sports} />

        <div className="sidebar-divider" />
        <div className="sidebar-section-title">CASINO</div>

        <NavItem to="/" active={isActive("/")} label="Originals" icon={icons.originals} />
        <NavItem to="/?section=popular" active={path === "/?section=popular"} label="Popular" icon={icons.popular} />
        <NavItem to="/casino?categoryId=crash" active={path.includes("categoryId=crash")} label="Crash Games" icon={icons.crash} />
        <NavItem
          to="/casino?categoryId=live"
          active={path.includes("categoryId=live")}
          label="Live Casino"
          icon={icons.live}
          badge={<span className="sidebar-live-dot" />}
        />
        <NavItem to="/casino?categoryId=game-shows" active={path.includes("categoryId=game-shows")} label="Game Shows" icon={icons.gameShows} />

        <div className="sidebar-divider" />

        <a href="tel:0711156430" className="sidebar-nav-item sidebar-support-item">
          <span className="sidebar-nav-icon">{icons.support}</span>
          <span className="sidebar-nav-label">Live Support · 0711 156 430</span>
        </a>

        <NavItem to="/promotions" active={isActive("/promotions")} label="Refer & Earn" icon={icons.gift} />
        <NavItem to="/profile" active={isActive("/profile")} label="VIP Club" badge="NEW" icon={icons.crown} />

        <div className="sidebar-divider" />

        <NavItem to="/terms-and-conditions" active={isActive("/terms-and-conditions")} label="Terms & Conditions" icon={icons.document} />
        <NavItem to="/privacy-policy" active={isActive("/privacy-policy")} label="Privacy Policy" icon={icons.lock} />
        <NavItem to="/responsible-gambling" active={isActive("/responsible-gambling")} label="Responsible Gaming" icon={icons.shield} />

        <div className="sidebar-divider" />

        {!user && (
          <NavItem to="/auth/login" active={isActive("/auth/login")} label="Login" icon={icons.login} />
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
