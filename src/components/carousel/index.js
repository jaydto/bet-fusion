import React, {useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import two_hundred_percent from '../../assets/img/banner/products/500PercentBonus_.jpg'
import cashback from '../../assets/img/banner/products/100PercentCashback.jpg'
import twenty_percent from '../../assets/img/banner/products/150PercentDaily_.jpg'
import banner1 from '../../assets/img/banner/products/100_RegBonus.jpg'
import advance from '../../assets/img/banner/products/Advance.jpg'
import lala from '../../assets/img/banner/products/Lala.jpg'
import ngware from '../../assets/img/banner/products/Ngware.jpg'
import rent from '../../assets/img/banner/products/Rent.jpg'
import rushHour from '../../assets/img/banner/products/Rush Hour.jpg'
import tisaJackpot from '../../assets/img/banner/products/TisaTisaJackpot.jpg'


const banners = [
    two_hundred_percent,
    banner1,
    twenty_percent,
    cashback,
    advance,
    lala,
    ngware,
    rent,
    rushHour,
    tisaJackpot
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
