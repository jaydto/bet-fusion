import React from 'react'
import SideCasinoMenu from './sideSection'
import TopSection from './topSection'
import CasinoGamesComponent from './body'
import useWindowDimensions from '../header/Dimensions';


const Lobby=(props)=> {
  const {width}=useWindowDimensions()
  console.log("width here", width)

  return (
    <section className='pageContent'>
        <div className={`side left non-mobile ${width < 991 ? `d-none` : ``}`}>
            <SideCasinoMenu/>
        </div>
        <div className={`side center slots ${width < 991 ? `mobile` : `desktop`}`}>
            
          <TopSection/>

            <CasinoGamesComponent/>

        </div>
      
    </section>
  )
}



export default Lobby

