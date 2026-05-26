import React, { useMemo, useState } from "react";
import { Grid } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GiAirplane, GiExplodingPlanet, GiPokerHand, GiDiceSixFacesFive, GiGamepad, GiTrophyCup, GiFlame } from "react-icons/gi";
import { MdSportsSoccer, MdLiveTv } from "react-icons/md";
import CasinoCarouselLoader from "./carousel";
import SectionHeader from "./sectionHeader";
import HorizontalGameRow from "./horizontalGameRow";

const { useBreakpoint } = Grid;

const CATEGORY_PILLS = [
  { id: "all",    label: "All" },
  { id: "popular", label: "Popular" },
  { id: "crash",  label: "Crash" },
  { id: "live",   label: "Live Casino" },
  { id: "slots",  label: "Slots" },
];

const GameRowSkeleton = ({ count = 6 }) => (
  <div className="landing-row">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="game-card game-card-skeleton"
        style={{ flex: "0 0 148px", width: "148px", marginRight: "12px" }}
      />
    ))}
  </div>
);

const LandingPage = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("Aviator");

  const casino_games = useSelector((state) => state.virtuals.casino_games_data);
  const loading = useSelector((state) => state.virtuals.loading);

  const safeGames = Array.isArray(casino_games) ? casino_games : [];

  const getGameImage = (g) => g?.display_image_url || g?.image_url || g?.image || "";
  const withImage = (arr) => (Array.isArray(arr) ? arr.filter((g) => !!getGameImage(g)) : []);
  const hasType = (game, type) =>
    !!game?.categories?.some(
      (cat) => String(cat?.game_type_id || "").toLowerCase() === String(type).toLowerCase()
    );

  const popularGames = useMemo(() => withImage(safeGames).slice(0, 12), [safeGames]);

  const crashGames = useMemo(
    () =>
      withImage(
        safeGames.filter(
          (g) =>
            hasType(g, "crash") ||
            String(g?.game_name || "").toLowerCase().includes("avi") ||
            String(g?.game_name || "").toLowerCase().includes("jetx")
        )
      ),
    [safeGames]
  );

  const liveGames = useMemo(
    () =>
      withImage(
        safeGames.filter(
          (g) =>
            g?.categories?.some((c) =>
              String(c?.game_type_id || "").toLowerCase().includes("live")
            ) ||
            String(g?.game_name || "").toLowerCase().includes("live")
        )
      ),
    [safeGames]
  );

  const slotsGames = useMemo(
    () =>
      withImage(
        safeGames.filter(
          (g) =>
            hasType(g, "slots") ||
            hasType(g, "slot") ||
            String(g?.game_name || "").toLowerCase().includes("slot")
        )
      ),
    [safeGames]
  );

  const onCardClick = (gameId, gameName) =>
    navigate(`/casino/game-play?game=${gameId}&status=0&game_name=${encodeURIComponent(gameName)}`);

  const showSection = (id) => activeCategory === "all" || activeCategory === id;

  const NAV_TABS = [
    { label: "Aviator",     icon: <GiAirplane size={14} /> },
    { label: "Crash",       icon: <GiExplodingPlanet size={14} /> },
    { label: "Sports",      icon: <MdSportsSoccer size={14} /> },
    { label: "Casino",      icon: <GiPokerHand size={14} /> },
    { label: "Slots",       icon: <GiDiceSixFacesFive size={14} /> },
    { label: "Virtuals",    icon: <GiGamepad size={14} /> },
    { label: "Live",        icon: <MdLiveTv size={14} /> },
    { label: "Tournaments", icon: <GiTrophyCup size={14} /> },
  ];

  return (
    <div style={{ width: "100%", marginBottom: isMobile ? "6rem" : "2rem" }}>
      {/* Horizontal category tabs — desktop and mobile */}
      <div style={{
        display: "flex",
        gap: "0",
        overflowX: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        fontSize: isMobile ? "12px" : "13px",
        fontWeight: 600,
        padding: isMobile ? "0 8px" : "0 16px",
        borderBottom: "1px solid #1e293b",
        marginBottom: "8px",
        background: "#0f172a",
      }}>
        {NAV_TABS.map(({ label, icon }) => {
          const isActive = activeTab === label;
          return (
            <div
              key={label}
              onClick={() => setActiveTab(label)}
              style={{
                cursor: "pointer",
                padding: isMobile ? "10px 10px" : "12px 14px",
                whiteSpace: "nowrap",
                borderRadius: "0",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                gap: "5px",
                color: isActive ? "#fb8603" : "#94a3b8",
                background: "transparent",
                borderBottom: isActive ? "2px solid #fb8603" : "2px solid transparent",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.color = "#fb8603"; }}}
              onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.color = "#94a3b8"; }}}
            >
              <span style={{ display: "flex", alignItems: "center", lineHeight: 1 }}>{icon}</span>
              {label}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: isMobile ? 2 : 0, padding: isMobile ? "5px 1px" : "12px 12px 0px 12px", overflow: "hidden" }}>
        <CasinoCarouselLoader />
      </div>

      {/* Category filter pills removed to match design */}

      <div className="landing-v2" style={{ padding: isMobile ? "0 8px" : "0 12px" }}>
        {/* Popular Games */}
        {showSection("popular") && (
          <div className="landing-section">
            <SectionHeader
              title="Most played"
              actionLabel="SHOW ALL"
              onAction={() => navigate("/casino")}
            />
            {loading
              ? <GameRowSkeleton count={6} />
              : popularGames.length > 0
                ? <HorizontalGameRow size="md" games={popularGames} onCardClick={onCardClick} />
                : null}
          </div>
        )}

        {/* Crash / Originals */}
        {showSection("crash") && (loading || crashGames.length > 0) && (
          <div className="landing-section">
            <SectionHeader
              title="Crash Games"
              actionLabel="SHOW ALL"
              onAction={() => navigate("/casino?categoryId=crash")}
            />
            {loading
              ? <GameRowSkeleton count={6} />
              : <HorizontalGameRow size="md" games={crashGames.slice(0, 12)} onCardClick={onCardClick} />}
          </div>
        )}

        {/* Live Casino */}
        {showSection("live") && (loading || liveGames.length > 0) && (
          <div className="landing-section">
            <SectionHeader
              title="Live Casino"
              actionLabel="SHOW ALL"
              onAction={() => navigate("/casino?categoryId=live")}
            />
            {loading
              ? <GameRowSkeleton count={6} />
              : <HorizontalGameRow size="lg" games={liveGames.slice(0, 12)} onCardClick={onCardClick} />}
          </div>
        )}

        {/* Slots */}
        {showSection("slots") && (loading || slotsGames.length > 0) && (
          <div className="landing-section">
            <SectionHeader
              title="Slots"
              actionLabel="SHOW ALL"
              onAction={() => navigate("/casino?categoryId=slots")}
            />
            {loading
              ? <GameRowSkeleton count={6} />
              : <HorizontalGameRow size="md" games={slotsGames.slice(0, 12)} onCardClick={onCardClick} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
