import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Row, Col, Card, Button, Divider } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  checkIfUser,
  setUtmSouceCampaignOnPromotions,
} from "../../utils/utils";
import { getFromLocalStorage } from "../../utils/local-storage";
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";
import { setState } from "../../../redux/dataSlice";

const { Title, Paragraph } = Typography;

const PromoCards = () => {
  const gaEventTracker = useAnalyticsEventTracker("Promotions");
  const user = getFromLocalStorage("user");
  const dispatch = useDispatch();
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
    <div className="px-sm-2 px-md-4 px-lg-4">
      <Row gutter={[16, 16]}>
        {promotions.map((promotion, index) => {
          const isExpired = new Date(promotion.expiryDate) < new Date();
          return (
            <Col key={index} xs={24} sm={12} md={8}>
              <Card
                hoverable
                className={`promo-styling shadow-lg promotion ${
                  isExpired ? "promo-inactive" : ""
                }`}
                cover={<img alt={promotion.name} src={promotion.src} />}
                style={{
                  border: "none",
                  borderRadius: 8,
                  background: "var(--bet-fusion-promo-card)",
                  color: "#fff",
                }}
              >
                <Title
                  level={5}
                  style={{
                    color: "var(--light)",
                    fontSize: 14,
                    textAlign: "center",
                    marginBottom: 8,
                  }}
                >
                  {promotion.name}
                </Title>
                <Paragraph
                  style={{
                    color: "#ccc",
                    fontSize: 12,
                    minHeight: 50,
                  }}
                >
                  {promotion.summary}
                </Paragraph>
                <Divider style={{ borderColor: "#444" }} />
                <div className="d-flex justify-content-between">
                  <Button
                    type="primary"
                    size="small"
                    style={{
                      backgroundColor: "var(--bet-fusion-button-login)",
                      border: "none",
                      color:"var(--black)",
                      fontSize: 12,
                    }}
                    onClick={() => {
                      if (promotion.actions[0].name === "Sign Up") {
                        checkIfUser(user, navigate);
                      } else {
                        navigate(promotion.actions[0].url);
                      }
                      gaEventTracker(`${promotion.eventTracking}`);
                      setUtmSouceCampaignOnPromotions(
                        `${promotion.eventTracking}`
                      );
                    }}
                  >
                    {promotion.actions[0].name}
                  </Button>
                  <Button
                    type="link"
                    size="small"
                    style={{
                      color: "var(--bet-fusion-button-login)",
                      fontSize: 12,
                      padding: 0,
                    }}
                    onClick={() => {
                      navigate(`${promotion.actions[1].url}`);
                      window.scrollTo(0, 0);
                    }}
                  >
                    {promotion.actions[1].name}
                  </Button>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>

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
          <Title level={5} style={{ color: "#ffc107" }}>
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
