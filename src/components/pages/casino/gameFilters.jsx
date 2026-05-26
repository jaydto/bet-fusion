import { Grid } from "antd";
import { data } from "./data";
import { useSelector } from "react-redux";

const { useBreakpoint } = Grid;

const GameFilters = ({ activeCategory, onFilterChange }) => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const casino_types = useSelector((state) => state.virtuals.casino_games_types);

  const baseCategoryMap = new Map(
    data?.baseCategories.map((cat) => [cat.cat_id.toLowerCase(), { ...cat }])
  );

  casino_types.forEach((type) => {
    const key = type.game_type_id.toLowerCase();
    if (baseCategoryMap.has(key)) {
      baseCategoryMap.set(key, { ...baseCategoryMap.get(key), label: type.game_type_description });
    } else {
      baseCategoryMap.set(key, { cat_id: type.game_type_id, label: type.game_type_description, icon: null });
    }
  });

  const validLabels = new Set(casino_types.map((t) => t.game_type_description));
  const mappedCategories = Array.from(baseCategoryMap.values()).filter(
    (cat) => validLabels.has(cat.label) || cat.label === "Lobby"
  );

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        overflowX: "auto",
        padding: isMobile ? "8px 10px" : "8px 12px",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      className="hide-scrollbar"
    >
      {mappedCategories.map((cat) => {
        const isActive =
          activeCategory?.toLowerCase() === cat.cat_id?.toLowerCase() ||
          activeCategory?.toLowerCase() === cat.label?.toLowerCase();
        return (
          <button
            key={cat.label}
            onClick={() => onFilterChange(cat.label, cat.label)}
            style={{
              cursor: "pointer",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              fontSize: 13,
              padding: "5px 14px",
              borderRadius: 20,
              whiteSpace: "nowrap",
              flexShrink: 0,
              border: `1.5px solid ${isActive ? "#fb8603" : "#334155"}`,
              background: isActive ? "rgba(59,170,237,0.12)" : "#1e293b",
              color: isActive ? "#fb8603" : "#94a3b8",
              transition: "all 0.15s",
            }}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
};

export default GameFilters;
