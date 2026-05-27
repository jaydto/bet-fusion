import React, { useMemo, useState } from "react";
import { Grid } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GiRocketFlight, GiLever, GiHorseHead, GiTrophyCup } from "react-icons/gi";
import { MdSportsSoccer, MdLiveTv } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import CasinoCarouselLoader from "./carousel";
import SectionHeader from "./sectionHeader";
import HorizontalGameRow from "./horizontalGameRow";

const { useBreakpoint } = Grid;

const AviatorIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="aviGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#cc3366" />
        <stop offset="100%" stopColor="#fb8603" />
      </linearGradient>
    </defs>
    <path fill="url(#aviGrad)" d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" />
  </svg>
);

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
        style={{ flex: "0 0 auto", marginRight: "10px" }}
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

  const iconSize = isMobile ? 20 : 14;
  const NAV_TABS = [
    { label: "Aviator",     icon: <AviatorIcon size={iconSize} /> },
    { label: "Crash",       icon: <GiRocketFlight size={iconSize} /> },
    { label: "Sports",      icon: <MdSportsSoccer size={iconSize} /> },
    { label: "Casino",      icon: <IoSettingsSharp size={iconSize} /> },
    { label: "Slots",       icon: <GiLever size={iconSize} /> },
    { label: "Virtuals",    icon: <GiHorseHead size={iconSize} /> },
    { label: "Live",        icon: <MdLiveTv size={iconSize} /> },
    { label: "Tournaments", icon: <GiTrophyCup size={iconSize} /> },
  ];

  return (
    <div style={{ width: "100%", marginBottom: isMobile ? "5rem" : "2rem" }}>
      {/* Horizontal category tabs — desktop and mobile */}
      <div style={{
        display: "flex",
        gap: "0",
        overflowX: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        fontSize: isMobile ? "10px" : "13px",
        fontWeight: 600,
        padding: "0",
        borderBottom: "1px solid #1e2235",
        marginBottom: "0",
        background: "#0F111A",
      }}>
        {NAV_TABS.map(({ label, icon }) => {
          const isActive = activeTab === label;
          return (
            <div
              key={label}
              onClick={() => setActiveTab(label)}
              style={{
                cursor: "pointer",
                padding: isMobile ? "6px 10px" : "12px 14px",
                whiteSpace: "nowrap",
                borderRadius: "0",
                flexShrink: 0,
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: "center",
                gap: isMobile ? "2px" : "4px",
                color: isActive ? "#fb8603" : "#64748b",
                background: isActive ? "#261517" : "transparent",
                borderBottom: isActive ? "2px solid #fb8603" : "2px solid transparent",
                transition: "color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.color = "#fb8603"; e.currentTarget.style.background = "rgba(38,21,23,0.5)"; }}}
              onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.color = "#64748b"; e.currentTarget.style.background = "transparent"; }}}
            >
              <span style={{ display: "flex", alignItems: "center", lineHeight: 1 }}>{icon}</span>
              {label}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 0, padding: isMobile ? "6px 4px" : "12px 12px 0px 12px", overflow: "hidden" }}>
        <CasinoCarouselLoader />
      </div>

      {/* Category filter pills removed to match design */}

      <div className="landing-v2" style={{ padding: isMobile ? "4px 6px 0" : "0 12px" }}>
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
              : <HorizontalGameRow layout={isMobile ? "grid" : "row"} size="md" games={crashGames.slice(0, 12)} onCardClick={onCardClick} />}
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
