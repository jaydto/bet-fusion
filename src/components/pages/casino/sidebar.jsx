import React, { useEffect, useState } from "react";
import { Button, Col, Layout, Menu, Row, Space, Typography } from "antd";
import {
  FileTextOutlined,
  FireOutlined,
  UserOutlined,
  PlayCircleOutlined,
  VideoCameraOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import fb2 from "../../../assets/img/facebook.png";
import em2 from "../../../assets/img/email.png";
import ch2 from "../../../assets/img/contact.png";
import Footer from "./footer";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Logo from "../../../assets/img/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useWindowDimensions from "../../header/Dimensions";
import { EmojiSmileFill } from "react-bootstrap-icons";
import { setState } from "../../../redux/authSlice";
import { getFromLocalStorage } from "../../utils/local-storage";
const { Text } = Typography;

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = () => {
  const { width } = useWindowDimensions();
  // Inside your component
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const [user, setUser] = useState(getFromLocalStorage("user"));

  useEffect(() => {
    setUser(getFromLocalStorage("user"));
  }, [getFromLocalStorage("user")]);

  const menuItems = [
    {
      key: "Games",
      label: "Games",
      children: [
        {
          key: "5",
          icon: <VideoCameraOutlined />,
          label: <Link to="/casino">Casino</Link>,
        },
        {
          key: "2",
          icon: <FireOutlined />,
          label: (
            <Link to="/casino/game-play?game=58046&status=0&game_name=AVIATOR">
              Aviator
            </Link>
          ),
        },
        {
          key: "3",
          icon: <UserOutlined />,
          label: (
            <Link to="/casino/game-play?game=58059&status=0&game_name=JetX">
              JetX
            </Link>
          ),
        },
      ],
    },
    {
      key: "6",
      icon: <GiftOutlined />,
      label: <Link to="/promotions">Promotions</Link>,
    },
    {
      key: "7",
      icon: <EmojiSmileFill />,
      label: <Link to="/profile">Profile</Link>,
    },
  ];

  // Conditionally add Login/Logout unless on /auth/login
  if (path !== "/auth/login") {
    menuItems.push({
      key: "8",
      label: (
        <Button
          type="link"
          onClick={() => navigate(user ? "/auth/logout" : "/auth/login")}
          className="auth-all-link"
        >
          {user ? "Logout" : "Login"}
        </Button>
      ),
    });
  }

  return (
    <Sider
      width={width <= 768 ? "100%" : "300px"}
      style={{
        background: "var(--jaza-bets-body-bg)",
        color: "var(--light)",
        position: "fixed",
        overflowY: "auto",
        height: "100vh",
        overflowX: "hidden",
      }}
    >
      <div
        className="logo-section sidebar-logo"
        style={{
          height: 50,
          display: width <= 768 ? "none" : "flex",
          alignItems: "center",
          padding: 24,
        }}
      >
        <LazyLoadImage
          src={Logo}
          onClick={() => navigate("/")}
          alt="Jazabets"
          title="Jazabets"
          style={{ width: "min-content", height: 30 }}
          className={`image-size`}
        />
      </div>

      {/* <div className="logo" /> */}
      <SimpleBar
        style={{
          background: "var(--jaza-bets-body-bg)",
          color: "var(--light)",
        }}
        
      >
        <Menu
          mode="inline"
          className="sidebar-menu-cs"
          defaultOpenKeys={["Games"]}
          items={menuItems}
          theme="dark"
        />
      </SimpleBar>
      {/* Footer inside sidebar */}
      <div style={{ maxHeight: "auto", overflow: "hidden" }}>
        <Footer />
      </div>

      <Col span={24} style={{ marginTop: 24 }}>
        <Row justify="center" gutter={16}>
          {[
            {
              img: ch2,
              label: "Live chat",
              href: "#", // update with actual live chat URL
            },
            {
              img: em2,
              label: "Email",
              href: "mailto:support@jazabets.com",
            },
            {
              img: fb2,
              label: "Facebook",
              href: "https://www.facebook.com/jazabets/",
            },
          ].map((item, idx) => (
            <Col key={idx}>
              <a
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <Space direction="vertical" align="center">
                  <LazyLoadImage
                    src={item.img}
                    alt={item.label}
                    height={30}
                    width={30}
                  />
                  <Text style={{ color: "white", fontSize: 12 }}>
                    {item.label}
                  </Text>
                </Space>
              </a>
            </Col>
          ))}
        </Row>
      </Col>

      <div
        style={{
          textAlign: "center",
          color: "var(--light)",
          padding: "10px 0",
        }}
      >
        ©2025 Jazabets. All Rights reserved.{" "}
      </div>
    </Sider>
  );
};

export default Sidebar;
