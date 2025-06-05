import { Grid, Space, Tag } from "antd";
import { data } from "./data";

const { useBreakpoint } = Grid;

const GameFilters = ({ activeCategory, onFilterChange }) => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const handleCategoryClick = (label) => {
    onFilterChange(label);
  };
  return (
    <Space
      wrap={false}
      className="search-filter-tags"
      style={{
        width: isMobile ? "100vw" : "-webkit-fill-available",
        overflowX: "auto",
        padding: isMobile?10:24,
      }}
    >
      {data?.baseCategories.map((cat) => {
        const isActive = activeCategory === cat.label;

        return (
          <Tag
            key={cat.label}
            style={{
              cursor: "pointer",
              fontWeight: 500,
              padding: "6px 12px",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: cat.bg,
              color: cat.color,
            }}
            onClick={() => handleCategoryClick(cat.label)}
          >
            {isActive ? (
              <>
                <Tag color="success">{cat.label}</Tag>
                <span>{cat.label}</span>
              </>
            ) : (
              <>
                {cat.icon && (
                  <span style={{ color: cat.color }}>{cat.icon}</span>
                )}
                <span>{cat.label}</span>
              </>
            )}
          </Tag>
        );
      })}
    </Space>
  );
};

export default GameFilters;
