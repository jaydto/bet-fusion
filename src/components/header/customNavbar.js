import { Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "./UserInfo";
import useWindowDimensions from "./Dimensions";
import logo from "../../assets/img/logo.png";
import { useDispatch } from "react-redux";
import { shouldShowSearch } from "../../redux/navigationAction";

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const HamburgerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 20, height: 20 }}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
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

  return (
    <Navbar.Brand
      className="e logo menu-control d-flex align-items-center w-100"
      title="Betfusion"
      style={{ gap: 0, height: "100%", padding: 0 }}
    >
      {/* ── MOBILE layout: hamburger | search input | theme toggle ── */}
      {!isDesktop && (
        <>
          {/* Left: hamburger */}
          <button
            style={{ ...iconBtnStyle, paddingLeft: "12px" }}
            onClick={toggleMenu}
            aria-label="Open menu"
          >
            <HamburgerIcon />
          </button>

          {/* Center: inline search input */}
          <div style={{ flex: 1, padding: "0 6px" }}>
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
                onClick={() => dispatch(shouldShowSearch())}
                readOnly
                style={{
                  width: "100%",
                  background: "#171A26",
                  border: "1px solid #1e2235",
                  borderRadius: "8px",
                  color: "#e5e5e5",
                  fontSize: "13px",
                  padding: "7px 10px 7px 32px",
                  outline: "none",
                  cursor: "pointer",
                  fontFamily: "'Outfit', sans-serif",
                }}
              />
            </div>
          </div>

          {/* Right: dark/light mode toggle */}
          <button style={{ ...iconBtnStyle, paddingRight: "12px" }} aria-label="Toggle theme">
            <MoonIcon />
          </button>
        </>
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
                style={{
                  width: "100%",
                  background: "#171A26",
                  border: "1px solid #1e2235",
                  borderRadius: "8px",
                  color: "#e5e5e5",
                  fontSize: "14px",
                  padding: "10px 16px 10px 44px",
                  outline: "none",
                  fontFamily: "'Outfit', sans-serif",
                  transition: "border-color 0.15s",
                }}
              />
            </div>
          </div>
          <UserInfo profile={checkDesktop} />
        </>
      )}
    </Navbar.Brand>
  );
};

export default CustomNavbarBrand;
