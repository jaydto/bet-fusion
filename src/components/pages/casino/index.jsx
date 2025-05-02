import { useState } from "react";
import CasinoCarouselLoader from "./carousel";
import CrashGames from "./casinoBody";
import CasinoFilters from "./categories";
import HorizontalCategoryList from "./horizontalCategoryList";
import "./index.css";
import SearchModal from "../../modals/SearchModal";
import { useSelector } from "react-redux";
import Broadcast from "./broadcast";

const Index = () => {
  const close_call_to_action = useSelector(
    (state) => state.data.call_to_action
  );
  // Step 1: Set up state for active category
  const [activeCategory, setActiveCategory] = useState("All");

  // Step 2: Function to handle category click and set the active category
  const onCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };
  const pathname = window.location.pathname;

  return (
    <div
      style={{
        margin: "auto",
        maxWidth: "991px",
        marginTop: close_call_to_action ? "1rem" : "4rem",
      }}
    >
      {/* Menu / Sport List */}
      {/* <SportsList/> */}
      {pathname === "/" && <SearchModal />}
      <HorizontalCategoryList
        activeCategory={activeCategory}
        onCategoryClick={onCategoryClick}
      />

      <CasinoCarouselLoader />
      <Broadcast/>

      {/* Casino Filters */}
      {/* <CasinoFilters/> */}

      <CrashGames activeCategory={activeCategory} />
    </div>
  );
};

export default Index;
