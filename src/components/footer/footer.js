import { Row, Col, Typography, Space, Grid } from "antd";
import { getFromLocalStorage } from "../utils/local-storage";
import Logo from "../../assets/img/logo.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const { useBreakpoint } = Grid;

const { Title, Text } = Typography;

const Footer = () => {
  
const theme = getFromLocalStorage("theme");
const [isLightTheme, setIsLightTheme] = useState(() => theme === "light");

  const screens = useBreakpoint();

  const isMobile = !screens.md;

  useEffect(() => {
    const theme = getFromLocalStorage("theme");
    setIsLightTheme(theme === "light");
  }, []);

  return (
    <div
      style={{
        background: "var(--footer-nav)",
        color: "var(--light)",
        padding: "24px",
        marginBottom: isMobile ? "6rem" : "0px",
        // borderTop: "1px solid var(--bet-fusion-yellow)",
      }}
    >
      <Row gutter={[32, 32]}>
        <Col xs={24} md={12} lg={6}>
          <Space direction="vertical" size="middle">
            <LazyLoadImage src={isLightTheme ? Logo : Logo} alt="Bet fusion Logo" style={{ height: 52 }} />
              <Title level={5} style={{ color: "var(--light)" }}>Betfusion 2025</Title>
          </Space>
        </Col>

        <Col xs={24} md={12} lg={6}>
          <Space direction="vertical" size="middle">
            <Title level={5} style={{ color: "var(--light)" }}>
              CATEGORIES
            </Title>
            <Link to="#" style={{ color: "var(--light)" }}>
              Slots
            </Link>
            <Link to="/casino?categoryId=crash" style={{ color: "var(--light)" }}>
              Crash
            </Link>
            <Link to="/casino" style={{ color: "var(--light)" }}>
              Casino
            </Link>
          </Space>
        </Col>

        <Col xs={24} md={12} lg={6}>
          <Space direction="vertical" size="middle">
            <Title level={5} style={{ color: "var(--light)" }}>
              PROMOTIONS
            </Title>
            <Link to="#" style={{ color: "var(--light)" }}>
              My Bonuses
            </Link>
          </Space>
          <Link to="#" style={{ color: "var(--light)" }}>
              Levels
            </Link>
        </Col>

        <Col xs={24} md={12} lg={6}>
          <Space direction="vertical" size="middle">
            <Title level={5} style={{ color: "var(--light)" }}>
              TERMS AND CONDITIONS
            </Title>
            <Link to="/terms-and-conditions" style={{ color: "var(--light)" }}>
              Terms and Conditions
            </Link>
            <Link to="/responsible-gambling" style={{ color: "var(--light)" }}>
              Responsible Gambling
            </Link>
            <Link to="/privacy-policy" style={{ color: "var(--light)" }}>
              Privacy Policy
            </Link>
            <Link to="/cookie-policy" style={{ color: "var(--light)" }}>
              Cookie Policy
            </Link>
          </Space>
        </Col>
      </Row>

      {/* <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <Text style={{ color: "var(--light)" }}>
          Copyright © 2025 All Rights Reserved.
        </Text>
      </div> */}
    </div>
  );
};

export default Footer;