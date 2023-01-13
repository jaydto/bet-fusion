import React, {useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


import cashback from '../../assets/img/banner/products/Bet_Nare_100_Cashback.webp'
import stakeBooster from '../../assets/img/banner/products/Bet_Nare_20_Stake_Booster.webp'
import dailyDepositGift from '../../assets/img/banner/products/Bet_Nare_20_ gift.webp'
import karibuGiftWallet from "../../assets/img/banner/products/Bet_Nare_3000_karibu_gift.webp"
import Aviator from "../../assets/img/banner/products/Aviator.webp"
import karibu50 from "../../assets/img/banner/products/Bet_Nare_50_Karibu_Bonus.webp"
import jackpot from "../../assets/img/banner/products/BetNare_300k_Jackpot_New.webp"


const banners = [
    Aviator,
    karibu50,
    karibuGiftWallet,
    jackpot,
    stakeBooster,
    dailyDepositGift,
    cashback,
]

const CarouselLoader = (props) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const onImageLoaded = () => {
        setImageLoaded(true);
    }

    return (
        <Carousel indicators={false}>
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
