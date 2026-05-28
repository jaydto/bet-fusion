import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Col, Grid } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import PromoCards from "./PromoCards";
import "./promo.css";
import HeaderBreadCrumb from "../../shared/headerBreadCrumb";

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
          {isMobile ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 16px",
                borderBottom: "1px solid #1e293b",
              }}
            >
              <button
                onClick={() => navigate(-1)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#e2e8f0",
                  cursor: "pointer",
                  fontSize: "16px",
                  padding: "4px 8px 4px 0",
                }}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <span style={{ color: "#e2e8f0", fontSize: "17px", fontWeight: "600", marginLeft: "8px" }}>
                Promotions
              </span>
            </div>
          ) : (
            <div style={{ padding: "20px 2rem" }}>
              <HeaderBreadCrumb />
            </div>
          )}

          <PromoCards />
        </Col>
      </div>
    </>
  );
};

export default Promotions;
