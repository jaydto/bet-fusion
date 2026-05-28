import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFromLocalStorage } from "../../utils/local-storage";

const HorizontalGameRow = ({ games = [], size = "md", onCardClick, layout = "row" }) => {
  const rowRef = useRef(null);
  const navigate = useNavigate();
  const isGrid = layout === "grid";
  const [activeId, setActiveId] = useState(null);

  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false });

  const safeGames = useMemo(() => (Array.isArray(games) ? games : []), [games]);

  const onPointerDown = (e) => {
    const el = rowRef.current;
    if (!el) return;
    drag.current = { down: true, moved: false, startX: e.clientX, startLeft: el.scrollLeft };
    try { el.setPointerCapture?.(e.pointerId); } catch (_) {}
  };

  const onPointerMove = (e) => {
    const el = rowRef.current;
    if (!el || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 6) drag.current.moved = true;
    el.scrollLeft = drag.current.startLeft - dx;
  };

  const endDrag = () => {
    drag.current.down = false;
    setTimeout(() => (drag.current.moved = false), 0);
  };

  const handlePlayNow = (e, gameId, gameName) => {
    e.stopPropagation();
    const user = getFromLocalStorage("user");
    if (user) {
      if (onCardClick) {
        onCardClick(gameId, gameName);
      } else {
        navigate(`/casino/game-play?game=${gameId}&status=0&game_name=${encodeURIComponent(gameName)}`);
      }
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <div
      ref={isGrid ? null : rowRef}
      className={isGrid ? "game-grid-layout" : "landing-row"}
      style={isGrid ? {} : { overflowX: "auto", overflowY: "hidden", WebkitOverflowScrolling: "touch", touchAction: "pan-x" }}
      onPointerDown={isGrid ? undefined : onPointerDown}
      onPointerMove={isGrid ? undefined : onPointerMove}
      onPointerUp={isGrid ? undefined : endDrag}
      onPointerCancel={isGrid ? undefined : endDrag}
    >
      {safeGames.map((g, idx) => {
        const key = `${g?.game_id || g?.id || "game"}-${idx}`;
        const gameId = g?.game_id || g?.id;
        const primaryImage = g?.display_image_url || "";
        const secondaryImage = g?.image_url || g?.image || "";
        const image = primaryImage || secondaryImage;
        const name = g?.display_name || g?.game_name || g?.name || "Game";
        const fallback =
          "data:image/svg+xml;utf8," +
          encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="250"><rect width="200" height="250" fill="#171A26"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-family="Arial" font-size="14" font-weight="700">${String(name).replace(/&/g, "&amp;").replace(/</g, "&lt;")}</text></svg>`
          );

        const isActive = activeId === key;

        return (
          <div
            key={key}
            className={`game-card ${size} game-card--hoverable${isActive ? " game-card--active" : ""}`}
            style={{ flex: "0 0 auto", borderRadius: "12px", overflow: "hidden", marginRight: "10px", cursor: "pointer" }}
            onClick={() => {
              if (drag.current.moved) return;
              setActiveId(isActive ? null : key);
            }}
            role="button"
            tabIndex={0}
          >
            <img
              src={image || fallback}
              alt={name}
              draggable={false}
              onError={(e) => {
                const el = e.currentTarget;
                if (secondaryImage && el.src !== secondaryImage && el.src !== fallback) {
                  el.src = secondaryImage;
                } else {
                  el.onerror = null;
                  el.src = fallback;
                }
              }}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div className="game-title-strip">{name}</div>
            <div className="game-card-hover-overlay">
              <button
                className="game-card-play-btn"
                onClick={(e) => handlePlayNow(e, gameId, name)}
              >
                Play Now
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HorizontalGameRow;
