import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import crashGamesImg from "../../assets/img/mobile/crash-games.png";
import { Link, useNavigate } from "react-router-dom";
import KironCompetitions from "../pages/Kiron/competitions/KironCompetitions";
import { setState as setVirtualGame } from "../../redux/virtualsSlice";
const SideCasinoMenu = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCollapsed, setIsCollapsed] = useState({
    slots: true,
    virtualLeague: true,
  });
  const navigate = useNavigate();
  // const casino_games = useSelector((state) => state.virtuals.casino_games);
  // const casino_search = useSelector((state) => state.virtuals.casino_search);
  const smartsoft_categories = useSelector(
    (state) => state.virtuals.smartsoft_categories
  );
  const dispatch = useDispatch();
  const [activeProvider, setActiveProvider] = useState(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleCollapse = (section) => {
    setIsCollapsed((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const resetSearch = () => {
    dispatch(setVirtualGame("casino_search", []));
    setActiveProvider(null);
    navigate("/casino");
  };

  const handleCategoryClick = (category, provider = "smartSoft") => {
    setActiveProvider(category);

    return navigate(`/casino/${provider}/${category}`);

  };

  // Determine if the current URL matches `/casino`
  useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    if (pathParts[1] === "casino" && pathParts[3]) {
      setActiveProvider(pathParts[3]);
    } else {
      setActiveProvider(null); // Reset active category if not on casino
    }
  }, [window.location.pathname]);

  return (
    <ul className="sideCasinoMenu">
      {/* <li className="search">
        <span className="twitter-typeahead" style={{ position: 'relative', display: 'inline-block' }}>
          <input
            type="text"
            className="neon tt-hint"
            readOnly
            autoComplete="off"
            spellCheck="false"
            tabIndex="-1"
            dir="ltr"
            style={{
              position: 'absolute',
              top: '0px',
              left: '0px',
              borderColor: 'transparent',
              boxShadow: 'none',
              opacity: '1',
              background: 'none 0% 0% / auto repeat scroll padding-box border-box rgb(186, 193, 207)'
            }}
          />
          <input
            type="text"
            placeholder="Search"
            id="aCGames"
            className="neon tt-input"
            autoComplete="off"
            spellCheck="false"
            dir="auto"
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ position: 'relative', verticalAlign: 'top', backgroundColor: 'transparent' }}
          />
        </span>
      </li> */}

      <li className="category subCat" data-category="crash-games">
        <Link
          to="/smart-play?game=JetX&category=JetX&status=live"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>JetX</span>
          <img
            style={{ width: "30px" }}
            src={crashGamesImg}
            alt="crash-games"
          />
        </Link>
      </li>

      {/* <li className="category subCat" data-category="newest">
        <Link to="/en/casino/newest/">Newest</a>
      </li> */}

      <li className="category subCat active" data-category="slots">
        <div className="category-options">
          <span>Providers</span>
        </div>
        <div className="counter">2</div>
        <div className="category-item providerFilt">
          <div
            provider-list="VirtualLeague"
            className="provider"
            onClick={() => toggleCollapse("virtualLeague")}
            style={{ cursor: "pointer" }}
          >
            <label>
              <span>Virtual League</span>

              <input
                type="checkbox"
                filter-value="SmartSoft"
                className="providerbox"
              />
              <div className="checkboxx"></div>
            </label>
          </div>
        </div>
        {isCollapsed["virtualLeague"] && <KironCompetitions sideLobby={true} />}
        <div className="category-item providerFilt">
          <div
            provider-list="SmartSoft"
            className="provider"
            onClick={() => toggleCollapse("slots")}
            style={{ cursor: "pointer" }}
          >
            <label>
              <span>SmartSoft</span>{" "}
              <div className="category-item counter">
                {smartsoft_categories?.length}
              </div>
              <input
                type="checkbox"
                filter-value="SmartSoft"
                className="providerbox"
              />
              <div className="checkboxx"></div>
            </label>
          </div>
        </div>
        {isCollapsed["slots"] && (
          <div
            className="items providerFilt"
            style={{ textTransform: "capitalize" }}
          >
            <div
              onClick={resetSearch}
              className={!activeProvider ? " text-light" : ""}
            >
              <label>
                <span style={{ textTransform: "capitalize" }}>All</span>
                <div className="checkboxx"></div>
              </label>
            </div>
            {smartsoft_categories?.map((value) => (
              <div
                style={{ textTransform: "capitalize" }}
                key={value.default_description}
                provider-list={value.default_description}
                className={
                  activeProvider === value.default_description
                    ? " text-light"
                    : ""
                }
                // onClick={() => filterData(value.default_description)}
                onClick={() => {
                  handleCategoryClick(value.default_description, "smartSoft");
                }}
              >
                <label>
                  <span style={{ textTransform: "capitalize" }}>
                    {value.default_description}
                  </span>
                  <input
                    type="checkbox"
                    filter-value={value.default_description}
                    className="providerbox"
                  />
                  <div className="checkboxx"></div>
                </label>
              </div>
            ))}
          </div>
        )}
      </li>

      {/* <li className="category subCat" data-category="recommended">
        <a href="/en/casino/recommended/">Recommended</a>
      </li>
      <li className="category subCat" data-category="instant-game">
        <a href="/en/casino/instant-game/">Instant Games</a>
      </li> */}
    </ul>
  );
};

export default SideCasinoMenu;
