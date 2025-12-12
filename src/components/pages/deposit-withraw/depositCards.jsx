import React from "react";
import { Card, Row, Col } from "antd";

const DepositCards = ({ onCardSelect }) => {
  const cards = [
    { id: 1, amount: 50, value: "50" },
    { id: 2, amount: 99, value: "99" },
    { id: 3, amount: 250, value: "250" },
    { id: 4, amount: 500, value: "500" },
    { id: 5, amount: 1000, value: "1000" },
    // { id: 6, amount: 600, value: "60" },
  ];

  const handleCardClick = (amount) => {
    if (onCardSelect) onCardSelect(amount);
  };

  return (
    <Row gutter={[16, 16]} wrap justify="space-around">
      {cards.map(({ id, amount, value }) => (
        <Col key={id} xs={4} sm={4} md={4} lg={4}>
          <Card
            hoverable
            onClick={() => handleCardClick(amount)}
            style={{
              borderRadius: "5px",
              cursor: "pointer",
              backgroundColor: "transparent",
              // height: "100%",
              fontSize: "12px",
              color: "var(--white)",
              border: "1px solid var(--bet-fusion-grey)",
              whiteSpace: "nowrap",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "0 10px",
              textAlign: "center",
            }}
          >
            <p style={{ margin: 0 }}>+{amount} KES</p>
            {/* <div style={{ fontSize: 12, color: "#888" }}>Get {value} coins</div> */}
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default DepositCards;
