import React, { useContext, useState } from "react";
import { FaSearch, FaArrowRight, FaFilter } from "react-icons/fa";
import { StoreContext } from "../../../context/store";

const SearchCasino = () => {
  const [isFocused, setIsFocused] = useState(false);
    const { state, dispatch } = useContext(StoreContext);
  
    const dismissSearch = () => {
      dispatch({ type: "SET", key: "searching", payload: false });
    };
  
    const handleSearch = () => {
      dispatch({ type: "SET", key: "searching", payload: true });
    };

  return (
    <div className="d-flex justify-content-end mt-1 mx-4 mx-lg-0 align-items-center">
      <div
        id="search-casino"
        name="search-casino-form"
        className="d-flex w-100 my-1 position-relative"
      >
        <div
          className={`input-group input-group-lg w-100 my-1 position-relative rounded-pill ${
            isFocused ? "border-purple" : ""
          }`}
          style={{
            borderColor: isFocused ? "#800080" : "transparent", // Purple border color
            transition: "border-color 0.3s ease-in-out", // Smooth transition for the border
          }}
        >
          <span className="input-group-text bg-transparent d-flex align-items-center justify-content-center">
            <FaSearch size={20} className="text-white" />
            <input
            type="text"
            className="form-control bg-transparent text-white border-0 fs-6 px-2 py-1 search-cat"
            placeholder="SEARCH GAME"
            style={{
              backgroundColor: isFocused ? "transparent" : "#2a2a2a", // Transparent when focused
              transition: "background-color 0.3s ease-in-out", // Smooth background color transition
              borderRadius: "50px", // Rounded corners for the input
            }}
            onFocus={() => {
              setIsFocused(true);
              handleSearch(); // Call handleSearch on focus
            }}
            onClick={handleSearch} // Call handleSearch on click
            onBlur={() => setIsFocused(false)}
          />
          </span>
         
        </div>
        <button className="btn btn-link p-0 ms-2 w-10 h-9 d-none" type="submit">
          <FaArrowRight size={18} />
        </button>
      </div>
      <div className="actBtns">
        <button
          className="btn btn-link p-0 ms-2 w-9 h-9 hover-opacity-75 transition-all shadow-sm border-0"
          type="button"
        >
          <FaFilter size={25} />
        </button>
      </div>
    </div>
  );
};

export default SearchCasino;
