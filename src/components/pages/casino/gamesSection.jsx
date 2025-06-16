import React, { useState } from "react";
import { Card, Row, Col, Tag, Button, Typography, Grid } from "antd";
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 12px 0px 12px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              paddingRight: isMobile ? 0 : "12px",
            }}
          >
            <Title level={4} className="games-title" style={{ margin: 0 }}>
              {category}
            </Title>
            {["crash", "hot", "popular"].includes(category?.toLowerCase()) && (
              <Tag
                color="red"
                style={{ fontWeight: "bold", borderRadius: "6px" }}
              >
                NEW
              </Tag>
            )}
          </div>

          <Button
            type="link"
            style={{
              fontWeight: 500,
              color: "var(--light)",
              borderRadius: "6px",
              border: "none",
            }}
            onClick={() =>
              navigate(
                ["crash", "hot", "popular"].includes(category?.toLowerCase())
                  ? `/casino?categoryId=${category?.toLowerCase()}`
                  : `/casino`
              )
            }
          >
            View All{" "}
            <span
              style={{
                background: "var(--btn-color-action)",
                color: "var(--black)",
                borderRadius: "15px",
                padding: "1px 5px",
                fontSize: 10,
                lineHeight: 1.5,
              }}
            >
              {count}
            </span>
          </Button>
        </div>
      )}

      <div className="games-section">
        <Row gutter={[16, 16]}>
          {games.map((game) => {
            const isUnavailable = game.url === "#";
            const isHovered = hoveredGameId === game.game_id;
            const isActive = activeGameId === game.game_id;

            return (
              <Col key={game.game_id} xs={12} sm={12} md={6} lg={6} xl={6}>
                <div
                  // onClick={(e) => handleGameClick(e, game?.game_id, 0,  game?.display_name ?? game?.game_name)}
                  onMouseEnter={() => setHoveredGameId(game.game_id)}
                  onMouseLeave={() => setHoveredGameId(null)}
                  className={`game-wrapper ${
                    isActive || isHovered ? "active" : ""
                  }`}
                >
                  <Card
                    hoverable={!isUnavailable}
                    style={{
                      borderRadius: "16px",
                      overflow: "hidden",
                      border: "none",
                      background: "transparent",
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
                            borderRadius: "16px",
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
                                    style={{ fontSize: 32, color: "#fff" }}
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
                                  style={{ color: "#fff", fontWeight: 500 }}
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
