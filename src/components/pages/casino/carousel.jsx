import React, { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { casinoCarouselImages } from "../../../redux/dataSlice";
import { Grid } from "antd";

const { useBreakpoint } = Grid;

const CasinoCarouselLoader = React.memo(() => {
    const dispatchRedux = useDispatch();
    const navigate = useNavigate();
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const banner_images = useSelector((state) => state.data.casino_carousel_banners);

    useEffect(() => {
        if (!banner_images || banner_images.length === 0) {
            dispatchRedux(casinoCarouselImages());
        }
    }, [banner_images?.length]);

    const visible = (banner_images ?? []).slice(0, isMobile ? 1 : 3);

    if (!visible.length) return (
        <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 0 : 10,
            borderRadius: 12,
            overflow: "hidden",
            marginBottom: 4,
        }}>
            {Array.from({ length: isMobile ? 1 : 3 }).map((_, i) => (
                <div key={i} style={{
                    borderRadius: 10,
                    background: "linear-gradient(90deg, #1e293b 25%, #2a3a4a 50%, #1e293b 75%)",
                    backgroundSize: "200% 100%",
                    animation: "game-card-shimmer 1.4s ease-in-out infinite",
                    height: isMobile ? 160 : 200,
                }} />
            ))}
        </div>
    );

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                gap: isMobile ? 0 : 10,
                borderRadius: 12,
                overflow: "hidden",
                marginBottom: 4,
            }}
        >
            {visible.map((banner, idx) => (
                <div
                    key={idx}
                    onClick={() => banner.desktop_link_url && navigate(banner.desktop_link_url)}
                    style={{ cursor: "pointer", borderRadius: 10, overflow: "hidden", lineHeight: 0 }}
                >
                    <LazyLoadImage
                        src={banner.image_url}
                        alt={banner.title || "Banner"}
                        effect="blur"
                        style={{ width: "100%", height: "auto", display: "block", borderRadius: 10 }}
                    />
                </div>
            ))}
        </div>
    );
});

export default CasinoCarouselLoader;
