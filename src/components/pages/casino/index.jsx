import { Suspense, useEffect, useState } from "react";

import "./index.css";
import SearchModal from "../../modals/SearchModal";
import { Col, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { Grid } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { casinoGames } from "../../../redux/virtualsSlice";
import { data } from "./data";
import MobileMenu from "../../mobile-menu";
import DepositModal from "../../modals/DepositModal";
const { useBreakpoint } = Grid;

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const dispatch = useDispatch();
  const screens = useBreakpoint();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const showDepositModal = useSelector(
    (state) => state.data.show_deposit_modal
  );

  const casino_search = useSelector(
    (state) => state.virtuals.casino_search_modal
  );
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const isMobile = !screens.md;

  const onCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const casino_games = useSelector((state) => state.virtuals.casino_games_data);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        width: "100%",
        marginTop: "3.5rem",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
      }}
    >
      {showDepositModal && <DepositModal />}
      {casino_search && <SearchModal />}

      <div style={{ backgroundColor: "var(--bettena-primary)", width: "100%" }}>
        <Row justify="center">
          <Col
            xs={24}
            sm={24}
            md={23}
            lg={24}
            xl={24}
            style={{
              padding: isMobile ? "6px" : "10px",
              width: "100%",
            }}
          >
            <Suspense
              fallback={<div style={{ color: "#fff" }}>Loading Page...</div>}
            >
              <Outlet />
            </Suspense>
          </Col>
        </Row>
      </div>
      {showScrollTop && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          ▲
        </button>
      )}
      {/* Scroll-to-top button CSS */}
      <style jsx>{`
        .scroll-to-top {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1001;
          background: rgba(0, 0, 0, 0.6);
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 50%;
          font-size: 18px;
          cursor: pointer;
          transition: opacity 0.3s ease-in-out;
        }
        .scroll-to-top:hover {
          background: rgba(0, 0, 0, 0.8);
        }
      `}</style>
      <MobileMenu />
    </div>
  );
};

export default Index;
