import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdHomeFilled, MdSportsSoccer, MdLocalOffer, MdAccountCircle, MdAddCircle } from "react-icons/md";
import "./bottomNav.css";

const regularItems = [
  { label: "Home",    path: "/",           icon: <MdHomeFilled size={22} /> },
  { label: "Sports",  path: "/sports",     icon: <MdSportsSoccer size={22} /> },
  null, // centre FAB
  { label: "Promos",  path: "/promotions", icon: <MdLocalOffer size={22} /> },
  { label: "Profile", path: "/profile",    icon: <MdAccountCircle size={22} /> },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <nav className="bottom-nav">
      {regularItems.map((item, idx) => {
        if (item === null) {
          // Centre action button — Deposit
          return (
            <button
              key="deposit-fab"
              className="bottom-nav-fab"
              onClick={() => navigate("/deposit")}
              aria-label="Deposit"
            >
              <span className="bottom-nav-fab-icon">
                <MdAddCircle size={28} color="#fff" />
              </span>
              <span className="bottom-nav-label" style={{ color: "#fff", WebkitTextFillColor: "#fff" }}>Deposit</span>
            </button>
          );
        }
        return (
          <button
            key={item.path}
            className={`bottom-nav-item${isActive(item.path) ? " active" : ""}`}
            onClick={() => navigate(item.path)}
          >
            <span className="bottom-nav-icon">{item.icon}</span>
            <span className="bottom-nav-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
