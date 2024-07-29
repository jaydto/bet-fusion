import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setState as setVirtualGame, casinoList, fetchCasinoGames } from "../../redux/virtualsSlice";
import { RenderCasinoSearch } from './body';
import { getFromLocalStorage } from '../utils/local-storage';
import CasinoLayout from './casinoLayout';

const CasinoOptions = () => {
  const { provider, category } = useParams();
  const dispatch = useDispatch();
  const casino_games = useSelector((state) => state.virtuals.casino_games);
  const casino_search = useSelector((state) => state.virtuals.casino_search);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.user);
  const [user, setUser] = useState(getFromLocalStorage("user"));

  useEffect(() => {
    console.log("provider information", provider, "category information", category);
    if (casino_games.length === 0 && provider.toLowerCase() === 'smartsoft') {
      fetchCasinoGamesFromAPI();
    } else if (provider.toLowerCase() !== 'smartsoft') {
      getGamesByCategory(category, provider);
    } else {
      filterData(category, 'gameCategory');
    }
  }, [provider, category, casino_games]);

  const fetchCasinoGamesFromAPI = async () => {
    let endpoint = "/v2/smartsoft-games";
    let method = "POST";

    const data = {
      endpoint: endpoint,
      method: method,
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

  const filterData = (searchTerm, searchKey = 'gameName') => {
    const filteredData = [];
    console.log("Filtering data with search term:", searchTerm, "and search key:", searchKey);
  
    if (searchTerm?.length >= 1) {
      casino_games.forEach((obj) => {
        Object.entries(obj).forEach(([key, gamesArray]) => {
          const provider = obj.provider;
          if (Array.isArray(gamesArray)) {
            gamesArray.forEach((game) => {
              const gameProperty = game[searchKey] ?? game?.[searchKey.toLowerCase()];
              if (gameProperty?.toLowerCase().includes(searchTerm.toLowerCase())) {
                filteredData.push({ provider: provider, game: game });
              }
            });
          }
        });
      });
    }
  
    console.log("Filtered data:", filteredData);
    dispatch(setVirtualGame("casino_search", filteredData));
  };
  


  const handleButtonClick = (event, game_id, gameCategory) => {
    event.stopPropagation();

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
  };

  console.log("casino search information", casino_search);

  return (
    <CasinoLayout>
      <div>
        <div className="d-flex justify-content-between px-4 section-lobby-header">
          <h2 style={{ textTransform: "capitalize" }}>{provider} - {category}</h2>
        </div>
        <div className="gamesCont grid-layout slots">
          {casino_search?.length > 0 ? (
            <RenderCasinoSearch games={casino_search} section={category} visibleItems={20} handleButtonClick={handleButtonClick} />
          ) : null}
        </div>
      </div>
    </CasinoLayout>
  );
};

export default CasinoOptions;
