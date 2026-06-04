import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { BsGift } from "react-icons/bs";
import { ReactComponent as SportsIcon } from "../../assets/icons/sports.svg";
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
        label: "Sports",
        path: "/sports",
        icon: (active) => (
            <SportsIcon width={22} height={22} style={{ filter: active ? activeFilter : "none" }} />
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
        <nav
            className="bottom-nav"
            style={{
                background: "var(--bet-fusion-primary)",
                borderTop: "1px solid var(--bet-fusion-shadow-borders)",
                transition: "background 0.3s, border-color 0.3s"
            }}
        >
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
                            <span
                                className="bottom-nav-label"
                                style={{
                                    color: "var(--footer-color)",
                                    WebkitTextFillColor: "var(--footer-color)"
                                }}
                            >
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
                        style={{
                            color: active ? "var(--blue)" : "var(--grey)",
                            transition: "color 0.2s"
                        }}
                    >
                        {/* The React Icons (BsGift, MdAccountCircle) will automatically inherit this parent color! */}
                        <span className="bottom-nav-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              {item.icon(active)}
            </span>
                        <span className="bottom-nav-label">{item.label}</span>
                    </button>
                );
            })}
        </nav>
    );
};

export default BottomNav;
