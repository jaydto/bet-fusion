import React, { useMemo } from "react";
import { Grid } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { GiLever, GiTrophyCup } from "react-icons/gi";
import { MdLiveTv } from "react-icons/md";
import { ReactComponent as AviatorIcon } from "../../../assets/icons/aviator.svg";
import { ReactComponent as CrashIcon } from "../../../assets/icons/crash.svg";
import { ReactComponent as CasinoIcon } from "../../../assets/icons/casiono.svg";
import { ReactComponent as VirtualsIcon } from "../../../assets/icons/virtuals.svg";
import { ReactComponent as SportsIcon } from "../../../assets/icons/sports.svg";
import CasinoCarouselLoader from "./carousel";
import SectionHeader from "./sectionHeader";
import HorizontalGameRow from "./horizontalGameRow";

const { useBreakpoint } = Grid;

const GameRowSkeleton = ({ count = 6 }) => (
  <div className="landing-row">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="game-card game-card-skeleton" style={{ flex: "0 0 auto", marginRight: "10px" }} />
    ))}
  </div>
);

// Tab → route/section mapping
const TAB_MAP = {
  "Sports":      { route: "/sports" },
  "Aviator":     { route: "/casino/game-play?game=58630&status=0&game_name=AVIATOR" },
  "Crash":       { section: "crash" },
  "Casino":      { section: "" },
  "Slots":       { section: "slots" },
  "Virtuals":    { route: "/casino?categoryId=virtuals" },
  "Live":        { section: "live" },
  "Tournaments": { route: "/casino?categoryId=tournaments" },
};

const SECTION_TO_TAB = { crash: "Crash", slots: "Slots", live: "Live" };

const LandingPage = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const activeSection = searchParams.get("section") || "";
  const activeTab = SECTION_TO_TAB[activeSection] || null;

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

  // Only show a section when its id matches the URL param (or no filter is active)
  const showSection = (id) => !activeSection || activeSection === id;

  const handleTabClick = (label) => {
    const tab = TAB_MAP[label];
    if (tab.route) {
      navigate(tab.route);
    } else {
      navigate(tab.section ? `/?section=${tab.section}` : "/");
    }
  };

  const iconSize = isMobile ? 20 : 14;
  const activeFilter =
    "brightness(0) saturate(100%) invert(56%) sepia(88%) saturate(2000%) hue-rotate(5deg) brightness(102%)";
  // Aviator's art is red; when inactive, tint it to ~#8e8d94 to match the
  // other inactive tab icons. When active it goes orange like the rest.
  const aviatorInactiveFilter = "brightness(0) saturate(100%) invert(57%)";

  const NAV_TABS = [
    { label: "Aviator",     icon: <AviatorIcon  width={iconSize} height={iconSize} style={{ filter: activeTab === "Aviator" ? activeFilter : aviatorInactiveFilter }} /> },
    { label: "Sports",      icon: <SportsIcon   width={iconSize} height={iconSize} style={{ filter: activeTab === "Sports"   ? activeFilter : "none" }} /> },
    { label: "Crash",       icon: <CrashIcon    width={iconSize} height={iconSize} style={{ filter: activeTab === "Crash"    ? activeFilter : "none" }} /> },
    { label: "Casino",      icon: <CasinoIcon   width={iconSize} height={iconSize} style={{ filter: !activeTab             ? activeFilter : "none" }} /> },
    { label: "Slots",       icon: <GiLever      size={iconSize} /> },
    { label: "Virtuals",    icon: <VirtualsIcon width={iconSize} height={iconSize} style={{ filter: activeTab === "Virtuals" ? activeFilter : "none" }} /> },
    { label: "Live",        icon: <MdLiveTv     size={iconSize} /> },
    { label: "Tournaments", icon: <GiTrophyCup  size={iconSize} /> },
  ];

  return (
    <div style={{ width: "100%", marginBottom: isMobile ? "5rem" : "2rem" }}>
      {/* Category navigation tabs */}
      <div
        className="category-nav-tabs"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: isMobile ? "0" : "0 8px",
          height: "auto",
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          fontSize: "16px",
          fontWeight: 600,
          borderBottom: "1px solid #1e2235",
          background: "#0F111A",
          gap: isMobile ? "0" : "2px",
        }}
      >
        {NAV_TABS.map(({ label, icon }) => {
          const isActive = activeTab === label || (label === "Casino" && !activeTab);
          return (
            <div
              key={label}
              onClick={() => handleTabClick(label)}
              className={`category-tab-item${isActive ? " active" : ""}`}
              style={{
                cursor: "pointer",
                padding: isMobile ? "6px 4px 8px" : "8px 12px",
                whiteSpace: "nowrap",
                borderRadius: "0",
                flexShrink: 0,
                flexGrow: 0,
                minWidth: isMobile ? "calc(100% / 6)" : "unset",
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: "center",
                justifyContent: "center",
                gap: isMobile ? "2px" : "5px",
                height: "auto",
                background: "transparent",
              }}
            >
              <span
                className="tab-icon"
                style={{ display: "flex", alignItems: "center", lineHeight: 1, color: isActive ? "#fb8603" : "#64748b", transition: "color 0.2s" }}
              >{icon}</span>
              <span className="tab-label">{label}</span>
            </div>
          );
        })}
      </div>

      {/* Carousel */}
      <div style={{ marginTop: 0, padding: isMobile ? "0 10px 6px" : "0 12px 12px", overflow: "hidden" }}>
        <CasinoCarouselLoader />
      </div>

      {/* Game sections — filtered by activeSection */}
      <div className="landing-v2" style={{ padding: isMobile ? "4px 10px 0" : "0 12px" }}>
        {showSection("popular") && (
          <div className="landing-section">
            <SectionHeader title="Most played" actionLabel="SHOW ALL" onAction={() => navigate("/casino")} />
            {loading
              ? <GameRowSkeleton count={6} />
              : popularGames.length > 0
                ? <HorizontalGameRow size="md" games={popularGames} onCardClick={onCardClick} />
                : null}
          </div>
        )}

        {showSection("crash") && (loading || crashGames.length > 0) && (
          <div className="landing-section">
            <SectionHeader title="Crash Games" actionLabel="SHOW ALL" onAction={() => navigate("/casino?categoryId=crash")} />
            {loading
              ? <GameRowSkeleton count={6} />
              : <HorizontalGameRow layout={isMobile ? "grid" : "row"} size="md" games={crashGames.slice(0, 12)} onCardClick={onCardClick} />}
          </div>
        )}

        {showSection("live") && (loading || liveGames.length > 0) && (
          <div className="landing-section">
            <SectionHeader title="Live Casino" actionLabel="SHOW ALL" onAction={() => navigate("/casino?categoryId=live")} />
            {loading
              ? <GameRowSkeleton count={6} />
              : <HorizontalGameRow size="lg" games={liveGames.slice(0, 12)} onCardClick={onCardClick} />}
          </div>
        )}

        {showSection("slots") && (loading || slotsGames.length > 0) && (
          <div className="landing-section">
            <SectionHeader title="Slots" actionLabel="SHOW ALL" onAction={() => navigate("/casino?categoryId=slots")} />
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
