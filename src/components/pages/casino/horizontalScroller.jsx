import React from "react";
import { Tabs, Grid } from "antd";
import { useNavigate } from "react-router-dom";

const { useBreakpoint } = Grid;

const HorizontalScroller = ({
  categories,
  onCategoryClick,
  activeCategory,
}) => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const navigate = useNavigate();

  // Convert categories to tab items
  const tabItems = categories.map((category, index) => ({
    key: String(index),
    label: (
      <div
        style={{
          background: category.bg || "#eee",
          color: category.color || "#000",
          padding: "6px 15px",
          borderRadius: 20,
          textAlign: "center",
          whiteSpace: "nowrap",
        }}
      >
        {category.name}
      </div>
    ),
    children: null,
  }));

  // Handle tab change by navigating to category URL
  const handleTabChange = (key) => {
    const selectedCategory = categories[parseInt(key, 10)];
    if (selectedCategory?.url) {
      navigate(selectedCategory.url);
    }
  };

  return (
    <div
      className="site-custom-tab-bar"
      style={{
        width: isMobile ? "100vw" : "-webkit-fill-available",
        padding: "0 8px",
        marginBottom: 0,
      }}
    >
      <Tabs
        activeKey={activeCategory}
        onChange={handleTabChange}
        items={tabItems}
        tabBarGutter={isMobile ? 0 : 8}
        moreIcon={null}
        className={`custom-horizontal-tabs ${isMobile ? "wrap-tabs" : ""}`}
      />
    </div>
  );
};

export default HorizontalScroller;
