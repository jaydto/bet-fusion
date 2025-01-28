import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons"; // Importing search icon

const CasinoFilters = () => {
  const [activeFilter, setActiveFilter] = useState("Slots");
  const [searchTerm, setSearchTerm] = useState(""); // State for the search input
  const [isSearching, setIsSearching] = useState(false); // To toggle the search input visibility

  const filters = [
    "My Favourites",
    "Drops and Wins",
    "Evolution Slots",
    "Slots",
    "Popular",
    "Roulette",
    "New Games",
    "Live Games",
    "Bingo and Keno",
  ];

  // Filter the filters based on the search term
  const filteredFilters = filters.filter((filter) =>
    filter.toLowerCase()
  );

  return (
    <div className="casino__filters sticky-top d-flex gap-2 bg-dark shadow-sm p-3 rounded">
      {/* Search Icon */}
      <button
        className="btn btn-outline-secondary btn-sm"
        onClick={() => setIsSearching(!isSearching)}
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>

      {/* Conditional Rendering of Search Input */}
      {isSearching && (
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="Search filters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ minWidth: "150px" , maxWidth:"150px"}}
        />
      )}

      {/* Filter Buttons */}
      {filteredFilters.map((filter) => (
        <button
          key={filter}
          style={{ minWidth: "100px" }}
          className={`btn ${
            activeFilter === filter ? "btn-primary active-category" : "btn-outline-secondary"
          } btn-sm me-2`}
          onClick={() => setActiveFilter(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default CasinoFilters;
