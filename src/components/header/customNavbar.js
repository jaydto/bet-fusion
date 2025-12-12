import { Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import NavLinks from "./NavLinks";
import { UserInfo } from "./UserInfo";
import Menu from "../../assets/img/menu.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useWindowDimensions from "./Dimensions";

const CustomNavbarBrand = ({ toggleMenu, user, checkDesktop }) => {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();

  return (
    <Navbar.Brand
      className="e logo align-self-start menu-control d-flex justify-content-between w-100 "
      title="Betfusion"
    >
      <div
        className="col-6 logo-Betfusion resize-mobile d-flex align-items-center "
        style={{ marginLeft: "2px" }}
      >
        {/* Custom Menu Icon */}

        <div className="logo-section">
          <LazyLoadImage
            src={Logo}
            onClick={() => navigate("/")}
            alt="Betfusion"
            title="Betfusion"
            className={`image-size ${!user && "logo-top"}`}
            style={
              user
                ? { marginBottom: "0px", paddingLeft: "7px" }
                : { width: "auto" }
            }
          />
        </div>
        {/* Logo */}

        {/* <NavLinks /> */}
      </div>

      <UserInfo profile={checkDesktop} />
    </Navbar.Brand>
  );
};

export default CustomNavbarBrand;
