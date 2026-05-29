import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Grid } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { casinoGamesSearch, setState } from "../../redux/virtualsSlice";
import { getFromLocalStorage } from "../utils/local-storage";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./searchModal.css";

const { useBreakpoint } = Grid;

const SearchModal = () => {
  const reduxDispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCardId, setActiveCardId] = useState(null);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [crashSearch, setCrashSearch] = useState([]);
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const cardRefs = useRef({}); // map of game_id to card refs

  const casino_search = useSelector(
    (state) => state.virtuals.casino_search_modal
  );
  const { casino_games_data_search, casino_games_data_crash, loading_search } = useSelector(
    (state) => state.virtuals
  );

  const modalRef = useRef(null);
  const searchInputRef = useRef(null);
  const user = getFromLocalStorage("user");

  useEffect(() => {
    if (casino_search) {
      searchInputRef.current?.focus();
    }
  }, [casino_search]);

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
    if (location.pathname === "/" || location.pathname.includes("crashgames")) {
      setSearchQuery("");
    }
  }, [location.pathname]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (location.pathname.includes("crashgames")) {
      gameSearchCrash(value);
    } else {
      gameSearch(value);
    }
  };

  const gameSearchCrash = (query) => {
    const filteredGames = (casino_games_data_crash || []).filter((game) =>
      game?.game_name?.toLowerCase().includes(query.toLowerCase())
    );
    setCrashSearch(filteredGames);
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

  const handleGameClick = (event, gameId, isDemo, game_name) => {
    event.stopPropagation();
    handleClose();
    user?.profile_id
      ? navigate(
          `/casino/game-play?game=${gameId}&status=${
            isDemo ? "1" : "0"
          }&game_name=${game_name}`
        )
      : navigate("/auth/login");
  };

  const handleClose = () =>
    reduxDispatch(setState("casino_search_modal", false));

  if (!casino_search) return null;

  const handleCardClick = (game_id) => {
    setActiveCardId((prev) => (prev === game_id ? null : game_id));

    // Scroll to the clicked card
    const cardNode = cardRefs.current[game_id];
    if (cardNode && cardNode.scrollIntoView) {
      cardNode.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  const games = location.pathname.includes("crashgames")
    ? crashSearch
    : casino_games_data_search;

  return (
    <div className="modal-overlay search-modal-overlay">
      <div
        className="modal-content search-modal"
        ref={modalRef}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 0,
          padding: 0,
          overflow: "hidden",
        }}
      >
        {/* Search header */}
        <div style={{
          padding: "16px 20px 12px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}>
          <div style={{ flex: 1, position: "relative" }}>
            <SearchOutlined style={{
              position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
              color: "#64748b", fontSize: 16, zIndex: 1,
            }} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={handleInputChange}
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10,
                color: "#e2e8f0",
                fontSize: 15,
                padding: "10px 14px 10px 38px",
                outline: "none",
                fontFamily: "'Outfit', sans-serif",
              }}
            />
          </div>
          <button
            onClick={handleClose}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "none",
              borderRadius: "50%",
              width: 34, height: 34,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "rgba(255,255,255,0.7)", fontSize: 15,
              flexShrink: 0,
            }}
          >✕</button>
        </div>

        {/* Results */}
        <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px 16px" }}>
          {searchQuery.trim() === "" ? (
            <div style={{ textAlign: "center", color: "#64748b", fontSize: 14, padding: "32px 0" }}>
              <SearchOutlined style={{ fontSize: 32, marginBottom: 8, display: "block" }} />
              Start typing to search games
            </div>
          ) : loading_search ? (
            /* Skeleton loader while fetching */
            <Row gutter={[10, 10]}>
              {Array.from({ length: isMobile ? 6 : 8 }).map((_, i) => (
                <Col key={i} xs={8} sm={8} md={6}>
                  <div style={{
                    borderRadius: 10,
                    aspectRatio: "3/4",
                    background: "linear-gradient(90deg, #1e293b 25%, #2a3a4a 50%, #1e293b 75%)",
                    backgroundSize: "200% 100%",
                    animation: "search-shimmer 1.4s ease-in-out infinite",
                  }} />
                </Col>
              ))}
              <style>{`
                @keyframes search-shimmer {
                  0% { background-position: 200% 0; }
                  100% { background-position: -200% 0; }
                }
              `}</style>
            </Row>
          ) : games?.length === 0 ? (
            <div style={{ textAlign: "center", color: "#64748b", fontSize: 14, padding: "32px 0" }}>
              No games found for "{searchQuery}"
            </div>
          ) : (
            <Row gutter={[10, 10]}>
              {games?.map((game, index) => {
                const isActive = activeCardId === index;
                const isHovered = hoveredCardId === index;

                return (
                  <Col
                    key={index}
                    xs={8}
                    sm={8}
                    md={6}
                    ref={(el) => (cardRefs.current[index] = el)}
                  >
                    <div
                      style={{
                        position: "relative",
                        borderRadius: 10,
                        overflow: "hidden",
                        cursor: "pointer",
                        aspectRatio: "3/4",
                        background: "#1e293b",
                      }}
                      onClick={() => handleCardClick(index)}
                      onMouseEnter={() => setHoveredCardId(index)}
                      onMouseLeave={() => setHoveredCardId(null)}
                    >
                      <LazyLoadImage
                        alt={game.game_name}
                        src={game.image_url}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                        wrapperProps={{ style: { width: "100%", height: "100%", display: "block" } }}
                      />

                      {/* Game name strip */}
                      <div style={{
                        position: "absolute", bottom: 0, left: 0, width: "100%",
                        background: "linear-gradient(to top, rgba(2,6,23,0.95), transparent)",
                        padding: "16px 6px 5px",
                        fontSize: 10, fontWeight: 600, color: "#e2e8f0",
                        textAlign: "center",
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                      }}>
                        {game.game_name}
                      </div>

                      {(isActive || isHovered) && (
                        <div
                          style={{
                            position: "absolute", inset: 0,
                            background: "rgba(2,6,23,0.75)",
                            display: "flex", flexDirection: "column",
                            alignItems: "center", justifyContent: "center",
                            gap: 8,
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            style={{
                              background: "linear-gradient(135deg, #fb8603, #cc3366)",
                              border: "none", borderRadius: 20,
                              color: "#fff", fontWeight: 700, fontSize: 12,
                              padding: "6px 14px", cursor: "pointer",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleGameClick(e, game.game_id, false, game.game_name);
                            }}
                          >
                            Play Now
                          </button>
                        </div>
                      )}
                    </div>
                  </Col>
                );
              })}
            </Row>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
