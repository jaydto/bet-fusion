import React, { useState, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "./UserInfo";
import useWindowDimensions from "./Dimensions";
import logo from "../../assets/img/logo.png";
import { useDispatch } from "react-redux";
import { setState as setStateV } from "../../redux/virtualsSlice";
import { ReactComponent as LightIcon } from "../../assets/icons/light.svg";
// Adjust the path to local-storage based on your folder structure
import { getFromLocalStorage, setLocalStorage } from "../utils/local-storage";

const SearchIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

const HamburgerIcon = () => (
    <svg viewBox="0 0 22 16" fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" style={{ width: 22, height: 16 }}>
        <line x1="0" y1="1"  x2="13" y2="1"  />
        <line x1="0" y1="8"  x2="17" y2="8"  />
        <line x1="0" y1="15" x2="22" y2="15" />
    </svg>
);

const MoonIcon = ({ style }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round" style={style}>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
);

const iconBtnStyle = {
    background: "transparent",
    border: "none",
    padding: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#94a3b8",
    borderRadius: "6px",
    transition: "color 0.15s, background 0.15s",
    flexShrink: 0,
};

const CustomNavbarBrand = ({ toggleMenu, user, checkDesktop }) => {
    const { width } = useWindowDimensions();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isDesktop = width >= 1200;

    // 1. Initialize theme from local storage or default to "dark"
    const [theme, setTheme] = useState(() => {
        const savedTheme = getFromLocalStorage("app-theme");
        return savedTheme ? savedTheme : "dark";
    });

    // 2. Apply the theme class to the document root whenever the theme changes
    useEffect(() => {
        if (theme === "light") {
            document.documentElement.classList.add("light-theme");
        } else {
            document.documentElement.classList.remove("light-theme");
        }
        // Save the new theme preference to local storage
        setLocalStorage("app-theme", theme);
    }, [theme]);

    // 3. Toggle function to flip the state
    const toggleTheme = () => {
        // setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    };

    return (
        <Navbar.Brand
            className="e logo menu-control d-flex align-items-center w-100"
            title="Betfusion"
            style={{ gap: 0, height: "100%", padding: 0 }}
        >
            {/* ── MOBILE layout: two rows ── */}
            {!isDesktop && (
                <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    {/* Row 1: logo + login/register */}
                    <div style={{ display: "flex", alignItems: "center", padding: "6px 12px" }}>
                        <div style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                            <img src={logo} alt="BetFusion" style={{ height: "18px", width: "auto" }} />
                        </div>
                        <div style={{ marginLeft: "auto" }}>
                            <UserInfo profile={checkDesktop} />
                        </div>
                    </div>

                    {/* Row 2: hamburger | search input | moon toggle */}
                    <div style={{ display: "flex", alignItems: "center", padding: "0 4px 6px" }}>
                        <button style={iconBtnStyle} onClick={toggleMenu} aria-label="Open menu">
                            <HamburgerIcon />
                        </button>
                        <div style={{ flex: 1, padding: "0 4px" }}>
                            <div style={{ position: "relative" }}>
                <span style={{
                    position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
                    pointerEvents: "none", color: "#64748b", display: "flex",
                }}>
                  <SearchIcon />
                </span>
                                <input
                                    type="text"
                                    placeholder="Search games..."
                                    onClick={() => dispatch(setStateV("casino_search_modal", true))}
                                    readOnly
                                    style={{
                                        width: "100%",
                                        background: "var(--bet-fusion-input)",
                                        border: "1px solid #1e2235",
                                        borderRadius: "8px",
                                        color: "#e5e5e5",
                                        fontSize: "13px",
                                        padding: "7px 10px 7px 32px",
                                        outline: "none",
                                        cursor: "pointer",
                                        fontFamily: "'Inter', sans-serif",
                                    }}
                                />
                            </div>
                        </div>
                        {/* Added onClick toggle to Mobile button */}
                        <button style={iconBtnStyle} aria-label="Toggle theme" onClick={toggleTheme}>
                            {theme === "light" ? (
                                <MoonIcon style={{ width: 18, height: 18, color: "#94a3b8" }} />
                            ) : (
                                <LightIcon style={{ width: 18, height: 18, color: "#fb8603" }} />
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* ── DESKTOP layout: search bar centered, auth on right ── */}
            {isDesktop && (
                <>
                    <div style={{ flex: 1, display: "flex", justifyContent: "center", padding: "0 24px" }}>
                        <div style={{ position: "relative", width: "100%", maxWidth: 640 }}>
                            <svg
                                viewBox="0 0 24 24" fill="none" stroke="#64748b"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, pointerEvents: "none" }}
                            >
                                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search events, teams, games..."
                                onClick={() => dispatch(setStateV("casino_search_modal", true))}
                                readOnly
                                style={{
                                    width: "100%",
                                    background: "var(--bet-fusion-input)",
                                    border: "1px solid #1e2235",
                                    borderRadius: "8px",
                                    color: "#e5e5e5",
                                    fontSize: "14px",
                                    padding: "10px 16px 10px 44px",
                                    outline: "none",
                                    fontFamily: "'Inter', sans-serif",
                                    transition: "border-color 0.15s",
                                    cursor: "pointer",
                                }}
                            />
                        </div>
                    </div>
                    {/* Added onClick toggle to Desktop button */}
                    <button style={{ ...iconBtnStyle, marginRight: "4px" }} aria-label="Toggle theme" onClick={toggleTheme}>
                        {theme === "light" ? (
                            <MoonIcon style={{ width: 18, height: 18, color: "#94a3b8" }} />
                        ) : (
                            <LightIcon style={{ width: 18, height: 18, color: "#fb8603" }} />
                        )}
                    </button>
                    <UserInfo profile={checkDesktop} />
                </>
            )}
        </Navbar.Brand>
    );
};

export default CustomNavbarBrand;
