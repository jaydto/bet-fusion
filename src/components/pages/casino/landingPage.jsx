import React, { useState, useMemo, useEffect } from "react";
import { Row, Col, Grid, Button } from "antd";
import { ConsoleSqlOutlined } from "@ant-design/icons"; // game console icon
import { useNavigate } from "react-router-dom";
import GamesSection from "./gamesSection";
import MustPlaySection from "./mustPlaySection";
import HorizontalScroller from "./horizontalScroller";
import { data, helpMessage } from "./data";
import CongratulationBanner from "./conratulations";
import CategoryTabs from "./categoryTabs";
import Footer from "../../footer/footer";
import GameNavBar from "../../mobile-navigation/MobileNav1";
import CasinoCarouselLoader from "./carousel";
import { useSelector } from "react-redux";
import { getFromLocalStorage } from "../../utils/local-storage";

const { useBreakpoint } = Grid;

const LandingPage = () => {
  const [activeCategory, setActiveCategory] = useState("lobby");
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const navigate = useNavigate();

  const [localGameData] = useState(() => getFromLocalStorage("casino_games_data") || []);
  
  const reduxGames = useSelector((state) => state.virtuals.casino_games_data);

  const activeDataSource = reduxGames && reduxGames.length > 0 ? reduxGames : localGameData;

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleMoreGamesClick = () => {
    navigate("/play");
  };

  const crashGames = useMemo(() => {
    return (activeDataSource || []).filter(game => 
      game.categories?.some(cat => cat.game_type_id === "crash")
    );
  }, [activeDataSource]);

  // const virtualGames = useMemo(() => 
  //   casino_games.filter(game => 
  //     game.categories?.some(cat => cat.game_type_id === "virtual")
  //   ), [casino_games]
  // );

  // Group games by their first category (or multiple if you want)
  const groupGamesByCategory = (games) => {
    const categoriesMap = {};

    games.forEach((game) => {
      if (game.categories && game.categories.length > 0) {
        game.categories.forEach((cat) => {
          const catName = cat.name || cat.game_type_id || "Other";
          if (!categoriesMap[catName]) {
            categoriesMap[catName] = [];
          }
          categoriesMap[catName].push(game);
        });
      } else {
        if (!categoriesMap["Other"]) categoriesMap["Other"] = [];
        categoriesMap["Other"].push(game);
      }
    });

    return categoriesMap;
  };

  // const gamesByCategory = groupGamesByCategory(casino_games);

  return (
    <div style={{ width: "100%", marginBottom: isMobile ? "6rem" : "2rem" }}>
      <div
        style={{
          marginTop: isMobile ? 2 : 10,
          padding: isMobile ? "5px 1px" : "12px 0px 0px 12px",
          overflow: "hidden",
        }}
      >
        <CasinoCarouselLoader />
        <GameNavBar categories={data.categories} />
        {/* <CongratulationBanner messagesObject={helpMessage} /> */}
        {/* <div style={{ marginTop: 20 }}>
          <CategoryTabs />
        </div> */}

        {/* <HorizontalScroller
          categories={data.categories}
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
        /> */}
      </div>

      {/* <div style={{ marginTop: 0 }}>
        <GamesSection games={data.games} />
      </div> */}

      {/* <div style={{ marginTop: 5 }}>
        <MustPlaySection must_play={data.must_play} />
      </div> */}

      {crashGames.length > 0 && (
        <div style={{ marginTop: 5, marginBottom: "2rem" }}>
          <GamesSection key={`crash-${crashGames.length}`} games={crashGames.slice(0, 12)} category="CRASH" count={crashGames?.length} />
        </div>
      )}

      {/* {virtualGames.length > 0 && (
        <div style={{ marginTop: 5, marginBottom: "2rem" }}>
          <GamesSection games={virtualGames.slice(0, 8)} category="VIRTUAL" count={virtualGames?.length} />
        </div>
      )} */}

      {/* <div>
        {Object.entries(gamesByCategory).map(([categoryName, gamesArray]) => (
          <div key={categoryName} style={{ marginTop: 5, marginBottom: "2rem" }}>
            <GamesSection 
              games={gamesArray.slice(0, 8)} 
              category={categoryName} 
              count={gamesArray.length} 
            />
          </div>
        ))}
      </div> */}

      {/* <div style={{ marginTop: 5, marginBottom: "2rem" }}>
        <GamesSection games={casino_games.slice(0, 8)} category="Casino"  count={casino_games?.length} />
      </div> */}

      

      {/* <div style={{ textAlign: "center", marginTop: 30 }}>
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
      </div> */}

      <Footer />
    </div>
  );
};

export default LandingPage;
