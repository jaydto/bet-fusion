import React from "react";
import { Card, Row, Col } from "antd";

const DepositCards = ({ onCardSelect }) => {
  const cards = [
    { id: 1, amount: 50 },
    { id: 2, amount: 99 },
    { id: 3, amount: 250 },
    { id: 4, amount: 500 },
    { id: 5, amount: 1000 },
  ];

  return (
    <Row gutter={[4, 0]} wrap={false} justify="space-between">
      {cards.map(({ id, amount }) => (
        // "Ignore grid numbers, just divide the available space equally."
        <Col key={id} flex="1" style={{ minWidth: 0 }}>
          <Card
            hoverable
            onClick={() => onCardSelect && onCardSelect(amount)}
            // Override AntD default padding
            bodyStyle={{
              padding: "6px 0px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
            style={{
              borderRadius: "4px",
              backgroundColor: "transparent",
              border: "1px solid var(--bet-fusion-grey)",
              cursor: "pointer",
              textAlign: "center",
              width: "100%",
              margin: 0,
            }}
          >
            <div
              style={{
                color: "var(--white)",
                fontSize: "11px", 
                fontWeight: "700",
                whiteSpace: "nowrap",
              }}
            >
              +{amount} <span style={{ fontSize: "11px" }}>KES</span>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default DepositCards;
