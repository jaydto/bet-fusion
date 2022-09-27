import React, {useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import two_hundred_percent from '../../assets/img/banner/products/Banner_200pc_Bonus_x.jpg'
import cashback from '../../assets/img/banner/products/Banner_100pc_Cashback.jpg'
import twenty_percent from '../../assets/img/banner/products/Twenty-Percent-Deposit-Bonus.jpeg'
// import banner2 from '../../assets/img/banner/products/30PercentDAILYCASHBACK.png'
// import banner3 from '../../assets/img/banner/products/70PercentMULTIBETCASHBACK.png'
import banner1 from '../../assets/img/banner/products/Karibu-Bonus.jpeg'
// import banner5 from '../../assets/img/banner/products/100PercentDepositBonus.png'
import odds from '../../assets/img/banner/products/ODDS.png'

const banners = [
    banner1,
    twenty_percent,
    two_hundred_percent,
    cashback,
    odds
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
