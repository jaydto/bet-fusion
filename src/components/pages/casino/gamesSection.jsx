import React, { useState } from "react";
import { Card, Row, Col, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { getFromLocalStorage } from "../../utils/local-storage";
import { LazyLoadImage } from "react-lazy-load-image-component";

const { Meta } = Card;

const GamesSection = ({ games, category = null }) => {
  const navigate = useNavigate();
  const showHeader = category !== null;
  const user = getFromLocalStorage("user");
  const [activeGameId, setActiveGameId] = useState(null); // mobile overlay-3
  

  const handleGameClick = (event, game) => {
    event.stopPropagation();
    if (game.url === "#") {
      // Toggle overlay-3 on mobile
      setActiveGameId((prev) => (prev === game.game_id ? null : game.game_id));
      return;
    }
    if (user?.profile_id) {
      navigate(game.url);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {showHeader && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "12px 0px 0px 12px",
          }}
        >
          <h2
            style={{
              marginRight: "0.5rem",
              fontWeight: 600,
              color: "var(--light)",
            }}
          >
            {category}
          </h2>
          <Tag color="red" style={{ fontWeight: "bold", borderRadius: "6px" }}>
            NEW
          </Tag>
        </div>
      )}

      <div className="games-section" style={{ marginBottom: "2rem" }}>
        <Row gutter={[16, 16]}>
          {games.map((game) => {
            const isUnavailable = game.url === "#";
            const isOverlayVisible = isUnavailable && activeGameId === game.game_id;
            return (
              <Col key={game.game_id} xs={8} sm={8} md={6} lg={6} xl={6}>
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
                      className={`game-wrapper ${
                        isUnavailable ? "unavailable" : ""
                      }`}
                      onClick={(event) => handleGameClick(event, game)}
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
                      {(isOverlayVisible || isUnavailable) && (
                        <div
                          className={`overlay-3 ${
                            isOverlayVisible ? "mobile-visible" : ""
                          }`}
                        >
                          Not Available
                        </div>
                      )}
                    </div>
                  }
                  styles={{ body: { padding: "0px" } }}
                />
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
};

export default GamesSection;
