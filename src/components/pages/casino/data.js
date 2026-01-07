import {
  CrownOutlined,
  DollarOutlined,
  FireOutlined,
  RocketOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

import aviatrix from "../../../assets/img/mobile/aviatrix.png";

// data.js
export const data = {
  baseCategories: [
    {
      cat_id: "Lobby",
      label: "Lobby",
      icon: null,
      bg: "rgb(245, 255, 235)",
      color: "#3c9f18",
    },
    {
      cat_id: "crash",
      label: "Crash",
      icon: <RocketOutlined />,
      bg: "rgb(235, 255, 253)",
      color: "#00a7a7",
    },
    {
      cat_id: "casino",
      label: "Casino",
      icon: null,
      color: "rgb(133 182 33", // Teal-like color
      bg: "rgb(255, 247, 235)", // Light peach background
    },
    {
      cat_id: "popular",
      label: "Popular",
      icon: <FireOutlined />,
      bg: "rgb(253, 244, 255)",
      color: "#d10ae2",
    },
    {
      cat_id: "drops_n_wins",
      label: "Drops and Wins",
      icon: <DollarOutlined />,
      bg: "rgb(255, 250, 235)",
      color: "#f7931e",
    },
    {
      cat_id: "slots",
      label: "Slots",
      icon: <CrownOutlined />,
      bg: "rgb(235, 241, 255)",
      color: "#2d7ff9",
    },
    {
      cat_id: "hot",
      label: "Hot",
      icon: <ThunderboltOutlined />,
      bg: "rgb(245, 241, 255)",
      color: "#7b38f6",
    },

    {
      cat_id: "live_roulette",
      label: "Live Roulette",
      icon: null,
      bg: "rgb(255, 245, 245)",
      color: "#d13438",
    },
    {
      cat_id: "live_blackjack",
      label: "Live Blackjack",
      icon: null,
      bg: "rgb(245, 245, 255)",
      color: "#605dec",
    },
    {
      cat_id: "live_games",
      label: "Live Games",
      icon: null,
      bg: "rgb(255, 250, 240)",
      color: "#fa6400",
    },
    {
      cat_id: "New",
      label: "New Games",
      icon: null,
      bg: "rgb(240, 255, 250)",
      color: "#00b386",
    },
  ],

  categories: [
    {
      name: "Football",
      url: "/sports",
      bg: "rgb(253, 244, 255)", 
      color: "#d10ae2", 
    },
    {
      name: "Aviator",
      url: "/play/game-play?game=58630&status=0&game_name=AVIATOR",
      bg: "rgb(235, 241, 255)", 
      color: "#2d7ff9", 
    },
    // {
    //   name: "Crash",
    //   url: "/play?categoryId=crash",
    //   bg: "rgb(255, 250, 235)", 
    //   color: "#f7931e", 
    // },
    {
      name: "Crash",
      url: "/play",
      bg: "rgb(245, 255, 235)", 
      color: "#3c9f18", 
    },
    // {
    //   name: "Virtual",
    //   url: "/play?categoryId=virtual",
    //   bg: "rgb(245, 241, 255)", 
    //   color: "#7b38f6", 
    // },
    // {
    //   name: "Aviatrix",
    //   url: "/game-play?game=aviator&game_id=43857&status=0",
    //   bg: "rgb(235, 255, 253)", // minty teal background
    //   color: "#00a7a7", // teal text/icon
    // },
  ],
  games: [
    {
      name: "Aviator",
      game_id: "58630",
      url: "/play/game-play?game=58630&status=0&game_name=AVIATOR",
      game_name: "AVIATOR",
      image_url: "https://cdn.betfusion.com/BETFUSION AVIATOR.webp",
    },
    // {
    //   name: "Football",
    //   game_id: "football",
    //   url: "#",
    //   image_url:
    //     "https://pepeta.com/static/media/sports-book.e6e49e341d3aa81c46c9.avif",
    // },
    {
      name: "Aviatrix",
      game_id: "58046",
      game_name: "Aviatrix",
      url: "/play/game-play?game=58046&status=0&game_name=Aviatrix",
      image_url: "https://cdn.betfusion.com/BETFUSION AVIATRIX.webp",
      // "https://atom-cdn.azureedge.net/storage/728ace29-10a0-4c08-a508-0b619fc94889_file",
    },
    {
      name: "JetX",
      game_id: "58059",
      game_name: "JetX",
      url: "/play/game-play?game=58059&status=0&game_name=JetX",
      image_url: "https://cdn.betfusion.com/BETFUSION JET X.webp",
    },
    // {
    //   name: "Crash",
    //   game_id: "crash",
    //   url: "/play",
    //   image_url: "https://cdn.betfusion.com/BETFUSION CASINO.webp",
    // },
  ],
  numbers: [
    {
      name: "Lucky Numbers",
      game_id: "lucky_numbers",
      url: "#",
      image_url:
        "https://pepeta.com/static/media/lucky-numbers.40d364b65f5877eda1a0.avif",
    },
    {
      name: "Spin and win ",
      game_id: "spin win ",
      url: "#",
      image_url:
        "https://pepeta.com/static/media/gr-spin-2-win.45277213ee6e5d36a283.avif",
    },
    {
      name: "Keno",
      game_id: "keno",
      url: "#",
      image_url:
        "https://pepeta.com/static/media/gr-keno.cbb796643fb55d6ad391.avif",
    },
    {
      name: "Keno Classic",
      game_id: "keno classic",
      url: "#",
      image_url:
        "	https://pepeta.com/static/media/gr-keno-deluxe.a03621b26302a522dc4c.avif",
    },
  ],

  must_play: [
    {
      name: "Casino Thrills",
      game_id: "casino_thrills",
      url: "#",
      image_url:
        "	https://pepeta.com/static/media/Cassion-Thrills-Large.0dbaf751cdbd1c45cf85.avif",
    },
    {
      name: "Triple Wheel",
      game_id: "triple_wheel",
      url: "#",
      image_url:
        "	https://pepeta.com/static/media/Triple-wheel-Large.718997218b36da5b3b37.avif",
    },
  ],
};

export const helpMessage = {
  winners: [
    "Douglas Ronia won Ksh1200!",
    "Jane Wambui won Ksh500!",
    "Kevin Omondi won Ksh2000!",
  ],
  promos: ["Spin the wheel and win free coins!", "New slots added today!"],
};
