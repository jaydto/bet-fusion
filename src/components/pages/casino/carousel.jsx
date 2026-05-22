import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { casinoCarouselImages } from "../../../redux/dataSlice";
import { Grid } from "antd";

const { useBreakpoint } = Grid;

const ArrowBtn = ({ direction, onClick, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        aria-label={direction === "prev" ? "Previous" : "Next"}
        style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            [direction === "prev" ? "left" : "right"]: 8,
            zIndex: 10,
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: disabled ? "rgba(15,23,42,0.4)" : "rgba(15,23,42,0.75)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: disabled ? "#475569" : "#f8fafc",
            cursor: disabled ? "default" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.15s",
            backdropFilter: "blur(4px)",
        }}
    >
        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            {direction === "prev"
                ? <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                : <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            }
        </svg>
    </button>
);

const CasinoCarouselLoader = React.memo(() => {
    const dispatchRedux = useDispatch();
    const navigate = useNavigate();
    const screens = useBreakpoint();
    const isMobile = !screens.md;
    const perPage = isMobile ? 1 : 3;

    const banner_images = useSelector((state) => state.data.casino_carousel_banners);
    const [page, setPage] = useState(0);

    useEffect(() => {
        if (!banner_images || banner_images.length === 0) {
            dispatchRedux(casinoCarouselImages());
        }
    }, [banner_images?.length]);

    useEffect(() => { setPage(0); }, [isMobile]);

    const allBanners = banner_images ?? [];
    const totalPages = Math.max(1, Math.ceil(allBanners.length / perPage));
    const visible = allBanners.slice(page * perPage, page * perPage + perPage);
    const showArrows = allBanners.length > perPage;

    const bannerHeight = isMobile ? 160 : 200;

    const shimmerGrid = (
        <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 0 : 10,
            borderRadius: 12,
            overflow: "hidden",
            marginBottom: 4,
        }}>
            {Array.from({ length: perPage }).map((_, i) => (
                <div key={i} style={{
                    borderRadius: 10,
                    background: "linear-gradient(90deg, #1e293b 25%, #2a3a4a 50%, #1e293b 75%)",
                    backgroundSize: "200% 100%",
                    animation: "game-card-shimmer 1.4s ease-in-out infinite",
                    height: bannerHeight,
                }} />
            ))}
        </div>
    );

    if (!visible.length) return shimmerGrid;

    return (
        <div style={{ position: "relative" }}>
            {/* Grid wrapper — arrows centre on this element */}
            <div style={{ position: "relative" }}>
                {showArrows && (
                    <ArrowBtn
                        direction="prev"
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                        disabled={page === 0}
                    />
                )}

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
                            key={`${page}-${idx}`}
                            onClick={() => banner.desktop_link_url && navigate(banner.desktop_link_url)}
                            style={{
                                cursor: "pointer",
                                borderRadius: 10,
                                overflow: "hidden",
                                lineHeight: 0,
                                height: bannerHeight,
                                background: "#1e293b",
                            }}
                        >
                            <LazyLoadImage
                                src={banner.image_url}
                                alt={banner.title || "Banner"}
                                effect="blur"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    display: "block",
                                    borderRadius: 10,
                                }}
                                wrapperProps={{ style: { width: "100%", height: "100%", display: "block" } }}
                            />
                        </div>
                    ))}
                </div>

                {showArrows && (
                    <ArrowBtn
                        direction="next"
                        onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                        disabled={page >= totalPages - 1}
                    />
                )}
            </div>

            {/* Page dots */}
            {showArrows && totalPages > 1 && (
                <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 8 }}>
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i)}
                            style={{
                                width: i === page ? 20 : 7,
                                height: 7,
                                borderRadius: 999,
                                background: i === page ? "#E55F32" : "#334155",
                                border: "none",
                                cursor: "pointer",
                                padding: 0,
                                transition: "width 0.25s, background 0.2s",
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );

});

export default CasinoCarouselLoader;
