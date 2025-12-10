import React, { useContext, useEffect, useState } from "react";
import { Row, Typography } from "antd";

import { useNavigate } from "react-router-dom";
import HeaderLogin from "../header/top-login";
import { getFromLocalStorage} from "../utils/local-storage";

import { StoreContext } from "../../context/store";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import FormTitle from "./formTitle";
// import Logo from "../../assets/img/logo.png";

const { Title } = Typography;


const backgroundStyle = {
  // background: `url(${gameDay})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  // backgroundColor: "var(--bet-fusion-header-bg)",
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

 

  const LoginInstructions = () => {
    return (
      <p className={"text-white py-2 px-4 font-input text-center mb-4"}>
        Enter your phone number and password below to Login to your existing
        account. Otherwise click on Register with the same details to create a
        new account.
      </p>
    );
  };

  const { state } = useContext(StoreContext);

  return (
    <div
      style={{ height: "100vh", overflowX: "hidden" }}
      className="login-page-section"
    >
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
                <div className="d-flex justify-content-center position-logo-user-pages">
                  <Title level={2} style={{ color: "var(--light)" }}>
                    Welcome
                  </Title>{" "}
                </div>
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
                                ? state?.page_view === "/auth/signup"
                                  ? "/"
                                  : `${state?.page_view}`
                                : "/"
                            );
                          } else {
                            navigate(
                              getFromLocalStorage("ActiveLink") ===
                                "/auth/signup"
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
