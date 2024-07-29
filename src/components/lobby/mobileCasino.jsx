import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import favImg from '../../assets/img/mobile/fav-1.png';
import crashGamesImg from '../../assets/img/mobile/crash-games.png';
import slotImg from '../../assets/img/mobile/Slot.png';
import newestImg from '../../assets/img/mobile/New.png';
import recommendedImg from '../../assets/img/mobile/Rec.png';
import instantGamesImg from '../../assets/img/mobile/Instant_Games_Icon_200x200.png';
import './index.css';

const MobileNavCasino = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('Slots'); // Set initial active item

  const handleItemClick = (category, provider = "smartSoft") => {
    console.log("activeItem", category)
    // Set the active item
    setActiveItem(category);
    // Navigate to casino-options with selected category
    navigate(`/casino-options/${provider}/${category}`);
  };

  return (
    <section className="sportsNav non-desktop done" id="casinoMenu">
      <div className="nwBtns" style={{ display: "flex", width: '100%', fontSize: '0px', justifyContent: 'space-around' }}>
      <div
          className={`btnHckd ${activeItem === 'Slots' ? 'active' : ''}`}
          style={{ width: '9.09091%', minWidth: '100px' }}
          onClick={() => handleItemClick('Slots', 'smartSoft')}
        >
          <img src={slotImg} alt="Slot" />Slots
        </div>
        <div
          className={`btnHckd ${activeItem === 'favorites' ? 'active' : ''}`}
          style={{ width: '9.09091%', minWidth: '100px' }}
          onClick={() => handleItemClick('favorites', 'favorites')}
        >
          <img src={favImg} alt="Favorites" />favorites
        </div>
        <div
          className={`btnHckd ${activeItem === 'crash-games' ? 'active' : ''}`}
          style={{ width: '9.09091%', minWidth: '100px' }}
          onClick={() => handleItemClick('crash-games')}
        >
          <img src={crashGamesImg} alt="JetX" />JetX
        </div>
       
        <div
          className={`btnHckd ${activeItem === 'newest' ? 'active' : ''}`}
          style={{ width: '9.09091%', minWidth: '100px' }}
          onClick={() => handleItemClick('newest')}
        >
          <img src={newestImg} alt="Newest" />Newest
        </div>
        <div
          className={`btnHckd ${activeItem === 'recommended' ? 'active' : ''}`}
          style={{ width: '9.09091%', minWidth: '100px' }}
          onClick={() => handleItemClick('recommended')}
        >
          <img src={recommendedImg} alt="Recommended" />Recommended
        </div>
        <div
          className={`btnHckd ${activeItem === 'instant-game' ? 'active' : ''}`}
          style={{ width: '9.09091%', minWidth: '100px' }}
          onClick={() => handleItemClick('instant-game')}
        >
          <img src={instantGamesImg} alt="Instant Games" />Instant Games
        </div>
      </div>
    </section>
  );
};

export default MobileNavCasino;
