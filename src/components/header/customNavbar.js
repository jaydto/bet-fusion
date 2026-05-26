import { Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavLinks from "./NavLinks";
import { UserInfo } from "./UserInfo";
import useWindowDimensions from "./Dimensions";
import logo from "../../assets/img/logo.png";

const CustomNavbarBrand = ({ toggleMenu, user, checkDesktop }) => {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const isDesktop = width >= 1200;

  return (
    <Navbar.Brand
      className="e logo menu-control d-flex align-items-center w-100"
      title="Betfusion"
      style={{ gap: 0, height: "100%", padding: 0 }}
    >
      {/* On Mobile: Show Logo on the left */}
      {!isDesktop && (
        <div
          style={{ display: "flex", alignItems: "center", paddingLeft: "16px", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="BetFusion" style={{ height: "28px", width: "auto" }} />
        </div>
      )}

      {/* Search bar — centered on desktop */}
      {isDesktop && (
        <div style={{ flex: 1, display: "flex", justifyContent: "center", padding: "0 24px" }}>
          <div style={{ position: "relative", width: "100%", maxWidth: 640 }}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#64748b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, pointerEvents: "none" }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search events, teams, games..."
              style={{
                width: "100%",
                background: "#1e293b",
                border: "1px solid #334155",
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
      )}

      {!isDesktop && <div style={{ flex: 1 }} />}

      <UserInfo profile={checkDesktop} />
    </Navbar.Brand>
  );
};

export default CustomNavbarBrand;
