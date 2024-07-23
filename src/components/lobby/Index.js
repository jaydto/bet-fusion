import React from 'react'
import CasinoCarouselLoader from '../pages/new-casino/CasinoCarouseld';
import MobileNavCasino from './mobileCasino';
import Lobby from './lobby';
import useWindowDimensions from '../header/Dimensions';
import Right from '../right';
import Footer from '../footer/footer';

const CasinoIndex=()=> {
  const {width}=useWindowDimensions()

  return (
   <div style={{marginTop:'6.1rem', overflowX:'hidden'}}>
    <CasinoCarouselLoader/>
    {/* {width < 991 &&  */}
    {/* } */}
   <Lobby/>
   <div className='ipad-show'>
   <Right kiron={true} virtualLeague={true}/>
   </div>
   <div className='desktop-only-show '>
   <Footer/>
   </div>
   </div>
   
   
  )
}
export default CasinoIndex;