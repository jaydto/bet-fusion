import React, { useContext, useEffect } from "react";
import "./results.css";
import { StoreContext } from "../../../../context/store";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import {
  virtualLeaguePlayouts,
  resetState,
} from "../../../../redux/virtualLeague"; // Import useDispatch hook

const KironPlayouts = React.memo((props) => {
  const { state, dispatch } = useContext(StoreContext);
  let timeVar;
  const dispatchRedux = useDispatch();
  const playouts_data = useSelector(
    (state) => state.virtualLeague.playouts_data
  );
  const competition_id = useSelector(
    (state) => state.virtualLeague.competition_id
  );
  const loading = useSelector((state) => state.virtualLeague.loading);
  const round_id = useSelector((state) => state.virtualLeague.round_id);
  const play_time = useSelector((state) => state.virtualLeague.play_time);
  const Ended = useSelector((state) => state.virtualLeague.ended);

  const fetchData = () => {
    const data = {
      competition_id: Number(competition_id),
      round_id: round_id,
    };
    dispatchRedux(virtualLeaguePlayouts(data)); // Dispatch nareLeaguePlayouts async thunk
  };

  useEffect(() => {
    let totalEmptyPlayouts = 0;

    {
      playouts_data?.playouts?.map((results, key) => {
        if (
          results.home_scores.length == 0 &&
          results.away_scores.length == 0
        ) {
          ++totalEmptyPlayouts;
        }
      });
    }
    // console.log("totalEmpty", totalEmptyPlayouts)
    if (totalEmptyPlayouts == playouts_data?.playouts?.length) {
      timeVar = setTimeout(() => {
        fetchData();
      }, 5000);
    } else {
      if (loading) {
        return clearTimeout(timeVar);
      }
    }
  }, [loading]);

  useEffect(() => {
    // dispatchRedux(resetState('play_time'))
    dispatchRedux(resetState("time_left"));
  }, []);

  const handleScore_home = (home_score, away_score) => {
    if (home_score != 0 && home_score > away_score) {
      return true;
    } else if (home_score != 0) {
      if (home_score == away_score) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  const handleScore_away = (home_score, away_score) => {
    if (away_score != 0 && away_score > home_score) {
      return true;
    } else if (away_score != 0) {
      if (away_score == home_score) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return (
    <>
      <section className="standing-wrapper-live text-center pt-2 pb-2">
        <div className="w-100">
          <div className="w-100">
            <div className="col-12 py-1 standings-container-heading playouts d-flex align-items-center justify-content-between px-3">
              <span>
                <div className={"d-flex align-items-center"}>
                  Matchday #{playouts_data?.game_week}
                </div>
              </span>
              <span>
                <div className={"d-flex align-items-center"}>
                  You have {playouts_data?.selections || 0} selections
                </div>
              </span>
            </div>
          </div>
        </div>
      </section>
      <div className="league-games-wrapper playout">
        <div className={"w-100"}>
          <div className="playing-games-wrapper float-left w-100 small">
            <div className="league-wrapper">
              <div className="matches-wrapper pt-2">
                {playouts_data?.playouts?.map((results, index) => (
                  <div key={index}>
                    <div className="live-match-selection pt-2 pb-1">
                      <div className="container">
                        <div className="row px-3 pt-2">
                          <div className="col-results-page-1 text-right pt-1 d-flex justify-content-between align-items-center flex-column">
                            <div className="d-flex align-items-center justify-content-start w-100">
                              <span className="team-jersey">
                                <LazyLoadImage
                                  src={results?.home_team_image}
                                  alt="Virtual League"
                                />
                              </span>
                              <a
                                href="#"
                                className={
                                  "d-flex  justify-content-between align-items-center gap-4  flex-column"
                                }
                                style={{ color: "var(--black)" }}
                              >
                                <span className="home-team-r bold px-2">
                                  {results.home_team}
                                </span>
                              </a>
                            </div>
                          </div>
                          <div className="col-results-page-2 d-flex flex-column gap-1 align-items-center ">
                            <div className="d-flex align-items-center justify-content-between">
                              <span
                                className={`mr-2 bold ${
                                  handleScore_home(
                                    results.home_scores.filter(
                                      (score) => score <= play_time
                                    ).length,
                                    results.away_scores.filter(
                                      (score) => score <= play_time
                                    ).length
                                  )
                                    ? `${
                                        Ended
                                          ? "score-value-txt-stopped"
                                          : "kiron-playout-score-animation kiron-playout-score"
                                      }`
                                    : "score-value-txt"
                                }`}
                              >
                                {
                                  results.home_scores.filter(
                                    (score) => score <= play_time
                                  ).length
                                }
                              </span>
                              <span className={"separator-style mx-2"}></span>
                              <span
                                className={`mr-2 bold ${
                                  handleScore_away(
                                    results.home_scores.filter(
                                      (score) => score <= play_time
                                    ).length,
                                    results.away_scores.filter(
                                      (score) => score <= play_time
                                    ).length
                                  )
                                    ? `${
                                        Ended
                                          ? "score-value-txt-stopped"
                                          : "kiron-playout-score-animation kiron-playout-score"
                                      }`
                                    : "score-value-txt"
                                }`}
                              >
                                {
                                  results.away_scores.filter(
                                    (score) => score <= play_time
                                  ).length
                                }
                              </span>
                            </div>
                          </div>

                          <div className="col-results-page-3 text-left pt-1 d-flex justify-content-between align-items-center flex-column">
                            <div className="d-flex align-items-center justify-content-end w-100">
                              <a
                                href="#"
                                className={
                                  "d-flex justify-content-between align-items-center gap-4 flex-column"
                                }
                                style={{ color: "var(--black)" }}
                              >
                                <span className="away-team-r bold px-2">
                                  {results.away_team}
                                </span>
                              </a>
                              <span className="team-jersey">
                                <LazyLoadImage
                                  src={results?.away_team_image}
                                  alt="Virtual League"
                                />
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex align-items-center px-5 justify-content-center">
                          <div className="col-results-page-1 text-right pt-1 d-flex text-muted-1 h6  d-flex justify-content-start align-items-center">
                            {results.home_scores
                              .filter((score) => score <= play_time)
                              .map((score, i) => (
                                <div key={i} className="score-time">
                                  <span>{score}'&nbsp;&nbsp;</span>
                                </div>
                              ))}
                          </div>

                          {/* {play_time >= 45 && (
                              <div className="d-flex align-items-center justify-content-center gap-3 pb-0 col-2">
                                <span className="text-muted-1 d-flex align-items-center justify-content-center">
                                  <span style={{ fontSize: "10px" }}>
                                    HT:&nbsp;
                                  </span>
                                  <span style={{ fontSize: "10px" }}>
                                    {
                                      results.home_scores.filter(
                                        (score) => score <= 45
                                      ).length
                                    }
                                  </span>
                                </span>
                                <span className="separator-style text-muted-1"></span>
                                <span
                                  className="text-muted-1"
                                  style={{ fontSize: "10px" }}
                                >
                                  {
                                    results.away_scores.filter(
                                      (score) => score <= 45
                                    ).length
                                  }
                                </span>
                              </div>
                            )} */}
                          {play_time >= 45 && (
                            <div className="d-flex align-items-center justify-content-center gap-3 pb-0 col-2">
                              <span className="text-muted-1 d-flex align-items-center justify-content-center ">
                                
                                <span
                                  className="bold text-muted-2"
                                  style={{ fontSize: "12px", marginLeft:"-25px" }}
                                >
                                  <span style={{ fontSize: "10px" }} className="text-muted-1">
                                  HT&nbsp;&nbsp;
                                </span>
                                  {
                                    results.home_scores.filter(
                                      (score) => score <= 45
                                    ).length
                                  }
                                  &nbsp;:&nbsp;&nbsp;
                                  {
                                    results.away_scores.filter(
                                      (score) => score <= 45
                                    ).length
                                  }
                                </span>
                              </span>

                              <span
                                className="bold text-muted-2"
                                style={{ fontSize: "12px" }}
                              ></span>
                            </div>
                          )}

                          <div className="col-results-page-3 text-left pt-1 d-flex text-muted-1 h6 d-flex justify-content-end align-items-center">
                            {results.away_scores
                              .filter((score) => score <= play_time)
                              .map((score, i) => (
                                <div key={i} className="score-time">
                                  <span>{score}'&nbsp;&nbsp;</span>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    {results?.bet_pick !== null && (
                      <div className={"w-100 d-flex align-items-center"}>
                        <span
                          className="w-100  d-flex  justify-content-center bold px-2 align-items-center background-color-orange w-100"
                          style={{ fontSize: "13px", height: "23px" }}
                        >
                          &nbsp;
                          <span className={"text-dark "}>
                            Bet Pick:&nbsp;
                            <span className={"text-success kiron_choice"}>
                              {results?.bet_pick}
                            </span>
                            &nbsp;
                          </span>
                          <span className={"text-dark kiron_choice"}>
                            Market :&nbsp;
                            <span className={" text-secondary"}>
                              {results?.market}
                            </span>
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default KironPlayouts;
