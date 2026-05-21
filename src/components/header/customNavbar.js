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
          <input
            type="text"
            placeholder="Search games…"
            style={{
              width: "100%",
              maxWidth: 360,
              background: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "8px",
              color: "#e5e5e5",
              fontSize: "13px",
              padding: "7px 14px",
              outline: "none",
              fontFamily: "'Outfit', sans-serif",
            }}
          />
        </div>
      )}

      {!isDesktop && <div style={{ flex: 1 }} />}

      <UserInfo profile={checkDesktop} />
    </Navbar.Brand>
  );
};

export default CustomNavbarBrand;
