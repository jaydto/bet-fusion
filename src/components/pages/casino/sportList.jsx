import React from "react";

const SportsList = () => {
  const sports = [
    { id: "soccer", label: "Soccer" },
    { id: "ligibigi", label: "Ligi Bigi" },
    { id: "virtualhub", label: "Virtuals", badge: "New" },
    { id: "aviator", label: "Aviator" },
    { id: "crashgames", label: "Crash Games" },
    { id: "casino", label: "Casino", active: true },
    { id: "jackpots", label: "Jackpots" },
    { id: "shikisha", label: "Shikisha Bet" },
    { id: "splitpot", label: "Betika Fasta" },
    { id: "offersnrewards", label: "Promotions" },
    { id: "table_tennis", label: "Table Tennis" },
    { id: "basketball", label: "Basketball" },
    { id: "rugby", label: "Rugby" },
    { id: "ice_hockey", label: "Ice Hockey" },
    { id: "cricket", label: "Cricket" },
  ];

  return (
    <div className="main-sports-transition-group scroll-x" >
      {sports.map((sport) => (
        <div
          key={sport.id}
          className={`sports-list-item disable-select ${
            sport.active ? "active" : ""
          }`}
        >
          <div className="sports-list__item sports-list__main__sports__container__item">
            {sport.badge && (
              <span className="new-alert-badge new-badge">{sport.badge}</span>
            )}
            <svg className="sports-list__item__icon">
              <use xlinkHref={`#${sport.id}`} />
            </svg>
            <span className="sports-list__item__label narrow text-light">{sport.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SportsList;
