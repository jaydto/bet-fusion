import React, { useEffect, useState } from "react";
import "./test.css";
import "../assets/css/bottomSheet.css";
import { Link, useLocation } from "react-router-dom";
import { addToSlip, getBetslip } from "./utils/betslip";
import MatchList, { MatchHeaderRow } from "./matches";
import SkeletonLoaderMobile from "./pages/skeletonLoadersWeb/SkeletonLoaderMobile";
import Countries from "./countries/Countries";
import { getFromLocalStorage } from "./utils/local-storage";
import { useDispatch, useSelector } from "react-redux";
import {
  matchesPrematch,
  resetState,
  setFetching,
  setInitialLoadingState,
  setLimit,
  startFetchingMatches,
  stopFetchingMatches,
} from "../redux/matchesSlice";
import { removePickedData,setMatchBetslip, setPickedData, setSelected } from "../redux/bettingSlice";

import SkeletonLoaderMore from "./pages/skeletonLoadersWeb/SkeletonLoaderMore";
import Notify from "./utils/Notify";

const Index = React.memo((props) => {
  const { tab } = props;
  const location = useLocation();
  const [threeWay, setThreeWay] = useState(false);
  const [page] = useState(1);
  const dispatchRedux = useDispatch();
  const newMatches = useSelector((state) => state.matchesData.matches);
  // const prev_match_size=useSelector((state)=>state.matchesData.prev_match_size)
  const match_size = useSelector((state) => state.matchesData.match_size);
  const producer_down = useSelector((state) => state.matchesData.producer_down);
  const loading = useSelector((state) => state.matchesData.loading);
  const fetching = useSelector((state) => state.matchesData.fetching);
  const limit = useSelector((state) => state.matchesData.limit);
  const [newLimit, setNewLimit] = useState(10);
  const userData = useSelector((state) => state.auth.user)
  const [user, setUser] = useState(getFromLocalStorage("user"))
  const [settings,] = useState(getFromLocalStorage("settings"));



  useEffect(() => {
    setNewLimit(limit);
  }, [limit]);

  useEffect(() => {
    if (userData) {
        setUser(userData || getFromLocalStorage("user"))
    }
}, [userData])


  useEffect(() => {
    if (limit !== 10) {
      dispatchRedux(stopFetchingMatches());
      fetchData();
    }
  }, [newLimit]);

  useEffect(() => {
    const abort = new AbortController();
    return () => {
      abort.abort();
      dispatchRedux(stopFetchingMatches());
    };
  }, []);

  const findPostableSlip = () => {
    let betslips = getBetslip() || {};
    var values = Object.keys(betslips).map(function (key) {
      return betslips[key];
    });
    return values;
  };

  useEffect(() => {
    // Configure SIR

    // Register Adapter
    window.SIR("registerAdapter", "betnare");

    // Add Widget 1
    window.SIR("addWidget", ".sr-widget-1", "betRecommendation", {
      user:user?.profile_id??null,
      count:6,
      onItemClick: handleButtonOnClick,
      filters: { sport: { available: ['1', '2','3','4','5','6','7','8','9','10','12','13','15','16','20','21','22','23','26','29','32','117'] } },


    });

    
  });

  const clear_rep = (str) => {
    return str.replace(/\s/g, "");
};
  const handleButtonOnClick =
  (target,event) => {

    console.log("checking what is the target", target)
      console.log("checking what is the data", event)
      if (target === 'externalOutcome') {

        // console.log("target data", event.externalMarket.status.isActive)
      const attributes = {
          parent_match_id: event?.externalEvent?.id,
          // match_id: event.currentTarget.getAttribute("match_id"),
          sub_type_id: event?.externalMarket?.id,
          // special_bet_value: event.currentTarget.getAttribute("special_bet_value"),
          odd_key: event?.externalOutcome?.name,
          odd_value: event?.externalOutcome?.odds,
          bet_type: event?.externalEvent?.isLive===false?"0":"1",
          odd_type: event?.externalMarket?.name,
          start_time: event?.externalEvent?.date,
          home_team: event?.externalEvent?.teams[0]?.name,
          away_team: event?.externalEvent?.teams[1]?.name,
          sport_name: event?.externalEvent?.sport.name,
          market_active: event?.externalMarket?.status.isActive,
      };

      let cstm = clear_rep(
          attributes.match_id +
          "" +
          attributes.sub_type_id +
          attributes.odd_key
          //  +
          // (marketKey !== undefined ? marketKey : "")
      );
      const maxPickReached = () => {
          // console.log("max_pick_reached")
          dispatchRedux(removePickedData(" "))
          // dispatchRedux(removePickedData(""));
          Notify({
              status: 401,
              message: "Maximum selections reached",
              token: "",
          });
      };
      const betItems = getBetslip();
      const slip = {
          match_id: attributes.match_id??attributes.parent_match_id,
          parent_match_id: attributes.parent_match_id,
          special_bet_value: "",
          sub_type_id: attributes.sub_type_id,
          bet_pick: attributes.odd_key,
          start_time: attributes.start_time,
          odd_value: attributes.odd_value,
          home_team: attributes.home_team,
          away_team: attributes.away_team,
          bet_type: attributes.bet_type,
          odd_type: attributes.odd_type,
          sport_name: attributes.sport_name,
          live: 0,
          ucn: clear_rep(
              `${attributes.match_id??attributes.parent_match_id}${attributes.sub_type_id}${attributes.odd_key}
              `
          ),
          market_active: attributes.market_active,
          position: 0,
      };


      // if (cstm === match?.ucn) {
          let betslip;
          const updateRedux = () => {
              betslip =  addToSlip(slip);
              dispatchRedux( setSelected(event.externalEvent.id+"_selected", cstm));
              dispatchRedux( setPickedData(cstm));
          };

          
              updateRedux();
         
              if (Object.keys(betItems || {}).length === Number(settings?.sportsBookLimits?.multiBetMaxSelections)) {
                  maxPickReached();
              } else {
                  updateRedux();
              }
          

          const betslip_data = {
              betslip_type: "betslip",
              data: betslip
          };

          dispatchRedux(setMatchBetslip(betslip_data));
      }
  };

  const fetchData = async () => {
    let tab = location.pathname.replace("/", "") || "highlights";
    let tabInfo = window.location.pathname;
    tabInfo = tabInfo.substring(tabInfo.lastIndexOf("/") + 1).trim();

    let betslip = findPostableSlip();

    let endpoint = "/v1/matches?page=" + (page || 1) + `&limit=${newLimit}`;
    let url = new URL(window.location.href);
    let sport_id = url.searchParams.get("sport_id");

    if (sport_id !== null) {
      endpoint += "&sport_id=" + sport_id;
    }

    endpoint = endpoint.replaceAll(" ", "");

    let search_term = url.searchParams.get("search");
    if (search_term !== null) {
      endpoint += "&search=" + search_term;
    } else {
      endpoint += `&tab=` + tabInfo.trim() || tab.trim();
      let sub_types = url.searchParams.get("sub_type_id") || "1";
      endpoint += `&sub_type_id=` + (sub_types || "1");
    }
    //splitting before api call
    let market_name = url.searchParams.get("market_name") || "1x2";
    let search = url.searchParams.get("search") || false;
    const categories = getFromLocalStorage("sport_categories");
    let sport = categories?.all_sports?.filter(
      (category) => Number(category.sport_id) === Number(sport_id)
    );
    const sport_type =
      sport != null
        ? sport?.[0]?.sport_name || "Soccer"
        : search
        ? ""
        : "Soccer";

    dispatchRedux(
      matchesPrematch({
        endpoint,
        method: "POST",
        data: betslip,
        search: search,
        active_sport: sport_type,
        active_sub_type: market_name,
      })
    ); // Dispatch matchesPrematch with the updated fetchParams

    // Clear the interval when fetchParams change
    dispatchRedux(
      startFetchingMatches({
        endpoint,
        method: "POST",
        data: betslip,
        interval: 20000,
        prematch: true,
        search: search,
        active_sport: sport_type,
        active_sub_type: market_name,
      })
    );
  };

  const checkThreeWay = () => {
    let url = new URL(window.location);
    let sub_types = url.searchParams.get("sub_type_id") || "1";
    setThreeWay(sub_types.includes("1"));
  };

  useEffect(() => {
    // stop the fetchInterva;
    dispatchRedux(stopFetchingMatches());
    dispatchRedux(resetState("limit"));
    // Start fetching matches with the new fetchParams
    fetchData();
    checkThreeWay();
    let cachedSlips = getBetslip("betslip");
    if (cachedSlips) {
      const betslip_data = {
        betslip_type: "betslip",
        data: cachedSlips,
      };
      dispatchRedux(setMatchBetslip(betslip_data));
    }
  }, [window.location.href, window.location.search]);

  const fetchAdditionalData = () => {
    if (limit > match_size) {
      console.log("we have reached end of match List");
    } else {
      dispatchRedux(setLimit(10));
      dispatchRedux(setFetching("fetching", true));
    }
  };
  let sport_id = Number(new URL(window.location).searchParams.get("sport_id"));

  useEffect(() => {
    const data = {
      param_fetch_type: "tabs",
      tab: tab,
    };
    dispatchRedux(setInitialLoadingState(data));
    return () => {
      dispatchRedux(stopFetchingMatches);
    };
  }, [tab]);

  useEffect(() => {
    const data = {
      param_fetch_type: "sport_id",
      sport_id: sport_id,
    };
    dispatchRedux(setInitialLoadingState(data));
    return () => {
      dispatchRedux(stopFetchingMatches);
    };
  }, [sport_id]);

  return (
    <>
      <div className="widgets">
        {/* Todo return this parts only */}
        <div>
          <div className="sr-widget sr-widget-1"></div>
        </div>
        {/* <div><div className="sr-widget sr-widget-2"></div></div> */}
      </div>
      {newMatches && tab !== "countries" && (
        <MatchHeaderRow
          live={false}
          first_match={newMatches ? newMatches[0] : {}}
          loading={loading}
        />
      )}
      {loading ? (
        <div className={`text-center mt-2 text-white d-block`}>
          {tab === "countries" ? (
            <SkeletonLoaderMore />
          ) : (
            <SkeletonLoaderMobile />
          )}
        </div>
      ) : tab === "countries" ? (
        <Countries />
      ) : (
        <div>
          <MatchList
            live={false}
            fetching={fetching}
            matches={newMatches}
            pdown={producer_down}
            three_way={threeWay}
            onEndReached={fetchAdditionalData}
          />
          <div
            className={`text-center mt-2 text-white ${
              fetching ? "d-block" : "d-none"
            }`}
          >
            {tab === "countries" ? (
              <SkeletonLoaderMore />
            ) : (
              <SkeletonLoaderMobile />
            )}
          </div>
        </div>
      )}
    </>
  );
});

export default React.memo(Index);
