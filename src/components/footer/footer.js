import { Row, Col, Typography, Space, Grid, Divider } from "antd";
import { getFromLocalStorage } from "../utils/local-storage";
import Logo from "../../assets/img/logo.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ageIcon from "../../assets/img/18-plus.svg";
import receiptIcon from "../../assets/img/receipt.svg";

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
            <LazyLoadImage src={isLightTheme ? Logo : Logo} alt="Bet fusion Logo" style={{ height: 32 }} />
              <Title level={5} style={{ color: "var(--light)" }}>Betfusion 2026</Title>
          </Space>
        </Col>

        <Col xs={24} md={12} lg={6}>
          <Space direction="vertical" size="middle">
            <Title level={5} style={{ color: "var(--light)" }}>
              CATEGORIES
            </Title>
            {/* <Link to="/play?categoryId=slots" style={{ color: "var(--light)" }}>
              Slots
            </Link> */}
            <Link to="/play?categoryId=crash" style={{ color: "var(--light)" }}>
              Crash
            </Link>
            {/* <Link to="/casino" style={{ color: "var(--light)" }}>
              Casino
            </Link> */}
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
            <Link to="#" style={{ color: "var(--light)" }}>
              Levels
            </Link>
          </Space>
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
            <Link to="/how-to-play" style={{ color: "var(--light)" }}>
              How to Play
            </Link>
          </Space>
        </Col>
      </Row>

      <div style={{ margin: "2rem 0px"}}>
        <Divider style={{ margin: '1px 0', borderColor: 'var(--white)' }} />
      </div>
      <Row gutter={[32, 32]}>
        <Col xs={24} md={12} lg={12}>
          <Space direction="vertical" size="middle">
            <div style={{ display: "flex", flexDirection: "row", gap: "12px" }} >
              <LazyLoadImage src={ageIcon} alt="18+ icon" style={{ height: 52 }} />
              <Text style={{ color: "var(--light)", fontSize: "16px" }} > Age 18 and above only. Play Responsibly. Betting is addictive and can be psychologically harmful.</Text>
            </div>
          </Space>
        </Col>
        <Col xs={24} md={12} lg={12}>
          <Space direction="vertical" size="middle">
            <div style={{ display: "flex", flexDirection: "row", gap: "12px" }} >
              <LazyLoadImage src={receiptIcon} alt="receipt icon" style={{ height: 52 }} />
              <Text style={{ color: "var(--light)", fontSize: "16px" }} > Betfusion Limited is fully authorized and regulated by the BCLB (Betting Control and Licensing Board) 
                under the Betting, Lotteries and Gaming A Laws of Kenya, with License Numbers: BK 0001038.
              </Text>
            </div>
          </Space>
        </Col>
      </Row>

      {/* <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <Text style={{ color: "var(--light)" }}>
          Copyright © 2026 All Rights Reserved.
        </Text>
      </div> */}
    </div>
  );
};

export default Footer;