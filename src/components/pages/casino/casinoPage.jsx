import { useState } from "react";
import CasinoCarouselLoader from "./carousel";
import CrashGames from "./casinoBody";
import HorizontalCategoryList from "./horizontalCategoryList";
import "./index.css";
import SearchModal from "../../modals/SearchModal";
import { useSelector } from "react-redux";
import Broadcast from "./broadcast";
import Sidebar from "./sidebar";
import Footer from "./footer";
import MobileMenu from "../../mobile-menu";

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
        <CrashGames activeCategory={activeCategory} />
        {/* <Footer /> */}
      </div>
    
  );
};

export default CasinoPage;
