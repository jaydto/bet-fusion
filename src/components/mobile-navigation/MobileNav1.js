import React, { useState } from "react";
import { Row, Col, Grid } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

import Aviator from "../../assets/img/Aviator.svg";
import Crash from "../../assets/img/Crash.svg";
import Football from "../../assets/img/Football.png";
import Casino from "../../assets/img/Casino.svg";
import Virtual from "../../assets/img/Virtuals.svg";
import { getFromLocalStorage } from "../utils/local-storage";
import { is } from "date-fns/locale";

const { useBreakpoint } = Grid;

const navItems = [
  // { label: "Football", image: Football, route: "/sports" },
  {
    label: "Aviator",
    image: Aviator,
    route: "/casino/game-play?game=58630&status=0&game_name=AVIATOR",
  },
  { label: "Crash", image: Crash, route: "/casino?categoryId=crash" },
  { label: "Casino", image: Casino, route: "/casino" },
  { label: "Virtual", image: Virtual, route: "/casino?categoryId=virtual" },
];

const ICON_MAP = {
  Football,
  Aviator,
  Crash,
  Casino,
  Virtual
};

const GRADIENTS = [
  "linear-gradient(90deg, #32e580 0%, #0b33d3 100%)",
  "linear-gradient(90deg, #d032e5 0%, #1fdfe3 100%)",
  "linear-gradient(90deg, #d032e5 0%, #ff551c 100%)",
  "linear-gradient(90deg, #d032e5 0%, #00ff40 100%)",
];


const GameNavBar = ({ categories = [] }) => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const navigate = useNavigate();
  const location = useLocation();
  const theme = getFromLocalStorage("theme");
  const [isLightTheme, setIsLightTheme] = useState(theme === "light");

  // Match by route path (basic match without query params)
  const getActiveRoute = () => {
    const currentPath = location.pathname + location.search;
    const matched = categories.find((item) => currentPath.startsWith(item.url));
    return matched?.name;
  };

  const [active, setActive] = useState(getActiveRoute());

  const handleClick = (item) => {
    setActive(item.name);
    navigate(item.url);
  };

  return (
    <div
      style={{
        background: "inherit",
        padding: isMobile ? "5px 0" : "12px 0",
        borderRadius: 1,
        margin: isMobile ? "6px" : "1px 10px 10px 10px",
        borderBottom: isMobile ? "1px solid var(--bet-fusion-secondary)" : "none",
      }}
    >
      <Row
        justify={isMobile ? "space-between" : "start"}
        align="middle"
        wrap={false}
        style={{
          paddingLeft: 0,
          gap: isMobile ? 5 : 10,
        }}
      >
        {categories.map((item, index) => {
          const isActive = active === item.name;
          const icon = ICON_MAP[item.name];

          return (
            <Col key={index}>
              <div
                onClick={() => handleClick(item)}
                style={{
                  background: `linear-gradient(var(--bet-fusion-secondary) 0 0) padding-box, ${GRADIENTS[index % GRADIENTS.length]} border-box`,
                  border: "2px solid transparent",
                  // borderImageSource: GRADIENTS[index % GRADIENTS.length],
                  // borderImageSlice: "1",
                  borderRadius: 20,
                  padding: 2,
                  overflow: "hidden",   
                }}
              >
                <div
                  style={{ 
                    display: "flex",
                    flexDirection: isMobile ? "row" : "row",
                    alignItems: "center",
                    justifyContent: "center",
                    color: isActive ? "var(--white)" : "var(--white)",
                    minWidth: isMobile ? "auto" : 80,
                    borderImage: "1",
                    borderRadius: 8,
                    backgroundClip: "padding-box",
                    padding: isMobile
                      ? "0px 8px"
                      : index === 0
                      ? "0px 20px 0px 5px"
                      : "0px 20px",
                    cursor: "pointer",
                   }}
                >
                  <img
                    src={icon}
                    alt={item.name}
                    className={`icon-svg ${isActive ? "active-icon" : ""}`}
                    style={{
                      width: isMobile ? 15 : 20,
                      height: isMobile ? 15 : 20,
                      marginRight: isMobile ? 0 : 8,
                      marginLeft: isMobile ? 0 : 2,
                      filter: isActive
                        ? "brightness(0) saturate(100%) invert(15%) sepia(97%) saturate(4343%) hue-rotate(337deg) brightness(85%) contrast(110%)"
                        : isLightTheme
                        ? "invert(1)"
                        : "invert(0)",
                    }}
                  />
                  <div style={{ fontSize: "14px", marginTop: isMobile ? 4 : 0 }}>
                    {item.name}
                  </div>
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
