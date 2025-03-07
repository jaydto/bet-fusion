// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { casinoList } from "../../../redux/virtualsSlice";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { casinoGames, casinoList } from "../../../redux/virtualsSlice";
import { useNavigate } from "react-router-dom";
import { getFromLocalStorage } from "../../utils/local-storage";

// const CrashGames = () => {
//   const sections = [
//     {
//       title: "Flying High",
//       link: "#all",
//       games: [
//         {
//           title: "Aviator",
//           link: "#spribe_aviator",
//           image: "https://cdn.betika.com/int_assets/crash-games/aviator-banner-910x367.png",
//         },
//         {
//           title: "Aviatrix",
//           link: "#1",
//           image: "https://cdn.betika.com/int_assets/crash-games/aviatrix/2000x456.jpg",
//         },
//         {
//           title: "Comet Crash",
//           link: "#stp_crash_crashx_comet",
//           image: "https://cdn.betika.com/int_assets/crash-games/Commet-Crash/910x367.jpg",
//         },
//       ],
//     },
//     {
//       title: "Popular",
//       link: "#all",
//       games: [
//         {
//           title: "JetX",
//           link: "#smartsoft_1",
//           image: "https://cdn.betika.com/int_assets/crash-games/JetXSmartsoft/1308x780.jpg",
//         },
//         {
//           title: "Flying High",
//           link: "#2201",
//           image: "https://cdn.betika.com/int_assets/crash-games/High-Flyer/1308x780.jpg",
//         },
//         {
//           title: "Big Bass Crash",
//           link: "#1320",
//           image: "https://cdn.betika.com/int_assets/cd/Spaceman-BBCrashPragmatic/Big-Bass-Crash/PNG/1308x780.png",
//         },
//       ],
//     },
//     {
//       title: "Just Landed",
//       link: "#all",
//       games: [
//         {
//           title: "Tradeblazer",
//           link: "#tradeblazer",
//           image: "https://cdn.betika.com/int_assets/crash-games/tradeblazer/tradeblazer_1000x1334.jpg",
//         },
//         {
//           title: "Crash Classic Lite",
//           link: "#1008",
//           image: "https://cdn.betika.com/int_assets/crash_games/CrashClassic-1000x1334.jpg",
//         },
//         {
//           title: "Cashow!",
//           link: "#stp_crashx_superstar",
//           image: "https://cdn.betika.com/int_assets/crash-games/Cashshow/1000x1334.png",
//         },
//         {
//           title: "Crash Royale",
//           link: "#imoon_1001",
//           image: "https://cdn.betika.com/int_assets/crash-games/Crash-Royale/1000x1334.jpg",
//         },
//         {
//           title: "Buruka",
//           link: "#imoon_102",
//           image: "https://cdn.betika.com/int_assets/crash-games/BURUKA/1000x1334.jpg",
//         },
//         {
//           title: "Spaceman",
//           link: "#1301",
//           image: "https://cdn.betika.com/int_assets/cd/Spaceman-BBCrashPragmatic/Spaceman/PNG/1000x1334.png",
//         },
//       ],
//     },
//   ];

//   const dispatch = useDispatch();

//   const casino_games = useSelector((state) => state.virtuals.casino_games_data);
//   const casino_types = useSelector(
//     (state) => state.virtuals.casino_games_types
//   );
//   const casino_providers = useSelector(
//     (state) => state.virtuals.casino_games_providers
//   );

//   const fetchGames = async () => {
//     let endpoint = "/v1/casino-game-listing";
//     let method = "GET";
//     const data = { endpoint, method };
//     dispatch(casinoList(data));
//   };
//   // Initial fetch on component mount
//   useEffect(() => {
//     if (casino_games.length === 0) {
//       fetchGames();
//     }
//   }, [casino_games.length]);

