import React, { useRef, useState } from "react";
import { Row, Col, Button, Typography, Space, Card, Grid } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { PlayCircleOutlined } from "@ant-design/icons";
import { LazyLoadImage } from "react-lazy-load-image-component";

const { Text } = Typography;
const { Title, Link } = Typography;
const { useBreakpoint } = Grid;

const GamesLibrary = ({
  title,
  games = [],
  onViewAll,
  handleGameClick,
  categoryId,
}) => {
  const scrollRef = useRef(null);
  const [activeCardId, setActiveCardId] = useState(null);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const cardRefs = useRef({}); // map of game_id to card refs
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const nowrap = categoryId && categoryId !== "All";

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
    <>
      <Row
        justify="space-between"
        align="middle"
        className="games-header"
        style={{ padding: isMobile ? " 2px 10px" : " 2px 24px" }}
      >
        <Col>
          <Title level={4} className="games-title">
            {title}
          </Title>
        </Col>
        <Col>
          <Space>
            {onViewAll && (
              // Inside your component JSX:
              <Button
                type="link"
                onClick={() => onViewAll(title)}
                className="view-all-link"
              >
                View All
              </Button>
            )}
            <Button
              shape="circle"
              icon={<LeftOutlined />}
              size="small"
              onClick={() => scroll("left")}
            />
            <Button
              shape="circle"
              icon={<RightOutlined />}
              size="small"
              onClick={() => scroll("right")}
            />
          </Space>
        </Col>
      </Row>

      <div className="games-scroll-wrapper" ref={scrollRef}>
        <Row
          wrap={!nowrap} // wrap only if categoryId === "All"
          gutter={[16, 16]}
          style={{ padding: isMobile?10:"10px 24px" }}
          className="games-scroll-container"
        >
          {games.slice(0, 24).map((game, index) => {
            const isActive = activeCardId === game.game_id;
            const isHovered = hoveredCardId === game.game_id;

            return (
              <Col
                key={index}
                xs={8}
                sm={8}
                md={6}
                lg={6}
                xl={4}
                className="game-col"
                ref={(el) => (cardRefs.current[game.game_id] = el)}
              >
                <Card
                  hoverable
                  styles={{ body: { padding: 0 } }}
                  style={{
                    borderRadius: 5,
                    border: "none",
                    background: "transparent",
                    position: "relative",
                  }}
                  cover={
                    <LazyLoadImage
                      alt={game.title}
                      src={game.image}
                      style={{
                        borderRadius: "10px",
                        maxHeight: isMobile ? 130 : 160,
                        minHeight: isMobile ? 130 : 160,
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  }
                  onClick={() => handleCardClick(game.game_id)}
                  onMouseEnter={() => setHoveredCardId(game.game_id)}
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
                            handleGameClick(e, game.game_id, true, game.title);
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
                            handleGameClick(e, game.game_id, false, game.title);
                          }}
                        >
                          Play Now
                        </Button>
                      </div>
                      <div className="overlay-bottom">
                        <Text style={{ color: "#fff", fontWeight: 500 }}>
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
    </>
  );
};

export default GamesLibrary;
