import React, { useRef } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCube,
  FaFire,
  FaGamepad,
  FaMusic,
  FaStar,
} from "react-icons/fa"; // Importing sample icons from react-icons/fa
import SearchCasino from "./filter";

const HorizontalCategoryList = ({
  categories,
  activeCategory,
  onCategoryClick,
}) => {
  const scrollRef = useRef(null);

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

  // Function to get the appropriate icon for each category
  const getCategoryIcon = (category) => {
    switch (category.icon) {
      case "crash":
        return <FaCube />;
      case "game":
        return <FaGamepad />;
      case "music":
        return <FaMusic />;
      case "hot":
        return <FaFire />;
      case "popular":
        return <FaStar />;
      default:
        return <FaCube />; // Default icon if none matched
    }
  };
  return (
    <>
      <div className="position-relative w-100">
        <button
          className="bt-cat cat-p position-absolute category-pointers pointer-1 translate-middle-y text-white p-2  shadow z-index-10"
          onClick={() => scroll("left")}
        >
          <FaChevronLeft />
        </button>
        <div ref={scrollRef} className="d-flex overflow-auto px-4 w-100 scrol-cat">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 bg-cat-1 d-flex align-items-center rounded-lg shadow-sm transition-all  bt-cat ${
                activeCategory === category.id
                  ? "activeBt text-white"
                  : "text-light"
              }`}
              onClick={() => onCategoryClick(category.id)}
            >
              {getCategoryIcon(category)} {/* Display category icon */}
              <span className="ms-2">{category.name}</span>{" "}
              {/* Category name */}
            </button>
          ))}
        </div>
        <button
          className="bt-cat cat-p position-absolute category-pointers pointer-2 translate-middle-y  text-white p-2  shadow z-index-10"
          onClick={() => scroll("right")}
        >
          <FaChevronRight />
        </button>
      </div>
      <SearchCasino /> {/* Here is the SearchCasino component */}
    </>
  );
};

export default HorizontalCategoryList;
