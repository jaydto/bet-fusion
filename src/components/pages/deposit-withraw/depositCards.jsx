import React from "react";
import { Card, Row, Col } from "antd";

const DepositCards = ({ onCardSelect }) => {
  const cards = [
    { id: 1, amount: 100 },
    { id: 2, amount: 200 },
    { id: 3, amount: 500 },
    { id: 4, amount: 1000 },
  ];

  return (
    <Row gutter={[6, 0]} wrap={false} justify="space-between" style={{ marginBottom: 12 }}>
      {cards.map(({ id, amount }) => (
        <Col key={id} flex="1" style={{ minWidth: 0 }}>
          <Card
            hoverable
            onClick={() => onCardSelect && onCardSelect(amount)}
            bodyStyle={{
              padding: "7px 0px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
            style={{
              borderRadius: "6px",
              backgroundColor: "transparent",
              border: "1px solid #fb8603",
              cursor: "pointer",
              textAlign: "center",
              width: "100%",
              margin: 0,
            }}
          >
            <div
              style={{
                color: "#fb8603",
                fontSize: "12px",
                fontWeight: "700",
                whiteSpace: "nowrap",
              }}
            >
              {amount}
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default DepositCards;
