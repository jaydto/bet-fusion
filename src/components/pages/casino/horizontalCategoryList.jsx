import React, { useRef } from "react";
import { useSelector } from "react-redux";
import {
  FaCube,
  FaFire,
  FaGamepad,
  FaMusic,
  FaStar,
  FaDice,
  FaTicketAlt,
  FaChessKnight,
  FaFish,
} from "react-icons/fa";
import SearchCasino from "./filter";
import { CategorySkeletonLoader } from "./categorySkeleton";

const iconMap = {
  popular: <FaStar />,
  game_shows_new: <FaGamepad />,
  fishing_and_hunting_new: <FaFish />,
  video_slot: <FaTicketAlt />,
  lottery_new: <FaDice />,
  andar_bahar_new: <FaChessKnight />,
  teen_patti_new: <FaChessKnight />,
  bingo_new: <FaTicketAlt />,
  arcade_games_new: <FaGamepad />,
  american_roulette: <FaDice />,
  dice_new: <FaDice />,
  baccarat_new: <FaChessKnight />,
  poker_new: <FaChessKnight />,
  roulette_new: <FaDice />,
  blackjack_new: <FaGamepad />,
  betting_games_new: <FaFire />,
  scratch_new: <FaTicketAlt />,
  default: <FaCube />, // Fallback icon
};

const HorizontalCategoryList = ({ activeCategory, onCategoryClick }) => {
  const scrollRef = useRef(null);
  const casinoTypes = useSelector((state) => state.virtuals.casino_games_types);
  const loading = useSelector((state) => state.virtuals.loading);

  
  // if (loading) return null; // Hide the section when loading

  // Add "All" category as default
  const categories = [
    { id: "all", name: "All", icon: <FaCube /> }, // Default "All" category
    ...casinoTypes.map((category) => ({
      id: category.game_type_id,
      name: category.game_type_description,
      icon: iconMap[category.game_type_id] || iconMap.default,
    })),
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth / 2;
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="position-relative w-100">
        <button
          className="bt-cat cat-p position-absolute category-pointers pointer-1 translate-middle-y text-white p-2 shadow z-index-10"
          onClick={() => scroll("left")}
        >
          {"<"}
        </button>
        {loading ? (
          <CategorySkeletonLoader />
        ) : (
          <div
            ref={scrollRef}
            className="d-flex overflow-auto px-4 w-100 scrol-cat"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 bg-cat-1 d-flex align-items-center rounded-lg shadow-sm transition-all bt-cat ${
                  activeCategory === category.name
                    ? "activeBt text-white"
                    : "text-light"
                }`}
                onClick={() => onCategoryClick(category.name)}
              >
                {category.icon} <span className="ms-2">{category.name}</span>
              </button>
            ))}
          </div>
        )}
        <button
          className="bt-cat cat-p position-absolute category-pointers pointer-2 translate-middle-y text-white p-2 shadow z-index-10"
          onClick={() => scroll("right")}
        >
          {">"}
        </button>
      </div>
      <SearchCasino />
    </>
  );
};

export default HorizontalCategoryList;
