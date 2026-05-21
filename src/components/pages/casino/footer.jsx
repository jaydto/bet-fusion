import { Layout, Row, Col, Typography, Space, Divider, Badge } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";

import fb1 from "../../../assets/img/fb1.png";
import tw from "../../../assets/img/t1.png";
import int1 from "../../../assets/img/int1.png";
import wh from "../../../assets/img/w1.png";

import Coop1 from "../../../assets/img/coop1.png";
import Coop2 from "../../../assets/img/coop2.png";
import Coop3 from "../../../assets/img/coop3.png";
import Coop4 from "../../../assets/img/coop4.png";
import Coop5 from "../../../assets/img/coop5.png";
import Coop6 from "../../../assets/img/coop6.png";
import Coop7 from "../../../assets/img/coop7.png";
import {
  ExclamationCircleOutlined,
  FileTextOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Footer: AntFooter } = Layout;
const { Title, Paragraph, Text } = Typography;

export default function Footer() {
  const cooperationImages = [Coop1, Coop2, Coop3, Coop4, Coop5, Coop6, Coop7];

  return (
    <AntFooter
      style={{
        background: "#0f172a",
        borderTop: "1px solid #1e293b",
        color: "#94a3b8",
        padding: "32px 24px 80px",
      }}
    >
      <Row justify="center">
        <Col span={24} style={{ maxWidth: 960, margin: "0 auto" }}>

          {/* License */}
          <Title level={5} style={{ color: "#f8fafc", marginBottom: 8, fontWeight: 700 }}>
            License Information
          </Title>
          <ul style={{ fontSize: 13, color: "#64748b", listStyle: "none", paddingLeft: 0, lineHeight: 1.8, margin: 0 }}>
            <li>
              Only individuals aged{" "}
              <b style={{ color: "#f8fafc" }}>18 years or older</b>{" "}
              are permitted to play.{" "}
              <Badge count="18+" style={{ backgroundColor: "transparent", border: "1px solid #ffc107", color: "white" }} />
            </li>
            <li>Please play responsibly. Gambling may lead to addiction and mental health challenges.</li>
            <li>
              Betfusion is a product of Game Guys Limited, a licensed gaming company in Kenya regulated
              by the Betting Control and Licensing Board (BCLB).
            </li>
            <li>License Number: <b style={{ color: "#f8fafc" }}>PG0001119 / BK0001120</b></li>
          </ul>

          <Divider style={{ borderColor: "#1e293b", margin: "20px 0" }} />

          {/* Responsible Gambling */}
          <Title
            level={5}
            style={{ color: "#f8fafc", display: "flex", alignItems: "center", gap: 8 }}
          >
            <ExclamationCircleOutlined style={{ color: "#faad14" }} />
            Responsible Gambling
          </Title>
          <Paragraph style={{ color: "#64748b", fontSize: 12, lineHeight: 1.6 }}>
            Please note that this is a real-money gambling app. Gamble responsibly and only bet
            what you can afford. For gambling addiction help, contact us at{" "}
            <Link to="tel:0718111117" target="_blank" style={{ color: "#E55F32" }}>
              0718111117
            </Link>
            {" | "}
            <Link to="tel:0718111119" target="_blank" style={{ color: "#E55F32" }}>
              0718111119
            </Link>{" "}
            or{" "}
            <Link to="/responsible-gambling" style={{ color: "#E55F32" }}>
              read our Responsible Gambling Policy
            </Link>
            .
          </Paragraph>

          <Divider style={{ borderColor: "#1e293b", margin: "20px 0" }} />

          {/* Links */}
          <Title
            level={5}
            style={{ color: "#f8fafc", display: "flex", alignItems: "center", gap: 8 }}
          >
            <FileTextOutlined style={{ color: "#E55F32" }} />
            Legal
          </Title>
          <Space wrap size={[24, 8]} style={{ marginBottom: 8 }}>
            {[
              { label: "Terms & Conditions", to: "/terms-and-conditions" },
              { label: "Responsible Gambling", to: "/responsible-gambling" },
              { label: "Privacy Policy", to: "/privacy-policy" },
              { label: "Cookie Policy", to: "/cookie-policy" },
              { label: "How To Play", to: "/how-to-play" },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                style={{ color: "#94a3b8", fontSize: 13, textDecoration: "none" }}
                onMouseEnter={(e) => (e.target.style.color = "#E55F32")}
                onMouseLeave={(e) => (e.target.style.color = "#94a3b8")}
              >
                {l.label}
              </Link>
            ))}
          </Space>

          <Divider style={{ borderColor: "#1e293b", margin: "20px 0" }} />

          {/* 18+ disclaimer */}
          <Paragraph
            style={{
              color: "#64748b",
              fontSize: 12,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <StopOutlined style={{ color: "#ff4d4f", fontSize: 16 }} />
            <b style={{ color: "#94a3b8" }}>Betfusion</b> does not support underage gambling.
            You must be 18 years of age or older to register or play.
          </Paragraph>

          <Divider style={{ borderColor: "#1e293b", margin: "20px 0" }} />

          {/* Social */}
          <Title level={5} style={{ textAlign: "center", color: "#f8fafc" }}>
            Follow Us
          </Title>
          <Row justify="center" gutter={24} style={{ marginBottom: 16 }}>
            {[
              { img: fb1, label: "Facebook", href: "https://www.facebook.com/betfusion/" },
              { img: tw, label: "Twitter", href: "https://x.com/betfusion_com" },
              { img: wh, label: "WhatsApp", href: "https://wa.me/+254718111117" },
              { img: int1, label: "Instagram", href: "https://www.instagram.com/betfusion" },
            ].map((item, idx) => (
              <Col key={idx}>
                <Link
                  to={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <Space direction="vertical" align="center">
                    <LazyLoadImage src={item.img} alt={item.label} height={28} width={28} />
                    <Text style={{ fontSize: 11, color: "#64748b" }}>{item.label}</Text>
                  </Space>
                </Link>
              </Col>
            ))}
          </Row>

          <Paragraph style={{ textAlign: "center", fontSize: 12, color: "#334155", marginTop: 8 }}>
            &copy; 2025 Betfusion. All rights reserved.
          </Paragraph>
        </Col>
      </Row>
    </AntFooter>
  );
}
