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
import IntervsMillan from "../../assets/img/banner/products/IntervsMilan.webp"


const banners = [
    {src: IntervsMillan, url: "/match/32913952"},
    {src: Aviator, url: "/nare-games/aviator"},
    {src: karibuGiftWallet, url: "/promotions"},
    {src: jackpot, url: "/jackpot"},
    {src: stakeBooster, url: "/promotions"},
    {src: dailyDepositGift, url: "/deposit"},
    {src: cashback, url: "/promotions"},

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
                        className="d-block w-100 cursor-pointer"
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
