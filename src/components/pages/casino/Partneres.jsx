import React from "react";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import pragmatic from "../../../assets/img/p1.png";
import one_touch from "../../../assets/img/p2.png";
import eto_play from "../../../assets/img/p3.png";
import bet_dojo from "../../../assets/img/p4.png";
import game_art from "../../../assets/img/p5.png";
import hack_saw from "../../../assets/img/p6.png";
import { LazyLoadImage } from "react-lazy-load-image-component";

const cardItems = [
  { id: 1, name: "Pragmatic", image: pragmatic, link: "/provider/pragmatic" },
  { id: 2, name: "One Touch", image: one_touch, link: "/provider/onetouch" },
  { id: 3, name: "Eto Play", image: eto_play, link: "/provider/etoplay" },
  { id: 4, name: "BetDojo", image: bet_dojo, link: "/provider/betdojo" },
  { id: 5, name: "Game Art", image: game_art, link: "/provider/gameart" },
  { id: 6, name: "Hack Saw", image: hack_saw, link: "/provider/hacksaw" },
];

export default function CardGrid() {
  return (
    <Container className="my-4">
      <Card className="p-4 border-0 bg-transparent">
        <h2 className="text-start mb-4 text-light fs-1 fw-bold">PARTNER GAMES</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
          }}
        >
          {cardItems.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="text-decoration-none text-light text-center"
            >
              <div>
                <LazyLoadImage
                  src={item.image}
                  alt={item.name}
                  style={{
                    height: "50px",
                    objectFit: "contain",
                    marginBottom: "0.1rem",
                  }}
                />
                <div className="fw-semibold fs-6">{item.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </Container>
  );
}
