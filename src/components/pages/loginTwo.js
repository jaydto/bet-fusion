import React, { useCallback, useContext, useEffect, useState } from "react";
import { Col, Row } from "antd";
import authImg from "../../assets/img/logo.png";
import gameDay from "../../assets/svg/game_bg.svg";

import { Link, useNavigate } from "react-router-dom";
import HeaderLogin from "../header/top-login";
import { getFromLocalStorage, setLocalStorage } from "../utils/local-storage";
import { toast } from "react-toastify";
import only18 from "../../assets/img/auth/18only.png";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { StoreContext } from "../../context/store";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const backgroundStyle = {
  // background: `url(${gameDay})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundColor:"var(--CrashKali-header-bg)",
  //   backgroundPosition:"bottom",
  backgroundAttachment: "fixed",
};

const LoginTwo = React.memo((props) => {
  // const {setUser} = props;
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.user);
  const [user, setUser] = useState(getFromLocalStorage("user"));

  useEffect(() => {
    if (userData) {
      setUser(userData || getFromLocalStorage("user"));
    }
  }, []);

  const FormTitle = () => {
    return (
      <div
        className="col-md-12 col-md-12  pt-lg-4 text-center text-light pb-3  text-center w-100 top-login-mobile"
        style={{ margin: "0px" }}
      >
        <div>
          <div
            className={
              " top-spacing d-flex justify-content-around m-auto px-1 align-items-center"
            }
            onClick={() => navigate('/')}
          >
            <span
              className="d-flex justify-content-lg-center justify-content-md-start px-3 w-25 "
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon
                icon={faAngleLeft}
                className={"back-navigation-icon"}
              />{" "}
            </span>

            <span className={"w-50 d-flex justify-content-center"}>
              <h4 className="inline-block form-title-centric">Login</h4>
            </span>
            <span className="w-25"></span>
          </div>
        </div>
      </div>
    );
  };

  const LoginInstructions = () => {
    return (
      <p className={"text-white py-2 px-4 font-input text-center mb-4"}>
        Enter your phone number and password below to Login to your existing
        account.
      </p>
    );
  };

  const { state } = useContext(StoreContext);

  return (
    <div style={{ height: "100vh", overflowX: "hidden" }}>
      <Row
        justify="center"
        className="align-items-stretch h-100"
        style={backgroundStyle}
      >
        <div
          className={
            "col-lg-10 col-sm-12 top-login-background-img-bg-down top-login-background-img-bg-page"
          }
        >
          <div className="w-100 d-flex flex-column justify-content-center h-100 top-login-background-img-bg-page">
            <div className={"width-page-centric "}>
              <FormTitle />

              <Row justify="center">
                <LoginInstructions />

                <div className={"d-flex"}>
                  {/**/}
                  <div>
                    {user
                      ? setTimeout(() => {
                          if (
                            getFromLocalStorage("ActiveLink") == undefined ||
                            getFromLocalStorage("ActiveLink") == null
                          ) {
                            return navigate(
                              state?.page_view
                                ? state?.page_view === "/signup"
                                  ? "/"
                                  : `${state?.page_view}`
                                : "/"
                            );
                          } else {
                            navigate(
                              getFromLocalStorage("ActiveLink") === "/signup"
                                ? "/"
                                : getFromLocalStorage("ActiveLink")
                            );
                            localStorage.removeItem("ActiveLink");
                          }
                        }, 500)
                      : ""}
                    <div className={"d-flex flex-row justify-content-between"}>
                      <div className=" w-100">
                        <div className="homepage d-flex flex-column align-items-center justify-content-center login-page">
                          <HeaderLogin setUser={setUser} login={true} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4"></div>
                </div>
              </Row>
            </div>
          </div>
        </div>
      </Row>
    </div>
  );
});

export default React.memo(LoginTwo);
