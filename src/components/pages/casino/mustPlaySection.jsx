import React from "react";
import { Card, Row, Col, Tag } from "antd";

const MustPlaySection = ({ must_play }) => {
  return (
    <div className="must-play-section">
      <h3
        className="section-title"
        style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
      >
        Must Play <Tag color="red">NEW</Tag>
      </h3>
      <Row gutter={[16, 16]}>
        {must_play.map((game) => (
          <Col key={game.game_id} xs={12} sm={12} md={12} lg={12}>
            <Card
              hoverable
              styles={{body: {padding: 0} }}
              onClick={() => console.log(`Navigate to ${game.url}`)}
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                border: "none",
                background: "transparent",
              }}
              cover={
                <img
                  alt={game.name}
                  src={game.image_url}
                  className="mustplay-image"
                  style={{
                    width: "100%",
                    display: "block",
                    borderRadius: "16px",
                  }}
                />
              }
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MustPlaySection;
