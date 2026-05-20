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
      {/* Logo + collapse area */}
      <div className="sidebar-logo-wrap" onClick={() => navigate("/")}>
        <span className="sidebar-casino-icon">🎰</span>
        <span className="sidebar-collapse-arrow">^</span>
      </div>

      <div className="sidebar-divider" />

      <nav className="sidebar-nav">
        <NavItem
          to="/"
          active={isActive("/")}
          label="Originals"
          icon="🎮"
        />
        <NavItem
          to="/?section=popular"
          active={path === "/?section=popular"}
          label="Popular"
          icon="🔥"
        />
        <NavItem
          to="/casino?categoryId=crash"
          active={path.includes("categoryId=crash")}
          label="Crash Games"
          icon="💥"
        />
        <NavItem
          to="/casino?categoryId=live"
          active={path.includes("categoryId=live")}
          label="Live Casino"
          icon="🎯"
        />
        <NavItem
          to="/casino?categoryId=game-shows"
          active={path.includes("categoryId=game-shows")}
          label="Game Shows"
          icon="🎪"
        />

        <div className="sidebar-divider" />

        <a href="tel:0711156430" className="sidebar-nav-item sidebar-support">
          <span className="sidebar-nav-icon">💬</span>
          <span className="sidebar-nav-label">Live Support · 0711 156 430</span>
        </a>

        <NavItem
          to="/promotions"
          active={isActive("/promotions")}
          label="Refer & Earn"
          icon="🎁"
        />

        <NavItem
          to="/profile"
          active={isActive("/profile")}
          label="VIP Club"
          badge="NEW"
          icon="👑"
        />

        <div className="sidebar-divider" />

        <NavItem
          to="/terms-and-conditions"
          active={isActive("/terms-and-conditions")}
          label="Terms & Conditions"
          icon="📋"
        />
        <NavItem
          to="/privacy-policy"
          active={isActive("/privacy-policy")}
          label="Privacy Policy"
          icon="🔒"
        />
        <NavItem
          to="/responsible-gambling"
          active={isActive("/responsible-gambling")}
          label="Responsible Gaming"
          icon="🛡️"
        />

        <div className="sidebar-divider" />

        {!user && (
          <NavItem
            to="/auth/login"
            active={isActive("/auth/login")}
            label="Login"
            icon="🔑"
          />
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
