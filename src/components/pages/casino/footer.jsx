import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import fb1 from "../../../assets/img/fb1.png";
import tw from "../../../assets/img/t1.png";
import int1 from "../../../assets/img/int1.png";
import wh from "../../../assets/img/w1.png";
import fb2 from "../../../assets/img/facebook.png";
import em2 from "../../../assets/img/email.png";
import ch2 from "../../../assets/img/contact.png";
import footer from "../../../assets/img/footer.png";
import Coop1 from "../../../assets/img/coop1.png";
import Coop2 from "../../../assets/img/coop2.png";
import Coop3 from "../../../assets/img/coop3.png";
import Coop4 from "../../../assets/img/coop4.png";
import Coop5 from "../../../assets/img/coop5.png";
import Coop6 from "../../../assets/img/coop6.png";
import Coop7 from "../../../assets/img/coop7.png";

import Fair1 from "../../../assets/img/fair1.png";
import Fair2 from "../../../assets/img/fair2.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Badge } from "antd";

export default function Footer() {
  return (
    <footer
      className="  mt-1 "
      style={{
        background: "#13111D",
        color: "var(--light)",
        marginBottom: "100px",
      }}
    >
      <Container>
        <Row className="text-start px-4">
          <Col md={12} sm={12} className="mb-4" style={{ fontSize: "12px" }}>
            <LazyLoadImage src={footer} alt="footer" className="img-fluid" />
            <p
              style={{ marginBottom: "0px", paddingTop: "30px" }}
              className="text-center"
            >
              WINNING STARTs HERE , Betdonjo , Best Gambiling game site in
              Africa
            </p>
            <hr style={{ marginTop: "0px" }} />
          </Col>

          {/* Links */}
          <Col md={12} sm={12} className="">
            <ul
              className="list-unstyled d-flex align-items-center justify-content-center gap-3 "
              style={{ fontSize: "12px" }}
            >
              <li>
                <Link to="/about" className="text-decoration-none text-light ">
                  About
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-decoration-none text-light ">
                  T&C's
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-decoration-none text-light ">
                  FAQ
                </Link>
              </li>
            </ul>
          </Col>

          {/* Contacts */}
          <Col md={12} sm={12} className="mb-4">
            <ul
              className="list-unstyled d-flex justify-content-center gap-3 align-items-center"
              style={{ fontSize: "12px" }}
            >
              <li className="mb-1 d-flex justify-content-center  align-items-center flex-column">
                <LazyLoadImage
                  src={ch2}
                  alt="footer"
                  className="img-fluid"
                  height={30}
                  width={30}
                />

                <p>Live chat</p>
              </li>
              <li className="mb-1  d-flex justify-content-center  align-items-center flex-column">
                <LazyLoadImage
                  src={em2}
                  alt="footer"
                  className="img-fluid"
                  height={30}
                  width={30}
                />
                <p>Email</p>
              </li>
              <li className="mb-1  d-flex justify-content-center  align-items-center flex-column">
                <LazyLoadImage
                  src={fb2}
                  alt="footer"
                  className="img-fluid"
                  height={30}
                  width={30}
                />
                <p>Facebook</p>
              </li>
            </ul>
          </Col>
          <hr />

          {/* Share */}
          <Col md={12} sm={12} className="mb-4">
            <h4 className="fw-bold text-center mb-3">Share With Friends</h4>
            <div className="d-flex gap-3">
              <ul
                className="list-unstyled d-flex justify-content-center gap-5 align-items-center w-100"
                style={{ fontSize: "12px" }}
              >
                <li className="mb-1  d-flex justify-content-center  align-items-center flex-column">
                  <LazyLoadImage
                    src={fb1}
                    alt="footer"
                    className="img-fluid"
                    height={30}
                    width={30}
                  />
                  <p className="mb-0">Facebook</p>
                </li>

                <li className="mb-1  d-flex justify-content-center  align-items-center flex-column">
                  <LazyLoadImage
                    src={tw}
                    alt="footer"
                    className="img-fluid"
                    height={30}
                    width={30}
                  />
                  <p className="mb-0">Twitter</p>
                </li>
                <li className="mb-1 d-flex justify-content-center  align-items-center flex-column">
                  <LazyLoadImage
                    src={wh}
                    alt="footer"
                    className="img-fluid"
                    height={30}
                    width={30}
                  />

                  <p className="mb-0">Whatsap</p>
                </li>
                <li className="mb-1  d-flex justify-content-center  align-items-center flex-column">
                  <LazyLoadImage
                    src={int1}
                    alt="footer"
                    className="img-fluid"
                    height={30}
                    width={30}
                  />
                  <p className="mb-0">Intagram</p>
                </li>
              </ul>
            </div>
            <p style={{ fontSize: "12px" }} className="text-center">
              Invite friends,bet and earn KSH 1,000,000
            </p>
          </Col>
          <hr />

          {/* Cooperations */}
          <Col md={12} sm={12} className="mb-4">
            <h5 className="fw-bold text-center mb-4">Cooperations</h5>
            <div className="d-flex flex-wrap gap-4">
              {[Coop1, Coop2, Coop3, Coop4, Coop5, Coop6, Coop7].map(
                (img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`coop-${idx}`}
                    width={50}
                    height={30}
                  />
                )
              )}
            </div>
          </Col>
        </Row>

        <hr />

        <Row className="text-start px-4">
          {/* Fairness */}
          <Col md={6} className="mb-3">
            <h5 className="fw-bold text-center mb-3">Fairness</h5>
            <div className="d-flex gap-3 justify-content-center">
              <img src={Fair1} alt="fair-1" width={100} />
              <img src={Fair2} alt="fair-2" width={100} />
            </div>
          </Col>
          <hr />

          {/* Licence */}
          <Col md={6} className="mb-3">
            <h5 className="fw-bold text-cebter text-center fw-bold fs-3 mb-3">
              License
            </h5>
            <ul style={{ fontSize: "12px" }}>
              <li className="d-flex align-items-center gap-2">
                Players must be{" "}
                <b style={{ color: "var(--game-title)" }}>18 or older.</b>
                <Badge
                  pill
                  className="border border-warning bg-transparent text-white p-1 d-flex align-items-center justify-content-center rounded-pill"
                  style={{
                    padding: "2px 8px",
                    fontSize: "11px",
                    height: "25px",
                    minWidth: "25px",
                  }}
                >
                  18+
                </Badge>
              </li>

              <li>
                Be Responsible. The addiction to gambling can cause
                psychological harm.
              </li>
              <li>
                Gikenoh Enterprise Limited, Kenya operates the betdonjo brand
                and authorized and regulated by the BCLB (Betting Control and
                Licensing Board) under the Betting, Lotteries and Gaming Act,
                Cap 131,
              </li>
              <li>
                Laws of Kenya under License Numbers:{" "}
                <b style={{ color: "var(--game-title)" }}> BK 0000816</b>
              </li>
              <li>©2025 BetDonjo. All Rights reserved.</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
