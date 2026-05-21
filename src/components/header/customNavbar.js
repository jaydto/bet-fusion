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
      className="e logo align-self-start menu-control d-flex justify-content-between w-100 align-items-center"
      title="Betfusion"
    >
      <div
        className="col-6 logo-Betfusion resize-mobile d-flex align-items-center"
        style={{ marginLeft: "2px" }}
      >
        <div className="logo-section" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "22px", letterSpacing: "-0.5px" }}>
            <span style={{ color: "#E55F32" }}>bet</span><span style={{ color: "#fff" }}>fusion</span>
          </span>
        </div>
      </div>

      {isDesktop && (
        <div style={{ flex: 1, maxWidth: 320, margin: "0 24px" }}>
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
              padding: "7px 14px",
              outline: "none",
              fontFamily: "'Outfit', sans-serif",
            }}
          />
        </div>
      )}

      <UserInfo profile={checkDesktop} />
    </Navbar.Brand>
  );
};

export default CustomNavbarBrand;
