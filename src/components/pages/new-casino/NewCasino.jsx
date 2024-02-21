import React, { useContext, useEffect, useRef, useState } from "react";
import "./casino.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Button, ButtonGroup } from "react-bootstrap";
import CasinoCarouselLoader from "./CasinoCarouseld";
import {
  faCableCar,
  faCampground,
  faFire,
  faRecordVinyl,
  faSmile,
  faSquareCaretLeft,
  faSquareCaretRight,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { getFromLocalStorage } from "../../utils/local-storage";
import {
  casinoList,
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
  const { state, dispatch } = useContext(StoreContext);

  const [games, setGames] = useState([]);
  const [showFilters, setShowFilters] = useState(true);
  // const storedCategories = getFromLocalStorage("casino_categories");

  // const casino_categories = useSelector(
  //   (state) => state.virtuals.casino_categories
  // );
  const casino_games = useSelector((state) => state.virtuals.casino_games);

  // const [settings, setSettings] = useState(getFromLocalStorage("settings"));
  // const defaultCasinoCategory =
  //   settings?.casinoConfigs?.casino_default_category;

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

    // dispatchRedux(setVirtualGame("game_type", game));

    // todo Reset casino search
    dispatch({ type: "SET", key: "casino_search", payload: {} });

    // Fetch games based on game and provider
    if (provider === "pragmatic") {
      // Fetch all Pragmatic games
      fetchGames(game);
    } else if (provider === "smart-soft") {
      // Fetch Smart Soft games
      getSmartGames(game);
    } else if (provider === "crash-games") {
      // Fetch Crash games
      getCrashGames(game);
    } else {
      // Fetch Fast games
      getFastGames(game);
    }
  };

  useEffect(() => {
    if (game_type) return;
    gameDefaults();
    const abortController = new AbortController();

    return () => {
      abortController.abort(); // Abort any pending fetch requests
    };
  }, [game_type]);

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
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to '/new-casino' when the component mounts
    navigate("/new-casino");
  }, []); // Empty dependency array to run the effect only once when the component mounts

  const getCategoryGames = (category) => {
    setGames([]);
    fetchGames(category?.game_type_id);
    setActiveCategory(category?.game_type_id); // Set the active category when clicked
  };

  const filterGamesAvailable = (category) => {
    //filter games
    setActiveCategory(category?.default_description ?? category); // Set the active category when clicked
    if (activeCategory === "All") {
      dispatch({ type: "SET", key: "casino_search", payload: games });
    } else {
      const filteredData = games?.filter((item) =>
        item.gameCategory
          .toLowerCase()
          .includes(category?.default_description?.toLowerCase())
      );
      dispatch({ type: "SET", key: "casino_search", payload: filteredData });
    }
  };
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

  return (
    <div className="games-page d-flex">
      <div className="left-nav lazyloaded">
        <div
          className="menu-container"
          data-scrollbar="true"
          tabIndex="-1"
          style={{ overflow: "hidden", outline: "none" }}
        >
          <div className="scroll-content mb-3">
            <MenuItem title="COMING SOON" icon={faRecordVinyl} color={"gold"}>
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
                    />
                    <FilterItem
                      title="Popular"
                      link="?game_type=popular"
                      icon={faSmile}
                      icon_color="gold"
                      isActive={activeItem === "Popular"}
                      setActiveItem={setActiveItem}
                    />
                  </div>
                </div>
              </div>
            </MenuItem>
            <MenuItem title="CATEGORIES" icon={faCampground} color="">
              <div id="v-game-filters">
                <div className="sideFilters">
                  <div className="filtersContainer">
                    {/* <FilterItem
                      title="Favorites"
                      link="?game_type=favorite"
                      icon={faStar}
                      icon_color="gold"
                      isActive={activeItem === "Favorite"}
                      setActiveItem={setActiveItem}
                    /> */}
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
                      }}
                    />
                    <MenuItem title="Pragmatic" icon={faCableCar} color="">
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
            <ul
              className={`filters ${
                showFilters ? "d-flex" : "d-none"
              } pb-3 pb-xl-0 mr-0 ml-0 mt-3 mb-3 mt-xl-3 mb-xl-1 align-items-center ${
                activeCategoryLink === "SEARCH" ? "active-casino-category" : ""
              }`}
            >
              <li
                className="ml-3 d-xl-none"
                id="v-search-mobile"
                onClick={() => {
                  handleCategoryClick("SEARCH");
                }}
              >
                <Link to="#" onClick={handleSearchClick}>
                  <i className="ico ico-search"></i>
                  <span className="filters-settings">SEARCH</span>
                </Link>
              </li>
              <CasinoCategorySection
                title="HOME"
                gameDefaults={gameDefaults}
                isActive={activeCategoryLink === "HOME"}
                activeCallback={() => handleCategoryClick("HOME")}
              />
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
            </ul>
            {/* <CategoriesSection showFilters={showFilters} handleSearchClick={handleSearchClick} gameDefaults={gameDefaults} onClick={handleGameChoice} /> */}
          </section>
          <section
            className={`section-container ${
              !showFilters ? "d-flex" : "d-none"
            }`}
            id="v-search"
          >
            <div className="search-wrapper">
              <div className="search-group">
                <div className="search-input-group">
                  <span className="search-addon">
                    <i className="ico ico-search"></i>
                  </span>
                  <input type="text" placeholder="SEARCH..." />
                  <span className="close-addon">
                    <i className="ico ico-close"></i>
                  </span>
                </div>
              </div>
              <span className="search-close" onClick={handleBackClick}>
                <i className="ico ico-chevron-left"></i> BACK{" "}
              </span>
              <div className="search-advance">
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
          {game_type
            ? casino_games.map((game, index) => (
                <div key={index}>
                  <GameChoice
                    user={user}
                    games={game[Object.keys(game)[0]]} // Pass the dynamic key's value as a prop to the GameChoice component
                    provider={game[Object.keys(game)[1]]} // Pass the dynamic key's value as a prop to the GameChoice component
                    title={game_type.toUpperCase()} // Assuming 'game_type_description' contains the title
                  />
                </div>
              ))
            : categories_info.map((category, index) => {
                const categoryGames = casino_games.find(
                  (game) => game[category]
                );
                const popularGames = categoryGames
                  ? categoryGames[category]
                  : [];
                const provider = categoryGames ? categoryGames["provider"] : [];

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
              })}

          {/* <Categories user={user} games={[]} title={"new"} /> */}
        </div>
      </div>
    </div>
  );
};

