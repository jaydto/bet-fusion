import React from 'react';
import CasinoCarouselLoader from '../pages/new-casino/CasinoCarouseld';
import MobileNavCasino from './mobileCasino';
import useWindowDimensions from '../header/Dimensions';
import Right from '../right';
import Footer from '../footer/footer';
import SideCasinoMenu from './sideSection';

const CasinoLayout = ({ children }) => {
    const {width}=useWindowDimensions()

  return (
    <div style={{ marginTop: '9.1rem',overflowX:'hidden' }}>
      
      <CasinoCarouselLoader />
      <section className='pageContent'>
        <div className={`side left non-mobile ${width < 991 ? `d-none` : ``}`}>
            <SideCasinoMenu/>
        </div>
        <div className={`side center slots ${width < 991 ? `mobile` : `desktop`}`}>
      <MobileNavCasino />
      {children}
      </div>
      </section>
      <div className='ipad-show'>
        <Right kiron={true} virtualLeague={true} />
      </div>
      <div className='desktop-only-show'>
        <Footer />
      </div>
    </div>
  );
};

export default CasinoLayout;
