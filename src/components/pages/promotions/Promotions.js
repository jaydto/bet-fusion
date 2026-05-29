import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Col, Grid } from "antd";
import PromoCards from "./PromoCards";
import "./promo.css";

const { useBreakpoint } = Grid;

const Promotions = () => {
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  return (
    <>
      <ToastContainer />
      <div className="d-flex justify-content-center">
        <Col xs={24} md={24} lg={24}>
          {/* Page title — matches Figma "→ Promotions" */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: isMobile ? "14px 16px 10px" : "16px 20px 10px",
            borderBottom: "1px solid #1e293b",
          }}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" style={{ color: "#fb8603", flexShrink: 0 }}>
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
            </svg>
            <span style={{ color: "#e2e8f0", fontSize: isMobile ? 16 : 18, fontWeight: 700 }}>
              Promotions
            </span>
          </div>

          <PromoCards />
        </Col>
      </div>
    </>
  );
};

export default Promotions;
