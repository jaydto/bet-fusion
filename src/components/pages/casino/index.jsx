import { useState } from "react";
import CasinoCarouselLoader from "./carousel";
import CrashGames from "./casinoBody";
import CasinoFilters from "./categories";
import HorizontalCategoryList from "./horizontalCategoryList";
import "./index.css";
import SearchModal from "../../modals/SearchModal";

const Index = () => {
  // Step 1: Set up state for active category
  const [activeCategory, setActiveCategory] = useState("All");

  // Step 2: Function to handle category click and set the active category
  const onCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };
  const pathname = window.location.pathname;

  return (
    <div style={{ margin: "auto", maxWidth: "991px", marginTop: "6rem" }}>
      {/* Menu / Sport List */}
      {/* <SportsList/> */}
      {pathname==="/" && <SearchModal />}


      <CasinoCarouselLoader />

      {/* Casino Filters */}
      {/* <CasinoFilters/> */}
      <HorizontalCategoryList
        activeCategory={activeCategory}
        onCategoryClick={onCategoryClick}
      />

      <CrashGames activeCategory={activeCategory} />
    </div>
  );
};

export default Index;
