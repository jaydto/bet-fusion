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
        background: "var(--bg-card-dark)",
        color: "var(--light)",
        padding: "30px 20px",
        marginBottom: 10,
      }}
    >
      <Row justify="center">
        <Col
          span={24}
          style={{
            padding: "16px",
            color: "white",
          }}
        >
          <Col span={24}>
            <Title level={3} style={{ textAlign: "center", color: "white" }}>
              License
            </Title>
            <ul
              style={{
                fontSize: 12,
                color: "white",
                listStyle: "none",
                paddingLeft: 0,
              }}
            >
              <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
                Players must be{" "}
                <b style={{ color: "var(--game-title)" }}>18 or older.</b>
                <Badge
                  count="18+"
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid #ffc107",
                    color: "white",
                  }}
                />
              </li>
              <li>
                Be Responsible. The addiction to gambling can cause
                psychological harm.
              </li>
              <li>
                Jazabets Enterprise Limited, Kenya operates the jazabets brand
                and is authorized and regulated by the BCLB.
              </li>
              <li>
                License Numbers:{" "}
                <b style={{ color: "var(--game-title)" }}> BK 0000808</b>
              </li>
            </ul>
          </Col>
          <Divider style={{ borderColor: "#434343" }} />
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Title
                level={5}
                style={{
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ExclamationCircleOutlined
                  style={{ color: "#faad14", marginRight: 8 }}
                />
                Responsible Gambling
              </Title>
            </Col>

            <Col span={24}>
              <Paragraph style={{ color: "white", fontSize: "13px" }}>
                Please note that this is a real-money gambling app. You are
                required to gamble responsibly and only bet what you can afford.
                For gambling addiction help and support, please contact our
                customer care at{" "}
                <Link
                  to="tel:0769210210"
                  target="_blank"
                  style={{ color: "#91d5ff" }}
                >
                  0769210210
                </Link>{" "}
                or visit{" "}
                <Link to="/responsible-gambling" style={{ color: "#91d5ff" }}>
                  /responsible-gambling
                </Link>
                .
              </Paragraph>
              <Paragraph style={{ color: "white", fontSize: "13px" }}>
                You can also read about our Responsible Gambling Policy by{" "}
                <Link to="/responsible-gambling" style={{ color: "#91d5ff" }}>
                  clicking here
                </Link>
                .
              </Paragraph>
            </Col>
          </Row>
          <Divider style={{ borderColor: "#434343" }} />
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Title
                level={5}
                style={{
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FileTextOutlined
                  style={{ color: "#91d5ff", marginRight: 8 }}
                />
                Terms and Conditions
              </Title>
            </Col>
            {/* Links */}
            <Col span={24}>
              <Space direction="vertical">
                <Link to="/terms-and-conditions" style={{ color: "white" }}>
                  Terms and Conditions
                </Link>
                <Link to="/responsible-gambling" style={{ color: "white" }}>
                  Responsible Gambling
                </Link>
                <Link to="/privacy-policy" style={{ color: "white" }}>
                  Privacy Policy
                </Link>
                <Link to="/cookie-policy" style={{ color: "white" }}>
                  Cookie Policy
                </Link>
                <Link to="/how-to-play" style={{ color: "white" }}>
                  How To Play
                </Link>
              </Space>
            </Col>
          </Row>
        </Col>

        <Divider style={{ borderColor: "rgba(255,255,255,0.2)" }} />

        <Col span={24}>
          <Paragraph
            style={{
              color: "white",
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <StopOutlined
              style={{ color: "#ff4d4f", fontSize: "18px", marginRight: 8 }}
            />
            <span>
              <b>JazaBets</b> does not support underage gambling. You must be 18
              years of age or older to register or play at JazaBets.
            </span>
          </Paragraph>
        </Col>
        <Divider style={{ borderColor: "#434343" }} />

        {/* <Col span={24}>
          <Title level={5} style={{ textAlign: "center", color: "white" }}>
            Cooperations
          </Title>
          <Row justify="center" gutter={[16, 16]} wrap>
            {cooperationImages.map((img, idx) => (
              <Col key={idx}>
                <img src={img} alt={`coop-${idx}`} width={50} height={30} />
              </Col>
            ))}
          </Row>
        </Col> */}
        {/* <Divider style={{ borderColor: "#434343" }} /> */}
        <Col span={24}>
          <Title level={4} style={{ textAlign: "center", color: "white" }}>
            Share With Friends
          </Title>
          <Row justify="center" gutter={24}>
            {[
              {
                img: fb1,
                label: "Facebook",
                href: "https://www.facebook.com/jazabets/",
              },
              {
                img: tw,
                label: "Twitter",
                href: "https://x.com/jazabets_com",
              },
              {
                img: wh,
                label: "WhatsApp",
                href: "https://wa.me/254769210210", // converted phone to international format
              },
              {
                img: int1,
                label: "Instagram",
                href: "https://www.instagram.com/jazabets", // use your actual Instagram handle
              },
            ].map((item, idx) => (
              <Col key={idx}>
                <Link
                  to={item.href}
                  target="_blank"
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
                    <Text style={{ fontSize: 12, color: "white" }}>
                      {item.label}
                    </Text>
                  </Space>
                </Link>
              </Col>
            ))}
          </Row>
          <Paragraph
            style={{
              textAlign: "center",
              fontSize: 12,
              marginTop: 16,
              color: "white",
            }}
          >
            Invite friends, bet and earn KSH 1,000,000
          </Paragraph>
        </Col>
      </Row>
    </AntFooter>
  );
}
