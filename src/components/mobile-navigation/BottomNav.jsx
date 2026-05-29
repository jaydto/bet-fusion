import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { BsGift } from "react-icons/bs";
import { ReactComponent as CrashIcon } from "../../assets/icons/crash.svg";
import { ReactComponent as DepositIcon } from "../../assets/icons/deposit.svg";
import homePng from "../../assets/icons/home.png";
import "./bottomNav.css";

const activeFilter =
  "brightness(0) saturate(100%) invert(56%) sepia(88%) saturate(2000%) hue-rotate(5deg) brightness(102%)";

const regularItems = [
  {
    label: "Home",
    path: "/",
    icon: (active) => (
      <img
        src={homePng}
        alt="Home"
        width={22}
        height={22}
        style={{ filter: active ? activeFilter : "brightness(0) invert(0.5)", objectFit: "contain" }}
      />
    ),
  },
  {
    label: "Crash",
    path: "/casino?categoryId=crash",
    icon: (active) => (
      <CrashIcon width={22} height={22} style={{ filter: active ? activeFilter : "none" }} />
    ),
  },
  null, // centre FAB — Deposit
  {
    label: "Promos",
    path: "/promotions",
    icon: () => <BsGift size={20} />,
  },
  {
    label: "Profile",
    path: "/profile",
    icon: () => <MdAccountCircle size={22} />,
  },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    const [pathname, search] = path.split("?");
    if (search) return location.pathname.startsWith(pathname) && location.search.includes(search);
    return location.pathname.startsWith(pathname);
  };

  return (
    <nav className="bottom-nav">
      {regularItems.map((item, idx) => {
        if (item === null) {
          return (
            <button
              key="deposit-fab"
              className="bottom-nav-fab"
              onClick={() => navigate("/deposit")}
              aria-label="Deposit"
            >
              <span className="bottom-nav-fab-icon">
                <DepositIcon width={40} height={40} />
              </span>
              <span className="bottom-nav-label" style={{ color: "#fff", WebkitTextFillColor: "#fff" }}>
                Deposit
              </span>
            </button>
          );
        }
        const active = isActive(item.path);
        return (
          <button
            key={item.path}
            className={`bottom-nav-item${active ? " active" : ""}`}
            onClick={() => navigate(item.path)}
          >
            <span className="bottom-nav-icon">{item.icon(active)}</span>
            <span className="bottom-nav-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
