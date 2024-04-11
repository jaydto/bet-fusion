import React, { useEffect, useState } from "react";
import "./test.css";
import "../assets/css/bottomSheet.css";
import { Link, useLocation } from "react-router-dom";
import { getBetslip } from "./utils/betslip";
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
import { setMatchBetslip } from "../redux/bettingSlice";

import SkeletonLoaderMore from "./pages/skeletonLoadersWeb/SkeletonLoaderMore";

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

  useEffect(() => {
    setNewLimit(limit);
  }, [limit]);

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
    window.SIR("addWidget", ".sr-widget-1", "betRecommendation", {});

    // Add Widget 2
    window.SIR("addWidget", ".sr-widget-2", "betRecommendation.similarBets", {
      similarEventIds: [43232509],
    });
  });

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
        {/* <div>
          <div className="sr-widget sr-widget-1"></div>
        </div> */}
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
