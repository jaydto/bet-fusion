// gamesSection.jsx
import React from 'react';
import { Card, Row, Col } from 'antd';

const { Meta } = Card;

const GamesSection = ({ games }) => {
  return (
    <div className="games-section">
      <Row gutter={[16, 16]}>
        {games.map((game) => (
          <Col key={game.game_id} xs={12} sm={8} md={6} lg={4}>
            <Card
              hoverable
              cover={<img alt={game.name} src={game.image_url} className="game-image" />}
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

export default GamesSection;