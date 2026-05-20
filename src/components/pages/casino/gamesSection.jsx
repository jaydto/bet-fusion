import React, { useState } from "react";
import { Card, Row, Col, Tag, Button, Typography, Grid } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getFromLocalStorage } from "../../utils/local-storage";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { PlayCircleOutlined } from "@ant-design/icons";

const { Meta } = Card;
const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

const GamesSection = ({ games, category = null, count = 0 }) => {
  const navigate = useNavigate();
  const showHeader = category !== null;
  const user = getFromLocalStorage("user");
  const [activeGameId, setActiveGameId] = useState(null);
  const [hoveredGameId, setHoveredGameId] = useState(null);
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const handleGameClick = (event, gameId, isDemo, game_name) => {
    event.stopPropagation();
    user?.profile_id
      ? navigate(
          `/casino/game-play?game=${gameId}&status=${
            isDemo ? "1" : "0"
          }&game_name=${game_name}`
        )
      : navigate("/auth/login");
  };

  return (
    <>
      {showHeader && (
        <div className="section-header" style={{ padding: "0 12px", marginBottom: 14 }}>
          <h3 className="section-header-title">
            {category} Games
          </h3>
          <button
            className="section-header-all"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            onClick={() =>
              navigate(
                ["crash", "hot", "popular"].includes(category?.toLowerCase())
                  ? `/casino?categoryId=${category?.toLowerCase()}`
                  : `/casino`
              )
            }
          >
            All &rsaquo;
          </button>
        </div>
      )}

      <div className="games-section">
        <Row gutter={[16, 16]}>
          {games.map((game) => {
            const isUnavailable = game.url === "#";
            const isHovered = hoveredGameId === game.game_id;
            const isActive = activeGameId === game.game_id;

            return (
              <Col key={game.game_id} xs={8} sm={8} md={4} lg={4} xl={4}>
                <div
                  // onClick={(e) => handleGameClick(e, game?.game_id, 0,  game?.display_name ?? game?.game_name)}
                  onClick={() => setActiveGameId(activeGameId === game.game_id ? null : game.game_id)}
                  onMouseEnter={() => setHoveredGameId(game.game_id)}
                  onMouseLeave={() => setHoveredGameId(null)}
                  className={`game-wrapper ${
                    isActive || isHovered ? "active" : ""
                  }`}
                >
                  <Card
                    hoverable={!isUnavailable}
                    style={{
                      borderRadius: "12px",
                      overflow: "hidden",
                      border: "none",
                      background: "var(--card, #0f172a)",
                      transition: "transform 0.2s ease",
                    }}
                    cover={
                      <div
                        className={`game-image-container ${
                          isUnavailable ? "unavailable" : ""
                        }`}
                      >
                        <LazyLoadImage
                          alt={game.name}
                          src={game.image_url}
                          className="game-image"
                          style={{
                            width: "100%",
                            borderRadius: "8px",
                            opacity: isUnavailable ? 0.5 : 1,
                          }}
                        />
                        {(isUnavailable || isHovered || isActive) && (
                          <div
                            className={`overlay-2 ${
                              isHovered || isActive ? "show" : ""
                            }`}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent:
                                game.url && game.url !== "#"
                                  ? "center"
                                  : "space-between",
                              alignItems: "center",
                              padding: "16px",
                              textAlign: "center",
                            }}
                          >
                            {/* Show icon + name only when there's no direct URL */}
                            {(!game.url || game.url === "#") && (
                              <>
                                <div className="overlay-top">
                                  <PlayCircleOutlined
                                    style={{ fontSize: 32, color: "var(--white)" }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleGameClick(
                                        e,
                                        game?.game_id,
                                        true,
                                        game?.display_name ?? game?.game_name
                                      );
                                    }}
                                  />
                                </div>
                              </>
                            )}

                            <div className="overlay-center">
                              <Button
                                type="primary"
                                size="middle"
                                className="play-now-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (game.url && game.url !== "#") {
                                    navigate(game.url); // Navigate to game URL
                                  } else {
                                    handleGameClick(
                                      e,
                                      game?.game_id,
                                      false,
                                      game?.display_name ?? game?.game_name
                                    );
                                  }
                                }}
                              >
                                Play Now
                              </Button>
                            </div>

                            {(!game.url || game.url === "#") && (
                              <div className="overlay-bottom">
                                <Text
                                  style={{ color: "var(--white)", fontWeight: 500 }}
                                >
                                  {game.display_name || game.game_name}
                                </Text>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    }
                    styles={{ body: { padding: "0px" } }}
                  />
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
};

export default GamesSection;
