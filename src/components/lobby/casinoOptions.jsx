import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setState as setVirtualGame,
  casinoList,
} from "../../redux/virtualsSlice";
import { categoryEndpoints, RenderCasinoSearch } from "./body";
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

  const getFilteredGames = (casino_games, section) => {
    const filteredGames = casino_games
      .filter((gameSection) => gameSection[section]) // Filter games that match the section
      .map((gameSection) => ({
        [section]: gameSection[section], // No slicing, return the entire array
      }));

    console.log("filteredGames", filteredGames); // Debugging filtered output

    const displayedGames = filteredGames?.flatMap((providerGames) =>
      providerGames[section]?.map((game) => ({
        provider: providerGames.provider,
        game,
      }))
    );

    dispatch(setVirtualGame("casino_search", displayedGames));
  };

  // const fetchCategoryGames = (category) => {
  //   const payload = categoryEndpoints[category];
  //   const provider = category === "Slots" ? "smart-soft" : "";
  
  //   console.log("endpoint received", payload.endpoint); // Debug log
  
  //   if (!payload.endpoint) {
  //     console.log(`No endpoint for category: ${category}`); // Error handling log
  //     return;
  //   }
  
  //   const data = {
  //     endpoint:payload.endpoint,
  //     method: "POST",
  //     category,
  //     provider,
  //   };
  
  //   console.log("Data to dispatch:", data); // Log the data being dispatched
  //   dispatch(casinoList(data));
  // };

  const fetchAllCategoriesData = async (category_option) => {
    // Fetch the specified category first
    if (categoryEndpoints[category_option]) {
      const { endpoint, provider } = categoryEndpoints[category_option];
  
      if (endpoint) {
        const method = "POST";
        const data = {
          endpoint: endpoint,
          method: method,
          category: category_option,
          provider: provider,
        };
  
        // Dispatch the action to fetch data for the selected category option first
        await dispatch(casinoList(data));
      }
    }
  
    // Now fetch the rest of the categories (excluding the already fetched category_option)
    for (const [category, { endpoint, provider }] of Object.entries(categoryEndpoints)) {
      if (category !== category_option && endpoint) {
        const method = "POST";
        const data = {
          endpoint: endpoint,
          method: method,
          category: category,
          provider: provider,
        };
  
        // Dispatch the action to fetch data for the remaining categories
        await dispatch(casinoList(data));
      }
    }
  };
  
  

  const fetchData = useCallback(async () => {
    try {
      if (casino_games.length === 0) {
        // fetchCategoryGames(category);
        fetchAllCategoriesData(category);
      } else if (provider !== "smartSoft") {
        getFilteredGames(casino_games, category);
      } else {
        filterData(category, "gameCategory");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  }, [casino_games, category,provider]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
  };

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
            // special={provider==="smartSoft"?true:false}
            special={false}

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
