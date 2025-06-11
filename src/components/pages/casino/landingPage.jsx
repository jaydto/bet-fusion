import React, { useState } from "react";
import { Row, Col, Grid, Button } from "antd";
import { ConsoleSqlOutlined } from "@ant-design/icons"; // game console icon
import { useNavigate } from "react-router-dom";
import GamesSection from "./gamesSection";
import MustPlaySection from "./mustPlaySection";
import HorizontalScroller from "./horizontalScroller";
import { data, helpMessage } from "./data";
import CongratulationBanner from "./conratulations";
import CategoryTabs from "./categoryTabs";
import GameNavBar from "../../mobile-navigation/MobileNav1";
import CasinoCarouselLoader from "./carousel";
import { useSelector } from "react-redux";

const { useBreakpoint } = Grid;

const LandingPage = () => {
  const [activeCategory, setActiveCategory] = useState("lobby");
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const navigate = useNavigate();
  const casino_games = useSelector((state) => state.virtuals.casino_games_data);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleMoreGamesClick = () => {
    navigate("/casino");
  };

  const crashGames = casino_games.filter(
    (game) =>
      game.categories &&
      game.categories.some((cat) => cat.game_type_id === "crash")
  );

  return (
    <div style={{ width: "100%", marginBottom: isMobile ? "6rem" : "2rem" }}>
      <div
        style={{
          marginTop: isMobile ? 2 : 10,
          padding: isMobile ? "5px 1px" : "12px 0px 0px 12px",
          overflow: "hidden",
        }}
      >
        <GameNavBar />
        <CasinoCarouselLoader />
        <CongratulationBanner messagesObject={helpMessage} />
        {/* <div style={{ marginTop: 20 }}>
          <CategoryTabs />
        </div> */}

        {/* <HorizontalScroller
          categories={data.categories}
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
        /> */}
      </div>

      <div style={{ marginTop: 0 }}>
        <GamesSection games={data.games} />
      </div>

      {/* <div style={{ marginTop: 5 }}>
        <MustPlaySection must_play={data.must_play} />
      </div> */}

      <div style={{ marginTop: 5, marginBottom: "2rem" }}>
        <GamesSection games={casino_games.slice(0, 8)} category="Casino" />
      </div>

      {crashGames.length > 0 && (
        <div style={{ marginTop: 5, marginBottom: "2rem" }}>
          <GamesSection games={crashGames.slice(0, 8)} category="Crash" />
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: 30 }}>
        <Button
          size="large"
          icon={<ConsoleSqlOutlined />}
          onClick={handleMoreGamesClick}
          style={{
            backgroundColor: "var(--btn-color-action)",
            color: "var(--black)",
            border: "none",
            borderRadius: 6, // less rounded
            padding: "0 20px", // optional: adjust padding for a clean look
            height: 40, // optional: fixed height
          }}
        >
          More Games
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
