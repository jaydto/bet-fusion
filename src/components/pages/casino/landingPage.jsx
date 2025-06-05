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

const { useBreakpoint } = Grid;

const LandingPage = () => {
  const [activeCategory, setActiveCategory] = useState("lobby");
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleMoreGamesClick = () => {
    navigate("/casino");
  };

  return (
    <div style={{ width: "100%", marginBottom: isMobile ? "6rem" : "2rem" }}>
      <div
        style={{
          marginTop: isMobile ? 2 : 20,
          padding: isMobile?"5px 1px":"12px 0px 0px 12px",
          overflow: "hidden",
        }}
      >
        <GameNavBar />
        <CasinoCarouselLoader/>
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

      <div style={{ marginTop: 5 , marginBottom: "2rem"}}>
        <GamesSection games={data.numbers} category="Numbers" />
      </div>

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
