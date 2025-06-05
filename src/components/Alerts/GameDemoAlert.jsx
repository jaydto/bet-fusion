// GameDemoAlert.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const GameDemoAlert = ({ game, user, gameStatus, handleRealGameClick }) => {
  const navigate = useNavigate();

  return (
    // Directly return the JSX
    gameStatus === "demo" && (
      <div>
        <div className="alert alert-info">
          This is {game} demo. To play the real game.{" "}
          {user ? (
            <span
              onClick={handleRealGameClick}
              style={{
                cursor: "pointer",
                color: "blue",
                textDecoration: "underline",
              }}
            >
              Click here to play
            </span>
          ) : (
            <span
              onClick={() => navigate("/auth/login")}
              style={{
                cursor: "pointer",
                color: "blue",
                textDecoration: "underline",
              }}
            >
              please LogIn
            </span>
          )}
          &nbsp;
          <FontAwesomeIcon icon={faFire} style={{ color: "orangered" }} />
        </div>
      </div>
    )
  );
};

export default GameDemoAlert;
