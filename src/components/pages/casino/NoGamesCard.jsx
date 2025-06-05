import React from "react";
import { Card, Typography } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice } from "@fortawesome/free-solid-svg-icons";

const { Text } = Typography;

const NoGamesCard = () => {
  return (
    <Card
      style={{
        margin: "40px auto",
        textAlign: "center",
        padding: 32,
        borderRadius: 16,
        backgroundColor: "var(--jaza-bets-header-bg-btn)",
      }}
      variant="borderless"
      hoverable={false}
    >
      <div style={{ fontSize: 64, color: "#1890ff" }}>
        <FontAwesomeIcon icon={faDice} />
      </div>
      <Text
        style={{
          fontSize: 16,
          color: "var(--light)",
          marginTop: 16,
          display: "block",
        }}
      >
        There are no games currently available.
      </Text>
    </Card>
  );
};

export default NoGamesCard;
