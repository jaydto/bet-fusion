import { Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavLinks from "./NavLinks";
import { UserInfo } from "./UserInfo";
import useWindowDimensions from "./Dimensions";

const CustomNavbarBrand = ({ toggleMenu, user, checkDesktop }) => {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const isDesktop = width >= 1200;

  return (
    <Navbar.Brand
      className="e logo menu-control d-flex align-items-center w-100"
      title="Betfusion"
      style={{ gap: 0 }}
    >
      {/* Logo — fixed width matching sidebar */}
      <div
        style={{
          width: "var(--sidebar-width, 256px)",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          paddingLeft: "16px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "22px", letterSpacing: "-0.5px", lineHeight: 1 }}>
          <span style={{ color: "#E55F32" }}>bet</span><span style={{ color: "#fff" }}>fusion</span>
        </span>
      </div>

      {/* Search bar — centered in remaining space */}
      {isDesktop && (
        <div style={{ flex: 1, display: "flex", justifyContent: "center", padding: "0 24px" }}>
          <div style={{ position: "relative", width: "100%", maxWidth: 360 }}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#64748b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 15, height: 15, pointerEvents: "none" }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search games…"
              style={{
                width: "100%",
                background: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#e5e5e5",
                fontSize: "13px",
                padding: "7px 14px 7px 36px",
                outline: "none",
                fontFamily: "'Outfit', sans-serif",
              }}
            />
          </div>
        </div>
      )}

      {!isDesktop && <div style={{ flex: 1 }} />}

      <UserInfo profile={checkDesktop} />
    </Navbar.Brand>
  );
};

export default CustomNavbarBrand;
