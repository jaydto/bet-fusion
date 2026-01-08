import { Grid, Space, Tag } from "antd";
import { data } from "./data";
import { useSelector } from "react-redux";

const { useBreakpoint } = Grid;

const GameFilters = ({ activeCategory, onFilterChange }) => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const casino_types = useSelector(
    (state) => state.virtuals.casino_games_types
  );

  // Create a map from baseCategories keyed by lowercase cat_id
  const baseCategoryMap = new Map(
    data?.baseCategories.map((cat) => [cat.cat_id.toLowerCase(), { ...cat }])
  );

  // Fallback style for new categories
  const defaultStyle = {
    icon: null,
    color: "#2d7ff9",
    bg: "rgb(235, 241, 255)",
  };

  const GRADIENTS = [
    "linear-gradient(90deg, #32e580 0%, #0b33d3 100%)",
    "linear-gradient(90deg, #d032e5 0%, #1fdfe3 100%)",
    "linear-gradient(90deg, #d032e5 0%, #ff551c 100%)",
    "linear-gradient(90deg, #d032e5 0%, #00ff40 100%)",
  ];

  const getGradientIndex = (label) => {
    let hash = 0;
    for (let i = 0; i < label.length; i++) {
      hash = label.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % GRADIENTS.length;
  };

  // Merge or update categories
  casino_types.forEach((type) => {
    const key = type.game_type_id.toLowerCase();

    if (baseCategoryMap.has(key)) {
      // Update label only; keep existing style
      const existing = baseCategoryMap.get(key);
      baseCategoryMap.set(key, {
        ...existing,
        label: type.game_type_description,
      });
    } else {
      // New category — use default style
      baseCategoryMap.set(key, {
        cat_id: type.game_type_id,
        label: type.game_type_description,
        icon: defaultStyle.icon,
        color: defaultStyle.color,
        bg: defaultStyle.bg,
      });
    }
  });

  // Final mapped list
  // const mappedCategories = Array.from(baseCategoryMap.values());
  // Step 1: Build a Set of valid labels from casino_types
  const validLabels = new Set(
    casino_types.map((type) => type.game_type_description)
  );

  const blockedCategories = ["Casino", "Live Casino"]

//  const mappedCategories = Array.from(baseCategoryMap.values()).filter(
//   (cat) =>
//     validLabels.has(cat.label) || cat.label === "Lobby"
// );

  const mappedCategories = Array.from(baseCategoryMap.values()).filter(
    (cat) =>
      (validLabels.has(cat.label) || cat.label === "Lobby") &&
      !blockedCategories.includes(cat.label)
  );

  console.log("mappedCategories", mappedCategories);
  const handleCategoryClick = (game_id, label) => {
    onFilterChange(game_id, label);
  };
  return (
    <Space
      wrap={false}
      className="search-filter-tags"
      style={{
        width: isMobile ? "100vw" : "-webkit-fill-available",
        overflowX: "auto",
        padding: isMobile ? 10 : 12,
      }}
    >
      {mappedCategories.map((cat) => {
        const isActive = activeCategory === cat.label;
        const gradient = GRADIENTS[getGradientIndex(cat.label)];

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
              background: `linear-gradient(var(--bet-fusion-secondary) 0 0) padding-box, ${gradient} border-box`,
              border: "2px solid transparent",
              color: "var(--white)",
            }}
            onClick={() => handleCategoryClick(cat.label, cat.label)}
          >
            {isActive ? (
              <>
                {/* <Tag color="success">{cat.label}</Tag> */}
                <span style={{ color: "var(--bet-fusion-red)" }}>{cat.label}</span>
              </>
            ) : (
              <>
                {cat.icon && (
                  <span style={{ color: "var(--white)" }}>{cat.icon}</span>
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
