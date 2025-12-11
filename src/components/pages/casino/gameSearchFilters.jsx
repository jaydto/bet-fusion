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
        placeholder="Search games"
        prefix={<SearchOutlined style={{ color: "var(--white)" }} />}
        onClick={onSearch}
        className="search-cat bg-transparent"
        style={{
          background: "linear-gradient(var(--bet-fusion-secondary) 0 0) padding-box, var(--bet-fusion-button-login) border-box",
          borderRadius: 50,
          backgroundColor: "var(--bet-fusion-button-login)",
          color: "var(--light)",
          border: " 2px solid transparent",
        }}
      />
    </div>
  );
};

export default GameSearchFilters;
