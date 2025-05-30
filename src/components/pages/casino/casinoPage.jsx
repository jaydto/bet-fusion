import { useState } from "react";
import HorizontalCategoryList from "./horizontalCategoryList";
import "./index.css";
import SearchModal from "../../modals/SearchModal";
import { useSelector } from "react-redux";

import CasinoGames from "./casinoBody";

const CasinoPage = () => {
  const close_call_to_action = useSelector(
    (state) => state.data.call_to_action
  );
  const [activeCategory, setActiveCategory] = useState("All");
  const pathname = window.location.pathname;

  const onCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  return (
    <div className="main-content" style={{ flex: 1 }}>
      {pathname === "/" && <SearchModal />}
      <HorizontalCategoryList
        activeCategory={activeCategory}
        onCategoryClick={onCategoryClick}
      />

      {/* <CasinoCarouselLoader /> */}
      {/* <Broadcast /> */}
      <CasinoGames activeCategory={activeCategory} />
      {/* <Footer /> */}
    </div>
  );
};

export default CasinoPage;
