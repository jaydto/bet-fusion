import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Typography, Space, Button } from "antd";
import logo from "../../assets/img/logo.png"; // Adjust path if needed

const { Header } = Layout;
const { Text } = Typography;

const BackNavigationBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const isLoginPage = path === "/auth/login";
  const isSignupPage = path === "/auth/signup";

  return (
    <Header
      style={{
        background: "var(--jaza-bets-header-bg)",
        padding: "16px 5px",
        border: "none",
        display: "flex",
        opacity: 1,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{ height: 30 }}
        onClick={() => navigate("/")}
      />

      <Space>
        {isLoginPage && (
          <Button
            type="link"
            className="cg   login-size btn btn-button-bg-2 text-light"
            onClick={() => navigate("/auth/signup")}
          >
            Register
          </Button>
        )}
        {isSignupPage && (
          <Button
            type="link"
            className="cg  login-color login-size btn"
            onClick={() => navigate("/auth/login")}
          >
            Login
          </Button>
        )}
        {!isLoginPage && !isSignupPage && (
          <>
            <Button
              type="link"
              className="cg  login-color login-size btn"
              onClick={() => navigate("/auth/login")}
            >
              Login
            </Button>
            <Button
              type="link"
              className="cg   login-size btn btn-button-bg-2 text-light"
              onClick={() => navigate("/auth/signup")}
            >
              Signup
            </Button>
          </>
        )}
      </Space>
    </Header>
  );
};

export default BackNavigationBar;
