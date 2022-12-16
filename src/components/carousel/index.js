import React, {useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import twentyPercentStakeBooster from '../../assets/img/banner/products/20PercentStakeBooster.jpeg'
import cashback from '../../assets/img/banner/products/100PercentCashback.jpg'
// import twenty_percent from '../../assets/img/banner/products/150PercentDaily_.jpg'
import KaribuGiftWallet from '../../assets/img/banner/products/KaribuGiftWallet.jpg'
import advance from '../../assets/img/banner/products/Advance.jpg'
// import lala from '../../assets/img/banner/products/Lala.jpg'
// import ngware from '../../assets/img/banner/products/Ngware.jpg'
// import rent from '../../assets/img/banner/products/Rent.jpg'
// import rushHour from '../../assets/img/banner/products/Rush Hour.jpg'
import stakeBooster from '../../assets/img/banner/products/StakeBooster.jpeg'
import dailyDepositGift from '../../assets/img/banner/products/20PercentDailyDepositGift.jpeg'
import tisaJackpot from '../../assets/img/banner/products/TisaTisaJackpot.jpg'

import kanyondeBanner from "../../assets/img/banner/products/Kanyonde Web Banner.jpg"
import krisi29 from "../../assets/img/banner/products/Krisi Ki Betnare Web Banners_29.jpg"
import krisi49 from "../../assets/img/banner/products/Krisi Ki Betnare Web Banners_49.jpg"


const banners = [
    KaribuGiftWallet,
    stakeBooster,
    dailyDepositGift,
    twentyPercentStakeBooster,
    cashback,
    advance,
    tisaJackpot,
    kanyondeBanner,
    krisi29,
    krisi49
]



const CarouselLoader = (props) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const onImageLoaded = () => {
        setImageLoaded(true);
    }

    return (
        <Carousel>
            {banners.map((banner, idx) => (
                <Carousel.Item key={idx}>
                    <LazyLoadImage
                        className="d-block w-100"
                        style={{display: imageLoaded ? 'block' : 'none'}}
                        src={banner}
                        onLoad={onImageLoaded}
                        alt="Batnare"
                        effects="blur"
                    />
                </Carousel.Item>
            ))
            }

        </Carousel>
    )
}
export default CarouselLoader;
