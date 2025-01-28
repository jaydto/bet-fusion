import React from 'react';
import { Link} from 'react-router-dom';

const SupportContainer = () => {
    const handleLogout=()=>{
        return window.location.href="/logout"
    }
  return (
    <div className="overlay-menu__strocked-card account__section__support transaction">
      <h3 className=" t-label">Support</h3>

      <div className="overlay-menu__section__header main w-100">
        <Link to="/how-to-play" target="_blank" className="account_section button link no-bg no-padding with-black-caret full">
          <div className="overlay-menu__section__header main">
            <p className="account__section__desc">Info</p>
            <h3 className="account__section__title">Help and Support</h3>
          </div>
        </Link>
      </div>

      <div className="overlay-menu__section__header main w-100">
        <Link to="/responsible-gambling" className="account_section button link no-bg no-padding with-black-caret full">
          <div className="overlay-menu__section__header main">
            <p className="account__section__desc">Self Exclude</p>
            <h3 className="account__section__title">Exclude Your Account</h3>
          </div>
        </Link>
      </div>

      <div className="account__section__support--line full"></div>

      <button className="button full" onClick={() => handleLogout()}>Sign Out</button>

      <div className="account__section__support--line"></div>

      <div className="account__section">
        <p className="account__section__desc tc">BetTena Mobile v6.0.1</p>
      </div>
    </div>
  );
};

export default SupportContainer;
