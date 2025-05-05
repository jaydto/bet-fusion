import React from "react";
import { Col, Layout, Menu, Row, Space, Typography } from "antd";
import {
  FileTextOutlined,
  FireOutlined,
  UserOutlined,
  PlayCircleOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import fb2 from "../../../assets/img/facebook.png";
import em2 from "../../../assets/img/email.png";
import ch2 from "../../../assets/img/contact.png";
import Footer from "./footer";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Logo from "../../../assets/img/logo.png";
import { useNavigate } from "react-router-dom";
const { Title, Paragraph, Text } = Typography;

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <Sider
      width={300}
      style={{
        background: "var(--jaza-bets-body-bg)",
        color: "var(--light)",
        position: "fixed",
        overflowY: "auto",
        height: "100vh",
        overflowX: "hidden",
      }}
    >
      <div className="logo-section">
        <LazyLoadImage
          src={Logo}
          onClick={() => navigate("/")}
          alt="Jazabets"
          title="Jazabets"
          className={`image-size`}
        />
      </div>

      <div className="logo" />
      <SimpleBar
        style={{
          background: "var(--jaza-bets-body-bg)",
          color: "var(--light)",
        }}
      >
        <Menu
          mode="inline"
          defaultOpenKeys={["Games"]}
          // style={{  background: 'var(--jaza-bets-body-bg)', color: 'var(--light)' }}
          theme="dark" // Optional: use "dark" for better built-in contrast
        >
          <SubMenu
            key="Games"
            title="Games"
            style={{ color: "var(--light)" }}
          >
            <Menu.Item
              key="1"
              icon={<FileTextOutlined />}
              style={{ color: "var(--light)" }}
            >
              <a href="/my-bets" style={{ color: "var(--light)" }}>
                My Bets
              </a>
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<FireOutlined />}
              style={{ color: "var(--light)" }}
            >
              <a href="/boosted-odds" style={{ color: "var(--light)" }}>
                Aviator
              </a>
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<UserOutlined />}
              style={{ color: "var(--light)" }}
            >
              <a href="/player-to-score" style={{ color: "var(--light)" }}>
               Jetx
              </a>
            </Menu.Item>
            <Menu.Item
              key="4"
              icon={<PlayCircleOutlined />}
              style={{ color: "var(--light)" }}
            >
              <a href="/sports" style={{ color: "var(--light)" }}>
                Aviatrix
              </a>
            </Menu.Item>
            <Menu.Item
              key="5"
              icon={<VideoCameraOutlined />}
              style={{ color: "var(--light)" }}
            >
              <a href="/sports/live" style={{ color: "var(--light)" }}>
                Live Casino
              </a>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </SimpleBar>
      {/* Footer inside sidebar */}
      <div style={{ maxHeight: "auto", overflow: "hidden" }}>
        <Footer />
      </div>

      <Col span={24} style={{ marginTop: 24 }}>
          <Row justify="center" gutter={16}>
            {[
              { img: ch2, label: "Live chat" },
              { img: em2, label: "Email" },
              { img: fb2, label: "Facebook" },
            ].map((item, idx) => (
              <Col key={idx}>
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
