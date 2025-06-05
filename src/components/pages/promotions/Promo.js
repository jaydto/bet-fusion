import React, { useEffect, useState, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Typography, Row, Col, Button, Table, Spin, Grid } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { ToastContainer } from "react-toastify";

import { getFromLocalStorage } from "../../utils/local-storage";
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";
import {
  checkIfUser,
  setUtmSouceCampaignOnPromotions,
} from "../../utils/utils";
import HeaderBreadCrumb from "../../shared/headerBreadCrumb";

const Header = lazy(() => import("../../header/header"));
const { Title, Paragraph, Text } = Typography;
const { useBreakpoint } = Grid;

const Promo = () => {
  const url = new URL(window.location);
  const id = url.searchParams.get("id");
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = getFromLocalStorage("user");
  const gaEventTracker = useAnalyticsEventTracker("Promotions");
  const screens = useBreakpoint();
  const isMobile = !screens.md;

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
  }, [id]);

  if (loading) return <Spin tip="Loading..." fullscreen />;
  if (error) return <div>An error occurred: {error.message}</div>;
  if (!data) return null;

  const item = data;

  const renderMultilineText = (text) =>
    text?.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));

  return (
    <>
      <ToastContainer />
      <div
        style={{
          background: "var(--jaza-bets-primary)",
          margin: "auto",
          maxWidth: "767px",
        }}
      >
        <Col span={24}>
          <div style={{ padding: isMobile ? "0px 10px" : "20px 2rem" }}>
            <HeaderBreadCrumb />
          </div>

          <div
            className="d-flex justify-content-center"
            style={{ padding: "1rem" }}
          >
            <Col span={24}>
              <div
                style={{
                  background: "var(--jaza-bets-header-bg)",
                  padding: 24,
                  borderRadius: 8,
                }}
              >
                <Title
                  level={4}
                  style={{ color: "var(--light)", textAlign: "center" }}
                >
                  {item?.name}
                </Title>

                {item?.src && (
                  <Image
                    src={item?.src}
                    width="100%"
                    alt={item?.name}
                    fallback="https://via.placeholder.com/800x400?text=No+Image"
                    style={{ borderRadius: 8, marginBottom: 16 }}
                  />
                )}

                {item?.instructions && (
                  <Title
                    level={5}
                    style={{ color: "var(--light)", textAlign: "center" }}
                  >
                    {item.instructions}
                  </Title>
                )}

                {item?.description && (
                  <Paragraph style={{ color: "var(--light)" }}>
                    {renderMultilineText(item.description)}
                  </Paragraph>
                )}

                {item?.heading && (
                  <Title
                    level={5}
                    underline
                    style={{
                      color: "var(--jaza-bets-header-bg)",
                      textAlign: "center",
                    }}
                  >
                    {item.heading}
                  </Title>
                )}

                {item?.intro && (
                  <Paragraph style={{ color: "var(--light)" }}>
                    {renderMultilineText(item.intro)}
                  </Paragraph>
                )}

                {item?.headingBooster && (
                  <Title
                    level={5}
                    underline
                    style={{
                      color: "var(--jaza-bets-header-bg)",
                      textAlign: "center",
                    }}
                  >
                    {item.headingBooster}
                  </Title>
                )}

                {item?.boosterDescription && (
                  <Paragraph style={{ color: "var(--light)" }}>
                    {renderMultilineText(item.boosterDescription)}
                  </Paragraph>
                )}

                {item?.tableData && (
                  <Table
                    dataSource={item.tableData.rows.map((row, i) => ({
                      key: i,
                      ...row.reduce((acc, val, idx) => {
                        acc[`col${idx}`] = val;
                        return acc;
                      }, {}),
                    }))}
                    columns={item.tableData.headings.map((heading, index) => ({
                      title: heading,
                      dataIndex: `col${index}`,
                      key: `col${index}`,
                    }))}
                    bordered
                    pagination={false}
                    style={{ marginTop: 16, color: "#fff" }}
                  />
                )}

                {item?.example && (
                  <>
                    <Title
                      level={5}
                      underline
                      style={{ color: "var(--light)", textAlign: "center" }}
                    >
                      {item.exampleHeading}
                    </Title>
                    <Paragraph style={{ color: "var(--light)" }}>
                      {renderMultilineText(item.example)}
                    </Paragraph>
                  </>
                )}

                <Row justify="center" style={{ marginTop: 24 }}>
                  <Col>
                    <Button
                      style={{
                        background: "var(--jaza-bets-button-login)",
                        border: "none",
                      }}
                      size="large"
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
                    </Button>
                  </Col>
                </Row>

                {item?.termsHeading && (
                  <Title
                    level={5}
                    underline
                    style={{
                      color: "var(--light)",
                      textAlign: "center",
                      marginTop: 24,
                    }}
                  >
                    {item.termsHeading}
                  </Title>
                )}

                {item?.termsContent && (
                  <Paragraph
                    style={{ marginBottom: 16, color: "var(--light)" }}
                  >
                    {renderMultilineText(item.termsContent)}
                  </Paragraph>
                )}

                {item?.nb && (
                  <Paragraph
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "var(--jaza-bets-header-bg)",
                    }}
                  >
                    NB: {item.nb}
                  </Paragraph>
                )}
              </div>
            </Col>
          </div>
        </Col>
      </div>
    </>
  );
};

export default Promo;
