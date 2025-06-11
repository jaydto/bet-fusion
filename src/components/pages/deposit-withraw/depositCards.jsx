import React, { useState } from "react";
import "./deposit.css";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";

const DepositCards = ({ onFavoriteSelect, onCardSelect }) => {
  const [favorites, setFavorites] = useState({});

  const cards = [
    { id: 1, amount: 100, value: "10 " },
    { id: 2, amount: 200, value: "20 " },
    { id: 3, amount: 300, value: "30 " },
    { id: 4, amount: 400, value: "40 " },
    { id: 5, amount: 500, value: "50 " },
    { id: 6, amount: 600, value: "60 " },
  ];

  const toggleFavorite = (e, id, value) => {
    e.stopPropagation();
    e.preventDefault();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
    if (onFavoriteSelect) {
      onFavoriteSelect(value);
    }
  };

  const handleCardClick = (amount) => {
    if (onCardSelect) {
      onCardSelect(amount);
    }
  };

  return (
    <div className="card-grid-d">
      {cards.map(({ id, amount, value }) => (
        <div
          key={id}
          className="card-d"
          onClick={() => handleCardClick(amount)}
        >
          <div className="card-header-d">
            <div
              className="favorite-icon-d"
              // onClick={(e) => toggleFavorite(e, id, value)}
            >
              {/* {favorites[id] ? (
                <FaStar color="var(--login-btn-cl)" />
              ) : (
                <FaStar  color="var(--light)" />
              )} */}
            </div>
            <div className="amount-d"> {amount}</div>
          </div>
          {/* <div className="card-body-d">
            <div className="label">Get</div>
            <div className="value">{value}</div>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default DepositCards;
