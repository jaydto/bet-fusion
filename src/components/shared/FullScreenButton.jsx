import React from "react";
import { Breadcrumb, Tag } from "antd";
import { HomeOutlined, ExpandOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderBreadCrumb from "./headerBreadCrumb";

const FullscreenButton = ({ onClick, isCustomFullScreen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <div
      className={`height-max-custom d-flex align-items-center justify-content-between ${
        isCustomFullScreen ? "full-screen-component" : ""
      }`}
      style={{ padding: "0 1rem" }}
    >
      <HeaderBreadCrumb />

      <Tag
        color="blue"
        onClick={onClick}
        style={{
          cursor: "pointer",
          userSelect: "none",
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontWeight: 600,
          fontSize: 14,
        }}
      >
        {isCustomFullScreen ? "Exit" : "View"} Fullscreen <ExpandOutlined />
      </Tag>
    </div>
  );
};

export default FullscreenButton;
