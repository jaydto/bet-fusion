import React from 'react';
import HomeSvg from '../../assets/svg/home-icon.svg';
import VirtualSvg from '../../assets/svg/virtuals.svg';
import LiveSvg from '../../assets/svg/live.svg';
import ProfileSvg from '../../assets/svg/profile.svg';
import BetslipSvg from '../../assets/svg/betslip.svg';
const MobileMenu = ()=>{
    return(
        <div>
              <nav className="mobile-menu">
                    <a href="/" className="bloc-icon">
                        <img src={HomeSvg} alt=""></img>
                        <p>Home</p>
                    </a>
                    <a href="/virtuals" className="bloc-icon">
                        <img src={VirtualSvg} alt=""></img>
                        <p>Virtuals</p>
                    </a>
                  <a href="/" className="bloc-icon scaling">
                      <img src={BetslipSvg} alt=""></img>
                      <p>Slip</p>
                  </a>
                    <a href="/live" className="bloc-icon">
                        <img src={LiveSvg} alt=""></img>
                        <p>Live</p>
                    </a>
                    <a href="/" className="bloc-icon">
                        <img src={ProfileSvg} alt=""></img>
                        <p>Me</p>
                    </a>

                    
    </nav>
        </div>
    )
}
export default MobileMenu;