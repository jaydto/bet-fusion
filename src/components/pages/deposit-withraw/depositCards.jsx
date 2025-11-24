import React from "react";
import { Card, Row, Col } from "antd";

const DepositCards = ({ onCardSelect }) => {
  const cards = [
    { id: 1, amount: 100, value: "10" },
    { id: 2, amount: 200, value: "20" },
    { id: 3, amount: 300, value: "30" },
    { id: 4, amount: 400, value: "40" },
    { id: 5, amount: 500, value: "50" },
    { id: 6, amount: 600, value: "60" },
  ];

  const handleCardClick = (amount) => {
    if (onCardSelect) onCardSelect(amount);
  };

  return (
    <Row gutter={[16, 16]} wrap justify="start">
      {cards.map(({ id, amount, value }) => (
        <Col key={id} xs={8} sm={8} md={8} lg={8}>
          <Card
            hoverable
            onClick={() => handleCardClick(amount)}
            style={{
              textAlign: "center",
              borderRadius: "10px",
              cursor: "pointer",
              backgroundColor: "#f0f2f5",
              height: "100%",
            }}
            bodyStyle={{ padding: "20px" }}
          >
            <h6>KES {amount}</h6>
            {/* <div style={{ fontSize: 12, color: "#888" }}>Get {value} coins</div> */}
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default DepositCards;
