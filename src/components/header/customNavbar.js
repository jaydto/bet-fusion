import { Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import NavLinks from "./NavLinks";
import { UserInfo } from "./UserInfo";
import Menu from "../../assets/img/menu.png";
import { LazyLoadImage } from "react-lazy-load-image-component";

const CustomNavbarBrand = ({ toggleMenu, user, checkDesktop }) => {
  const navigate = useNavigate();

  return (
    <Navbar.Brand
      className="e logo align-self-start menu-control d-flex justify-content-between w-100"
      title="BetDonjo"
    >
      <div
        className="col-7 logo-BetDonjo resize-mobile d-flex align-items-center mb-2"
        style={{ marginLeft: "2px" }}
      >
        {/* Custom Menu Icon */}
        <div
          className="col-1 button-toggle space-button desktop-menu"
          style={{
            width: "4.1rem",
            overflowY: "hidden",
            marginLeft: "0px",
          }}
        >
          <LazyLoadImage
            src={Menu}
            onClick={toggleMenu}
            alt="Menu"
            title="Menu"
            className="menu-size"
          />
        </div>

        {/* Logo */}
        <img
          src={Logo}
          onClick={() => navigate("/")}
          alt="BetDonjo"
          title="BetDonjo"
          className={`image-size ${!user && "logo-top"}`}
          style={
            user
              ? { marginBottom: "0px", paddingLeft: "7px" }
              : { width: "auto" }
          }
        />

        <NavLinks />
      </div>

      <UserInfo profile={checkDesktop} user={user} />
    </Navbar.Brand>
  );
};

export default CustomNavbarBrand;
