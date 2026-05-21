import React, { useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";

const HorizontalGameRow = ({ games = [], size = "md", onCardClick }) => {
  const rowRef = useRef(null);
  const navigate = useNavigate();

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

  return (
    <div
      ref={rowRef}
      className="landing-row"
      style={{ overflowX: "auto", overflowY: "hidden", WebkitOverflowScrolling: "touch", touchAction: "pan-x" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      {safeGames.map((g, idx) => {
        const key = `${g?.game_id || g?.id || "game"}-${idx}`;
        const image = g?.display_image_url || g?.image_url || g?.image || "";
        const name = g?.display_name || g?.game_name || g?.name || "Game";
        const fallback =
          "data:image/svg+xml;utf8," +
          encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="250"><rect width="200" height="250" fill="#1e293b"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-family="Arial" font-size="14" font-weight="700">${String(name).replace(/&/g, "&amp;").replace(/</g, "&lt;")}</text></svg>`
          );

        return (
          <div
            key={key}
            className={`game-card ${size} game-card--hoverable`}
            style={{ flex: "0 0 auto", width: size === "lg" ? "180px" : "148px", marginRight: "12px", cursor: "pointer" }}
            onClick={() => {
              if (drag.current.moved) return;
              if (onCardClick) {
                onCardClick(g?.game_id || g?.id, name);
              } else {
                navigate(`/casino/game-play?game=${g?.game_id || g?.id}&status=0&game_name=${encodeURIComponent(name)}`);
              }
            }}
            role="button"
            tabIndex={0}
          >
            <img
              src={image || fallback}
              alt={name}
              draggable={false}
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallback; }}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div className="game-title-strip">{name}</div>
            <div className="game-card-hover-overlay">
              <span className="game-card-play-btn">Play Now</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HorizontalGameRow;
