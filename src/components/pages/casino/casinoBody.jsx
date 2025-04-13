import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { casinoGames } from "../../../redux/virtualsSlice";
import { useNavigate } from "react-router-dom";
import { getFromLocalStorage } from "../../utils/local-storage";
import CasinoSkeletonLoader from "./casino-skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import casinoBackground from "../../../assets/img/art-board.png";
import bgSection from "../../../assets/img/section-header.png";
import MobileMenu from "../../mobile-menu";

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

  const [hoveredGame, setHoveredGame] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState({});
  const toggleOverlay = (event, gameId) => {
    event.preventDefault(); // Prevent page scroll/jump
    setOverlayVisible((prev) => (prev === gameId ? null : gameId));
  };

  const handleGameClick = (event, gameId, isDemo, game_name) => {
    event.stopPropagation(); // Prevent event bubbling if needed
    console.log("Game ID:", gameId, "Demo Mode:", isDemo);

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

  // --- Scroll to Top Button Logic ---
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
<div className="container mt-1" style={{marginBottom:"60px"}}>
      {loading ? (
        <CasinoSkeletonLoader />
      ) : (
        <>
          <ImageCard imageSrc={casinoBackground} altText="Promo" />
          {(expandedSection
            ? sections.filter((section) => section.title === expandedSection)
            : filteredSections
          ).map((section, index) => {
            const isExpanded = expandedSection === section.title;
            const visibleGames =
              activeCategory !== "All" || isExpanded
                ? section.games
                : section.games.slice(
                    0,
                    section.title === "Others"
                      ? 8
                      : section.title === "Popular"
                      ? 3
                      : 6
                  );

            return (
              <div key={index} className="mb-2 casino-body">
                <div className="d-flex justify-content-between align-items-center bg-section-header py-0 position-relative">
                  
                  <LazyLoadImage
                    src={bgSection} // Assuming bgSection is the image URL
                    alt={""}
                    effect="blur"
                    className="section-header-image  "
                    
                  />
                  <a
                    href="#"
                    className="text-decoration-none text-light position-absolute   translate-middle z-4 title-header"
                  >
                    {section.title}
                  </a>

                  {/* More button */}
                  {activeCategory === "All" && section.games.length > 6 && (
                    <button
                      className="btn btn-sm btn-link text-light position-absolute   translate-middle z-4 more-button"
                      onClick={() => toggleSection(section.title)}
                    >
                      {isExpanded ? "Less" : "More"}
                    </button>
                  )}
                </div>

                <div
                  className={`row inter-font ${
                    section.title === "Others"
                      ? "row-cols-3 row-cols-md-4 row-cols-lg-4Z elongate"
                      : "row-cols-3"
                  } g-3 mt-1 text-light`}
                >
                  {visibleGames.map((game, gameIndex) => (
                    <div
                      key={gameIndex}
                      className="col casino-game-wrapper"
                      onClick={(event) => toggleOverlay(event, game.id)}
                      onMouseEnter={() => setHoveredGame(game.id)}
                      onMouseLeave={() => setHoveredGame(null)}
                    >
                      <a href={game.link} className="text-decoration-none">
                        <LazyLoadImage
                          src={game.image}
                          alt={game.title}
                          effect="blur"
                          title={game.title}
                          className="img-fluid rounded image-size-casino"
                        />
                      </a>
                      {(hoveredGame === game?.id ||
                        overlayVisible[game?.id]) && (
                        <div className="overlay-casino">
                          <button
                            className="overlay-btn"
                            onClick={(event) =>
                              handleGameClick(
                                event,
                                game.game_id,
                                false,
                                game.title
                              )
                            }
                          >
                            Play
                          </button>
                          <button
                            className="overlay-btn"
                            onClick={(event) =>
                              handleGameClick(
                                event,
                                game.game_id,
                                true,
                                game.title
                              )
                            }
                          >
                            Demo
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          ▲
        </button>
      )}

      {/* Scroll-to-top button CSS */}
      <style jsx>{`
        .scroll-to-top {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1001;
          background: rgba(0, 0, 0, 0.6);
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 50%;
          font-size: 18px;
          cursor: pointer;
          transition: opacity 0.3s ease-in-out;
        }
        .scroll-to-top:hover {
          background: rgba(0, 0, 0, 0.8);
        }
      `}</style>
    </div>
    <MobileMenu/>
    </div>
    
  );
};

export default CrashGames;

const ImageCard = ({ imageSrc, altText }) => {
  return (
    <div className="card image-card">
      <LazyLoadImage src={imageSrc} alt={altText} className="card-img-top" />
    </div>
  );
};
