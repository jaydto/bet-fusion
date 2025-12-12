import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Input, Button, Typography, Row, Col, Card, Grid } from "antd";
import { PlayCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { casinoGamesSearch, setState } from "../../redux/virtualsSlice";
import { getFromLocalStorage } from "../utils/local-storage";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./searchModal.css";

const { Text } = Typography;
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
  const { casino_games_data_search, casino_games_data_crash } = useSelector(
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
    const filteredGames = casino_games_data_crash.filter((game) =>
      game.game_name.toLowerCase().includes(query.toLowerCase())
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

  return (
    <div className="modal-overlay search-modal-overlay">
      <div className="modal-content search-modal" ref={modalRef}>
        <Input
          ref={searchInputRef}
          size="large"
          placeholder="Search games"
          prefix={<SearchOutlined style={{ color: "#ccc" }} />}
          value={searchQuery}
          onChange={handleInputChange}
          className="search-cat bg-transparent"
          style={{
            borderRadius: 50,
            background: "linear-gradient(var(--bet-fusion-secondary) 0 0) padding-box, var(--bet-fusion-button-login) border-box",
            color: "var(--light)",
            border: " 1px solid transparent",
          }}
        />

        <div className="mt-3">
          <Row gutter={[16, 16]}>
            {(location.pathname.includes("crashgames")
              ? crashSearch
              : casino_games_data_search
            )?.map((game, index) => {
              const isActive = activeCardId === index;
              const isHovered = hoveredCardId === index;

              return (
                <Col
                  key={index}
                  xs={12}
                  sm={12}
                  md={8}
                  lg={8}
                  ref={(el) => (cardRefs.current[index] = el)}
                >
                  <Card
                    hoverable
                    styles={{ body: { padding: 0 } }}
                    style={{
                      borderRadius: "16px",
                      border: "none",
                      background: "transparent",
                      position: "relative",
                    }}
                    cover={
                      <LazyLoadImage
                        alt={game.game_name}
                        src={game.image_url}
                        style={{
                          borderRadius: "10px",
                          maxHeight: isMobile ? 120 : 150,
                          minHeight: isMobile ? 120 : 150,
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    }
                    onClick={() => handleCardClick(index)}
                    onMouseEnter={() => setHoveredCardId(index)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    className={`${isActive || isHovered ? "active" : ""}`}
                  >
                    {(isActive || isHovered) && (
                      <div
                        className="overlay-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="overlay-top">
                          <PlayCircleOutlined
                            style={{ fontSize: 32, color: "#fff" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleGameClick(
                                e,
                                game.game_id,
                                true,
                                game.game_name
                              );
                            }}
                          />
                        </div>
                        <div className="overlay-center">
                          <Button
                            type="primary"
                            size="middle"
                            className="play-now-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleGameClick(
                                e,
                                game.game_id,
                                false,
                                game.game_name
                              );
                            }}
                          >
                            Play Now
                          </Button>
                        </div>
                        <div className="overlay-bottom">
                          <Text style={{ color: "var(--white)", fontWeight: 500 }}>
                            {game.title}
                          </Text>
                        </div>
                      </div>
                    )}
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>

        <Button onClick={handleClose} danger style={{ marginTop: 20, background: "var(--bet-fusion-button-login)", color: "var(--white)" }}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default SearchModal;
