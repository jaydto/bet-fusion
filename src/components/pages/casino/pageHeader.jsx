import React from "react";
import { Breadcrumb, Typography } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const { Title, Paragraph } = Typography;

const formatPathSegment = (segment) => {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const PageHeader = ({ title, description }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter(Boolean);

  const handleBreadcrumbClick = (index) => {
    const path = "/" + pathnames.slice(0, index + 1).join("/");
    navigate(path);
  };

  return (
    <div
      className="page-header"
      style={{ marginBottom: "1.5rem", padding: "1.5rem" }}
    >
      <Breadcrumb
        separator=">"
        className="custom-breadcrumb"
        style={{ fontSize: "16px", color: "var(--light)" }}
      >
        <Breadcrumb.Item
          onClick={() => navigate("/")}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <HomeOutlined style={{ marginRight: 4 }} />
        </Breadcrumb.Item>

        {pathnames.map((segment, index) => {
          const isLast = index === pathnames.length - 1;
          return (
            <Breadcrumb.Item
              key={segment}
              onClick={!isLast ? () => handleBreadcrumbClick(index) : undefined}
              style={{
                cursor: !isLast ? "pointer" : "default",
              }}
            >
              <span
                style={{
                  opacity: isLast ? 0.7 : 1,
                  fontWeight: isLast ? "normal" : "bold",
                  fontSize: isLast ? "13px" : "14px",
                }}
              >
                {formatPathSegment(segment)}
              </span>
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>

      <Title level={4} style={{ marginTop: "0.75rem", color: "var(--light)" }}>
        {title}
      </Title>

      {description && (
        <Paragraph style={{ margin: 0, color: "var(--light)", opacity: 0.7 }}>
          {description}
        </Paragraph>
      )}
    </div>
  );
};

export default PageHeader;
