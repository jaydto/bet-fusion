import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getFromLocalStorage } from "../../utils/local-storage";
import CasinoSkeletonLoader from "./casino-skeleton";

import useWindowDimensions from "../../header/Dimensions";
import GameSearchFilters from "./gameSearchFilters";
import PageHeader from "./pageHeader";
import GamesLibrary from "./gamesLibrary";
import NoGamesCard from "./NoGamesCard";
import { useEffect, useState } from "react";
import { setState } from "../../../redux/virtualsSlice";
import GameFilters from "./gameFilters";
import { filter } from "lodash";

const CasinoGames = ({ activeSetCategory }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromURL = searchParams.get("categoryId");

  const [activeCategory, setActiveCategory] = useState(activeSetCategory);
  const [activeTitle, setActiveTitle] = useState(activeSetCategory);

  console.log("activeCategory", activeCategory);

  const user = getFromLocalStorage("user");
  const dispatch = useDispatch();

  const casino_games = useSelector((state) => state.virtuals.casino_games_data);
  const loading = useSelector((state) => state.virtuals.loading);
  const casino_types = useSelector(
    (state) => state.virtuals.casino_games_types
  );

  useEffect(() => {
    if (categoryFromURL) {
      setActiveCategory(categoryFromURL);
    }
  }, [categoryFromURL]);

  const defaultImages = [
    "https://cdn.betika.com/int_assets/crash-games/tradeblazer/tradeblazer_1000x1334.jpg",
    "https://cdn.betika.com/int_assets/crash-games/BURUKA/1000x1334.jpg",
    "https://cdn.betika.com/int_assets/crash_games/CrashClassic-1000x1334.jpg",
    "https://cdn.betika.com/int_assets/cd/Spaceman-BBCrashPragmatic/Spaceman/PNG/1000x1334.png",
    "https://cdn.betika.com/int_assets/crash-games/Crash-Royale/1000x1334.jpg",
  ];

  const categorizedGames = {};

  const allowedCategory = 'crash'

  // if (Array.isArray(casino_types)) {
  //   casino_types.forEach((type) => {
  //     categorizedGames[type.game_type_description] = [];
  //   });
  //   categorizedGames["Casino"] = [];

  //   if (Array.isArray(casino_games)) {
  //     casino_games.forEach((game) => {
  //       if (game.categories && game.categories.length > 0) {
  //         game.categories.forEach((category) => {
  //           const typeDescription = casino_types.find(
  //             (t) => t.game_type_id === category.game_type_id
  //           )?.game_type_description;
  //           if (typeDescription) {
  //             categorizedGames[typeDescription].push({
  //               id: game.id,
  //               game_id: game.game_id,
  //               title: game.game_name,
  //               image:
  //                 game.image_url ||
  //                 game.display_image_url ||
  //                 defaultImages[game.id % defaultImages.length],
  //               link: game.demo_launch_url || "#",
  //             });
  //           }
  //         });
  //       } else {
  //         categorizedGames["Casino"].push({
  //           id: game.id,
  //           game_id: game.game_id,
  //           title: game.game_name,
  //           image:
  //             game.image_url ||
  //             game.display_image_url ||
  //             defaultImages[game.id % defaultImages.length],
  //           link: game.demo_launch_url || "#",
  //         });
  //       }
  //     });
  //   }
  // }

  if (Array.isArray(casino_types)) {

    casino_types.forEach((type) => {
      const typeDesc = type.game_type_description?.toLowerCase() || "";
      if (typeDesc.includes(allowedCategory)) {
        categorizedGames[type.game_type_description] = [];
      }
    });

    if (Array.isArray(casino_games)) {
      casino_games.forEach((game) => {
        if (game.categories && game.categories.length > 0) {
          game.categories.forEach((category) => {
            const typeMatch = casino_types.find(
              (t) => t.game_type_id === category.game_type_id
            );
            
            const typeDescription = typeMatch?.game_type_description;
            const lowerDescription = typeDescription?.toLowerCase() || "";

            // 2. Only add games if the category name contains "crash"
            if (typeDescription && lowerDescription.includes(allowedCategory)) {
              if (!categorizedGames[typeDescription]) {
                categorizedGames[typeDescription] = [];
              }
              
              categorizedGames[typeDescription].push({
                id: game.id,
                game_id: game.game_id,
                title: game.game_name,
                image:
                  game.image_url ||
                  game.display_image_url ||
                  defaultImages[game.id % defaultImages.length],
                link: game.demo_launch_url || "#",
              });
            }
          });
        }
      });
    }
  }


  const sections = Object.keys(categorizedGames).map((key) => ({
    title: key,
    games: categorizedGames[key],
  }));

  const filteredSections =
    activeCategory !== "Lobby"
      ? sections.filter(
          (section) =>
            section.title?.toLowerCase() === activeCategory?.toLowerCase()
        )
      : sections;

  const navigate = useNavigate();

  const handleGameClick = (event, gameId, isDemo, game_name) => {
    event.stopPropagation();
    user?.profile_id
      ? navigate(
          `/play/game-play?game=${gameId}&status=${
            isDemo ? "1" : "0"
          }&game_name=${game_name}`
        )
      : navigate("/auth/login");
  };

  const onSearch = (searchTerm) => {
    console.log("Search:", searchTerm);
    dispatch(setState("casino_search_modal", true));
  };

  const onFilterChange = (game_id, title) => {
    // Clear the search params
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("categoryId");

    // Optionally, preserve other params you want to keep
    setSearchParams(newParams);

    // Update local state
    setActiveCategory(game_id);
    setActiveTitle(title);

    console.log("Filter changed to:", title);
  };

  console.log("activeCategory", activeCategory);
  console.log("filteredSections", filteredSections);
  console.log(
    "filteredSections data",
    filteredSections.map((section) => section.games).flat().length
  );

  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      <div className=" mt-1 body-section">
        {/* <PageHeader
          title={activeCategory === "Lobby" ? "Casino Lobby" : activeTitle}
          description="Explore and play your favorite casino games"
        /> */}
        <div className="mt-4">
          <GameSearchFilters onSearch={onSearch} />
        </div>
        <div className="mt-2">
          <GameFilters
            activeCategory={activeCategory}
            onFilterChange={onFilterChange}
          />
        </div>

        <div className="mt-1 body-section">
          {loading ? (
            <CasinoSkeletonLoader />
          ) : filteredSections.length === 0 ||
            filteredSections.map((section) => section.games).flat().length ===
              0 ? (
            <NoGamesCard />
          ) : (
            filteredSections.map((section, index) => (
              <GamesLibrary
                key={index}
                title={section.title}
                games={section.games}
                categoryId={activeCategory}
                onViewLobby={() => {}}
                handleGameClick={handleGameClick}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CasinoGames;
