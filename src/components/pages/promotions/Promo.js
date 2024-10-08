import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import PromoCards from "./PromoCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import {
  getFromLocalStorage,
} from "../../utils/local-storage";
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";
import { checkIfUser, setUtmSouceCampaignOnPromotions } from "../../utils/utils";

const Header = React.lazy(() => import("../../header/header"));

const Promo = () => {
  const url = new URL(window.location);
  let id = url.searchParams.get("id");
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = getFromLocalStorage("user");
  const gaEventTracker = useAnalyticsEventTracker("Promotions");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await import("./promo.json");
        const item = response.default.find((item) => item.id === parseInt(id));
        setData(item);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [parseInt(id)]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  if (!data) {
    return null;
  }

  const item = data;



  return (
    <>
      <Header />
      <ToastContainer />
      <div>
        <div className="d-flex flex-row">
          <div
            className="gz home promotions-app-top"
            style={{ width: "100%", background: "var(--betnare-primary)" }}
          >
            <div className="homepage desktop-promotions-info">
              <div className="col-md-12 d-flex flex-column">
                <div className="col-md-12 d-flex align-items-center my-3">
                  <span className={"px-5 col-2"} onClick={() => navigate(-1)}>
                    <FontAwesomeIcon
                      icon={faAngleLeft}
                      style={{
                        fontSize: "24px",
                        color: "var(--light)",
                        fontWeight: "700",
                        opacity: "0.7",
                      }}
                    />
                  </span>
                  <div className="shadow-sm d-flex justify-content-center col-8 p-2 shadow-sm promotion-header text-white">
                    PROMOTIONS
                  </div>
                </div>
                <div className="col">
                  <div
                    className={
                      "row text-white p-2 shadow-sm d-flex justify-content-center promo-container flex-column"
                    }
                  >
                    <div className="col-md-12  shadow-lg promotion">
                      <div className="d-flex flex-column promo-inner-promo-item">
                        <h5
                          className="bold border-bottom d-flex justify-content-center"
                          style={{ color: "#ea5d0b" }}
                        >
                          {item?.name}
                        </h5>
                        {/* {banners.map(
                          (banner) =>
                            banner.id === parseInt(id) && (
                              <img src={banner.src} className={"rounded  "} />
                            )
                        )} */}
                        <img src={item?.src} className={"rounded  "} />
                        <ul>
                          {item?.instructions && (
                            <p
                              className="bold border-bottom d-flex justify-content-center"
                              style={{ color: "#ea5d0b" }}
                            >
                              {item?.instructions}
                            </p>
                          )}
                          {item?.description && (
                            <>
                              {item?.description
                                .split("\n")
                                .map((line, index) => (
                                  <React.Fragment key={index}>
                                    {line}
                                    <br />
                                  </React.Fragment>
                                ))}
                            </>
                          )}
                        </ul>
                        {item?.heading && (
                          <span>
                            <u
                              className="bold border-bottom d-flex justify-content-center"
                              style={{ color: "#ea5d0b" }}
                            >
                              {item?.heading}
                            </u>
                          </span>
                        )}
                        {item?.intro && (
                          <p>
                            {item?.intro.split("\n").map((line, index) => (
                              <React.Fragment key={index}>
                                {line}
                                <br />
                              </React.Fragment>
                            ))}
                          </p>
                        )}
                        {item?.headingBooster && (
                          <span>
                            <u
                              className="bold border-bottom d-flex justify-content-center"
                              style={{ color: "#ea5d0b" }}
                            >
                              {item?.headingBooster}
                            </u>
                          </span>
                        )}
                        <ul>
                          {item?.boosterDescription && (
                            <>
                              {item?.boosterDescription
                                ?.split("\n")
                                .map((line, index) => (
                                  <React.Fragment key={index}>
                                    {line}
                                    <br />
                                  </React.Fragment>
                                ))}
                            </>
                          )}
                        </ul>
                        <br />
                        {item?.tableData && (
                          <Table
                            bordered
                            responsive
                            className={"text-white"}
                            style={{ backgroundColor: "#1f2f38" }}
                          >
                            <thead>
                              <tr>
                                {item.tableData.headings.map((heading) => (
                                  <th key={heading}>{heading}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {item.tableData.rows.map((row, index) => (
                                <tr key={index}>
                                  {row.map((cell, index) => (
                                    <td key={index}>{cell}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        )}
                        {item?.example && (
                          <>
                            <h5>
                              <u
                                className="bold border-bottom d-flex justify-content-center"
                                style={{ color: "#ea5d0b" }}
                              >
                                {item.exampleHeading}
                              </u>
                            </h5>
                            <p>
                              {item?.example && (
                                <>
                                  {item?.example
                                    ?.split("\n")
                                    .map((line, index) => (
                                      <React.Fragment key={index}>
                                        {line}
                                        <br />
                                      </React.Fragment>
                                    ))}
                                </>
                              )}
                            </p>
                          </>
                        )}

                        <div className="col-md-12">
                          <div className="d-flex justify-content-center mb-4 mx-2">
                            <button
                              className={
                                "profile-button border-0 h-25 rounded promo-button"
                              }
                              onClick={() => {
                                if (item?.actions[0].name === "Sign Up") {
                                  checkIfUser(user, navigate);
                                } else {
                                  navigate(item?.actions[0].url);
                                }
                                gaEventTracker(`${item?.eventTracking}`);
                                setUtmSouceCampaignOnPromotions(
                                  `${item?.eventTracking}`
                                );
                              }}
                            >
                              {item?.actions[0].name}
                            </button>
                          </div>
                          <span>
                            <u
                              className="bold border-bottom d-flex justify-content-center"
                              style={{ color: "#ea5d0b" }}
                            >
                              {item?.termsHeading}
                            </u>
                          </span>
                          <div>
                            {item?.termsContent
                              ?.split("\n")
                              .map((line, index) => (
                                <React.Fragment key={index}>
                                  {line}
                                  <br />
                                </React.Fragment>
                              ))}
                          </div>
                          <div>
                            {item?.nb && (
                              <p className={"text-center lead"}>
                                <span>
                                  <u
                                    className="bold  "
                                    style={{ color: "#ea5d0b" }}
                                  >
                                    {" "}
                                    NB:
                                  </u>
                                </span>
                                {item?.nb}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <PromoCards />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Promo;
