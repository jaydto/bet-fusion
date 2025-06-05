import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Row, Col, Typography, Space, Card, Grid } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import PromoCards from "./PromoCards";
import "./promo.css";
import HeaderBreadCrumb from "../../shared/headerBreadCrumb";

// const Header = React.lazy(() => import('../../header/header'));
const { Title } = Typography;
const { useBreakpoint } = Grid;

const Promotions = () => {
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  return (
    <>
      {/* <Header /> */}
      <ToastContainer />
        <div className="d-flex justify-content-center">
        <Col xs={24} md={24} lg={24}>
          <div style={{ padding: isMobile ? "0px 10px" : "20px 2rem" }}>
            <HeaderBreadCrumb />
          </div>
          {/* <Row align="middle" style={{ marginBottom: 24, padding: "0 10px" }}>
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
                    border: "none",
                  }}
                  styles={{ body: { padding: "12px 0" } }}
                >
                  PROMOTIONS
                </Card>
              </Col>
            </Row> */}

          <PromoCards />
        </Col>
      </div>
    </>
  );
};

export default Promotions;
