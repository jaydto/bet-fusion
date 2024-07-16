import React from 'react';
import favImg from '../../assets/img/mobile/fav-1.png';
import crashGamesImg from '../../assets/img/mobile/crash-games.png';
import slotImg from '../../assets/img/mobile/Slot.png';
import newestImg from '../../assets/img/mobile/New.png';
import recommendedImg from '../../assets/img/mobile/Rec.png';
import instantGamesImg from '../../assets/img/mobile/Instant_Games_Icon_200x200.png';
import './index.css'

const MobileNavCasino = () => {
  return (
    <section className="sportsNav non-desktop done" id="casinoMenu">
      <div className="nwBtns" style={{ minWidth: '1100px', width: '100%', fontSize: '0px' }}>
        <a href="/en/casino/favorites/" className="non-out">
          <div className="btnHckd" style={{ width: '9.09091%', minWidth: '100px' }} ist="Любими">
            <img src={favImg} alt="Favorites" />favorites
          </div>
        </a>
        
       
        <a className="crash-games" href="/en/casino/slots/crash-games/">
          <div className="btnHckd" ist="crash-games" style={{ width: '9.09091%', minWidth: '100px' }}>
            <img src={crashGamesImg} alt="JetX" />JetX
          </div>
        </a>
       
        
        <div className="btnHckd active" style={{ width: '9.09091%', minWidth: '100px' }} ist="Cлот">
          <img src={slotImg} alt="Slot" />Slot
        </div>
        <a href="/en/casino/newest/">
          <div className="btnHckd" style={{ width: '9.09091%', minWidth: '100px' }} ist="най-нови">
            <img src={newestImg} alt="Newest" />Newest
          </div>
        </a>
        <a href="/en/casino/recommended/">
          <div className="btnHckd" style={{ width: '9.09091%', minWidth: '100px' }} ist="recommended">
            <img src={recommendedImg} alt="Recommended" />Recommended
          </div>
        </a>
        <a href="/en/casino/instant-game">
          <div className="btnHckd" style={{ width: '9.09091%', minWidth: '100px' }} ist="instant-game">
            <img src={instantGamesImg} alt="Instant Games" />Instant Games
          </div>
        </a>
       
      </div>
    </section>
  );
};

export default MobileNavCasino;
