import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./promo.css";
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";
import { getFromLocalStorage } from "../../utils/local-storage";
import { setState } from "../../../redux/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { virtualGameChoiceOptions } from "../../matches";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import {
  checkIfUser,
  setUtmSouceCampaignOnPromotions,
} from "../../utils/utils";

const PromoCards = () => {
  const gaEventTracker = useAnalyticsEventTracker("Promotions");
  const user = getFromLocalStorage("user");
  const dispatchRedux = useDispatch();
  const bottomSheetRef = useRef();
  const bottom_sheet = useSelector((state) => state.data.promo_bottom_sheet);
  // const games = virtualGameChoiceOptions('morning_glory');
  const [games, setGames] = useState([]);
  const [promotions, setPromotions] = useState([]);

  const navigate = useNavigate();

  const showBottomSheet = (data) => {
    const options = virtualGameChoiceOptions(data);
    setGames(options);
    dispatchRedux(setState("promo_bottom_sheet", true));
  };
  const collapseBottomSheet = () => {
    dispatchRedux(setState("promo_bottom_sheet", false));
  };

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (
        bottomSheetRef.current &&
        !bottomSheetRef.current.contains(event.target)
      ) {
        dispatchRedux(setState("promo_bottom_sheet", false));
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    // document.addEventListener("click", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [bottomSheetRef, bottom_sheet]);

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      try {
        const response = require("./promo.json");

        const isExpired = (expiryDate) => {
          if (expiryDate === "null" || expiryDate === null) return false;
          return new Date(expiryDate) < new Date();
        };
        const filteredData = response.filter(promo => promo.show);  //Remove promos where show = false

        const unExpiredPromos = filteredData.filter(promo => !isExpired(promo.expiryDate));
        const expiredPromos = filteredData.filter(promo => isExpired(promo.expiryDate));

        // Sort newest first
        unExpiredPromos.sort((a, b) => b.id - a.id);
        expiredPromos.sort((a, b) => b.id - a.id);

        const sortedData = [...unExpiredPromos, ...expiredPromos];

          // console.log(sortedData);
        setPromotions(sortedData);
      } catch (error) {
        // setError(error);
      }
      // setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="col px-4 d-flex align-items-start align-self-start justify-content-start">
      <div
        className={`row text-white pt-2 border-0 d-flex promo-container-profile d-flex align-self-start align-items-start"`}
      >
        {promotions.map((promotion, index) => {
          return (
            <div
            className={`col-md-2 promo-styling shadow-lg promotion ${
              new Date(promotion.expiryDate) < new Date() ? "promo-inactive" : ""
            }`}
              key={index}
            >
              <div className="d-flex flex-column promo-inner">
                <img
                  src={promotion.src}
                  className={"rounded promo-image "}
                  alt={index}
                />
                <h5
                  className="bold d-flex justify-content-center h4 pt-2"
                  style={{ color: "#ea5d0b" }}
                >
                  {promotion.name}
                </h5>
                <p className="container-profile mx-1 px-2 text-data-promotions">
                  {promotion.summary}
                </p>
                <hr />
                <div className="d-flex justify-content-between my-2 mx-2">
                  <button
                    className={
                      "profile-button border-0 h-25 rounded promo-button"
                    }
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
                  </button>
                  <div
                    className={
                      "d-flex  align-self-center   h-25 border-0 bg-transparent cursor-pointer"
                    }
                    style={{ color: "#ea5d0b" }}
                    onClick={() => {
                      navigate(`${promotion.actions[1].url}`);
                      window.scrollTo(0, 0); // Scroll to the top of the page
                    }}
                  >
                    {promotion.actions[1].name}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={`${bottom_sheet ? "bottom-sheet show " : "d-none"}`}>
        <div className="sheet-overlay"></div>
        <div ref={bottomSheetRef} className="content">
          <div className="header d-flex justify-content-between">
            <div className="drag-icon">
              <span></span>
            </div>
            <FontAwesomeIcon
              icon={faXmark}
              onClick={() => {
                collapseBottomSheet();
              }}
              className={"filter-close-icon"}
            />
          </div>
          <h2 className="text-warning"> Participating Games</h2>
          <div className="body d-flex flex-column gap-4">
            {games.map((game_options, index) => (
              <Link
                key={index}
                to={game_options.url} // Assuming the URL is correctly set for each game option
                className="w-100 markets-default bottom-align "
                onClick={() => {
                  // Add any onClick logic here
                }}
              >
                {game_options.name}
              </Link>
            ))}
          </div>
          <div style={{ position: "relative" }}>
            <Button
              onClick={() => {
                collapseBottomSheet();
              }}
              className={
                "text-light bold color-inherit btn border-0 cancel-filter-markets"
              }
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
