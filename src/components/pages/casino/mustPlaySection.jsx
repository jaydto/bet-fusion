// mustPlaySection.jsx
import React from 'react';
import { Card, Row, Col, Tag } from 'antd';

const { Meta } = Card;

const MustPlaySection = ({ must_play }) => {
  return (
    <div className="must-play-section">
      <h3 className="section-title">
        Must Play <Tag color="red">NEW</Tag>
      </h3>
      <Row gutter={[16, 16]}>
        {must_play.map((game) => (
          <Col key={game.game_id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={<img alt={game.name} src={game.image_url} className="mustplay-image" />}
              onClick={() => console.log(`Navigate to ${game.url}`)}
            >
              <Meta title={game.name} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MustPlaySection;