export default NewCasino;

const CategoriesSection = ({
  showFilters,
  handleSearchClick,
  gameDefaults,
  onClick,
}) => {
  return (
    <ul
      className={`filters ${
        showFilters ? "d-flex" : "d-none"
      } pb-3 pb-xl-0 mr-0 ml-0 mt-3 mb-3 mt-xl-3 mb-xl-1 align-items-center `}
    >
      <li className="ml-3 d-xl-none" id="v-search-mobile">
        <Link to="#" onClick={handleSearchClick}>
          <i className="ico ico-search"></i>
          <span className="filters-settings">SEARCH</span>
        </Link>
      </li>
      <li>
        <Link to="/new-casino" onClick={gameDefaults}>
          <i className="ico ico-cardplay"></i>
          <span className="filters-settings">HOME</span>
        </Link>
      </li>
      <li>
        <Link to="?game_type=slots">
          <i className="ico ico-reels"></i>
          <span className="filters-settings">SLOTS PLAY</span>
        </Link>
      </li>
      <li>
        <Link to="?game_type=roulette">
          <i className="ico ico-roulette"></i>
          <span className="filters-settings">ROULETTE PLAY</span>
        </Link>
      </li>
      <li>
        <Link to="?game_type=blackjack">
          <i className="ico ico-blackjack"></i>
          <span className="filters-settings">BLACKJACK</span>
        </Link>
      </li>
      <li>
        <Link to="?game_type=live-casino">
          <i className="ico ico-livecasino"></i>
          <span className="filters-settings">LIVE CASINO</span>
        </Link>
      </li>
      <li>
        <Link to="?game_type=jackpot_casino">
          <i className="ico ico-jackpot"></i>
          <span className="filters-settings">JACKPOT PLAY</span>
        </Link>
        <div id="v-total-jackpot"></div>
      </li>
      <li>
        <Link to="?game_type=video-poker">
          <i className="ico ico-cardplay"></i>
          <span className="filters-settings">CARD PLAY</span>
        </Link>
      </li>
    </ul>
  );
};

