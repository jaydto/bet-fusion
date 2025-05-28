import { Suspense, useEffect, useState } from "react";
import CrashGames from "./casinoBody";
import HorizontalCategoryList from "./horizontalCategoryList";
import "./index.css";
import SearchModal from "../../modals/SearchModal";
import { Col, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { Grid } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { casinoGames } from "../../../redux/virtualsSlice";
const { useBreakpoint } = Grid;

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const pathname = window.location.pathname;
  const dispatch = useDispatch();

  const screens = useBreakpoint();

  const isMobile = !screens.md;

  const onCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const casino_games = useSelector((state) => state.virtuals.casino_games_data);

  const fetchGames = async () => {
    const data = {
      endpoint: "/v1/casino-game-listing",
      method: "GET",
    };
    dispatch(casinoGames(data));
  };

  useEffect(() => {
    if (casino_games.length === 0) {
      fetchGames();
    }
  }, [casino_games.length]);

  return (
    <div
      className="main-layout"
      style={{
        margin: "auto",
        // maxWidth: "1200px", // Increased for sidebar + content
        marginTop: "5.9rem",
        display: "flex",
        overflowX: "hidden",
        // gap: "1rem",
        // padding: "0 1rem",
      }}
    >
      <SearchModal />
      <div style={{ backgroundColor: "var(--bettena-primary)" }}>
        <Row justify="center">
          <Col
            xs={24}
            sm={24}
            md={23}
            lg={24}
            xl={24}
            style={{ padding: isMobile ? 6 : 10 }}
          >
            <Suspense
              fallback={<div style={{ color: "#fff" }}>Loading Page...</div>}
            >
              <Outlet />
            </Suspense>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Index;
