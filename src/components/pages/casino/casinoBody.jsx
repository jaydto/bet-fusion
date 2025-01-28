import React from "react";

const CrashGames = () => {
  const sections = [
    {
      title: "Flying High",
      link: "/en-ke/crash-games/all",
      games: [
        {
          title: "Aviator",
          link: "/en-ke/crash-games/spribe_aviator",
          image: "https://cdn.betika.com/int_assets/crash-games/aviator-banner-910x367.png",
        },
        {
          title: "Aviatrix",
          link: "/en-ke/crash-games/1",
          image: "https://cdn.betika.com/int_assets/crash-games/aviatrix/2000x456.jpg",
        },
        {
          title: "Comet Crash",
          link: "/en-ke/crash-games/stp_crash_crashx_comet",
          image: "https://cdn.betika.com/int_assets/crash-games/Commet-Crash/910x367.jpg",
        },
      ],
    },
    {
      title: "Popular",
      link: "/en-ke/crash-games/all",
      games: [
        {
          title: "JetX",
          link: "/en-ke/crash-games/smartsoft_1",
          image: "https://cdn.betika.com/int_assets/crash-games/JetXSmartsoft/1308x780.jpg",
        },
        {
          title: "Flying High",
          link: "/en-ke/crash-games/2201",
          image: "https://cdn.betika.com/int_assets/crash-games/High-Flyer/1308x780.jpg",
        },
        {
          title: "Big Bass Crash",
          link: "/en-ke/crash-games/1320",
          image: "https://cdn.betika.com/int_assets/cd/Spaceman-BBCrashPragmatic/Big-Bass-Crash/PNG/1308x780.png",
        },
      ],
    },
    {
      title: "Just Landed",
      link: "/en-ke/crash-games/all",
      games: [
        {
          title: "RollX",
          link: "/en-ke/crash-games/smartsoft_5",
          image: "https://cdn.betika.com/int_assets/crash-games/roll-x/1000x1334_Roll_X.png",
        },
        {
          title: "Crash Classic Lite",
          link: "/en-ke/crash-games/1008",
          image: "https://cdn.betika.com/int_assets/crash_games/CrashClassic-1000x1334.jpg",
        },
        {
          title: "B!",
          link: "/en-ke/crash-games/stp_boom_crashx_superstar",
          image: "https://cdn.betika.com/int_assets/cd/BB-Crash/1000x1334.jpg",
        },
        {
          title: "Crash Royale",
          link: "/en-ke/crash-games/imoon_1001",
          image: "https://cdn.betika.com/int_assets/crash-games/Crash-Royale/1000x1334.jpg",
        },
        {
          title: "Buruka",
          link: "/en-ke/crash-games/imoon_102",
          image: "https://cdn.betika.com/int_assets/crash-games/BURUKA/1000x1334.jpg",
        },
        {
          title: "Spaceman",
          link: "/en-ke/crash-games/1301",
          image: "https://cdn.betika.com/int_assets/cd/Spaceman-BBCrashPragmatic/Spaceman/PNG/1000x1334.png",
        },
      ],
    },
  ];

  return (
    <div className="container mt-1">
      {sections.map((section, index) => (
        <div key={index} className="mb-4">
          <div className="d-flex justify-content-between align-items-center bg-dark py-2 px-3">
            {/* <h5 className="mb-0">{section.title}</h5> */}
            <a href={section.link} className="text-decoration-none text-light">
            {section.title}
              <i className="ms-1 bi bi-arrow-right"></i>
            </a>
          </div>
          <div
            className={`row ${
              section.title === "Just Landed" ? "row-cols-4" : "row-cols-2"
            } g-3 mt-1 text-light`}
          >
            {section.games.map((game, gameIndex) => (
              (gameIndex==0 && section.title)=="Flying High"?<div key={gameIndex} className="col-12">
              <a href={game.link} className="text-decoration-none">
                <img
                  src={game.image}
                  alt={game.title}
                  title={game.title}
                  className="img-fluid rounded"
                />
              </a>
            </div>
              :<div key={gameIndex} className="col">
              <a href={game.link} className="text-decoration-none">
                <img
                  src={game.image}
                  alt={game.title}
                  style={{minHeight:"75px"}}

                  title={game.title}
                  className="img-fluid rounded"
                />
              </a>
            </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CrashGames;
