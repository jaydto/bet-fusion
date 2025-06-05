import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const formatPathSegment = (segment) => {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const HeaderBreadCrumb = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  const breadcrumbItems = [
    {
      title: <HomeOutlined />,
      onClick: () => navigate("/"),
    },
    ...pathnames.map((segment, index) => {
      const isLast = index === pathnames.length - 1;
      const path = "/" + pathnames.slice(0, index + 1).join("/");
      return {
        title: (
          <span
            style={{
              opacity: isLast ? 0.7 : 1,
              fontWeight: isLast ? "normal" : "bold",
              fontSize: isLast ? "13px" : "14px",
              color: isLast ? "var(--fade-color)" : "var(--light)",
            }}
          >
            {formatPathSegment(segment)}
          </span>
        ),
        onClick: !isLast ? () => navigate(path) : undefined,
      };
    }),
  ];

  return (
    <Breadcrumb
      separator=">"
      className="custom-breadcrumb"
      style={{ fontSize: 16, cursor: "pointer" }}
      items={breadcrumbItems}
    />
  );
};

export default HeaderBreadCrumb;
