import React, {useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


import cashback from '../../assets/img/banner/products/Bet_Nare_100_Cashback.webp'
import stakeBooster from '../../assets/img/banner/products/Bet_Nare_20_Stake_Booster.webp'
import dailyDepositGift from '../../assets/img/banner/products/Bet_Nare_20_gift.webp'
import karibuGiftWallet from "../../assets/img/banner/products/Bet_Nare_3000_karibu_gift.webp"
import Aviator from "../../assets/img/banner/products/Aviator.webp"
import jackpot from "../../assets/img/banner/products/HalfMilliJP.webp"
import Drops from "../../assets/img/banner/products/DropsAndWins Web.webp"
import Drops260 from  '../../assets/img/banner/products/Pragmatic260.webp'
import Drops65 from '../../assets/img/banner/products/pragmatic65.webp'
import Miller from '../../assets/img/banner/products/MilanvsInter.webp'
import Av2 from '../../assets/img/banner/products/Aviator2.webp'
import Juventus from '../../assets/img/banner/products/JuventusvsSevilla.webp'

const banners = [
    {src: Juventus, url: "/"},
    {src: Miller, url: "/promotions"},
    {src: Av2, url: "/nare-games/aviator"},
    // {src: Aviator, url: "/nare-games/aviator"},
    // {src: karibuGiftWallet, url: "/promotions"},
    // {src: jackpot, url: "/jackpot"},
    // {src: stakeBooster, url: "/promotions"},
    // {src: dailyDepositGift, url: "/deposit"},
    // {src: cashback, url: "/promotions"},
    // {src: Drops, url: "/casino"}
]

const CarouselLoader = (props) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const onImageLoaded = () => {
        setImageLoaded(true);
    }

    return (
        <Carousel indicators={false}>
            {banners.map((banner, idx) => (
                <Carousel.Item key={idx} className={'banner-height'}>
                    <LazyLoadImage
                        className="d-block w-100 cursor-pointer banner-height"
                        style={{display: imageLoaded ? 'block' : 'none'}}
                        src={banner.src}
                        onLoad={onImageLoaded}
                        alt="Batnare"
                        effects="blur"
                        onClick={() => {
                            window.location.href = banner.url
                        }}
                    />
                </Carousel.Item>
            ))
            }

        </Carousel>
    )
}
export default CarouselLoader;
