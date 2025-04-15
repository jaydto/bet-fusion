import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Wallet from "../../../assets/img/link.png";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function MpesaCard() {
  return (
    <Card className="mx-auto shadow-sm rounded-4 p-3" style={{ backgroundColor: "var(--card-c)", color:'var(--light'}}>
      <Card.Body>
        {/* Title */}
        <h5 className="card-title mb-3">Mpesa Paybill: Ndichu</h5>

        {/* Icon and text */}
        <div className="d-flex align-items-center mb-3">
          <LazyLoadImage
            src={Wallet}
            height={25}
            width={25}
            alt="Wallet"
            className="me-2"
          />
          <span className=" small">
            Link your Mpesa account to start transacting.
          </span>
        </div>

        {/* Button */}
        <Button
          as={Link}
          to="/link-account"
          className="w-50 mb-3"
          style={{ background: "var(--link-btn)", color: "var(--dark)", borderRadius:"10px", fontWeight:"600", padding:"5px", border:"none" }}
        >
          Link your account
        </Button>

        {/* Text with a link */}
        <p className=" small mb-0" style={{testWrap:"wrap", width:"100%"}}>
          If you have finished the payment and received transaction code from
          MPESA.Please &nbsp;
          <Link
            to="/support"
            className=" text-decoration-underline"
            style={{ color: "var(--game-title)" }}
          >
            fix status
          </Link>
        </p>
      </Card.Body>
    </Card>
  );
}