//   return (
//     <div className="container mt-1">
//       {sections.map((section, index) => (
//         <div key={index} className="mb-4">
//           <div className="d-flex justify-content-between align-items-center bg-section-header py-2 px-3">
//             {/* <h5 className="mb-0">{section.title}</h5> */}
//             <a href={section.link} className="text-decoration-none text-light">
//             {section.title}
//               <i className="ms-1 bi bi-arrow-right"></i>
//             </a>
//           </div>
//           <div
//             className={`row inter-font ${
//               section.title === "Just Landed" ? "row-cols-4" : "row-cols-2"
//             } g-3 mt-1 text-light`}
//           >
//             {section.games.map((game, gameIndex) => (
//               (gameIndex==0 && section.title)=="Flying High"?<div key={gameIndex} className="col-12 d-flex justify-content-center">
//               <a href={game.link} className="text-decoration-none">
//                 <img
//                   src={game.image}
//                   alt={game.title}
//                   title={game.title}
//                   className="img-fluid rounded"
//                 />
//               </a>
//             </div>
//               :<div key={gameIndex} className="col">
//               <a href={game.link} className="text-decoration-none">
//                 <img
//                   src={game.image}
//                   alt={game.title}
//                   title={game.title}
//                   className="img-fluid rounded image-size-casino"
//                 />
//               </a>
//             </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CrashGames;

