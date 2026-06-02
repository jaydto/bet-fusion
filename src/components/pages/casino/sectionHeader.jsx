import React from "react";
import { RightOutlined } from "@ant-design/icons";
import { GiFlame, GiRocket } from "react-icons/gi";
import { MdLiveTv, MdCasino } from "react-icons/md";

// Each section's icon matches its category (all rendered orange).
const ICON_BY_TITLE = {
  "Most played": GiFlame,
  "Crash Games": GiRocket,
  "Live Casino": MdLiveTv,
  "Slots": MdCasino,
};

const SectionHeader = ({ title, icon, actionLabel = "SHOW ALL", onAction }) => {
  const showAction =
    actionLabel !== "" && actionLabel !== null && actionLabel !== undefined;
  const Icon = ICON_BY_TITLE[title] || GiFlame;

  return (
    <div className="landing-section-header">
      <div className="landing-section-title">
        <span className="landing-section-icon" style={{ color: "#fb8603", display: "flex", alignItems: "center" }}>
          {icon || <Icon size={16} />}
        </span>
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
