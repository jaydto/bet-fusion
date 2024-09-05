import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import favImg from '../../assets/img/mobile/fav-1.png';
import crashGamesImg from '../../assets/img/mobile/crash-games.png';
import slotImg from '../../assets/img/mobile/Slot.png';
import casinoChip from '../../assets/svg/casinoChip.svg';
// import newestImg from '../../assets/img/mobile/New.png';
// import recommendedImg from '../../assets/img/mobile/Rec.png';
import crash from '../../assets/img/mobile/fire.png';
import popular from '../../assets/img/mobile/crash.png';
import instantGamesImg from '../../assets/img/mobile/Instant_Games_Icon_200x200.png';
import './index.css';
import { useDispatch } from 'react-redux';
import { setState } from '../../redux/virtualsSlice';

const MobileNavCasino = () => {
  const navigate = useNavigate();
  const { provider, category } = useParams();

  const [activeItem, setActiveItem] = useState(category??'All'); // Set initial active item
  const dispatch = useDispatch();

  const handleItemClick = (category, provider = "smartSoft") => {
    console.log("activeItem", category)
    // Set the active item
    setActiveItem(category);
    if(category==='All'){
      dispatch(setState("casino_search", []));

      return navigate("/casino")

    }
    // Navigate to casino-options with selected category
    navigate(`/casino/${provider}/${category}`);
  };

  return (
    <section className="sportsNav non-desktop done" id="casinoMenu">
      <div className="nwBtns" style={{ display: "flex", width: '100%', fontSize: '0px', justifyContent: 'space-around' }}>
      <div
          className={`btnHckd ${activeItem === 'All' ? 'active' : ''}`}
          style={{ width: '9.09091%', minWidth: '100px' }}
          onClick={() => handleItemClick('All', 'all')}
        >
          <img src={casinoChip} alt="All" />All
        </div>
      <div
          className={`btnHckd ${activeItem === 'Slots' ? 'active' : ''}`}
          style={{ width: '9.09091%', minWidth: '100px' }}
          onClick={() => handleItemClick('Slots', 'smartSoft')}
        >
          <img src={slotImg} alt="Slot" />Slots
        </div>
        {/* <div
          className={`btnHckd ${activeItem === 'favorites' ? 'active' : ''}`}
          style={{ width: '9.09091%', minWidth: '100px' }}
          onClick={() => handleItemClick('favorites')}
        >
          <img src={Newest} alt="Favorites" />favorites
        </div> */}
       
       
        <div
          className={`btnHckd ${activeItem === 'popular' ? 'active' : ''}`}
          style={{ width: '9.09091%', minWidth: '100px' }}
          onClick={() => handleItemClick('popular',"Popular")}
        >
           <img src={popular} alt="Popular" />Popular
        </div>
        <div
          className={`btnHckd ${activeItem === 'crash games' ? 'active' : ''}`}
          style={{ width: '9.09091%', minWidth: '100px' }}
          onClick={() => handleItemClick('crash games', 'Crash games')}
        >
          <img src={crash} alt="Crash Games" />Crash Games
        </div>
        <div
          className={`btnHckd ${activeItem === 'jetX' ? 'active' : ''}`}
          style={{ width: '9.09091%', minWidth: '100px' }}
          // onClick={() => handleItemClick('crash-games')}
          onClick={() => navigate("/smart-play?game=JetX&category=JetX&status=live")}
        >
          <img src={crashGamesImg} alt="JetX" />JetX
        </div>
         <div
          className={`btnHckd ${activeItem === 'instant games' ? 'active' : ''}`}
          style={{ width: '9.09091%', minWidth: '100px' }}
          onClick={() => handleItemClick('instant games','Instant Games')}
        >
          <img src={instantGamesImg} alt="Instant Games" />Instant games
        </div> 
     
      </div>
    </section>
  );
};

export default MobileNavCasino;
