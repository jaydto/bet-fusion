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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LazyLoadImage } from "react-lazy-load-image-component";
import star from "../../../assets/img/star-horizontal.png";
import all from "../../../assets/img/mobile/all.svg";
import fire from "../../../assets/img/fire.png";
import hot from "../../../assets/img/mobile/hot.svg";
import jackpot from "../../../assets/img/jackpot.png";

const iconMap = {
  popular: <LazyLoadImage src={fire} alt="popular" height={"20px"} />,
  hot: <LazyLoadImage src={hot} alt="hot" height={"20px"} />,
  casino: <LazyLoadImage src={jackpot} alt="hot" height={"20px"} />,
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
    { id: "all", name: "All", icon: <LazyLoadImage src={all} alt="hot" height={"20px"} /> }, // Default "All" category
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
      <div className="position-relative w-100" style={{ marginTop:"10rem" }}>
        {loading ? (
          <CategorySkeletonLoader />
        ) : (
          <div
            ref={scrollRef}
            className="d-flex overflow-auto px-2 w-100 scrol-cat gap-2"
          >
            {/* Floating button positioned at the start */}
            {/* <button className="floating-btn position-absolute top-50 start-0 translate-middle-y z-index-100">
              <LazyLoadImage
                src={star}
                alt="Left Arrow"
                onClick={() => scroll("left")}
                height={"20px"}
              />
            </button> */}
            {/* <div className="d-flex gap-3 start-moved"> */}
            <div className="d-flex gap-3 ">
              {/* Category Buttons */}
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`category-btn  py-2 d-flex align-items-center rounded-lg shadow-sm transition-all ${
                    activeCategory === category.name
                      ? "active-category"
                      : "inactive-category"
                  }`}
                  onClick={() => onCategoryClick(category.name)}
                >
                  {category.icon} <span className="ms-2">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Notification Icon - Positioned below the categories */}
     

      {/* <SearchCasino /> */}
    </>
  );
};

export default HorizontalCategoryList;
