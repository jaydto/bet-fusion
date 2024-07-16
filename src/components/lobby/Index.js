import React from 'react'
import CasinoCarouselLoader from '../pages/new-casino/CasinoCarouseld';
import MobileNavCasino from './mobileCasino';
import Lobby from './lobby';
import useWindowDimensions from '../header/Dimensions';

const CasinoIndex=()=> {
  const {width}=useWindowDimensions()

  return (
   <div style={{marginTop:'6.7rem'}}>
    <CasinoCarouselLoader/>
    {width < 991 && <MobileNavCasino/>}
   <Lobby/>
   </div>
   
   
  )
}
export default CasinoIndex;