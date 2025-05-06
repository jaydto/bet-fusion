import React, { useEffect, useState } from "react";
import { Drawer, Menu, Badge, Progress, Typography } from "antd";
import {
  HomeOutlined,
  GiftOutlined,
  UserOutlined,
  DollarOutlined,
  AppstoreOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getFromLocalStorage } from "../utils/local-storage";
import { getBetslip, getKironSlip } from "../utils/betslip";
import { setState as setMatchBetslipOptions } from "../../redux/bettingSlice";
import Sidebar from "../pages/casino/sidebar";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Logo from "../../assets/img/logo.png";

const { Text } = Typography;

const MobileMenu = () => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const pathname = window.location.pathname;

  const isKiron = pathname.includes("nare-league");
  const betItems = isKiron ? getKironSlip() : getBetslip();
  const betslipOptions = useSelector((state) =>
    isKiron
      ? state.betting.kiron_betslip_options
      : state.betting.betslip_options
  );
  const remainingGames = useSelector((state) => state.betting.remaining_games);

  let sumOfOdds = 1;
  Object.values(betItems || {}).forEach((match) => {
    const odd = parseFloat(match.odd_value);
    if (!isNaN(odd)) sumOfOdds *= odd;
  });

  const winnings =
    betslipOptions?.hasBoost && betslipOptions?.netWinBoosted
      ? betslipOptions.netWinBoosted
      : betslipOptions?.netWin || 0;

  useEffect(() => {
    const boostRequirement = 4;
    const calculated =
      ((boostRequirement - remainingGames) / boostRequirement) * 100;
    setProgress(Math.max(0, Math.min(calculated, 100)));
  }, [remainingGames]);

  const iconStyle = { fontSize: "16px" }; // Adjust size as needed

  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined style={iconStyle} />,
      label: "Home",
      path: "/",
    },
    {
      key: "promotions",
      icon: <GiftOutlined style={iconStyle} />,
      label: "Promos",
      path: "/promotions",
    },
    {
      key: "mybets",
      icon: <UserOutlined style={iconStyle} />,
      label: "My Bets",
      path: "/my-bets",
    },
    {
      key: "menu",
      icon: <AppstoreOutlined style={iconStyle} />,
      label: "Menu",
    },
  ];

  const handleNavigate = (item) => {
    if (item.key === "menu") {
      setVisible(true);
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className="mobile-menu-new">
      <Menu
        mode="horizontal"
        className="mobile-bottom-menu"
        theme="dark"
        selectedKeys={[pathname]}
        style={{
          position: "fixed",
          bottom: 0,
          color: "var(--light)",
          border: "none",
          width: "100%",
          height: "60px", // Increase height here
          backgroundColor: "var(--jaza-bets-header-bg)",
          display: "flex",
          alignItems: "center", // Vertically center content
        }}
      >
        {menuItems.map((item) => (
          <Menu.Item
            key={item.key}
            icon={
              <Badge
                count={
                  item.key === "deposit" && betItems?.length
                    ? betItems.length
                    : 0
                }
              >
                {item.icon}
              </Badge>
            }
            onClick={() => handleNavigate(item)}
            // style={{ padding: "12px 8px" }} // Increase top/bottom padding
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu>

      {sumOfOdds > 1 && (
        <div
          style={{
            position: "fixed",
            bottom: "60px",
            left: 0,
            width: "100%",
            background: "#fff",
            padding: "10px 16px",
            boxShadow: "0 -2px 6px rgba(0,0,0,0.1)",
            zIndex: 1001,
          }}
          onClick={() => handleNavigate({ key: "deposit", path: "/deposit" })}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text strong>Betslip</Text>
            <div style={{ textAlign: "right" }}>
              <Text>Odds: {sumOfOdds.toFixed(2)}</Text>
              <br />
              <Text>Winnings: {winnings?.toLocaleString()}</Text>
            </div>
          </div>
          <Progress percent={progress} size="small" status="active" />
        </div>
      )}

      <Drawer
        title={<LazyLoadImage src={Logo} alt="Jazabets" width={150}  />}
        placement="top"
        onClose={() => setVisible(false)}
        open={visible}
        // theme="dark" // optional, can be omitted if your dark theme is custom
        height="100%"
        style={{
          background: "var(--jaza-bets-header-bg)",
          color: "var(--light)",
        }}
        closeIcon={null}
        className="bounce-drawer"
      >
        <div
          style={{
            position: "absolute",
            bottom: 16,
            right: 16,
            zIndex: 1002,
            background: "#fff",
            borderRadius: "50%",
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
          }}
          onClick={() => setVisible(false)}
        >
          <CloseOutlined style={{ fontSize: 16, color: "#000" }} />
        </div>
        <Sidebar />
      </Drawer>
    </div>
  );
};

export default MobileMenu;
