import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setState as setVirtualGame,
  casinoList,
} from "../../redux/virtualsSlice";
import { RenderCasinoSearch } from "./body";
import Loader from "./casinoLoader";
import useWindowDimensions from "../header/Dimensions";

const CasinoOptions = ({ provider, category }) => {
  const dispatch = useDispatch();
  const casino_games = useSelector((state) => state.virtuals.casino_games);
  const casino_search = useSelector((state) => state.virtuals.casino_search);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const { width } = useWindowDimensions();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (
          casino_games.length === 0 &&
          provider.toLowerCase() === "smartsoft"
        ) {
          await fetchCasinoGamesFromAPI();
        } else if (provider.toLowerCase() !== "smartsoft") {
          await getGamesByCategory(category, provider);
        } else {
          filterData(category, "gameCategory");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchData();
  }, [provider, category, casino_games]);

  const fetchCasinoGamesFromAPI = async () => {
    const data = {
      endpoint: "/v2/smartsoft-games",
      method: "POST",
      category: "Slots",
      provider: "smart-soft",
    };

    dispatch(casinoList(data));
  };

  const getGamesByCategory = async (category, provider) => {
    const data = {
      endpoint: "/v2/games",
      method: "POST",
      category: category,
      provider: provider,
    };

    dispatch(casinoList(data));
  };

  const filterData = (searchTerm, searchKey = "gameName") => {
    const filteredData = [];

    if (searchTerm?.length >= 1) {
      casino_games.forEach((obj) => {
        Object.entries(obj).forEach(([key, gamesArray]) => {
          const provider = obj.provider;
          if (Array.isArray(gamesArray)) {
            gamesArray.forEach((game) => {
              const gameProperty =
                game[searchKey] ?? game?.[searchKey.toLowerCase()];
              if (
                gameProperty?.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                filteredData.push({ provider: provider, game: game });
              }
            });
          }
        });
      });
    }

    dispatch(setVirtualGame("casino_search", filteredData));
  };

  const handleButtonClick = (event, game_id, gameCategory) => {
    console.log("game_id", game_id, "hovered id", hoveredGameId);
    if (hoveredGameId === game_id || width > 991) {
      const redirectToSmartPlay = () => {
        navigate(
          `/smart-play?game=${game_id}&category=${gameCategory}&status=live`
        );
      };

      if (user) {
        redirectToSmartPlay();
      } else {
        navigate("/login");
      }
    } else {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const [hoveredGameId, setHoveredGameId] = useState(null);

  const handleHoverStart = (gameId) => {
   
    setHoveredGameId(gameId);
  
};

const handleHoverEnd = () => {
    setHoveredGameId(null);
}



  const handleLinkClick = (event, gameId) => {
    if (hoveredGameId !== gameId && width < 991) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between px-4 section-lobby-header">
        <h2 style={{ textTransform: "capitalize" }}>
          {provider} - {category}
        </h2>
      </div>
      <div className="gamesCont grid-layout slots">
        {loading ? (
          <Loader /> // Show loader while data is being fetched
        ) : casino_search?.length > 0 ? (
          <RenderCasinoSearch
            games={casino_search}
            section={category}
            visibleItems={{}}
            handleButtonClick={handleButtonClick}
            handleHoverEnd={handleHoverEnd}
            handleHoverStart={handleHoverStart}
            handleLinkClick={handleLinkClick}
          />
        ) : (
          <div className="no-data-message">
            <p>No games available for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CasinoOptions;
