import React, {useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import twentyPercentStakeBooster from '../../assets/img/banner/products/20PercentStakeBooster.jpeg'
import cashback from '../../assets/img/banner/products/100PercentCashback.jpg'
import stakeBooster from '../../assets/img/banner/products/StakeBooster.jpeg'
import dailyDepositGift from '../../assets/img/banner/products/20PercentDailyDepositGift.jpeg'
import karibuGiftWallet from "../../assets/img/banner/products/KaribuGiftWallet.jpg"
import kanyondeBanner from "../../assets/img/banner/products/Kanyonde Web Banner.jpg"
import karibu50 from "../../assets/img/banner/products/50KaribuBonus.jpg"

const banners = [
    kanyondeBanner,
    karibuGiftWallet,
    karibu50,
    stakeBooster,
    dailyDepositGift,
    twentyPercentStakeBooster,
    cashback,

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
