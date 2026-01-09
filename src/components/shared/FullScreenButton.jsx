import React from "react";
import { Tag, Button, Grid } from "antd";
import { ExpandOutlined, DownloadOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderBreadCrumb from "./headerBreadCrumb";
const { useBreakpoint } = Grid;

const FullscreenButton = ({ onClick, isCustomFullScreen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const isSportsPage = location.pathname === "/sports";

  return (
    <div
      className={`height-max-custom d-flex align-items-center justify-content-between ${
        isCustomFullScreen ? "full-screen-component" : ""
      }`}
      style={{ padding: "0 1rem", marginTop: isSportsPage ? "6rem" : 0, }}
    >
      <HeaderBreadCrumb />

      {!isSportsPage && (
        <div className="d-flex align-items-center" style={{ gap: 12 }}>
          {isMobile && (
            
            <Button
              // type="primary"
              style={{
                background: "var(--bet-fusion-button-login)",
                border: "none",
              }}
              size="small"
              onClick={() => navigate("/deposit")}
              icon={<DownloadOutlined />}
            >
              Deposit
            </Button>
          )}

          <Tag
            onClick={onClick}
            style={{
              cursor: "pointer",
              userSelect: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontWeight: 600,
              fontSize: 14,
              padding: "4px 8px",
              background: "var(--bet-fusion-button-login)",
              color: "var(--white)",
              border: "none"
            }}
          >
            {!isMobile && (isCustomFullScreen ? "Exit" : "View Fullscreen")}
            <ExpandOutlined />
          </Tag>
        </div>
      )}
    </div>
  );
};

export default FullscreenButton;
