import React from "react";
import { RightOutlined } from "@ant-design/icons";

const SectionHeader = ({ title, actionLabel = "SHOW ALL", onAction }) => {
  const showAction =
    actionLabel !== "" && actionLabel !== null && actionLabel !== undefined;

  return (
    <div className="landing-section-header">
      <div className="landing-section-title">
        <span className="landing-section-icon">🔥</span>
        {title}
      </div>
      {showAction && (
        <div
          className="landing-section-action"
          role="button"
          tabIndex={0}
          onClick={() => onAction?.()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onAction?.();
          }}
        >
          <span>{actionLabel}</span>
          <RightOutlined style={{ fontSize: 10 }} />
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
