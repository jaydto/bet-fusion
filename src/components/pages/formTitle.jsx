import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

 const FormTitle = () => {
    const navigate = useNavigate();
    return (
      <div
        className="col-md-12 col-md-12  pt-lg-4 text-center text-light pb-3  text-center w-100 top-login-mobile"
        style={{ margin: "0px" }}
      >
        <div>
          <div
            className={
              " top-spacing d-flex justify-content-around m-auto px-1 align-items-center top-separator py-3"
            }
            onClick={() => navigate("/")}
          >
            <span
              className="d-flex justify-content-lg-center justify-content-md-start px-3 w-25 "
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon
                icon={faAngleLeft}
                className={"back-navigation-icon"}
              />{" "}
              <span className="px-3"> Back </span>
            </span>

            <span className={"w-50 d-flex justify-content-center"}>
              {/* <h4 className="inline-block form-title-centric">Login</h4> */}
            </span>
            <span className="w-25"></span>
          </div>
        </div>
      </div>
    );
  };

  export default FormTitle