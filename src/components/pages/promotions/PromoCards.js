import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Row, Col, Card, Button, Divider, Grid } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  checkIfUser,
  setUtmSouceCampaignOnPromotions,
} from "../../utils/utils";
import { getFromLocalStorage } from "../../utils/local-storage";
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";
import { setState } from "../../../redux/dataSlice";

const { useBreakpoint } = Grid;
const { Title, Paragraph } = Typography;

const PromoCards = () => {
  const gaEventTracker = useAnalyticsEventTracker("Promotions");
  const user = getFromLocalStorage("user");
  const dispatch = useDispatch();
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const bottomSheetRef = useRef();
  const bottom_sheet = useSelector((state) => state.data.promo_bottom_sheet);

  const [games, setGames] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const navigate = useNavigate();

  const collapseBottomSheet = () => {
    dispatch(setState("promo_bottom_sheet", false));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        bottomSheetRef.current &&
        !bottomSheetRef.current.contains(event.target)
      ) {
        collapseBottomSheet();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [bottomSheetRef]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = require("./promo.json");
        const isExpired = (expiryDate) => {
          if (!expiryDate || expiryDate === "null") return false;
          return new Date(expiryDate) < new Date();
        };
        const filtered = response.filter((p) => p.show);
        const unexpired = filtered.filter((p) => !isExpired(p.expiryDate));
        const expired = filtered.filter((p) => isExpired(p.expiryDate));
        unexpired.sort((a, b) => b.id - a.id);
        expired.sort((a, b) => b.id - a.id);
        setPromotions([...unexpired, ...expired]);
      } catch {}
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: isMobile ? "12px 12px 80px" : "12px 16px 40px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {promotions.map((promotion, index) => {
          const isExpired = promotion.expiryDate && promotion.expiryDate !== "null"
            ? new Date(promotion.expiryDate) < new Date()
            : false;

          return (
            <div
              key={index}
              style={{
                borderRadius: 12,
                overflow: "hidden",
                position: "relative",
                opacity: isExpired ? 0.65 : 1,
                boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                cursor: isExpired ? "default" : "pointer",
              }}
              onClick={() => {
                if (!isExpired && promotion.actions?.[1]?.url) {
                  navigate(promotion.actions[1].url);
                  window.scrollTo(0, 0);
                  gaEventTracker(`${promotion.eventTracking}`);
                  setUtmSouceCampaignOnPromotions(`${promotion.eventTracking}`);
                }
              }}
            >
              {/* Banner image */}
              {promotion.src && (
                <img
                  src={promotion.src}
                  alt={promotion.name}
                  style={{
                    width: "100%",
                    display: "block",
                    borderRadius: 12,
                    minHeight: isMobile ? 140 : 180,
                    objectFit: "cover",
                  }}
                />
              )}

              {/* Gradient overlay for text readability */}
              <div style={{
                position: "absolute",
                inset: 0,
                borderRadius: 12,
                background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.05) 100%)",
              }} />

              {/* Text + button overlay */}
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "12px 14px 14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: 10,
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  {isExpired && (
                    <span style={{
                      fontSize: 10, fontWeight: 700, color: "#fca5a5",
                      background: "rgba(239,68,68,0.2)", borderRadius: 4,
                      padding: "2px 6px", marginBottom: 4, display: "inline-block",
                    }}>EXPIRED</span>
                  )}
                  <div style={{
                    color: "#fff",
                    fontSize: isMobile ? 14 : 16,
                    fontWeight: 700,
                    lineHeight: 1.3,
                    marginBottom: 2,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}>
                    {promotion.name}
                  </div>
                  <div style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: 11,
                    lineHeight: 1.4,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}>
                    {promotion.summary}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isExpired) {
                      if (promotion.actions?.[0]?.name === "Sign Up") {
                        checkIfUser(user, navigate);
                      } else if (promotion.actions?.[0]?.url) {
                        navigate(promotion.actions[0].url);
                      }
                      gaEventTracker(`${promotion.eventTracking}`);
                      setUtmSouceCampaignOnPromotions(`${promotion.eventTracking}`);
                    }
                  }}
                  disabled={isExpired}
                  style={{
                    flexShrink: 0,
                    background: isExpired ? "#475569" : "#e5373a",
                    border: "none",
                    borderRadius: 8,
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 12,
                    padding: "8px 16px",
                    cursor: isExpired ? "not-allowed" : "pointer",
                    fontFamily: "'Outfit', sans-serif",
                    whiteSpace: "nowrap",
                  }}
                >
                  {promotion.actions?.[0]?.name || "Learn More"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom sheet */}
      <div className={`${bottom_sheet ? "bottom-sheet show" : "d-none"}`}>
        <div className="sheet-overlay"></div>
        <div ref={bottomSheetRef} className="content">
          <div className="header d-flex justify-content-between">
            <div className="drag-icon">
              <span></span>
            </div>
            <FontAwesomeIcon
              icon={faXmark}
              onClick={collapseBottomSheet}
              className="filter-close-icon"
            />
          </div>
          <Title level={5} style={{ color: "var(--bet-fusion-pink)" }}>
            Participating Games
          </Title>
          <div className="body d-flex flex-column gap-2">
            {games.map((game, index) => (
              <Link
                key={index}
                to={game.url}
                className="markets-default bottom-align"
              >
                {game.name}
              </Link>
            ))}
          </div>
          <div style={{ position: "relative" }}>
            <Button
              onClick={collapseBottomSheet}
              style={{
                color: "white",
                background: "transparent",
                border: "none",
                fontWeight: 600,
              }}
              block
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoCards;
