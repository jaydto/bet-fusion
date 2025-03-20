import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { casinoGames } from "../../../redux/virtualsSlice";
import { useNavigate } from "react-router-dom";
import { getFromLocalStorage } from "../../utils/local-storage";
import CasinoSkeletonLoader from "./casino-skeleton";

const CrashGames = ({ activeCategory }) => {
  const dispatch = useDispatch();
  const user = getFromLocalStorage("user");

  const casino_games = useSelector((state) => state.virtuals.casino_games_data);
  const loading = useSelector((state) => state.virtuals.loading);
  const casino_types = useSelector(
    (state) => state.virtuals.casino_games_types
  );

  const fetchGames = async () => {
    let endpoint = "/v1/casino-game-listing";
    let method = "GET";
    const data = { endpoint, method };
    dispatch(casinoGames(data));
  };

  useEffect(() => {
    if (casino_games.length === 0) {
      fetchGames();
    }
  }, [casino_games.length]);

  // Categorizing games
  const categorizedGames = {};
  casino_types.forEach((type) => {
    categorizedGames[type.game_type_description] = [];
  });
  categorizedGames["Others"] = [];

  const defaultImages = [
    "https://cdn.betika.com/int_assets/crash-games/tradeblazer/tradeblazer_1000x1334.jpg",
    "https://cdn.betika.com/int_assets/crash-games/BURUKA/1000x1334.jpg",
    "https://cdn.betika.com/int_assets/crash_games/CrashClassic-1000x1334.jpg",
    "https://cdn.betika.com/int_assets/cd/Spaceman-BBCrashPragmatic/Spaceman/PNG/1000x1334.png",
    "https://cdn.betika.com/int_assets/crash-games/Crash-Royale/1000x1334.jpg",
  ];

  casino_games.forEach((game) => {
    if (game.categories && game.categories.length > 0) {
      game.categories.forEach((category) => {
        const typeDescription = casino_types.find(
          (t) => t.game_type_id === category.game_type_id
        )?.game_type_description;
        if (typeDescription) {
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
    } else {
      categorizedGames["Others"].push({
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

  const sections = Object.keys(categorizedGames).map((key) => ({
    title: key,
    games: categorizedGames[key],
  }));

  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (title) => {
    setExpandedSection(expandedSection === title ? null : title);
  };

  const filteredSections =
    activeCategory !== "All"
      ? sections.filter((section) => section.title === activeCategory)
      : sections;

  const navigate = useNavigate();

  const handleGameClick = (event, gameId, isDemo, game_name) => {
    event.stopPropagation();
    user?.profile_id
      ? navigate(
          `/game-play?game=${gameId}&status=${
            isDemo ? "1" : "0"
          }&game_name=${game_name}`
        )
      : navigate("/login");
  };

  useEffect(() => {
    setExpandedSection(null); // Reset expanded section when active category changes
  }, [activeCategory]);

  return (
    <div className="container mt-1">
      {loading ? (
        <CasinoSkeletonLoader />
      ) : (
        (expandedSection
          ? sections.filter((section) => section.title === expandedSection)
          : filteredSections
        ).map((section, index) => {
          const isExpanded = expandedSection === section.title;
          const visibleGames =
            activeCategory !== "All" || isExpanded
              ? section.games
              : section.games.slice(0, 6);

          return (
            <div key={index} className="mb-4">
              <div className="d-flex justify-content-between align-items-center bg-section-header py-2 px-3">
                <a href="#" className="text-decoration-none text-light">
                  {section.title}
                </a>
                {section.games.length > 6 && (
                  <button
                    className="btn btn-sm btn-link text-light"
                    onClick={() => toggleSection(section.title)}
                  >
                    {isExpanded ? "Less" : "More"}
                  </button>
                )}
              </div>

              <div
                className={`row inter-font ${
                  section.title === "Others" ? "row-cols-4" : "row-cols-3"
                } g-3 mt-1 text-light`}
              >
                {visibleGames.map((game, gameIndex) => (
                  <div
                    key={gameIndex}
                    className="col casino-game-wrapper"
                    onClick={(event) =>
                      handleGameClick(event, game.game_id, false, game.title)
                    }
                  >
                    <a href={game.link} className="text-decoration-none">
                      <img
                        src={game.image}
                        alt={game.title}
                        title={game.title}
                        className="img-fluid rounded image-size-casino"
                      />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CrashGames;
