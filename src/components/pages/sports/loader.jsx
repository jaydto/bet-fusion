import React from "react";

const Loader = () => {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "var(--bet-fusion-secondary)", // optional: dark background
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "6px solid var(--white)",
    borderTop: "6px solid var(--bet-fusion-orange)", // crimson/red color
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

export default Loader;
