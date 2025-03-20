import React from "react";
import "./CasinoSkeletonLoader.css"; // Ensure proper styling

const sections = ["Popular Games", "Latest Games"]; // Dynamically define sections

const CasinoSkeletonLoader = () => {
  return (
    <div className="casino-skeleton-container">
      {sections.map((section, idx) => (
        <div key={idx} className="casino-skeleton-section">
          <div className="skeleton-section-header">{section}</div>
          <div className="casino-skeleton-grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="skeleton-card">
                <div className="skeleton-image"></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CasinoSkeletonLoader;
