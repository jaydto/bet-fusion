import React, { useContext, useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import makeRequest from "../utils/fetch-request";
import { StoreContext } from "../../context/store";
import {useNavigate} from "react-router-dom";

const CarouselLoader = React.memo(
    (props) => {
        const { state, dispatch } = useContext(StoreContext);

        const getCarouselImages = async () => {
            let endpoint = "/v1/carousel-images";
            const [carousel_results] = await Promise.all([
                makeRequest({ url: endpoint, method: "GET" })
            ]);
            let [status, carousel_result] = carousel_results;
            if (status === 200) {
                dispatch({ type: "SET", key: "carousel_banners", payload: carousel_result?.images });
            }
        }

        useEffect(() => {
            getCarouselImages()
        }, [])

        const [imageLoaded, setImageLoaded] = useState(false);
        const onImageLoaded = () => {
            setImageLoaded(true);
        }
        const navigate=useNavigate()

        return (
            <Carousel indicators={false} controls={false}>
                {state?.carousel_banners?.map((banner, idx) => (
                    <Carousel.Item key={idx}>
                        <LazyLoadImage
                            loading={"lazy"}
                            title={banner?.title}
                            className="d-block w-100 cursor-pointer"
                            style={{ display: imageLoaded ? 'block' : 'none' }}
                            src={banner?.image_url}
                            onLoad={onImageLoaded}
                            alt="Batnare"
                            effects="blur"
                            onClick={() => {
                                navigate(banner?.desktop_link_url)
                            }}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
        )
    }
)

export default CarouselLoader;
