import React from "react";
import { Breadcrumb, Grid, Typography } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const formatPathSegment = (segment) => {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const PageHeader = ({ title, description }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const screens = useBreakpoint();

  const isMobile = !screens.md;

  const pathnames = location.pathname.split("/").filter(Boolean);

  const breadcrumbItems = [
    {
      title: <HomeOutlined />,
      onClick: () => navigate("/"),
    },
    ...pathnames.map((segment, index) => {
      const isLast = index === pathnames.length - 1;
      return {
        title: (
          <span
            style={{
              opacity: isLast ? 0.7 : 1,
              fontWeight: isLast ? "normal" : "bold",
              fontSize: isLast ? "13px" : "14px",
              cursor: !isLast ? "pointer" : "default",
            }}
          >
            {formatPathSegment(segment)}
          </span>
        ),
        onClick: !isLast
          ? () => navigate("/" + pathnames.slice(0, index + 1).join("/"))
          : undefined,
      };
    }),
  ];

  return (
    <div
      className="page-header"
      style={{ marginBottom: "1.5rem", padding: isMobile?24:24}}
    >
      <Breadcrumb
        separator=">"
        className="custom-breadcrumb"
        style={{ fontSize: "16px", color: "var(--light)" }}
        items={breadcrumbItems}
      />

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
