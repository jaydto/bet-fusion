import React, { useState } from "react";
import { Row, Col, Grid } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

import Aviator from "../../assets/img/mobile/aviator.svg";
import Crash from "../../assets/img/mobile/crash.svg";
import Football from "../../assets/img/mobile/football.svg";
import Casino from "../../assets/img/mobile/casino1.svg";
import Virtual from "../../assets/img/mobile/virtual.svg";
import { getFromLocalStorage } from "../utils/local-storage";
import { is } from "date-fns/locale";

const { useBreakpoint } = Grid;

const navItems = [
  // { label: "Football", image: Football, route: "/sports" },
  {
    label: "Aviator",
    image: Aviator,
    route: "/casino/game-play?game=45538&status=0&game_name=AVIATOR",
  },
  { label: "Crash", image: Crash, route: "/casino?categoryId=crash" },
  { label: "Casino", image: Casino, route: "/casino" },
  { label: "Virtual", image: Virtual, route: "/casino?categoryId=virtual" },
];

const GameNavBar = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const navigate = useNavigate();
  const location = useLocation();
  const theme = getFromLocalStorage("theme");
  const [isLightTheme, setIsLightTheme] = useState(theme === "light");

  // Match by route path (basic match without query params)
  const getActiveRoute = () => {
    const currentPath = location.pathname + location.search;
    const matched = navItems.find((item) => currentPath.startsWith(item.route));
    return matched?.label;
  };

  const [active, setActive] = useState(getActiveRoute());

  const handleClick = (item) => {
    setActive(item.label);
    navigate(item.route);
  };

  return (
    <div
      style={{
        background: "inherit",
        padding: isMobile ? "5px 0" : "12px 0",
        borderRadius: 1,
        margin: isMobile ? "6px" : "1px 10px 10px 10px",
        borderBottom: isMobile ? "1px solid var(--bettena-secondary)" : "none",
      }}
    >
      <Row
        justify={isMobile ? "space-between" : "start"}
        align="middle"
        wrap={false}
        style={{
          paddingLeft: 0,
          gap: isMobile ? 0 : 30,
        }}
      >
        {navItems.map((item, index) => {
          const isActive = active === item.label;

          return (
            <Col key={index}>
              <div
                onClick={() => handleClick(item)}
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: "center",
                  color: isActive ? "var(--crimson)" : "var(--light)",
                  minWidth: isMobile ? "auto" : 80,
                  padding: isMobile
                    ? "0 8px"
                    : index === 0
                    ? "0 20px 0 5px"
                    : "0 20px",
                  cursor: "pointer",
                }}
              >
                <img
                  src={item.image}
                  alt={item.label}
                  className={`icon-svg ${isActive ? "active-icon" : ""}`}
                  style={{
                    width: isMobile ? 38 : 34,
                    height: isMobile ? 38 : 34,
                    marginRight: isMobile ? 0 : 8,
                    filter: isActive
                      ? "brightness(0) saturate(100%) invert(15%) sepia(97%) saturate(4343%) hue-rotate(337deg) brightness(85%) contrast(110%)"
                      : isLightTheme
                      ? "invert(1)"
                      : "invert(0)",
                  }}
                />
                <div style={{ fontSize: "14px", marginTop: isMobile ? 4 : 0 }}>
                  {item.label}
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default GameNavBar;
