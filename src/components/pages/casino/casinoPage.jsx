import { useEffect, useState } from "react";
import "./index.css";
import SearchModal from "../../modals/SearchModal";

import CasinoGames from "./casinoBody";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { casinoGames } from "../../../redux/virtualsSlice";
import { Grid } from "antd";
const { useBreakpoint } = Grid;

const CasinoPage = () => {
  const [searchParams] = useSearchParams();
  const pathname = window.location.pathname;
  const categoryFromURL = searchParams.get("categoryId") ?? "Lobby";
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const dispatch = useDispatch();
  const casino_games = useSelector((state) => state.virtuals.casino_games_data);

  //   const fetchGames = async () => {
  //     const data = {
  //       endpoint: "/v1/casino-game-listing",
  //       method: "GET",
  //     };
  //     dispatch(casinoGames(data));
  //   };

  //   useEffect(() => {
  //     if (casino_games.length === 0) {
  //       fetchGames();
  //     }
  //   }, [casino_games.length]);

  const [activeCategory, setActiveCategory] = useState(categoryFromURL);

  useEffect(() => {
    setActiveCategory(categoryFromURL);
  }, [categoryFromURL]);

  return (
    <div
      className="main-content"
      style={{ flex: 1, marginTop: isMobile ? "0px" : "3rem", maxWidth: "100vw" }}
    >
      {pathname === "/" && <SearchModal />}

      {/* <CasinoCarouselLoader /> */}
      {/* <Broadcast /> */}
      <CasinoGames activeSetCategory={activeCategory} />
      {/* <Footer /> */}
    </div>
  );
};

export default CasinoPage;
