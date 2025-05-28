// horizontalscroller.jsx
import React from "react";
import { Tabs } from "antd";

const HorizontalScroller = ({ categories }) => {
  return (
    <div className="horizontal-scroller">
      <Tabs
        defaultActiveKey="0"
        tabBarGutter={10}
        tabBarStyle={{ overflowX: "auto", whiteSpace: "nowrap" }}
        moreIcon={null}
        className="custom-horizontal-tabs"
      >
        {categories.map((category, index) => (
          <Tabs.TabPane
            tab={
              <span
                className="tab-pill"
                style={{
                  background: category.color,
                  borderRadius: "15px",
                  padding: "6px 15px",
                  display: "inline-block",
                  // Optional: add some transparency with backdrop filter
                  backdropFilter: "blur(6px)",
                }}
              >
                {category.name}
              </span>
            }
            key={index}
          />
        ))}
      </Tabs>
    </div>
  );
};

export default HorizontalScroller;