const CasinoCategorySection = ({
  title,
  gameDefaults,
  onClick,
  isActive,
  activeCallback,
}) => {
  const handleCategoryClick = () => {
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
          ? "/new-casino"
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

const GameChoice = ({ title, games, user, provider }) => {
  const [showButtons, setShowButtons] = useState(null);
  const show = useSelector((state) => state.data.show_menu_casino);
  const game_type = useSelector((state) => state.virtuals.game_type);
  const navigate = useNavigate();

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
      window.location.href = `/gameplay/${game_id}/${live ? "1" : "0"}`;
    };

    const redirectToNareGames = () => {
      window.location.href = `/nare-games/${game_id}${
        live ? "?status=live" : "?status=demo"
      }`;
    };

    const redirectToSmartPlay = () => {
      window.location.href = `/smart-play?game=${game_id}&category=${gameCategory}&status=${
        live ? "live" : "demo"
      }`;
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
        <div className="d-flex justify-content-between align-items-center mx-3 my-2">
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
        className="gamesInline d-flex justify-content-start pb-3 pl-2 flex-wrap"
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
                      className=" ls-is-cached"
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
                              provider,
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
                              provider,
                              game?.provider
                            )
                          }
                        >
                          Play Game
                        </Button>
                      </ButtonGroup>
                    </div>
                  </div>

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

const Categories = ({ title, games, user, provider }) => {
  const [showButtons, setShowButtons] = useState(null);

  const navigate = useNavigate();

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
      window.location.href = `/gameplay/${game_id}/${live ? "1" : "0"}`;
    };

    const redirectToNareGames = () => {
      window.location.href = `/nare-games/${game_id}${
        live ? "?status=live" : "?status=demo"
      }`;
    };

    const redirectToSmartPlay = () => {
      window.location.href = `/smart-play?game=${game_id}&category=${gameCategory}&status=${
        live ? "live" : "demo"
      }`;
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
      // Scroll to the top of the component when VIEW ALL is clicked
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (viewAll && sectionRef.current) {
      // Scroll to the top of the component when VIEW ALL is true
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [viewAll]);

  // console.log("games_data", games)
  return (
    <section className="sections-container section-white " ref={sectionRef}>
      <div id="app-container ">
        <div className="d-flex justify-content-between align-items-center mx-3 my-2 flex-wrap">
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
        className={`gamesInline d-flex justify-content-start pb-3 pl-2 ${
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
                      className=" ls-is-cached"
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
                              provider,
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
                              provider,
                              game?.provider
                            )
                          }
                        >
                          Play Game
                        </Button>
                      </ButtonGroup>
                    </div>
                  </div>

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
        className="d-flex justify-content-between align-items-center menu-info"
        onClick={toggleCollapse}
        style={{
          background:
           title==='Pragmatic'?"repeating-linear-gradient(45deg, rgb(64 33 163), transparent 100px)": "repeating-linear-gradient(45deg, #0d6efd, transparent 100px)",
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

// function FilterItem({ title, icon, link, icon_color, onClick }) {
//   return (
//     <div className="filter-item" data-v-72be8539="" onClick={onClick}>
//       {icon && <FontAwesomeIcon icon={icon} style={{ color: icon_color }} />}{" "}
//       {/* Check if there is an icon and render it */}
//       &nbsp;<Link className="casino-category-page-item" to={link}>{title}</Link>
//       {!icon && <i className="ico ico-chevron-right" data-v-72be8539=""></i>}
//     </div>
//   );
// }

const FilterItem = ({
  title,
  icon,
  link,
  icon_color,
  onClick,
  isActive,
  setActiveItem,
}) => {
  const handleItemClick = () => {
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
