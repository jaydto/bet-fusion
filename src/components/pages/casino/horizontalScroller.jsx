import React from "react";
import { Tabs, Grid } from "antd";

const { useBreakpoint } = Grid;

const HorizontalScroller = ({ categories, activeKey, onChange }) => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  // Convert categories to items array
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
    children: null, // No content since it's used as navigation
  }));

  return (
    <div
      className="site-custom-tab-bar"
      style={{
        width: isMobile ? "100vw" : "100%",
        padding: "0 8px",
        marginBottom: 0,
      }}
    >
      <Tabs
        activeKey={activeKey}
        onChange={onChange}
        items={tabItems}
        tabBarGutter={isMobile ? 0 : 8}
        moreIcon={null}
        className={`custom-horizontal-tabs ${isMobile ? "wrap-tabs" : ""}`}
      />
    </div>
  );
};

export default HorizontalScroller;
