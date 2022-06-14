import React, {useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// import banner1  from '../../assets/img/banner/banner001.jpeg';

import banner1 from '../../assets/img/banner/homepage/KARIBU.png';
import banner6 from '../../assets/img/banner/homepage/REGISTER.png';
import banner2 from '../../assets/img/banner/homepage/50Bob.png';
import banner3 from '../../assets/img/banner/homepage/CASHBACK.png';
import banner4 from '../../assets/img/banner/homepage/DEPOSIT BONUS.png';
import banner5 from '../../assets//img/banner/homepage/JACKPOT.png';
import banner7 from '../../assets/img/banner/homepage/MASTER.png';
import banner8 from '../../assets/img/banner/homepage/ODDS.png';

const banners = [
    banner1, banner2, banner3, banner4, banner5, banner6, banner7, banner8
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