const CrashGames = () => {
  const dispatch = useDispatch();
  const user = getFromLocalStorage("user"); // Always get the user from local storage

  const casino_games = useSelector((state) => state.virtuals.casino_games_data);
  const casino_types = useSelector(
    (state) => state.virtuals.casino_games_types
  );
  const casino_providers = useSelector(
    (state) => state.virtuals.casino_games_providers
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

  // **Mapping Casino Games to Types**
  const categorizedGames = {};

  // Step 1: Create categories from casino_types
  casino_types.forEach((type) => {
    categorizedGames[type.game_type_description] = [];
  });

  // Step 2: Add "Others" category
  categorizedGames["Others"] = [];

  const defaultImages = [
    "https://cdn.betika.com/int_assets/crash-games/tradeblazer/tradeblazer_1000x1334.jpg",
    "https://cdn.betika.com/int_assets/crash-games/BURUKA/1000x1334.jpg",
    "https://cdn.betika.com/int_assets/crash_games/CrashClassic-1000x1334.jpg",
    "https://cdn.betika.com/int_assets/cd/Spaceman-BBCrashPragmatic/Spaceman/PNG/1000x1334.png",
    "https://cdn.betika.com/int_assets/crash-games/Crash-Royale/1000x1334.jpg",
  ];

  const defaultSection1 = [
    "https://cdn.betika.com/int_assets/crash-games/aviatrix/2000x456.jpg",
    "https://cdn.betika.com/int_assets/crash-games/JetXSmartsoft/1308x780.jpg",
    "https://cdn.betika.com/int_assets/crash-games/High-Flyer/1308x780.jpg",
    "https://cdn.betika.com/int_assets/cd/Spaceman-BBCrashPragmatic/Big-Bass-Crash/PNG/1308x780.png",
    "https://cdn.betika.com/int_assets/crash-games/aviator-banner-910x367.png",
    "https://cdn.betika.com/int_assets/crash-games/Commet-Crash/910x367.jpg",
  ];

  // Step 3: Assign each game to the correct category
  casino_games.forEach((game) => {
    if (game.categories && game.categories.length > 0) {
      game.categories.forEach((category) => {
        const typeDescription = casino_types.find(
          (t) => t.game_type_id === category.game_type_id
        )?.game_type_description;
        if (typeDescription) {
          categorizedGames[typeDescription].push({
            id: game.id,
            title: game.game_name,
            image:
              game.image_url ||
              game.display_image_url ||
              defaultSection1[game.id % defaultSection1.length], // Cycles through the three images
            link: game.demo_launch_url || "#",
          });
        }
      });
    } else {
      // Step 4: Assign games without categories to "Others"
      categorizedGames["Others"].push({
        id: game.id,
        title: game.game_name,
        image:
          game.image_url ||
          game.display_image_url ||
          defaultImages[game.id % defaultImages.length], // Cycles through the three images
        link: game.demo_launch_url || "#",
      });
    }
  });

  // Step 5: Convert the categorized games into sections
  const sections = Object.keys(categorizedGames).map((key) => ({
    title: key,
    games: categorizedGames[key],
  }));

  const [hoveredGame, setHoveredGame] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState({});

  // const toggleOverlay = (gameId) => {
  //   setOverlayVisible((prev) => ({
  //     ...prev,
  //     [gameId]: !prev[gameId], // Toggle overlay visibility on click
  //   }));
  // };

  const toggleOverlay = (event, gameId) => {
    event.preventDefault(); // Prevent page scroll/jump
    setOverlayVisible((prev) => (prev === gameId ? null : gameId));
  };
  

  const navigate = useNavigate();

  const handleGameClick = (event, gameId, isDemo) => {
    event.stopPropagation(); // Prevent event bubbling if needed
    console.log("Game ID:", gameId, "Demo Mode:", isDemo);

    user?.profile_id
      ? navigate(`/game-play?game=${gameId}&status=${isDemo ? "1" : "0"}`)
      : navigate("/login");
  };

  return (
    <div className="container mt-1">
      {sections.map((section, index) => (
        <div key={index} className="mb-4">
          <div className="d-flex justify-content-between align-items-center bg-section-header py-2 px-3">
            <a href="#" className="text-decoration-none text-light">
              {section.title}
              <i className="ms-1 bi bi-arrow-right"></i>
            </a>
          </div>
          <div
            className={`row inter-font ${
              section.title === "Others" ? "row-cols-4" : "row-cols-2"
            } g-3 mt-1 text-light`}
          >
            {section.games.map((game, gameIndex) =>
              gameIndex === 0 && section.title === "Lottery" ? (
                <div
                  key={gameIndex}
                  className="col-12 d-flex justify-content-center casino-game-wrapper"
                  onClick={(event) => toggleOverlay(event, game.id)}
                  onMouseEnter={() => setHoveredGame(game.id)}
                  onMouseLeave={() => setHoveredGame(null)}
                >
                  <a href={game.link} className="text-decoration-none">
                    <img
                      src={game.image}
                      alt={game.title}
                      title={game.title}
                      className="img-fluid rounded"
                    />
                  </a>
                  {(hoveredGame === game.id || overlayVisible[game.id]) && (
                    <div className="overlay">
                      <button
                        className="overlay-btn"
                        onClick={(event) =>
                          handleGameClick(event, game.id, false)
                        }
                      >
                        Play
                      </button>
                      <button
                        className="overlay-btn"
                        onClick={(event) =>
                          handleGameClick(event, game.id, true)
                        }
                      >
                        Demo
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  key={gameIndex}
                  className="col casino-game-wrapper"
                  onClick={(event) => toggleOverlay(event, game.id)}
                  onMouseEnter={() => setHoveredGame(game.id)}
                  onMouseLeave={() => setHoveredGame(null)}
                >
                  <a href={game.link} className="text-decoration-none">
                    <img
                      src={game.image}
                      alt={game.title}
                      title={game.title}
                      className="img-fluid rounded image-size-casino"
                    />
                  </a>
                  {(hoveredGame === game.id || overlayVisible[game.id]) && (
                    <div className="overlay">
                      <button
                        className="overlay-btn"
                        onClick={(event) =>
                          handleGameClick(event, game.id, false)
                        }
                      >
                        Play
                      </button>
                      <button
                        className="overlay-btn"
                        onClick={(event) =>
                          handleGameClick(event, game.id, true)
                        }
                      >
                        Demo
                      </button>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CrashGames;
