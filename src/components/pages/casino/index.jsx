import { Suspense, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Outlet, useLocation } from "react-router-dom";
import { Grid } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { casinoGames } from "../../../redux/virtualsSlice";
import SearchModal from "../../modals/SearchModal";
import DepositModal from "../../modals/DepositModal";
import MobileMenu from "../../mobile-menu";

import LoadingPage from "./loadingPage";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { useBreakpoint } = Grid;

const CasinoLayout = () => {
  const dispatch = useDispatch();
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const { pathname } = useLocation();

  const [showScrollTop, setShowScrollTop] = useState(false);

  const showDepositModal = useSelector(
    (state) => state.data.show_deposit_modal
  );
  const casinoSearchModal = useSelector(
    (state) => state.virtuals.casino_search_modal
  );
  const casinoGamesData = useSelector(
    (state) => state.virtuals.casino_games_data
  );

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (casinoGamesData.length === 0) {
      dispatch(
        casinoGames({
          endpoint: "/v1/casino-game-listing",
          method: "GET",
        })
      );
    }
  }, [dispatch]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="main-layout"
      style={{
        width: "100%",
        marginTop: 0,
        marginBottom: isMobile ? "3.5rem" : 0,
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
      }}
    >
      {showDepositModal && <DepositModal />}
      {casinoSearchModal && <SearchModal />}

      <div
        style={{ backgroundColor: "var(--bet-fusion-secondary)", width: "100%" }}
      >
        <div className="d-flex justify-content-center">
          <Col
            xs={24}
            sm={24}
            md={23}
            lg={24}
            xl={24}
            style={{ padding: isMobile ? "10px 2px" : "10px", width: "100%" }}
          >
            <Suspense fallback={<LoadingPage />}>
              <Outlet />
            </Suspense>
          </Col>
        </div>
      </div>

      {showScrollTop && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          {/* 🔝 */}
          <FontAwesomeIcon
            icon={faArrowUp}
            style={{ color: "var(--light)", fontSize: "20px" }}
          />
        </button>
      )}

      {<MobileMenu />}

      <style>{`
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
    </div>
  );
};

export default CasinoLayout;
