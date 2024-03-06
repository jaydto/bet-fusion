import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./casino.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Button, ButtonGroup } from "react-bootstrap";
import CasinoCarouselLoader from "./CasinoCarouseld";
import {
  faAngleLeft,
  faCableCar,
  faCampground,
  faFire,
  faRecordVinyl,
  faSearch,
  faSmile,
  faSquareCaretLeft,
  faSquareCaretRight,
  faStar,
  faWarning,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { getFromLocalStorage } from "../../utils/local-storage";
import {
  casinoList,
  favoriteCasinoApi,
  favoriteCasinoData,
  setState as setVirtualGame,
} from "../../../redux/virtualsSlice";
import { StoreContext } from "../../../context/store";
import { Link, useNavigate } from "react-router-dom";
import { faAffiliatetheme } from "@fortawesome/free-brands-svg-icons";

const NewCasino = () => {
  const dispatchRedux = useDispatch();
  const userData = useSelector((state) => state.auth.user);

  const [user, setUser] = useState(getFromLocalStorage("user"));

  // const [categories, setCategories] = useState([]);
  const { dispatch } = useContext(StoreContext);

  const [games, setGames] = useState([]);
  const [showFilters, setShowFilters] = useState(true);
  // const storedCategories = getFromLocalStorage("casino_categories");

  // const casino_categories = useSelector(
  //   (state) => state.virtuals.casino_categories
  // );
  const casino_games = useSelector((state) => state.virtuals.casino_games);
  const casino_search = useSelector((state) => state.virtuals.casino_search);
  const smartsoft_categories = useSelector(
    (state) => state.virtuals.smartsoft_categories
  );

  // Tracking for casino_game_type
  let game_type = new URL(window.location).searchParams.get("game_type");

  // log to see if i can get data param

  useEffect(() => {
    if (userData) {
      setUser(userData || getFromLocalStorage("user"));
    }
  }, [userData]);

  const [activeCategory, setActiveCategory] = useState(); // Set the default active category

  const handleSearchClick = () => {
    setShowFilters(false);
  };

  const handleBackClick = () => {
    setShowFilters(true);
  };

  const categories_info = [
    "popular",
    "crash",
    "drops-n-wins",
    "vs",
    "cs",
    "lg",
  ];
  // Define a mapping object for category display names
  const categoryDisplayNames = {
    popular: "Popular",
    "drops-n-wins": "Jackpot Casino",
    vs: "Video Slots",
    cs: "Classic Slots",
    lg: "Live Games",
    crash: "Crash Games",
  };
  const categoryGameTypes = {
    popular: "popular",
    popular_pragmatic: "popular",
    "Jackpot Casino": "drops-n-wins",
    jackpot: "drops-n-wins",
    drops_and_wins: "drops-n-wins",
    "Video Slots": "vs",
    virtuals: "rgs-vsb",
    live_casino: "lg",
    roulette: "rl",
    blackjack: "bj",
    card_play: "sc",
    video_poker: "vp",
    slots: "cs",
    livecasino: "lg",
    "crash-games": "crash",
    pragmatic: "popular",
    "smart-soft": "smart-soft",
    "smart_soft": "smart-soft",
    spribe: "spribe",
    hot: "hot",
    favorites: "favorites",
  };

  const fetchGames = async (category) => {
    let endpoint;
    if (category) endpoint = "/v1/casino-games?game-type-id=" + category;
    else endpoint = "/v1/casino-games";
    let method = "GET";
    const data = {
      endpoint: endpoint,
      method: method,
      category: category,
      provider: "pragmatic",
    };
    dispatchRedux(casinoList(data));
  };
  const getCrashGames = async (category) => {
    let endpoint = "/v1/crash-games";

    let method = "POST";
    const data = {
      endpoint: endpoint,
      method: method,
      category: category,
      provider: "crash-games",
    };
    dispatchRedux(casinoList(data));
  };
  const getHotGames = async (category) => {
    let endpoint = "/v1/fetch-casino-hot";

    let method = "POST";

    const data = {
      endpoint: endpoint,
      method: method,
      category: category,
      provider: "hot",
    };
    dispatchRedux(casinoList(data));
  };
  const getPopularGames = async (category) => {
    let endpoint = "/v1/fetch-casino-popular";

    let method = "POST";

    const data = {
      endpoint: endpoint,
      method: method,
      category: category,
      provider: "popular",
    };
    dispatchRedux(casinoList(data));
  };
  const getFavoriteGames = async (category) => {
    let endpoint = "/v1/fetch-casino-favorite-games";

    let method = "POST";

    const data = {
      endpoint: endpoint,
      method: method,
      category: category,
      provider: "favorites",
    };
    dispatchRedux(casinoList(data));
  };
  const getFastGames = async (category) => {
    let endpoint = "/v2/fast-games";

    let method = "POST";

    const data = {
      endpoint: endpoint,
      method: method,
      category: category,
      provider: "spribe",
    };
    dispatchRedux(casinoList(data));
  };
  const getSmartGames = async (category) => {
    let endpoint = "/v2/smartsoft-games";

    let method = "POST";

    const data = {
      endpoint: endpoint,
      method: method,
      category: category,
      provider: "smart-soft",
    };
    dispatchRedux(casinoList(data));
  };

  // handle game choice for sidebar and other options
  const handleGameChoice = ({ game, provider, gameId }) => {
    // Dispatch action to set the game choice type
    dispatchRedux(setVirtualGame("casino_games", []));

    // Fetch games based on game and provider
    if (provider === "pragmatic") {
      // Fetch all Pragmatic games
      fetchGames(game);
    } else if (provider === "smart-soft") {
      // Fetch Smart Soft games
      getSmartGames(game);
    } else if (provider === "hot") {
      // Fetch Crash games
      getHotGames(game);
    } else if (provider === "popular") {
      // Fetch Crash games
      getPopularGames(game);
    } else if (provider === "favorites") {
      // Fetch Crash games
      getFavoriteGames(game);
    } else if (provider === "crash-games") {
      // Fetch Crash games
      getCrashGames(game);
    } else {
      // Fetch Fast games
      getFastGames(game);
    }
  };

  const getGamesByType = (gameType) => {
    switch (gameType) {
      case "crash":
        getCrashGames(gameType);
        break;
      case "popular":
        getPopularGames(gameType);
        break;
      case "smart-soft":
        getSmartGames(gameType);
        break;
      case "spribe":
        getFastGames(gameType);
        break;
      case "hot":
        getHotGames(gameType);
        break;
      default:
        fetchGames(gameType);
        break;
    }
  };

  useEffect(() => {
    if (game_type && categoryGameTypes.hasOwnProperty(game_type)) {
      const gameType = categoryGameTypes[game_type];
      setActiveCategoryLink(game_type)
      getGamesByType(gameType);
    }else {
      gameDefaults();
    }
    const abortController = new AbortController();

    return () => {
      abortController.abort(); // Abort any pending fetch requests
    };
  }, []);

  useEffect(() => {
    dispatchRedux(favoriteCasinoApi());
  }, [user]);

  const gameDefaults = () => {
    categories_info.forEach((category) => {
      if (category === "crash") {
        // Call getCrashGames for "crash" category
        getCrashGames(category);
      } else {
        // Call fetchGames for other categories
        fetchGames(category);
      }
    });
  };

  // useEffect(() => {
  //   // Navigate to '/casino' when the component mounts
  //   navigate("/casino");
  // }, []); // Empty dependency array to run the effect only once when the component mounts

 
  const casino_categories = useSelector(
    (state) => state.virtuals.casino_categories
  );
  const [activeCategoryLink, setActiveCategoryLink] = useState("HOME");
  const [activeItem, setActiveItem] = useState(null);

  const handleCategoryClick = (title) => {
    setActiveCategoryLink(title); // Set the active category when clicked
    console.log("we called this");
    setActiveItem(null);
  };
  const bottomSheetRef = useRef();

  const bottom_sheet = useSelector((state) => state.virtuals.bottom_sheet);
  const showBottomSheet = () => {
    dispatchRedux(setVirtualGame("bottom_sheet", true));
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
        dispatchRedux(setVirtualGame("bottom_sheet", false));
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
  const collapseBottomSheet = () => {
    dispatchRedux(setVirtualGame("bottom_sheet", false));
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    filterData(searchTerm);
  };

  const filterData = (searchTerm) => {
    const filteredData = [];
    if (searchTerm?.length >= 1) {
      casino_games.forEach((obj) => {
        Object.entries(obj).forEach(([key, gamesArray]) => {
          // Check if gamesArray is an array
          const provider = obj.provider;
          if (Array.isArray(gamesArray)) {
            // Check if any game matches the search term
            gamesArray.forEach((game) => {
              if (
                (game?.gameName ?? game?.game_name)
                  ?.toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ) {
                filteredData.push({ provider: provider, game: game });
              }
            });
          }
        });
      });
    }
    dispatchRedux(setVirtualGame("casino_search", filteredData));

    console.log("available data here filteredData", filteredData);
    // return filteredData
  };

  return (
    <div className="games-page d-flex">
      <div className="left-nav lazyloaded">
        <div
          className="menu-container"
          data-scrollbar="true"
          tabIndex="-1"
          style={{ overflow: "hidden", outline: "none" }}
        >
          <GameFilters
            user={user}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            handleGameChoice={handleGameChoice}
            casino_categories={casino_categories}
            setActiveCategoryLink={setActiveCategoryLink}
          />

          <div
            className="scrollbar-track scrollbar-track-y show"
            style={{ display: "block" }}
          >
            <div
              className="scrollbar-thumb scrollbar-thumb-y"
              style={{
                height: "20px",
                transform: "translate3d(0px, 0px, 0px)",
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="right-body ">
        <div className="casino-data">
          <section className="sections-container mb-3">
            <div className={"casino-banner-image"}>
              <CasinoCarouselLoader />
            </div>
          </section>
          <section className="sections-container">
            {/* ${
                showFilters ? "d-flex" : "d-none"
              }  */}
            <ul
              className={`filters 
              ${showFilters ? "d-flex" : "d-none"} 
              pb-2 pb-xl-0 mr-0 ml-0 mt-3 mb-1 mt-xl-3 mb-xl-1 align-items-center`}
            >
              <li
                className="ml-3"
                id="v-search-mobile"
                onClick={() => {
                  handleCategoryClick("SEARCH");
                }}
              >
                <Link to="#" onClick={handleSearchClick}>
                  <FontAwesomeIcon
                    icon={faSearch}
                    style={{ color: "var(--light" }}
                  />
                  {/* <span className="filters-settings">SEARCH</span> */}
                </Link>
              </li>
              <CasinoCategorySection
                title="HOME"
                gameDefaults={gameDefaults}
                isActive={activeCategoryLink === "HOME"}
                activeCallback={() => handleCategoryClick("HOME")}
              />
              {game_type === "smart_soft" ? (
                <>
                  {smartsoft_categories?.map((value) => {
                    return (
                      <SmartCategorySection
                        title={value.default_description}
                        isActive={
                          activeCategoryLink === value.default_description
                        }
                        activeCallback={() =>
                          handleCategoryClick(value.default_description)
                        }
                        onClick={() => filterData(value.default_description)}
                      />
                    );
                  })}
                </>
              ) : (
                <>
                  <CasinoCategorySection
                    title="SLOTS"
                    isActive={activeCategoryLink === "SLOTS"}
                    activeCallback={() => handleCategoryClick("SLOTS")}
                    onClick={() =>
                      handleGameChoice({
                        game: "cs",
                        provider: "pragmatic",
                        gameId: "Classic Slots",
                      })
                    }
                  />
                  <CasinoCategorySection
                    title="BLACKJACK"
                    isActive={activeCategoryLink === "BLACKJACK"}
                    activeCallback={() => handleCategoryClick("BLACKJACK")}
                    onClick={() =>
                      handleGameChoice({
                        game: "bj",
                        provider: "pragmatic",
                        gameId: "BlackJack",
                      })
                    }
                  />
                  <CasinoCategorySection
                    title="LIVE CASINO"
                    isActive={activeCategoryLink === "LIVE CASINO"}
                    activeCallback={() => handleCategoryClick("LIVE CASINO")}
                    onClick={() =>
                      handleGameChoice({
                        game: "lg",
                        provider: "pragmatic",
                        gameId: "Live Games",
                      })
                    }
                  />
                  <CasinoCategorySection
                    title="VIRTUALS"
                    isActive={activeCategoryLink === "VIRTUALS"}
                    activeCallback={() => handleCategoryClick("VIRTUALS")}
                    onClick={() =>
                      handleGameChoice({
                        game: "rgs-vsb",
                        provider: "pragmatic",
                        gameId: "Virtuals",
                      })
                    }
                  />
                  <CasinoCategorySection
                    title="JACKPOT"
                    isActive={activeCategoryLink === "JACKPOT"}
                    activeCallback={() => handleCategoryClick("JACKPOT")}
                    onClick={() =>
                      handleGameChoice({
                        game: "drops-n-wins",
                        provider: "pragmatic",
                        gameId: "jackpot_casino",
                      })
                    }
                  />
                </>
              )}
            </ul>
            {/* <CategoriesSection showFilters={showFilters} handleSearchClick={handleSearchClick} gameDefaults={gameDefaults} onClick={handleGameChoice} /> */}
          </section>
          <section
            className={`section-container ${
              !showFilters ? "d-flex" : "d-none"
            }`}
            id="v-search"
          >
            <div className="search-wrapper ">
              <div className="search-close" onClick={handleBackClick}>
                {/* <i className="ico ico-chevron-left"></i> BACK{" "} */}
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  style={{ color: "white", fontSize: "20px" }}
                />{" "}
                BACK{" "}
              </div>
              <div className="search-group">
                <div className="search-input-group">
                  <span className="search-addon">
                    <i className="ico ico-search"></i>
                  </span>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="SEARCH..."
                  />
                  <span className="close-addon">
                    <i className="ico ico-close"></i>
                  </span>
                </div>
              </div>

              <div
                className="search-advance d-xl-none"
                onClick={() => showBottomSheet()}
              >
                <i className="ico ico-search"></i> ADVANCED SEARCH{" "}
              </div>
            </div>
          </section>

          {/* {categories_info.map((category) => {
            // Find the category object in casino_games array
            const categoryGames = casino_games.find((game) => game[category]);
            const popularGames = categoryGames ? categoryGames[category] : [];
            return (
              <Categories
                user={user}
                games={popularGames}
                title={categoryDisplayNames[category]}
              />
            );
          })} */}
          {casino_search?.length > 0 ? (
            <div>
              <GameSearch
                user={user}
                games={casino_search} // Access the 'game' property directly
                // Access the 'provider' property directly
                title={"SEARCH FILTER"} // Assuming 'game_type_description' contains the title
              />
            </div>
          ) : game_type ? (
            casino_games.map((game, index) => (
              <div key={index}>
                <GameChoice
                  user={user}
                  games={game[Object.keys(game)[0]]} // Pass the dynamic key's value as a prop to the GameChoice component
                  provider={game?.provider} // Pass the dynamic key's value as a prop to the GameChoice component
                  title={game_type.replace("_", " ").toUpperCase()} // Assuming 'game_type_description' contains the title
                />
              </div>
            ))
          ) : (
            categories_info.map((category, index) => {
              const categoryGames = casino_games?.find(
                (game) => game[category]
              );
              const popularGames = categoryGames ? categoryGames[category] : [];
              const provider = categoryGames ? categoryGames?.provider : [];

              if (popularGames.length > 0) {
                return (
                  <Categories
                    user={user}
                    key={index}
                    games={popularGames}
                    title={categoryDisplayNames[category]}
                    provider={provider}
                  />
                );
              } else {
                return null; // Skip rendering if popularGames is empty
              }
            })
          )}

          {/* <Categories user={user} games={[]} title={"new"} /> */}
        </div>
        <div
          className={`${bottom_sheet ? "bottom-sheet casino show " : "d-none"}`}
        >
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
            <div className="body d-flex flex-column gap-4">
              <GameFilters
                user={user}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                handleGameChoice={handleGameChoice}
                casino_categories={casino_categories}
                setActiveCategoryLink={setActiveCategoryLink}
                collapseBottomSheet={collapseBottomSheet}
              />
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
    </div>
  );
};

export default NewCasino;

const GameFilters = ({
  user,
  activeItem,
  setActiveItem,
  handleGameChoice,
  casino_categories,
  setActiveCategoryLink,
  collapseBottomSheet,
}) => {
  return (
    <div className="scroll-content mb-3">
      <MenuItem title="RECOMMENDED" icon={faRecordVinyl} color={"gold"}>
        <div id="v-game-filters">
          <div className="sideFilters">
            <div className="filtersContainer">
              <FilterItem
                title="Hot"
                link="?game_type=hot"
                icon={faFire}
                icon_color="red"
                isActive={activeItem === "Hot"}
                setActiveItem={setActiveItem}
                onClick={() => {
                  handleGameChoice({
                    game: "hot",
                    provider: "hot",
                    gameId: "Hot",
                  });
                  setActiveCategoryLink(null);
                  if (collapseBottomSheet) {
                    collapseBottomSheet();
                  }
                }}
              />
              <FilterItem
                title="Popular"
                link="?game_type=popular"
                icon={faSmile}
                icon_color="gold"
                isActive={activeItem === "Popular"}
                setActiveItem={setActiveItem}
                onClick={() => {
                  handleGameChoice({
                    game: "popular",
                    provider: "popular",
                    gameId: "Popular",
                  });
                  setActiveCategoryLink(null);
                  if (collapseBottomSheet) {
                    collapseBottomSheet();
                  }
                }}
              />
              {user && (
                <FilterItem
                  title="Favorites"
                  link="?game_type=favorite"
                  icon={faStar}
                  icon_color="gold"
                  isActive={activeItem === "Favorites"}
                  setActiveItem={setActiveItem}
                  onClick={() => {
                    handleGameChoice({
                      game: "favorites",
                      provider: "favorites",
                      gameId: "Favorites",
                    });
                    setActiveCategoryLink(null);
                    if (collapseBottomSheet) {
                      collapseBottomSheet();
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </MenuItem>
      <MenuItem title="CATEGORIES" icon={faCampground} color="">
        <div id="v-game-filters">
          <div className="sideFilters">
            <div className="filtersContainer">
              
              <FilterItem
                title="SLOTS PLAY"
                link="?game_type=slots"
                isActive={activeItem === "SLOTS PLAY"}
                setActiveItem={setActiveItem}
                onClick={() => {
                  handleGameChoice({
                    game: "cs",
                    provider: "pragmatic",
                    gameId: "Classic Slots",
                  });
                  setActiveCategoryLink(null);
                  if (collapseBottomSheet) {
                    collapseBottomSheet();
                  }
                }}
              />
              <FilterItem
                title="CRASH GAMES"
                link="?game_type=crash-games"
                isActive={activeItem === "CRASH GAMES"}
                setActiveItem={setActiveItem}
                onClick={() => {
                  handleGameChoice({
                    game: "crash",
                    provider: "crash-games",
                    gameId: "Crash Games",
                  });
                  setActiveCategoryLink(null);
                  if (collapseBottomSheet) {
                    collapseBottomSheet();
                  }
                }}
              />

              <FilterItem
                title="ROULETTE PLAY"
                link="?game_type=roulette"
                isActive={activeItem === "ROULETTE PLAY"}
                setActiveItem={setActiveItem}
                onClick={() => {
                  handleGameChoice({
                    game: "rl",
                    provider: "pragmatic",
                    gameId: "Roulette",
                  });
                  setActiveCategoryLink(null);
                  if (collapseBottomSheet) {
                    collapseBottomSheet();
                  }
                }}
              />
              <FilterItem
                title="BLACKJACK"
                link="?game_type=blackjack"
                isActive={activeItem === "BLACKJACK"}
                setActiveItem={setActiveItem}
                onClick={() => {
                  handleGameChoice({
                    game: "bj",
                    provider: "pragmatic",
                    gameId: "Black Jack",
                  });
                  setActiveCategoryLink(null);
                  if (collapseBottomSheet) {
                    collapseBottomSheet();
                  }
                }}
              />
              <FilterItem
                title="CARD PLAY"
                link="?game_type=card_play"
                isActive={activeItem === "CARD PLAY"}
                setActiveItem={setActiveItem}
                onClick={() => {
                  handleGameChoice({
                    game: "sc",
                    provider: "pragmatic",
                    gameId: "Scratch Card",
                  });
                  setActiveCategoryLink(null);
                  if (collapseBottomSheet) {
                    collapseBottomSheet();
                  }
                }}
              />
              <FilterItem
                title="VIDEO POKER"
                link="?game_type=video_poker"
                isActive={activeItem === "VIDEO POKER"}
                setActiveItem={setActiveItem}
                onClick={() => {
                  handleGameChoice({
                    game: "vp",
                    provider: "pragmatic",
                    gameId: "Video Poker",
                  });
                  setActiveCategoryLink(null);
                  if (collapseBottomSheet) {
                    collapseBottomSheet();
                  }
                }}
              />
              <FilterItem
                title="LIVE CASINO"
                link="?game_type=live_casino"
                isActive={activeItem === "LIVE CASINO"}
                setActiveItem={setActiveItem}
                onClick={() => {
                  handleGameChoice({
                    game: "lg",
                    provider: "pragmatic",
                    gameId: "Live Games",
                  });
                  setActiveCategoryLink(null);
                  if (collapseBottomSheet) {
                    collapseBottomSheet();
                  }
                }}
              />
              <FilterItem
                title="POPULAR"
                link="?game_type=popular_pragmatic"
                isActive={activeItem === "POPULAR"}
                setActiveItem={setActiveItem}
                onClick={() => {
                  handleGameChoice({
                    game: "popular",
                    provider: "pragmatic",
                    gameId: "Popular",
                  });
                  setActiveCategoryLink(null);
                  if (collapseBottomSheet) {
                    collapseBottomSheet();
                  }
                }}
              />
              <FilterItem
                title="JACKPOT"
                link="?game_type=drops_and_wins"
                isActive={activeItem === "JACKPOT"}
                setActiveItem={setActiveItem}
                onClick={() => {
                  handleGameChoice({
                    game: "drops-n-wins",
                    provider: "pragmatic",
                    gameId: "jackpot_casino",
                  });
                  setActiveCategoryLink(null);
                  if (collapseBottomSheet) {
                    collapseBottomSheet();
                  }
                }}
              />
              <FilterItem
                title="VIRTUALS"
                link="?game_type=virtuals"
                isActive={activeItem === "VIRTUALS"}
                setActiveItem={setActiveItem}
                onClick={() => {
                  handleGameChoice({
                    game: "rgs-vsb",
                    provider: "pragmatic",
                    gameId: "Virtuals",
                  });
                  setActiveCategoryLink(null);
                  if (collapseBottomSheet) {
                    collapseBottomSheet();
                  }
                }}
              />
            </div>
          </div>
        </div>
      </MenuItem>
      <MenuItem title="GAME PROVIDER" icon={faAffiliatetheme} color="">
        <div id="v-game-filters">
          <div className="sideFilters">
            <div className="filtersContainer">
              <FilterItem
                title="SmartSoft"
                link="?game_type=smart_soft"
                isActive={activeItem === "SmartSoft"}
                setActiveItem={setActiveItem}
                onClick={() => {
                  handleGameChoice({
                    game: "smart-soft",
                    provider: "smart-soft",
                    gameId: "SmartSoft",
                  });
                  setActiveCategoryLink(null);
                  if (collapseBottomSheet) {
                    collapseBottomSheet();
                  }
                }}
              />
              <FilterItem
                title="Spribe"
                link="?game_type=spribe"
                isActive={activeItem === "Spribe"}
                setActiveItem={setActiveItem}
                onClick={() => {
                  handleGameChoice({
                    game: "spribe",
                    provider: "spribe",
                    gameId: "Spribe",
                  });
                  setActiveCategoryLink(null);
                  if (collapseBottomSheet) {
                    collapseBottomSheet();
                  }
                }}
              />
              <MenuItem title="Pragmatic Play" icon={faCableCar} color="">
                <div id="v-game-filters">
                  <div className="sideFilters">
                    <div className="filtersContainer">
                      {casino_categories?.map((category, index) => (
                        <FilterItem
                          key={index}
                          title={
                            category?.game_type_description ??
                            category?.default_description
                          }
                          isActive={
                            activeItem ===
                            (category?.game_type_description ??
                              category?.default_description)
                          }
                          setActiveItem={setActiveItem}
                          link="?game_type=pragmatic"
                          onClick={() => {
                            handleGameChoice({
                              game: category?.game_type_id,
                              provider: "pragmatic",
                              gameId:
                                category?.game_type_description ??
                                category?.default_description,
                            });
                            setActiveCategoryLink(null);
                            if (collapseBottomSheet) {
                              collapseBottomSheet();
                            }
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </MenuItem>
            </div>
          </div>
        </div>
      </MenuItem>

      {/* <div className="menu-item not-active">
              <Link to="/favorites/">
                <i className="ico ico-kickers"></i> GAME PROVIDER{" "}
                <i className="ico ico-chevron-right"></i>
              </Link>
              <div className="menu-item active">
                <div id="v-game-filters">
                  <div className="sideFilters" data-v-72be8539="">
                    <div className="totalFound" data-v-72be8539="">
                    0 PLAYS FOUND
                  </div>
                    <div className="filtersContainer" data-v-72be8539="">
                      <div className="filter-item" data-v-72be8539="">
                        Pragmatic
                        <i className="ico ico-chevron-right" data-v-72be8539=""></i>
                      </div>
                      <div className="filter-item" data-v-72be8539="">
                        SmartSoft
                        <i className="ico ico-chevron-right" data-v-72be8539=""></i>
                      </div>
                      <div className="filter-item" data-v-72be8539="">
                        Spribe
                        <i className="ico ico-chevron-right" data-v-72be8539=""></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

      {/* <div className="menu-item not-active">
              <Link to="/help/">
                <i className="ico ico-help"></i>HELP{" "}
              </Link>
            </div> */}
    </div>
  );
};

const CasinoCategorySection = ({
  title,
  gameDefaults,
  onClick,
  isActive,
  activeCallback,
}) => {
  const dispatchRedux = useDispatch();

  const handleCategoryClick = () => {
    dispatchRedux(setVirtualGame("casino_search", []));

    if (gameDefaults) {
      // Trigger gameDefaults if it exists
      gameDefaults();
    } else {
      // Trigger onClick if gameDefaults doesn't exist
      onClick();
    }
    activeCallback();
  };

  return (
    <Link
      to={`${
        title === "HOME"
          ? "/casino"
          : `?game_type=${title.toLowerCase().replace(" ", "")}`
      }`}
      className={`${
        isActive ? "active-casino-category" : "category-data"
      } casino-category-page-item section-item-category `}
      onClick={handleCategoryClick}
    >
      <li>
        <i className="ico ico-cardplay"></i>
        <span className="filters-settings">{title}</span>
      </li>
    </Link>
  );
};

const SmartCategorySection = ({
  title,
  gameDefaults,
  onClick,
  isActive,
  activeCallback,
}) => {
  const dispatchRedux = useDispatch();

  const handleCategoryClick = () => {
    dispatchRedux(setVirtualGame("casino_search", []));

    onClick();

    activeCallback();
  };

  return (
    <div
      className={`${
        isActive ? "active-casino-category" : "category-data"
      } casino-category-page-item section-item-category `}
      onClick={handleCategoryClick}
    >
      <li>
        <i className="ico ico-cardplay"></i>
        <span className="filters-settings">{title}</span>
      </li>
    </div>
  );
};

const GameChoice = ({ title, games, user, provider }) => {
  const [showButtons, setShowButtons] = useState(null);
  const dispatchRedux = useDispatch();

  const navigate = useNavigate();

  const favoritesData = useSelector((state) => state.virtuals.favorites_data);

  // Perform the conditional logic
  const favoriteCasinoValue =
    favoritesData?.length > 0
      ? favoritesData
      : getFromLocalStorage("favorite_casino") || [];

  // console.log("favorite Casino Value", favoriteCasinoValue )
  // console.log("data from local storage", favoriteCasinoValue )
  const [userFavoriteCasino, setUserFavoriteCasino] = useState(() => {
    return favoriteCasinoValue;
  });

  // Loader
  const [loadingMap, setLoadingMap] = useState({});

  // Handle the click event for a specific casino games to be marked as favorite
  const favoriteCasino = (
    event,
    game_id,
    image_url,
    game_name,
    game_category,
    provider,
    type
  ) => {
    // Prevent the click event from propagating to the Accordion
    event.stopPropagation();
    setLoadingMap((prevLoadingMap) => ({
      ...prevLoadingMap,
      [game_id]: true, // Set loading to true for the specific game
    }));

    // Update favorite status on the server
    setCasinoFavorite(
      game_id,
      image_url,
      game_name,
      game_category,
      provider,
      type
    );
  };

  // Function to set favorite items on the server
  const setCasinoFavorite = (
    game_id,
    image_url,
    game_name,
    game_category,
    provider,
    type
  ) => {
    const data = {
      game_id: game_id,
      image_url: image_url,
      game_name: game_name,
      game_category: game_category,
      provider: provider,
    };

    // Check if the game_id is already in the userFavoriteCasino array
    const isFavorite = userFavoriteCasino.some(
      (favorite) => favorite.game_id === game_id
    );

    // Dispatch the favoriteCasinoData asyncThunk to set the favorite casino games on the server
    dispatchRedux(favoriteCasinoData(data))
      .then((response) => {
        setLoadingMap((prevLoadingMap) => ({
          ...prevLoadingMap,
          [game_id]: false, // Set loading back to false for the specific game
        }));
        if (favoriteCasinoData.fulfilled.match(response)) {
          if (isFavorite) {
            // If already favorite, remove from favorites
            setUserFavoriteCasino((prevFavorites) =>
              prevFavorites.filter((fav) => fav.game_id !== game_id)
            );
          } else {
            // If not favorite, add to favorites
            setUserFavoriteCasino((prevFavorites) => [
              ...prevFavorites,
              { game_id: game_id },
            ]);
          }

          // Immediately update the local state with the new favorite casino games (optimistically)
          setUserFavoriteCasino((prevFavorites) => [...prevFavorites, game_id]);
        }

        // API call is successful (asynchronously), no need to update local state here again
        // Fetch updated favorite markets from the API if needed
        dispatchRedux(favoriteCasinoApi()).then((response) => {
          if (favoriteCasinoApi.fulfilled.match(response)) {
            console.log("what is my provider", type);
            if (type === "favorites") {
              console.log(
                "we are checking how favorites work",
                response.payload.data
              );

              dispatchRedux(
                setVirtualGame("casino_games", [
                  {
                    favorites:
                      response.payload.data ?? response.payload.games ?? [], // Assuming response contains the updated favorite games data
                    provider: "favorites",
                  },
                ])
              );
            }
          }
        });
      })
      .catch((error) => {
        // Handle error
        console.error("Error setting favorite casino games:", error);
        // API call failed, revert local state change
        setUserFavoriteCasino((prevFavorites) =>
          prevFavorites.filter((fav) => fav !== game_id)
        );
      });
  };

  const containerRef = useRef(null);

  const handleScroll = (direction) => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = 100;
    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
    } else if (direction === "right") {
      container.scrollLeft += scrollAmount;
    }
  };
  const handleMouseEnter = (index) => {
    setShowButtons(index);
  };

  const handleMouseLeave = (index) => {
    setShowButtons(index);
  };

  const handleMobileClick = (index) => {
    if (window.innerWidth <= 767) {
      setShowButtons(showButtons === index ? null : index);
    }
  };

  const handleButtonClick = (
    event,
    game_id,
    live = true,
    gameCategory = "",
    provider = "",
    crash_provider = ""
  ) => {
    event.stopPropagation(); // Prevent event from propagating to parent element

    console.log(`GameChoice information
   provider ${provider} ,
   game ${game_id},
    live ${live}= true,
   category  ${gameCategory} = "",
   crash  ${crash_provider} = ""
   event ${event}`);

    const redirectToGameplay = () => {
      // window.location.href = `/gameplay/${game_id}/${live ? "1" : "0"}`;
      navigate(`/gameplay/${game_id}/${live ? "1" : "0"}`);
    };

    const redirectToNareGames = () => {
      // window.location.href = `/nare-games/${game_id}${
      //   live ? "?status=live" : "?status=demo"
      // }`;
      navigate(
        `/nare-games/${game_id}${live ? "?status=live" : "?status=demo"}`
      );
    };

    const redirectToSmartPlay = () => {
      // window.location.href = `/smart-play?game=${game_id}&category=${gameCategory}&status=${
      //   live ? "live" : "demo"
      // }`;
      navigate(
        `/smart-play?game=${game_id}&category=${gameCategory}&status=${
          live ? "live" : "demo"
        }`
      );
    };

    if (user) {
      if (provider !== "crash-games") {
        switch (provider) {
          case "pragmatic":
            redirectToGameplay();
            break;
          case "spribe":
            redirectToNareGames();
            break;
          case "smart-soft":
            redirectToSmartPlay();
            break;
        }
      } else if (provider === "crash-games") {
        switch (crash_provider) {
          case "pragmatic":
            redirectToGameplay();
            break;
          case "spribe":
            redirectToNareGames();
            break;
          case "smartsoft":
            redirectToSmartPlay();
            break;
          default:
            navigate("/login");
        }
      }
    } else {
      navigate("/login");
    }
  };

  const finalProvider = ["favorites", "crash-games", "hot", "popular"];

  const handleScrollButtons = () => {
    const container = containerRef.current;
    if (!container) return;

    // const scrollLeft = container.scrollLeft;
    // const maxScroll = container.scrollWidth - container.clientWidth;

    return (
      <>
        <FontAwesomeIcon
          icon={faSquareCaretLeft}
          // className={`text-warning icons-size-direction-casino ${scrollLeft === 0 ? "disabled" : ""}`}
          className={`text-warning icons-size-direction-casino`}
          onClick={() => handleScroll("left")}
        />
        &nbsp;
        <FontAwesomeIcon
          icon={faSquareCaretRight}
          // className={`text-warning icons-size-direction-casino ${scrollLeft === maxScroll ? "disabled" : ""}`}
          className={`text-warning icons-size-direction-casino `}
          onClick={() => handleScroll("right")}
        />
      </>
    );
  };

  // console.log("games_data", games)
  return (
    <section className="sections-container section-white ">
      <div id="app-container">
        <div className="d-flex justify-content-between align-items-center mx-2 my-2 align-items-center">
          <h3 className="category-title ml-3 ml-xl-0 d-flex d-xl-block justify-content-between newGames align-items-center">
            {title}
            {/* <span>View ALL</span> */}
          </h3>
          {/* <div className="d-flex align-items-center mx-3 icons-size-direction-casino">
            {handleScrollButtons()}
          </div> */}
        </div>
      </div>

      <div
        ref={containerRef}
        className="gamesInline d-flex justify-content-start pb-1 pl-2 flex-wrap"
        title={title}
        all="false"
        overlay="false"
        big="false"
        style={{ width: "100%", overflow: "auto hidden" }}
      >
        {games.length > 0
          ? games?.map((game, index) => {
              return (
                <div
                  key={index}
                  className="gameInlineThumb image-container casino-item"
                  style={{ marginRight: "calc(var(--bs-gutter-x) / 2)" }}
                >
                  {(game?.game_icon ?? game?.image_url) && (
                    <div
                      className={`size-images-casino ${
                        showButtons === index && "mobile-click"
                      }`}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleMobileClick(index)}
                    >
                      <div style={{ position: "relative" }}>
                        <LazyLoadImage
                          effect={"blur"}
                          className="ls-is-cached"
                          // src="https://api-dk10.pragmaticplay.net/game_pic/square/200/vs40wildwest.png"
                          src={game?.game_icon ?? game?.image_url}
                          alt={game?.game_name ?? game?.gameName}
                        />

                        <div className="overlay">
                          <ButtonGroup aria-label="Casino Gaming Buttons">
                            <Button
                              variant="warning"
                              onClick={(event) =>
                                handleButtonClick(
                                  event,
                                  game?.game_id ?? game?.gameName ?? game?.key,
                                  false,
                                  game?.gameCategory,
                                  finalProvider.includes(provider)
                                    ? game?.provider
                                    : provider,
                                  game?.provider
                                )
                              }
                            >
                              Play Demo
                            </Button>
                            <Button
                              variant="danger"
                              onClick={(event) =>
                                handleButtonClick(
                                  event,
                                  game?.game_id ?? game?.gameName ?? game?.key,
                                  true,
                                  game?.gameCategory,
                                  finalProvider.includes(provider)
                                    ? game?.provider
                                    : provider,
                                  game?.provider
                                )
                              }
                            >
                              Play Game
                            </Button>
                          </ButtonGroup>
                        </div>
                      </div>
                      <FontAwesomeIcon
                        icon={faStar}
                        style={{
                          color: userFavoriteCasino?.some(
                            (favorite) =>
                              favorite.game_id ===
                              (game?.game_id ?? game?.gameName ?? game?.key)
                          )
                            ? "gold"
                            : "white",
                        }}
                        onClick={(event) =>
                          favoriteCasino(
                            event,
                            game?.game_id ?? game?.gameName ?? game?.key,
                            game?.game_icon ?? game?.image_url,
                            game?.game_name ?? game?.gameName ?? game?.name,
                            game?.gameCategory,
                            finalProvider.includes(provider)
                              ? game?.provider
                              : provider,
                            provider
                          )
                        }
                        className={`${user ? "favorite" : "d-none"}`}
                      />
                      &nbsp;
                      <span className="text-light">
                        {game?.game_name ?? game?.gameName}
                      </span>
                      {loadingMap[
                        game?.game_id ?? game?.gameName ?? game?.key
                      ] && <LoadingIndicator />}{" "}
                      {/* Render loading indicator for the specific game */}
                      {/* <div className="gameAttributes">
                <div
                  className="new"
                >
                  <span>NEW</span>
                </div>
              </div> */}
                    </div>
                  )}
                </div>
              );
            })
          : title.toLowerCase() === "favorite" && (
              <div
                className={
                  "no-casino-fav-text d-flex flex-column align-items-center justify-content-center w-100 gap-4"
                }
              >
                <FontAwesomeIcon
                  icon={faWarning}
                  style={{ color: "var(--faded-color)", fontSize: "32px" }}
                />
                <div>You do not have any favorite games yet</div>
              </div>
            )}
      </div>
    </section>
  );
};

const GameSearch = ({ title, games, user }) => {
  const [showButtons, setShowButtons] = useState(null);
  const dispatchRedux = useDispatch();

  const navigate = useNavigate();

  const favoritesData = useSelector((state) => state.virtuals.favorites_data);

  // Perform the conditional logic
  const favoriteCasinoValue =
    favoritesData?.length > 0
      ? favoritesData
      : getFromLocalStorage("favorite_casino") || [];

  // console.log("favorite Casino Value", favoriteCasinoValue )
  // console.log("data from local storage", favoriteCasinoValue )
  const [userFavoriteCasino, setUserFavoriteCasino] = useState(() => {
    return favoriteCasinoValue;
  });

  // Get favorite items from the API
  // const getFavoriteCasino = useCallback(async () => {
  //   dispatchRedux(favoriteCasinoApi());
  // }, []);

  // Loader
  const [loadingMap, setLoadingMap] = useState({});

  // Handle the click event for a specific casino games to be marked as favorite
  const favoriteCasino = (
    event,
    game_id,
    image_url,
    game_name,
    game_category,
    provider,
    type
  ) => {
    // Prevent the click event from propagating to the Accordion
    event.stopPropagation();
    setLoadingMap((prevLoadingMap) => ({
      ...prevLoadingMap,
      [game_id]: true, // Set loading to true for the specific game
    }));

    // Update favorite status on the server
    setCasinoFavorite(
      game_id,
      image_url,
      game_name,
      game_category,
      provider,
      type
    );
  };

  // Function to set favorite items on the server
  const setCasinoFavorite = (
    game_id,
    image_url,
    game_name,
    game_category,
    provider,
    type
  ) => {
    const data = {
      game_id: game_id,
      image_url: image_url,
      game_name: game_name,
      game_category: game_category,
      provider: provider,
    };

    // Check if the game_id is already in the userFavoriteCasino array
    const isFavorite = userFavoriteCasino.some(
      (favorite) => favorite.game_id === game_id
    );

    // Dispatch the favoriteCasinoData asyncThunk to set the favorite casino games on the server
    dispatchRedux(favoriteCasinoData(data))
      .then((response) => {
        setLoadingMap((prevLoadingMap) => ({
          ...prevLoadingMap,
          [game_id]: false, // Set loading back to false for the specific game
        }));
        if (favoriteCasinoData.fulfilled.match(response)) {
          if (isFavorite) {
            // If already favorite, remove from favorites
            setUserFavoriteCasino((prevFavorites) =>
              prevFavorites.filter((fav) => fav.game_id !== game_id)
            );
          } else {
            // If not favorite, add to favorites
            setUserFavoriteCasino((prevFavorites) => [
              ...prevFavorites,
              { game_id: game_id },
            ]);
          }

          // Immediately update the local state with the new favorite casino games (optimistically)
          setUserFavoriteCasino((prevFavorites) => [...prevFavorites, game_id]);
        }

        // API call is successful (asynchronously), no need to update local state here again
        // Fetch updated favorite markets from the API if needed
        dispatchRedux(favoriteCasinoApi()).then((response) => {
          if (favoriteCasinoApi.fulfilled.match(response)) {
            console.log("what is my provider", type);
            if (type === "favorites") {
              console.log(
                "we are checking how favorites work",
                response.payload.data
              );

              dispatchRedux(
                setVirtualGame("casino_games", [
                  {
                    favorites:
                      response.payload.data ?? response.payload.games ?? [], // Assuming response contains the updated favorite games data
                    provider: "favorites",
                  },
                ])
              );
            }
          }
        });
      })
      .catch((error) => {
        // Handle error
        console.error("Error setting favorite casino games:", error);
        // API call failed, revert local state change
        setUserFavoriteCasino((prevFavorites) =>
          prevFavorites.filter((fav) => fav !== game_id)
        );
      });
  };

  const containerRef = useRef(null);

  const handleScroll = (direction) => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = 100;
    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
    } else if (direction === "right") {
      container.scrollLeft += scrollAmount;
    }
  };
  const handleMouseEnter = (index) => {
    setShowButtons(index);
  };

  const handleMouseLeave = (index) => {
    setShowButtons(index);
  };

  const handleMobileClick = (index) => {
    if (window.innerWidth <= 767) {
      setShowButtons(showButtons === index ? null : index);
    }
  };
  const handleButtonClick = (
    event,
    game_id,
    live = true,
    gameCategory = "",
    provider = "",
    crash_provider = ""
  ) => {
    event.stopPropagation(); // Prevent event from propagating to parent element

    const redirectToGameplay = () => {
      // window.location.href = `/gameplay/${game_id}/${live ? "1" : "0"}`;
      navigate(`/gameplay/${game_id}/${live ? "1" : "0"}`);
    };

    const redirectToNareGames = () => {
      // window.location.href = `/nare-games/${game_id}${
      //   live ? "?status=live" : "?status=demo"
      // }`;
      navigate(
        `/nare-games/${game_id}${live ? "?status=live" : "?status=demo"}`
      );
    };

    const redirectToSmartPlay = () => {
      // window.location.href = `/smart-play?game=${game_id}&category=${gameCategory}&status=${
      //   live ? "live" : "demo"
      // }`;
      navigate(
        `/smart-play?game=${game_id}&category=${gameCategory}&status=${
          live ? "live" : "demo"
        }`
      );
    };

    if (user) {
      if (provider !== "crash-games") {
        switch (provider) {
          case "pragmatic":
            redirectToGameplay();
            break;
          case "spribe":
            redirectToNareGames();
            break;
          case "smart-soft":
            redirectToSmartPlay();
            break;
        }
      } else if (provider === "crash-games") {
        switch (crash_provider) {
          case "pragmatic":
            redirectToGameplay();
            break;
          case "spribe":
            redirectToNareGames();
            break;
          case "smartsoft":
            redirectToSmartPlay();
            break;
          default:
            navigate("/login");
        }
      }
    } else {
      navigate("/login");
    }
  };

  const finalProvider = ["favorites", "crash-games", "hot", "popular"];

  const handleScrollButtons = () => {
    const container = containerRef.current;
    if (!container) return;

    // const scrollLeft = container.scrollLeft;
    // const maxScroll = container.scrollWidth - container.clientWidth;

    return (
      <>
        <FontAwesomeIcon
          icon={faSquareCaretLeft}
          // className={`text-warning icons-size-direction-casino ${scrollLeft === 0 ? "disabled" : ""}`}
          className={`text-warning icons-size-direction-casino`}
          onClick={() => handleScroll("left")}
        />
        &nbsp;
        <FontAwesomeIcon
          icon={faSquareCaretRight}
          // className={`text-warning icons-size-direction-casino ${scrollLeft === maxScroll ? "disabled" : ""}`}
          className={`text-warning icons-size-direction-casino `}
          onClick={() => handleScroll("right")}
        />
      </>
    );
  };

  // console.log("games_data", games)
  return (
    <section className="sections-container section-white ">
      <div id="app-container">
        <div className="d-flex justify-content-between align-items-center mx-2 my-2">
          <h3 className="category-title ml-3 ml-xl-0 d-flex d-xl-block justify-content-between newGames">
            {title}
            {/* <span>View ALL</span> */}
          </h3>
          {/* <div className="d-flex align-items-center mx-3 icons-size-direction-casino">
            {handleScrollButtons()}
          </div> */}
        </div>
      </div>

      <div
        ref={containerRef}
        className="gamesInline d-flex justify-content-start pb-1 pl-2 flex-wrap"
        title={title}
        all="false"
        overlay="false"
        big="false"
        style={{ width: "100%", overflow: "auto hidden" }}
      >
        {games.map((game, index) => {
          console.log("search_data", game);

          return (
            <div
              key={index}
              className="gameInlineThumb image-container casino-item"
              style={{ marginRight: "calc(var(--bs-gutter-x) / 2)" }}
            >
              {(game?.game?.game_icon ?? game?.game?.image_url) && (
                <div
                  className={`size-images-casino ${
                    showButtons === index && "mobile-click"
                  }`}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleMobileClick(index)}
                >
                  <div style={{ position: "relative" }}>
                    <LazyLoadImage
                      effect={"blur"}
                      className="ls-is-cached"
                      // src="https://api-dk10.pragmaticplay.net/game_pic/square/200/vs40wildwest.png"
                      src={game?.game?.game_icon ?? game?.game?.image_url}
                      alt={game?.game?.game_name ?? game?.game?.gameName}
                    />

                    <div className="overlay">
                      <ButtonGroup aria-label="Casino Gaming Buttons">
                        <Button
                          variant="warning"
                          onClick={(event) =>
                            handleButtonClick(
                              event,
                              game?.game?.game_id ??
                                game?.game?.gameName ??
                                game?.game?.key,
                              false,
                              game?.game?.gameCategory,
                              finalProvider.includes(game.provider)
                                ? game?.game?.provider
                                : game.provider,
                              game?.game?.provider
                            )
                          }
                        >
                          Play Demo
                        </Button>
                        <Button
                          variant="danger"
                          onClick={(event) =>
                            handleButtonClick(
                              event,
                              game?.game?.game_id ??
                                game?.game?.gameName ??
                                game?.game?.key,
                              true,
                              game?.game?.gameCategory,
                              finalProvider.includes(game.provider)
                                ? game?.game?.provider
                                : game.provider,
                              game?.game?.provider
                            )
                          }
                        >
                          Play Game
                        </Button>
                      </ButtonGroup>
                    </div>
                  </div>
                  <FontAwesomeIcon
                    icon={faStar}
                    style={{
                      color: userFavoriteCasino?.some(
                        (favorite) =>
                          favorite.game_id ===
                          (game?.game?.game_id ??
                            game?.game?.gameName ??
                            game?.game?.key)
                      )
                        ? "gold"
                        : "white",
                    }}
                    onClick={(event) =>
                      favoriteCasino(
                        event,
                        game?.game?.game_id ??
                          game?.game?.gameName ??
                          game?.game?.key,
                        game?.game?.game_icon ?? game?.game?.image_url,
                        game?.game?.game_name ??
                          game?.game?.gameName ??
                          game?.game?.name,
                        game?.game?.gameCategory,
                        finalProvider.includes(game.provider)
                          ? game?.game?.provider
                          : game?.provider,
                        game?.provider
                      )
                    }
                    className={`${user ? "favorite" : "d-none"}`}
                  />
                  &nbsp;
                  <span className="text-light">
                    {game?.game?.game_name ?? game?.game?.gameName}
                  </span>
                  {loadingMap[
                    game?.game?.game_id ??
                      game?.game?.gameName ??
                      game?.game?.key
                  ] && <LoadingIndicator />}{" "}
                  {/* Render loading indicator for the specific game */}
                  {/* <div className="gameAttributes">
                <div
                  className="new"
                >
                  <span>NEW</span>
                </div>
              </div> */}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

const LoadingIndicator = () => {
  return <span class="loader-casino"></span>
  // return <div className="loading-indicator">Loading...</div>;
};

const Categories = ({ title, games, user, provider }) => {
  const [showButtons, setShowButtons] = useState(null);
  // Loader
  const [loadingMap, setLoadingMap] = useState({});

  const navigate = useNavigate();

  const dispatchRedux = useDispatch();
  const favoritesData = useSelector((state) => state.virtuals.favorites_data);
  const finalProvider = ["favorites", "crash-games", "hot", "popular"];

  // Perform the conditional logic
  const favoriteCasinoValue =
    favoritesData?.length > 0
      ? favoritesData
      : getFromLocalStorage("favorite_casino") || [];

  // console.log("favorite Casino Value", favoriteCasinoValue )
  // console.log("data from local storage", favoriteCasinoValue )
  const [userFavoriteCasino, setUserFavoriteCasino] = useState(() => {
    return favoriteCasinoValue;
  });

  // Get favorite items from the API
  const getFavoriteCasino = useCallback(async () => {
    dispatchRedux(favoriteCasinoApi());
  }, []);

  // Handle the click event for a specific casino games to be marked as favorite
  const favoriteCasino = (
    event,
    game_id,
    image_url,
    game_name,
    game_category,
    provider
  ) => {
    // Prevent the click event from propagating to the Accordion
    event.stopPropagation();
    setLoadingMap((prevLoadingMap) => ({
      ...prevLoadingMap,
      [game_id]: true, // Set loading to true for the specific game
    }));

    // Update favorite status on the server
    setCasinoFavorite(game_id, image_url, game_name, game_category, provider);
  };

  // Function to set favorite items on the server
  const setCasinoFavorite = (
    game_id,
    image_url,
    game_name,
    game_category,
    provider
  ) => {
    const data = {
      game_id: game_id,
      image_url: image_url,
      game_name: game_name,
      game_category: game_category,
      provider: provider,
    };

    // Check if the game_id is already in the userFavoriteCasino array
    const isFavorite = userFavoriteCasino.some(
      (favorite) => favorite.game_id === game_id
    );
    // console.log("isFavorite", isFavorite);

    // Dispatch the favoriteCasinoData asyncThunk to set the favorite casino games on the server
    dispatchRedux(favoriteCasinoData(data))
      .then((response) => {
        setLoadingMap((prevLoadingMap) => ({
          ...prevLoadingMap,
          [game_id]: false, // Set loading back to false for the specific game
        }));
        if (favoriteCasinoData.fulfilled.match(response)) {
          if (isFavorite) {
            // If already favorite, remove from favorites
            setUserFavoriteCasino((prevFavorites) =>
              prevFavorites.filter((fav) => fav.game_id !== game_id)
            );
          } else {
            // If not favorite, add to favorites
            setUserFavoriteCasino((prevFavorites) => [
              ...prevFavorites,
              { game_id: game_id },
            ]);
          }

          // Immediately update the local state with the new favorite casino games (optimistically)
          setUserFavoriteCasino((prevFavorites) => [...prevFavorites, game_id]);
        }

        // API call is successful (asynchronously), no need to update local state here again
        // Fetch updated favorite markets from the API if needed
        dispatchRedux(favoriteCasinoApi());
      })
      .catch((error) => {
        // Handle error
        console.error("Error setting favorite casino games:", error);
        // API call failed, revert local state change
        setUserFavoriteCasino((prevFavorites) =>
          prevFavorites.filter((fav) => fav !== game_id)
        );
      });
  };

  const containerRef = useRef(null);

  const handleScroll = (direction) => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = 100;
    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
    } else if (direction === "right") {
      container.scrollLeft += scrollAmount;
    }
  };
  const handleMouseEnter = (index) => {
    setShowButtons(index);
  };

  const handleMouseLeave = (index) => {
    setShowButtons(index);
  };

  const handleMobileClick = (index) => {
    if (window.innerWidth <= 767) {
      setShowButtons(showButtons === index ? null : index);
    }
  };
  const handleButtonClick = (
    event,
    game_id,
    live = true,
    gameCategory = "",
    provider = "",
    crash_provider = ""
  ) => {
    console.log(`this was clicked game info: 
      ${live}
      ${gameCategory}
      ${provider} 
      ${crash_provider} 
      `);
    event.stopPropagation();

    const redirectToGameplay = () => {
      // window.location.href = `/gameplay/${game_id}/${live ? "1" : "0"}`;
      navigate(`/gameplay/${game_id}/${live ? "1" : "0"}`);
    };

    const redirectToNareGames = () => {
      // window.location.href = `/nare-games/${game_id}${
      //   live ? "?status=live" : "?status=demo"
      // }`;
      navigate(
        `/nare-games/${game_id}${live ? "?status=live" : "?status=demo"}`
      );
    };

    const redirectToSmartPlay = () => {
      // window.location.href = `/smart-play?game=${game_id}&category=${gameCategory}&status=${
      //   live ? "live" : "demo"
      // }`;
      navigate(
        `/smart-play?game=${game_id}&category=${gameCategory}&status=${
          live ? "live" : "demo"
        }`
      );
    };

    if (user) {
      if (provider !== "crash-games") {
        switch (provider) {
          case "pragmatic":
            redirectToGameplay();
            break;
          case "spribe":
            redirectToNareGames();
            break;
          case "smart-soft":
            redirectToSmartPlay();
            break;
          case "smartsoft":
            redirectToSmartPlay();
            break;
        }
      } else if (provider === "crash-games") {
        switch (crash_provider) {
          case "pragmatic":
            redirectToGameplay();
            break;
          case "spribe":
            redirectToNareGames();
            break;
          case "smartsoft":
            redirectToSmartPlay();
            break;
          default:
            navigate("/login");
        }
      }
    } else {
      navigate("/login");
    }
  };

  const handleScrollButtons = () => {
    const container = containerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;

    return (
      <>
        <FontAwesomeIcon
          icon={faSquareCaretLeft}
          // className={`text-warning icons-size-direction-casino ${scrollLeft === 0 ? "disabled" : ""}`}
          className={`text-warning icons-size-direction-casino`}
          onClick={() => handleScroll("left")}
        />
        &nbsp;
        <FontAwesomeIcon
          icon={faSquareCaretRight}
          // className={`text-warning icons-size-direction-casino ${scrollLeft === maxScroll ? "disabled" : ""}`}
          className={`text-warning icons-size-direction-casino `}
          onClick={() => handleScroll("right")}
        />
      </>
    );
  };

  const [viewAll, setViewAll] = useState(false);
  const sectionRef = useRef(null);

  const toggleChoice = (index) => {
    setViewAll(!viewAll);

    if (!viewAll && sectionRef.current) {
      // Scroll to the top of the component when VIEW ALL is clicked with an offset of 30px
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  useEffect(() => {
    if (viewAll && sectionRef.current) {
      // Scroll to the top of the component when VIEW ALL is true with an offset of 30px
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [viewAll]);

  // console.log("games_data", games)
  return (
    <section className="sections-container section-white " ref={sectionRef}>
      <div id="app-container ">
        <div className="d-flex justify-content-between align-items-center mx-2 my-2 flex-wrap px-1">
          <h3 className="category-title ml-3 ml-xl-0 d-flex d-xl-block justify-content-between newGames ">
            {title}{" "}
            <span onClick={toggleChoice}>VIEW {viewAll ? "LESS" : "ALL"}</span>
          </h3>
          {!viewAll && (
            <div className="d-flex align-items-center mx-3 icons-size-direction-casino">
              {handleScrollButtons()}
            </div>
          )}
        </div>
      </div>

      <div
        ref={containerRef}
        className={`gamesInline d-flex justify-content-start pb-1 pl-2  ${
          viewAll ? "flex-wrap" : ""
        } `}
        title={title}
        all="false"
        overlay="false"
        big="false"
        style={{ width: "100%", overflow: "auto hidden" }}
      >
        {games?.map((game, index) => {
          return (
            <div
              key={index}
              style={{ marginRight: "calc(var(--bs-gutter-x) / 2)" }}
              className={`gameInlineThumb image-container  ${
                viewAll ? "casino-item " : ""
              } `}
            >
              {(game?.game_icon ?? game?.image_url) && (
                <div
                  className={`size-images-casino ${
                    showButtons === index && "mobile-click"
                  }`}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleMobileClick(index)}
                >
                  <div style={{ position: "relative" }}>
                    <LazyLoadImage
                      effect={"blur"}
                      className="ls-is-cached"
                      src={game?.game_icon ?? game?.image_url}
                      alt={game?.game_name ?? game?.gameName}
                    />

                    <div className="overlay">
                      <ButtonGroup aria-label="Casino Gaming Buttons">
                        <Button
                          variant="warning"
                          onClick={(event) =>
                            handleButtonClick(
                              event,
                              game?.game_id ?? game?.gameName ?? game?.key,
                              false,
                              game?.gameCategory,
                              finalProvider.includes(provider)
                                ? game?.provider
                                : provider,
                              game?.provider
                            )
                          }
                        >
                          Play Demo
                        </Button>
                        <Button
                          variant="danger"
                          onClick={(event) =>
                            handleButtonClick(
                              event,
                              game?.game_id ?? game?.gameName ?? game?.key,
                              true,
                              game?.gameCategory,
                              finalProvider.includes(provider)
                                ? game?.provider
                                : provider,
                              game?.provider
                            )
                          }
                        >
                          Play Game
                        </Button>
                      </ButtonGroup>
                    </div>
                  </div>
                  <FontAwesomeIcon
                    icon={faStar}
                    style={{
                      color: userFavoriteCasino?.some(
                        (favorite) =>
                          favorite.game_id ===
                          (game?.game_id ?? game?.gameName ?? game?.key)
                      )
                        ? "gold"
                        : "white",
                    }}
                    onClick={(event) =>
                      favoriteCasino(
                        event,
                        game?.game_id ?? game?.gameName ?? game?.key,
                        game?.game_icon ?? game?.image_url,
                        game?.game_name ?? game?.gameName ?? game?.name,
                        game?.gameCategory,
                        finalProvider.includes(provider)
                          ? game?.provider
                          : provider
                      )
                    }
                    className={`${user ? "favorite" : "d-none"}`}
                  />
                  &nbsp;
                  <span className="text-light">
                    {game?.game_name ?? game?.gameName}
                  </span>
                  {loadingMap[game?.game_id ?? game?.gameName ?? game?.key] && (
                    <LoadingIndicator />
                  )}{" "}
                  {/* Render loading indicator for the specific game */}
                  {/* <div className="gameAttributes">
                <div
                  className="new"
                >
                  <span>NEW</span>
                </div>
              </div> */}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

function MenuItem({ title, icon, children, color }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleCollapse = () => {
    setIsOpen(isOpen);
  };

  return (
    <div
      className={`menu-item ${
        color?.length > 0 && color != undefined ? " recommended-casino " : ""
      } ${isOpen ? "active" : "not-active"}`}
    >
      <div
        className="d-flex justify-content-between align-items-center menu-info categories-section-items"
        onClick={toggleCollapse}
        style={{
          background:
            title === "Pragmatic"
              ? "repeating-linear-gradient(45deg, rgb(64 33 163), transparent 100px)"
              : "repeating-linear-gradient(45deg, #0d6efd, transparent 100px)",
        }}
      >
        <span className="text-start">
          <FontAwesomeIcon icon={icon} /> {title}
        </span>
        {/* <FontAwesomeIcon icon={faAngleRight} /> */}
      </div>
      {isOpen && <div className="py-3">{children}</div>}
    </div>
  );
}

const FilterItem = ({
  title,
  icon,
  link,
  icon_color,
  onClick,
  isActive,
  setActiveItem,
}) => {
  const dispatchRedux = useDispatch();

  const handleItemClick = () => {
    dispatchRedux(setVirtualGame("casino_search", []));

    if (onClick) {
      onClick(); // Trigger onClick if provided
    }
    setActiveItem(title); // Set the clicked item as active
  };

  return (
    <Link
      to={link}
      data-v-72be8539=""
      className={`filter-item filter-item-styling ${
        isActive ? "active-filter-item" : ""
      }`}
      onClick={handleItemClick}
    >
      <div className="d-flex align-items-center">
        {icon && <FontAwesomeIcon icon={icon} style={{ color: icon_color }} />}{" "}
        {/* Check if there is an icon and render it */}
        &nbsp;{title}
        {/* {!icon && <i className="ico ico-chevron-right"></i>} */}
      </div>
    </Link>
  );
};
