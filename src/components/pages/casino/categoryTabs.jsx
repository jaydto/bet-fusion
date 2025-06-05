import React, { useState, useRef, useEffect } from "react";
import { Grid, Tabs } from "antd";
import { MoreOutlined } from "@ant-design/icons"; // vertical three dots

const categories = [
  "For You",
  "New Games",
  "Football Slots",
  "Live",
  "Popular",
  "Top Picks",
  "Crash",
  "Virtual",
];

const { useBreakpoint } = Grid;

const CategoryTabs = () => {
  const [activeKey, setActiveKey] = useState("For You");
  const [wrap, setWrap] = useState(false);
  const tabsContainerRef = useRef(null);
  const [showToggle, setShowToggle] = useState(false);
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  useEffect(() => {
    const el = tabsContainerRef.current;
    if (!el) return;

    const checkOverflow = () => {
      if (el.scrollWidth > el.clientWidth || isMobile) {
        setShowToggle(true);
      } else {
        setShowToggle(false);
        setWrap((wrap) => (wrap ? false : wrap)); // reset wrap only if wrap was true
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [categories, isMobile]);

  return (
    <div className="tabs-wrapper">
      {showToggle && (
        <div
          className="toggle-wrap-btn"
          onClick={() => setWrap(!wrap)}
          title={wrap ? "Disable Wrap" : "Enable Wrap"}
        >
          <MoreOutlined />
        </div>
      )}

      <div
        ref={tabsContainerRef}
        className={`tabs-container ${wrap ? "wrap" : "nowrap"}`}
      >
        <Tabs
          activeKey={activeKey}
          onChange={setActiveKey}
          type="line"
          tabBarStyle={{
            backgroundColor: "inherit",
            padding: 0,
            overflow: wrap ? "visible" : "auto",
            whiteSpace: wrap ? "normal" : "nowrap",
            display: "flex",
            flexWrap: wrap ? "wrap" : "nowrap",
          }}
          tabBarGutter={8}
          items={categories.map((cat) => ({
            key: cat,
            label: cat,
          }))}
        />
      </div>
    </div>
  );
};

export default CategoryTabs;
