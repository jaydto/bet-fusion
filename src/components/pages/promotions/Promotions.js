import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Row, Col, Typography, Space, Card } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import PromoCards from "./PromoCards";
import "./promo.css";

// const Header = React.lazy(() => import('../../header/header'));
const { Title } = Typography;

const Promotions = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* <Header /> */}
      <ToastContainer />
      <div className="promotions-app-top" style={{ padding: 5, marginTop: 60 }}>
        <Row justify="center">
          <Col xs={24} md={24} lg={24}>
            {/* <Title
              level={5}
              style={{
                color: "white",
                fontSize: 16, // override default H5 font size
                fontWeight: 500,
                marginBottom: 12,
                border: "none", // just to be explicit
              }}
            >
              Promotions
            </Title> */}

            <Row align="middle" style={{ marginBottom: 24, padding: "0 10px" }}>
              <Col span={2}>
                <LeftOutlined
                  onClick={() => navigate(-1)}
                  style={{
                    fontSize: 24,
                    color: "var(--light)",
                    fontWeight: 700,
                    opacity: 0.7,
                    cursor: "pointer",
                  }}
                />
              </Col>
              <Col span={20}>
                <Card
                  className="promotion-header"
                  style={{
                    backgroundColor: "var(--jaza-bets-accent)",
                    color: "white",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 14,
                    border:"none"
                  }}
                  bodyStyle={{ padding: "12px 0" }}
                >
                  PROMOTIONS
                </Card>
              </Col>
            </Row>

            <PromoCards />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Promotions;
