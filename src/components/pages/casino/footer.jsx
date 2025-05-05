import { Layout, Row, Col, Typography, Space, Divider, Badge } from "antd";
import { Link } from "react-router-dom";
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
import { ExclamationCircleOutlined, StopOutlined } from "@ant-design/icons";

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
                Jazabets Enterprise Limited, Kenya operates thejazabets brand
                and is authorized and regulated by the BCLB.
              </li>
              <li>
                License Numbers:{" "}
                <b style={{ color: "var(--game-title)" }}> BK 000</b>
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
                <span style={{ color: "#91d5ff" }}>0712 000 000</span> or visit{" "}
                <Link href="/responsible-gambling" style={{ color: "#91d5ff" }}>
                  /responsible-gambling
                </Link>
                .
              </Paragraph>
              <Paragraph style={{ color: "white", fontSize: "13px" }}>
                You can also read about our Responsible Gambling Policy by{" "}
                <Link href="/responsible-gambling" style={{ color: "#91d5ff" }}>
                  clicking here
                </Link>
                .
              </Paragraph>
            </Col>
          </Row>
        </Col>

        <Divider style={{ borderColor: "#434343" }} />
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
            <strong>JazaBets</strong> does not support underage gambling. You
            must be 18 years of age or older to register or play at JazaBets.
          </Paragraph>
        </Col>
        <Divider style={{ borderColor: "#434343" }} />

        <Col span={24}>
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
        </Col>
        <Divider style={{ borderColor: "#434343" }} />
        <Col span={24}>
          <Title level={4} style={{ textAlign: "center", color: "white" }}>
            Share With Friends
          </Title>
          <Row justify="center" gutter={24}>
            {[
              { img: fb1, label: "Facebook" },
              { img: tw, label: "Twitter" },
              { img: wh, label: "WhatsApp" },
              { img: int1, label: "Instagram" },
            ].map((item, idx) => (
              <Col key={idx}>
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
