import React, { useState, useEffect, useRef, useContext } from "react";
import { StoreContext } from "../../context/store";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import "./searchModal.css";
import { casinoGamesSearch, setState } from "../../redux/virtualsSlice";
import { FaSearch } from "react-icons/fa";
import { getFromLocalStorage } from "../utils/local-storage";
import LazyLoad from "react-lazyload";
import { LazyLoadImage } from "react-lazy-load-image-component";

const SearchModal = () => {
  const { state, dispatch } = useContext(StoreContext);
  const reduxDispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const modalRef = useRef(null);
  const searchInputRef = useRef(null);

  const { casino_games_data_search } = useSelector((state) => state.virtuals);
  const casino_games_crash = useSelector(
    (state) => state.virtuals.casino_games_data_crash
  );
  const [crashSearch, setCrashSearch] = useState([]);

  useEffect(() => {
    if (location.pathname === "/" || location.pathname.includes("crashgames")) {
      setSearchQuery("");
    }
  }, [location.pathname]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    location.pathname.includes("crashgames")
      ? gameSearchCrash(value)
      : gameSearch(value);
  };

  const gameSearchCrash = (query) => {
    const filteredGames = casino_games_crash.filter((game) =>
      game.game_name.toLowerCase().includes(query.toLowerCase())
    );
    setCrashSearch(filteredGames);
  };

  const handleClose = () => {
    dispatch({ type: "SET", key: "searching", payload: false });
    dispatch({ type: "SET", key: "searching_nav", payload: false });
  };

  const gameSearch = async (query) => {
    if (query.trim() === "") {
      reduxDispatch(setState("casino_games_data_search", []));
      reduxDispatch(setState("casino_games_types_search", []));
      reduxDispatch(setState("casino_games_providers_search", []));
      return;
    }
    const endpoint = `/v1/casino-game-listing?search=${query}`;
    reduxDispatch(casinoGamesSearch({ endpoint, method: "GET" }));
  };
  const [hoveredGame, setHoveredGame] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState({});
  const user = getFromLocalStorage("user"); // Always get the user from local storage

  const [activeGameOverlay, setActiveGameOverlay] = useState(null);

  const toggleOverlay = (event, gameId) => {
    event.preventDefault();
    event.stopPropagation();
    setActiveGameOverlay((prev) => (prev === gameId ? null : gameId));
  };

  console.log("overlay visible", overlayVisible);

  const handleGameClick = (event, gameId, isDemo, game_name) => {
    event.stopPropagation(); // Prevent event bubbling if needed
    console.log("Game ID:", gameId, "Demo Mode:", isDemo);

    user?.profile_id
      ? navigate(
          `/game-play?game=${gameId}&status=${
            isDemo ? "1" : "0"
          }&game_name=${game_name}`
        )
      : navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (state?.searching) {
      searchInputRef.current?.focus();
    }
  }, [state?.searching]);

  if (!state?.searching) return null;

  return (
    <div className="modal-overlay search-modal-overlay">
      <div className="modal-content search-modal" ref={modalRef}>
        <div className="mb-3 w-100 ">
          <div
            className={`input-group input-group-lg w-100 my-1 position-relative rounded-pill search-casino ${
              isFocused ? "border-purple" : ""
            }`}
            style={{
              borderColor: isFocused ? "#800080" : "transparent", // Purple border color
              transition: "border-color 0.3s ease-in-out", // Smooth transition for the border
            }}
          >
            <span className="input-group-text bg-transparent d-flex align-items-center justify-content-center  ">
              <FaSearch size={20} className="text-white" />
              <input
                type="text"
                ref={searchInputRef}
                className="form-control bg-transparent text-white border-0 fs-6 px-2 py-1 search-cat"
                placeholder="SEARCH GAME"
                style={{
                  backgroundColor: isFocused ? "transparent" : "#2a2a2a", // Transparent when focused
                  transition: "background-color 0.3s ease-in-out", // Smooth background color transition
                  borderRadius: "50px", // Rounded corners for the input
                }}
                onFocus={() => {
                  setIsFocused(true);
                }}
                value={searchQuery}
                onChange={handleInputChange}
                // onBlur={() => setIsFocused(false)}
              />
            </span>
          </div>
        </div>

        <div className="mt-3">
          <div className="row row-cols-3 g-3 text-light">
            {(location.pathname.includes("crashgames")
              ? crashSearch
              : casino_games_data_search
            )?.map((game) => (
              <div key={game.game_id}>
                <div
                  className="casino-search-item"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    toggleOverlay(event, game.game_id);
                  }}
                  onMouseEnter={() => {
                    if (activeGameOverlay !== game.game_id) {
                      setHoveredGame(game.game_id);
                    }
                  }}
                  onMouseLeave={() => {
                    if (activeGameOverlay !== game.game_id) {
                      setHoveredGame(null);
                    }
                  }}
                >
                  <LazyLoadImage
                    src={game.image_url}
                    alt={game.game_name}
                    effect="black-and-white"
                    className="casino-search-thumbnail"
                  />
                 
                  {(hoveredGame === game.game_id ||
                    activeGameOverlay === game.game_id) && (
                    <div className="overlay-search gap-2">
                      <button
                        className="overlay-btn"
                        onClick={(event) =>
                          handleGameClick(
                            event,
                            game.game_id,
                            false,
                            game.game_name
                          )
                        }
                      >
                        Play
                      </button>
                      <button
                        className="overlay-btn"
                        onClick={(event) =>
                          handleGameClick(
                            event,
                            game.game_id,
                            true,
                            game.game_name
                          )
                        }
                      >
                        Demo
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleClose} className="btn btn-danger-search">
          Close
        </button>
      </div>
    </div>
  );
};

export default SearchModal;
