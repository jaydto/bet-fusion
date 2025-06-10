import { Grid, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
const { useBreakpoint } = Grid;

const GameSearchFilters = ({ onSearch }) => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  return (
    <div
      className="search-filter-section"
      style={{ marginBottom: "0.5rem", padding: isMobile?"0px 10px":"0px 12px" }}
    >
      <Input
        size="large"
        placeholder="SEARCH GAME"
        prefix={<SearchOutlined style={{ color: "#ccc" }} />}
        onClick={onSearch}
        className="search-cat bg-transparent"
        style={{
          borderRadius: 50,
          backgroundColor: "#2a2a2a",
          color: "var(--light)",
          border: " 1px solid var(--blue)",
        }}
      />
    </div>
  );
};

export default GameSearchFilters;
