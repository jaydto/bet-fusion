import { useState } from "react";
import CasinoCarouselLoader from "./carousel";
import CrashGames from "./casinoBody";
import CasinoFilters from "./categories";
import HorizontalCategoryList from "./horizontalCategoryList";
import iconData from "./icondata";
import "./index.css";
import SportsList from "./sportList";

const Index = () => {

  // Step 1: Set up state for active category
  const [activeCategory, setActiveCategory] = useState(null);

  // Step 2: Function to handle category click and set the active category
  const onCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };
  return (
    <div style={{ margin: "auto", maxWidth: "991px", marginTop: "6rem" }}>
      {/* Menu / Sport List */}
      {/* <SportsList/> */}

      <CasinoCarouselLoader />

      {/* Casino Filters */}
      {/* <CasinoFilters/> */}
      <HorizontalCategoryList
        categories={iconData}
        activeCategory={activeCategory}
        onCategoryClick={onCategoryClick}
      />

      <CrashGames />
    </div>
  );
};

export default Index;
